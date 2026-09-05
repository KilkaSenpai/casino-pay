# Frontend architecture

Classic layered (component-driven) layout. No Feature-Sliced Design, no `features` / `entities` / `widgets` / `shared`.

## Folders

```
src/app/(frontend)/     # pages: routes, layouts, page.tsx
src/components/         # UI (Header, CMSLink, Container, icons)
src/hooks/              # reusable React hooks
src/utils/              # pure helpers (no JSX)
```

`src/app` is the pages layer (App Router). Do not add `src/pages` — that would enable the Pages Router.

Payload stays in `src/collections`, `src/globals`, `src/payload.config.ts`.

## Rules

- Put UI in `src/components`. A multi-section block lives in a folder (`Header/`, `Footer/`).
- Split that folder like `Header/`: `Site*` fetches CMS data; one file per design section. Do not dump the whole block into one presentational file.
- Do not extract a 20-line button or a trivial wrapper into its own file. That ban is not a reason to keep nav, logos, and legal in one file.
- Put reusable hooks in `src/hooks`. A hook used by one component can stay in that file.
- Put non-React helpers in `src/utils`.
- Fetch CMS data in a Server Component (`SiteHeader`). Client files only handle events, local state, and browser APIs.
- Do not invent FSD layers.
