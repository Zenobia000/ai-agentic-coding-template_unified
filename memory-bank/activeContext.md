# Active Context

## Current Phase
**SYSTEM-REFACTOR** - Refactoring Git Workflow Commands

## Current Focus
- Redefining the Git workflow commands to suit a startup environment (Git Flow Lite).
- Implementing a 3-step workflow: Start -> Commit -> PR.
- Creating/updating command definitions: `start`, `commit`, `pr`.

## Recent Changes
- Decided to split `github` command into more specific actions.
- Decided to enforce strict "Local Only" for `commit` command.
- Decided to add a `start` command for branch management.

## Active Decisions
- Use "Git Flow Lite": `main` (prod), `develop` (dev), `feat/*`, `hotfix/*`.
- `commit` command MUST NOT push to remote.
- `pr` command handles sync and push.

## Session Notes
- User requested a clearer distinction between local commits and remote pushes to avoid accidental pushes by LLMs.
- Implementing a safer, more structured workflow.

---

**Next Action:** Create and update command definition files.
**Last updated:** 2026-01-12
