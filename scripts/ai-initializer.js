#!/usr/bin/env node

/**
 * Universal AI Copilot Initializer
 *
 * Initializes the universal AI configuration and generates tool-specific configs
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Import Generators for internal use
const CursorGenerator = require('../.ai/adapters/cursor/generator.js');
const ClaudeCodeGenerator = require('../.ai/adapters/claude-code/generator.js');
const GeminiGenerator = require('../.ai/adapters/gemini-cli/generator.js');

class UniversalAIInitializer {
  constructor(projectRoot = process.cwd()) {
    this.projectRoot = projectRoot;
    this.configPath = path.join(projectRoot, '.ai', 'config.yaml');
  }

  /**
   * Check if universal config exists
   */
  hasUniversalConfig() {
    return fs.existsSync(this.configPath);
  }

  /**
   * Initialize .ai/ directory structure
   */
  initializeStructure() {
    console.log('📁 Creating universal AI structure...');

    const directories = [
      '.ai',
      '.ai/rules',
      '.ai/commands',
      '.ai/adapters',
      '.ai/adapters/cursor',
      '.ai/adapters/claude-code',
      '.ai/adapters/gemini-cli',
      'memory-bank'
    ];

    directories.forEach(dir => {
      const dirPath = path.join(this.projectRoot, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`  ✓ Created ${dir}/`);
      }
    });

    return true;
  }

  /**
   * Initialize Memory Bank if it doesn't exist
   */
  initializeMemoryBank() {
    console.log('🧠 Initializing Memory Bank...');

    const memoryBankPath = path.join(this.projectRoot, 'memory-bank');
    const coreFiles = {
      'tasks.md': this.getTasksTemplate(),
      'activeContext.md': this.getActiveContextTemplate(),
      'projectbrief.md': this.getProjectBriefTemplate(),
      'techContext.md': this.getTechContextTemplate()
    };

    Object.entries(coreFiles).forEach(([fileName, content]) => {
      const filePath = path.join(memoryBankPath, fileName);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
        console.log(`  ✓ Created ${fileName}`);
      }
    });

    return true;
  }

  // Template methods
  getTasksTemplate() {
    return `# Tasks\n\n## Current Sprint\n\n### 🎯 Active Tasks\n- [ ] Initialize universal AI copilot system\n\n### ⏳ Pending Tasks\n- [ ] Define project goals\n- [ ] Set up development environment\n\n### ✅ Completed Tasks\n- [x] Set up Memory Bank structure\n\n## Backlog\n\n### 🔮 Future Tasks\n- [ ] TBD based on project needs\n\n---\n\n**Last updated:** ${new Date().toISOString().split('T')[0]}\n**Phase:** VAN (Initialization)\n`;
  }

  getActiveContextTemplate() {
    return `# Active Context\n\n## Current Phase\n**VAN** - Project Initialization\n\n## Current Focus\nSetting up universal AI copilot system for seamless collaboration across different AI tools.\n\n## Recent Decisions\n- Adopted universal AI configuration system\n- Implemented tool-agnostic workflow phases\n- Created Memory Bank for persistent context\n\n## Current Work Items\n- [x] Initialize .ai/ directory structure\n- [x] Set up Memory Bank\n- [x] Generate tool-specific configurations\n- [ ] Define first project milestone\n\n## Blockers & Issues\nNone currently.\n\n## Next Steps\n1. Run /van command to initialize\n2. Define project goals in projectbrief.md\n3. Begin planning phase\n\n---\n\n**Last updated:** ${new Date().toISOString().split('T')[0]}\n`;
  }

  getProjectBriefTemplate() {
    return `# Project Brief\n\n## Project Overview\n**Name:** Universal AI Copilot Project\n**Type:** Development Workflow\n**Status:** Initializing\n\n## Objectives\n- [ ] Define primary project goals\n- [ ] Establish technical requirements\n- [ ] Set up development workflow\n\n## Success Criteria\n- Clear project definition\n- Functional development environment\n- Established AI collaboration workflow\n\n## Scope\n### In Scope\n- TBD - to be defined during planning phase\n\n### Out of Scope\n- TBD - to be defined during planning phase\n\n## Stakeholders\n- Development team\n- AI collaboration workflow\n\n## Timeline\n**Phase:** Initial setup\n**Duration:** TBD\n\n---\n\n**Created:** ${new Date().toISOString().split('T')[0]}\n**Phase:** VAN (Initialization)\n\n> **Note:** This is a template. Update this file with your actual project details during the planning phase.\n`;
  }

  getTechContextTemplate() {
    return `# Technical Context\n\n## Technology Stack\n- **Configuration:** YAML, Markdown\n- **Automation:** Node.js, Shell scripting\n- **AI Tools:** Cursor, Claude Code, Gemini CLI\n- **Documentation:** Markdown\n\n## Architecture\n- Universal AI configuration system (.ai/)\n- Memory Bank for persistent context\n- Tool-specific adapters for seamless integration\n\n## Development Environment\n- Node.js for configuration generation\n- Shell scripts for automation\n- Markdown for documentation\n\n## Dependencies\n- js-yaml for YAML processing\n- Node.js built-in modules\n- Tool-specific configurations\n\n## Deployment\n- Configuration files committed to repository\n- Tool-specific files generated automatically\n- Environment setup scripts for each tool\n\n---\n\n**Last updated:** ${new Date().toISOString().split('T')[0]}\n**System version:** Universal AI v1.0\n`;
  }
}

module.exports = UniversalAIInitializer;
