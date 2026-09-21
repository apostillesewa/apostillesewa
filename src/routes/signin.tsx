import { createFileRoute, redirect } from "@tanstack/react-router";
import { sanitizeRedirect } from "@/lib/safe-redirect";

export const Route = createFileRoute("/signin")({
  validateSearch: (search: Record<string, unknown>) => ({ redirect: search.redirect }),
  beforeLoad: ({ search }) => {
    throw redirect({
      to: "/login",
      search: { redirect: sanitizeRedirect(search.redirect) },
      replace: true,
    });
  },
});
