import { useState, useRef } from "react";
import { Upload, X, FileCheck2, ShieldCheck, MessageCircle, CheckCircle2, ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = "9771000000000";

export function ScreeningCTA() {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-[var(--surface)]">
      <div className="mx-auto max-w-5xl px-6 py-16 text-center sm:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Unsure if your documents are ready for submission?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
          Upload a clean photo of your stamps or documents for a free, instant digital review by
          our authentication experts.
        </p>
        <button
          onClick={() => setOpen(true)}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-elegant transition-all hover:-translate-y-0.5 hover:bg-primary/92"
        >
          <Upload className="h-4 w-4" />
          Launch Free Document Screening
        </button>
        <p className="mt-4 text-[11px] text-muted-foreground">
          No credit card. Reviewed by a human agent within 30 minutes.
        </p>
      </div>

      {open && <UploadModal onClose={() => setOpen(false)} />}
    </section>
  );
}

function UploadModal({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const waMessage = encodeURIComponent(
    `Hi Apostille Sewa, I just uploaded my document for screening. Please verify.\n\n• Name: ${name}\n• File: ${file?.name ?? "(uploaded)"}`,
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/40 p-4 backdrop-blur-sm animate-fade-in sm:items-center"
      onClick={onClose}
    >
      <div
        className="relative my-8 w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-card animate-scale-in sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1.5 text-muted-foreground hover:bg-muted"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {!submitted ? (
          <>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
              <ShieldCheck className="h-3 w-3" /> Secure Pre-Screening
            </span>
            <h3 className="mt-3 text-xl font-bold text-foreground">Instant Document Pre-Screening</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Upload a clear photo of your document or current MOFA stamp for a free verification check.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-5 space-y-4"
            >
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
                }}
                onClick={() => inputRef.current?.click()}
                className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-10 text-center transition-colors ${
                  dragOver ? "border-primary bg-primary/5" : "border-border bg-[var(--surface)] hover:border-primary/40"
                }`}
              >
                {file ? (
                  <>
                    <FileCheck2 className="h-7 w-7 text-success" />
                    <p className="text-sm font-medium text-foreground break-all">{file.name}</p>
                    <p className="text-[11px] text-muted-foreground">Click to replace</p>
                  </>
                ) : (
                  <>
                    <Upload className="h-7 w-7 text-muted-foreground" />
                    <p className="text-sm font-medium text-foreground">
                      Drop your file here or click to browse
                    </p>
                    <p className="text-[11px] text-muted-foreground">JPG, PNG, PDF · up to 10MB</p>
                  </>
                )}
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])}
                />
              </div>

              <input
                required
                type="text"
                value={name}
                maxLength={100}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
              <input
                required
                type="tel"
                value={phone}
                maxLength={20}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="WhatsApp number (+977…)"
                className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              />

              <p className="flex items-start gap-1.5 rounded-lg border border-border bg-[var(--surface)] px-3 py-2 text-[11px] text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                <span>
                  <span className="mr-1">🛡️</span>
                  Secure and Confidential. Your documents are automatically deleted after review.
                </span>
              </p>

              <button
                disabled={!file}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-all hover:-translate-y-0.5 hover:bg-primary/92 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                Submit for Free Review <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </>
        ) : (
          <SuccessState waUrl={waUrl} />
        )}
      </div>
    </div>
  );
}

function SuccessState({ waUrl }: { waUrl: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-4 text-center">
      <div className="relative">
        <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-success/30" />
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success animate-scale-in">
          <CheckCircle2 className="h-8 w-8" strokeWidth={2.4} />
        </div>
      </div>
      <h4 className="text-lg font-bold text-foreground">Document received</h4>
      <p className="max-w-sm text-sm text-muted-foreground">
        Our consular agent will verify your file and reply on WhatsApp within 30 minutes.
      </p>
      <a
        href={waUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-flex items-center gap-2 rounded-lg bg-success px-5 py-3 text-sm font-semibold text-success-foreground shadow-elegant transition-all hover:-translate-y-0.5 hover:bg-success/92"
      >
        <MessageCircle className="h-4 w-4" /> Continue on WhatsApp
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}
