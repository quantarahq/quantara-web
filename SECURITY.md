# Security Policy

Quantara is an early-stage MVP, not a production platform (see the README) — please
keep that in mind when assessing severity.

## Reporting a vulnerability

If you find a security issue, please **do not open a public issue**. Instead, report
it privately via GitHub's [private vulnerability reporting](https://github.com/quantarahq/quantara-web/security/advisories/new)
for this repo, or contact the org owners at github.com/quantarahq.

Please include:

- A description of the issue and its impact
- Steps to reproduce
- Affected version/commit

We'll acknowledge reports as quickly as we can and follow up once a fix is available.

## Scope

The dashboard has no authentication of its own — it's a thin client over
`quantara-core`'s API, which itself has no authN/authZ in the MVP (documented in that
repo's `SECURITY.md`). That's an intentional MVP scope decision, not an oversight.
