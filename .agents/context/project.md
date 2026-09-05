# casino-pay — project context

## What this is

A Next.js + Payload CMS v3 application. The current template includes auth (`users`) and uploads (`media`). Domain features (payments, casino-specific flows) should be added only when explicitly requested.

## Stack

- Frontend: Next.js App Router, React, TypeScript, Tailwind CSS
- CMS: Payload CMS v3 (`payload` / `@payloadcms/next` 3.88.0)
- Database: PostgreSQL via `@payloadcms/db-postgres`
- Local DB: Docker Compose (`docker-compose.yml`)
- Node: `^18.20.2` or `>=20.9.0`

## Runtime URLs (local)

- App: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`
- Payload REST/GraphQL: under `/api` (see `src/app/(payload)/api/`)

## Environment

Required in `.env` (copy from `.env.example`):

- `DATABASE_URL` — PostgreSQL connection string
- `PAYLOAD_SECRET` — Payload secret (never commit real secrets)

## Source map

- `src/payload.config.ts` — Payload config, Postgres adapter, type output
- `src/collections/` — collection configs
- `src/globals/` — global configs (header, footer)
- `src/app/(frontend)/` — public pages (routes and layouts)
- `src/app/(payload)/` — admin UI and Payload API routes
- `src/components/` — UI (Header, CMSLink, Container, icons)
- `src/hooks/` — reusable React hooks
- `src/utils/` — pure helpers
- `src/payload-types.ts` — generated types (`npm run generate:types`)
- `.agents/context/frontend.md` — layered UI rules

## Conventions

- Strict TypeScript; do not use `any`; use `src/payload-types.ts`
- Fetch in Server Components; `'use client'` only for small interactive islands
- Layered folders only: `app`, `components`, `hooks`, `utils`
- Multi-section UI (`Header/`, `Footer/`): `Site*` fetches, then one file per design section — same shape as `Header/`
- Use `CMSLink` from `@/components/CMSLink` for Payload `linkFields`
- Use Payload v3 APIs only; do not invent collection fields or adapters
- After collection/field changes, regenerate types
- Pass `req` through nested Payload operations in hooks
- Local API bypasses access control unless `overrideAccess: false`
- Optimize at the data/server layer; do not add memo/docs/error-boundary boilerplate by default
