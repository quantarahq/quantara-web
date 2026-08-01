# quantara-web

[![CI](https://github.com/quantarahq/quantara-web/actions/workflows/ci.yml/badge.svg)](https://github.com/quantarahq/quantara-web/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black.svg)](package.json)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6.svg)](tsconfig.json)
[![Good First Issues](https://img.shields.io/github/issues/quantarahq/quantara-web/good-first-issue?color=7057ff)](https://github.com/quantarahq/quantara-web/labels/good-first-issue)

**The developer-facing frontend for Quantara** — an open-source developer
infrastructure platform for the Soroban smart contract ecosystem. This repo is the
landing page and dashboard: everything a developer sees and clicks, talking to
[quantarahq/quantara-core](https://github.com/quantarahq/quantara-core)'s REST API.

> **This is an MVP dashboard, not a production product.** It's deliberately kept
> simple — no advanced analytics, no real-time streaming, no complex charts, no
> auth. What's here works end-to-end and honestly; what's missing is called out
> below rather than faked.

Part of the Quantara project:

| Repo | What it is |
|---|---|
| [quantara-core](https://github.com/quantarahq/quantara-core) | Backend API + Soroban contract that this dashboard talks to |
| **quantara-web** (this repo) | Next.js dashboard |
| [quantara-toolkit](https://github.com/quantarahq/quantara-toolkit) | Placeholder for a future CLI and runtime |

---

## Table of contents

- [What's in the app](#whats-in-the-app)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Repository layout](#repository-layout)
- [Getting started](#getting-started)
- [Pages](#pages)
- [How data flows](#how-data-flows)
- [Testing](#testing)
- [Code quality tooling](#code-quality-tooling)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [FAQ](#faq)
- [License](#license)

## What's in the app

Two routes, both real, neither a mockup:

- **`/`** — a landing page explaining what Quantara is: a Hero, a Features grid (four
  cards: Soroban development tools, deployment workflows, contract management,
  developer dashboard), and a CTA into the dashboard.
- **`/dashboard`** — the actual product surface. Create a project, see it in a list,
  deploy a (simulated) contract for it, watch the deployment show up in a deployment
  history table, and see the resulting contract registration in a contracts table
  with a verification-status badge. Every one of those is a real API call against
  `quantara-core`, not sample data.

## Architecture

```
Developer
    |
Quantara Web (this repo)
    |
Quantara Core (quantara-core — REST API)
    |
Soroban Contract (quantara-core/contracts/deployment-registry)
```

`quantara-web` is a thin client: it owns no business logic and no persistence of its
own. Every piece of state you see in the dashboard — projects, deployments,
contracts — lives in `quantara-core`'s Postgres database and is fetched fresh
through its REST API. There's no local database, no server actions doing writes
directly, no duplicated source of truth.

## Tech stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | file-based routing, React Server Components by default |
| Language | TypeScript | strict mode; types in `types/` mirror the backend's DTOs |
| Styling | Tailwind CSS 4 | utility-first, no separate CSS-in-JS runtime |
| UI components | shadcn/ui + Radix UI | accessible primitives you own the code for, not a black-box library |
| Data fetching | TanStack Query | caching, invalidation, and loading/error states for every API call |
| Forms & validation | React Hook Form + Zod | client-side validation that mirrors the backend's `@Valid` rules |
| Icons | Lucide React | |
| Testing | Vitest | unit tests for extracted pure functions |
| Lint/format | ESLint + Prettier | enforced in CI (`format:check`, not just `lint`) |
| CI/CD | GitHub Actions | lint → format check → test → build, every push/PR |

## Repository layout

```
quantara-web/
├── app/                        Next.js App Router
│   ├── page.tsx                  landing page (/)
│   ├── layout.tsx                 root layout, wraps app in TanStack QueryProvider
│   ├── not-found.tsx              custom 404
│   └── dashboard/
│       ├── page.tsx                dashboard (/dashboard)
│       └── loading.tsx              route-level loading skeleton
├── components/
│   ├── landing/                 Hero, Features, Cta
│   ├── dashboard/                CreateProjectForm, ProjectsList, DeployPanel,
│   │                              DeploymentsList, ContractsList, DashboardContent
│   ├── layout/                   SiteHeader, SiteFooter
│   ├── providers/                 QueryProvider (TanStack Query)
│   └── ui/                       shadcn/ui primitives (Button, Card, Table, …)
├── services/                   Typed fetch client for quantara-core
│   ├── client.ts                 apiFetch<T>() + ApiError
│   ├── projects.ts / deployments.ts / contracts.ts / health.ts
├── hooks/                      TanStack Query hooks
│   ├── useProjects.ts            list + create (with invalidation)
│   ├── useDeploy.ts               mutation; invalidates contracts + deployments
│   ├── useDeployments.ts / useContracts.ts
├── types/                      TypeScript types mirroring backend DTOs
├── lib/                        format.ts (truncateAddress) + utils.ts (shadcn's cn())
├── public/                     static assets
├── .github/                    CI, issue templates, PR template, Dependabot, CODEOWNERS
├── README.md                   you are here
├── CONTRIBUTING.md / CODE_OF_CONDUCT.md / SECURITY.md / CHANGELOG.md
└── LICENSE
```

## Getting started

**Requirements:** Node 20+ (see `.nvmrc`), and a running `quantara-core` backend —
see [that repo's README](https://github.com/quantarahq/quantara-core#getting-started);
`cd infra && docker compose up -d` there is the fastest path.

```bash
git clone https://github.com/quantarahq/quantara-web.git
cd quantara-web
npm install

# point at your local backend (defaults to http://localhost:8080 if you skip this)
cp .env.example .env.local

npm run dev
```

Visit `http://localhost:3000` for the landing page and `http://localhost:3000/dashboard`
for the dashboard. `NEXT_PUBLIC_API_URL` is the only environment variable this app
reads — see [`.env.example`](.env.example).

## Pages

### `/` — landing page

`components/landing/hero.tsx`, `features.tsx`, `cta.tsx`, composed in `app/page.tsx`
behind the shared `SiteHeader`/`SiteFooter`. Static content, no data fetching.

### `/dashboard` — the product

`components/dashboard/dashboard-content.tsx` holds the one piece of client state
(`selectedProject`) and composes:

1. **`CreateProjectForm`** — React Hook Form + Zod, mirrors the backend's validation
   rules (`name` required, both fields length-capped), calls `POST /api/projects`.
2. **`ProjectsList`** — a table of all projects; clicking a row selects it, driving
   everything below.
3. **`DeployPanel`** — a contract-name input and a "Deploy Contract" button that
   calls `POST /api/deploy` for the selected project.
4. **`DeploymentsList`** — the selected project's deployment history, with a
   SUCCESS/FAILED status badge.
5. **`ContractsList`** — the selected project's registered contracts (truncated
   address, deployment ID, a "Verified" badge).

Deploying invalidates both the deployments and contracts queries, so both tables
update automatically without a manual refresh.

## How data flows

`services/client.ts` exports a single `apiFetch<T>()` wrapping `fetch`, throwing a
typed `ApiError` (with `status` and optional `fieldErrors`) on non-2xx responses. Each
resource gets a thin service module (`services/projects.ts`, etc.) with plain async
functions — no class, no abstraction beyond what's needed. `hooks/` wraps those in
TanStack Query (`useQuery`/`useMutation`), which is the only layer that knows about
caching, loading states, or query-key invalidation. Components never call `fetch`
directly.

## Testing

```bash
npm run test          # Vitest
npm run lint           # ESLint
npm run format:check    # Prettier
npm run build             # next build — also runs the TypeScript compiler
```

Unit tests currently cover `lib/format.ts` (`truncateAddress`, including boundary
cases). The larger end-to-end flow (create → select → deploy → see it in both
tables) is verified manually/via scripted browser automation during development
rather than with a committed e2e test suite — see [Roadmap](#roadmap).

## Code quality tooling

- **ESLint** (`eslint-config-next` + `eslint-config-prettier` so the two never fight).
- **Prettier**, with `format`/`format:check` npm scripts; CI fails if you forgot to
  run it, same as the lint step.
- **Vitest**, `vitest.config.mts`, `node` environment (no jsdom — these are pure
  function tests, not component tests, on purpose: see [Roadmap](#roadmap)).
- All four (lint, format, test, build) run in CI on every push/PR.

## Contributing

Start with [CONTRIBUTING.md](CONTRIBUTING.md). The short version:

- Pick up a [`good-first-issue`](https://github.com/quantarahq/quantara-web/labels/good-first-issue)
  or [`help-wanted`](https://github.com/quantarahq/quantara-web/labels/help-wanted).
- Small, focused commits; loose [Conventional Commits](https://www.conventionalcommits.org/)
  style.
- `npm run lint && npm run format:check && npm run test && npm run build` must all
  pass before you open a PR — CI runs the same checks.
- Labels in use: `frontend`, `documentation`, `infra`, `MVP`, `future`,
  `good-first-issue`, `help-wanted`.

## Roadmap

What's deliberately **not** here yet, and why:

- **Component/e2e tests** — the current test suite covers pure utility functions
  only; adding React Testing Library component tests or a Playwright e2e suite is a
  natural, well-scoped `good-first-issue`.
- **Auth** — there's no login because `quantara-core` has no user accounts yet (see
  that repo's Security posture section). Adding one here without one there would be
  security theater.
- **Advanced analytics, real-time streaming, complex charts** — explicitly out of
  scope for the MVP dashboard per the project's own constraints.
- **A CLI** — tracked in [quantara-toolkit](https://github.com/quantarahq/quantara-toolkit),
  not this repo; the CLI is meant to be an alternative client to the same API, not
  something this repo builds.

## FAQ

**Why does the "Status" column on the projects table always say "Active"?**
Because `quantara-core`'s `Project` entity doesn't have a lifecycle/status field yet
— there's no archival or deactivation concept in the MVP. Rather than inventing a
fake status that implies functionality that doesn't exist, the table shows the one
honest state every listed project is actually in.

**Why is "Contract address" shown instead of "contract name" in the contracts table,
like the original spec sketch says?**
`quantara-core`'s `Contract` entity stores `contractAddress`/`deploymentHash`, not a
separate contract name (that lives on the `Deployment` record instead, one level up).
Showing the address is the honest representation of what the API actually returns;
joining the two is a reasonable future enhancement, not done here to avoid
speculative complexity.

**Why no server actions / why does everything go through a REST API?**
Because `quantara-core` is meant to be usable by more than this dashboard — the
planned CLI in `quantara-toolkit` will be an alternative client to the exact same
API. Baking business logic into Next.js server actions would tie it to this one
frontend.

## License

[MIT](LICENSE)
