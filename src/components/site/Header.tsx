import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, MessageCircle, Menu, X } from "lucide-react";
import { PricingModal } from "./PricingModal";

type NavAction =
  | { kind: "scroll"; sectionId: string; label: string }
  | { kind: "pricing"; label: string }
  | { kind: "route"; to: string; label: string };

const NAV: NavAction[] = [
  { kind: "scroll", sectionId: "process", label: "Services" },
  { kind: "scroll", sectionId: "destinations", label: "Destinations" },
  { kind: "scroll", sectionId: "process", label: "How It Works" },
  { kind: "pricing", label: "Pricing & Timelines" },
  { kind: "route", to: "/about", label: "About Us" },
];

export function Header() {
  const navigate = useNavigate();
  const [pricingOpen, setPricingOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  function smoothScroll(id: string) {
    if (pathname !== "/") {
      navigate({ to: "/", hash: id });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleNav(item: NavAction) {
    setMobileOpen(false);
    if (item.kind === "scroll") smoothScroll(item.sectionId);
    else if (item.kind === "pricing") setPricingOpen(true);
    else navigate({ to: item.to });
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" strokeWidth={2.25} />
            </span>
            <span className="text-[1.05rem] font-bold tracking-tight text-foreground">
              Apostille<span className="text-primary"> Sewa</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item)}
                className="cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/9771000000000"
              target="_blank"
              rel="noreferrer"
              className="group hidden items-center gap-2.5 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background shadow-elegant transition-transform hover:-translate-y-0.5 sm:inline-flex"
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-border bg-background lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
              {NAV.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNav(item)}
                  className="rounded-md px-3 py-2.5 text-left text-sm font-medium text-foreground hover:bg-muted"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="https://wa.me/9771000000000"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background sm:hidden"
              >
                <MessageCircle className="h-4 w-4" /> Chat with an Expert
              </a>
            </nav>
          </div>
        )}
      </header>

      {pricingOpen && <PricingModal onClose={() => setPricingOpen(false)} />}
    </>
  );
}
