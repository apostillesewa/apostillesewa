import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { LogoMark } from "./Logo";
import { PHONE_DISPLAY, PHONE_E164, EMAIL, ADDRESS_LINE } from "@/lib/contact";
import { subscribeNewsletter } from "@/lib/newsletter.functions";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5" aria-label="Apostille Sewa — Home">
              <LogoMark className="h-9 w-9" />
              <span className="text-base font-extrabold tracking-tight">
                Apostille<span className="font-normal text-primary"> Sewa</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Nepal's specialized document legalization and embassy verification service for
              individuals moving to Europe for work or study.
            </p>
            <NewsletterForm />
          </div>

          <FooterCol
            title="Services"
            items={[
              { label: "MOFA Attestation", to: "/services/mofa-attestation" },
              { label: "Embassy Legalization", to: "/services/embassy-legalization" },
              { label: "PCC Authentication", to: "/services/pcc-authentication" },
              { label: "Document Verification", to: "/services/document-verification" },
            ]}
          />
          <FooterCol
            title="Destinations"
            items={[
              { label: "Poland", to: "/destinations/poland" },
              { label: "Germany", to: "/destinations/germany" },
              { label: "Croatia", to: "/destinations/croatia" },
              { label: "Malta", to: "/destinations/malta" },
              { label: "Portugal", to: "/destinations/portugal" },
              { label: "Cyprus", to: "/destinations/cyprus" },
            ]}
          />
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" /> {ADDRESS_LINE}
              </li>
              <li>
                <a href={`tel:${PHONE_E164}`} className="flex items-center gap-2 hover:text-foreground">
                  <Phone className="h-3.5 w-3.5" /> {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-foreground">
                  <Mail className="h-3.5 w-3.5" /> {EMAIL}
                </a>
              </li>
              <li>
                <Link to="/contact-us" className="inline-flex font-semibold text-primary hover:underline">
                  Visit Contact Page →
                </Link>
              </li>
              <li>
                <Link to="/blog" className="inline-flex hover:text-foreground">Insights</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <div
            className="trustpilot-widget"
            data-locale="en-US"
            data-template-id="56278e9abfbbba0bdcd568bc"
            data-businessunit-id="6a6103c64cd5133eae3e953b"
            data-style-height="52px"
            data-style-width="100%"
            data-token="c0e19964-5fcc-4b1c-9a35-f6d148181248"
          >
            <a
              href="https://www.trustpilot.com/review/apostillesewa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Trustpilot
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Apostille Sewa. All rights reserved.</p>
          <p>Registered document legalization facilitator · Kathmandu</p>
        </div>
      </div>
    </footer>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (state === "busy") return;
        setState("busy");
        try {
          await subscribeNewsletter({ data: { email } });
          setState("ok");
        } catch {
          setState("err");
        }
      }}
      className="mt-5 max-w-sm"
    >
      <label className="block text-[11px] font-semibold uppercase tracking-wider text-foreground">
        Embassy updates in your inbox
      </label>
      {state === "ok" ? (
        <p className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-success/10 px-2.5 py-1.5 text-xs text-success">
          <CheckCircle2 className="h-3.5 w-3.5" /> Subscribed — thank you.
        </p>
      ) : (
        <div className="mt-2 flex gap-2">
          <input
            required
            type="email"
            maxLength={255}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
          <button
            disabled={state === "busy"}
            className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:-translate-y-0.5 transition-all disabled:opacity-60"
          >
            {state === "busy" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ArrowRight className="h-3.5 w-3.5" />}
          </button>
        </div>
      )}
      {state === "err" && <p className="mt-1 text-[11px] text-destructive">Couldn't subscribe. Try again.</p>}
    </form>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i.to}>
            <Link to={i.to} className="hover:text-foreground">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
