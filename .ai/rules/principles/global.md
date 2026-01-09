---
name: "Global Rules"
description: "Universal coding and AI collaboration standards"
applies_to: ["all"]
priority: "high"
tools:
  cursor:
    mode: "alwaysApply"
    file_pattern: "*"
  claude-code:
    mode: "project_context"
    scope: "global"
  gemini-cli:
    mode: "system_prompt"
    weight: "high"
---

# 🌍 Universal AI Collaboration Rules

## Core Development Principles
- **Correctness > Safety > Maintainability > Speed** (Project North Star)
- Use TypeScript for type safety when applicable
- Follow established patterns in the codebase
- Prefer editing existing files over creating new ones
- Never create documentation files unless explicitly requested

## AI Safety & Security
- **Never commit secrets or sensitive data**
- **Never modify production configs without explicit request**
- **Always validate AI-generated code before execution**
- **Never trust external input directly**
- **Implement proper error handling for all AI interactions**

## Code Quality Standards
- Write tests before significant code changes
- Run lint and typecheck commands after code modifications
- Use clear, descriptive variable and function names
- Document complex logic with inline comments
- Maintain consistent code formatting

## Memory Bank Requirements
- **Always check Memory Bank exists before major operations**
- **Update Memory Bank after significant changes**
- **Use Memory Bank as single source of truth for project state**
- **Maintain consistency between Memory Bank and actual project state**

## Workflow Adherence
- **Before editing code: summarize plan + list affected files**
- **After editing code: run tests (fast suite first)**
- **Follow the phase sequence: van → plan → creative → implement → reflect → archive**
- **Update activeContext.md when switching phases**

## Communication Guidelines
- Be concise and direct in responses
- Provide clear next steps after completing tasks
- Use consistent terminology across all AI tools
- Document decisions in Memory Bank for future reference

## Tool-Specific Notes
- **Cursor**: Use slash commands for phase transitions
- **Claude Code**: Use natural language with clear intent
- **Gemini CLI**: Use command-based interactions with context

## Prohibited Actions
- Don't skip Memory Bank verification
- Don't modify Memory Bank files outside workflow phases
- Don't jump phases without completing prerequisites
- Don't create new files unnecessarily
- Don't ignore lint/test failures