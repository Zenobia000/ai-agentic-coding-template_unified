# 🏗️ Unified .ai Directory Structure Proposal

## 📋 Current Situation Analysis

### Problems:
1. **Claude Code** has complex structure: agents, commands, hooks, output-styles, skills
2. **Cursor** has simpler structure: mainly commands
3. **Gemini** needs TOML format conversion
4. **Duplication** between .ai/ and editor-specific directories

## 🎯 Proposed Unified Structure

```
.ai/                          # Single Source of Truth
├── commands/                 # Universal commands (all editors use)
│   ├── system/              # Git, commit, PR workflows
│   ├── utility/             # Debug, review, test utilities
│   └── workflow/            # Project workflows
│
├── adapters/                # Editor-specific configurations
│   ├── claude-code/         # Claude-specific features
│   │   ├── agents/          # Sub-agents for complex tasks
│   │   ├── hooks/           # Event-triggered scripts
│   │   ├── output-styles/   # Response formatting
│   │   └── skills/          # Auto-triggered protections
│   │
│   ├── cursor/              # Cursor-specific features
│   │   ├── rules/           # Cursor rules and guidelines
│   │   └── composer/        # Composer-specific configs
│   │
│   └── gemini-cli/          # Gemini-specific features
│       └── converters/      # MD to TOML conversion scripts
│
├── template/                # Shared templates and outputs
│   ├── outputs/            # Standard output templates
│   └── guides/             # Implementation guides
│
├── schemas/                # Configuration schemas
└── memory-bank/           # Project memory (moved here)
    ├── activeContext.md
    ├── decisions/
    ├── designs/
    └── metrics/
```

## 🔄 Synchronization Strategy

### Three-Layer Architecture:

1. **Core Layer** (`.ai/commands/`)
   - Universal commands that work across all editors
   - Written in Markdown with YAML frontmatter
   - Single source of truth

2. **Adapter Layer** (`.ai/adapters/`)
   - Editor-specific features and configurations
   - Handles format conversions (e.g., MD to TOML for Gemini)
   - Contains editor-unique capabilities

3. **Distribution Layer** (`.cursor/`, `.claude/`, `.gemini/`)
   - Auto-generated from Core + Adapter layers
   - Never edited directly
   - Synced via `sync-commands.sh` script

## 📦 Implementation Plan

### Phase 1: Restructure .ai Directory
```bash
# Move editor-specific features to adapters
mv .ai/agents .ai/adapters/claude-code/
mv .ai/hooks .ai/adapters/claude-code/
mv .ai/output-styles .ai/adapters/claude-code/
mv .ai/skills .ai/adapters/claude-code/

# Move rules to cursor adapter
mv .ai/rules .ai/adapters/cursor/

# Keep universal items at root
# .ai/commands (stays)
# .ai/template (stays)
# .ai/schemas (stays)
```

### Phase 2: Update Sync Script
```bash
# Enhanced sync-commands.sh logic:
# 1. Copy .ai/commands/* → all editors
# 2. Copy .ai/adapters/claude-code/* → .claude/
# 3. Copy .ai/adapters/cursor/* → .cursor/
# 4. Convert and copy to .gemini/ with TOML format
```

### Phase 3: Configuration Files

#### `.ai/config.yaml` (Main Configuration)
```yaml
version: "2.0"
structure_mode: "hierarchical"  # or "flat"
editors:
  claude-code:
    enabled: true
    features: ["agents", "hooks", "output-styles", "skills"]
  cursor:
    enabled: true
    features: ["rules", "composer"]
  gemini-cli:
    enabled: true
    format: "toml"
```

## 🎯 Benefits

1. **Single Source of Truth**: All commands in `.ai/commands/`
2. **No Duplication**: Editor directories are generated, not maintained
3. **Clear Separation**: Core vs editor-specific features
4. **Easy Maintenance**: Update once in `.ai/`, sync to all
5. **Extensibility**: Easy to add new editors or features

## 🚀 Migration Commands

```bash
# Step 1: Backup current structure
tar -czf ai-backup.tar.gz .ai .claude .cursor .gemini

# Step 2: Run migration script
npm run migrate-ai-structure

# Step 3: Verify and sync
npm run sync-commands

# Step 4: Test each editor
# - Open Claude Code and test commands
# - Open Cursor and test commands
# - Test Gemini CLI commands
```

## 📝 File Naming Conventions

### Commands (`.ai/commands/`)
- Use kebab-case: `review-code.md`, `task-start.md`
- Include frontmatter with metadata
- Clear, action-oriented names

### Adapters (`.ai/adapters/`)
- Editor-specific features keep original naming
- Documentation in each adapter directory

### Memory Bank (`.ai/memory-bank/`)
- Consolidated project memory
- Accessible to all editors
- Version controlled

## 🔍 Validation

After implementation, each editor should:
1. ✅ Access all universal commands
2. ✅ Use their specific features
3. ✅ Share the same memory bank
4. ✅ Stay in sync automatically

## 📊 Comparison Table

| Feature | Current | Proposed |
|---------|---------|----------|
| Command Location | Multiple copies | Single source in `.ai/commands/` |
| Editor Features | Mixed in `.ai/` | Organized in `.ai/adapters/` |
| Synchronization | Manual/Complex | Automated via adapters |
| Memory Bank | Separate | Unified in `.ai/memory-bank/` |
| Maintenance | High effort | Low effort |

---

**Next Steps**:
1. Review and approve this proposal
2. Create migration script
3. Test with all three editors
4. Document the new structure