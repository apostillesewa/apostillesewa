import { Star, BadgeCheck } from "lucide-react";

const reviews = [
  {
    name: "Ramesh Thapa",
    role: "Poland Work Visa",
    initials: "RT",
    body: "Processed my TU documents for the Polish work visa in 9 days. Zero rejections, zero back-and-forth. Worth every rupee.",
    meta: "Processed TU Documents · 9 Days",
  },
  {
    name: "Sita Shrestha",
    role: "Germany Student Visa",
    initials: "SS",
    body: "They guided me through Anabin recognition and got my degree authenticated cleanly. The embassy accepted everything first try.",
    meta: "Document Authentication · Berlin",
  },
  {
    name: "Anish Karki",
    role: "Portugal D7 Visa",
    initials: "AK",
    body: "PCC + birth certificate apostille handled while I was at work. They couriered originals back with a digital scan in advance.",
    meta: "PCC + Birth Cert · 7 Days",
  },
];

export function SocialProof() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-success">
            Verified Client Outcomes
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Real Nepalis, real European approvals.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Every review below maps to a tracked file with embassy submission dates.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((r) => (
            <article
              key={r.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-elegant"
            >
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
                <span className="ml-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Verified
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground">"{r.body}"</p>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {r.initials}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
                    {r.name}
                    <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="text-[11px] text-muted-foreground">{r.meta}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
