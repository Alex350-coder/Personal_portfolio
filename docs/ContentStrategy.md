# ContentStrategy.md

## Principles (from research + project rules)
- Recruiters want fast answers to: what can you build, what did *you* contribute, how do you solve problems, can you explain technical work plainly. Lead with evidence: 3–5 strong projects with repo + (if any) live link beat many shallow ones.
- About = 2–3 sentences: who, focus, what is being sought. Skills = grouped list with context (which projects used it), **no progress bars or percentages**.
- Case studies for the top 2–3 projects: problem → approach → technical challenge → outcome → what I'd do differently. Plain language first, depth after.
- **Never invent** credentials, employment, clients, certifications, metrics, users, performance gains. If unknown → placeholder.
- Tone: concise, technical, first person singular, no hype. UI copy in Spanish.

## Content map
| Area | Source file | Notes |
|---|---|---|
| Name, role, summary, availability, links | `data/profile.ts` | Hero + About + Contact + Footer + SEO read this |
| Focus pillars (software/web, cybersecurity, AI) | `data/profile.ts` | 1–2 honest sentences each |
| Technologies | `data/technologies.ts` | grouped; each links to projects that use it |
| Projects | `data/projects.ts` | schema in `docs/ProjectShowcase.md` |
| CV | `public/cv/<name>.pdf` | user-supplied |

## Placeholder convention
Missing data is written as `[[PLACEHOLDER: <what is needed>]]` (strings) or `placeholder: true` (projects). Find all: `grep -rn "\[\[PLACEHOLDER" client/src` and `grep -rn "placeholder: true" client/src/data`. The Phase 6 gate fails the production build while any remain. The Hero has **no placeholders** since 2026-10-03 (real copy in `HeroSection.tsx`, to move to `profile.ts` in P2-T04). Extra rules from ADR-008: never mention certifications; never claim solo/manual authorship.

## Known content (verified)
See `docs/ProfileData.md` for GitHub/LinkedIn/email, stack, and the inventory of 23 repos with proposed featured set. It is the source for `profile.ts`, `technologies.ts`, `projects.ts`.

## Missing content (still needed from the owner)
Resolved 2026-10-03: name, headline, bio, email/city/LinkedIn/GitHub, certifications (not published), AI pillar, featured set, repo exclusions — see `docs/ProfileData.md §7`.
| # | Item | Needed by |
|---|---|---|
| 1 | Approve the short "how I work with AI assistance" statement drafted in Phase 2 | P2 |
| 2 | Longer About text (optional; default = 2–3 plain sentences consistent with the Hero bio) | P2 |
| 3 | Technology list: which badge-only items (C#, PowerShell, MongoDB, Pandas) to show — default: only technologies evidenced in repos | P2 |
| 4 | Per-project status (activo / completado / en-desarrollo) and one-line problem for non-featured projects | P3 |
| 5 | Flagship case-study facts: role, decisions, challenges (only owner-supplied) | P4 |
| 6 | CV PDF (none exists; publish or skip the CV link) | P5 |
| 7 | Hosting choice + domain | P6 (earlier preferred) |
| 8 | OG/social image preference | P6 |

## Registry of placeholders in the repo
_(maintained by P2-T14; empty until Phase 2 introduces data files)_
