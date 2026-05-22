import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { LogoMark } from "./Logo";
import { PHONE_DISPLAY, PHONE_E164, EMAIL, ADDRESS_LINE } from "@/lib/contact";

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
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Apostille Sewa. All rights reserved.</p>
          <p>Registered document legalization facilitator · Kathmandu</p>
        </div>
      </div>
    </footer>
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
