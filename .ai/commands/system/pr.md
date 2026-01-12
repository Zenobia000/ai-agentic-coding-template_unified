---
name: "PR / Push"
description: "Team Mode: Sync, push, and generate PR description"
phase: "system"
prerequisites: ["local commits exist", "clean working directory"]
creates: ["git push", "PR description"]
tools:
  cursor:
    trigger: "/pr"
    description: "Push and generate PR content"
  claude-code:
    trigger: "/pr"
    description: "Sync, push, and write PR description"
    allowed-tools: ["Bash(git pull:*)", "Bash(git push:*)", "Bash(git branch:*)", "Bash(git log:*)"]
  gemini-cli:
    trigger: "/pr"
    description: "Push and gen PR"
---

# 🚀 PR - Sync, Push & Describe

## Objective
Synchronize with base branch, push to remote, and **generate a high-quality PR Description** for the user.

## Process

### 1. Identify Target Base
- `hotfix/*` -> Target: `main`
- `feat/*` -> Target: `develop` (or `main` if Team Mode not active)

### 2. Sync (Rebase)
```bash
git fetch origin
git rebase origin/<target_base>
```

### 3. Push
```bash
git push origin <current-branch> --force-with-lease
```

### 4. Generate PR Description
Analyze the commits (from base to HEAD) and output a Markdown template.

**Template Output Format:**
```markdown
# 🏗️ PR: <Title based on task>

## 📝 Summary
<AI summary of changes>

## 🔍 Type of Change
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ♻️ Refactor (no functional changes)
- [ ] 💥 Breaking change

## 🧪 Test Plan
<AI suggestion on how to test this>
- [ ] Unit Tests pass
- [ ] Manual verification steps: ...

## ✅ Checklist
- [ ] My code follows the code style of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
```

## Examples
```
/pr
```
AI Action:
1. Sync & Push.
2. "Branch `feat/login` pushed!"
3. "Here is your PR Description. Copy this into GitHub/GitLab:"
4. [Outputs Markdown Block]
