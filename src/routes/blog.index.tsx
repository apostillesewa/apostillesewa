import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { MobileTabBar } from "@/components/site/MobileTabBar";
import { BookOpen, ArrowRight, Calendar, Tag } from "lucide-react";
import { SITE_URL } from "@/lib/contact";
import { listPublishedPosts } from "@/lib/github-blog.functions";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Insights — Apostille Sewa Blog" },
      { name: "description", content: "Embassy updates, MOFA notices, and step-by-step guides for legalizing Nepali documents for Europe." },
      { property: "og:title", content: "Insights — Apostille Sewa Blog" },
      { property: "og:description", content: "Embassy updates, MOFA notices, legalization guides." },
      { property: "og:url", content: `${SITE_URL}/blog` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const fetchPosts = useServerFn(listPublishedPosts);
  const { data: posts, isLoading } = useQuery({
    queryKey: ["public-blog"],
    queryFn: () => fetchPosts(),
  });

  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <Header />
      <main>
        <section className="border-b border-border bg-[var(--surface)]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
              <BookOpen className="h-3 w-3" /> Insights
            </span>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              Embassy updates, MOFA notices, and legalization playbooks.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground">
              Field notes from our consular desk in Kathmandu — distilled into step-by-step guides
              for individuals moving to Europe.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-72 animate-pulse rounded-2xl border border-border bg-card" />
              ))}
            </div>
          ) : !posts?.length ? (
            <EmptyState />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Link
                  key={p.id}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-elegant transition-all hover:-translate-y-1"
                  style={{ borderColor: "rgba(17,24,39,0.08)" }}
                >
                  {p.category && (
                    <span
                      className="inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                      style={{ backgroundColor: "rgba(26,92,255,0.1)", color: "#1A5CFF" }}
                    >
                      <Tag className="h-2.5 w-2.5" /> {p.category}
                    </span>
                  )}
                  <h2
                    className="mt-3 text-lg font-bold leading-snug transition-colors group-hover:text-[#1A5CFF]"
                    style={{ color: "#111827" }}
                  >
                    {p.title}
                  </h2>
                  {p.excerpt && (
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.excerpt}</p>
                  )}
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-3 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {p.published_at ? new Date(p.published_at).toLocaleDateString() : ""}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold" style={{ color: "#1A5CFF" }}>
                      Read article <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileTabBar />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
      <BookOpen className="mx-auto h-8 w-8 text-muted-foreground" />
      <h2 className="mt-3 text-lg font-bold text-foreground">The editorial desk is warming up</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Our first round of embassy briefings is being prepared. In the meantime, our specialists are
        live on WhatsApp.
      </p>
      <Link to="/contact-us"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant transition-all hover:-translate-y-0.5">
        Talk to a specialist <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
