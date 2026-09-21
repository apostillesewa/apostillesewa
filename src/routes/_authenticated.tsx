import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { sanitizeRedirect } from "@/lib/safe-redirect";

export const Route = createFileRoute("/_authenticated")({
  // The Supabase session lives in localStorage, which does not exist during SSR.
  ssr: false,
  beforeLoad: async ({ location }) => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      throw redirect({
        to: "/login",
        search: { redirect: sanitizeRedirect(location.pathname) },
      });
    }
  },
  component: () => <Outlet />,
});
