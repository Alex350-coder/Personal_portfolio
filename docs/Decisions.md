# Decisions.md — Architecture Decision Records

Format: Context → Decision → Consequences → Status. Changing an ADR needs a new entry that supersedes it.

## ADR-001 — Hero palette becomes the token system; dark-only
**Context:** Hero colors are hard-coded hex; shadcn tokens are default neutral light/dark. **Decision:** define `void/haze/dusk/deep/teal/accent/star` tokens from preset `abyssal` and map shadcn semantic tokens to them; ship dark-only (`html.dark` already forced). **Consequences:** one source of truth; light theme/toggle out of scope; WebGL presets keep their own hex (shader input). **Status:** Accepted (implemented P1).

## ADR-002 — Routing with `react-router`; case studies are routes
**Context:** Projects need shareable, SEO-able URLs; a long scroll with inline case studies buries Contact. **Decision:** `/`, `/proyectos`, `/proyectos/:slug`, `*`; home sections are anchors; detail pages are data-driven. **Consequences:** needs SPA fallback/prerender (ADR-006); hash+focus handling in Layout. **Alternatives rejected:** modal case studies (no URLs), single page only (no SEO per project). **Status:** Accepted.

## ADR-003 — Local typed project data; no GitHub API
**Context:** GitHub metadata is noisy and not what recruiters value; runtime fetch adds failure modes. **Decision:** `client/src/data/*.ts` + schema tests; GitHub linked by URL. **Consequences:** adding a project = editing data (+ assets); manual curation; optional authoring helper later. **Status:** Accepted.

## ADR-004 — Backend deferred
**Context:** `/server` exists but empty; nothing requires it. **Decision:** deferred; contact via `mailto:` + copy + links; no form; no analytics. **Consequences:** no secrets/rate-limits/hosting for an API; if a form becomes required, write a new ADR and prefer a third-party form endpoint over a custom server. `server/` remains typechecked in CI. **Status:** Accepted; re-confirmed at P5-T01.

## ADR-005 — WebGL only in the Hero
**Context:** a second GL context hurts mobile battery/GPU memory; CSS can carry the identity. **Decision:** Hero is the only WebGL; derivatives = `DotGrid`, `GlowCard`, `Reveal`, glyphs. Amend only with measured cost. **Status:** Accepted.

## ADR-006 — Prerender public routes at build time
**Context:** CSR SPA ships empty HTML (research: crawlers/social previews/LLM bots). **Decision:** prerender `/`, `/proyectos`, `/proyectos/:slug`; technique chosen in P6-T09 (Vite SSG plugin vs small script). Hero stays client-only. **Consequences:** build gets a prerender step and a hydration-safety test. **Status:** Accepted in principle; technique pending.

## ADR-007 — Documentation language and layout
Docs/code/commits in English; UI copy Spanish. Core six docs at repo root, supporting docs in `docs/`, ECC artifacts in `.claude/`. **Status:** Accepted.

## ADR-008 — Content and positioning decisions (2026-10-03)
**Context:** owner reviewed `docs/ProfileData.md`. **Decision:** full table in `docs/ProfileData.md §7`. Summary: name *Ander Alexander Aguirre Tejada*; headline "Desarrollador full-stack · Seguridad"; short plain bio; **no certifications published**; fourth focus tag = "Desarrollo asistido por IA" (honest about AI-assisted development; no claim of solo authorship); SaaS-pensiones "~96 % cobertura backend" citable; `Italian_restaurant` and `Land_Rover…` excluded; `Dota_2_gambling` index-only with neutral simulated-money framing; featured set fixed (5). **Consequences:** content integrity now also means "never mention certifications" and "never claim solo/manual authorship"; Phase 2 drafts a "how I work with AI" statement for owner approval; Phase 4 case-study roles only from owner-supplied facts. **Status:** Accepted.

## Open decisions (need user)
Hosting provider/domain; CV (none yet — publish or not); contact form (default: no); formatter (default: none beyond oxlint); per-project status confirmation (P3-T01); wording of the AI-assisted "how I work" statement (P2).
