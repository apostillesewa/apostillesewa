import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { COUNTRIES } from "@/components/site/Destinations";
import { listPublishedPostsBundled } from "@/lib/blog-bundled";



const BASE_URL = "https://apostillesewa.com";

const SERVICE_SLUGS = [
  "mofa-attestation",
  "embassy-legalization",
  "pcc-authentication",
  "document-verification",
];

interface Entry {
  path: string;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: string;
  lastmod?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const posts = listPublishedPostsBundled();
        const entries: Entry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.7" },
          { path: "/contact-us", changefreq: "monthly", priority: "0.9" },
          { path: "/blog", changefreq: "weekly", priority: "0.8" },
          ...SERVICE_SLUGS.map((s) => ({
            path: `/services/${s}`,
            changefreq: "monthly" as const,
            priority: "0.8",
          })),
          ...COUNTRIES.map((c) => ({
            path: `/destinations/${c.slug}`,
            changefreq: "monthly" as const,
            priority: "0.8",
          })),
          ...posts.map((p) => ({
            path: `/blog/${p.slug}`,
            changefreq: "weekly" as const,
            priority: "0.8",
            lastmod: p.date ? new Date(p.date).toISOString().slice(0, 10) : undefined,
          })),
        ];

        const urls = entries.map((e) =>
          [
            "  <url>",
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            "  </url>",
          ]
            .filter(Boolean)
            .join("\n"),
        );


        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...urls,
          "</urlset>",
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
