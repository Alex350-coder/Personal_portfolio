# DevelopmentWorkflow.md

Extends ECC `common/git-workflow`, `common/development-workflow`.

## Session start
1. `git status` clean; on the right `phase/NN-*` branch.
2. `/clear` → `/ecc-load-phase phase-N` (activates only that phase's skills/agents/rules/commands; always-active: `code-reviewer`, `security-reviewer`, `always__track-new-files`).
3. Read: `CLAUDE.md`, `Rules.md`, then the phase's Required Reading in `Plan.md`, then the next unticked task in `Tasks.md`.

## Per task loop
Plan (use `planner` for non-trivial) → RED test (logic) → implement → refactor → `npm run typecheck && npm run lint && npm test` → browser check for UI → commit (1 task = 1 commit) → tick `Tasks.md`.

## Commits
Conventional Commits: `<type>(<scope>): <summary>`; types `feat fix refactor docs test chore perf ci`; scope `client|server` optional. Body explains why + any new dependency justification. Footer attribution lines per the session instructions. ≥15 per phase; each commit passes typecheck/build; docs updated in the same commit that invalidates them.

## Branches
```text
main                      baseline + --no-ff merges of finished phases (tag v1.0.0 at the end)
phase/01-foundation
phase/02-identity
phase/03-projects
phase/04-project-details
phase/05-contact
phase/06-polish-production
```
Create each phase branch from the latest `main` (after the previous merge). Merge: `git switch main && git merge --no-ff phase/NN-… -m "merge: phase N <name>"`. No force-push; no rewriting merged history. Remote hosting (GitHub) is set up when the user provides the repo; pushing is a user decision.

## Phase close checklist
`DefinitionOfDone.md` → code-reviewer over `.claude/New_files.md` entries of the phase (+ modified) → security-reviewer if relevant → update `Progress.md` (phase log, validation evidence, issues) → `git status` clean → merge.

## Context hygiene
Use `/clear` between phases and after large refactors; `strategic-compact` skill only if a phase runs long. Don't re-read docs not listed in the phase's Required Reading.

## Review focus
Reviewers read files listed under the current `# Phase N` heading of `.claude/New_files.md` first; modified files via `git diff main...HEAD --stat`.

## Browser validation
Chrome MCP (claude-in-chrome) for visual/responsive/keyboard/perf traces; Playwright for repeatable e2e. Prefer a dev-server URL `http://localhost:5173`; production checks use `npm run build && npm run preview`.
