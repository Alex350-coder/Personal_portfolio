# SEO.md

Extends skill `seo` / agent `seo-specialist` (Phase 6). Research finding: a client-only SPA ships an empty `<div id="root">`, which hurts crawlers, social previews and LLM bots; build-time prerender of the few public routes is the proportionate fix (ADR-006).

## Baseline
`client/index.html`: `lang="es"`, title "Portafolio | Software, Web, IA y Ciberseguridad", viewport, favicon. No description, canonical, OG, sitemap, robots, structured data.

## Targets (Phase 6; interim title hook in P4)
- **Per route** unique `<title>` (≤60 chars) and meta description (≤155): `/` (name + role + focus), `/proyectos`, `/proyectos/:slug` (project title + one-line summary + stack). Canonical absolute URL, `og:title/description/type/url/image/locale=es_ES`, `twitter:card=summary_large_image`.
- **Prerender** `/`, `/proyectos`, every `/proyectos/:slug` to real HTML at build (technique decided in P6-T09: evaluate a Vite SSG plugin vs. a small Playwright/`react-dom/server` script; choose the one with least moving parts and hydration safety — Hero must be client-only).
- **Crawl files:** `robots.txt` (allow all + sitemap), `sitemap.xml` generated from `projects.ts`, 404 page `noindex`.
- **Structured data (JSON-LD):** `Person` (name, jobTitle, url, `sameAs` = GitHub/LinkedIn) on `/`; `SoftwareSourceCode`/`CreativeWork` on detail pages **only with true fields** (no ratings, no fabricated metrics).
- **Semantic HTML:** one `h1`, descriptive headings, meaningful link text, image alt, `lang`.
- **Social card:** 1200×630 `og.png` in Hero style (static render of the nebula + name) — generated from a screenshot, ≤200 KB.
- **Performance/CWV** are ranking inputs → `docs/Performance.md`.
- **Hosting:** HTTPS, www/non-www redirect, SPA fallback only for non-prerendered paths, correct 404 status if host supports it.
- **Content:** honest, concise; no keyword stuffing; project pages are the long-tail assets.

## Validation
View-source on built output per route; Lighthouse SEO 100; Rich Results/Schema validator; social debuggers (manual); sitemap URLs return 200 (link-check).
