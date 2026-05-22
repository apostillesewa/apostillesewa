import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { MobileTabBar } from "@/components/site/MobileTabBar";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import {
  PHONE_DISPLAY,
  PHONE_E164,
  EMAIL,
  WHATSAPP_BASE,
  OFFICE_HOURS,
  ADDRESS_LINE,
  SITE_URL,
  buildWhatsAppUrl,
} from "@/lib/contact";

const DESTINATIONS = ["Poland", "Germany", "Croatia", "Malta", "Portugal", "Cyprus", "Czech Republic", "Other / Undecided"];

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact Apostille Sewa — Kathmandu Document Legalization Desk" },
      {
        name: "description",
        content: `Reach our Kathmandu legalization desk. Email ${EMAIL}, call ${PHONE_DISPLAY}, or chat on WhatsApp. ${OFFICE_HOURS}.`,
      },
      { property: "og:title", content: "Contact Apostille Sewa — Kathmandu Hub" },
      { property: "og:description", content: "Reach Nepal's premier apostille & embassy legalization desk." },
      { property: "og:url", content: `${SITE_URL}/contact-us` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact-us` }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <Header />
      <main>
        <section className="border-b border-border bg-[var(--surface)]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
            <nav aria-label="Breadcrumb" className="mb-4 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span className="px-1.5">/</span>
              <span className="text-foreground">Contact</span>
            </nav>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Talk to a Specialist
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Contact our Kathmandu Legalization Desk
            </h1>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground">
              Reach a consular agent directly — we typically reply on WhatsApp within 3 minutes
              during operational hours.
            </p>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            {/* LEFT — coordinates */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
                <h2 className="text-lg font-semibold text-foreground">Corporate Coordinates</h2>
                <ul className="mt-5 space-y-4 text-sm">
                  <ContactRow icon={<Mail className="h-4 w-4 text-primary" />} label="Email">
                    <a href={`mailto:${EMAIL}`} className="font-medium text-foreground hover:text-primary">
                      {EMAIL}
                    </a>
                  </ContactRow>
                  <ContactRow icon={<Phone className="h-4 w-4 text-primary" />} label="Phone">
                    <a href={`tel:${PHONE_E164}`} className="font-medium text-foreground hover:text-primary">
                      {PHONE_DISPLAY}
                    </a>
                  </ContactRow>
                  <ContactRow icon={<MessageCircle className="h-4 w-4 text-success" />} label="WhatsApp">
                    <a
                      href={WHATSAPP_BASE}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-foreground hover:text-primary"
                    >
                      Open chat ↗
                    </a>
                  </ContactRow>
                  <ContactRow icon={<MapPin className="h-4 w-4 text-foreground/70" />} label="Office">
                    <span className="font-medium text-foreground">{ADDRESS_LINE}</span>
                  </ContactRow>
                </ul>
              </div>

              <div className="rounded-2xl border border-success/25 bg-success/5 p-5">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-success">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                  </span>
                  Currently Open
                </div>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Clock className="h-4 w-4 text-success" />
                  {OFFICE_HOURS}
                </p>
              </div>

              {/* Embedded map frame */}
              <div className="overflow-hidden rounded-2xl border border-border shadow-elegant">
                <iframe
                  title="Apostille Sewa — Kathmandu Hub location map"
                  loading="lazy"
                  className="h-64 w-full"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=85.2911%2C27.6900%2C85.3611%2C27.7300&layer=mapnik&marker=27.7172%2C85.3240"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* RIGHT — lead form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileTabBar />
    </div>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
        {icon}
      </span>
      <div className="min-w-0">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <div className="mt-0.5 break-all">{children}</div>
      </div>
    </li>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const valid = name.trim().length > 1 && phone.trim().length > 5;

  const waUrl = buildWhatsAppUrl(
    `Hi Apostille Sewa, new inquiry via website.\n\n• Name: ${name}\n• WhatsApp: ${phone}\n• Destination: ${destination || "Not selected"}\n• Message: ${message || "—"}`,
  );

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-10 text-center shadow-card">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="h-8 w-8" strokeWidth={2.4} />
        </div>
        <h3 className="text-lg font-bold text-foreground">Inquiry received</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          We've logged your request. Fast-track it on WhatsApp so an agent can pick it up immediately.
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-2 rounded-lg bg-success px-5 py-3 text-sm font-semibold text-success-foreground shadow-elegant transition-all hover:-translate-y-0.5 hover:bg-success/92"
        >
          <MessageCircle className="h-4 w-4" /> Continue on WhatsApp
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!valid) return;
        setSubmitted(true);
      }}
      className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8"
    >
      <div>
        <h2 className="text-lg font-semibold text-foreground">Send a High-Intent Inquiry</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Routed directly to a consular agent on the Kathmandu desk.
        </p>
      </div>

      <Labeled label="Full Name">
        <input
          required
          type="text"
          maxLength={120}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="As on your passport"
          className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
      </Labeled>

      <Labeled label="WhatsApp Number">
        <input
          required
          type="tel"
          maxLength={20}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+977 …"
          className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
      </Labeled>

      <Labeled label="Destination Country">
        <div className="relative">
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full appearance-none rounded-lg border border-input bg-background px-3.5 py-2.5 pr-9 text-sm font-medium text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/15"
          >
            <option value="">Select destination…</option>
            {DESTINATIONS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </Labeled>

      <Labeled label="Message">
        <textarea
          rows={4}
          maxLength={1000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Briefly describe your documents and timeline…"
          className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
      </Labeled>

      <button
        disabled={!valid}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-all hover:-translate-y-0.5 hover:bg-primary/92 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
      >
        Submit Inquiry <ArrowRight className="h-4 w-4" />
      </button>
      <p className="text-center text-[11px] text-muted-foreground">
        We never share your information. Reviewed by a human agent.
      </p>
    </form>
  );
}

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground/80">
        {label}
      </span>
      {children}
    </label>
  );
}
