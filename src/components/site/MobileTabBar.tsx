import { Phone, MessageCircle } from "lucide-react";
import { PHONE_E164, WHATSAPP_BASE } from "@/lib/contact";

/**
 * Persistent two-target action bar visible on small viewports.
 * Pinned to the bottom of the screen — never competes with the FAB on desktop.
 */
export function MobileTabBar() {
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:hidden"
    >
      <a
        href={`tel:${PHONE_E164}`}
        className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
      >
        <Phone className="h-4 w-4 text-primary" />
        Call Hub
      </a>
      <a
        href={WHATSAPP_BASE}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 border-l border-border bg-success py-3.5 text-sm font-semibold text-success-foreground transition-colors hover:bg-success/92"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp Expert
      </a>
    </nav>
  );
}
