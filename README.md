# Welcome Hub 与你同行

Bilingual (EN/ZH) resource hub for Chinese international students in the US. Built with Next.js 16, deployed to Cloudflare Workers.

**Features:** Arrival guides · Interactive checklist · Peer matching · Small groups · Re-entry planning · Faith & Work · Ministry dashboard

## Development

```bash
npm run dev          # local dev server (localhost:3000)
npm test             # Vitest unit tests
npm run build        # Next.js production build
```

## Deploy

```bash
npm run deploy       # OpenNextJS build → Cloudflare Workers deploy
```

Requires `wrangler` to be authenticated. Set the dashboard PIN as a secret before going public:

```bash
wrangler secret put DASHBOARD_PIN
```

## Environment

| Variable | Location | Notes |
|----------|----------|-------|
| `DASHBOARD_PIN` | `wrangler.jsonc` vars or CF secret | Default `"1234"` — change in production |

## Stack

- **Framework:** Next.js 16 App Router
- **i18n:** next-intl (zh default, en)
- **Styling:** Tailwind CSS 4
- **Deployment:** Cloudflare Workers via `@opennextjs/cloudflare`
- **Tests:** Vitest
