import { Link } from "@tanstack/react-router";
import { ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <span className="text-base font-bold tracking-tight">
                Apostille<span className="text-primary"> Sewa</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Nepal's specialized document legalization and embassy verification service for
              individuals moving to Europe for work or study.
            </p>
          </div>

          <FooterCol
            title="Services"
            items={["MOFA Attestation", "Embassy Legalization", "Apostille", "PCC Authentication"]}
          />
          <FooterCol
            title="Destinations"
            items={["Poland", "Germany", "Croatia", "Malta", "Portugal", "Cyprus"]}
          />
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> Kathmandu Hub, Nepal</li>
              <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> +977 1 000 0000</li>
              <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> hello@apostillesewa.com</li>
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

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i}><a href="#" className="hover:text-foreground">{i}</a></li>
        ))}
      </ul>
    </div>
  );
}
