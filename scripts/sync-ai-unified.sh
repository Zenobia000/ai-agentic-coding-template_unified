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
