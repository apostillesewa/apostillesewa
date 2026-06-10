import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Apostille Sewa — Apostille & Embassy Legalization in Nepal" },
      { name: "description", content: "Nepal's specialized document legalization desk. Fast MOFA attestation, PCC, and European embassy legalization for Poland, Germany, Croatia, Malta, Portugal, Cyprus." },
      { name: "author", content: "Apostille Sewa" },
      { name: "theme-color", content: "#2563EB" },
      { property: "og:site_name", content: "Apostille Sewa" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/logo.svg" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Apostille Sewa",
          image: "https://apostillesewa.com/logo.svg",
          url: "https://apostillesewa.com",
          telephone: "+9779827689960",
          email: "apostillesewa@gmail.com",
          priceRange: "Contact for quote",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Kathmandu",
            addressCountry: "NP",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "09:00",
              closes: "18:00",
            },
          ],
          sameAs: [],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Document Legalization & Apostille",
          provider: { "@type": "LocalBusiness", name: "Apostille Sewa" },
          areaServed: [
            { "@type": "Country", name: "Poland" },
            { "@type": "Country", name: "Germany" },
            { "@type": "Country", name: "Croatia" },
            { "@type": "Country", name: "Malta" },
            { "@type": "Country", name: "Portugal" },
            { "@type": "Country", name: "Cyprus" },
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Legalization Services",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "MOFA Attestation" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Embassy Legalization" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "PCC Authentication" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Document Verification" } },
            ],
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthSync router={router} />
      <Outlet />
    </QueryClientProvider>
  );
}

function AuthSync({ router }: { router: ReturnType<typeof useRouter> }) {
  const qc = useQueryClient();
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      qc.invalidateQueries();
      router.invalidate();
    });
    return () => subscription.unsubscribe();
  }, [qc, router]);
  return null;
}
