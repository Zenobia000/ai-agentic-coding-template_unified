#!/bin/bash
# Sync commands from .ai/commands to all editor-specific directories

set -e

echo "🔄 Syncing commands from .ai/commands to editor directories..."

# Source directory
SOURCE_DIR=".ai/commands"

# Sync to Cursor (maintains directory structure)
echo "📝 Syncing to .cursor/commands..."
mkdir -p .cursor/commands
rsync -av --delete "$SOURCE_DIR/" .cursor/commands/

# Sync to Claude (flattens structure to single directory)
echo "📝 Syncing to .claude/commands..."
mkdir -p .claude/commands
# Clear existing commands (except non-.ai ones like github.md if exists)
find .claude/commands -name "*.md" -type f -delete 2>/dev/null || true
# Copy all commands from subdirectories
find "$SOURCE_DIR" -name "*.md" -type f -exec cp {} .claude/commands/ \;

# Sync to Gemini (convert to TOML format)
echo "📝 Converting and syncing to .gemini/commands..."
mkdir -p .gemini/commands

# Python script to convert MD to TOML
cat << 'EOF' | python3
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

# Clear existing TOML files
for toml_file in Path('.gemini/commands').glob('*.toml'):
    toml_file.unlink()

# Convert all .ai/commands files
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
echo "  • .cursor/commands: Full directory structure maintained"
echo "  • .claude/commands: Flattened to single directory"
echo "  • .gemini/commands: Converted to TOML format"