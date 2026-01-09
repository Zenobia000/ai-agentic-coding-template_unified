---
name: "Resume"
description: "Resume context from Memory Bank active state"
phase: "any"
prerequisites: ["memory-bank exists", "activeContext.md has content"]
creates: ["context restoration"]
tools:
  cursor:
    trigger: "/resume"
    description: "Resume from previous session"
  claude-code:
    trigger: ["ai resume", "/resume", "continue", "where were we"]
    description: "Resume previous context"
  gemini-cli:
    trigger: "gemini resume"
    description: "Resume context"
---

# Resume - Context Restoration

## Objective
Restore AI context from Memory Bank to continue work seamlessly across sessions.

## Process

### 1. Load Memory Bank State
Read and analyze:
- `activeContext.md` - Current focus and phase
- `tasks.md` - Task list and status
- `progress.md` - Implementation status
- `projectbrief.md` - Project context

### 2. Context Summary
Generate restoration summary:

```markdown
## Session Restoration

### Current Phase
[Phase name from activeContext.md]

### Active Focus
[Current task/epic being worked on]

### Progress Summary
- Completed: [list]
- In Progress: [list]
- Blocked: [list]

### Last Session Notes
[Any notes from activeContext.md]

### Recommended Next Action
[Based on context analysis]
```

### 3. Restore Working State
- Load relevant code context
- Identify files being worked on
- Note any open questions or decisions

### 4. Suggest Continuation
Based on state analysis:
- If in `/implement`: Continue implementation
- If in `/creative`: Resume design discussion
- If blocked: Address blockers first
- If task complete: Suggest `/reflect` or next task

## Context Files to Read

| File | Purpose |
|------|---------|
| `activeContext.md` | Current focus, phase, decisions |
| `tasks.md` | Task hierarchy and status |
| `progress.md` | Implementation details, blockers |
| `projectbrief.md` | Project goals and constraints |
| `techContext.md` | Technology stack reference |

## Restoration Checklist
- [ ] Memory Bank files read successfully
- [ ] Current phase identified
- [ ] Active task identified
- [ ] Progress state understood
- [ ] Blockers noted
- [ ] Next action recommended

## State Recovery Scenarios

### Normal Resume
- Context intact
- Continue where left off
- No special action needed

### Incomplete Phase
- Previous phase not finished
- List remaining items
- Offer to complete or skip

### Stale Context
- Context older than expected
- Verify still relevant
- Update if needed

### Missing Files
- Some Memory Bank files missing
- Recommend `/van` to repair
- Preserve what exists

## Output Format

```markdown
## Context Restored

**Project**: [name]
**Phase**: [current phase]
**Focus**: [active task]

### Where We Left Off
[Summary of last session state]

### Current Status
- [Status item 1]
- [Status item 2]

### Recommended Next Steps
1. [Action 1]
2. [Action 2]

Ready to continue. What would you like to focus on?
```

## Tool-Specific Usage

### Cursor
```
/resume
```

### Claude Code
```
Resume from where we left off
```
or
```
Continue the previous session
```

### Gemini CLI
```
gemini resume
```
