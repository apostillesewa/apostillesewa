## Update site URL to https://apostillesewa.com

Switch the canonical site URL from `apostillesewa.lovable.app` to `apostillesewa.com` everywhere it's hard-coded. `www.apostillesewa.com` will redirect to the apex via Cloudflare/DNS (recommended) so the app uses one canonical host for SEO and OAuth.

### Files to update

1. **`src/lib/contact.ts`** — `SITE_URL = "https://apostillesewa.com"` (consumed by blog, services, destinations, contact-us routes for canonical + og:url).
2. **`src/routes/sitemap[.]xml.ts`** — `BASE_URL = "https://apostillesewa.com"`.
3. **`public/robots.txt`** — `Sitemap: https://apostillesewa.com/sitemap.xml`.
4. **`src/routes/__root.tsx`** — JSON-LD `Organization` `url` and `logo` → `https://apostillesewa.com` / `https://apostillesewa.com/logo.svg`.
5. **`src/routes/login.tsx`** — leave `emailRedirectTo: window.location.origin + "/admin"` as-is (it auto-uses the current origin, so it already works on the custom domain). No change needed.

### Supabase Auth config (manual, in Lovable Cloud)

Code uses `window.location.origin` for the email redirect, so no code change is required. But Supabase only honors redirect URLs on its allow-list. Add these in Cloud → Users → Auth Settings → URL Configuration:

- **Site URL**: `https://apostillesewa.com`
- **Additional Redirect URLs**:
  - `https://apostillesewa.com/**`
  - `https://www.apostillesewa.com/**`
  - `https://apostillesewa.lovable.app/**` (keep for Lovable preview)
  - `http://localhost:*/**` (local dev)

I'll remind you of this after the code change — it cannot be set from code.

### DNS recommendation

Point `www.apostillesewa.com` to the same Worker and add a redirect rule `www → apex` in Cloudflare (Rules → Redirect Rules → 301 to `https://apostillesewa.com/$1`). One canonical host avoids duplicate-content SEO issues.
