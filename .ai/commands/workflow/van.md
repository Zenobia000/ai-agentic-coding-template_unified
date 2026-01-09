---
name: "VAN - Initialize"
description: "Initialize or verify project memory structure"
phase: "setup"
prerequisites: []
creates: ["memory-bank/", "tasks.md", "activeContext.md", "projectbrief.md"]
tools:
  cursor:
    trigger: "/van"
    description: "VAN MODE - Initializes project's shared memory structure"
  claude-code:
    trigger: ["/van", "initialize", "setup memory bank", "init project"]
    description: "Initialize the project memory structure"
  gemini-cli:
    trigger: "/van"
    description: "Initialize project with memory bank"
---

# 🚀 VAN MODE - Universal Project Initialization

## Objective
Initialize the Memory Bank structure for consistent AI collaboration across all tools.
This is the foundational step that enables all subsequent workflow phases.

## Process

### 1. Health Check (State Diagnosis)
- **Check `memory-bank/` directory**: Verify existence and structure
- **Check core files**: Validate presence of essential files:
  - `tasks.md` (task management)
  - `activeContext.md` (current focus)
  - `projectbrief.md` (project overview)
  - `techContext.md` (technology stack)
- **Check permissions**: Ensure AI can read/write to memory bank

### 2. Memory Bank Creation/Repair
If components are missing:
- Create `memory-bank/` directory
- Generate core template files
- Initialize with basic project structure
- Set appropriate file permissions

### 3. Tool-Specific Configuration
Generate configurations for the active AI tool:

#### For Cursor
- Update `.cursorrules` with project context
- Ensure `.cursor/` structure is compatible
- Sync memory bank references

#### For Claude Code
- Update `CLAUDE.md` with project instructions
- Add memory bank paths to project context
- Include workflow phase information

#### For Gemini CLI
- Create/update `.geminirc` configuration
- Set memory bank environment variables
- Configure command aliases

### 4. Validation
- Verify all core files exist and are readable
- Test memory bank accessibility
- Confirm tool-specific configurations loaded correctly

## Success Criteria
- [ ] Memory Bank directory structure complete
- [ ] All core files present and properly formatted
- [ ] Tool-specific configurations generated/updated
- [ ] AI can read and write to all memory bank files
- [ ] Project context properly loaded

## Next Steps
After successful initialization:
1. **Primary**: Execute `/plan` or equivalent to begin task breakdown
2. **Alternative**: Execute `/task-init` to define first high-level objective
3. **Recovery**: If restoring existing project, use `/task-next` to continue

## Error Handling
If initialization fails:
- Check file system permissions
- Verify disk space availability
- Ensure parent directory is writable
- Review tool-specific configuration requirements

## Tool-Specific Usage

All tools use the same command:
```
/van
```

---

> **VAN MODE activated. Checking Memory Bank status and preparing initialization...**