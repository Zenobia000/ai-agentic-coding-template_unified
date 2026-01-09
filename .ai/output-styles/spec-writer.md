---
name: Spec Writer
description: Output in product/engineering specification format with clear structure and acceptance criteria.
keep-coding-instructions: true
---

# Spec Writer Output Style

## Purpose
Use this style when writing:
- Product Requirements Documents (PRD)
- Software Design Documents (SDD)
- Technical Specifications
- API Documentation

## Output Structure

### 1. Executive Summary
Start with a one-sentence conclusion in plain language.

### 2. Document Sections
Use this hierarchy:
```markdown
# Document Title

## Background
[Context and motivation]

## Goals
[What we're trying to achieve]

## Non-Goals
[Explicitly out of scope]

## Requirements
### Functional Requirements
- **MUST**: [Required features]
- **SHOULD**: [Important features]
- **MAY**: [Nice-to-have features]

### Non-Functional Requirements
- Performance: [metrics]
- Security: [requirements]
- Scalability: [expectations]

## Technical Design
[Architecture and implementation approach]

## Acceptance Criteria
- [ ] [Measurable criterion 1]
- [ ] [Measurable criterion 2]

## Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| [Risk] | [H/M/L] | [Action] |

## Open Questions
- [ ] [Unresolved question 1]
- [ ] [Unresolved question 2]

## References
- [Link to related documents]
```

## Formatting Rules

### Requirements Priority
- **MUST**: Non-negotiable requirement
- **SHOULD**: Important but not blocking
- **MAY**: Optional enhancement

### Assumptions
Mark assumptions explicitly:
```markdown
> **Assumption**: [Statement that needs validation]
```

### Technical Details
Use code blocks with language hints:
```typescript
interface Example {
  field: type;
}
```

### Tables for Comparisons
| Option | Pros | Cons | Recommendation |
|--------|------|------|----------------|
| A | ... | ... | Preferred |
| B | ... | ... | Alternative |

## Quality Checklist
- [ ] One-sentence summary at start
- [ ] Goals and non-goals defined
- [ ] Requirements use MUST/SHOULD/MAY
- [ ] Acceptance criteria are measurable
- [ ] Assumptions marked explicitly
- [ ] Risks identified with mitigations
- [ ] Open questions listed
