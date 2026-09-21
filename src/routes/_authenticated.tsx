import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { sanitizeRedirect } from "@/lib/safe-redirect";

export const Route = createFileRoute("/_authenticated")({
  // The Supabase session lives in localStorage, which does not exist during SSR.
  // Running this guard on the server would always see "no user" and bounce a
  // signed-in admin back to /login on every hard refresh of /admin. Run the
  // guard (and render this subtree) in the browser only.
  ssr: false,
  beforeLoad: async ({ location }) => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      throw redirect({ to: "/login", search: { redirect: sanitizeRedirect(location.pathname) } });
    }
  },
  component: () => <Outlet />,
});
