import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { sanitizeRedirect } from "@/lib/safe-redirect";

// Legacy / alias URL: /signin -> /login (keeps the safe ?redirect= target).
export const Route = createFileRoute("/signin")({
  validateSearch: z.object({ redirect: z.unknown().optional() }),
  beforeLoad: ({ search }) => {
    throw redirect({ to: "/login", search: { redirect: sanitizeRedirect(search.redirect) }, replace: true });
  },
});
