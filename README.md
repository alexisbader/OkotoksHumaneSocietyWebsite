# Okotoks Humane Society Website

Skeletal Next.js website for the Okotoks Humane Society with Sanity CMS, Resend contact email, and Google Analytics hooks.

## Stack

- **Next.js** (App Router) + TypeScript
- **Tailwind CSS** + **shadcn/ui** (Button, Input, Textarea, Label, Card)
- **Sanity** — embedded Studio at `/studio`; schemas for pages, news, events, job postings
- **Resend** — `/api/contact` email delivery
- **Google Analytics** — via `@next/third-parties` when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
- **Vercel**-ready (`vercel.json`) + GitHub Actions CI

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Studio: [http://localhost:3000/studio](http://localhost:3000/studio).

The site builds without live Sanity / Resend / GA keys. Content lists stay empty until Sanity is connected; the contact form returns `503` until Resend env vars are set.

## Environment variables

Copy `.env.example` to `.env.local` (and set the same keys in Vercel → Project → Settings → Environment Variables):

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | For CMS content | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | For CMS content | Usually `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Optional | Defaults to `2025-01-01` |
| `RESEND_API_KEY` | For contact email | Resend API key |
| `CONTACT_TO_EMAIL` | For contact email | Staff inbox |
| `CONTACT_FROM_EMAIL` | Optional | Verified Resend sender |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4 measurement ID (`G-…`) |
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical site URL |

Never commit `.env.local` or real API keys.

## Sanity setup

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage).
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in `.env.local`.
3. In Sanity → API → CORS origins, add `http://localhost:3000` (and your Vercel URL) with **Allow credentials**.
4. Run `npm run dev` and open `/studio` to sign in and create documents:
   - **Page** — use slug `home` for the homepage; other slugs are served at `/pages/[slug]`
   - **News** — `/news` and `/news/[slug]`
   - **Event** — `/events`
   - **Job posting** — `/jobs`

Schema sources live under `src/sanity/schemaTypes/`. Fetch helpers are in `src/sanity/lib/`.

## Contact form (Resend)

1. Create an API key at [resend.com](https://resend.com).
2. Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL`.
3. For production, verify a domain and set `CONTACT_FROM_EMAIL` to a sender on that domain.
4. Submit the form on `/contact` — the handler is `src/app/api/contact/route.ts`.

## Google Analytics

Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to your GA4 ID. The snippet is injected only when that value is present (`src/components/analytics/google-analytics.tsx`).

## Deploy on Vercel (from GitHub)

1. Push this repo to GitHub (already the source of truth for this project).
2. In [vercel.com](https://vercel.com): **Add New Project** → Import the GitHub repo.
3. Framework preset: **Next.js** (auto-detected).
4. Add the environment variables from the table above for Production / Preview.
5. Deploy. Add the production URL to Sanity CORS (with credentials).

Optional CLI:

```bash
npm i -g vercel
vercel
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Local Next.js + Studio |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Project layout

```
src/app/(site)/     Public pages (home, news, events, jobs, contact, pages)
src/app/studio/     Embedded Sanity Studio
src/app/api/contact Resend contact API
src/components/ui/  shadcn/ui primitives
src/sanity/         Schemas, client, queries, fetch helpers
```

## CI

`.github/workflows/ci.yml` runs `lint` + `build` on pushes and pull requests so the scaffold stays green without requiring live secrets.
