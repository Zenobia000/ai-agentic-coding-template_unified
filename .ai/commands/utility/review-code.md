---
name: "Review Code"
description: "Comprehensive code review with quality checklist"
phase: "implementation"
prerequisites: ["code to review exists"]
creates: ["review notes"]
tools:
  cursor:
    trigger: "/review-code"
    description: "Start comprehensive code review"
  claude-code:
    trigger: "/review-code"
    description: "Comprehensive code review"
    allowed-tools: ["Read", "Grep", "Task"]
  gemini-cli:
    trigger: "/review-code"
    description: "Code review assistance"
---

# Review Code - Quality Gate

## Objective
Perform thorough code review covering correctness, security, performance, maintainability, and style consistency.

## Review Dimensions

### 1. Correctness
- [ ] Logic is correct and handles edge cases
- [ ] Error handling is comprehensive
- [ ] No off-by-one errors
- [ ] Null/undefined handled properly
- [ ] Async operations handled correctly

### 2. Security
- [ ] No hardcoded secrets or credentials
- [ ] Input validation present
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (output encoding)
- [ ] Authentication/authorization checks
- [ ] Sensitive data not logged

### 3. Performance
- [ ] No N+1 query problems
- [ ] Appropriate caching used
- [ ] No memory leaks
- [ ] Efficient algorithms chosen
- [ ] Database queries optimized
- [ ] Unnecessary re-renders avoided (frontend)

### 4. Maintainability
- [ ] Code is readable and self-documenting
- [ ] Functions are single-purpose
- [ ] No duplicate code
- [ ] Appropriate abstraction level
- [ ] Dependencies are justified
- [ ] Technical debt documented

### 5. Testing
- [ ] Tests cover happy path
- [ ] Tests cover error cases
- [ ] Tests cover edge cases
- [ ] Test names are descriptive
- [ ] No flaky tests

### 6. Style & Conventions
- [ ] Follows project naming conventions
- [ ] Consistent formatting
- [ ] No commented-out code
- [ ] Imports organized
- [ ] Types properly defined (TypeScript)

## Review Output Format

```markdown
## Code Review: [File/Feature Name]

### Summary
- **Overall**: [APPROVE/REQUEST_CHANGES/COMMENT]
- **Risk Level**: [Low/Medium/High]
- **Test Coverage**: [Adequate/Needs More]

### Critical Issues (Must Fix)
1. [Issue]: [Location] - [Why it's critical]

### Suggestions (Should Consider)
1. [Suggestion]: [Location] - [Benefit]

### Nitpicks (Optional)
1. [Nitpick]: [Location]

### Positive Highlights
1. [Good practice observed]

### Action Items
- [ ] [Required action 1]
- [ ] [Required action 2]
```

## Review Workflow

1. **Understand Context**: What is this code trying to do?
2. **Read Top-Down**: Understand structure before details
3. **Check Dimensions**: Go through each dimension above
4. **Document Findings**: Use structured format
5. **Provide Actionable Feedback**: Be specific and helpful

## Tool-Specific Usage

### Cursor
```
/review-code
```

### Claude Code
```
Review this code for quality issues
```

### Gemini CLI
```
/review-code
```
