---
name: "Task Next"
description: "PM assistant - analyze tasks and suggest next priority"
phase: "planning"
prerequisites: ["memory-bank exists", "tasks.md has content"]
creates: ["activeContext.md update"]
tools:
  cursor:
    trigger: "/task-next"
    description: "Get PM assistant suggestion for next task"
  claude-code:
    trigger: "/task-next"
    description: "Analyze tasks and suggest next priority"
    allowed-tools: ["Read", "Edit"]
  gemini-cli:
    trigger: "/task-next"
    description: "Suggest next task priority"
---

# Task Next - PM Assistant

## Objective
Act as a Project Manager assistant to analyze current task status and recommend the highest priority next task based on dependencies, blockers, and project goals.

## Process

### 1. Context Analysis
- Read `tasks.md` for current task list and status
- Read `activeContext.md` for current focus
- Read `progress.md` for completion status
- Identify blockers and dependencies

### 2. Priority Assessment
Evaluate tasks based on:
- **Dependencies**: Can it be started now?
- **Blockers**: Are there unresolved issues?
- **Business Value**: Impact on project goals
- **Complexity**: Effort vs. available time
- **Risk**: Technical or schedule risks

### 3. Recommendation
Provide structured recommendation:
```markdown
## Recommended Next Task

### Task: [Task Name]
- **From Epic**: [Epic Name]
- **Priority Score**: [1-10]
- **Estimated Effort**: [hours/days]

### Rationale
- [Why this task is prioritized]
- [Dependencies satisfied]
- [Business value]

### Prerequisites
- [What needs to be ready]

### Suggested Approach
1. [Step 1]
2. [Step 2]

### Alternative Options
1. [Alternative Task 1] - [reason]
2. [Alternative Task 2] - [reason]
```

### 4. Context Update
- Update `activeContext.md` with recommended focus
- Note any blockers or risks identified

## Success Criteria
- [ ] All tasks analyzed
- [ ] Clear recommendation provided
- [ ] Rationale explained
- [ ] Alternative options listed

## Next Steps
- Accept recommendation and execute `/implement`
- Or choose alternative and update focus

## Tool-Specific Usage

### Cursor
```
/task-next
```

### Claude Code
```
What should I work on next?
```

### Gemini CLI
```
/task-next
```
