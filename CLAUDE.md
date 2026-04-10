# CLAUDE.md — w00-hub

## Commands

```bash
npm run dev      # dev server on :3000
npm run build    # production build
npm start        # serve production build
```

## Architecture

**Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, deployed on Vercel.

**Purpose:** Central hub dashboard for all MVP Machine apps. Shows app cards with last-updated
dates pulled from S4 metadata. No write path — read-only.

**Data flow:**
- `GET /api/status` — runs `ListObjectsV2` on each app's S4 prefix, returns `{ id, lastUpdated }[]`
- `app/page.tsx` (RSC) — fetches `/api/status`, renders one `<AppCard>` per app
- Both use `revalidate = 3600` (ISR, not force-dynamic — this is metadata only)

**Auth:** Same cookie-based passphrase gate as all other MVP Machine apps. `proxy.ts` checks
`access_token` cookie against `ACCESS_PASSPHRASE`. Redirects to `/unlock` if missing.

## Adding a New App

Edit **only** `lib/apps.ts` — append one object to the `APPS` array:

```ts
{
  id: "w04",
  name: "App Name",
  description: "One-line description.",
  url: "https://w04-project.vercel.app",
  s4Prefix: "w04/output/",   // prefix to ListObjectsV2 for last-updated date
  accent: "bg-rose-500",     // Tailwind bg color for card accent bar
  icon: "🔧",                // single emoji
}
```

Nothing else needs to change. The status API and page both iterate `APPS` dynamically.

## S4 Prefixes per App

| App | S4 Prefix |
|---|---|
| w01 AI Build Ideas | `w01/ideas/` |
| w02 UI Demo Lab | `w02/sources/` |
| w03 YT Digest | `w03/yt-digest/` |

## Environment Variables

| Variable | Where | Purpose |
|---|---|---|
| `S4_ENDPOINT` | Vercel + VPS `.env` | `https://s3.g.s4.mega.io` |
| `S4_ACCESS_KEY` | Vercel + VPS `.env` | Mega S4 access key |
| `S4_SECRET_KEY` | Vercel + VPS `.env` | Mega S4 secret key |
| `S4_REGION` | Vercel + VPS `.env` | `us-east-1` (placeholder) |
| `S4_BUCKET` | Vercel + VPS `.env` | `mvp-machine-content` |
| `ACCESS_PASSPHRASE` | Vercel only | App passphrase gate |

## Vercel

- Project: `w00-hub` (emit-ias-projects)
- Production: https://w00-hub.vercel.app
- GitHub: https://github.com/emit-ia/w00-hub
- Auto-deploys on push to `main`
