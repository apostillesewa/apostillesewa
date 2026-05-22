import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { MobileTabBar } from "@/components/site/MobileTabBar";
import { BookOpen, ArrowRight } from "lucide-react";
import { SITE_URL } from "@/lib/contact";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Insights — Apostille Sewa Blog" },
      {
        name: "description",
        content: "Embassy updates, MOFA notices, and step-by-step guides for legalizing Nepali documents for Europe.",
      },
      { property: "og:title", content: "Insights — Apostille Sewa Blog" },
      { property: "og:description", content: "Embassy updates, MOFA notices, legalization guides." },
      { property: "og:url", content: `${SITE_URL}/blog` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <Header />
      <main>
        <section className="border-b border-border bg-[var(--surface)]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
              <BookOpen className="h-3 w-3" /> Insights
            </span>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              Embassy updates, MOFA notices, and legalization playbooks.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground">
              Our editorial desk is being prepared. The full Insights library — with country
              checklists, embassy turnaround trackers, and policy briefings — launches shortly.
            </p>
            <Link
              to="/contact-us"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-all hover:-translate-y-0.5"
            >
              Talk to a specialist <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileTabBar />
    </div>
  );
}
