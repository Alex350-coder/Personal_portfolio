# Tasks.md — Executable tasks

Rules: tasks run in order inside a phase; **each task = one commit** (message given). `AC#` = acceptance criterion in `Plan.md` for that phase. A task is done when its check passes and the commit builds + typechecks. Tick boxes as you go and mirror status in `Progress.md`.

Setup per phase: `git switch main && git switch -c <branch>` → `/clear` → `/ecc-load-phase phase-N` → read the phase's Required Reading.

---

## Phase 1 — Foundation & Design System (`phase/01-foundation`)

- [x] **P1-T01** Root `git init -b main`, root `.gitignore` (node_modules, dist, .env*, coverage, playwright-report, `.claude/settings.local.json`), baseline commit of current state on `main`, create branch. Check: `git status` clean, `git branch` shows phase branch. `chore: baseline Hero and scaffolding` (on main). *(AC1)*
- [x] **P1-T02** Record Hero baseline screenshots (375/768/1440, reduced-motion on/off) into `docs/assets/hero-baseline/`. `docs: add Hero baseline screenshots` *(AC3)*
- [x] **P1-T03** Add Vitest + Testing Library + jsdom + `vitest.config.ts`, `npm test`, `npm run test:coverage` with WebGL file excluded. `chore(client): add vitest and testing library` *(AC5,6)*
- [x] **P1-T04** Add Playwright + `@axe-core/playwright`, config (Chromium; webServer = `vite preview`), first smoke test (Hero renders, no console errors). `test(client): add playwright smoke and axe` *(AC5)*
- [x] **P1-T05** Add `.github/workflows/ci.yml` (client: typecheck, lint, test, build; server: typecheck, lint, build). `ci: add GitHub Actions workflow` *(AC5)*
- [x] **P1-T06** Add Geist Mono (`@fontsource-variable/geist-mono`), declare `--font-mono` in `@theme`; compare against baseline. `feat(client): declare Geist Mono as mono font` *(AC3)*
- [x] **P1-T07** Define palette tokens in `index.css` `@theme` (`void, haze, dusk, deep, teal, accent, star`) from the `abyssal` preset, plus alpha ramp utilities. `feat(client): extract Hero palette tokens` *(AC2)*
- [x] **P1-T08** Map shadcn semantic tokens (`background, foreground, primary, border, ring, muted…`) to Hero tokens in `.dark`; set `html` dark-only, `color-scheme: dark`, selection + focus-ring styles; remove light-theme dead tokens. `feat(client): map shadcn tokens to Hero palette` *(AC2)*
- [x] **P1-T09** Define type + spacing tokens/utilities (eyebrow, label, heading scale, section padding `px-6 sm:px-10 lg:px-16`, container max-widths); radius = 0 for hero-style controls. `feat(client): add typography and spacing tokens` *(AC2)*
- [x] **P1-T10** `use-reduced-motion` and `use-in-view` hooks (TDD). `feat(client): add motion and visibility hooks` *(AC7)*
- [x] **P1-T11** `Container`, `Section` (id, eyebrow, heading, `aria-labelledby`), `SkipLink` + tests. `feat(client): add layout primitives` *(AC7)*
- [x] **P1-T12** `Eyebrow` and `ActionLink` (`hero` / `ghost-hero` variants extending `buttonVariants`; Hero reuses them) + tests. `feat(client): add Hero-style action primitives` *(AC2,3,7)*
- [x] **P1-T13** Refactor `HeroSection.tsx` to tokens + primitives with **no visual change**; screenshot diff vs baseline. `refactor(client): Hero uses tokens and primitives` *(AC2,3)*
- [x] **P1-T14** `DotGrid` (CSS radial-gradient halftone surface, token colors, no JS) + `Reveal` (CSS/IO, off under reduced motion) + tests. `feat(client): add DotGrid and Reveal` *(AC7)*
- [x] **P1-T15** `GlowCard` (pointer-reactive glow through `--mx/--my`, fine-pointer only, off under reduced motion) + tests. `feat(client): add GlowCard primitive` *(AC7)*
- [x] **P1-T16** Hero a11y/robustness deviations: `id="inicio"` + accessible name via props on `HalftoneNebula`, pause/play control (WCAG 2.2.2, keyboard operable, state persisted in memory only), fallback gradient + root bg from preset colors, `lang`-correct label. Log each in `docs/HeroAudit.md`. `fix(client): Hero accessibility and fallback deviations` *(AC4)*
- [x] **P1-T17** Dev-only `/__kit` page showing every primitive (excluded from prod build via `import.meta.env.DEV`), axe check. `test(client): add primitive kit page and axe check` *(AC7)*
- [x] **P1-T18** Docs: update `Progress.md`, `.claude/New_files.md`, `docs/UI.md` final token names, `README.md`; run full gate. `docs: close phase 1` *(all)*

## Phase 2 — Navigation, About & Professional Identity (`phase/02-identity`)

- [ ] **P2-T01** Add `react-router`; `app/router.tsx` with `/`, `/proyectos`, `/proyectos/:slug`, `*`; `App.tsx` uses it. `feat(client): add router` *(AC5)*
- [ ] **P2-T02** `Layout` (skip-link, `<header>`, `<main id="contenido">`, `<footer>`), scroll-to-hash + scroll restoration, focus to `main` on route change (TDD). `feat(client): add layout shell and hash scrolling` *(AC1,5)*
- [ ] **P2-T03** `data/profile.ts` typed (name, role, summary, links, availability) seeded from `docs/ProfileData.md`; unconfirmed (⚠) fields as `[[PLACEHOLDER]]`; type test. `feat(client): add typed profile data` *(AC3,4)*
- [ ] **P2-T04** Hero reads copy from `profile.ts` (no visual change; diff). `refactor(client): Hero reads profile data` *(AC3)*
- [ ] **P2-T05** `SiteHeader` desktop bar (mono links, active-section state via IntersectionObserver). `feat(client): add site header` *(AC1,2)*
- [ ] **P2-T06** Header visibility logic: hidden while Hero visible on `/`, always on other routes (TDD). `feat(client): reveal header after Hero` *(AC2)*
- [ ] **P2-T07** `MobileMenu` disclosure (focus management, Escape, close on navigate, inert background). `feat(client): add accessible mobile menu` *(AC1)*
- [ ] **P2-T08** `SocialLinks` component (GitHub, LinkedIn, email, CV) with labels, `rel`, external hint. `feat(client): add professional links component` *(AC3)*
- [ ] **P2-T09** `HomePage` composes Hero + empty anchored `#sobre-mi/#proyectos/#tecnologias/#contacto` landmarks. `feat(client): compose home page anchors` *(AC5)*
- [ ] **P2-T10** About section layout (intro, three pillars, fact list) using `Section`, `DotGrid`, `Reveal`. `feat(client): add About section` *(AC3)*
- [ ] **P2-T11** `data/technologies.ts` (`TechId`, label, group, optional URL; no skill bars) + unique-id test. `feat(client): add technologies data` *(AC3)*
- [ ] **P2-T12** Technologies section (grouped, evidence line placeholder until Phase 3). `feat(client): add Technologies section` *(AC3)*
- [ ] **P2-T13** `NotFoundPage` in-theme (basic) + `/proyectos*` stubs. `feat(client): add 404 and route stubs` *(AC5)*
- [ ] **P2-T14** Placeholder registry: script/grep command + table in `docs/ContentStrategy.md`. `docs: add placeholder registry` *(AC4)*
- [ ] **P2-T15** Unit/integration tests (nav, mobile menu, hash scroll, data shape) to ≥80%. `test(client): cover navigation and identity` *(AC7)*
- [ ] **P2-T16** Playwright: keyboard-only nav, mobile 375 menu, axe on `/`. `test(client): e2e navigation and axe` *(AC1,6)*
- [ ] **P2-T17** Docs + `Progress.md` + `.claude/New_files.md`; full gate. `docs: close phase 2` *(all)*

## Phase 3 — Projects Showcase & GitHub (`phase/03-projects`)

- [ ] **P3-T01** Re-check repo metadata (public API via `curl`, read-only; `gh` not installed), get owner confirmation of the selection in `docs/ProfileData.md §4–5`, copy the final inventory into `docs/ProjectShowcase.md §Inventory`. `docs: add project inventory` *(AC1)*
- [ ] **P3-T02** `Project` type + `project.schema.ts` validator (zero-dep, explicit errors). Tests first for every invalid case. `feat(client): add project schema and validation` *(AC2)*
- [ ] **P3-T03** `projects.ts` seed (real or `placeholder: true`) + dataset test run against schema. `feat(client): add project dataset` *(AC1,2,6)*
- [ ] **P3-T04** Selectors in `lib/projects.ts`: `getFeatured`, `getBySlug`, `getByTech`, `filterProjects` (pure, immutable, TDD). `feat(client): add project selectors` *(AC1,3)*
- [ ] **P3-T05** `Badge` (status/category) with accessible text (not color only). `feat(client): add Badge primitive` *(AC7)*
- [ ] **P3-T06** `ProjectCard` compact variant + `GlowCard`. `feat(client): add compact ProjectCard` *(AC5,7)*
- [ ] **P3-T07** `ProjectCard` featured variant (cover slot, problem line, stack). `feat(client): add featured ProjectCard` *(AC3,7)*
- [ ] **P3-T08** `ExternalLink` helper enforcing `rel`, new-tab hint, https check; use everywhere. `feat(client): add safe ExternalLink` *(AC5)*
- [ ] **P3-T09** Home `#proyectos` section: ordered featured grid + "Ver todos" link + GitHub profile card. `feat(client): add featured projects section` *(AC3)*
- [ ] **P3-T10** URL-state hook for filters (`categoria`, `tec`, `estado`) (TDD). `feat(client): add filter URL state` *(AC4)*
- [ ] **P3-T11** `ProjectFilters` UI (toggle buttons/checkboxes with `aria-pressed`/labels, clear all). `feat(client): add project filters` *(AC4)*
- [ ] **P3-T12** `/proyectos` page: grid, result count `aria-live`, empty state, archived toggle. `feat(client): add projects index page` *(AC3,4)*
- [ ] **P3-T13** Technologies evidence: each tech shows linked project count → filtered index. `feat(client): link technologies to projects` *(AC1)*
- [ ] **P3-T14** Card + section reveal and glow refinement; reduced-motion/touch audit. `refactor(client): refine project motion` *(AC7)*
- [ ] **P3-T15** Component tests (cards, filters, page) to ≥80%. `test(client): cover project UI` *(AC8)*
- [ ] **P3-T16** Playwright: featured on home, filter via keyboard, URL restore, axe on `/` and `/proyectos`. `test(client): e2e projects flows` *(AC4,8)*
- [ ] **P3-T17** Fixture-project test proving "add a project = edit data only". `test(client): prove data-driven project addition` *(AC1)*
- [ ] **P3-T18** Docs: final schema in `docs/ProjectShowcase.md`, registry, `Progress.md`, `New_files.md`; full gate. `docs: close phase 3` *(all)*

## Phase 4 — Project Details & Case Studies (`phase/04-project-details`)

- [ ] **P4-T01** Extend schema/types for detail fields (`problem`, `highlights`, `decisions`, `security`, `media`, `role`) with tests; keep all optional except `problem`. `feat(client): extend project schema for details` *(AC2)*
- [ ] **P4-T02** `ProjectDetailPage` route wiring + slug lookup + 404 reuse. `feat(client): add project detail route` *(AC1)*
- [ ] **P4-T03** `ProjectHeader` (title as `h1`, badges, links, year/role). `feat(client): add project header` *(AC2,5)*
- [ ] **P4-T04** `ProjectSection` + problem/highlights/decisions rendering with heading hierarchy. `feat(client): render project narrative sections` *(AC2,5)*
- [ ] **P4-T05** Security/dev notes block (only when data present). `feat(client): render project security notes` *(AC2)*
- [ ] **P4-T06** `TechList` linking to filtered index. `feat(client): link project stack to index` *(AC6)*
- [ ] **P4-T07** Media helper + `<picture>` component (AVIF/WebP/fallback, size attrs, alt required by type). `feat(client): add responsive media component` *(AC3)*
- [ ] **P4-T08** Image optimization script/doc (dev-time, `sharp`) + sample assets for flagship projects (user-supplied). `chore(client): add image optimization workflow` *(AC3)*
- [ ] **P4-T09** Static figure gallery (1 image) and multi-image grid. `feat(client): add screenshot gallery` *(AC2,3)*
- [ ] **P4-T10** Lightbox (≥2 images): focus trap, Escape, arrows, restore focus, reduced motion. `feat(client): add accessible lightbox` *(AC4)*
- [ ] **P4-T11** Prev/next project navigation (deterministic order). `feat(client): add project prev-next nav` *(AC6)*
- [ ] **P4-T12** Per-route `document.title` + meta hook (interim; final in P6). `feat(client): add route title hook` *(AC1)*
- [ ] **P4-T13** Optional architecture diagram as pre-rendered SVG for flagship projects (if user supplies). `feat(client): add architecture diagram figure` *(AC2)*
- [ ] **P4-T14** Text-only vs full-field render tests; every slug renders test. `test(client): cover project detail rendering` *(AC1,2,7)*
- [ ] **P4-T15** Playwright: deep link, back/forward, gallery keyboard, axe on 3 detail pages. `test(client): e2e project details` *(AC4,5,6,7)*
- [ ] **P4-T16** Lighthouse on a detail page, fix findings, docs/Progress/New_files; full gate. `docs: close phase 4` *(all)*

## Phase 5 — Contact, Resume & Conversion (`phase/05-contact`)

- [ ] **P5-T01** Re-confirm ADR-004 with the user (no form); record answer in `Decisions.md`. `docs: confirm contact approach` *(AC1)*
- [ ] **P5-T02** `lib/email.ts`: build-time assembled address helper (TDD). `feat(client): add email helper` *(AC1)*
- [ ] **P5-T03** `CopyButton` with live-region status, clipboard fallback (TDD). `feat(client): add copy button` *(AC1)*
- [ ] **P5-T04** `#contacto` section layout (statement, email, links) with `DotGrid`. `feat(client): add Contact section` *(AC1)*
- [ ] **P5-T05** CV link component (type/size hint, `download`), file placement `public/cv/`. `feat(client): add CV link` *(AC2)*
- [ ] **P5-T06** Placeholder behavior for missing CV (dev warning, prod gate). `feat(client): flag missing CV` *(AC2)*
- [ ] **P5-T07** `SiteFooter` final (links, year, stack line, back-to-top). `feat(client): finalize footer` *(AC4)*
- [ ] **P5-T08** CTA flow: Hero → Projects → Contact; detail-page end CTA. `feat(client): add conversion CTAs` *(AC1)*
- [ ] **P5-T09** In-theme 404 final (DotGrid, links to home/projects). `feat(client): finalize 404 page` *(AC4)*
- [ ] **P5-T10** Optional CSS-only closing visual for Contact (decision recorded). `feat(client): add Contact backdrop` *(AC1)*
- [ ] **P5-T11** Link safety audit: all external links via `ExternalLink`. `refactor(client): enforce safe external links` *(AC3)*
- [ ] **P5-T12** Secret/PII scan, `docs/Security.md` update. `docs: update security notes` *(AC5)*
- [ ] **P5-T13** Unit tests (email, copy button, CV link) to ≥80%. `test(client): cover contact logic` *(AC6)*
- [ ] **P5-T14** Playwright contact flow + axe + keyboard. `test(client): e2e contact flow` *(AC1,6)*
- [ ] **P5-T15** Run `/security-scan` + security-reviewer; fix findings. `fix(client): address security review` *(AC5)*
- [ ] **P5-T16** Docs/Progress/New_files; full gate. `docs: close phase 5` *(all)*

## Phase 6 — Polish, Accessibility, Performance, SEO & Production (`phase/06-polish-production`)

- [ ] **P6-T01** Responsive audit matrix (320→2560, landscape, short viewport) with screenshots; fix list. `docs: add responsive audit` *(AC1)*
- [ ] **P6-T02** Apply responsive fixes. `fix(client): responsive refinements` *(AC1)*
- [ ] **P6-T03** Accessibility audit with `a11y-architect` (keyboard, focus, forced-colors, zoom 400%) → fix list. `docs: add accessibility audit` *(AC4)*
- [ ] **P6-T04** Apply accessibility fixes (incl. Hero text contrast/size within allowed deviations). `fix(client): accessibility fixes` *(AC4)*
- [ ] **P6-T05** Route-level code splitting (`React.lazy`), WebGL chunk isolated. `perf(client): split routes and WebGL chunk` *(AC3)*
- [ ] **P6-T06** Font strategy (subset latin, preload critical, `font-display`). `perf(client): optimize fonts` *(AC2)*
- [ ] **P6-T07** Image audit and conversions. `perf(client): optimize images` *(AC2)*
- [ ] **P6-T08** Hero perf review (DPR cap, offscreen/visibility pause verified, mobile frame cost) + doc. `perf(client): verify Hero rendering budget` *(AC1,2)*
- [ ] **P6-T09** SEO spike: choose prerender technique (ADR-006). `docs: record prerender decision` *(AC5)*
- [ ] **P6-T10** Implement prerender for `/`, `/proyectos`, `/proyectos/:slug`. `feat(client): prerender routes` *(AC5)*
- [ ] **P6-T11** `lib/seo.ts` per-route title/description/canonical/OG. `feat(client): add SEO metadata` *(AC5)*
- [ ] **P6-T12** JSON-LD (`Person`, project `SoftwareSourceCode`), sitemap, robots, OG image. `feat(client): add structured data and sitemap` *(AC5)*
- [ ] **P6-T13** Placeholder gate script wired into build. `feat(client): add placeholder build gate` *(AC7)*
- [ ] **P6-T14** Link-check script. `feat(client): add link checker` *(AC7)*
- [ ] **P6-T15** Security headers/CSP for chosen host; dependency audit. `feat: add security headers` *(AC6)*
- [ ] **P6-T16** Cross-browser Playwright (Chromium/Firefox/WebKit) + axe all routes. `test(client): cross-browser e2e` *(AC4)*
- [ ] **P6-T17** Lighthouse runs, budgets enforced in CI. `ci: add Lighthouse budgets` *(AC1,2,3)*
- [ ] **P6-T18** Deploy pipeline + custom domain + post-deploy smoke test. `ci: add deploy workflow` *(AC6,8)*
- [ ] **P6-T19** Docs sweep, `README.md` rewrite, `Progress.md` final evidence. `docs: finalize documentation` *(AC8)*
- [ ] **P6-T20** Merge to `main`, tag `v1.0.0`, verify production URL. `chore: release v1.0.0` *(AC8)*
