---
name: "Git Workflow"
description: "Git branching strategy and commit conventions"
applies_to: ["all"]
priority: "high"
tools:
  cursor:
    mode: "alwaysApply"
    file_pattern: "*"
  claude-code:
    mode: "project_context"
  gemini-cli:
    mode: "system_prompt"
---

# Git Workflow Standards

## Branching Strategy (Git Flow)

### Main Branches
- `main` - Production-ready code, protected
- `develop` - Integration branch for features

### Supporting Branches
- `feature/*` - New features (from develop)
- `hotfix/*` - Emergency production fixes (from main)
- `release/*` - Release preparation (from develop)

### Branch Naming
```
feature/TICKET-123-short-description
hotfix/critical-bug-name
release/v1.2.0
```

## Commit Conventions (Conventional Commits)

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no logic change |
| `refactor` | Code restructure |
| `perf` | Performance improvement |
| `test` | Adding tests |
| `build` | Build system changes |
| `ci` | CI configuration |
| `chore` | Maintenance |
| `revert` | Revert previous commit |

### Subject Line Rules
- Imperative mood ("add" not "added")
- No capitalization at start
- No period at end
- Max 50 characters

### Body Guidelines
- Explain "why" not "what"
- Wrap at 72 characters
- Reference issues when relevant

### Examples

#### Feature
```
feat(auth): add OAuth2 login support

Implement OAuth2 authorization code flow for third-party login.
Supports Google, GitHub, and Microsoft providers.

Closes #123
```

#### Bug Fix
```
fix(api): resolve null pointer in user endpoint

The /api/users/:id endpoint threw when user didn't exist.
Added proper null check and 404 response.

Fixes #456
```

#### Breaking Change
```
feat(api)!: redesign REST API structure

BREAKING CHANGE: API endpoints restructured:
- /users -> /api/v2/users
- /posts -> /api/v2/posts

Migration guide: docs/migration/v1-to-v2.md
```

## Git Safety Rules

### Never Do
- Force push to main/develop
- Commit secrets or credentials
- Commit large binary files
- Rewrite published history

### Always Do
- Pull before push
- Review changes before commit
- Write meaningful commit messages
- Keep commits atomic (one logical change)

## Workflow Commands

### Start Feature
```bash
git checkout develop
git pull origin develop
git checkout -b feature/TICKET-123-description
```

### Finish Feature
```bash
git checkout develop
git pull origin develop
git merge --no-ff feature/TICKET-123-description
git push origin develop
git branch -d feature/TICKET-123-description
```

### Hotfix
```bash
git checkout main
git checkout -b hotfix/critical-fix
# make fix
git checkout main
git merge --no-ff hotfix/critical-fix
git checkout develop
git merge --no-ff hotfix/critical-fix
```

## Pre-Commit Checklist
- [ ] Code compiles/lints without errors
- [ ] Tests pass
- [ ] No secrets in code
- [ ] Commit message follows convention
- [ ] Changes are atomic
- [ ] Documentation updated if needed
