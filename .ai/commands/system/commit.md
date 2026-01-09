---
name: "Commit"
description: "Generate high-quality commit message following Conventional Commits"
phase: "any"
prerequisites: ["staged changes exist"]
creates: ["git commit"]
tools:
  cursor:
    trigger: "/commit"
    description: "Generate and execute commit"
  claude-code:
    trigger: "/commit"
    description: "Generate commit message"
    allowed-tools: ["Bash(git status:*)", "Bash(git diff:*)", "Bash(git log:*)", "Bash(git commit:*)"]
  gemini-cli:
    trigger: "/commit"
    description: "Generate commit message"
---

# Commit - Smart Commit Message Generator

## Objective
Generate a high-quality commit message following Conventional Commits format, then execute the commit.

## Process

### 1. Gather Context
```bash
# Check staged changes
git status

# View diff of staged changes
git diff --staged

# View recent commits for style reference
git log --oneline -5
```

### 2. Analyze Changes
- Identify type of change (feat, fix, docs, etc.)
- Determine scope (affected area)
- Understand the "why" behind changes
- Note any breaking changes

### 3. Generate Commit Message

#### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Types
| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no code change |
| `refactor` | Code restructure, no feature change |
| `perf` | Performance improvement |
| `test` | Adding tests |
| `build` | Build system or dependencies |
| `ci` | CI configuration |
| `chore` | Maintenance tasks |
| `revert` | Revert previous commit |

#### Rules
- Subject line: imperative mood, <50 chars, no period
- Body: explain "why", wrap at 72 chars
- Footer: reference issues, note breaking changes

### 4. Commit Message Template

```markdown
<type>(<scope>): <concise description>

<detailed explanation of why this change was made>
<what problem it solves>
<any important implementation details>

<footer with issue references or breaking changes>

Co-Authored-By: [AI Assistant] <noreply@anthropic.com>
```

### 5. Execute Commit
```bash
git commit -m "$(cat <<'EOF'
<commit message here>
EOF
)"
```

## Quality Checklist
- [ ] Type accurately describes change
- [ ] Scope is specific and relevant
- [ ] Subject is clear and concise
- [ ] Body explains "why" not "what"
- [ ] Breaking changes noted in footer
- [ ] Related issues referenced

## Examples

### Feature Commit
```
feat(auth): add OAuth2 authentication support

Implement OAuth2 authorization code flow for third-party login.
This enables users to sign in with Google, GitHub, or Microsoft
accounts, reducing friction in the onboarding process.

Closes #123
```

### Bug Fix Commit
```
fix(api): resolve null pointer in user endpoint

The /api/users/:id endpoint was throwing when user didn't exist.
Added proper null check and 404 response.

Fixes #456
```

### Refactor Commit
```
refactor(database): simplify query builder

Extract common query patterns into reusable functions.
No functional changes, purely structural improvements
to reduce code duplication.
```

## Tool-Specific Usage

### Cursor
```
/commit
```

### Claude Code
```
Generate a commit message for my staged changes
```

### Gemini CLI
```
/commit
```
