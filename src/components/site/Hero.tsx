import { Star, ShieldCheck, FileCheck2 } from "lucide-react";
import { PathFinder } from "./PathFinder";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 0%, color-mix(in oklab, var(--primary) 10%, transparent), transparent 55%), radial-gradient(circle at 100% 100%, color-mix(in oklab, var(--success) 8%, transparent), transparent 50%)",
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
