import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export const COUNTRIES = [
  { slug: "poland", name: "Poland", flag: "🇵🇱", note: "Required for: Work Permits & National Visas. Includes: Full MOFA + Embassy Stamping." },
  { slug: "germany", name: "Germany", flag: "🇩🇪", note: "Required for: Student & Blue Card Visas. Includes: MOFA + Anabin recognition guidance." },
  { slug: "croatia", name: "Croatia", flag: "🇭🇷", note: "Required for: Seasonal & Work Permits. Includes: Full MOFA + Embassy Stamping." },
  { slug: "malta", name: "Malta", flag: "🇲🇹", note: "Required for: Single Permit Applications. Includes: MOFA + Apostille verification." },
  { slug: "portugal", name: "Portugal", flag: "🇵🇹", note: "Required for: Job-Seeker & D7 Visas. Includes: MOFA + Apostille for SEF." },
  { slug: "cyprus", name: "Cyprus", flag: "🇨🇾", note: "Required for: Work & Student Permits. Includes: Full MOFA + Embassy Stamping." },
];

export function Destinations() {
  return (
    <section className="border-b border-border bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Country Hubs
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Dedicated Country Legalization Hubs
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Embassy-specific workflows maintained by agents who file weekly in Kathmandu.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COUNTRIES.map((c) => (
            <Link
              key={c.slug}
              to="/destinations/$country"
              params={{ country: c.slug }}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-elegant transition-all hover:-translate-y-1 hover:border-primary/30"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-2xl">
                  {c.flag}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{c.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.note}</p>
              <div className="mt-5 border-t border-border pt-4 text-[11px] font-semibold uppercase tracking-wider text-primary">
                View {c.name} hub →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
