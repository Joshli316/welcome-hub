# Welcome Hub — CLAUDE.md

## Commands
- `npm run dev` — local dev server
- `npm test` — Vitest (26 tests, ~130ms)
- `npm run build` — Next.js build
- `npm run build:cf` — OpenNextJS Cloudflare build
- `npm run deploy` — CF Workers deploy (builds first)

## Architecture
- Next.js 16 App Router + next-intl, deployed to Cloudflare Workers via `@opennextjs/cloudflare`
- Locales: `zh` (default), `en` — all routes under `[locale]`
- Static JSON data in `src/data/` — no database
- Dashboard auth: httpOnly cookie via `POST /api/auth` with `DASHBOARD_PIN` env var
- All client state in localStorage (contacts, checklist, profile) with schema versioning

## Security — Production Checklist
- **DASHBOARD_PIN in wrangler.jsonc is "1234" (placeholder).** Before going public, run:
  `wrangler secret put DASHBOARD_PIN` and remove from wrangler.jsonc vars
- No rate limiting on `/api/auth` — add Cloudflare WAF rule before public launch
- Next.js 16.1.6 has a null-origin CSRF advisory — upgrade: `npm install next@16.2.2`

## Open Items from /review (2026-04-01)
- 3 Unsplash hero images are third-party CDN — download to `public/images/` for reliability
- PWA manifest missing 192×192 and 512×512 PNG icons

## Session Log

### 2026-04-01 — Code quality + launch audit

**What was done:**
- /refactor: N-filter `useFilteredList`, parameterized `useChecklist`, functional updater in `useLocalStorage`, shared OG image renderer
- /roast: httpOnly auth cookie via `/api/auth`, localStorage schema versioning, MobileNav focus trap, `calculateMatch` guards
- Vitest setup: 26 tests for `sanitize.ts` and `calculateMatch`
- /review: `next.config.ts` created (security headers + remotePatterns), `npm audit fix` (10/11 vulns cleared), `inputMode="numeric"` on PIN, About title dedup

**Open items:**
- DASHBOARD_PIN still in wrangler.jsonc (needs `wrangler secret put`)
- No rate limiting on /api/auth
- Next.js 16.2.2 upgrade pending
- 3 Unsplash images not yet self-hosted
