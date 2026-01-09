---
name: "PLAN - Epic Creation and Task Planning"
description: "Create epics from user ideas and break down into actionable tasks with implementation roadmap"
phase: "planning"
prerequisites: ["memory-bank exists"]
creates: ["tasks.md with epics", "projectbrief.md update", "implementation roadmap"]
tools:
  cursor:
    trigger: "/plan"
    description: "PLAN MODE - Epic creation and comprehensive task planning"
  claude-code:
    trigger: "/plan"
    description: "Create epics and break down into actionable tasks"
    allowed-tools: ["Read", "Write", "Edit"]
  gemini-cli:
    trigger: "/plan"
    description: "Epic creation and detailed task breakdown"
---

# 📋 PLAN MODE - Epic Creation and Task Planning

## Objective
Transform user ideas and high-level requirements into structured Epics, then break them down into actionable tasks with clear priorities, dependencies, and implementation roadmap.

## Process

### Phase 1: Epic Creation (from User Ideas)

#### 1. Requirement Gathering
- Listen to user's description of the feature/task
- Ask clarifying questions if needed
- Identify core objectives and constraints
- Understand business value and user impact

#### 2. Epic Structure Creation
Generate structured Epic format:
```markdown
## Epic: [Epic Name]
- **Status**: Draft
- **Priority**: [High/Medium/Low]
- **Business Value**: [High/Medium/Low]
- **Estimated Complexity**: [S/M/L/XL]

### Description
[Clear description of what needs to be built and why]

### Success Criteria
- [ ] Measurable outcome 1
- [ ] Measurable outcome 2

### User Stories
- As a [user type], I want [functionality] so that [benefit]
- As a [user type], I want [functionality] so that [benefit]

### Technical Considerations
- Dependencies: [list technical dependencies]
- Risks: [technical and business risks]
- Architecture Impact: [how it affects system design]

### Initial Task Breakdown
- [ ] Task 1.1: [high-level task description]
- [ ] Task 1.2: [high-level task description]
```

### Phase 2: Detailed Task Breakdown

#### 3. Requirements Analysis
- **Review Project Brief**: Understand project goals and constraints
- **Identify Stakeholders**: Clarify who will be involved and their roles
- **Define Success Criteria**: Establish measurable outcomes
- **Assess Technical Constraints**: Review technical limitations and requirements

#### 4. Task Breakdown Structure (WBS)
- **Epic Level**: Major feature areas (already created in Phase 1)
- **Story Level**: User-facing functionality and requirements
- **Task Level**: Technical implementation tasks
- **Subtask Level**: Specific development activities

#### 5. Prioritization Framework
Use **MoSCoW Method**:
- **Must Have**: Critical for MVP/release
- **Should Have**: Important but not critical
- **Could Have**: Nice to have if time permits
- **Won't Have**: Out of scope for current iteration

#### 6. Dependency Mapping
- **Technical Dependencies**: What must be built first
- **Resource Dependencies**: Required skills or tools
- **External Dependencies**: Third-party integrations or approvals
- **Sequential Dependencies**: Logical order of implementation

#### 7. Estimation and Sizing
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

## Epics
### Epic 1: [Epic Name]
[Epic details from Phase 1]

### Epic 2: [Epic Name]
[Epic details from Phase 1]
```

### Implementation Roadmap
```markdown
## Sprint Planning
### Sprint 1: Foundation (Week 1-2)
- Epic setup and infrastructure
- Core architecture decisions
- Basic functionality framework

### Sprint 2: Core Features (Week 3-4)
- Primary user stories implementation
- Essential integrations
- Testing setup and initial tests

### Sprint 3: Enhancement (Week 5-6)
- Additional features from backlog
- Performance optimization
- Documentation and knowledge transfer
```

### Memory Bank Updates
- Add Epic(s) to `tasks.md`
- Update `projectbrief.md` with new scope if needed
- Set `activeContext.md` to reference current planning focus

## Success Criteria
- [ ] User ideas transformed into clear, structured Epics
- [ ] All requirements mapped to specific tasks
- [ ] Clear task priorities and dependencies identified
- [ ] Realistic timeline with buffer for unknowns
- [ ] Team has clear understanding of next steps
- [ ] Risk mitigation strategies defined

## Usage Modes

### Mode A: Quick Epic Creation
For creating a single Epic from user input:
```
/plan [feature description]
```
**Process**: Phases 1-2 (Epic Creation + Light Task Breakdown)
**Output**: Single Epic with initial tasks

### Mode B: Comprehensive Planning
For full project planning and roadmap creation:
```
/plan
```
**Process**: Full Phases 1-7 (Complete Epic + Detailed Planning)
**Output**: Complete task breakdown and roadmap

## Anti-Patterns to Avoid
- **Over-planning**: Don't plan beyond 2-3 sprints in detail
- **Under-estimation**: Include buffer for unknowns and complexity
- **Dependency Hell**: Minimize critical path dependencies
- **Scope Creep**: Keep new requirements in backlog, not current sprint
- **Epic Bloat**: Keep Epics focused and deliverable

## Tools and Techniques

### Epic Validation
- **Stakeholder Review**: Confirm Epic value with business stakeholders
- **Technical Feasibility**: Validate approach with technical team
- **INVEST Criteria**: Ensure Epics are Independent, Negotiable, Valuable, Estimable, Small, Testable

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
4. **Begin Design**: Move to `/creative` phase for detailed technical design
5. **Start Implementation**: Use `/implement` for development execution

## Tool-Specific Usage

### Cursor
```
/plan
```

### Claude Code
```
"Help me create an epic for [feature] and break it down into actionable tasks"
```
or
```
"Let's plan this project with comprehensive task breakdown and roadmap"
```

### Gemini CLI
```
/plan
```

---

> **PLAN MODE activated. Creating Epics and developing comprehensive task breakdown...**