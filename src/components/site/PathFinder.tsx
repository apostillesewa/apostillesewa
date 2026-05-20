import { useState } from "react";
import { ArrowRight, CheckCircle2, Clock, FileText, MapPin, X, MessageCircle, ClipboardList } from "lucide-react";
import { Flag, type CountryCode } from "./Flag";

const DOC_TYPES = [
  "Academic Degree / Transcript",
  "Birth / Marriage Certificate",
  "Police Clearance Certificate (PCC)",
  "Commercial Invoice",
];

type Country = {
  name: string;
  code: CountryCode;
  embassyDays: string;
};

const COUNTRIES: Country[] = [
  { name: "Poland", code: "PL", embassyDays: "9 Working Days" },
  { name: "Germany", code: "DE", embassyDays: "12 Working Days" },
  { name: "Croatia", code: "HR", embassyDays: "10 Working Days" },
  { name: "Malta", code: "MT", embassyDays: "8 Working Days" },
  { name: "Portugal", code: "PT", embassyDays: "11 Working Days" },
  { name: "Cyprus", code: "CY", embassyDays: "7 Working Days" },
  { name: "Czech Republic", code: "CZ", embassyDays: "10 Working Days" },
];

const REQUIREMENTS: Record<string, string[]> = {
  "Academic Degree / Transcript": [
    "Original Degree / Transcript",
    "Tribhuvan University / Board verification letter",
    "Passport copy (photo page)",
  ],
  "Birth / Marriage Certificate": [
    "Original certificate from Ward office / DAO",
    "Citizenship copy of applicant",
    "Passport copy (photo page)",
  ],
  "Police Clearance Certificate (PCC)": [
    "Original PCC from Metropolitan Police HQ",
    "Citizenship copy",
    "Passport copy (photo page)",
  ],
  "Commercial Invoice": [
    "Original invoice signed by authorised signatory",
    "Company registration (PAN / VAT) copy",
    "Chamber of Commerce endorsement",
  ],
};

const WHATSAPP_NUMBER = "9771000000000";

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
          <Field step={1} icon={<FileText className="h-4 w-4" />} label="Select Document Type">
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

          <Field step={2} icon={<MapPin className="h-4 w-4" />} label="Select Target European Country">
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
        <EstimateModal doc={doc} country={selectedCountry} onClose={() => setOpen(false)} />
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
  country: Country;
  onClose: () => void;
}) {
  const requirements = REQUIREMENTS[doc] ?? [];

  const message = encodeURIComponent(
    `Hi Apostille Sewa, I'd like to fast-track my legalization request.\n\n• Document: ${doc}\n• Destination: ${country.name}\n• Expected turnaround: 48 hrs MOFA + ${country.embassyDays} Embassy\n\nPlease share the next steps.`,
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

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
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-success">
          <CheckCircle2 className="h-3 w-3" />
          Eligible for Processing
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="flex h-9 w-12 items-center justify-center overflow-hidden rounded-md border border-border shadow-sm">
            <Flag code={country.code} title={country.name} />
          </span>
          <div>
            <h3 className="text-xl font-bold leading-tight text-foreground">
              Tailored Plan for{" "}
              <span className="text-primary">{country.name}</span>
            </h3>
            <p className="text-sm text-muted-foreground">{doc}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <TimelineCard icon={<Clock />} label="MOFA Processing" value="~48 Hours" tone="primary" />
          <TimelineCard
            icon={<Clock />}
            label={`${country.name} Embassy`}
            value={country.embassyDays}
            tone="success"
          />
        </div>

        <div className="mt-5 rounded-xl border border-border bg-[var(--surface)] p-4">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground/70">
            <ClipboardList className="h-3.5 w-3.5 text-primary" />
            Required Documents
          </div>
          <ul className="mt-2.5 space-y-1.5">
            {requirements.map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm text-foreground">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className="group mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-success px-4 py-3.5 text-sm font-semibold text-success-foreground shadow-elegant transition-all hover:-translate-y-0.5 hover:bg-success/92"
        >
          <MessageCircle className="h-4 w-4" />
          Connect with {country.name} Specialist via WhatsApp
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Your document &amp; destination details are pre-filled — reply time under 3 min.
        </p>
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
