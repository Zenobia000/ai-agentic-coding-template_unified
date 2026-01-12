# 🏗️ Unified AI Directory Structure

## Overview
This directory contains the unified configuration for all AI-powered code editors:
- Claude Code
- Cursor
- Gemini CLI

## Structure

```
.ai/
├── commands/           # Universal commands (all editors)
├── adapters/          # Editor-specific features
│   ├── claude-code/   # Claude-specific
│   ├── cursor/        # Cursor-specific
│   └── gemini-cli/    # Gemini-specific
├── template/          # Shared templates
├── schemas/           # Configuration schemas
└── config.yaml        # Main configuration
```

## Key Principles

1. **Single Source of Truth**: All universal commands in `.ai/commands/`
2. **No Duplication**: Editor directories are auto-generated
3. **Clear Separation**: Core features vs editor-specific
4. **Automatic Sync**: Use `npm run sync-ai` to update all editors

## Usage

### Adding a New Command
1. Create the command in `.ai/commands/[category]/`
2. Run `npm run sync-ai`
3. Command is now available in all editors

### Adding Editor-Specific Feature
1. Add to `.ai/adapters/[editor-name]/`
2. Run `npm run sync-ai`
3. Feature is synced to that specific editor

## Sync Command
```bash
npm run sync-ai  # Syncs all editors
```

## Migration
If upgrading from old structure:
```bash
npm run migrate-ai-structure
```
