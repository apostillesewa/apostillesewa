// Minimal frontmatter (YAML-subset) parser/stringifier for blog markdown files.
// Supports: string, null, and string-array values. Keeps the worker bundle lean.

export type BlogFrontmatter = {
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  category: string | null;
  tags: string[];
  status: "draft" | "published";
  date: string | null; // ISO publication date
};

export type BlogPost = BlogFrontmatter & { body: string };

export function parseFrontmatter(raw: string): { data: Partial<BlogFrontmatter>; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const [, fm, body] = m;
  const data: Record<string, unknown> = {};
  for (const line of fm.split(/\r?\n/)) {
    const km = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
    if (!km) continue;
    const [, key, rawVal] = km;
    let val: unknown = rawVal.trim();
    if (typeof val === "string") {
      if (val === "" || val === "null" || val === "~") {
        val = null;
      } else if (val.startsWith("[") && val.endsWith("]")) {
        val = val
          .slice(1, -1)
          .split(",")
          .map((s) => s.trim().replace(/^["']|["']$/g, ""))
          .filter(Boolean);
      } else if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
    }
    data[key] = val;
  }
  return { data: data as Partial<BlogFrontmatter>, body: body ?? "" };
}

export function stringifyFrontmatter(data: BlogFrontmatter, body: string): string {
  const lines: string[] = ["---"];
  const push = (k: keyof BlogFrontmatter, v: unknown) => {
    if (v === null || v === undefined) lines.push(`${k}: null`);
    else if (Array.isArray(v))
      lines.push(`${k}: [${v.map((x) => JSON.stringify(String(x))).join(", ")}]`);
    else lines.push(`${k}: ${JSON.stringify(String(v))}`);
  };
  push("title", data.title);
  push("slug", data.slug);
  push("excerpt", data.excerpt);
  push("cover_image_url", data.cover_image_url);
  push("category", data.category);
  push("tags", data.tags ?? []);
  push("status", data.status);
  push("date", data.date);
  lines.push("---", "", body.replace(/\r\n/g, "\n").trimStart());
  return lines.join("\n");
}

export function normalizePost(slug: string, raw: string): BlogPost {
  const { data, body } = parseFrontmatter(raw);
  return {
    title: (data.title as string) ?? slug,
    slug: (data.slug as string) ?? slug,
    excerpt: ((data.excerpt as string | null) ?? null) || null,
    cover_image_url: ((data.cover_image_url as string | null) ?? null) || null,
    category: ((data.category as string | null) ?? null) || null,
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    status: (data.status as "draft" | "published") ?? "draft",
    date: ((data.date as string | null) ?? null) || null,
    body,
  };
}
