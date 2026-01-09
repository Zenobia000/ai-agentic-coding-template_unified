---
name: "Task Init"
description: "Convert user ideas into structured epic tasks"
phase: "planning"
prerequisites: ["memory-bank exists"]
creates: ["tasks.md update", "projectbrief.md update"]
tools:
  cursor:
    trigger: "/task-init"
    description: "Initialize a new epic task from user requirements"
  claude-code:
    trigger: ["ai task-init", "create task", "new epic", "define task"]
    description: "Create a structured epic from user requirements"
  gemini-cli:
    trigger: "gemini task-init"
    description: "Initialize new epic task"
---

# Task Init - Epic Creation

## Objective
Transform user's high-level idea or requirement into a structured Epic with clear scope, acceptance criteria, and initial task breakdown.

## Process

### 1. Requirement Gathering
- Listen to user's description of the feature/task
- Ask clarifying questions if needed
- Identify core objectives and constraints

### 2. Epic Structure Creation
Generate structured Epic format:
```markdown
## Epic: [Epic Name]
- **Status**: Draft
- **Priority**: [High/Medium/Low]
- **Estimated Complexity**: [S/M/L/XL]

### Description
[Clear description of what needs to be built]

### Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

### Technical Considerations
- Dependencies: [list]
- Risks: [list]

### Initial Task Breakdown
- [ ] Task 1.1: [description]
- [ ] Task 1.2: [description]
```

### 3. Memory Bank Update
- Add Epic to `tasks.md`
- Update `projectbrief.md` if needed
- Set `activeContext.md` to reference new Epic

## Success Criteria
- [ ] Epic has clear description and scope
- [ ] Acceptance criteria are measurable
- [ ] Initial tasks identified
- [ ] Memory Bank updated

## Next Steps
- Execute `/plan` for detailed task breakdown
- Execute `/creative` if design decisions needed

## Tool-Specific Usage

### Cursor
```
/task-init
```

### Claude Code
```
Help me create a new epic task for [feature description]
```

### Gemini CLI
```
gemini task-init
```
