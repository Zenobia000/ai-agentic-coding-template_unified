---
name: repo-guard
description: Automatically detect and prevent dangerous operations, secret exposure, and main branch modifications.
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash(git:*)
  - Bash(rg:*)
  - Bash(ls:*)
context: inline
---

# Repo Guard Skill

## Purpose
Proactively protect the repository from common mistakes and security issues.

## Trigger Conditions
This skill activates automatically when:
- File write/edit operations are about to occur
- Bash commands are being executed
- Git operations are being performed

## Protection Rules

### 1. Secret Detection
**Detect and block commits containing:**
- API keys and tokens
- Passwords and credentials
- Private keys
- Environment secrets

**Patterns to watch:**
```
- .env files
- *_KEY, *_SECRET, *_TOKEN patterns
- BEGIN PRIVATE KEY
- password=, passwd=, pwd=
- Bearer tokens
- AWS credentials
```

**Action:** Block and suggest using environment variables or secret managers.

### 2. Destructive Command Prevention
**Block or require confirmation for:**
```bash
rm -rf /
rm -rf *
rm -rf .
mkfs.*
dd if=
> /dev/sd*
chmod -R 777
```

**Action:** Block immediately with warning, suggest safer alternatives.

### 3. Main Branch Protection
**Prevent direct modifications to:**
- main branch
- master branch
- production branch

**Action:** Suggest creating feature branch first.

### 4. Large File Prevention
**Warn about:**
- Binary files > 10MB
- Generated files (node_modules, dist, build)
- Media files without LFS

**Action:** Warn and suggest .gitignore or Git LFS.

## Response Behavior

### When Detecting Issues
```markdown
**Repo Guard Alert**

**Issue Detected**: [Type of issue]
**Location**: [File or command]
**Severity**: [Critical/Warning/Info]

**Details**:
[Explanation of the issue]

**Recommended Action**:
[What to do instead]

**To proceed anyway** (not recommended):
[Explicit override instructions]
```

### Safe Operations
No output - allow operation to proceed silently.

## Integration

### Claude Code
Automatically invoked before:
- Write tool calls
- Edit tool calls
- Bash tool calls with git/rm/chmod

### Cursor
Referenced in rules for file modification warnings.

### Gemini CLI
Included in system prompt for command validation.
