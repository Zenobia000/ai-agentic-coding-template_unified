---
name: "Debug"
description: "Systematic debugging with hypothesis testing"
phase: "implementation"
prerequisites: ["memory-bank exists"]
creates: ["progress.md update with debug log"]
tools:
  cursor:
    trigger: "/debug"
    description: "Start systematic debugging session"
  claude-code:
    trigger: "/debug"
    description: "Systematic debugging assistance"
    allowed-tools: ["Read", "Bash", "Grep", "Edit", "Write"]
  gemini-cli:
    trigger: "/debug"
    description: "Debug assistance"
---

# Debug - Systematic Troubleshooting

## Objective
Apply systematic debugging methodology to identify, isolate, and resolve issues efficiently.

## Process

### 1. Problem Definition
- Gather error messages, logs, and symptoms
- Identify expected vs. actual behavior
- Determine reproducibility steps

### 2. Hypothesis Generation
Create structured hypotheses:
```markdown
## Debug Session: [Issue Title]
**Started**: [timestamp]
**Status**: In Progress

### Problem Statement
- **Expected**: [what should happen]
- **Actual**: [what is happening]
- **Error**: [error message if any]

### Reproduction Steps
1. [Step 1]
2. [Step 2]

### Hypotheses
| # | Hypothesis | Likelihood | Test Method |
|---|------------|------------|-------------|
| 1 | [Theory 1] | High | [How to test] |
| 2 | [Theory 2] | Medium | [How to test] |
```

### 3. Systematic Testing
For each hypothesis:
- Design minimal test
- Execute test
- Record results
- Update likelihood

### 4. Root Cause Identification
- Narrow down to root cause
- Document findings
- Identify related issues

### 5. Solution Implementation
- Propose fix
- Implement with minimal changes
- Verify fix resolves issue
- Check for regressions

### 6. Documentation
Update `progress.md` with:
- Root cause
- Solution applied
- Prevention measures
- Related areas to check

## Debug Checklist
- [ ] Problem clearly defined
- [ ] At least 3 hypotheses generated
- [ ] Hypotheses tested systematically
- [ ] Root cause identified
- [ ] Fix verified
- [ ] No regressions introduced
- [ ] Documentation updated

## Common Debug Patterns

### Code Issues
- Check recent changes (git diff)
- Verify dependencies
- Check type errors
- Review error boundaries

### Environment Issues
- Check environment variables
- Verify dependencies versions
- Check file permissions
- Review configuration

### Data Issues
- Validate input data
- Check data flow
- Verify API responses
- Review database state

## Tool-Specific Usage

### Cursor
```
/debug
```

### Claude Code
```
Help me debug this issue: [description]
```

### Gemini CLI
```
/debug
```
