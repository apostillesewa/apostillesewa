import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { sanitizeRedirect } from "@/lib/safe-redirect";

// Legacy / alias URL: /admin/login -> /login. Existing bookmarks and old
// ?redirect=/admin/login links land on the real login form instead of a 404.
export const Route = createFileRoute("/admin/login")({
  validateSearch: z.object({ redirect: z.unknown().optional() }),
  beforeLoad: ({ search }) => {
    throw redirect({ to: "/login", search: { redirect: sanitizeRedirect(search.redirect) }, replace: true });
  },
});
