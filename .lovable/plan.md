## Root cause

Your Cloudflare project was created as a **Pages** project, which:
1. Hardcodes `npm clean-install` as the install step (no native bun support in the Pages pipeline).
2. Expects a static `pages_build_output_dir`, but this app is a TanStack Start SSR app whose server entry runs on **workerd** (`dist/server/server.js`). Pages cannot host that server entry the way Workers can.

There is no `package-lock.json` in the repo on purpose — the project uses `bun.lock` + `bunfig.toml` (with a 24h supply-chain guard). Generating an npm lockfile to satisfy Pages would conflict with that setup and still leave SSR broken.

## What I will NOT do (and why)

- Not adding `"build": "vinxi build"` — vinxi is removed in TanStack Start v1; the correct script is already `vite build`.
- Not committing a `package-lock.json` — this project is bun-managed; npm and bun lockfiles in the same repo cause drift.
- Not adding `pages_build_output_dir` — that disables the SSR Worker entry and would 500 every dynamic route, every server function, and every `/api/*` handler.
- Not removing `main` / `assets` from `wrangler.jsonc` — those are required for the Worker + static assets binding the SSR wrapper depends on.

## Plan

### 1. Verify project build config is already correct (no code changes needed)

Confirm without editing:
- `package.json` → `"build": "vite build"` ✅ (already correct for this stack).
- `wrangler.jsonc` → already has `main: dist/server/server.js` + `assets: { directory: dist/client, binding: ASSETS }` ✅ (correct for Workers Static Assets).
- `src/server.ts` → SSR entry wired through `vite.config.ts` `tanstackStart.server.entry` ✅.

So the **repo is already deploy-ready for Workers**. The only change needed is on the Cloudflare side.

### 2. Add one safety net to `package.json` for bun-aware CI

Add a `"packageManager"` field pinning bun, so any CI that respects it (including Workers Builds) auto-selects bun:

```json
"packageManager": "bun@1.x.x"
```

This is the only file change in the plan.

### 3. Migrate Cloudflare project: Pages → Workers Builds

This is a dashboard action you do (I cannot do it from here), but here are the exact steps:

1. In the Cloudflare dashboard, go to **Workers & Pages → your `apostillesewa` Pages project → Settings → Delete project** (this only removes the Pages deployment; your GitHub repo and domain are untouched).
2. Go to **Workers & Pages → Create → Workers → Import a repository**.
3. Pick the same GitHub repo.
4. In the build config:
   - **Build command:** `bun install && bun run build`
   - **Deploy command:** `bunx wrangler deploy`
   - **Root directory:** `/` (default)
   - Leave output directory blank — `wrangler.jsonc` already declares `main` + `assets`.
5. Save & deploy.

Workers Builds natively supports bun and reads `wrangler.jsonc`, so it will pick up `main: dist/server/server.js` + `assets.directory: dist/client` automatically. SSR, server functions, and `/api/*` routes will all work.

### 4. (Optional) Custom domain

If you had a custom domain on the Pages project, re-attach it under the new Worker: **Workers & Pages → apostillesewa → Settings → Domains & Routes → Add custom domain**.

## Why not just keep Pages and force bun?

Pages' install step is not user-configurable to bun in a stable way (the dashboard input is for the *build* command, not *install*), and even with bun installed, Pages would still serve only the static `dist/client/` directory — every SSR route and every `createServerFn` call would 404. Workers Builds is Cloudflare's current recommended path for SSR apps for exactly this reason.

## Summary of code changes

| File | Change |
|---|---|
| `package.json` | Add `"packageManager": "bun@1.x"` |

That's it. Everything else is a dashboard migration on Cloudflare.
