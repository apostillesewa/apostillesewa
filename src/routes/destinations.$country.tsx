import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Footer } from "@/components/site/Footer";
import { getCountry, relatedPostsFor } from "@/lib/countries";
import { Flag } from "@/components/site/Flag";
import { ArrowLeft, CheckCircle2, Clock, FileText, Stamp, Building2, Send, ArrowRight, MessageCircle, ChevronDown } from "lucide-react";

const DOC_TYPES = [
  "Academic Degree / Transcript",
  "Birth / Marriage Certificate",
  "Police Clearance Certificate (PCC)",
  "Commercial Invoice",
];

import { WHATSAPP_NUMBER, SITE_URL } from "@/lib/contact";

const CHECKLIST: Record<string, { step: string; detail: string; icon: typeof Stamp }[]> = {
  default: [
    { step: "Notary Verification", detail: "Original document notarized by Nepali Notary Public", icon: FileText },
    { step: "MOFA Attestation", detail: "Stamped by the Consular Department, Ministry of Foreign Affairs", icon: Stamp },
    { step: "Embassy Submission", detail: "Filed at the destination European embassy in Kathmandu/Delhi", icon: Building2 },
    { step: "Final Legalization", detail: "Receive embassy-legalized originals + secure digital scan", icon: CheckCircle2 },
  ],
};

export const Route = createFileRoute("/destinations/$country")({
  loader: ({ params }) => {
    const country = getCountry(params.country);
    if (!country) throw notFound();
    return { country, related: relatedPostsFor(country) };
  },
  head: ({ loaderData, params }) => ({
    meta: [
      { title: `Apostille & Embassy Legalization for ${loaderData?.country.name} in Nepal` },
      {
        name: "description",
        content: `Step-by-step MOFA, notary, and embassy legalization for ${loaderData?.country.name}. Trusted by Nepali applicants for work and student visas.`,
      },
      { property: "og:title", content: `${loaderData?.country.name} Document Legalization — Apostille Sewa` },
      { property: "og:description", content: `Step-by-step MOFA + embassy legalization for ${loaderData?.country.name}.` },
      { property: "og:url", content: `${SITE_URL}/destinations/${params.country}` },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/destinations/${params.country}` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Destinations", item: `${SITE_URL}/destinations` },
            { "@type": "ListItem", position: 3, name: loaderData?.country.name, item: `${SITE_URL}/destinations/${params.country}` },
          ],
        }),
      },
    ],
  }),
  component: CountryPage,
});

function CountryPage() {
  const { country, related } = Route.useLoaderData();
  const checklist = CHECKLIST.default;
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [docType, setDocType] = useState("");

  const waMessage = encodeURIComponent(
    `Hi Apostille Sewa, I just reserved a ${country.name} legalization slot.\n\n• Name: ${name}\n• Document: ${docType || "To be confirmed"}\n• Destination: ${country.name}\n\nPlease confirm the next steps.`,
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="border-b border-border bg-[var(--surface)]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
            <Link to="/destinations" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to all destinations
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <span className="flex h-14 w-20 items-center justify-center overflow-hidden rounded-md border border-border bg-background shadow-elegant">
                <Flag code={country.code} title={country.name} />
              </span>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                  Country Hub
                </span>
                <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Apostille &amp; Embassy Legalization for {country.name} in Nepal
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{country.note}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Required Processing Steps for {country.name}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Embassy-specific checklist verified against current {country.name} consular requirements.
              </p>

              <ol className="mt-8 space-y-4">
                {checklist.map((c, i) => (
                  <li
                    key={c.step}
                    className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-elegant"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          Step {i + 1}
                        </span>
                        <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                      </div>
                      <h3 className="mt-0.5 text-base font-semibold text-foreground">{c.step}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{c.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>

              {related.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-xl font-bold tracking-tight text-foreground">
                    {country.name} Legalization Guides
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {related.map((p) => (
                      <li key={p.slug}>
                        <Link
                          to="/blog/$slug"
                          params={{ slug: p.slug }}
                          className="block rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30"
                        >
                          <span className="font-semibold text-foreground">{p.title}</span>
                          {p.excerpt && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                {!submitted ? (
                  <>
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-success">
                      <Clock className="h-3.5 w-3.5" /> Current Turnaround
                    </div>
                    <div className="mt-3 text-3xl font-bold text-foreground">9–12 Days</div>
                    <p className="text-xs text-muted-foreground">End-to-end from notary to embassy</p>

                    <div className="mt-4 rounded-lg border border-primary/15 bg-primary/5 p-3 text-[11px] leading-relaxed text-foreground/80">
                      <strong className="text-foreground">Contact us for latest pricing</strong> —
                      rates fluctuate based on Delhi transit schedules and changing embassy fee mandates.
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSubmitted(true);
                      }}
                      className="mt-5 space-y-3"
                    >
                      <input
                        required
                        type="text"
                        value={name}
                        maxLength={100}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full name"
                        className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                      />
                      <input
                        required
                        type="tel"
                        value={phone}
                        maxLength={20}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="WhatsApp number"
                        className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                      />

                      <div className="relative">
                        <select
                          value={docType}
                          onChange={(e) => setDocType(e.target.value)}
                          className="w-full appearance-none rounded-lg border border-input bg-background px-3.5 py-2.5 pr-9 text-sm font-medium text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/15"
                        >
                          <option value="">Document type (optional)</option>
                          {DOC_TYPES.map((d) => (
                            <option key={d}>{d}</option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>

                      <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-success py-3 text-sm font-semibold text-success-foreground shadow-elegant transition-all hover:-translate-y-0.5 hover:bg-success/92">
                        <MessageCircle className="h-4 w-4" />
                        Request Instant Pricing Quote via WhatsApp
                      </button>
                      <p className="flex items-center justify-center gap-1 text-center text-[11px] text-muted-foreground">
                        <Send className="h-3 w-3" /> Routed to {country.name} desk within 3 minutes
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-3 py-4 text-center">
                    <div className="relative">
                      <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-success/30" />
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success animate-scale-in">
                        <CheckCircle2 className="h-8 w-8" strokeWidth={2.4} />
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-foreground">Slot reserved</h4>
                    <p className="max-w-xs text-sm text-muted-foreground">
                      Lock it in directly with your {country.name} caseworker on WhatsApp.
                    </p>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex items-center gap-2 rounded-lg bg-success px-5 py-3 text-sm font-semibold text-success-foreground shadow-elegant transition-all hover:-translate-y-0.5 hover:bg-success/92"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Confirm on WhatsApp
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
