# casino-pay

Payment-focused app built with **Next.js (App Router)** and **Payload CMS v3**, using **PostgreSQL** as the database.

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- CMS / admin: Payload CMS v3 (`/admin`)
- Database: PostgreSQL (local via Docker)

## Requirements

- [Node.js](https://nodejs.org/) `^18.20.2` or `>=20.9.0`
- [npm](https://docs.npmjs.com/) (this repo includes `package-lock.json`) or [pnpm](https://pnpm.io/) `^9+`
- [Docker](https://docs.docker.com/get-docker/) and Docker Compose (for PostgreSQL)

## 1. Clone the repository

```bash
git clone https://github.com/KilkaSenpai/casino-pay.git
cd casino-pay
```

## 2. Configure environment variables

Copy the example file and edit values if needed:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Required variables:

| Variable | Purpose | Local default |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL connection string for Payload | `postgresql://postgres:postgres@127.0.0.1:5432/casino_pay` |
| `PAYLOAD_SECRET` | Payload auth / encryption secret | Change this before deploying |

Never commit `.env`. `.env.example` is the only env file that should be shared.

## 3. Start PostgreSQL with Docker

From the project root:

```bash
docker compose up -d
```

This starts Postgres 16 on port `5432` with:

- user: `postgres`
- password: `postgres`
- database: `casino_pay`

Check that the container is healthy:

```bash
docker compose ps
```

Stop the database when you are done:

```bash
docker compose down
```

Data is stored in the `pgdata` Docker volume. To wipe the database:

```bash
docker compose down -v
```

## 4. Install dependencies

```bash
npm install
```

If you prefer pnpm:

```bash
pnpm install
```

## 5. Start the development server

```bash
npm run dev
```

or

```bash
pnpm dev
```

Then open:

- App: [http://localhost:3000](http://localhost:3000)
- Payload admin: [http://localhost:3000/admin](http://localhost:3000/admin)

On first visit to `/admin`, create the initial admin user.

## Useful scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start Next.js + Payload in development |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run generate:types` | Regenerate `src/payload-types.ts` after schema changes |
| `npm run generate:importmap` | Regenerate the Payload admin import map |
| `npm run lint` | Run ESLint |
| `npm run test:int` | Integration tests (Vitest) |
| `npm run test:e2e` | End-to-end tests (Playwright) |

## Project layout

```txt
src/
├── app/
│   ├── (frontend)/          # Public Next.js routes
│   └── (payload)/           # Payload admin + REST/GraphQL API
├── collections/             # Payload collections (Users, Media, …)
└── payload.config.ts        # Payload config (Postgres adapter)
.agents/                     # Portable agent context, prompts, and skills
docker-compose.yml           # Local PostgreSQL
```

## Agent / AI context

This repo is meant to stay portable across machines and AI tools.

- [AGENTS.md](./AGENTS.md) — entry point for coding agents
- [.agents/README.md](./.agents/README.md) — index of project instructions and prompts
- [.cursorrules](./.cursorrules) — Cursor-specific coding rules (same standards as `.agents/prompts/`)

## Collections

- **Users** — auth-enabled collection for the admin panel
- **Media** — uploads (alt text required)

See the [Payload collections docs](https://payloadcms.com/docs/configuration/collections) when adding new collections.
