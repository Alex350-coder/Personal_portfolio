# MASTER PLANNING PROMPT

## Personal Developer Portfolio — Architecture, Documentation and Phased Development Plan

You are the lead software architect and technical planning agent for this repository.

The repository already contains a completed and functional **Hero Section based on the `HalftoneNebula` WebGL component**.

Your task now is NOT to redesign the Hero.

Your task is to analyze the existing implementation and create the complete planning and documentation required to finish the personal developer portfolio around that already-established Hero.

The entire portfolio must feel like one coherent product.

---

# 1. PRIMARY PROJECT PRINCIPLE

The existing Hero Section is the **visual and conceptual source of truth for the entire portfolio**.

This is the most important rule of the project.

Everything developed after this point must be compatible with and derived from the Hero.

This includes:

* color palette
* typography
* spacing
* borders
* gradients
* visual density
* animation language
* interaction patterns
* hover behavior
* transitions
* background treatment
* visual hierarchy
* component shapes
* lighting
* glow effects
* atmospheric effects
* motion
* responsive behavior
* accessibility behavior
* overall visual identity

Do NOT treat the Hero as an isolated landing-page experiment.

The rest of the website must look as if it was designed by the same system.

If a design decision conflicts with the Hero, the Hero's established visual language takes precedence unless there is a strong usability, accessibility, performance, or technical reason to deviate.

Document every intentional deviation.

---

# 2. CURRENT STATE

Before planning anything, inspect the entire repository.

The Hero has already been implemented.

Locate and analyze:

* `HalftoneNebula`
* `HeroSection`
* Tailwind configuration
* global CSS
* theme variables
* fonts
* layout
* component structure
* `client/`
* `server/`
* package configuration
* TypeScript configuration
* shadcn configuration
* existing scripts
* existing documentation
* existing ECC resources
* existing agents
* existing skills
* existing commands
* existing rules
* existing hooks or automation
* existing CI/CD configuration

Do not assume the repository structure.

Inspect the actual project first.

---

# 3. HERO DESIGN AUDIT

Perform a formal audit of the existing Hero.

Document:

### Visual language

* primary colors
* secondary colors
* accent colors
* background colors
* contrast relationships
* typography characteristics
* border treatment
* shadows
* glow
* gradients
* texture
* visual density

### Motion language

Analyze:

* WebGL animation
* pointer interaction
* parallax
* sparkles
* ripples
* planet movement
* idle movement
* reduced-motion behavior
* hover behavior
* transition timing

### Interaction language

Determine which interaction patterns can be reused elsewhere.

Examples:

* pointer-reactive backgrounds
* subtle parallax
* halftone effects
* pixel-grid effects
* glow responses
* animated gradients
* atmospheric particles
* reveal animations
* subtle cursor responses

The portfolio should reuse these principles where appropriate.

Do NOT duplicate animations blindly.

Use them where they improve the section and remain performant.

---

# 4. PORTFOLIO GOAL

The website is a personal developer portfolio.

Its primary purpose is to communicate:

* who I am
* what I build
* what technologies I use
* what projects I have built
* how I approach technical problems
* where my code can be inspected
* how I can be contacted
* where to find my professional profiles

The portfolio should prioritize **real projects and technical evidence** over decorative content.

The Projects section is one of the most important parts of the entire site.

---

# 5. RESEARCH REQUIREMENT

Research current developer portfolio conventions before finalizing the architecture.

Investigate:

* common portfolio information architecture
* project showcase patterns
* project case-study patterns
* GitHub project presentation
* developer portfolio UX
* recruiter-oriented information hierarchy
* responsive portfolio design
* accessibility expectations
* performance expectations for animation-heavy sites
* SEO fundamentals
* project filtering/search patterns when appropriate

Prefer reliable and current sources.

The research should inform the design, but it must NOT override the existing Hero's visual identity.

The goal is:

> established portfolio UX patterns + the existing Hero's visual identity.

Do not copy another portfolio.

---

# 6. RECOMMENDED INFORMATION ARCHITECTURE

Evaluate and document an appropriate structure.

The initial target should be a focused portfolio rather than a complex application.

A likely structure is:

```text
Hero
↓
About / Professional Identity
↓
Selected Projects
↓
Skills / Technologies
↓
Project Details / Case Studies
↓
Contact / Professional Links
↓
Footer
```

You may modify this sequence if research and the existing Hero justify a better structure.

Do not create unnecessary sections simply because they are common.

Every section must have a clear purpose.

---

# 7. PROJECT SHOWCASE STRATEGY

Projects are the centerpiece of the portfolio.

Design a system capable of presenting:

* project title
* short description
* problem/purpose
* technologies
* project category
* project status
* repository URL
* live/demo URL when available
* screenshots or visual evidence when available
* technical highlights
* notable decisions
* relevant security/development information
* detailed project page when useful

The project system must support both:

### Featured projects

A small number of carefully selected projects prominently displayed on the homepage.

### Complete project collection

A broader project index containing the user's other public projects.

Do not assume that every GitHub repository should receive equal visual weight.

The system should support prioritization without hiding the existence of the larger body of work.

---

# 8. GITHUB STRATEGY

GitHub must be treated as an important part of the portfolio ecosystem.

Research and design how the portfolio should connect to GitHub.

Consider:

* direct repository links
* live demo links
* project metadata
* technology tags
* GitHub profile link
* featured repositories
* repository status
* project details
* synchronization strategy

Do NOT automatically build a complex GitHub API integration unless it provides meaningful value.

Determine whether project data should initially be:

* local typed data
* generated content
* static configuration
* GitHub API data

Prefer the simplest reliable architecture.

Do not introduce unnecessary backend complexity merely to fetch public GitHub information.

---

# 9. PERSONAL INFORMATION

The portfolio should have dedicated space for:

* professional introduction
* development focus
* cybersecurity focus
* AI/software development interests
* technical skills
* professional links
* GitHub
* LinkedIn
* email/contact
* CV/resume

Do not invent credentials, employment, achievements, clients, certifications, metrics, or experience.

Where information is missing, create explicit content placeholders and document them.

---

# 10. BACKEND SCOPE

The project already contains:

```text
/client
/server
```

Do not create backend functionality simply because a `/server` directory exists.

Determine whether the final portfolio genuinely needs backend functionality.

Potential backend responsibilities may include:

* contact form processing
* future project content management
* analytics integration
* API endpoints

But do NOT assume these are required.

If the portfolio can remain primarily static, prefer that architecture.

The backend should only be developed where it provides clear value.

---

# 11. DOCUMENTATION SYSTEM

Create the project's planning/documentation system.

At minimum, evaluate and create the following documents:

```text
CLAUDE.md
Plan.md
Tasks.md
Rules.md
DefinitionOfDone.md
Progress.md
Architecture.md
FolderStructure.md
UI.md
CodingStandards.md
Testing.md
Security.md
Performance.md
Accessibility.md
SEO.md
ContentStrategy.md
ProjectShowcase.md
DevelopmentWorkflow.md
New_files.md
phase-plan.json
```

Create additional documents only when they provide meaningful long-term value.

For example, create an ADR/decision document when an architectural decision is important enough to preserve.

Do NOT create empty documentation files just to increase document count.

Every document must have a clear purpose.

---

# 12. CLAUDE.md

`CLAUDE.md` is the primary operational context for Claude Code.

It must contain concise, high-value instructions including:

* project purpose
* current architecture
* technology stack
* Hero as visual source of truth
* critical project rules
* documentation hierarchy
* development workflow
* phase workflow
* validation requirements
* branch requirements
* commit requirements
* ECC resource usage requirements
* where authoritative information lives

Do not turn `CLAUDE.md` into a giant duplicate of every other document.

It should tell the agent where to find detailed information.

---

# 13. DOCUMENT HIERARCHY

Establish the following hierarchy:

```text
CLAUDE.md
    ↓
Rules.md
    ↓
Plan.md
    ↓
Required Reading for current phase
    ↓
Tasks.md
    ↓
DefinitionOfDone.md
    ↓
Implementation
```

Interpretation:

* `CLAUDE.md` = global operational context
* `Rules.md` = non-negotiable project rules
* `Plan.md` = source of truth for project direction and phases
* `Tasks.md` = execution guide
* phase Required Reading = only documents necessary for that phase
* `DefinitionOfDone.md` = completion criteria
* `Progress.md` = current state
* `New_files.md` = phase file tracking

---

# 14. ECC RESOURCES

The repository contains an ECC-style resource system.

Before planning phases, inspect the actual installed:

```text
skills/
agents/
rules/
commands/
```

and any related configuration or resource indexes.

Do not invent resource names.

Determine:

* available skills
* available agents
* available commands
* available rules
* their purpose
* their dependencies
* their physical paths
* which ones are relevant to each phase

Use the existing project resource system as the source of truth.

---

# 15. PHASE RESOURCE MAPPING

Every phase in `Plan.md` must explicitly define:

```text
Required Reading
Required Skills
Required Agents
Required Commands
Required Rules
Optional Resources
External Tools
```

Only list resources that are relevant to that phase.

Do NOT use wildcard statements such as:

```text
load all skills
load all agents
load everything
```

The resource selection must be intentional.

If the project has an ECC resource planner/loader system, integrate with it rather than bypassing it.

---

# 16. RESOURCE EFFICIENCY

The development agents must use the available resources intelligently.

Prefer:

* existing skills
* existing agents
* existing commands
* existing project utilities
* existing design resources
* existing automation
* external tools when they genuinely improve the result

Do not manually reproduce work that an installed skill, command, agent, or tool can perform more reliably.

The goal is to reduce unnecessary token usage and improve execution quality.

External tools may be used for:

* design exploration
* visual references
* asset generation
* research
* testing
* browser validation
* screenshots
* performance inspection

But external tools are subordinate to the project's documented rules and architecture.

---

# 17. PHASE COUNT

Use the minimum number of phases that can cleanly complete the project.

Target approximately **6 phases**.

Do not create unnecessary phases.

Recommended structure:

## Phase 1 — Foundation & Design System

Documentation, architecture, Hero audit, design tokens, shared components, layout foundation.

## Phase 2 — Navigation, About & Professional Identity

Navigation, About, profile information, skills, professional links.

## Phase 3 — Projects Showcase & GitHub

Project data model, featured projects, complete project index, project cards, filters/categories if justified, GitHub links.

## Phase 4 — Project Details & Case Studies

Project detail views, technical narratives, screenshots/media, architecture/technology presentation.

## Phase 5 — Contact, Resume & Professional Conversion

Contact section, professional links, CV/resume, CTA flow, footer.

## Phase 6 — Polish, Accessibility, Performance, SEO & Production

Responsive refinement, accessibility, performance, animation optimization, SEO, metadata, testing and production readiness.

You may merge or adjust phases if the repository analysis demonstrates that fewer phases are cleaner.

---

# 18. PHASE REQUIREMENTS

Every phase must include:

### Objective

What the phase accomplishes.

### Scope

What is included.

### Explicit exclusions

What must NOT be implemented.

### Dependencies

What previous phases must already provide.

### Required Reading

Exact documentation files to read.

### Required ECC Resources

Exact:

* skills
* agents
* commands
* rules

### External tools

Only tools that genuinely provide value.

### Implementation tasks

Detailed but actionable tasks.

### Acceptance criteria

Measurable conditions.

### Validation

Tests, lint, typecheck, build, browser checks, accessibility checks, performance checks, etc.

### Documentation updates

Which documents must be updated.

### Files

Expected files to create/modify.

### Git

Branch and commit requirements.

---

# 19. COMMIT REQUIREMENT

Every development phase MUST contain at least:

**15 meaningful commits.**

Do not create meaningless commits merely to reach the number.

Commits should represent logical units such as:

* scaffolding
* configuration
* dependencies
* components
* sections
* data structures
* styling
* interactions
* tests
* accessibility
* documentation
* fixes
* refactoring
* validation

Each phase MUST use a separate branch.

Example:

```text
main
│
├── phase/01-foundation
├── phase/02-identity
├── phase/03-projects
├── phase/04-project-details
├── phase/05-contact
└── phase/06-polish-production
```

Do not work directly on `main`.

---

# 20. QUALITY GATES

Every phase must finish with:

* TypeScript validation
* lint
* build
* relevant tests
* browser validation where applicable
* responsive validation where applicable
* accessibility validation where applicable
* performance validation where applicable
* security validation where applicable
* documentation update
* `Progress.md` update
* `New_files.md` update
* commit verification
* clean working tree unless explicitly documented otherwise

A phase is NOT complete merely because the UI visually works.

---

# 21. VISUAL CONSISTENCY RULE

This rule is mandatory:

> Every new visual element must look like it belongs to the same universe as the Hero.

Before implementing any new section, inspect the Hero and answer:

1. What colors does it use?
2. What typography does it use?
3. What spacing language does it use?
4. What border language does it use?
5. What animation language does it use?
6. What level of visual density does it use?
7. How does it react to the pointer?
8. How does it behave under reduced motion?
9. What visual effects can be reused?
10. What should NOT be copied because it would harm usability or performance?

The agent must make deliberate decisions rather than blindly duplicating the Hero.

---

# 22. ANIMATION POLICY

Animations are encouraged only when they support the Hero's visual language.

Possible techniques include:

* WebGL atmospheric backgrounds
* halftone effects
* particles
* subtle parallax
* pixel-grid transitions
* glow effects
* pointer-reactive lighting
* animated borders
* reveal animations

However:

* no animation for decoration alone
* no excessive motion
* no competing animation systems
* no performance-heavy effects without justification
* reduced motion must be respected

If the Hero background can be reused safely in another section, document whether it should be reused or whether a lighter derivative should be created.

---

# 23. RESPONSIVE AND ACCESSIBILITY REQUIREMENTS

The portfolio must work across:

* mobile
* tablet
* laptop
* desktop
* large desktop displays

Accessibility must include:

* semantic HTML
* keyboard navigation
* visible focus states
* appropriate contrast
* meaningful labels
* reduced motion support
* accessible links/buttons
* no interaction dependent exclusively on pointer movement

Do not allow visual effects to interfere with content readability.

---

# 24. PERFORMANCE REQUIREMENTS

Because the Hero uses WebGL, performance must be treated as a first-class concern.

Do not add heavy animation systems unnecessarily.

Evaluate:

* device pixel ratio
* animation frame rate
* background rendering
* lazy loading
* component rendering
* image sizes
* asset loading
* JavaScript bundle size
* mobile performance
* reduced-motion behavior
* offscreen animation

Prefer CSS/HTML techniques over JavaScript/WebGL when an effect can be achieved equally well with less cost.

---

# 25. CONTENT STRATEGY

The portfolio content should be concise and technically credible.

Projects should communicate:

```text
What is it?
Why does it exist?
What did I build?
What technologies were used?
What technical problem was interesting?
What decisions mattered?
Where can the code be inspected?
Is there a live demo?
```

Do not fabricate metrics.

Do not invent users, clients, revenue, performance improvements, or production usage.

---

# 26. PROJECT DATA ARCHITECTURE

Plan a typed project representation.

Evaluate fields such as:

```text
id
slug
title
shortDescription
description
category
status
technologies
featured
githubUrl
liveUrl
image
screenshots
highlights
technicalDecisions
role
year
```

Do not implement every field automatically.

Only retain fields that provide real value.

The data model should make adding future projects easy without modifying presentation components.

---

# 27. ROUTING

Determine whether project detail pages should use routing.

For a small portfolio, avoid unnecessary complexity.

A possible structure is:

```text
/
/projects
/projects/:slug
```

But determine the final structure based on the existing frontend architecture and project scope.

---

# 28. BACKEND DECISION

Explicitly decide whether the backend is:

* required
* optional
* deferred

Document the reasoning.

Do not create an artificial backend just to demonstrate backend technology.

---

# 29. FILE TRACKING

`New_files.md` must track files created or substantially introduced during each phase.

Organize entries by phase.

Review agents should primarily review newly registered files rather than repeatedly reviewing unchanged files.

---

# 30. PLAN.MD REQUIREMENT

`Plan.md` must become the project's source of truth.

For every phase include:

```text
Phase
Objective
Scope
Exclusions
Dependencies
Required Reading
Required Skills
Required Agents
Required Commands
Required Rules
Optional Resources
External Tools
Implementation Tasks
Acceptance Criteria
Validation
Documentation Updates
Expected Files
Commit Requirements
Branch
```

Do not leave resource selection implicit.

---

# 31. TASKS.MD REQUIREMENT

`Tasks.md` must convert the plan into executable tasks.

Tasks should be:

* ordered
* testable
* phase-specific
* independently understandable
* linked to acceptance criteria

Avoid vague tasks such as:

```text
Improve UI
Make portfolio better
Optimize design
```

Prefer concrete tasks.

---

# 32. DEFINITION OF DONE

`DefinitionOfDone.md` must define project-wide completion criteria.

Include:

* functionality
* visual consistency
* responsiveness
* accessibility
* performance
* security
* testing
* documentation
* Git quality
* content integrity
* production readiness

---

# 33. PROGRESS

`Progress.md` must track:

* current phase
* completed work
* validation
* known issues
* decisions
* next phase
* blocked items

Keep it current throughout development.

---

# 34. FINAL PLANNING OUTPUT

Before writing documentation, inspect the repository and available ECC resources.

Then create/update the planning documentation.

At the end provide a concise planning report containing:

1. Current architecture.
2. Hero analysis.
3. Final information architecture.
4. Final phase list.
5. Documentation created.
6. ECC resources mapped per phase.
7. Backend decision.
8. Project presentation strategy.
9. Git workflow.
10. Validation strategy.
11. Open questions or missing content that must be supplied later.

Do not implement the remaining portfolio sections during this planning task.

The planning task ends after the documentation and phase plan are complete.
