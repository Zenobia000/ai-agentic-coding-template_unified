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

### Core Review Report Structure

```markdown
# Code Review Report - [Repository/Module Name]

**Review Date:** `YYYY-MM-DD`
**Target Code:** `[Branch / Commit Hash / File Path]`
**Status:** `[Approved / Request Changes / Rejected]`

## 1. Review Summary

### Overall Assessment
| Metric | Score (0-100) | Grade | Summary |
| :--- | :--- | :--- | :--- |
| **Code Quality** | `[Score]` | `[S/A/B/C/F]` | `[Brief evaluation]` |
| **Architecture** | `[Score]` | `[S/A/B/C/F]` | `[Brief evaluation]` |
| **Security** | `[Score]` | `[S/A/B/C/F]` | `[Brief evaluation]` |
| **Maintainability** | `[Score]` | `[S/A/B/C/F]` | `[Brief evaluation]` |
| **Overall** | **`[Total]`** | **`[Grade]`** | **`[Summary]`** |

### Risk Level
- **Critical Issues**: `[Count]`
- **Major Issues**: `[Count]`
- **Minor Issues**: `[Count]`

## 2. Linus Torvalds Taste Assessment

> "Good taste" is about seeing the big patterns and avoiding special cases.

### Taste Score: `[🟢 Good Taste / 🟡 Acceptable / 🔴 Poor Taste]`

### Core Insights
- **Data Structures:**
  - `[Comment on whether correct data structures were chosen. Bad programmers worry about the code. Good programmers worry about data structures.]`
- **Special Cases:**
  - `[Identify if code is littered with if (edge_case). Good code eliminates special cases through better abstractions.]`
- **Simplicity:**
  - `[Is the code over-engineered? Are functions too long? Does indentation exceed 3 levels?]`

## 3. Issue Details

### 🚨 Critical Issues (Must Fix)
*Must be fixed immediately before merge.*

#### 1. `[Issue Title]`
- **Location**: `[File:Line]`
- **Description**: `[Why this is critical - crashes, security holes, logic errors]`
- **Suggested Fix**:
```[language]
[Fixed code example]
```

### ⚠️ Major Issues
*Strongly recommended fixes for quality/maintainability.*

#### 1. `[Issue Title]`
- **Location**: `[File:Line]`
- **Description**: `[Pattern violations, performance bottlenecks, duplication]`
- **Suggested Fix**: `[Recommendation]`

### 💡 Improvements
*Nice to have optimizations.*

- `[File]`: `[Suggestion for naming, comments, etc.]`

## 4. Security & Performance

### 🔒 Security Checklist
- [ ] **Injection**: SQL/Command injection risks checked?
- [ ] **Secrets**: No hardcoded passwords or keys?
- [ ] **Authorization**: User permissions validated?
- **Result**: `[Pass / Vulnerabilities Found]`

### ⚡ Performance Analysis
- **Time Complexity**: `[Analysis of critical paths, e.g., O(n)]`
- **Resource Leaks**: `[Unclosed connections or file handles]`
- **N+1 Problems**: `[Database query issues]`

## 5. Action Items

- [ ] **Must Fix**: `[List required items]`
- [ ] **Should Optimize**: `[List recommended items]`
- [ ] **Technical Debt**: `[Document trade-offs for future]`
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
