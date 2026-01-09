#!/usr/bin/env node

/**
 * Cursor Configuration Generator
 *
 * Generates .cursorrules and .cursor/ structure from universal AI config
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class CursorGenerator {
  constructor(projectRoot = process.cwd()) {
    this.projectRoot = projectRoot;
    this.configPath = path.join(projectRoot, '.ai', 'config.yaml');
    this.cursorRulesPath = path.join(projectRoot, '.cursorrules');
    this.cursorMdPath = path.join(projectRoot, 'CURSOR.md');
    this.cursorDirPath = path.join(projectRoot, '.cursor');
  }

  /**
   * Load universal AI configuration
   */
  loadConfig() {
    try {
      const configContent = fs.readFileSync(this.configPath, 'utf8');
      return yaml.load(configContent);
    } catch (error) {
      console.error('Failed to load .ai/config.yaml:', error.message);
      return null;
    }
  }

  /**
   * Load universal rules from .ai/rules/
   */
  loadUniversalRules() {
    const rulesPath = path.join(this.projectRoot, '.ai', 'rules');
    const rules = {};

    try {
      const ruleFiles = fs.readdirSync(rulesPath).filter(file => file.endsWith('.md'));

      ruleFiles.forEach(file => {
        const filePath = path.join(rulesPath, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const ruleName = path.basename(file, '.md');
        rules[ruleName] = this.parseRuleFile(content);
      });

      return rules;
    } catch (error) {
      console.warn('Warning: Could not load universal rules:', error.message);
      return {};
    }
  }

  /**
   * Parse rule file with frontmatter
   */
  parseRuleFile(content) {
    const frontmatterRegex = /^---\n(.*?)\n---\n(.*)/s;
    const match = content.match(frontmatterRegex);

    if (match) {
      try {
        const frontmatter = yaml.load(match[1]);
        const body = match[2];
        return { metadata: frontmatter, content: body };
      } catch (error) {
        console.warn('Failed to parse frontmatter:', error.message);
        return { metadata: {}, content: content };
      }
    }

    return { metadata: {}, content: content };
  }

  /**
   * Generate .cursorrules file
   */
  generateCursorRules() {
    const config = this.loadConfig();
    const rules = this.loadUniversalRules();

    if (!config) return false;

    let cursorRulesContent = this.buildCursorRulesHeader(config);

    // Add rules converted to Cursor format
    Object.entries(rules).forEach(([ruleName, rule]) => {
      if (rule.metadata && rule.metadata.tools && rule.metadata.tools.cursor) {
        cursorRulesContent += this.convertRuleToCursor(rule);
      }
    });

    try {
      fs.writeFileSync(this.cursorRulesPath, cursorRulesContent);
      console.log('✅ Generated .cursorrules');
      return true;
    } catch (error) {
      console.error('Failed to write .cursorrules:', error.message);
      return false;
    }
  }

  /**
   * Build header for .cursorrules
   */
  buildCursorRulesHeader(config) {
    return `# ${config.project.name}

## System Overview

This project uses the **Universal AI Workflow System** with Memory Bank for phased development workflow.

**Core Principle**: Memory Bank MUST be created and verified before any operations.

## Project Information
- Type: ${config.project.type}
- Tech Stack: ${config.project.tech_stack.join(', ')}
- Description: ${config.project.description}

## Available Slash Commands

### Workflow Commands (Phase Sequence)

\`\`\`
/van → /plan → /creative → /implement → /reflect → /archive
\`\`\`

| Command | Description |
|---------|-------------|
| \`/van\` | Initialize project with Memory Bank creation |
| \`/plan\` | Task planning and WBS breakdown |
| \`/creative\` | Design decisions and architecture planning |
| \`/implement\` | Code implementation with progress tracking |
| \`/reflect\` | Task review and retrospective |
| \`/archive\` | Documentation and knowledge preservation |

## Memory Bank Structure

\`\`\`
${config.defaults.memory_bank_path}/
├── tasks.md           # Source of truth for all tasks
├── activeContext.md   # Current focus and active work
├── progress.md        # Implementation status
├── projectbrief.md    # Project overview and goals
├── techContext.md     # Technology stack and constraints
├── systemPatterns.md  # Architecture patterns and decisions
└── runbook.md         # Operational procedures
\`\`\`

**If Memory Bank doesn't exist:**
- STOP all operations immediately
- Run \`/van\` command to initialize
- Wait for verification before proceeding

## AI Behavior Guidelines

### When User Runs Slash Commands

1. **Verify Memory Bank first**
   - Check if \`${config.defaults.memory_bank_path}/\` directory exists
   - Verify required files are present
   - If missing, guide user to run \`/van\`

2. **Read relevant context**
   - Load tasks.md for current task list
   - Load activeContext.md for current focus
   - Load relevant files for design context

3. **Execute phase-specific responsibilities**
   - Follow command definition in \`.ai/commands/[command].md\`
   - Create/update required Memory Bank files
   - Provide clear next steps

4. **Document actions**
   - Update Memory Bank files with changes
   - Suggest next command in workflow

---

# Universal AI Rules (Generated from .ai/rules/)

`;
  }

  /**
   * Convert universal rule to Cursor format
   */
  convertRuleToCursor(rule) {
    const metadata = rule.metadata;
    const cursorConfig = metadata.tools?.cursor || {};

    let cursorRule = `\n## ${metadata.name || 'Rule'}\n\n`;

    // Add description if available
    if (metadata.description) {
      cursorRule += `> ${metadata.description}\n\n`;
    }

    // Convert content
    cursorRule += rule.content;

    // Add Cursor-specific configuration comments
    if (cursorConfig.mode) {
      cursorRule += `\n\n<!-- Cursor Mode: ${cursorConfig.mode} -->`;
    }

    if (cursorConfig.file_pattern) {
      cursorRule += `\n<!-- File Pattern: ${cursorConfig.file_pattern} -->`;
    }

    cursorRule += '\n\n---\n';

    return cursorRule;
  }

  /**
   * Generate .cursor/ directory structure
   */
  generateCursorDirectory() {
    const config = this.loadConfig();
    if (!config) return false;

    // Ensure .cursor directory exists
    if (!fs.existsSync(this.cursorDirPath)) {
      fs.mkdirSync(this.cursorDirPath, { recursive: true });
    }

    // Create commands subdirectory
    const commandsDir = path.join(this.cursorDirPath, 'commands');
    if (!fs.existsSync(commandsDir)) {
      fs.mkdirSync(commandsDir);
    }

    // Create rules subdirectory
    const rulesDir = path.join(this.cursorDirPath, 'rules');
    if (!fs.existsSync(rulesDir)) {
      fs.mkdirSync(rulesDir);
    }

    // Copy/convert commands from .ai/commands/
    this.copyCommands(commandsDir);

    console.log('✅ Generated .cursor/ directory structure');
    return true;
  }

  /**
   * Copy and convert commands to Cursor format
   */
  copyCommands(commandsDir) {
    const universalCommandsDir = path.join(this.projectRoot, '.ai', 'commands');

    try {
      const commandFiles = fs.readdirSync(universalCommandsDir).filter(file => file.endsWith('.md'));

      commandFiles.forEach(file => {
        const sourcePath = path.join(universalCommandsDir, file);
        const targetPath = path.join(commandsDir, file);

        const content = fs.readFileSync(sourcePath, 'utf8');
        const convertedContent = this.convertCommandToCursor(content);

        fs.writeFileSync(targetPath, convertedContent);
      });

      console.log(`✅ Converted ${commandFiles.length} commands for Cursor`);
    } catch (error) {
      console.warn('Warning: Could not copy commands:', error.message);
    }
  }

  /**
   * Convert universal command to Cursor slash command format
   */
  convertCommandToCursor(content) {
    // Parse frontmatter and extract Cursor-specific configuration
    const frontmatterRegex = /^---\n(.*?)\n---\n(.*)/s;
    const match = content.match(frontmatterRegex);

    if (match) {
      try {
        const frontmatter = yaml.load(match[1]);
        const body = match[2];

        const cursorConfig = frontmatter.tools?.cursor || {};

        // Build Cursor-specific command format
        let cursorCommand = `---\ndescription: ${cursorConfig.description || frontmatter.description}\n---\n\n`;
        cursorCommand += body;

        return cursorCommand;
      } catch (error) {
        console.warn('Failed to parse command frontmatter:', error.message);
      }
    }

    return content;
  }

  /**
   * Generate all Cursor configurations
   */
  generateAll() {
    console.log('🎯 Generating Cursor configurations...');

    const rulesSuccess = this.generateCursorRules();
    const dirSuccess = this.generateCursorDirectory();

    if (rulesSuccess && dirSuccess) {
      console.log('✅ Cursor configuration complete');
      return true;
    } else {
      console.error('❌ Cursor configuration failed');
      return false;
    }
  }
}

// CLI execution
if (require.main === module) {
  const generator = new CursorGenerator();
  const success = generator.generateAll();
  process.exit(success ? 0 : 1);
}

module.exports = CursorGenerator;