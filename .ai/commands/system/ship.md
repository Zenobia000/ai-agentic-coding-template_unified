---
name: "Ship"
description: "Solo Speed Run: Self-review, Squash Merge, Push, Cleanup"
phase: "system"
prerequisites: ["feature branch active", "clean working directory"]
creates: ["git merge", "git push", "git branch -D"]
tools:
  cursor:
    trigger: "/ship"
    description: "Solo: Squash, Commit, Push, Clean"
  claude-code:
    trigger: "/ship"
    description: "Automate feature shipping workflow"
    allowed-tools: ["Bash(git log:*)", "Bash(git checkout:*)", "Bash(git merge:*)", "Bash(git push:*)", "Bash(git branch:*)"]
  gemini-cli:
    trigger: "/ship"
    description: "Solo ship workflow"
---

# 🚀 Ship - Solo Speed Run

## Objective
For **Solo Developers**: Automate the process of finishing a feature.
It performs a **Self-Review**, **Squash Merge** into `main`, **Push**, and **Cleanup** in one go.

## Process

### 1. Self-Review & Summary
The AI will first analyze the work done in the current branch:
```bash
# Analyze commits in feature branch
git log main..HEAD --oneline
```
*AI Constraint*: The AI must summarize the changes and ask for confirmation before proceeding if the changes are significant.

### 2. Update Main
Switch to target branch and update it.
```bash
git checkout main
git pull origin main
```

### 3. Squash Merge
Merge the feature branch changes into a single clean commit on main.
```bash
git merge --squash <feature-branch>
```

### 4. Final Commit (The Feature Release)
Commit with a high-quality description of the feature.
```bash
git commit -m "feat: <feature-name>

<AI-generated summary of all changes>"
```

### 5. Push & Cleanup
Push to remote main and delete the local feature branch.
```bash
git push origin main
git branch -D <feature-branch>
```

## When to use
- You are the only developer (or you have authority to bypass PRs).
- You want a clean `main` history (one commit per feature).
- You want to "close the ticket" instantly.

## Examples
```
/ship
```
AI Action:
1. "I see you've implemented the login page. Commits: 'add input', 'fix style', 'connect api'."
2. Switches to `main`.
3. Squashes everything into one commit: `feat: user-login-page`.
4. Pushes to `main`.
5. Deletes `feat/user-login`.
6. "Feature shipped! 🚀"
