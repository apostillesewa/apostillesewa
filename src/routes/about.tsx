import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { ShieldCheck, Users, MapPin, Award, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Apostille Sewa — Trusted Document Legalization in Kathmandu" },
      {
        name: "description",
        content:
          "Apostille Sewa is a Kathmandu-based visa-support agency specializing in MOFA attestation, apostille, and embassy legalization for individuals moving to Europe.",
      },
      { property: "og:title", content: "About Apostille Sewa" },
      { property: "og:description", content: "Kathmandu's specialist document legalization agency for European destinations." },
    ],
  }),
  component: AboutPage,
});

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Legally Accountable",
    body: "Registered facilitator with a verifiable paper trail at every stage — notary, MOFA, embassy.",
  },
  {
    icon: Users,
    title: "Human Caseworkers",
    body: "Every file is managed by a named consular agent — not a chatbot. Average reply under 3 minutes.",
  },
  {
    icon: MapPin,
    title: "Based in Kathmandu",
    body: "Walk-in hub minutes from the MOFA Consular Department. Most embassies filed in-person, same week.",
  },
  {
    icon: Award,
    title: "8,500+ Documents Cleared",
    body: "Trusted by students, professionals, and SMEs heading to Poland, Germany, Croatia, Malta, Portugal, and Cyprus.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="border-b border-border bg-[var(--surface)]">
          <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              About Apostille Sewa
            </span>
            <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
              A specialist desk for Nepali documents heading to Europe.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Apostille Sewa is a Kathmandu-based visa-support agency. We focus on one thing only:
              moving Nepali academic, civil, and commercial documents through Notary, the Ministry
              of Foreign Affairs (MOFA), and European embassy legalization — cleanly, on the first
              attempt.
            </p>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PILLARS.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-elegant"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-[var(--surface)]">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Why we exist
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Each year, thousands of qualified Nepali applicants lose visa slots because a single
                stamp is missing, a translation isn't recognised, or a MOFA submission lands in the
                wrong window. We built Apostille Sewa to remove that friction entirely.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                We don't sell visas. We don't promise outcomes we can't control. What we guarantee
                is that your documents arrive at the embassy in a state that gives you the best
                possible chance of acceptance.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                Our commitment
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-foreground">
                <Bullet>Transparent flat pricing — published per country, no surprises.</Bullet>
                <Bullet>Named caseworker for every file, reachable on WhatsApp.</Bullet>
                <Bullet>Free re-submission if a document is rejected on our handling.</Bullet>
                <Bullet>Auto-deletion of uploaded files within 24 hours of review.</Bullet>
              </ul>
              <Link
                to="/"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Start a file <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
      <span>{children}</span>
    </li>
  );
}
