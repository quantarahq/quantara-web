# Contributing to quantara-web

Thanks for your interest in contributing to Quantara! This repo is an early-stage MVP,
so the priority is a clean, understandable foundation over feature count — please keep
that in mind when opening PRs.

## Ways to contribute

- Pick up an issue labeled [`good-first-issue`](https://github.com/quantarahq/quantara-web/labels/good-first-issue)
  or [`help-wanted`](https://github.com/quantarahq/quantara-web/labels/help-wanted).
- Report bugs or propose features via GitHub Issues.
- Improve documentation.

## Development setup

Requirements: Node 20+, and a running `quantara-core` backend for the dashboard to talk to.

```bash
git clone https://github.com/quantarahq/quantara-web.git
cd quantara-web
npm install
cp .env.example .env.local
npm run dev
```

## Project structure

See [README.md](README.md#repository-layout) for the top-level layout: `app/` for routes,
`components/` for UI, `services/` for the API client, `hooks/` for TanStack Query hooks,
`types/` for shared types.

## Commit and PR conventions

- Small, focused commits with descriptive messages (loose
  [Conventional Commits](https://www.conventionalcommits.org/) style: `feat:`, `fix:`,
  `docs:`, `style:`, `chore:`).
- Keep PRs scoped to one concern.
- Run `npm run lint` and `npm run build` before opening a PR — CI runs the same checks.

## Code style

ESLint + Prettier, configured in `eslint.config.mjs` / `.prettierrc`. Run `npm run lint`
to check, most issues can be auto-fixed by your editor's ESLint/Prettier integration.

## Code of Conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). Be kind.
