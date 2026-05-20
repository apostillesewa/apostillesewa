import { X, Clock, MessageCircle, CheckCircle2 } from "lucide-react";
import { Flag, type CountryCode } from "./Flag";

type Row = {
  code: CountryCode;
  name: string;
  mofa: string;
  embassy: string;
  total: string;
  price: string;
};

const PRICING: Row[] = [
  { code: "PL", name: "Poland",         mofa: "48 hrs", embassy: "9 days",  total: "~11 days", price: "NPR 14,500" },
  { code: "DE", name: "Germany",        mofa: "48 hrs", embassy: "12 days", total: "~14 days", price: "NPR 16,900" },
  { code: "HR", name: "Croatia",        mofa: "48 hrs", embassy: "10 days", total: "~12 days", price: "NPR 13,800" },
  { code: "MT", name: "Malta",          mofa: "48 hrs", embassy: "8 days",  total: "~10 days", price: "NPR 13,200" },
  { code: "PT", name: "Portugal",       mofa: "48 hrs", embassy: "11 days", total: "~13 days", price: "NPR 15,400" },
  { code: "CY", name: "Cyprus",         mofa: "48 hrs", embassy: "7 days",  total: "~9 days",  price: "NPR 12,900" },
];

export function PricingModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/40 p-4 backdrop-blur-sm animate-fade-in sm:items-center"
      onClick={onClose}
    >
      <div
        className="relative my-8 w-full max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-card animate-scale-in sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1.5 text-muted-foreground hover:bg-muted"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
          <Clock className="h-3 w-3" /> Live Pricing &amp; Timelines
        </span>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          All-Inclusive Legalization Pricing
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          MOFA + Embassy stamping per document. No hidden fees. Volume discounts available.
        </p>

        {/* Desktop table */}
        <div className="mt-6 hidden overflow-hidden rounded-xl border border-border sm:block">
          <table className="w-full text-sm">
            <thead className="bg-[var(--surface)] text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Country</th>
                <th className="px-4 py-3 text-left font-semibold">MOFA</th>
                <th className="px-4 py-3 text-left font-semibold">Embassy</th>
                <th className="px-4 py-3 text-left font-semibold">Total</th>
                <th className="px-4 py-3 text-right font-semibold">Price / doc</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {PRICING.map((r) => (
                <tr key={r.code} className="hover:bg-[var(--surface)]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6 w-9 items-center justify-center overflow-hidden rounded-sm border border-border">
                        <Flag code={r.code} title={r.name} />
                      </span>
                      <span className="font-medium text-foreground">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{r.mofa}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.embassy}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{r.total}</td>
                  <td className="px-4 py-3 text-right font-bold text-primary">{r.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="mt-6 grid gap-3 sm:hidden">
          {PRICING.map((r) => (
            <div key={r.code} className="rounded-xl border border-border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-9 items-center justify-center overflow-hidden rounded-sm border border-border">
                    <Flag code={r.code} title={r.name} />
                  </span>
                  <span className="font-semibold text-foreground">{r.name}</span>
                </div>
                <span className="text-sm font-bold text-primary">{r.price}</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
                <Cell label="MOFA" value={r.mofa} />
                <Cell label="Embassy" value={r.embassy} />
                <Cell label="Total" value={r.total} />
              </div>
            </div>
          ))}
        </div>

        <ul className="mt-5 grid gap-1.5 text-xs text-muted-foreground sm:grid-cols-2">
          <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Notary + courier included</li>
          <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Free re-submission on rejection</li>
          <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Secure digital scan archive</li>
          <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Bundle &amp; family discounts</li>
        </ul>

        <a
          href="https://wa.me/9771000000000?text=Hi%20Apostille%20Sewa%2C%20I%27d%20like%20a%20custom%20pricing%20quote%20for%20multiple%20documents."
          target="_blank"
          rel="noreferrer"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-success px-4 py-3 text-sm font-semibold text-success-foreground shadow-elegant transition-all hover:-translate-y-0.5 hover:bg-success/92"
        >
          <MessageCircle className="h-4 w-4" /> Get a Custom Bundle Quote on WhatsApp
        </a>
      </div>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-[var(--surface)] p-2 text-center">
      <div className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-xs font-semibold text-foreground">{value}</div>
    </div>
  );
}
