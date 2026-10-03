# Security.md

Extends ECC `common/security`, `web/security`, `react/security`, `typescript/security`. The site is static, so the attack surface is small; keep it that way.

## Threat model (summary)
| Risk | Mitigation |
|---|---|
| XSS via content | All copy is typed data rendered by React (escaped). No `dangerouslySetInnerHTML` on non-static content. No Markdown/HTML ingestion. |
| Malicious/typo URLs in data | Schema requires `https:` (and `mailto:` only for the email helper); tests fail otherwise. |
| Reverse tabnabbing | `ExternalLink` enforces `rel="noopener noreferrer"`. |
| URL-param injection (filters) | Params parsed against whitelists of known categories/tech ids; unknown values ignored. |
| Secrets leakage | No secrets needed. `.env*` ignored. Pre-commit/CI grep for `AKIA`, `sk-`, `-----BEGIN`, `password=`, `token=`. Rotate immediately if ever exposed. |
| Dependency compromise | Lockfiles committed; `npm audit --omit=dev` in CI (hard gate Phase 6); minimal deps; review install scripts for new packages. |
| Email scraping/spam | Address assembled at runtime (`lib/email.ts`); no form; no third-party trackers. |
| Clickjacking / MIME / referrer | Host headers (Phase 6): `Content-Security-Policy` (no `unsafe-eval`; allow only self + needed inline hashes), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (deny camera/mic/geo), `frame-ancestors 'none'`, HSTS on custom domain. |
| Supply chain via CDN | No third-party scripts/fonts at runtime (fonts self-hosted via `@fontsource`). |
| Privacy | No analytics/cookies by default. If added later: privacy-first, documented, no consent banner needed only if cookie-less. |
| Backend | None (ADR-004). If reopened: validation, rate limiting, CORS allow-list, secrets via env, security-reviewer gate. |

## Process
- `security-reviewer` runs every phase (always active); `/security-scan` in Phase 5 and 6.
- Before each commit: no secrets, URLs validated, links safe, error messages non-leaky.
- Public repo hygiene: no personal phone/address in data; CV contains only what the user intends to be public.
