---
name: "PLAN - Task Planning"
description: "Break down requirements into actionable tasks and create implementation roadmap"
phase: "planning"
prerequisites: ["tasks.md", "activeContext.md"]
creates: ["updated tasks.md", "implementation roadmap"]
tools:
  cursor:
    trigger: "/plan"
    description: "PLAN MODE - Task planning and WBS breakdown"
  claude-code:
    trigger: ["plan", "break down tasks", "create roadmap", "task planning"]
    description: "Break down the requirements into actionable tasks"
  gemini-cli:
    trigger: "gemini plan"
    description: "Create detailed task breakdown and planning"
---

# 📋 PLAN MODE - Task Planning and Breakdown

## Objective
Transform high-level requirements and goals into a structured, actionable task list with clear priorities, dependencies, and acceptance criteria.

## Process

### 1. Requirements Analysis
- **Review Project Brief**: Understand project goals and constraints
- **Identify Stakeholders**: Clarify who will be involved and their roles
- **Define Success Criteria**: Establish measurable outcomes
- **Assess Technical Constraints**: Review technical limitations and requirements

### 2. Task Breakdown Structure (WBS)
- **Epic Level**: Major feature areas or project phases
- **Story Level**: User-facing functionality and requirements
- **Task Level**: Technical implementation tasks
- **Subtask Level**: Specific development activities

### 3. Prioritization Framework
Use **MoSCoW Method**:
- **Must Have**: Critical for MVP/release
- **Should Have**: Important but not critical
- **Could Have**: Nice to have if time permits
- **Won't Have**: Out of scope for current iteration

### 4. Dependency Mapping
- **Technical Dependencies**: What must be built first
- **Resource Dependencies**: Required skills or tools
- **External Dependencies**: Third-party integrations or approvals
- **Sequential Dependencies**: Logical order of implementation

### 5. Estimation and Sizing
- **Complexity Assessment**: Simple, Medium, Complex
- **Time Estimation**: Rough effort estimates
- **Risk Assessment**: Technical and business risks
- **Uncertainty Indicators**: Areas needing research

## Deliverables

### Updated tasks.md Structure
```markdown
# Tasks

## Current Sprint
### 🎯 Active Tasks (In Progress)
- [ ] [Priority] Task description (Assigned: Name, Due: Date)

### ⏳ Pending Tasks (Ready to Start)
- [ ] [Priority] Task description (Dependencies: Task1, Task2)

### 🔄 Blocked Tasks (Waiting)
- [ ] [Priority] Task description (Blocked by: Reason)

## Backlog
### 📈 Next Sprint
- [ ] [Priority] Task description (Epic: Feature Area)

### 🔮 Future
- [ ] [Priority] Task description (Rough estimate)

## Completed
### ✅ This Sprint
- [x] [Priority] Task description (Completed: Date)
```

### Implementation Roadmap
```markdown
## Sprint Planning
### Sprint 1: Foundation (Week 1-2)
- Setup and infrastructure
- Core architecture
- Basic functionality

### Sprint 2: Core Features (Week 3-4)
- Primary user stories
- Essential integrations
- Testing setup

### Sprint 3: Enhancement (Week 5-6)
- Additional features
- Performance optimization
- Documentation
```

## Success Criteria
- [ ] All requirements mapped to specific tasks
- [ ] Clear task priorities and dependencies identified
- [ ] Realistic timeline with buffer for unknowns
- [ ] Team has clear understanding of next steps
- [ ] Risk mitigation strategies defined

## Anti-Patterns to Avoid
- **Over-planning**: Don't plan beyond 2-3 sprints in detail
- **Under-estimation**: Include buffer for unknowns and complexity
- **Dependency Hell**: Minimize critical path dependencies
- **Scope Creep**: Keep new requirements in backlog, not current sprint

## Tools and Techniques

### Task Estimation
- **Planning Poker**: Team-based estimation
- **T-Shirt Sizing**: S, M, L, XL complexity
- **Historical Data**: Use past project metrics

### Risk Assessment
- **Technical Risk**: New technology, complex integration
- **Business Risk**: Changing requirements, market factors
- **Resource Risk**: Team availability, skill gaps

### Validation Checkpoints
- **Stakeholder Review**: Confirm priorities with business stakeholders
- **Technical Review**: Validate approach with senior developers
- **Feasibility Check**: Ensure timeline is realistic

## Next Steps
After completing planning:
1. **Team Alignment**: Review plan with all stakeholders
2. **Resource Allocation**: Assign tasks based on skills and availability
3. **Environment Setup**: Prepare development environment
4. **Begin Implementation**: Move to `/creative` phase for detailed design

---

## Tool-Specific Usage

### Cursor
```
/plan
```

### Claude Code
```
"Help me break down this project into actionable tasks and create an implementation roadmap"
```

### Gemini CLI
```
gemini plan
```

---

> **PLAN MODE activated. Analyzing requirements and creating structured task breakdown...**