import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export function FloatingWhatsApp() {
  const [open, setOpen] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {open && (
        <div className="hidden max-w-xs animate-fade-in items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-card sm:flex">
          <button
            onClick={() => setOpen(false)}
            className="absolute right-2 top-2 rounded-md p-1 text-muted-foreground hover:bg-muted"
            aria-label="Dismiss"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <div className="relative">
            <p className="pr-4 text-sm font-medium leading-snug text-foreground">
              🇵🇱 Heading to Europe? Let's check your documents on WhatsApp.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Avg. reply &lt; 3 min</p>
          </div>
        </div>
      )}
      <a
        href="https://wa.me/9771000000000"
        target="_blank"
        rel="noreferrer"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-success text-success-foreground shadow-card transition-transform hover:scale-105 animate-pulse-dot"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" strokeWidth={2.25} />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-background bg-success" />
        </span>
      </a>
    </div>
  );
}
