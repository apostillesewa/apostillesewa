import { Stamp, Landmark, Building2, Globe2 } from "lucide-react";

const logos = [
  { icon: Stamp, label: "Notary Public Registry" },
  { icon: Landmark, label: "Ministry of Foreign Affairs (MOFA) Nepal" },
  { icon: Building2, label: "Dept. of Consular Services" },
  { icon: Globe2, label: "EU Delegate Offices" },
];

export function AuthorityStrip() {
  return (
    <section className="border-b border-border bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Officially coordinated across the full legalization pipeline
        </p>
        <div className="mt-6 grid grid-cols-2 items-center gap-8 sm:grid-cols-4">
          {logos.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 text-center text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="h-7 w-7" strokeWidth={1.5} />
              <span className="text-[11px] font-medium leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
