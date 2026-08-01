# quantara-web

The developer-facing frontend for **Quantara** — an open-source developer infrastructure
platform for the Soroban smart contract ecosystem. This is the landing page and dashboard
that talks to [quantarahq/quantara-core](https://github.com/quantarahq/quantara-core)'s
REST API.

> This is an MVP foundation, not a production-ready platform. See
> [quantarahq/quantara-core](https://github.com/quantarahq/quantara-core) for the backend
> and Soroban contract, and [quantarahq/quantara-toolkit](https://github.com/quantarahq/quantara-toolkit)
> for future CLI/runtime tooling.

## Architecture

```
Developer
    |
Quantara Web (this repo)
    |
Quantara Core (quantara-core, REST API)
    |
Soroban Contract (quantara-core/contracts/deployment-registry)
```

## Tech stack

| Layer              | Technology            |
| ------------------ | --------------------- |
| Framework          | Next.js (App Router)  |
| Language           | TypeScript            |
| Styling            | Tailwind CSS          |
| UI components      | shadcn/ui + Radix UI  |
| Data fetching      | TanStack Query        |
| Forms & validation | React Hook Form + Zod |
| Icons              | Lucide React          |

## Repository layout

```
quantara-web/
├── app/          Next.js App Router pages (/, /dashboard)
├── components/   Reusable UI components (landing sections, dashboard widgets, shadcn/ui)
├── services/     Typed API client for quantara-core
├── hooks/        TanStack Query hooks (useProjects, useDeploy, useContracts)
├── types/        Shared TypeScript types mirroring the backend DTOs
├── public/       Static assets
├── README.md
└── CONTRIBUTING.md
```

## Getting started

Requirements: Node 20+, and a running `quantara-core` backend (see that repo's README —
`docker compose up` from `infra/` is the fastest path).

```bash
npm install

# point at your local backend (defaults to http://localhost:8080)
cp .env.example .env.local

npm run dev
```

Visit `http://localhost:3000` for the landing page and `http://localhost:3000/dashboard`
for the dashboard.

## Status

This repo is under active MVP development. See open issues labeled `MVP` for what's in
scope right now, and `future` for what's intentionally deferred.

## License

[MIT](LICENSE)
