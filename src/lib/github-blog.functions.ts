import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import {
  normalizePost,
  stringifyFrontmatter,
  type BlogPost,
} from "./blog-frontmatter";

const slugRe = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// ---------- Config helpers (read at request time, never at module scope) ----------
function ghConfig() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  const dir = (process.env.GITHUB_BLOGS_PATH || "src/content/blogs").replace(
    /^\/+|\/+$/g,
    ""
  );
  if (!token || !owner || !repo) {
    throw new Error(
      "GitHub blog storage is not configured. Set GITHUB_TOKEN, GITHUB_OWNER and GITHUB_REPO."
    );
  }
  return { token, owner, repo, branch, dir };
}

async function getOctokit() {
  const { Octokit } = await import("@octokit/rest");
  const { token } = ghConfig();
  return new Octokit({ auth: token });
}

function ghError(op: string, e: unknown): Error {
  const err = e as { status?: number; message?: string; response?: { data?: { message?: string; documentation_url?: string } } };
  const status = err.status ?? 0;
  const apiMsg = err.response?.data?.message || err.message || "unknown error";
  const doc = err.response?.data?.documentation_url ? ` (${err.response.data.documentation_url})` : "";
  const cfg = (() => { try { const c = ghConfig(); return ` [owner=${c.owner} repo=${c.repo} branch=${c.branch} dir=${c.dir}]`; } catch { return ""; } })();
  let hint = "";
  if (status === 401) hint = " — GITHUB_TOKEN is invalid or expired. Issue a new fine-grained PAT with Contents: Read/Write on this repo.";
  else if (status === 403) hint = " — Token lacks permission. The fine-grained PAT must grant Contents: Read and write on this exact repo (and be approved by the org if applicable).";
  else if (status === 404) hint = " — Resource not found. Verify GITHUB_OWNER, GITHUB_REPO and GITHUB_BRANCH match the actual repo on github.com, and that the token can SEE this repo (private repos require explicit selection in the PAT).";
  else if (status === 409) hint = " — Conflict (likely stale sha). Reload the post and try again.";
  else if (status === 422) hint = " — Validation failed. The branch may not exist, or the path is invalid.";
  console.error(`[github-blog] ${op} failed: ${status} ${apiMsg}${doc}${cfg}`);
  return new Error(`GitHub ${op} failed (${status || "no status"}): ${apiMsg}${hint}${cfg}`);
}


async function assertEditor(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .in("role", ["admin", "editor"]);
  if (error) throw new Error(error.message);
  if (!data || data.length === 0) throw new Error("Forbidden: editor role required");
}

// ---------- GitHub Contents API helpers ----------
async function ghGetFile(slug: string): Promise<{ raw: string; sha: string } | null> {
  const { owner, repo, branch, dir } = ghConfig();
  const octokit = await getOctokit();
  try {
    const res = await octokit.repos.getContent({
      owner,
      repo,
      ref: branch,
      path: `${dir}/${slug}.md`,
    });
    const d = res.data as { type?: string; content?: string; encoding?: string; sha: string };
    if (d.type !== "file" || typeof d.content !== "string") return null;
    const raw =
      d.encoding === "base64"
        ? new TextDecoder().decode(
            Uint8Array.from(atob(d.content.replace(/\n/g, "")), (c) => c.charCodeAt(0))
          )
        : d.content;
    return { raw, sha: d.sha };
  } catch (e) {
    const status = (e as { status?: number }).status;
    if (status === 404) return null;
    throw ghError(`getContent(${slug}.md)`, e);
  }
}

async function ghListFiles(): Promise<{ slug: string; sha: string }[]> {
  const { owner, repo, branch, dir } = ghConfig();
  const octokit = await getOctokit();
  try {
    const res = await octokit.repos.getContent({ owner, repo, ref: branch, path: dir });
    if (!Array.isArray(res.data)) return [];
    return res.data
      .filter((e) => e.type === "file" && e.name.endsWith(".md"))
      .map((e) => ({ slug: e.name.replace(/\.md$/, ""), sha: e.sha }));
  } catch (e) {
    const status = (e as { status?: number }).status;
    if (status === 404) return []; // folder doesn't exist yet
    throw ghError(`listContents(${dir})`, e);
  }
}


function toBase64(s: string): string {
  // Workers + Node both support btoa via the Web standard; use TextEncoder for safety.
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

// ---------- Public reads ----------
export const listPublishedPosts = createServerFn({ method: "GET" }).handler(async () => {
  const files = await ghListFiles();
  const posts = await Promise.all(
    files.map(async (f) => {
      const got = await ghGetFile(f.slug);
      return got ? normalizePost(f.slug, got.raw) : null;
    })
  );
  return posts
    .filter((p): p is BlogPost => !!p && p.status === "published")
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
    .map(({ body: _body, ...rest }) => rest);
});

export const getPublishedPost = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) =>
    z.object({ slug: z.string().min(1).max(160).regex(slugRe) }).parse(d)
  )
  .handler(async ({ data }) => {
    const got = await ghGetFile(data.slug);
    if (!got) return null;
    const post = normalizePost(data.slug, got.raw);
    if (post.status !== "published") return null;
    return post;
  });

// ---------- Admin reads ----------
export const listAllPostsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertEditor(context.userId);
    const files = await ghListFiles();
    const posts = await Promise.all(
      files.map(async (f) => {
        const got = await ghGetFile(f.slug);
        if (!got) return null;
        const p = normalizePost(f.slug, got.raw);
        return {
          id: f.slug, // slug doubles as id (no DB)
          slug: p.slug,
          title: p.title,
          status: p.status,
          category: p.category,
          published_at: p.date,
          updated_at: p.date,
        };
      })
    );
    return posts.filter((x): x is NonNullable<typeof x> => !!x);
  });

export const getPostAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) =>
    z.object({ id: z.string().min(1).max(160).regex(slugRe) }).parse(d)
  )
  .handler(async ({ data, context }) => {
    await assertEditor(context.userId);
    const got = await ghGetFile(data.id);
    if (!got) return null;
    const p = normalizePost(data.id, got.raw);
    return { ...p, id: data.id };
  });

// ---------- Writes ----------
const PostInput = z.object({
  // `id` here is the *original* slug for renames (file move detection).
  id: z.string().min(1).max(160).regex(slugRe).optional(),
  title: z.string().trim().min(2).max(200),
  slug: z.string().trim().min(2).max(160).regex(slugRe),
  excerpt: z.string().trim().max(400).nullable().optional(),
  cover_image_url: z.string().url().max(500).nullable().optional(),
  body: z.string().max(60000).default(""),
  category: z.string().trim().max(80).nullable().optional(),
  tags: z.array(z.string().trim().min(1).max(40)).max(15).default([]),
  status: z.enum(["draft", "published"]).default("draft"),
});

export const upsertPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => PostInput.parse(d))
  .handler(async ({ data, context }) => {
    await assertEditor(context.userId);
    const { owner, repo, branch, dir } = ghConfig();
    const octokit = await getOctokit();

    // Preserve original publication date for already-published files.
    const existing = await ghGetFile(data.slug);
    const existingPost = existing ? normalizePost(data.slug, existing.raw) : null;
    const date =
      data.status === "published"
        ? existingPost?.date ?? new Date().toISOString()
        : existingPost?.date ?? null;

    const md = stringifyFrontmatter(
      {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt ?? null,
        cover_image_url: data.cover_image_url ?? null,
        category: data.category ?? null,
        tags: data.tags,
        status: data.status,
        date,
      },
      data.body ?? ""
    );

    // Slug change → delete the old file after writing the new one.
    const renamedFrom = data.id && data.id !== data.slug ? data.id : null;

    try {
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        branch,
        path: `${dir}/${data.slug}.md`,
        message: `chore(blog): ${existing ? "update" : "create"} "${data.title}"`,
        content: toBase64(md),
        sha: existing?.sha,
        committer: { name: "Apostille Sewa Admin", email: "admin@apostillesewa.com" },
        author: { name: "Apostille Sewa Admin", email: "admin@apostillesewa.com" },
      });
    } catch (e) {
      throw ghError(`createOrUpdateFileContents(${dir}/${data.slug}.md)`, e);
    }

    if (renamedFrom) {
      const old = await ghGetFile(renamedFrom);
      if (old) {
        try {
          await octokit.repos.deleteFile({
            owner,
            repo,
            branch,
            path: `${dir}/${renamedFrom}.md`,
            message: `chore(blog): rename ${renamedFrom} → ${data.slug}`,
            sha: old.sha,
          });
        } catch (e) {
          throw ghError(`deleteFile(${dir}/${renamedFrom}.md)`, e);
        }
      }
    }


    return { id: data.slug };
  });

export const deletePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) =>
    z.object({ id: z.string().min(1).max(160).regex(slugRe) }).parse(d)
  )
  .handler(async ({ data, context }) => {
    await assertEditor(context.userId);
    const { owner, repo, branch, dir } = ghConfig();
    const octokit = await getOctokit();
    const existing = await ghGetFile(data.id);
    if (!existing) return { ok: true };
    try {
      await octokit.repos.deleteFile({
        owner,
        repo,
        branch,
        path: `${dir}/${data.id}.md`,
        message: `chore(blog): delete ${data.id}`,
        sha: existing.sha,
      });
    } catch (e) {
      throw ghError(`deleteFile(${dir}/${data.id}.md)`, e);
    }
    return { ok: true };
  });

