// Public blog reads: bundled markdown files from src/content/blogs/*.md.
// Vite inlines these as raw strings at build time. No runtime GitHub API
// calls, no token, no CORS — the public /blog pages always render.
// Admin writes still go through src/lib/github-blog.functions.ts (Octokit).

import { normalizePost, type BlogPost } from "./blog-frontmatter";

const RAW_FILES = import.meta.glob("../content/blogs/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function slugFromPath(path: string): string {
  return path.replace(/^.*\/([^/]+)\.md$/, "$1");
}

let cache: BlogPost[] | null = null;
function allPosts(): BlogPost[] {
  if (cache) return cache;
  cache = Object.entries(RAW_FILES).map(([path, raw]) =>
    normalizePost(slugFromPath(path), raw),
  );
  return cache;
}

export function listPublishedPostsBundled() {
  return allPosts()
    .filter((p) => p.status === "published")
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
    .map(({ body: _b, ...rest }) => rest);
}

export function getPublishedPostBundled(slug: string): BlogPost | null {
  const p = allPosts().find((x) => x.slug === slug);
  if (!p || p.status !== "published") return null;
  return p;
}
