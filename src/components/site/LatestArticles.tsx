import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar } from "lucide-react";
import { listPublishedPostsBundled } from "@/lib/blog-bundled";

export function LatestArticles() {
  const posts = listPublishedPostsBundled().slice(0, 3);
  if (!posts.length) return null;

  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
              Latest Articles
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Fresh from our consular desk
            </h2>
          </div>
          <Link
            to="/blog"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              {p.category && (
                <span
                  className="inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  style={{ backgroundColor: "rgba(26,92,255,0.1)", color: "#1A5CFF" }}
                >
                  {p.category}
                </span>
              )}
              <h3
                className="mt-3 text-base font-bold leading-snug transition-colors group-hover:text-[#1A5CFF]"
                style={{ color: "#111827" }}
              >
                {p.title}
              </h3>
              {p.excerpt && (
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.excerpt}</p>
              )}
              <div className="mt-4 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {p.date ? new Date(p.date).toLocaleDateString() : ""}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
