import { useState } from "react";
import { ArrowRight, CheckCircle2, Clock, FileText, MapPin, X, Loader2 } from "lucide-react";

const DOC_TYPES = [
  "Academic Degree / Transcript",
  "Birth / Marriage Certificate",
  "Police Clearance Certificate (PCC)",
  "Commercial Invoice",
];

const COUNTRIES = [
  { name: "Poland", flag: "🇵🇱", embassyDays: "9 Working Days" },
  { name: "Germany", flag: "🇩🇪", embassyDays: "12 Working Days" },
  { name: "Croatia", flag: "🇭🇷", embassyDays: "10 Working Days" },
  { name: "Malta", flag: "🇲🇹", embassyDays: "8 Working Days" },
  { name: "Portugal", flag: "🇵🇹", embassyDays: "11 Working Days" },
  { name: "Cyprus", flag: "🇨🇾", embassyDays: "7 Working Days" },
  { name: "Czech Republic", flag: "🇨🇿", embassyDays: "10 Working Days" },
];

export function PathFinder() {
  const [doc, setDoc] = useState("");
  const [country, setCountry] = useState("");
  const [open, setOpen] = useState(false);

  const valid = doc && country;
  const selectedCountry = COUNTRIES.find((c) => c.name === country);

  return (
    <>
      <div className="relative rounded-2xl border border-border bg-card p-7 shadow-card">
        <div className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
          Path-Finder
        </div>

        <h3 className="text-lg font-semibold text-foreground">
          Instant Price &amp; Timeline Estimate
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Two steps. No commitment. Zero guesswork.
        </p>

        <div className="mt-6 space-y-5">
          <Field
            step={1}
            icon={<FileText className="h-4 w-4" />}
            label="Select Document Type"
          >
            <select
              value={doc}
              onChange={(e) => setDoc(e.target.value)}
              className="w-full appearance-none rounded-lg border border-input bg-background px-3.5 py-3 text-sm font-medium text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/15"
            >
              <option value="">— Choose document —</option>
              {DOC_TYPES.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </Field>

          <Field
            step={2}
            icon={<MapPin className="h-4 w-4" />}
            label="Select Target European Country"
          >
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full appearance-none rounded-lg border border-input bg-background px-3.5 py-3 text-sm font-medium text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/15"
            >
              <option value="">— Choose country —</option>
              {COUNTRIES.map((c) => (
                <option key={c.name}>{c.name}</option>
              ))}
            </select>
          </Field>

          <button
            disabled={!valid}
            onClick={() => setOpen(true)}
            className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground shadow-elegant transition-all hover:bg-primary/92 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            Get Price &amp; Timeline Instantly
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-success" />
            Encrypted &amp; reviewed by certified consular agents
          </div>
        </div>
      </div>

      {open && selectedCountry && (
        <EstimateModal
          doc={doc}
          country={selectedCountry}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

function Field({
  step,
  icon,
  label,
  children,
}: {
  step: number;
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/10 text-[11px] font-bold text-primary">
          {step}
        </span>
        <span className="flex items-center gap-1.5 text-xs font-medium text-foreground">
          {icon}
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

function EstimateModal({
  doc,
  country,
  onClose,
}: {
  doc: string;
  country: (typeof COUNTRIES)[number];
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-8 shadow-card animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1.5 text-muted-foreground hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-success">
          <CheckCircle2 className="h-3 w-3" />
          Eligible for Processing
        </div>

        <h3 className="mt-4 text-xl font-bold text-foreground">
          Estimate for{" "}
          <span className="text-primary">
            {country.flag} {country.name}
          </span>
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{doc}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <TimelineCard icon={<Clock />} label="MOFA Processing" value="48 Hours" tone="primary" />
          <TimelineCard
            icon={<Clock />}
            label={`${country.name} Embassy`}
            value={country.embassyDays}
            tone="success"
          />
        </div>

        {!submitted ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="mt-6 space-y-3"
          >
            <input
              required
              type="text"
              placeholder="Full name"
              className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
            <input
              required
              type="tel"
              placeholder="WhatsApp number (+977…)"
              className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-all hover:bg-primary/92">
              Reserve My Slot <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-center text-[11px] text-muted-foreground">
              We reply within 3 minutes during working hours.
            </p>
          </form>
        ) : (
          <div className="mt-6 flex flex-col items-center gap-3 rounded-lg border border-success/20 bg-success/5 p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="text-base font-semibold text-foreground">Request filed successfully</h4>
            <p className="text-xs text-muted-foreground">
              Fast-track this to our active desk now.
            </p>
            <a
              href="https://wa.me/9771000000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-success px-4 py-2.5 text-sm font-semibold text-success-foreground"
            >
              <Loader2 className="h-4 w-4" /> Continue on WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function TimelineCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "primary" | "success";
}) {
  const toneClasses =
    tone === "primary"
      ? "border-primary/15 bg-primary/5 text-primary"
      : "border-success/15 bg-success/5 text-success";
  return (
    <div className={`rounded-xl border p-4 ${toneClasses}`}>
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider opacity-80">
        <span className="[&>svg]:h-3.5 [&>svg]:w-3.5">{icon}</span>
        {label}
      </div>
      <div className="mt-1.5 text-lg font-bold text-foreground">{value}</div>
    </div>
  );
}
