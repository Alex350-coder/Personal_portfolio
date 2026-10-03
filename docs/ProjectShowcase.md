# ProjectShowcase.md — Project system

## Strategy
Projects are the centerpiece. Two tiers share one data model:
- **Featured** (3–5, ordered): large cards on Home `#proyectos`; flagship ones have full case studies.
- **Complete collection**: `/proyectos` index of all public projects (compact cards, filters). Not every repo gets equal weight; archived/minor ones are present but de-emphasized (toggle).
Each project has a detail page `/proyectos/:slug` generated from data; sections render only if their fields exist (text-only is valid).

## GitHub strategy (ADR-003)
Local typed data + direct links. Per project: `links.repo` (required, https GitHub URL) and optional `links.live`. Profile link in Home/Contact/Footer. **No runtime GitHub API** (rate limits, stale/empty metadata, extra failure modes, no recruiter value in star counts). Technology tags are curated by hand, not inferred from `languages`. Optional future: a manual helper using the public GitHub API (`curl`; `gh` is not installed) to *assist* authoring `projects.ts`; output is reviewed by a human, never auto-published.

## Schema (final target; implemented P3 + P4)
```ts
type Category = "web" | "software" | "ia" | "seguridad" | "herramientas"
type Status = "activo" | "completado" | "en-desarrollo" | "archivado"
type Media = { src: string; alt: string; width: number; height: number }

type Project = {
  slug: string                    // kebab-case, unique, URL id (replaces separate `id`)
  title: string
  summary: string                 // ≤160 chars, card + meta description
  category: Category
  status: Status
  year: number
  role?: string                   // omit if unknown — never invent
  stack: TechId[]                 // ids from technologies.ts (validated)
  featured?: number               // order 1..5; absent = not featured
  links: { repo: string; live?: string }   // https only
  cover?: Media
  media?: Media[]                 // screenshots; alt required by type
  problem: string                 // what/why (card "problem line" + case study)
  highlights?: string[]           // 3–5 concrete technical highlights
  decisions?: { title: string; body: string }[]
  security?: string[]             // only true, relevant notes
  placeholder?: true              // blocks production build
}
```
Dropped from the original idea list (no real value / duplicated): separate `id` (slug is the id), `description` + `shortDescription` (→ `summary` + `problem`), `image`+`screenshots` (→ `cover` + `media`). `caseStudy` flag is implicit (rich fields present).

## Validation (tests, Phase 3)
Unique slug; kebab-case; `stack` ids exist; URLs `https:`; `featured` unique 1..5; `summary` ≤160; media has non-empty `alt`; `year` plausible; `placeholder` projects excluded from sitemap/JSON-LD.

## Presentation
- Card (compact): title, summary, category + status badges, stack chips (max 4 + "+n"), repo link, live link. Entire card is one focusable link target to the detail page with separate secondary links (no nested interactive confusion: use stretched-link pattern).
- Card (featured): + cover, problem line.
- Index: filters category/tech/status via URL params, count live region, empty state, archived toggle. Search only if >12 projects.
- Detail: header → problem → highlights → decisions → security notes → stack → media → prev/next → contact CTA.

## Inventory (filled in P3-T01)
| slug | title | repo | featured | status | notes |
|---|---|---|---|---|---|
| attack-surface-studio | Attack Surface Studio | Alex350-coder/Attack-surface-studio | 1 | TBC | |
| saas-pensiones | Pensiones — Restaurant Meal-Plan SaaS | Alex350-coder/SaaS-pensiones | 2 | TBC | ~96 % backend coverage (owner-confirmed) |
| threat-intelligence-dashboard | Threat Intelligence Dashboard | Alex350-coder/Threat_Intelligence_Dashboard | 3 | TBC | |
| health-his | Hospital Information System (HIS) | Alex350-coder/Health_HIS | 4 | en-desarrollo? | Rust/Tauri |
| electroshop-microservicios | ElectroShop (microservicios) | Alex350-coder/Ecomerce-microservicios | 5 | TBC | simulated payment |
| rutex-transportes, cinemax, academy-app, erd-studio, atelier-construct, personal-tasks | — | see ProfileData §4B | — | TBC | index only |
| esports-betting-exchange | Esports Betting Exchange (simulated money) | Alex350-coder/Dota_2_gambling | — | en-desarrollo | index only, neutral framing, no betting imagery |
| security-notes | Write-ups y notas de seguridad | WritteUps + notes repos | — | activo | single collection entry |
| _excluded_ | Italian_restaurant, Land_Rover…, .github, Alex350-coder | — | — | — | owner decision 2026-10-03 |
