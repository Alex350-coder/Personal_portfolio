# ProfileData.md — Verified source data about the owner

> **2026-10-03: the owner resolved every ⚠ item — see §7 (authoritative). Where §1–§6 conflict with §7, §7 wins.**

Collected 2026-10-02 from public sources only: the GitHub profile page, the public GitHub REST API (`api.github.com`, unauthenticated) and each repository's README. Nothing here is invented. Items marked **⚠ confirm** need the owner's decision before they go into `client/src/data/*`. This file feeds `profile.ts`, `technologies.ts` and `projects.ts` (Phases 2–3). The `gh` CLI is **not installed** on this machine; the public API via `curl` is enough.

## 1. Identity
| Field | Value | Source | Status |
|---|---|---|---|
| GitHub | https://github.com/Alex350-coder (created 2024-07-04, 23 public repos, 19 stars total) | profile/API | verified |
| Display name | **Ander Alexander Aguirre T.** (trailing space in API field) | GitHub `name` | ⚠ confirm exact public form (full surname? LinkedIn slug `AnderAguirreTejada` suggests "Tejada" — inference, do not publish without confirmation) |
| Location | Lima, Perú | GitHub | verified; ⚠ confirm showing city publicly |
| LinkedIn | https://linkedin.com/in/AnderAguirreTejada | profile README | verified |
| Email | anderaguirre787@gmail.com | profile README (public) | ⚠ confirm this is the address to publish (it differs from the Claude account email) |
| Website / company / X | none set | GitHub | — |
| CV | not found | — | **missing** |
| Photo | not used (Hero has none) | — | ⚠ decide |

## 2. Headline & bio (two versions exist — choose one)
- GitHub bio (EN): "Full-stack developer with a security-first mindset | Preparing for eJPTv2 & Security+ | NestJS, Spring Boot, React, Nmap, Burp Suite"
- Profile README (EN): "Backend Developer | Security Red team Specialist"
- Current Hero placeholder (ES): "Desarrollador de software · Ciberseguridad" (focus areas: Software, Web, Inteligencia artificial, Ciberseguridad).

**Content-integrity notes (Rules §6):**
1. "Preparing for eJPTv2 & Security+" means *studying*, **not certified**. Publish only as "preparándome para…" or omit. Never list as certifications.
2. "Security Red team Specialist" is a strong claim; the evidence available is lab write-ups, tool cheat-sheets and security-focused projects. ⚠ confirm wording (suggested neutral: "Desarrollador full-stack con enfoque en seguridad ofensiva/defensiva").
3. "Backend Developer" vs "Full-stack": projects show both; suggested: **Desarrollador full-stack con mentalidad security-first**.
4. AI is a stated site focus but no AI project exists in the repos → either drop "Inteligencia artificial" as a pillar, or state it honestly (e.g. use of AI-assisted tooling, and `Attack-surface-studio` mentions an "asistente de IA"). ⚠ decide.
5. Some READMEs disclose AI assistance (`Italian_restaurant`: built with opencode.ai; `Health_HIS` governed by a Claude-based doc framework). Case studies must describe the owner's role truthfully and consistently with those READMEs.

## 3. Technologies (from profile README badges + repo READMEs)
- **Languages:** TypeScript, JavaScript, Java, Python, Rust, C#, PowerShell, Bash (C# and PowerShell appear only as badges; no repo evidence → ⚠ confirm before showing as "used in projects").
- **Frontend:** React (18/19), Next.js, Vite, Tailwind CSS (v4), shadcn/ui, TanStack Query, Zustand, React Hook Form + Zod, React Flow, Three.js, GSAP ScrollTrigger.
- **Backend:** NestJS, Spring Boot (Java 21), Express.js, Django + DRF, Node.js, Socket.IO, BullMQ, Drizzle ORM, Prisma, TypeORM, Tauri 2 (Rust).
- **Databases:** PostgreSQL, MySQL, MongoDB (badge only), SQLite/SQLCipher, Redis.
- **DevOps/Quality:** Docker / Docker Compose, GitHub Actions CI, Nginx, Vitest, Playwright, Supertest, Vercel (badge).
- **Security tools:** Nmap, Burp Suite, ffuf, Gobuster, SQLmap, Nuclei (+ notes repos).
- **Design tools (badge):** Photoshop, Canva. **Data:** Pandas (badge only → ⚠ confirm).
- **Certification targets (not achieved):** eJPTv2, CompTIA Security+.
- GitHub achievements shown: Pull Shark ×2, Pair Extraordinaire, YOLO (not worth showing).

## 4. Repository inventory (23 public; all original, none fork/archived; none has a live URL, topics, or GitHub description except where shown)
Repos are well documented (screenshots, architecture, security notes) but **GitHub "About" descriptions and topics are empty** on nearly all → recommended owner action: add a one-line description + topics (helps recruiters and SEO).

### A. Strong candidates for Featured / case studies
| Slug (proposed) | Repo | Stack | What it is (from README) | Pushed |
|---|---|---|---|---|
| `attack-surface-studio` | Attack-surface-studio | Next.js 16, React 19, NestJS, Drizzle, BullMQ/Redis, PostgreSQL 16, Argon2id, Vitest/Playwright | Knowledge-graph platform for recon/attack-surface assessment: orchestrates Nmap/ffuf/Nuclei, normalizes output to nodes/edges/metadata; scope validation (`403 SCOPE_VIOLATION`); docker/local execution. Pinned. | 2026-09-29 |
| `saas-pensiones` | SaaS-pensiones | NestJS (hexagonal modular monolith, 8 bounded contexts), React+Vite+Tailwind+shadcn, Prisma+PostgreSQL 16, Socket.IO | Restaurant meal-plan subscriptions SaaS; JWT rotating refresh w/ family revocation, RBAC, httpOnly cookie + CSRF double-submit, realtime chat. README claims ~96 % backend coverage + Playwright E2E (**verify before quoting**). Pinned. | 2026-09-28 |
| `threat-intelligence-dashboard` | Threat_Intelligence_Dashboard | React+TS+Vite+Tailwind, Node/TS API, shared workspace | IOC (IP/domain/URL/hash) lookups aggregated from AbuseIPDB + VirusTotal; provider abstraction, graceful degradation, security hardening. Explicit "portfolio project". | 2026-09-29 |
| `health-his` | Health_HIS | Tauri 2, React 18+TS, Rust, SQLite+SQLCipher | Offline-first desktop Hospital Information System MVP (auth gate, patients, history, beds, OR scheduling, inventory, simulated billing, discharge). The only Rust project. | 2026-09-14 |
| `electroshop-microservicios` | Ecomerce-microservicios | React 19+Vite 7+TS, NestJS 11, TypeORM, MySQL 8.4, Docker Compose, GitHub Actions | ElectroShop e-commerce on microservices (gateway :8000 → auth/user/product/cart/order/inventory/payment); simulated payment. | 2026-09-28 |

### B. Solid secondary (index, compact cards)
| Slug | Repo | Stack | Summary | Notes |
|---|---|---|---|---|
| `rutex-transportes` | TransportApp | React 19, Django 5.2, TypeScript 6, CI, MIT | Seat booking + parcel shipping with public tracking. Pinned. Only repo with a LICENSE (MIT) + CI badge | |
| `cinemax` | Cinema | NestJS + React monorepo | Cinema ticket booking: seat selection, snacks, payment, admin panel. Pinned | |
| `academy-app` | AcademyApp | Java 21, Spring Boot 3.4, Spring Security JWT, React | Multi-tenant, multi-role academic SaaS; README documents a security audit/hardening and known limitations. Pinned | |
| `erd-studio` | Conceptual-logic-diagram-generator | TypeScript, Playwright visual regression | Chen-notation ER diagram editor with automatic logical-model transformation, multi-diagram autosave, undo/redo | |
| `italian-restaurant` | Italian_restaurant | React 18, Three.js, Express, Socket.IO, PostgreSQL, Redis, Docker, Nginx | Restaurant MVP with 3D home, real-time orders, reservations. README: not production, Stripe not wired, built with opencode.ai | disclosure |
| `esports-betting-exchange` | Dota_2_gambling | TypeScript (ledger, state machines, concurrency tests) | P2P matched betting exchange with **simulated money**; double-entry ledger, partial matching; "in development" | ⚠ topic sensitivity: gambling theme on a recruiter-facing site. Suggest: include only if framed as a financial-systems-engineering exercise, or leave it in the index only. Owner decides. |
| `land-rover-scroll` | Land_Rover-Scroll_Animation_Visual_Project | GSAP ScrollTrigger, canvas 300-frame sequence | Cinematic scroll animation (EN/ES README); not affiliated with JLR | ⚠ trademark: name/images of a real brand — confirm assets are fine to show |
| `atelier-construct` | Visual_Porject-Construccion | Next.js, React 19, Tailwind v4, GSAP, Sharp | Scroll-driven construction-company landing, 240-frame canvas, reduced-motion support | |
| `personal-tasks` | Personal_tasks_web | Django+DRF+SQLite, React+Vite | Daily/mid/long-term tasks with streak heatmap | personal tool; low weight |

### C. Security notes collection (one entry, not many cards)
| Repo | Content |
|---|---|
| `WritteUps` | ~29 lab write-ups (DockerLabs / TheHackLabs: Apolo, Canary, Debugme, HackZone, WarGames, WhereIsMyWebShell, injection, Vulnerame …). Description: "Un grupo de WirtteUps de todos los laboratorios de practica que he resuelto". Pinned. ⚠ Check each write-up is OK to publish (labs normally allow it; no real targets). |
| `SQLmap`, `Ffuz`, `Gobuster-Notes`, `Burp-Suite-Notes`, `Nmap-CheatSheet` | Cheat-sheets / quick-start notes ("información para un inicio rápido y fuerte con SQLmap", "Ffuz usefull comands") |
| `Scripts` | Shell; contains `Reconocimiento_rapido` (quick recon script) |
Presentation: a "Seguridad ofensiva: write-ups y notas" card/section linking to `WritteUps` + a short list of the notes repos. This supports the cybersecurity pillar with real evidence.

### D. Not for the portfolio
`.github`, `Alex350-coder` (profile README repo).

## 5. Proposed positioning (for owner approval)
Pillars grounded in evidence: **(1) Desarrollo full-stack** (NestJS, Spring Boot, React/Next, Django); **(2) Seguridad** (secure-by-design apps: RBAC, JWT rotation, CSRF, Argon2id, scope validation; offensive lab practice; recon tooling); **(3) Arquitectura y calidad** (hexagonal/modular monolith, microservices, TDD/E2E, CI). Pillar "IA" currently has no direct evidence (see §2.4).
Suggested **Featured (≤5)**: `attack-surface-studio`, `saas-pensiones`, `threat-intelligence-dashboard`, `health-his`, `electroshop-microservicios` — chosen for depth, security relevance and stack variety (TS full-stack, Rust desktop, microservices). `rutex-transportes`, `cinemax`, `academy-app` are next in line.

## 6. Gaps and recommended owner actions
1. Confirm name form, email, location, headline (§1–2).
2. Provide CV (or confirm none for now).
3. No live demos exist → featured cards show repo + screenshots only; consider deploying 1–2 (Vercel) — optional, never faked.
4. Add GitHub descriptions + topics to the featured repos; ensure README screenshots exist at stable paths (they do) so Phase 4 can reuse or copy them.
5. Decide on `Dota_2_gambling`, `Land_Rover…` (§4B notes).
6. Missing personal facts not available anywhere: education, work experience, availability. Do not invent; omit those sections unless provided.

## 7. Owner decisions (2026-10-03) — AUTHORITATIVE
| # | Topic | Decision |
|---|---|---|
| 1 | Name | **Ander Alexander Aguirre Tejada** ("T." = Tejada). Public form used everywhere. |
| 2 | Email / city / LinkedIn / GitHub | Confirmed as found: `anderaguirre787@gmail.com`, Lima (Perú), `linkedin.com/in/AnderAguirreTejada`, `github.com/Alex350-coder`. |
| 3 | Headline | **"Desarrollador full-stack · Seguridad"**. Drop "Backend Developer" / "Red Team Specialist" wording. |
| 4 | Short bio (ES, used in Hero) | "Desarrollo aplicaciones web full-stack con enfoque en seguridad. Aquí reúno mis proyectos, con el código disponible en GitHub." Short and plain by owner's request; the longer About text (Phase 2) must stay in this tone. |
| 5 | Certifications | **Not published** (eJPTv2 and Security+ are not obtained; mentioning preparation is unnecessary). Do not mention them anywhere, including About, JSON-LD, SEO. |
| 6 | AI pillar | No AI-engineering projects exist. The fourth Hero tag is now **"Desarrollo asistido por IA"** (truthful working method) instead of "Inteligencia artificial". |
| 7 | AI-assisted development | Owner states many systems were built **with AI assistance**. Policy: the site is transparent about it and never claims solo/manual authorship. The wording of a short "how I work" statement is **drafted in Phase 2 and approved by the owner** (do not invent claims about what the owner did vs. the AI). Case studies (Phase 4) describe the owner's role only with facts the owner supplies. |
| 8 | `SaaS-pensiones` coverage | "~96 % backend coverage" **confirmed** by owner; may be cited as "~96 % de cobertura en backend". |
| 9 | `Italian_restaurant` | **Excluded** from the site (stale, not touched in a long time, README admits unfinished). |
| 10 | `Land_Rover-Scroll_Animation_Visual_Project` | **Excluded** (third-party brand). |
| 11 | `Dota_2_gambling` | Owner delegated. Decision: **index only, never featured**, framed neutrally as "exchange P2P con dinero simulado: ledger de partida doble, matching parcial, pruebas de concurrencia"; status `en-desarrollo`; no betting imagery as cover. Revisit/omit at any time (one data entry). |
| 12 | Still missing | CV (none yet), live demos (none exist), hosting + domain, education/experience (not provided → omit). |

### Final project selection (feeds Phase 3 seed)
- **Featured (order):** 1 `attack-surface-studio`, 2 `saas-pensiones`, 3 `threat-intelligence-dashboard`, 4 `health-his`, 5 `electroshop-microservicios`.
- **Index (compact):** `rutex-transportes`, `cinemax`, `academy-app`, `erd-studio`, `atelier-construct`, `personal-tasks`, `esports-betting-exchange` (see #11).
- **Security notes entry:** `WritteUps` write-ups + `SQLmap`, `Ffuz`, `Gobuster-Notes`, `Burp-Suite-Notes`, `Nmap-CheatSheet`, `Scripts`.
- **Excluded:** `Italian_restaurant`, `Land_Rover-Scroll_Animation_Visual_Project`, `.github`, `Alex350-coder`.
Per-project status (`activo`/`completado`/`en-desarrollo`) still needs the owner's one-line confirmation in P3-T01; use `en-desarrollo` only where the README says so.

### Done in the repo
Hero copy filled with the confirmed identity (`client/src/sections/hero/HeroSection.tsx`, constants `PROFILE` and `FOCUS_AREAS`; no visual/structural change). It moves to `data/profile.ts` in P2-T03/P2-T04.
