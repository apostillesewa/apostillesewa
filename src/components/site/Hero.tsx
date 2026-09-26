import { useEffect } from "react";
import { Star, ShieldCheck, FileCheck2 } from "lucide-react";
import { PathFinder } from "./PathFinder";

const FEATURABLE_SRC = "https://featurable.com/assets/bundle.js";

export function Hero() {
  useEffect(() => {
    if (!document.querySelector(`script[src="${FEATURABLE_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = FEATURABLE_SRC;
      script.defer = true;
      script.charSet = "UTF-8";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      {/* Ultra-faint engineering grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.045) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 30%, #000 40%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 30%, #000 40%, transparent 85%)",
        }}
      />
      {/* Soft radial glow behind Path-Finder */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 78% 45%, rgba(37,99,235,0.10), transparent 55%), radial-gradient(circle at 12% 10%, rgba(37,99,235,0.04), transparent 50%), radial-gradient(circle at 100% 100%, rgba(16,185,129,0.05), transparent 55%)",
        }}
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-28">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-success/20 bg-success/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-success">
            <Star className="h-3.5 w-3.5 fill-current" />
            100% Verification &amp; Acceptance Guarantee
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
            Fast, Legally Secured{" "}
            <span className="text-primary">Apostille &amp; Embassy Legalization</span> in Nepal.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-[17px]">
            Skip the lines and avoid costly document rejections. We expertly manage your MOFA
            attestation, Police Clearance Certificates (PCC), and European embassy submissions
            from Kathmandu.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6">
            <TrustBadge icon={<Star className="h-4 w-4 fill-current text-amber-500" />} label="4.9/5 Google Rating" />
            <TrustBadge icon={<FileCheck2 className="h-4 w-4 text-primary" />} label="8,500+ Legalized Documents" />
            <TrustBadge icon={<ShieldCheck className="h-4 w-4 text-success" />} label="Error-Free Processing Guarantee" />
          </div>
        </div>

        <div className="lg:pl-4">
          <PathFinder />
          </div>

          {/* Featurable reviews widget */}
          <div className="mt-6 max-w-xl">
            <div
              id="featurable-6136dad8-628a-4922-b8e3-72af38c79bac"
              data-featurable-async
            />
          </div>
        </div>
    </section>
  );
}

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs font-medium text-foreground/80">
      {icon}
      <span>{label}</span>
    </div>
  );
}
