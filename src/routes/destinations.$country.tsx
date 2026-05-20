import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Footer } from "@/components/site/Footer";
import { COUNTRIES } from "@/components/site/Destinations";
import { Flag } from "@/components/site/Flag";
import { ArrowLeft, CheckCircle2, Clock, FileText, Stamp, Building2, Send, ArrowRight } from "lucide-react";

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
    const country = COUNTRIES.find((c) => c.slug === params.country);
    if (!country) throw notFound();
    return { country };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Apostille & Embassy Legalization for ${loaderData?.country.name} in Nepal` },
      {
        name: "description",
        content: `Step-by-step MOFA, notary, and embassy legalization for ${loaderData?.country.name}. Trusted by Nepali applicants for work and student visas.`,
      },
    ],
  }),
  component: CountryPage,
});

function CountryPage() {
  const { country } = Route.useLoaderData();
  const checklist = CHECKLIST.default;
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="border-b border-border bg-[var(--surface)]">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to all destinations
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <span className="flex h-14 w-20 items-center justify-center overflow-hidden rounded-md border border-border bg-background shadow-elegant">
                <Flag code={country.code} title={country.name} />
              </span>
              <div>
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
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.4fr_1fr]">
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
                    <div className="flex-1">
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
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-success">
                  <Clock className="h-3.5 w-3.5" /> Current Turnaround
                </div>
                <div className="mt-3 text-3xl font-bold text-foreground">9–12 Days</div>
                <p className="text-xs text-muted-foreground">End-to-end from notary to embassy</p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                    setTimeout(() => navigate({ to: "/success" }), 600);
                  }}
                  className="mt-6 space-y-3"
                >
                  <input
                    required
                    type="text"
                    placeholder="Full name"
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="WhatsApp number"
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                  <input
                    type="text"
                    placeholder="Document type (optional)"
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                  <button
                    disabled={submitted}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-all hover:bg-primary/92 disabled:opacity-60"
                  >
                    {submitted ? "Filing request…" : <>Reserve My {country.name} Slot <ArrowRight className="h-4 w-4" /></>}
                  </button>
                  <p className="text-center text-[11px] text-muted-foreground flex items-center justify-center gap-1">
                    <Send className="h-3 w-3" /> Routed to {country.name} desk within 3 minutes
                  </p>
                </form>
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
