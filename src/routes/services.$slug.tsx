import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { MobileTabBar } from "@/components/site/MobileTabBar";
import { ArrowRight, ArrowLeft, CheckCircle2, MessageCircle } from "lucide-react";
import { SITE_URL, WHATSAPP_BASE, buildWhatsAppUrl } from "@/lib/contact";

type ServiceContent = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
};

const SERVICES: Record<string, ServiceContent> = {
  "mofa-attestation": {
    slug: "mofa-attestation",
    title: "MOFA Attestation",
    tagline: "Ministry of Foreign Affairs stamping",
    description:
      "We file your originals at the Consular Department of Nepal's Ministry of Foreign Affairs in Kathmandu and return embassy-ready, stamped documents — typically within 48 working hours.",
    highlights: [
      "Same-day intake at our Kathmandu hub",
      "MOFA filing in ~48 working hours",
      "Verified scan + secure courier return",
    ],
  },
  "embassy-legalization": {
    slug: "embassy-legalization",
    title: "Embassy Legalization",
    tagline: "Direct European consular filing",
    description:
      "End-to-end submission at the destination European embassy — Poland, Germany, Croatia, Malta, Portugal, Cyprus — including translation oversight and consular fee handling.",
    highlights: [
      "Country-specific submission packets",
      "Translation & legalization oversight",
      "Live status updates via WhatsApp",
    ],
  },
  "pcc-authentication": {
    slug: "pcc-authentication",
    title: "PCC Authentication",
    tagline: "Police Clearance verification",
    description:
      "We obtain or authenticate your Police Clearance Certificate from Nepal Police HQ and route it through MOFA + the relevant embassy for visa-ready acceptance.",
    highlights: [
      "PCC pickup from Metropolitan Police HQ",
      "MOFA attestation included",
      "Embassy legalization on request",
    ],
  },
  "document-verification": {
    slug: "document-verification",
    title: "Document Verification",
    tagline: "Pre-submission integrity check",
    description:
      "A free, expert review of your stamps, translations, and supporting documents before filing — catching the rejection-causing errors that delay 1 in 4 applications.",
    highlights: [
      "Stamp & seal authenticity review",
      "Translation accuracy spot-check",
      "Embassy-specific requirement mapping",
    ],
  },
};

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES[params.slug];
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    return {
      meta: [
        { title: `${s?.title} — Apostille Sewa` },
        { name: "description", content: s?.description ?? "" },
        { property: "og:title", content: `${s?.title} — Apostille Sewa` },
        { property: "og:description", content: s?.description ?? "" },
        { property: "og:url", content: `${SITE_URL}/services/${s?.slug}` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/services/${s?.slug}` }],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  const waUrl = buildWhatsAppUrl(
    `Hi Apostille Sewa, I'd like the latest pricing & timeline for: ${service.title}. Please share details.`,
  );

  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <Header />
      <main>
        <section className="border-b border-border bg-[var(--surface)]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to home
            </Link>
            <span className="mt-6 block text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              {service.tagline}
            </span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {service.title}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground">{service.description}</p>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-xl font-semibold text-foreground">What's included</h2>
              <ul className="mt-5 space-y-3">
                {service.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-elegant">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                    <span className="text-sm text-foreground">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                  Live pricing
                </span>
                <h3 className="mt-3 text-lg font-bold text-foreground">
                  Contact Us for Latest Pricing
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Rates fluctuate frequently based on Delhi transit schedules and changing
                  official embassy fee mandates. Get an up-to-the-minute quote from an agent.
                </p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-success px-4 py-3 text-sm font-semibold text-success-foreground shadow-elegant transition-all hover:-translate-y-0.5 hover:bg-success/92"
                >
                  <MessageCircle className="h-4 w-4" />
                  Request Instant Pricing Quote via WhatsApp
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={WHATSAPP_BASE}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 block text-center text-[11px] text-muted-foreground hover:text-foreground"
                >
                  Avg. agent reply &lt; 3 min
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileTabBar />
    </div>
  );
}
