# Progress.md — Current state

_Last updated: 2026-10-04 (Phase 1 complete, merged into main)_

## Current phase
**Phase 1 — Foundation & Design System: complete** (branch `phase/01-foundation`, 17 commits on the branch + the baseline on `main`, merged `--no-ff`). **Next: Phase 2 — Navigation, About & Professional Identity** (not started).

## Completed work
- 2026-10-03/04: **Phase 1** — git initialised (baseline on `main`), Vitest/Testing Library, Playwright + axe, CI workflow, Geist Mono, Hero palette/type/spacing tokens, shadcn tokens mapped (dark-only), hooks (`useReducedMotion`, `useInView`), primitives (`Container`, `Section`, `SkipLink`, `Eyebrow`, `ActionLink`, `DotGrid`, `Reveal`, `GlowCard`), Hero refactored onto them, Hero a11y/robustness deviations D3–D5 (+D7), dev-only `/__kit`. Evidence below.
- 2026-10-03: owner decisions recorded (`docs/ProfileData.md §7`, ADR-008) and applied: Hero filled with real name/role/bio/tags (`HeroSection.tsx`). After the edit: typecheck ✔, lint ✔, build ✔ (JS 273.93 KB / 87.57 KB gzip).
- 2026-10-02: owner's public GitHub reviewed (profile, 23 repos, READMEs) → `docs/ProfileData.md` (identity, stack, inventory, proposed positioning, open ⚠ items).
- Hero Section implemented before planning (`HalftoneNebula`, preset `abyssal`) — see `README.md`.
- Planning/documentation system created: `CLAUDE.md`, `Rules.md`, `Plan.md`, `Tasks.md`, `DefinitionOfDone.md`, `Progress.md`, `.claude/phase-plan.json`, `.claude/New_files.md`, and `docs/*` (Architecture, FolderStructure, UI, HeroAudit, CodingStandards, Testing, Security, Performance, Accessibility, SEO, ContentStrategy, ProjectShowcase, DevelopmentWorkflow, Decisions).

## Phase 1 validation (2026-10-04)
| Check | Result |
|---|---|
| `client` typecheck / lint / build | pass |
| `client` vitest | 70 tests, 13 files, pass |
| Coverage (non-WebGL) | statements 91.3 %, branches 87.9 %, functions 90 %, lines 93.2 % (threshold 80 %) |
| Playwright (Chromium, prod build + dev server) | 11 tests pass; axe 0 serious/critical on `/` and `/__kit` |
| `server` typecheck / lint / build | pass |
| `npm audit --omit=dev` (client) | 0 vulnerabilities (after moving `shadcn` to devDependencies) |
| Bundle (prod) | JS 284.5 KB raw / 91.4 KB gzip (baseline 274 / 86: +10 KB from hooks, primitives, pause icons); CSS 37.4 KB / 7.4 KB gzip; Geist + Geist Mono woff2 |
| Code review / security review | code-reviewer + security-reviewer run; no CRITICAL/HIGH. MEDIUM fixed: clock jump on resume, `Reveal` rootMargin, smoke test warnings, reduced-motion test, `shadcn` as devDependency, `.claude/settings.json` untracked. Not changed: timing-based pause test (stable with one worker) |

### Acceptance criteria (Plan.md Phase 1)
| # | Criterion | Result | Evidence |
|---|---|---|---|
| 1 | ≥15 commits on branch; `main` only baseline until merge | pass | 17 commits on the branch (8 on 2026-10-03, 9 on 2026-10-04) plus the baseline on 2026-10-03 = 18 total, 9 per day; `main` held only `chore: baseline Hero and scaffolding` before the merge |
| 2 | Raw hex only in presets/token definitions | pass | `grep -rn "#3ff2e0\|#e4fffb\|#02060a" client/src --include=*.tsx` → only `halftone-nebula.tsx` |
| 3 | Hero before/after identical except documented deviations | pass | pixel diff vs P1-T06 capture confined to the primary CTA box (D7); mono font = D1; pause control = D4 (screenshots in `docs/assets/hero-baseline/`, notes in HeroAudit) |
| 4 | `id="inicio"`, accessible name ≠ nebula description, keyboard pause/play | pass | unit + e2e tests (landmark named by h1; Enter/Space toggles; rAF frames stop while paused) |
| 5 | typecheck + lint + test + build pass | pass | tables above; CI runs the same commands (workflow not yet executed on GitHub: no remote) |
| 6 | Coverage ≥80 %, WebGL file excluded with justification | pass | `vitest.config.ts` exclusion comment; numbers above |
| 7 | Primitives tested; `/__kit` dev-only | pass | per-primitive unit + axe tests; e2e proves `/__kit` is absent from the production build |

## Baseline validation (2026-10-02, before Phase 1)
| Check | Result |
|---|---|
| `client` typecheck | pass |
| `client` lint (oxlint) | pass (no output) |
| `server` typecheck | pass |
| `client` build output (existing `dist/`) | JS 274 KB raw / 86 KB gzip, CSS 27.5 KB, Geist woff2 ×5 |
| Tests | none exist yet (infra added in P1) |
| Git | not a repository |

## Known issues (inputs to Phase 2/6)
Resolved in Phase 1: #1 (git, `.gitignore`), #2 (tokens), #3 (mono font), #4 (landmark/id), #5 (pause control), #6 (preset fallback), #10 (tests, CI). Still open: #7 (CTAs target `#proyectos`/`#contacto`, created in P3/P5), #8 (10 px label contrast, P6), #9 (TS versions, accepted).
New notes: `SkipLink` is built but not mounted and `<main>` has no `id="contenido"` (P2 layout shell); `Reveal` content is invisible without JS (acceptable, revisit with prerender in P6); Playwright runs with one worker because SwiftShader WebGL is CPU-bound; the CI workflow has never run on GitHub (no remote yet); `.claude/settings.json` is untracked (absolute hook paths); D7 changed how the Hero CTAs look (accent border now actually applies).

Original list (2026-10-02):
0. (Resolved 2026-10-03) Hero placeholders replaced by real copy.
1. Not a git repo; no root `.gitignore`; `dist/` present.
2. Hero colors are hard-coded hex; shadcn tokens are still the default neutral theme (light `:root` + `.dark`).
3. `font-mono` is used heavily but no mono font is declared (falls back to system mono).
4. `HalftoneNebula` root `<section aria-label="A pixel-art nebula…">` (English, names the whole hero landmark; the `h1` lives inside it). No `id` hook for anchors.
5. No pause/stop control for the continuously animating canvas (WCAG 2.2.2).
6. Failure fallback gradient and root background are hard-coded to the `crimson` palette, not the active preset (teal) → wrong flash/fallback.
7. Hero CTAs target `#proyectos`/`#contacto`, which do not exist.
8. Hero text at 10–11 px with 55–70 % opacity on a moving background — contrast must be verified (Phase 6 allows documented tweaks).
9. TypeScript versions differ (`client` ~6.0, `server` ^7.0.2) — acceptable; do not unify without reason.
10. No tests, no CI.

## Decisions
ADR-001…006 in `docs/Decisions.md` (tokens, routing, local typed data, backend deferred, WebGL only in Hero, prerender for SEO).

## Blocked / needs user input
Nothing blocks Phase 1. Needed later: CV (P5), hosting + domain (P6), per-project status and flagship case-study facts (P3/P4), approval of the AI-assisted "how I work" wording (P2). See `docs/ContentStrategy.md`.

## Next
**Phases start in a NEW conversation** (owner's instruction). Entry point: `git switch main && git switch -c phase/02-identity`, `/clear`, `/ecc-load-phase phase-2`, then `CLAUDE.md` → `Rules.md` → Phase 2 in `Plan.md` → `Tasks.md` P2-T01.

## Phase log
| Phase | Branch | Commits | Gate | Merged |
|---|---|---|---|---|
| 1 | phase/01-foundation | 17/15 (+ baseline) | pass (see Phase 1 validation) | 2026-10-04 |
| 2 | phase/02-identity | 0/15 | — | — |
| 3 | phase/03-projects | 0/15 | — | — |
| 4 | phase/04-project-details | 0/15 | — | — |
| 5 | phase/05-contact | 0/15 | — | — |
| 6 | phase/06-polish-production | 0/15 | — | — |
