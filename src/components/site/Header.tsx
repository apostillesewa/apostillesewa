import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  Stamp,
  Building2,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";
import { Logo } from "./Logo";
import { WHATSAPP_BASE } from "@/lib/contact";
import { COUNTRIES } from "@/lib/countries";

type ServiceItem = { label: string; to: string; description: string; icon: typeof Stamp };
type DestinationItem = { label: string; slug: string };

const SERVICES: ServiceItem[] = [
  { label: "MOFA Attestation", to: "/services/mofa-attestation", description: "Ministry of Foreign Affairs stamping", icon: Stamp },
  { label: "Embassy Legalization", to: "/services/embassy-legalization", description: "Direct European consular filing", icon: Building2 },
  { label: "PCC Authentication", to: "/services/pcc-authentication", description: "Police Clearance verification", icon: ShieldCheck },
  { label: "Document Verification", to: "/services/document-verification", description: "Pre-submission integrity check", icon: FileCheck2 },
];

const DESTINATIONS: DestinationItem[] = [
  ...COUNTRIES.filter((c) => c.featured).map((c) => ({ label: c.name, slug: c.slug })),
];

export function Header() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"services" | "destinations" | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<"services" | "destinations" | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Close on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  function go(to: string) {
    setMobileOpen(false);
    setOpenMenu(null);
    navigate({ to });
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
        <Logo />

        <nav ref={navRef} className="hidden items-center gap-1 lg:flex">
          <DropdownButton
            label="Services"
            open={openMenu === "services"}
            onToggle={() => setOpenMenu(openMenu === "services" ? null : "services")}
          >
            <div className="grid w-[28rem] grid-cols-2 gap-1 p-3">
              {SERVICES.map((s) => (
                <button
                  key={s.to}
                  onClick={() => go(s.to)}
                  className="flex items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-muted"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <s.icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-foreground">{s.label}</span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">
                      {s.description}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </DropdownButton>

          <DropdownButton
            label="Destinations"
            open={openMenu === "destinations"}
            onToggle={() => setOpenMenu(openMenu === "destinations" ? null : "destinations")}
          >
            <div className="grid w-56 grid-cols-2 gap-0.5 p-2">
              {DESTINATIONS.map((d) => (
                <button
                  key={d.slug}
                  onClick={() => go(`/destinations/${d.slug}`)}
                  className="rounded-md px-3 py-2 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {d.label}
                </button>
              ))}
              <button
                onClick={() => go("/destinations")}
                className="col-span-2 rounded-md px-3 py-2 text-left text-sm font-semibold text-primary transition-colors hover:bg-muted"
              >
                All destinations →
              </button>
            </div>
          </DropdownButton>

          <NavLink to="/blog">Insights</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/contact-us">Contact</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_BASE}
            target="_blank"
            rel="noreferrer"
            className="group hidden items-center gap-2.5 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background shadow-elegant transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:inline-flex"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <MessageCircle className="h-4 w-4" />
            <span className="hidden md:inline">Chat with an Expert</span>
          </a>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile sliding menu with accordion */}
      {mobileOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-0.5 px-3 py-3">
            <MobileAccordion
              label="Services"
              open={mobileAccordion === "services"}
              onToggle={() => setMobileAccordion(mobileAccordion === "services" ? null : "services")}
            >
              {SERVICES.map((s) => (
                <button
                  key={s.to}
                  onClick={() => go(s.to)}
                  className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm font-medium text-foreground hover:bg-muted"
                >
                  <s.icon className="h-3.5 w-3.5 text-primary" />
                  {s.label}
                </button>
              ))}
            </MobileAccordion>

            <MobileAccordion
              label="Destinations"
              open={mobileAccordion === "destinations"}
              onToggle={() => setMobileAccordion(mobileAccordion === "destinations" ? null : "destinations")}
            >
              {DESTINATIONS.map((d) => (
                <button
                  key={d.slug}
                  onClick={() => go(`/destinations/${d.slug}`)}
                  className="block w-full rounded-md px-3 py-2.5 text-left text-sm font-medium text-foreground hover:bg-muted"
                >
                  {d.label}
                </button>
              ))}
            </MobileAccordion>

            <MobileLink to="/blog">Insights</MobileLink>
            <MobileLink to="/about">About Us</MobileLink>
            <MobileLink to="/contact-us">Contact</MobileLink>

            <a
              href={WHATSAPP_BASE}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background"
            >
              <MessageCircle className="h-4 w-4" /> Chat with an Expert
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      activeProps={{ className: "text-foreground" }}
    >
      {children}
    </Link>
  );
}

function DropdownButton({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-card shadow-card animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}

function MobileAccordion({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border/60">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-sm font-semibold text-foreground hover:bg-muted"
      >
        {label}
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pb-2 pl-2">{children}</div>}
    </div>
  );
}

function MobileLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="block rounded-md px-3 py-3 text-sm font-semibold text-foreground hover:bg-muted"
    >
      {children}
    </Link>
  );
}
