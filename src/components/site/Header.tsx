import { Link } from "@tanstack/react-router";
import { ShieldCheck, MessageCircle } from "lucide-react";

const navItems = [
  { label: "Services", to: "/" },
  { label: "Destinations", to: "/" },
  { label: "How It Works", to: "/" },
  { label: "Pricing & Timelines", to: "/" },
  { label: "About Us", to: "/" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <span className="text-[1.05rem] font-bold tracking-tight text-foreground">
            Apostille<span className="text-primary"> Sewa</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href="https://wa.me/9771000000000"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2.5 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background shadow-elegant transition-transform hover:-translate-y-0.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Chat with an Expert</span>
          <span className="hidden text-[11px] font-medium text-success sm:inline">Online</span>
        </a>
      </div>
    </header>
  );
}
