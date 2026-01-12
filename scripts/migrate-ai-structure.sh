#!/bin/bash

# 🏗️ AI Structure Migration Script
# Migrates to unified .ai directory structure

set -e

echo "🚀 Starting AI Structure Migration..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Backup current structure
echo -e "${YELLOW}📦 Creating backup...${NC}"
tar -czf ai-backup-$(date +%Y%m%d-%H%M%S).tar.gz .ai .claude .cursor .gemini 2>/dev/null || true
echo -e "${GREEN}✅ Backup created${NC}"

# Step 2: Reorganize .ai/adapters for Claude-specific features
echo -e "${YELLOW}🔄 Reorganizing Claude-specific features...${NC}"

# Move Claude-specific directories to adapters
if [ -d ".ai/agents" ] && [ ! -d ".ai/adapters/claude-code/agents" ]; then
    mkdir -p .ai/adapters/claude-code
    mv .ai/agents .ai/adapters/claude-code/
    echo "  ✓ Moved agents → adapters/claude-code/"
fi

if [ -d ".ai/hooks" ] && [ ! -d ".ai/adapters/claude-code/hooks" ]; then
    mkdir -p .ai/adapters/claude-code
    mv .ai/hooks .ai/adapters/claude-code/
    echo "  ✓ Moved hooks → adapters/claude-code/"
fi

if [ -d ".ai/output-styles" ] && [ ! -d ".ai/adapters/claude-code/output-styles" ]; then
    mkdir -p .ai/adapters/claude-code
    mv .ai/output-styles .ai/adapters/claude-code/
    echo "  ✓ Moved output-styles → adapters/claude-code/"
fi

if [ -d ".ai/skills" ] && [ ! -d ".ai/adapters/claude-code/skills" ]; then
    mkdir -p .ai/adapters/claude-code
    mv .ai/skills .ai/adapters/claude-code/
    echo "  ✓ Moved skills → adapters/claude-code/"
fi

# Step 3: Reorganize Cursor-specific features
echo -e "${YELLOW}🔄 Reorganizing Cursor-specific features...${NC}"

if [ -d ".ai/rules" ] && [ ! -d ".ai/adapters/cursor/rules" ]; then
    mkdir -p .ai/adapters/cursor
    mv .ai/rules .ai/adapters/cursor/
    echo "  ✓ Moved rules → adapters/cursor/"
fi

# Step 4: Create Gemini adapter directory
echo -e "${YELLOW}🔄 Setting up Gemini adapter...${NC}"
mkdir -p .ai/adapters/gemini-cli/converters

# Step 5: Create config file
echo -e "${YELLOW}📝 Creating configuration file...${NC}"
cat > .ai/config.yaml << 'EOF'
# AI Directory Configuration
version: "2.0"
structure_mode: "hierarchical"  # Options: "hierarchical" or "flat"

# Editor configurations
editors:
  claude-code:
    enabled: true
    features:
      - agents       # Sub-agents for complex tasks
      - hooks        # Event-triggered scripts
      - output-styles # Response formatting
      - skills       # Auto-triggered protections

  cursor:
    enabled: true
    features:
      - rules        # Cursor rules and guidelines
      - composer     # Composer-specific configs

  gemini-cli:
    enabled: true
    format: "toml"   # Output format for Gemini
    features:
      - converters   # MD to TOML conversion

# Sync settings
sync:
  auto_sync: true
  sync_on_change: false
  exclude_patterns:
    - "*.tmp"
    - "*.log"
    - ".DS_Store"
EOF
echo -e "${GREEN}✅ Configuration file created${NC}"

# Step 6: Update sync script to use new structure
echo -e "${YELLOW}📝 Creating enhanced sync script...${NC}"
cat > scripts/sync-ai-unified.sh << 'EOFSCRIPT'
#!/bin/bash

set -e

echo "🔄 Unified AI Structure Sync Starting..."

# Source directory (single source of truth)
SOURCE_DIR=".ai"

# Function to sync Claude Code
sync_claude() {
    echo "📝 Syncing to .claude..."
    mkdir -p .claude

    # Copy universal commands
    rsync -av --delete "$SOURCE_DIR/commands/" .claude/commands/

    # Copy Claude-specific features
    if [ -d "$SOURCE_DIR/adapters/claude-code" ]; then
        rsync -av "$SOURCE_DIR/adapters/claude-code/" .claude/
    fi

    echo "  ✓ Claude sync complete"
}

# Function to sync Cursor
sync_cursor() {
    echo "📝 Syncing to .cursor..."
    mkdir -p .cursor

    # Copy universal commands
    rsync -av --delete "$SOURCE_DIR/commands/" .cursor/commands/

    # Copy Cursor-specific features
    if [ -d "$SOURCE_DIR/adapters/cursor" ]; then
        rsync -av "$SOURCE_DIR/adapters/cursor/" .cursor/
    fi

    echo "  ✓ Cursor sync complete"
}

# Function to sync Gemini (with TOML conversion)
sync_gemini() {
    echo "📝 Syncing to .gemini (with TOML conversion)..."
    mkdir -p .gemini/commands

    # Python script for MD to TOML conversion
    python3 << 'EOF'
import os
import re
import yaml
from pathlib import Path

def md_to_toml(md_content, filename):
    """Convert markdown command to TOML format"""
    toml_lines = []

    # Split frontmatter and content
    if md_content.startswith('---'):
        parts = md_content.split('---', 2)
        if len(parts) >= 3:
            frontmatter = parts[1].strip()
            content = parts[2].strip()

            # Parse YAML frontmatter
            try:
                metadata = yaml.safe_load(frontmatter)
            except:
                metadata = {}
        else:
            content = md_content
            metadata = {}
    else:
        content = md_content
        metadata = {}

    # Extract title
    title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    title = metadata.get('name', title_match.group(1) if title_match else filename)

    # Extract description
    description = metadata.get('description', '')
    if not description:
        desc_match = re.search(r'^#[^\n]+\n\n([^\n]+)', content, re.MULTILINE)
        description = desc_match.group(1) if desc_match else ""

    # Build TOML
    toml_lines.append(f'name = "{filename}"')
    toml_lines.append(f'title = "{title}"')
    toml_lines.append(f'description = """{description}"""')
    toml_lines.append('')
    toml_lines.append('[prompts]')
    toml_lines.append(f'content = """')
    toml_lines.append(content)
    toml_lines.append('"""')

    return '\n'.join(toml_lines)

# Convert all commands
for md_file in Path('.ai/commands').rglob('*.md'):
    # Maintain directory structure
    relative_path = md_file.relative_to('.ai/commands')
    toml_dir = Path('.gemini/commands') / relative_path.parent
    toml_dir.mkdir(parents=True, exist_ok=True)

    toml_filename = md_file.stem + '.toml'
    toml_path = toml_dir / toml_filename

    md_content = md_file.read_text()
    toml_content = md_to_toml(md_content, md_file.stem)

    toml_path.write_text(toml_content)
    print(f"  ✓ {relative_path} → {relative_path.with_suffix('.toml')}")
EOF

    echo "  ✓ Gemini sync complete"
}

# Main sync execution
sync_claude
sync_cursor
sync_gemini

echo "✅ Unified AI Structure Sync Complete!"
echo ""
echo "Summary:"
echo "  • .ai/commands → All editors (universal commands)"
echo "  • .ai/adapters/claude-code → .claude/"
echo "  • .ai/adapters/cursor → .cursor/"
echo "  • .ai/commands → .gemini/ (TOML converted)"
EOFSCRIPT

chmod +x scripts/sync-ai-unified.sh
echo -e "${GREEN}✅ Enhanced sync script created${NC}"

# Step 7: Create README for new structure
echo -e "${YELLOW}📝 Creating structure documentation...${NC}"
cat > .ai/README.md << 'EOF'
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
EOF
echo -e "${GREEN}✅ Documentation created${NC}"

# Step 8: Update package.json scripts
echo -e "${YELLOW}📝 Updating package.json scripts...${NC}"
if [ -f "package.json" ]; then
    # Add new scripts using Node.js
    node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

    // Add new scripts
    pkg.scripts = pkg.scripts || {};
    pkg.scripts['sync-ai'] = 'bash scripts/sync-ai-unified.sh';
    pkg.scripts['migrate-ai-structure'] = 'bash scripts/migrate-ai-structure.sh';
    pkg.scripts['backup-ai'] = 'tar -czf ai-backup-\$(date +%Y%m%d-%H%M%S).tar.gz .ai .claude .cursor .gemini';

    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
    console.log('✅ package.json updated');
    "
fi

echo -e "${GREEN}🎉 Migration Complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Review the new structure in .ai/"
echo "2. Run 'npm run sync-ai' to sync all editors"
echo "3. Test commands in each editor"
echo ""
echo "Backup created: ai-backup-*.tar.gz"