import { PackageCheck, FileSearch, Truck } from "lucide-react";

const steps = [
  {
    icon: PackageCheck,
    title: "Secure Handover",
    body: "Drop off your physical documents at our Kathmandu hub or send them via a tracked secure domestic courier.",
  },
  {
    icon: FileSearch,
    title: "Expert Processing",
    body: "Our team handles verification steps at Notary, MOFA (Consular Dept), and your destination Embassy.",
  },
  {
    icon: Truck,
    title: "Tracked Delivery",
    body: "Collect your stamped originals at our hub, or get them delivered to your address with a secure digital scan sent in advance.",
  },
];

export function Process() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            The 3-Step Hands-Off Process
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How We Secure Your European Document Legalization
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            A single, accountable workflow — from notary to embassy stamp — managed end-to-end.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="group relative rounded-2xl border border-border bg-card p-7 shadow-elegant transition-all hover:-translate-y-1 hover:border-primary/30"
            >
              <div className="absolute right-6 top-6 text-[42px] font-bold leading-none text-primary/8">
                0{i + 1}
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
