# Plan.md — Source of truth for direction and phases

> Authority: below `CLAUDE.md` and `Rules.md`, above `Tasks.md`. If this file and another doc disagree, this file wins (and the other doc must be fixed).
> Resource names below were verified against `~/.claude/resources/ecc-index.json` (generated 2026-07-21). The machine-readable copy is `.claude/phase-plan.json`; keep both in sync.

## 0. Project in one paragraph

A focused, mostly static personal developer portfolio (Spanish UI copy) built around an **already finished** WebGL Hero (`HalftoneNebula`, preset `abyssal`). Projects and technical evidence are the centerpiece. Stack: React 19 + TypeScript strict + Vite + Tailwind v4 + shadcn (base-nova). Backend (`/server`) is **deferred** (ADR-004).

## 1. Final information architecture

```text
/                      Home (single scroll)
  #inicio       Hero (existing, untouched visually)
  #sobre-mi     About / professional identity + focus areas (dev · security · AI)
  #proyectos    Selected projects (3–5 featured) + link "Ver todos"
  #tecnologias  Skills/technologies grouped, each with evidence (projects using it)
  #contacto     Contact + professional links + CV
  footer
/proyectos             Complete project index (filter by category / technology)
/proyectos/:slug       Project detail / case study (data-driven; richer if fields exist)
*                      404 (in-theme)
```

Deviation from the suggested order: "Project Details / Case Studies" is **not a home section**; it is the `/proyectos/:slug` route (a case study inside a scrolling home would bury Contact). Documented in `docs/Decisions.md` ADR-002.

Navigation: minimal mono top bar. On `/` it appears only after the Hero leaves the viewport (Hero stays pristine); on other routes it is always visible. Skip-link first in DOM.

## 2. Key decisions (details in `docs/Decisions.md`)

| # | Decision |
|---|---|
| ADR-001 | Hero palette becomes design tokens; the Hero is the only source of visual truth. Dark-only (no light theme / toggle). |
| ADR-002 | `react-router` with `/`, `/proyectos`, `/proyectos/:slug`; home sections are anchors. |
| ADR-003 | Project data = local typed TS (`client/src/data/`), validated by tests. No GitHub API at runtime. |
| ADR-004 | Backend **deferred**. Contact = mailto + copy + links, no form. `/server` stays empty. |
| ADR-005 | Only the Hero uses WebGL. Other sections use CSS derivatives (halftone dot-grid, glow, reveal). |
| ADR-006 | SEO via build-time prerender of the three route types (technique chosen in Phase 6 spike). |

## 3. Phase overview

| Phase | Branch | Theme |
|---|---|---|
| 1 | `phase/01-foundation` | Repo hygiene, tokens, shared primitives, test infra |
| 2 | `phase/02-identity` | Router shell, navigation, About, Technologies, links |
| 3 | `phase/03-projects` | Project model, featured + index, cards, filters |
| 4 | `phase/04-project-details` | `/proyectos/:slug` case studies, media |
| 5 | `phase/05-contact` | Contact, CV, footer, CTA flow, 404 |
| 6 | `phase/06-polish-production` | Responsive, a11y, perf, SEO, security, deploy |

Global rules for every phase: branch from `main` (`git switch -c <branch>`), merge back with `--no-ff` only after the Definition of Done passes; ≥15 meaningful commits (Conventional Commits, see `docs/DevelopmentWorkflow.md`); run `/ecc-load-phase phase-N` after `/clear`; update `Progress.md` and `.claude/New_files.md`.
Always-active ECC entries (scope `*`, in every phase): agents `code-reviewer`, `security-reviewer`; hook `always__track-new-files`.

---

## Phase 1 — Foundation & Design System

**Branch:** `phase/01-foundation`

**Objective:** Make the repo safe to build on, turn the Hero's look into reusable tokens/primitives, and install the test/validation toolchain. No new visible sections.

**Scope**
- `git init` at the monorepo root, root `.gitignore`, baseline commit of the existing Hero **on `main`**, then the phase branch (repo is currently NOT a git repo).
- Hero→token extraction (`index.css`): colors, radii (0), borders, mono eyebrow/label type scale, spacing rhythm, focus ring, selection color. Add Geist Mono (Hero already uses `font-mono`).
- Shared primitives: `Section` (id, eyebrow, heading, container), `Container`, `Eyebrow`, `ActionLink` (the Hero CTA language as `buttonVariants` variants `hero`/`ghost-hero`), `Reveal` (reduced-motion-safe), `DotGrid` (CSS halftone surface), `GlowCard` (pointer-reactive border glow via CSS vars), `SkipLink`.
- Minimal a11y/robustness fixes to the Hero wrapper only (documented deviations in `docs/HeroAudit.md`): `id="inicio"`, landmark label, pause control (WCAG 2.2.2), fallback colors from preset, root bg from preset void color.
- Tooling: Vitest + Testing Library + jsdom, Playwright + `@axe-core/playwright`, coverage config, root scripts, CI workflow (typecheck/lint/test/build).

**Exclusions:** Navigation, routing, any real section content, project data, GitHub integration, backend, restyling the Hero's look.

**Dependencies:** none (starts from current Hero).

**Required Reading:** `CLAUDE.md`, `Rules.md`, `docs/HeroAudit.md`, `docs/UI.md`, `docs/Architecture.md`, `docs/FolderStructure.md`, `docs/CodingStandards.md`, `docs/Testing.md`, `docs/Accessibility.md`, `docs/DevelopmentWorkflow.md`, `DefinitionOfDone.md`.

**Required Skills:** `frontend-design-direction`, `coding-standards`, `tdd-workflow`, `search-first`, `react-patterns`, `verification-loop`
**Required Agents:** `architect`, `planner`, `typescript-reviewer`, `a11y-architect`, `build-error-resolver` (+ always: `code-reviewer`, `security-reviewer`)
**Required Commands:** `plan`, `checkpoint`, `quality-gate`, `update-docs`
**Required Rules:** `common/coding-style`, `common/git-workflow`, `common/development-workflow`, `common/testing`, `typescript/coding-style`, `typescript/testing`, `react/coding-style`, `react/patterns`, `web/coding-style`, `web/design-quality`, `web/patterns`
**Optional Resources:** skills `motion-ui`, `make-interfaces-feel-better`; hook `PostToolUse:post:edit:design-quality-check`
**External Tools:** Chrome (claude-in-chrome) for before/after Hero screenshots at 375/768/1440; Playwright; `npx shadcn@latest` for primitives; WebFetch for Tailwind v4 / shadcn docs when needed.

**Implementation Tasks:** see `Tasks.md` P1-T01…P1-T18.

**Acceptance Criteria**
1. `git log` shows ≥15 commits on the branch; `main` contains only the baseline commit until merge.
2. `grep -rn "#3ff2e0\|#e4fffb\|#02060a" client/src --include=*.tsx` returns only `halftone-nebula.tsx` presets and the token definitions (Hero uses tokens).
3. Hero before/after screenshots at 375/768/1440 are visually identical except documented deviations (mono font, pause control).
4. Hero has `id="inicio"`, an accessible name that is not the nebula description, and a working pause/play control (keyboard-operable).
5. `npm run typecheck && lint && test && build` pass in `client/`; CI workflow green locally via `act`-free dry run of the same commands.
6. Coverage ≥80% on non-WebGL source; `halftone-nebula.tsx` excluded with a justification comment.
7. Primitives have unit tests and render in a throwaway `/__kit` dev route that is removed (or dev-only) before merge.

**Validation:** typecheck, lint, vitest, build, Playwright smoke (Hero renders, no console errors, axe 0 serious/critical on `/`), visual diff of Hero, bundle size recorded in `Progress.md` (baseline 274 KB raw / 86 KB gzip JS).
**Documentation Updates:** `Progress.md`, `.claude/New_files.md`, `docs/HeroAudit.md` (deviations), `docs/UI.md` (final token names), `docs/FolderStructure.md` (if changed), `README.md`.
**Expected Files:** root `.gitignore`, `.github/workflows/ci.yml`; `client/src/index.css` (mod), `client/index.html` (mod), `client/src/components/layout/{Section,Container,SkipLink}.tsx`, `client/src/components/ui/{eyebrow,action-link,dot-grid,glow-card,reveal}.tsx`, `client/src/hooks/{use-reduced-motion,use-in-view}.ts`, `client/src/sections/hero/HeroSection.tsx` (mod), `client/src/components/ui/halftone-nebula.tsx` (minimal mod, documented), `client/vitest.config.ts`, `client/playwright.config.ts`, `client/tests/**`.
**Commit Requirements:** ≥15; one logical unit each (see Tasks). No commit on `main` after baseline.

---

## Phase 2 — Navigation, About & Professional Identity

**Branch:** `phase/02-identity`

**Objective:** Introduce routing and navigation, and the sections that say who the owner is and what they use.

**Scope**
- `react-router` setup (`/`, `/proyectos` stub, `/proyectos/:slug` stub, 404), scroll-to-hash handling, layout shell with `<header>`, `<main id="contenido">`, `<footer>` placeholder.
- Top navigation (desktop bar + mobile disclosure menu, keyboard/Escape/focus management, appears after Hero on `/`).
- `#sobre-mi` About section (2–3 sentence intro, three focus pillars: software/web, cybersecurity, AI-assisted development (honest working method, wording approved by the owner; no certifications, no solo-authorship claims — ADR-008); fact list from typed content file).
- `#tecnologias` Technologies section: grouped list (languages, frontend, backend/tooling, security, AI) with level-free text; data in `client/src/data/technologies.ts` (stable `TechId`s reused by projects).
- `client/src/data/profile.ts` (typed, single source for name, role, links, placeholders flagged), seeded from `docs/ProfileData.md` (verified GitHub/LinkedIn/email; items marked ⚠ confirm stay placeholders until the owner decides).
- Hero reads from `profile.ts` (copy only; no visual change). The Hero already contains the real owner-confirmed copy; move it verbatim.
- Professional links component (GitHub, LinkedIn, email, CV) reused later in Contact/Footer.

**Exclusions:** Real project data, project cards, contact section, CV file, SEO metadata beyond title, backend.

**Dependencies:** Phase 1 merged (tokens, primitives, test infra).

**Required Reading:** `CLAUDE.md`, `Rules.md`, `docs/UI.md`, `docs/HeroAudit.md`, `docs/ProfileData.md`, `docs/ContentStrategy.md`, `docs/Accessibility.md`, `docs/Architecture.md`, `docs/FolderStructure.md`, `docs/CodingStandards.md`, `docs/Testing.md`, `DefinitionOfDone.md`.

**Required Skills:** `frontend-design-direction`, `frontend-patterns`, `react-patterns`, `make-interfaces-feel-better`, `motion-ui`, `tdd-workflow`, `react-testing`
**Required Agents:** `react-reviewer`, `typescript-reviewer`, `a11y-architect` (+ always reviewers)
**Required Commands:** `feature-dev`, `react-review`, `react-test`, `quality-gate`
**Required Rules:** `common/coding-style`, `common/git-workflow`, `common/testing`, `typescript/coding-style`, `react/coding-style`, `react/patterns`, `react/testing`, `web/design-quality`, `web/patterns`, `web/coding-style`
**Optional Resources:** skill `brand-voice` (only if user supplies writing samples); hook `PostToolUse:post:edit:design-quality-check`
**External Tools:** Chrome for keyboard/focus walkthrough and responsive checks; Playwright; `ui-ux-pro-max` skill for nav/layout ideas **only** as inspiration (Hero tokens override).

**Implementation Tasks:** `Tasks.md` P2-T01…P2-T17.

**Acceptance Criteria**
1. Nav reachable by keyboard only; skip-link works; mobile menu traps/restores focus and closes on Escape and route change.
2. On `/`, nav hidden while Hero is ≥50% visible, visible after; always visible on other routes.
3. `#sobre-mi` and `#tecnologias` render from typed data; zero hard-coded copy in components.
4. No invented facts: every missing item renders an explicit, grep-able placeholder (`[[PLACEHOLDER: …]]`) listed in `docs/ContentStrategy.md`.
5. Hero CTAs `#proyectos` / `#contacto` scroll to existing anchors (empty placeholder sections allowed until Phase 3/5, but anchors exist).
6. axe: 0 serious/critical on `/`; reduced-motion disables reveals.
7. ≥80% coverage on new non-visual code.

**Validation:** typecheck, lint, vitest, build, Playwright (nav keyboard, hash scroll, mobile 375, axe), manual Chrome review at 375/768/1024/1440/1920.
**Documentation Updates:** `Progress.md`, `.claude/New_files.md`, `docs/ContentStrategy.md` (placeholder registry), `docs/UI.md` (nav/section patterns), `docs/Architecture.md` (routing).
**Expected Files:** `client/src/app/{router.tsx,Layout.tsx}`, `client/src/components/layout/{SiteHeader,MobileMenu,SiteFooter}.tsx`, `client/src/sections/about/*`, `client/src/sections/technologies/*`, `client/src/data/{profile,technologies}.ts`, `client/src/components/ui/social-links.tsx`, `client/src/pages/{HomePage,NotFoundPage}.tsx`, tests.
**Commit Requirements:** ≥15.

---

## Phase 3 — Projects Showcase & GitHub

**Branch:** `phase/03-projects`

**Objective:** The centerpiece: a typed project model, featured projects on Home, and the complete index at `/proyectos`, with GitHub links.

**Scope**
- `Project` type + runtime validation (see `docs/ProjectShowcase.md`), `client/src/data/projects.ts`, helper selectors (`getFeatured`, `getBySlug`, `filterProjects`).
- Seed data: the selection fixed in `docs/ProfileData.md §7` (5 featured, index set, security-notes entry; Italian_restaurant and Land_Rover excluded); anything still unconfirmed is `placeholder: true`. No live URLs exist yet (none invented).
- `ProjectCard` (featured large variant + compact index variant), `GlowCard` pointer glow, status/category badges, repo + live links with proper `rel`/labels.
- Home `#proyectos`: featured (ordered) + "Ver todos" link.
- `/proyectos`: full index, category + technology filters (URL search-param state, no-JS-hidden content, count, empty state), keyboard accessible; search box only if >12 projects (YAGNI).
- GitHub: profile link + per-project repo links; "More on GitHub" card. No API calls.
- Tech→projects cross links feeding `#tecnologias` evidence counts.

**Exclusions:** Detail pages content (stub route stays), screenshots/media pipeline, GitHub API/stars/sync script, backend, contact.

**Dependencies:** Phase 2 (router, `technologies.ts`, `profile.ts`).

**Required Reading:** `CLAUDE.md`, `Rules.md`, `docs/ProfileData.md`, `docs/ProjectShowcase.md`, `docs/ContentStrategy.md`, `docs/UI.md`, `docs/Architecture.md`, `docs/Accessibility.md`, `docs/Testing.md`, `docs/Decisions.md` (ADR-003), `DefinitionOfDone.md`.

**Required Skills:** `frontend-patterns`, `react-patterns`, `react-testing`, `tdd-workflow`, `make-interfaces-feel-better`, `frontend-design-direction`
**Required Agents:** `tdd-guide`, `react-reviewer`, `type-design-analyzer`, `typescript-reviewer`, `a11y-architect` (+ always reviewers)
**Required Commands:** `feature-dev`, `react-test`, `test-coverage`, `quality-gate`
**Required Rules:** `common/coding-style`, `common/git-workflow`, `common/testing`, `typescript/coding-style`, `typescript/patterns`, `typescript/testing`, `react/patterns`, `react/testing`, `web/design-quality`, `web/patterns`
**Optional Resources:** skill `github-ops` (only to read the user's repo list for content gathering, via `gh`); hook `PostToolUse:post:edit:design-quality-check`
**External Tools:** public GitHub REST API via `curl` (read-only; `gh` is not installed) to refresh repo metadata for curation; Chrome for visual/keyboard review; Playwright.

**Implementation Tasks:** `Tasks.md` P3-T01…P3-T18.

**Acceptance Criteria**
1. Adding a project requires editing only `projects.ts` (+ assets); a test proves a fixture project renders in card, index, filter and detail-route lookup.
2. Schema test fails on: duplicate slug, unknown `TechId`, non-https URL, featured order collision, missing alt text for media.
3. Featured shows ≤5 projects in explicit order; index shows all non-archived by default, archived behind a toggle.
4. Filters are URL-addressable (`/proyectos?categoria=seguridad&tec=typescript`), restore on reload, announce result count to screen readers (`aria-live=polite`).
5. External links: `target="_blank"` only with `rel="noopener noreferrer"` and visible/aria "(abre en nueva pestaña)".
6. No fabricated metrics anywhere; placeholders flagged.
7. Cards keep reading contrast ≥4.5:1; pointer glow is decorative and absent under reduced motion/touch.
8. ≥80% coverage on data/filter logic; Playwright covers filter + keyboard.

**Validation:** typecheck, lint, vitest (schema + filters), build, Playwright (home featured, index filters, URL state, axe), Chrome visual review.
**Documentation Updates:** `Progress.md`, `.claude/New_files.md`, `docs/ProjectShowcase.md` (final schema), `docs/ContentStrategy.md` (placeholder registry).
**Expected Files:** `client/src/data/{projects.ts,project.schema.ts}`, `client/src/lib/projects.ts`, `client/src/components/projects/{ProjectCard,FeaturedProjects,ProjectFilters,ProjectGrid,Badge}.tsx`, `client/src/pages/ProjectsPage.tsx`, `client/src/sections/projects/*`, tests.
**Commit Requirements:** ≥15.

---

## Phase 4 — Project Details & Case Studies

**Branch:** `phase/04-project-details`

**Objective:** One data-driven detail page per project that answers the six recruiter questions (what/why/what I built/stack/decisions/where's the code), richer for 2–3 flagship case studies.

**Scope**
- `/proyectos/:slug` page: header (title, status, year, role, links), problem/purpose, highlights, technical decisions, security notes, stack with links back to filtered index, media gallery, prev/next project, 404 for unknown slug.
- Media pipeline: images in `client/public/projects/<slug>/` (or `src/assets` with Vite imports), required `alt`, explicit width/height, `loading="lazy"`, responsive `srcset` (AVIF/WebP + fallback) — no media = graceful text-only layout.
- Accessible lightbox/gallery (keyboard, focus trap, Escape) only if ≥2 screenshots exist; otherwise static figures.
- Optional architecture diagram as inline SVG/Mermaid-to-SVG pre-rendered (no runtime diagram lib).
- Per-page `document.title` + meta (final SEO in Phase 6).
- Content for flagship case studies supplied by the user (never invented).

**Exclusions:** CMS/markdown pipeline (typed TS fields suffice; revisit only if narratives exceed ~400 words each), comments, analytics, contact.

**Dependencies:** Phase 3 (project model, cards, router).

**Required Reading:** `CLAUDE.md`, `Rules.md`, `docs/ProfileData.md`, `docs/ProjectShowcase.md`, `docs/ContentStrategy.md`, `docs/UI.md`, `docs/Accessibility.md`, `docs/Performance.md`, `docs/Testing.md`, `DefinitionOfDone.md`.

**Required Skills:** `react-patterns`, `frontend-patterns`, `react-performance`, `e2e-testing`, `motion-ui`, `tdd-workflow`
**Required Agents:** `react-reviewer`, `e2e-runner`, `performance-optimizer`, `a11y-architect`, `typescript-reviewer` (+ always reviewers)
**Required Commands:** `feature-dev`, `react-test`, `test-coverage`, `quality-gate`
**Required Rules:** `common/coding-style`, `common/git-workflow`, `common/testing`, `common/performance`, `react/patterns`, `react/testing`, `web/design-quality`, `web/performance`, `web/patterns`
**Optional Resources:** skill `content-engine` (structure case-study copy from user notes), `ui-demo` (record demo GIF/video of a project if user has none); hook `PostToolUse:post:edit:design-quality-check`
**External Tools:** Chrome for screenshots of the user's live projects; `sharp`/`squoosh-cli` for image optimization (dev-time only); Playwright.

**Implementation Tasks:** `Tasks.md` P4-T01…P4-T16.

**Acceptance Criteria**
1. Every slug in `projects.ts` renders a valid page; unknown slug → in-theme 404 with link to index.
2. Page renders correctly with **only** required fields (text-only) and with all optional fields.
3. All images have alt, intrinsic size (CLS < 0.05), lazy-loaded below the fold; no image >200 KB without justification.
4. Gallery/lightbox fully keyboard operable, focus restored on close, `prefers-reduced-motion` respected.
5. Heading hierarchy valid (one `h1`), axe 0 serious/critical on 3 sample detail pages.
6. Browser back/forward and deep links work; prev/next ordering deterministic.
7. ≥80% coverage on new logic; Playwright covers deep link + gallery.

**Validation:** typecheck, lint, vitest, build, Playwright (deep links, gallery keyboard, axe), Lighthouse on `/proyectos/<slug>` (perf ≥90 desktop), Chrome review.
**Documentation Updates:** `Progress.md`, `.claude/New_files.md`, `docs/ProjectShowcase.md`, `docs/Performance.md` (media rules actually adopted).
**Expected Files:** `client/src/pages/ProjectDetailPage.tsx`, `client/src/components/projects/{ProjectHeader,ProjectSection,Gallery,Lightbox,ProjectNav,TechList}.tsx`, `client/public/projects/**`, `client/src/lib/media.ts`, tests.
**Commit Requirements:** ≥15.

---

## Phase 5 — Contact, Resume & Professional Conversion

**Branch:** `phase/05-contact`

**Objective:** A clear, low-friction way to reach the owner, view the CV and find professional profiles — without a backend.

**Scope**
- `#contacto` section: short availability statement, email (`mailto:` + "copiar" button with live-region feedback; address obfuscated at build to reduce trivial scraping), GitHub, LinkedIn, CV download.
- CV: `client/public/cv/<file>.pdf` (supplied by user), link with file size/format hint; fallback text if missing (placeholder flagged, build gate in Phase 6).
- Site footer (links, year, "built with" line, back-to-top), CTA flow (Hero → Projects → Contact; detail pages end with contact CTA).
- In-theme 404 finalised.
- Decision checkpoint: re-confirm "no form" (ADR-004). If the user now wants a form, STOP and open a new ADR before touching `/server`.
- Optional: closing "sky" visual for Contact using CSS only (dot-grid + glow). A second WebGL canvas requires an ADR-005 amendment with measured cost.

**Exclusions:** Contact form, server endpoints, email service, analytics, newsletter, blog.

**Dependencies:** Phase 2 (links component), Phase 3/4 (CTA placement).

**Required Reading:** `CLAUDE.md`, `Rules.md`, `docs/ProfileData.md`, `docs/ContentStrategy.md`, `docs/Security.md`, `docs/Accessibility.md`, `docs/UI.md`, `docs/Decisions.md` (ADR-004, ADR-005), `DefinitionOfDone.md`.

**Required Skills:** `security-review`, `react-testing`, `e2e-testing`, `tdd-workflow`, `frontend-design-direction`, `make-interfaces-feel-better`
**Required Agents:** `a11y-architect`, `typescript-reviewer`, `silent-failure-hunter`, `e2e-runner` (+ always: `security-reviewer`, `code-reviewer`)
**Required Commands:** `security-scan`, `test-coverage`, `quality-gate`, `feature-dev`
**Required Rules:** `common/coding-style`, `common/git-workflow`, `common/security`, `common/testing`, `web/security`, `react/security`, `typescript/security`, `web/design-quality`, `web/patterns`
**Optional Resources:** skill `backend-patterns` (only if ADR-004 is reopened); hook `PostToolUse:post:edit:design-quality-check`
**External Tools:** Chrome (copy-to-clipboard, mailto behavior, PDF download); Playwright.

**Implementation Tasks:** `Tasks.md` P5-T01…P5-T16.

**Acceptance Criteria**
1. All contact paths work with keyboard and screen reader; copy button announces success/failure; `mailto:` works without JS.
2. CV link downloads/opens a PDF (or shows flagged placeholder in dev); file name stable.
3. External links safe (`rel`), labeled; no tracking scripts added.
4. Footer present on every route; back-to-top is a real anchor/button, not scroll-jacking.
5. `security-scan` + security-reviewer report no CRITICAL/HIGH; no secrets in repo/history.
6. ≥80% coverage on new logic; Playwright covers contact flow.

**Validation:** typecheck, lint, vitest, build, Playwright, axe, `/security-scan`, secret grep (`docs/Security.md`).
**Documentation Updates:** `Progress.md`, `.claude/New_files.md`, `docs/Security.md`, `docs/ContentStrategy.md`.
**Expected Files:** `client/src/sections/contact/*`, `client/src/components/layout/SiteFooter.tsx` (mod), `client/src/components/ui/copy-button.tsx`, `client/src/lib/email.ts`, `client/public/cv/*`, `client/src/pages/NotFoundPage.tsx` (mod), tests.
**Commit Requirements:** ≥15.

---

## Phase 6 — Polish, Accessibility, Performance, SEO & Production

**Branch:** `phase/06-polish-production`

**Objective:** Make it production-grade and ship it.

**Scope**
- Responsive pass at 320/375/768/1024/1440/1920/2560; landscape phones; short viewports (Hero `100svh`).
- Accessibility audit (WCAG 2.2 AA): keyboard, focus order, contrast incl. Hero text, touch targets ≥24px (prefer 44), motion, forced-colors, zoom 200%/400%.
- Performance: Lighthouse budgets, code-split routes (`React.lazy`), lazy-load WebGL chunk, DPR cap review, offscreen pause verified, font subsetting/preload, image audit, bundle analysis.
- SEO: unique title/description per route, canonical, Open Graph/Twitter image, `sitemap.xml`, `robots.txt`, JSON-LD `Person` + `CreativeWork`/`SoftwareSourceCode` where honest, `lang="es"`, build-time prerender of `/`, `/proyectos`, `/proyectos/:slug`, SPA fallback config for chosen host.
- Security: headers (CSP without `unsafe-eval`, `Referrer-Policy`, `X-Content-Type-Options`, `Permissions-Policy`) via host config, dependency audit, secret scan.
- Content integrity gate: script fails the production build while any `[[PLACEHOLDER` / `placeholder: true` remains.
- Deploy: host chosen by user, CI deploy, custom domain/HTTPS, post-deploy smoke test. `server/` remains untouched unless ADR-004 reopened.
- Final docs sweep; `README.md` rewrite; tag `v1.0.0`.

**Exclusions:** New sections/features, redesigns, backend, analytics (unless the user asks, then privacy-first and documented).

**Dependencies:** Phases 1–5 merged.

**Required Reading:** `CLAUDE.md`, `Rules.md`, `docs/Accessibility.md`, `docs/Performance.md`, `docs/SEO.md`, `docs/Security.md`, `docs/Testing.md`, `docs/Decisions.md` (ADR-005, ADR-006), `DefinitionOfDone.md`.

**Required Skills:** `seo`, `react-performance`, `e2e-testing`, `security-review`, `security-scan`, `production-audit`, `deployment-patterns`, `verification-loop`
**Required Agents:** `seo-specialist`, `performance-optimizer`, `a11y-architect`, `e2e-runner`, `refactor-cleaner`, `doc-updater`, `build-error-resolver` (+ always reviewers)
**Required Commands:** `quality-gate`, `test-coverage`, `refactor-clean`, `update-docs`, `update-codemaps`, `security-scan`, `build-fix`
**Required Rules:** `common/coding-style`, `common/git-workflow`, `common/performance`, `common/security`, `common/testing`, `web/performance`, `web/security`, `web/testing`, `web/patterns`
**Optional Resources:** skill `strategic-compact`; skill `docker-patterns` only if the chosen host needs a container
**External Tools:** Lighthouse CLI, Chrome DevTools via claude-in-chrome (performance trace, throttling, emulation), Playwright + axe, WebPageTest/PageSpeed Insights (public URL), `npm audit`, social-card validators (manual).

**Implementation Tasks:** `Tasks.md` P6-T01…P6-T20.

**Acceptance Criteria**
1. Lighthouse (mobile emulation, prod build): Performance ≥85 (WebGL Hero considered), Accessibility 100, Best Practices ≥95, SEO 100. Desktop Performance ≥95.
2. LCP ≤2.5 s, CLS ≤0.05, INP ≤200 ms on mid-tier mobile emulation (4× CPU, Fast 4G).
3. Initial JS ≤200 KB gzip (current 86 KB); route chunks lazy; WebGL code not in the non-Hero route chunks.
4. axe 0 violations on all route types at 3 breakpoints; manual keyboard + screen-reader (NVDA) pass recorded in `Progress.md`.
5. View-source of each route contains real content, title, description, canonical, OG tags, JSON-LD.
6. Security headers present on the deployed URL; `npm audit --omit=dev` has no high/critical; no secrets.
7. Placeholder gate passes; every link in the built site returns 200 (link-check).
8. `Progress.md` lists final validation evidence; tree clean; `v1.0.0` tag on `main`.

**Validation:** full suite + Lighthouse + axe + Playwright cross-browser (Chromium, Firefox, WebKit) + link-check + deploy smoke test.
**Documentation Updates:** all docs reviewed; `Progress.md` final; `README.md`; `docs/Decisions.md` (ADR-006 outcome).
**Expected Files:** `client/scripts/{prerender,check-placeholders,check-links}.mjs`, `client/public/{robots.txt,sitemap.xml,og.png}`, host config (`_headers`/`vercel.json`/workflow — per chosen host), `client/src/lib/seo.ts`, tests, docs.
**Commit Requirements:** ≥15.

---

## 4. Change control

Changing scope, phase order, or an ADR requires: edit this file + `docs/Decisions.md` + `.claude/phase-plan.json` + `Progress.md` note, in one commit (`docs: …`). Never silently drift.
