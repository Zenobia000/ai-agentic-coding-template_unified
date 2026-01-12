# Template Integration Architecture

This document defines how utility commands integrate with the core seven-step workflow, ensuring data consistency and seamless handoffs between commands.

## Integration Overview

```mermaid
graph TB
    subgraph "Core Workflow (7 Steps)"
        VAN[/van - Requirements]
        PLAN[/plan - Planning]
        ADR[/adr - Decisions]
        CREATIVE[/creative - Architecture]
        VALIDATOR[/design-validator - Detail & Validate]
        IMPLEMENT[/implement - Implementation]
        REFLECT[/reflect - Reflection]

        VAN --> PLAN
        PLAN --> ADR
        ADR --> CREATIVE
        CREATIVE --> VALIDATOR
        VALIDATOR --> IMPLEMENT
        IMPLEMENT --> REFLECT
    end

    subgraph "Utility Commands"
        TASK_NEXT[/task-next - PM Recommendations]
        DEBUG[/debug - Root Cause Analysis]
        REVIEW[/review-code - Code Review]
        TESTS[/write-tests - Test Strategy]
    end

    %% Integration Points
    TASK_NEXT -.-> PLAN
    PLAN -.-> TASK_NEXT

    DEBUG -.-> IMPLEMENT
    IMPLEMENT -.-> DEBUG

    REVIEW <-.-> IMPLEMENT
    REVIEW <-.-> TESTS

    TESTS <-.-> IMPLEMENT
    TESTS <-.-> REVIEW
```

## Data Flow Architecture

### 1. Core Workflow Data Flow
Each command in the core workflow produces outputs that become inputs for subsequent commands:

| Command | Produces | Consumed By |
|---------|----------|-------------|
| `/van` | Requirements Spec | `/plan`, `/adr`, `/creative` |
| `/plan` | Task List (WBS) | `/task-next`, `/implement`, `/reflect` |
| `/adr` | Architecture Decisions | `/creative`, `/design-validator` |
| `/creative` | Architecture Design | `/design-validator`, `/implement` |
| `/design-validator` | Validation Report | `/implement`, `/review-code` |
| `/implement` | Implementation Guide | `/debug`, `/review-code`, `/write-tests` |
| `/reflect` | Progress Report | `/task-next`, next iteration |

### 2. Utility Command Integration Points

#### `/task-next` - PM Recommendations
**Integration with Core Workflow:**
- **Reads From:**
  - `memory-bank/tasks.md` (from `/plan`)
  - `memory-bank/progress.md` (from `/reflect`)
  - `memory-bank/implementation/*.md` (from `/implement`)
- **Writes To:**
  - `memory-bank/recommendations/pm-recommendation-*.md`
- **Updates:**
  - Suggests updates to `tasks.md` with priority changes
- **Triggers:**
  - May trigger `/plan` to update task breakdown based on recommendations

#### `/debug` - Root Cause Analysis
**Integration with Core Workflow:**
- **Reads From:**
  - `memory-bank/implementation/guide-*.md` (from `/implement`)
  - `memory-bank/designs/architecture/*.md` (from `/creative`)
  - `memory-bank/techContext.md` (technical context)
- **Writes To:**
  - `memory-bank/debug/debug-*.md`
- **Updates:**
  - May trigger updates to implementation guide
- **Triggers:**
  - May require `/implement` re-run after fix
  - May trigger `/adr` for architecture changes

#### `/review-code` - Code Review
**Integration with Core Workflow:**
- **Reads From:**
  - `memory-bank/implementation/guide-*.md` (from `/implement`)
  - `memory-bank/validation/report-*.md` (from `/design-validator`)
  - `memory-bank/tests/test-strategy-*.md` (from `/write-tests`)
- **Writes To:**
  - `memory-bank/reviews/review-*.md`
- **Updates:**
  - Links back to specific implementation phases
- **Triggers:**
  - May trigger `/implement` updates for critical issues
  - May trigger `/write-tests` for missing test coverage

#### `/write-tests` - Test Strategy
**Integration with Core Workflow:**
- **Reads From:**
  - `memory-bank/implementation/guide-*.md` (from `/implement`)
  - `memory-bank/designs/architecture/*.md` (from `/creative`)
  - `memory-bank/reviews/review-*.md` (from `/review-code`)
- **Writes To:**
  - `memory-bank/tests/test-strategy-*.md`
- **Updates:**
  - Updates test coverage metrics in implementation guide
- **Triggers:**
  - May trigger `/review-code` after test implementation
  - Updates `/reflect` metrics

## Template Variable Sharing

### Shared Variables Across Commands
These variables are available to all templates:

```yaml
global_context:
  project_name: "{{project_name}}"
  version: "{{version}}"
  timestamp: "{{timestamp}}"
  ai_tool: "{{ai_tool}}"
  git_branch: "{{git_branch}}"
  git_commit: "{{git_commit}}"
```

### Command-Specific Variable Inheritance

#### From Core to Utility Commands
```yaml
/implement -> /debug:
  - implementation_version
  - affected_components
  - error_context

/implement -> /review-code:
  - implementation_version
  - changed_files
  - commit_range

/implement -> /write-tests:
  - implementation_version
  - components_to_test
  - coverage_baseline

/plan -> /task-next:
  - sprint_number
  - current_tasks
  - team_members
```

## Integration Enforcement Rules

### 1. Mandatory Linkage
Utility commands MUST reference their parent command outputs:

```yaml
enforcement:
  review-code:
    must_reference:
      - implementation_guide_version
      - implementation_phase

  write-tests:
    must_reference:
      - implementation_guide_version
      - component_under_test

  debug:
    must_reference:
      - issue_source_file
      - implementation_version

  task-next:
    must_reference:
      - current_sprint
      - tasks_status
```

### 2. Data Consistency Rules
- Version numbers must match between linked documents
- Timestamps must be chronologically consistent
- Referenced files must exist in memory-bank
- Cross-references must be bidirectional

### 3. Validation Hooks
The enforcement system validates:
- Template variable resolution
- Output file location
- Cross-reference integrity
- Linked command consistency

## Usage Examples

### Example 1: Code Review After Implementation
```bash
# 1. Implementation creates guide
/implement
# Output: memory-bank/implementation/guide-v1.0.0.md

# 2. Code review references implementation
/review-code
# Automatically loads:
#   - implementation_version: "v1.0.0"
#   - implementation_files: [list from guide]
# Output: memory-bank/reviews/review-CR001-2024-01-12T10-00-00Z.md
```

### Example 2: Debug During Implementation
```bash
# 1. Implementation encounters error
/implement
# Error detected in component X

# 2. Debug analysis
/debug
# Automatically loads:
#   - error_context from implementation
#   - component architecture from /creative
# Output: memory-bank/debug/debug-BUG001-2024-01-12T11-00-00Z.md

# 3. Implementation update after fix
/implement --update
# Incorporates debug findings
```

### Example 3: Task Planning Integration
```bash
# 1. Initial planning
/plan
# Output: memory-bank/tasks.md

# 2. PM recommendations
/task-next
# Reads: tasks.md, progress.md
# Output: memory-bank/recommendations/pm-recommendation-*.md

# 3. Plan update based on recommendations
/plan --update
# Incorporates PM recommendations
```

## Best Practices

### 1. Always Link Related Commands
When using utility commands, always ensure they reference the correct parent command outputs.

### 2. Maintain Version Consistency
Use consistent version numbers across linked documents to maintain traceability.

### 3. Update Parent Documents
After utility command execution, update parent documents if changes are required.

### 4. Use Enforcement Validation
Run enforcement checks to ensure all linkages are valid:
```bash
python3 .ai/hooks/command-enforcer.py --validate-links
```

## Integration Metrics

Track integration effectiveness through:
- Link validation success rate
- Cross-reference accuracy
- Data consistency score
- Template variable resolution rate

These metrics are automatically collected and reported in the enforcement log.