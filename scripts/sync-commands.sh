#!/bin/bash
# Sync commands from .ai/commands to all editor-specific directories

set -e

echo "🔄 Syncing commands from .ai/commands to editor directories..."

# Source directory
SOURCE_DIR=".ai/commands"

# Option 1: Maintain directory structure for all (DEFAULT)
# Option 2: Flatten structure for all
# You can change STRUCTURE_MODE to "flat" if you prefer flat structure
STRUCTURE_MODE="hierarchical"  # Options: "hierarchical" or "flat"

if [ "$STRUCTURE_MODE" = "hierarchical" ]; then
    # Sync to Cursor (maintains directory structure)
    echo "📝 Syncing to .cursor/commands (hierarchical)..."
    mkdir -p .cursor/commands
    rsync -av --delete "$SOURCE_DIR/" .cursor/commands/

    # Sync to Claude (maintains directory structure)
    echo "📝 Syncing to .claude/commands (hierarchical)..."
    mkdir -p .claude/commands/{system,utility,workflow}
    # Clear and copy maintaining structure
    rm -rf .claude/commands/*.md 2>/dev/null || true
    rsync -av --delete "$SOURCE_DIR/" .claude/commands/

    # Sync to Gemini (maintains directory structure, convert to TOML)
    echo "📝 Converting and syncing to .gemini/commands (hierarchical)..."
    mkdir -p .gemini/commands/{system,utility,workflow}
    # Clear old flat TOML files
    rm -f .gemini/commands/*.toml 2>/dev/null || true
else
    # Flat structure mode (original behavior)
    echo "📝 Syncing to .cursor/commands (flat)..."
    mkdir -p .cursor/commands
    # Clear and flatten
    rm -rf .cursor/commands/{system,utility,workflow} 2>/dev/null || true
    find "$SOURCE_DIR" -name "*.md" -type f -exec cp {} .cursor/commands/ \;

    # Sync to Claude (flattens structure to single directory)
    echo "📝 Syncing to .claude/commands (flat)..."
    mkdir -p .claude/commands
    rm -rf .claude/commands/{system,utility,workflow} 2>/dev/null || true
    find .claude/commands -name "*.md" -type f -delete 2>/dev/null || true
    find "$SOURCE_DIR" -name "*.md" -type f -exec cp {} .claude/commands/ \;

    # Sync to Gemini (flat structure, convert to TOML)
    echo "📝 Converting and syncing to .gemini/commands (flat)..."
    mkdir -p .gemini/commands
    rm -rf .gemini/commands/{system,utility,workflow} 2>/dev/null || true
fi

# Python script to convert MD to TOML
STRUCTURE_MODE=$STRUCTURE_MODE cat << 'EOF' | python3
import os
import re
from pathlib import Path

def md_to_toml(md_content, filename):
    """Convert markdown command to TOML format"""
    import yaml
    toml_lines = []

    # Extract command name from filename
    command_name = filename.replace('.md', '')

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

    # Extract title from first heading if not in metadata
    title = metadata.get('name', command_name)
    if not title and '#' in content:
        title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
        title = title_match.group(1) if title_match else command_name

    # Extract description from metadata or content
    description = metadata.get('description', '')
    if not description:
        # Try to get first paragraph after heading
        desc_match = re.search(r'^#[^\n]+\n\n([^\n]+)', content, re.MULTILINE)
        description = desc_match.group(1) if desc_match else ""

    # Build TOML
    toml_lines.append(f'name = "{command_name}"')
    toml_lines.append(f'title = "{title}"')
    toml_lines.append(f'description = """{description}"""')
    toml_lines.append('')
    toml_lines.append('[prompts]')
    toml_lines.append(f'content = """')
    toml_lines.append(content)  # Use content without frontmatter
    toml_lines.append('"""')

    return '\n'.join(toml_lines)

import sys

# Check structure mode from environment
structure_mode = os.environ.get('STRUCTURE_MODE', 'hierarchical')

if structure_mode == 'hierarchical':
    # Clear old flat TOML files first
    for toml_file in Path('.gemini/commands').glob('*.toml'):
        toml_file.unlink()

    # Convert maintaining directory structure
    for md_file in Path('.ai/commands').rglob('*.md'):
        # Get relative path to maintain structure
        rel_path = md_file.relative_to(Path('.ai/commands'))
        toml_filename = rel_path.with_suffix('.toml')
        toml_path = Path('.gemini/commands') / toml_filename

        # Ensure subdirectory exists
        toml_path.parent.mkdir(parents=True, exist_ok=True)

        md_content = md_file.read_text()
        toml_content = md_to_toml(md_content, md_file.stem)

        toml_path.write_text(toml_content)
        print(f"  ✓ {rel_path} → {toml_filename}")
else:
    # Flat structure mode
    # Clear any hierarchical structure first
    for subdir in ['system', 'utility', 'workflow']:
        subdir_path = Path('.gemini/commands') / subdir
        if subdir_path.exists():
            import shutil
            shutil.rmtree(subdir_path)

    # Clear existing TOML files
    for toml_file in Path('.gemini/commands').glob('*.toml'):
        toml_file.unlink()

    # Convert all to flat structure
    for md_file in Path('.ai/commands').rglob('*.md'):
        toml_filename = md_file.stem + '.toml'
        toml_path = Path('.gemini/commands') / toml_filename

        md_content = md_file.read_text()
        toml_content = md_to_toml(md_content, md_file.stem)

        toml_path.write_text(toml_content)
        print(f"  ✓ {md_file.stem}.md → {toml_filename}")
EOF

echo "✅ Command sync completed!"
echo ""
echo "Summary:"
if [ "$STRUCTURE_MODE" = "hierarchical" ]; then
    echo "  • Structure mode: HIERARCHICAL (system/, utility/, workflow/)"
    echo "  • .cursor/commands: Full directory structure maintained"
    echo "  • .claude/commands: Full directory structure maintained"
    echo "  • .gemini/commands: Full directory structure with TOML format"
else
    echo "  • Structure mode: FLAT (all commands in one directory)"
    echo "  • .cursor/commands: Flattened to single directory"
    echo "  • .claude/commands: Flattened to single directory"
    echo "  • .gemini/commands: Flattened to single directory with TOML format"
fi