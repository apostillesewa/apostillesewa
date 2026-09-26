# Roadmap

## Done
- Fix admin sign-in redirect loop / "Not Found" after login
  - `sanitizeRedirect` helper guards against open redirects and login-screen loops
  - `/signin` and `/admin/login` alias routes forward to `/login`
  - `/admin` guard no longer runs during server rendering (fixes hard-refresh bounce)
  - Admin shows a distinct "Couldn't verify your access" screen for server errors

- Country hubs: 18 destinations, /destinations overview, related guides, breadcrumbs, sitemap

## Pending
- Germany & Cyprus hubs have no dedicated guides yet — need real facts from owner
- Automatically submit `sitemap.xml` to Google Search Console when a blog post is published
  - Blocked: needs a Google Search Console connection for the site
