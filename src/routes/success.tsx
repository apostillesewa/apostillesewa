import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, MessageCircle, Home } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { WHATSAPP_BASE } from "@/lib/contact";

export const Route = createFileRoute("/success")({
  head: () => ({
    meta: [
      { title: "Request Received — Apostille Sewa" },
      { name: "description", content: "Your legalization request has been filed with our active desk." },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-10 text-center shadow-card">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="h-8 w-8" strokeWidth={2.25} />
          </div>
          <span className="mt-6 inline-block text-[11px] font-semibold uppercase tracking-[0.18em] text-success">
            Request Filed Successfully
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
            Your request has been filed.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Our legalization desk has received your details. To fast-track this directly to the
            active agent handling your destination embassy, continue on WhatsApp below.
          </p>

          <a
            href={WHATSAPP_BASE}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-success px-5 py-3.5 text-sm font-semibold text-success-foreground shadow-elegant transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="h-4 w-4" />
            Fast-track on WhatsApp
            <ArrowRight className="h-4 w-4" />
          </a>

          <Link
            to="/"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium text-foreground hover:bg-muted"
          >
            <Home className="h-4 w-4" /> Back to homepage
          </Link>

          <p className="mt-6 text-[11px] text-muted-foreground">
            Reference id: AS-{Math.floor(100000 + Math.random() * 899999)}
          </p>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
