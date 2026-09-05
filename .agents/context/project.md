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
- `src/app/(frontend)/` — public UI
- `src/app/(payload)/` — admin UI and Payload API routes
- `src/payload-types.ts` — generated types (`npm run generate:types`)

## Conventions

- Strict TypeScript; do not use `any`
- Separate Server and Client Components; add `'use client'` only when needed
- Use Payload v3 APIs only; do not invent collection fields or adapters
- After collection/field changes, regenerate types
- Pass `req` through nested Payload operations in hooks
- Local API bypasses access control unless `overrideAccess: false`
