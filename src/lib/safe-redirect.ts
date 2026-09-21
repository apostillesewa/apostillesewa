/**
 * Post-login redirect helper.
 *
 * The `?redirect=` value comes from the URL, so it is untrusted. It must:
 *  - be an in-app path (never an absolute URL or protocol-relative `//host`),
 *  - never point back at an auth/login screen (that is what produced the
 *    `/signin?redirect=/admin/login` -> "Not Found" dead end),
 *  - fall back to the admin dashboard when it is missing or unusable.
 */
export const DEFAULT_POST_LOGIN_PATH = "/admin";

// Paths that render (or used to render) a login form. Redirecting to any of
// these after a successful sign-in would just bounce the user around.
const AUTH_SCREEN_PATTERN = /^\/(?:login|signin|sign-in|auth|admin\/(?:login|signin|sign-in))(?:[/?#]|$)/i;

export function sanitizeRedirect(raw: unknown): string {
  if (typeof raw !== "string") return DEFAULT_POST_LOGIN_PATH;

  const value = raw.trim();

  // Must be a single-slash, in-app path. Blocks "https://evil.com", "//evil.com",
  // "/\evil.com" and "@evil.com" style tricks (the last would otherwise turn
  // `origin + redirect` into a userinfo URL for another host).
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return DEFAULT_POST_LOGIN_PATH;
  }
  // Reject control characters / whitespace tricks.
  if (/[\u0000-\u001f\u007f]/.test(value)) return DEFAULT_POST_LOGIN_PATH;

  if (AUTH_SCREEN_PATTERN.test(value)) return DEFAULT_POST_LOGIN_PATH;

  return value;
}
