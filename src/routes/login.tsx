import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { LogoMark } from "@/components/site/Logo";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";

const searchSchema = z.object({ redirect: z.string().optional().default("/admin") });

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Admin Login — Apostille Sewa" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  validateSearch: searchSchema,
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/login" });
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
      }
      navigate({ to: redirect });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  const onGoogle = async () => {
    setBusy(true);
    setError(null);
    const res = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + redirect });
    if (res.redirected) return;
    if (res.error) {
      setError(res.error instanceof Error ? res.error.message : "Google sign-in failed");
      setBusy(false);
      return;
    }
    navigate({ to: redirect });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--surface)] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-card">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Apostille Sewa">
          <LogoMark className="h-9 w-9" />
          <span className="text-base font-extrabold tracking-tight">
            Apostille<span className="font-normal text-primary"> Sewa</span>
          </span>
        </Link>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
          {mode === "signin" ? "Admin sign in" : "Create account"}
        </h1>
        <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-success" /> Restricted area · staff only
        </p>

        <button
          type="button"
          onClick={onGoogle}
          disabled={busy}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-50"
        >
          <GoogleIcon /> Continue with Google
        </button>

        <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-wider text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or email <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            required
            type="email"
            value={email}
            maxLength={255}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
          <input
            required
            type="password"
            value={password}
            minLength={6}
            maxLength={72}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
          {error && <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>}
          <button
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant transition-all hover:-translate-y-0.5 disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <>
              {mode === "signin" ? "Sign in" : "Create account"} <ArrowRight className="h-4 w-4" />
            </>}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground"
        >
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="#4285F4" d="M21.6 12.23c0-.78-.07-1.53-.2-2.25H12v4.26h5.39a4.6 4.6 0 0 1-2 3.02v2.5h3.22c1.89-1.74 2.99-4.3 2.99-7.53z"/>
      <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.23-2.5c-.9.6-2.05.96-3.39.96-2.6 0-4.81-1.76-5.6-4.12H3.07v2.58A10 10 0 0 0 12 22z"/>
      <path fill="#FBBC05" d="M6.4 13.91A6 6 0 0 1 6.07 12c0-.66.11-1.3.33-1.91V7.51H3.07A10 10 0 0 0 2 12c0 1.62.39 3.16 1.07 4.49l3.33-2.58z"/>
      <path fill="#EA4335" d="M12 6.38c1.47 0 2.79.5 3.83 1.5l2.87-2.87C16.95 3.42 14.7 2.5 12 2.5A10 10 0 0 0 3.07 7.51L6.4 10.1C7.19 7.73 9.4 6.38 12 6.38z"/>
    </svg>
  );
}
