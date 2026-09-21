const DEFAULT_REDIRECT = "/admin";

// Paths that are themselves login screens — redirecting back to them creates loops.
const LOGIN_PATHS = ["/login", "/signin", "/sign-in", "/auth", "/admin/login", "/admin/signin"];

/**
 * Returns a safe, same-origin, relative redirect path.
 * Falls back to "/admin" for anything unsafe or loop-inducing.
 */
export function sanitizeRedirect(raw: unknown): string {
  if (typeof raw !== "string") return DEFAULT_REDIRECT;

  const value = raw.trim();
  if (!value.startsWith("/")) return DEFAULT_REDIRECT;
  if (value.startsWith("//")) return DEFAULT_REDIRECT;
  if (value.includes("\\")) return DEFAULT_REDIRECT;
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001F\u007F]/.test(value)) return DEFAULT_REDIRECT;

  const pathname = value.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
  const lower = pathname.toLowerCase();
  if (LOGIN_PATHS.some((p) => lower === p || lower.startsWith(`${p}/`))) {
    return DEFAULT_REDIRECT;
  }

  return value;
}
