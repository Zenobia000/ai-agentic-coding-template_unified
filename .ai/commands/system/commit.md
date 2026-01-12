---
name: "Commit"
description: "Generate high-quality commit message and save to LOCAL only"
phase: "any"
prerequisites: ["staged changes exist"]
creates: ["git commit"]
constraints: ["Do NOT push to remote", "Local operation only"]
tools:
  cursor:
    trigger: "/commit"
    description: "Local commit only"
  claude-code:
    trigger: "/commit"
    description: "Generate commit message"
    allowed-tools: ["Bash(git status:*)", "Bash(git diff:*)", "Bash(git commit:*)"]
  gemini-cli:
    trigger: "/commit"
    description: "Local commit"
---

# 💾 Commit - Local Checkpoint

## Objective
Generate a high-quality commit message and save changes to the **local repository only**.
**STRICTLY FORBIDDEN: Do NOT push to remote.**

## Process

### 1. Pre-Commit Check
```bash
# Verify strictly local operation
# If user asks to push, REJECT and refer to /pr command
```

### 2. Gather Context
```bash
git status
git diff --staged
```

### 3. Generate Message (Conventional Commits)
Format:
```
<type>(<scope>): <subject>

<body>

<footer>
```

### 4. Execute Commit
```bash
git commit -m "..."
```

## Constraints
- **NO PUSH**: This command must NEVER execute `git push`.
- **Local Only**: Its sole purpose is to create a safe checkpoint in the local history.

## Examples
```
/commit
```
AI Action:
1. Check staged files.
2. Generate message: `feat(auth): implement login logic`.
3. Run `git commit`.
4. Stop. (Do not push)
