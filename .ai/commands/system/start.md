---
name: "Start"
description: "Start a new task by creating a feature/hotfix branch (Context Aware)"
phase: "system"
creates: ["git branch"]
tools:
  cursor:
    trigger: "/start"
    description: "Start a new task branch"
  claude-code:
    trigger: "/start"
    description: "Create and switch to a new feature branch"
    allowed-tools: ["Bash(git checkout:*)", "Bash(git pull:*)", "Bash(git branch:*)", "Bash(git config:*)"]
  gemini-cli:
    trigger: "/start"
    description: "Start task branch"
---

# 🚀 Start - New Task

## Objective
Initialize a new workspace for a specific task.
**Smart Behavior**: Checks if `develop` branch exists to determine if we are in **Team Mode** or **Solo Mode**.

## Process

### 1. Detect Mode & Base Branch
- **Hotfix**: Always base on `main`.
- **Feature**:
  - Check if `develop` branch exists locally or remotely.
  - If `develop` exists -> **Team Mode** (Base: `develop`).
  - If no `develop` -> **Solo Mode** (Base: `main`).

### 2. Update Base Branch
```bash
git checkout <base_branch>
git pull origin <base_branch>
```

### 3. Create Task Branch
```bash
# Format: <type>/<task_id>-<short-description>
git checkout -b <branch_name>
```

### 4. Context Update
- Update `memory-bank/activeContext.md` to reflect the new task focus.

## Parameters
- `type`: `feat` (default) or `hotfix`.
- `id`: (Optional) Task ID from issue tracker.
- `desc`: Short description of the task (slug format).

## Examples
```
/start desc=login-page
```
*Result*: `feat/login-page` (based on `main` or `develop`)

```
/start type=hotfix desc=fix-auth
```
*Result*: `hotfix/fix-auth` (based on `main`)