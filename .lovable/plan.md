# Fix custom domain auth on apostillesewa.com

## What's actually wrong

Your code is already pointed at `https://apostillesewa.com` (verified in `src/lib/contact.ts`, `src/routes/sitemap[.]xml.ts`, `src/routes/__root.tsx`, `public/robots.txt`). The login flow also uses `window.location.origin`, so it auto-adapts to whichever host the user is on.

The blogs not loading and "No admin access" on `https://apostillesewa.com` are **not** code bugs. They happen because the backend Auth config still only trusts the `lovable.app` host:

- **Site URL** is set to `https://apostillesewa.lovable.app`
- **Redirect URLs** allowlist does not include `https://apostillesewa.com`

So when you visit `https://apostillesewa.com/admin`:
- the OAuth/email-link redirect targets are rejected as untrusted, the session never lands, `auth.uid()` is `null`, and the `has_role(...)` check returns false → "No admin access"
- any RLS-protected reads (blogs, admin lists) return empty

No code changes are needed. The fix is purely a backend Auth settings update.

## About the "external Supabase dashboard"

This project runs on **Lovable Cloud**. There is no separate Supabase account, no separate dashboard, and no external login URL to give you — your Supabase credentials don't exist because you never created a Supabase account. Everything is managed inside Lovable.

## Exact steps to fix (do these in Lovable, not Supabase)

1. In the editor's top nav, open the **More** tab → **Cloud**.
2. In the Cloud sidebar, click **Users**.
3. Click the **Auth Settings** gear icon.
4. Open **URL Configuration**.
5. Set:
   - **Site URL**: `https://apostillesewa.com`
   - **Redirect URLs** (add all of these):
     - `https://apostillesewa.com/**`
     - `https://www.apostillesewa.com/**`
     - `https://apostillesewa.lovable.app/**` (keep so the old preview still works)
     - `https://id-preview--bd54f8c4-0fb0-48ab-9692-8bc191248603.lovable.app/**` (Lovable preview)
     - `http://localhost:*/**` (local dev)
6. **Save**.
7. Sign out of `https://apostillesewa.com`, hard-refresh, sign back in. Then check `/admin` and the blog list.

## Cloudflare side (recommended, optional)

Add a 301 redirect rule in Cloudflare from `www.apostillesewa.com` → `https://apostillesewa.com/$1` so there is one canonical host and only one Site URL to worry about.

## Code changes in this plan

None. Code is already correct.

<presentation-actions>
<presentation-open-backend>View Backend</presentation-open-backend>
</presentation-actions>
