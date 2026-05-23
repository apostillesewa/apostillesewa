import { createFileRoute, Link, notFound } from "@tanstack/react-router";
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
        ...(p?.cover_image_url ? [{ property: "og:image", content: p.cover_image_url }] : []),
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

function PostPage() {
  const { post } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <Header />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
        <Link to="/blog" className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> All insights
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
          {post.category && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 font-bold uppercase tracking-wider text-primary">
              <Tag className="h-2.5 w-2.5" /> {post.category}
            </span>
          )}
          {post.published_at && (
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {new Date(post.published_at).toLocaleDateString()}
            </span>
          )}
        </div>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{post.title}</h1>
        {post.excerpt && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>}

        {post.cover_image_url && (
          <img
            src={post.cover_image_url}
            alt={post.title}
            loading="lazy"
            className="mt-8 aspect-video w-full rounded-2xl object-cover"
          />
        )}

        <div className="prose prose-slate mt-10 max-w-none whitespace-pre-wrap text-base leading-relaxed text-foreground">
          {post.body}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-1.5 border-t border-border pt-6">
            {post.tags.map((t) => (
              <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">#{t}</span>
            ))}
          </div>
        )}
      </article>
      <Footer />
      <FloatingWhatsApp />
      <MobileTabBar />
    </div>
  );
}
