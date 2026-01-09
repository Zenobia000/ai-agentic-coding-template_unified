---
name: "GitHub - Quick Push"
description: "Stage, commit, and push changes to GitHub"
phase: "system"
tools:
  cursor:
    trigger: "/github"
  claude-code:
    trigger: ["/github", "push to github", "git push"]
  gemini-cli:
    trigger: "/github"
---

# 🚀 GitHub Quick Push Command

## Objective
快速將變更提交並推送到 GitHub（git add + commit + push）。

## Process

### 1. Check Current Status
```bash
git status
git diff --stat
```

### 2. Stage Changes
```bash
# Stage all changes
git add .

# Or stage specific files
git add <file1> <file2>
```

### 3. Create Commit
使用 Conventional Commits 格式：
```bash
git commit -m "<type>(<scope>): <description>

<body>

Co-Authored-By: Claude <noreply@anthropic.com>"
```

**Commit Types:**
| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | Formatting |
| `refactor` | Code refactoring |
| `test` | Adding tests |
| `chore` | Maintenance |

### 4. Push to Remote
```bash
git push origin <current-branch>
```

## Quick One-liner
```bash
git add . && git commit -m "feat: update feature" && git push
```

## Parameters
- `{{args}}` - Optional: commit message or specific files to stage

## Examples

### Basic Usage
```
/github
```
AI will:
1. Check `git status` for changes
2. Stage all modified files
3. Generate appropriate commit message
4. Push to current branch

### With Custom Message
```
/github fix: resolve login bug
```

### With Specific Files
```
/github src/auth.js src/utils.js
```

## Safety Checks
- Verify remote is configured
- Check current branch (warn if on main/master)
- Review staged changes before commit
- Ensure no sensitive files are staged (.env, secrets, etc.)

## Output
- Changes staged
- Commit created with proper message
- Code pushed to remote

---

**Usage:** `/github` or `/github <commit-message>`
