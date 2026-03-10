# Pre-Launch TODO: Replace Placeholder URLs

Every `example` URL below must be replaced with a real one before going live.
Search the codebase for `example` to find them all.

## Pages (hardcoded in JSX)

| File | Line | Current Value | Replace With |
|------|------|---------------|--------------|
| `src/app/[locale]/community/page.tsx` | ~62 | `https://forms.gle/example` | Real "Ask a Question" Google Form |
| `src/app/[locale]/about/page.tsx` | ~55 | `welcome@example.com` | Real contact email |
| `src/app/[locale]/about/page.tsx` | ~64 | `WelcomeHub2026` | Real WeChat ID |

## Data Files (JSON)

| File | Field | Current Value | Replace With |
|------|-------|---------------|--------------|
| `src/data/events.json` | signupUrl (×4) | `forms.gle/example1-4` | Real event signup forms |
| `src/data/groups.json` | signupUrl (×6) | `forms.gle/example-*` | Real group signup forms |
| `src/data/groups.json` | hostContact | `david.miller@example.com` | Real host email |
| `src/data/hosts.json` | contactValue (×2) | `david.miller@example.com`, `james.t@example.com` | Real volunteer emails |
| `src/data/returnees.json` | contactValue | `grace.chen@example.com` | Real returnee email |
| `src/data/peers.json` | contactValue | `clara.wang@example.com` | Real peer email |

## Assets

| Task | Location | Notes |
|------|----------|-------|
| Create OG image (1200×630px) | `public/og-image.png` | Uncomment OG image lines in `src/app/layout.tsx` after adding |
| Delete unused boilerplate SVGs | `public/` | Remove `file.svg`, `vercel.svg`, `next.svg`, `globe.svg`, `window.svg` |

## Optional

- [ ] Set up Vercel Analytics or Google Analytics
- [ ] Update `sitemap.ts` and `robots.ts` if the deployment URL changes
- [ ] Add a web manifest (`public/manifest.json`) for PWA install support
