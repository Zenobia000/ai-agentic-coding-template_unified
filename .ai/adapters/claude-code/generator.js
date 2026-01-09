#!/usr/bin/env node

/**
 * Claude Code Configuration Generator
 *
 * Generates CLAUDE.md and updates project context for Claude Code integration
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class ClaudeCodeGenerator {
  constructor(projectRoot = process.cwd()) {
    this.projectRoot = projectRoot;
    this.configPath = path.join(projectRoot, '.ai', 'config.yaml');
    this.claudePath = path.join(projectRoot, 'CLAUDE.md');
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
   * Generate CLAUDE.md with project context
   */
  generateClaudeConfig() {
    const config = this.loadConfig();
    if (!config) return false;

    const claudeContent = this.buildClaudeContent(config);

    try {
      fs.writeFileSync(this.claudePath, claudeContent);
      console.log('✅ Generated CLAUDE.md');
      return true;
    } catch (error) {
      console.error('Failed to write CLAUDE.md:', error.message);
      return false;
    }
  }

  /**
   * Build CLAUDE.md content from universal config
   */
  buildClaudeContent(config) {
    return `# Project Operating Rules

## North Star
- Prioritize: correctness > safety > maintainability > speed.

## Workflow defaults
- Before editing code: summarize plan + list affected files.
- After editing code: run tests (fast suite first).
- Never commit secrets; never modify production configs without explicit request.

## Project Information
- Name: ${config.project.name}
- Type: ${config.project.type}
- Tech Stack: ${config.project.tech_stack.join(', ')}
- Description: ${config.project.description}

## Memory Bank System
- Path: ${config.defaults.memory_bank_path}
- Required files: tasks.md, activeContext.md, projectbrief.md, techContext.md
- Always verify Memory Bank exists before major operations
- Update Memory Bank after significant changes

## Workflow Phases
${config.workflow.phases.map(phase => `- **${phase}**: ${this.getPhaseDescription(phase)}`).join('\n')}

## Commands
- \`/commit\`: Generate a high-quality commit message.
- \`/resume\`: Resume context from active state.
- \`/init\`: Initialize new project context.

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.

## AI Tool Integration
This project supports multiple AI tools through the universal .ai/ configuration system:
- Current tool: Claude Code
- Configuration files: CLAUDE.md (this file)
- Command prefix: Natural language or "ai [command]"
- Rules path: ${config.defaults.rules_path}
- Commands path: ${config.defaults.commands_path}

For tool-specific commands, refer to .ai/commands/ directory.
`;
  }

  /**
   * Get description for workflow phases
   */
  getPhaseDescription(phase) {
    const descriptions = {
      van: 'Initialize or verify project memory structure',
      plan: 'Task planning and breakdown',
      creative: 'Design decisions and architecture planning',
      implement: 'Code implementation with progress tracking',
      reflect: 'Task review and retrospective',
      archive: 'Documentation and knowledge preservation'
    };
    return descriptions[phase] || 'Custom workflow phase';
  }

  /**
   * Update project context for Claude Code
   */
  updateProjectContext() {
    const config = this.loadConfig();
    if (!config) return false;

    // Load existing Memory Bank files for context
    const memoryBankPath = path.join(this.projectRoot, config.defaults.memory_bank_path);
    const contextFiles = ['tasks.md', 'activeContext.md', 'projectbrief.md'];

    let contextData = {};

    contextFiles.forEach(file => {
      const filePath = path.join(memoryBankPath, file);
      if (fs.existsSync(filePath)) {
        try {
          contextData[file] = fs.readFileSync(filePath, 'utf8');
        } catch (error) {
          console.warn(`Warning: Could not read ${file}:`, error.message);
        }
      }
    });

    // Store context data for Claude Code to reference
    const contextPath = path.join(this.projectRoot, '.ai', 'claude-context.json');
    try {
      fs.writeFileSync(contextPath, JSON.stringify(contextData, null, 2));
      console.log('✅ Updated Claude Code project context');
      return true;
    } catch (error) {
      console.error('Failed to write Claude context:', error.message);
      return false;
    }
  }

  /**
   * Generate all Claude Code configurations
   */
  generateAll() {
    console.log('🤖 Generating Claude Code configurations...');

    const claudeSuccess = this.generateClaudeConfig();
    const contextSuccess = this.updateProjectContext();

    if (claudeSuccess && contextSuccess) {
      console.log('✅ Claude Code configuration complete');
      return true;
    } else {
      console.error('❌ Claude Code configuration failed');
      return false;
    }
  }
}

// CLI execution
if (require.main === module) {
  const generator = new ClaudeCodeGenerator();
  const success = generator.generateAll();
  process.exit(success ? 0 : 1);
}

module.exports = ClaudeCodeGenerator;