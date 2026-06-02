import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { marked } from "marked";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { MobileTabBar } from "@/components/site/MobileTabBar";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { SITE_URL } from "@/lib/contact";
import { getPublishedPost } from "@/lib/blog.functions";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getPublishedPost({ data: { slug: params.slug } });
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    const title = p ? `${p.title} — Apostille Sewa` : "Insight — Apostille Sewa";
    const desc = p?.excerpt ?? "Read the latest legalization briefing from Apostille Sewa.";
    const url = p ? `${SITE_URL}/blog/${p.slug}` : `${SITE_URL}/blog`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">Post not found</h1>
        <Link to="/blog" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to insights
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-xl font-bold text-foreground">Couldn't load this article</h1>
        <button onClick={reset} className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Try again</button>
      </div>
    </div>
  ),
  component: PostPage,
});

function renderMarkdown(md: string): string {
  return marked.parse(md ?? "", { async: false, gfm: true, breaks: true }) as string;
}

function PostPage() {
  const { post } = Route.useLoaderData();
  const html = renderMarkdown(post.body || "");

  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <Header />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
        <Link to="/blog" className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> All insights
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
          {post.category && (
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-bold uppercase tracking-wider"
              style={{ backgroundColor: "rgba(26,92,255,0.1)", color: "#1A5CFF" }}
            >
              <Tag className="h-2.5 w-2.5" /> {post.category}
            </span>
          )}
          {post.published_at && (
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {new Date(post.published_at).toLocaleDateString()}
            </span>
          )}
        </div>

        <h1
          className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl"
          style={{ color: "#111827" }}
        >
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-5 border-l-4 pl-4 text-lg leading-relaxed text-muted-foreground" style={{ borderColor: "#1A5CFF" }}>
            {post.excerpt}
          </p>
        )}

        <div
          className="post-body mt-10 text-base leading-relaxed"
          style={{ color: "#111827" }}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-1.5 border-t border-border pt-6">
            {post.tags.map((t: string) => (
              <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">#{t}</span>
            ))}
          </div>
        )}
      </article>
      <Footer />
      <FloatingWhatsApp />
      <MobileTabBar />

      <style>{`
        .post-body h1, .post-body h2, .post-body h3, .post-body h4 {
          color: #111827;
          font-weight: 700;
          letter-spacing: -0.01em;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          line-height: 1.25;
        }
        .post-body h1 { font-size: 1.875rem; }
        .post-body h2 { font-size: 1.5rem; }
        .post-body h3 { font-size: 1.25rem; }
        .post-body h4 { font-size: 1.1rem; }
        .post-body p { margin: 1rem 0; }
        .post-body strong { color: #111827; font-weight: 700; }
        .post-body a { color: #1A5CFF; text-decoration: underline; text-underline-offset: 2px; }
        .post-body a:hover { opacity: 0.8; }
        .post-body ul, .post-body ol { margin: 1rem 0; padding-left: 1.5rem; }
        .post-body ul { list-style: disc; }
        .post-body ol { list-style: decimal; }
        .post-body li { margin: 0.4rem 0; }
        .post-body li::marker { color: #1A5CFF; }
        .post-body blockquote {
          border-left: 4px solid #1A5CFF;
          padding: 0.5rem 0 0.5rem 1rem;
          margin: 1.25rem 0;
          color: #4b5563;
          font-style: italic;
        }
        .post-body code {
          background: #f3f4f6;
          padding: 0.15rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.9em;
        }
        .post-body pre {
          background: #111827;
          color: #f9fafb;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.25rem 0;
        }
        .post-body pre code { background: transparent; padding: 0; color: inherit; }
        .post-body hr { border: 0; border-top: 1px solid #e5e7eb; margin: 2rem 0; }
      `}</style>
    </div>
  );
}
