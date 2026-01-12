# Active Context

## Current Phase
**SYSTEM-REFACTOR** - Git Workflow Commands Refactoring Complete

## Current Focus
- Completed refactoring of Git workflow commands to suit a startup environment (Git Flow Lite).
- Implemented 3-step workflow: `start` -> `commit` -> `pr`.
- Updated documentation and synced commands across editor environments.
- Removed legacy `github` command.

## Recent Changes
- Updated `.ai/commands/system/` with `start.md`, `commit.md`, and `pr.md`.
- Updated `docs/workflow/git-workflow.md` to align with new command names.
- Modified `scripts/sync-commands.sh` to remove legacy command preservation.
- Synchronized commands to `.cursor`, `.claude`, and `.gemini`.

## Active Decisions
- Use "Git Flow Lite": `main` (prod), `develop` (dev), `feat/*`, `hotfix/*`.
- `commit` command MUST NOT push to remote.
- `pr` command handles sync and push.

## Session Notes
- Successfully transitioned to a safer, more structured workflow.
- Verified all command definitions and synchronization scripts.

---

**Next Action:** Create and update command definition files.
**Last updated:** 2026-01-12
