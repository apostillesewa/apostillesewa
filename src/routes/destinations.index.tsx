import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Flag } from "@/components/site/Flag";
import { COUNTRIES, type Country } from "@/lib/countries";
import { SITE_URL } from "@/lib/contact";

const TITLE = "Destination Hubs — Document Legalization for Europe & UK | Apostille Sewa";
const DESC = `MOFA attestation, PCC, and embassy legalization from Nepal for ${COUNTRIES.length} countries including Poland, Germany, Croatia, Malta, Portugal and more.`;

export const Route = createFileRoute("/destinations/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/destinations` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/destinations` }],
  }),
  component: DestinationsPage,
});

const REGIONS: Country["region"][] = ["Schengen", "EU (non-Schengen)", "Non-EU"];

function DestinationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="border-b border-border bg-[var(--surface)]">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Country Hubs</span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Document Legalization by Destination
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{DESC}</p>
          </div>
        </section>
        {REGIONS.map((r) => {
          const list = COUNTRIES.filter((c) => c.region === r);
          if (!list.length) return null;
          return (
            <section key={r} className="border-b border-border">
              <div className="mx-auto max-w-7xl px-6 py-12">
                <h2 className="text-xl font-bold text-foreground">{r}</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((c) => (
                    <Link
                      key={c.slug}
                      to="/destinations/$country"
                      params={{ country: c.slug }}
                      className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-elegant transition-all hover:-translate-y-0.5 hover:border-primary/30"
                    >
                      <span className="flex h-10 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border">
                        <Flag code={c.code} title={c.name} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="flex items-center justify-between font-semibold text-foreground">
                          {c.name}
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">{c.note}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
