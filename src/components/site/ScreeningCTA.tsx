import { useState, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Upload, X, FileCheck2, Loader2 } from "lucide-react";

export function ScreeningCTA() {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-[var(--surface)]">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center">
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
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-7 shadow-card animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1.5 text-muted-foreground hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
        <h3 className="text-lg font-bold text-foreground">Free Document Screening</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload a clear photo or scan. We'll flag missing stamps or errors before you submit.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/success" });
          }}
          className="mt-6 space-y-4"
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
              dragOver ? "border-primary bg-primary/5" : "border-border bg-[var(--surface)]"
            }`}
          >
            {file ? (
              <>
                <FileCheck2 className="h-7 w-7 text-success" />
                <p className="text-sm font-medium text-foreground">{file.name}</p>
                <p className="text-[11px] text-muted-foreground">Click to replace</p>
              </>
            ) : (
              <>
                <Upload className="h-7 w-7 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">
                  Drop your file here or click to browse
                </p>
                <p className="text-[11px] text-muted-foreground">PDF, JPG, PNG · up to 10MB</p>
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
            type="tel"
            placeholder="WhatsApp number for review (+977…)"
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
          />

          <button
            disabled={!file}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-all hover:bg-primary/92 disabled:opacity-50"
          >
            <Loader2 className="h-4 w-4" /> Submit for Free Review
          </button>
        </form>
      </div>
    </div>
  );
}
