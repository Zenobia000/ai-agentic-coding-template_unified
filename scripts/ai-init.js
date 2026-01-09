#!/usr/bin/env node

/**
 * Universal AI Copilot Initializer
 *
 * Initializes the universal AI configuration and generates tool-specific configs
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Import adapters
const CursorGenerator = require('../.ai/adapters/cursor/generator.js');
const ClaudeCodeGenerator = require('../.ai/adapters/claude-code/generator.js');
const GeminiGenerator = require('../.ai/adapters/gemini-cli/generator.js');

class UniversalAIInitializer {
  constructor(projectRoot = process.cwd()) {
    this.projectRoot = projectRoot;
    this.configPath = path.join(projectRoot, '.ai', 'config.yaml');
  }

  /**
   * Interactive tool selection
   */
  async selectPrimaryTool() {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      console.log('\n🤖 Universal AI Copilot Setup');
      console.log('════════════════════════════\n');
      console.log('Which AI tool do you primarily use?');
      console.log('1) Cursor');
      console.log('2) Claude Code');
      console.log('3) Gemini CLI');
      console.log('4) Generate all (multi-tool setup)');

      readline.question('\nEnter your choice (1-4): ', (answer) => {
        readline.close();

        const choices = {
          '1': 'cursor',
          '2': 'claude-code',
          '3': 'gemini-cli',
          '4': 'all'
        };

        resolve(choices[answer] || 'all');
      });
    });
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
      } else {
        console.log(`  ⚠ ${dir}/ already exists`);
      }
    });

    return true;
  }

  /**
   * Copy universal templates if they don't exist
   */
  copyTemplates() {
    console.log('📄 Setting up universal templates...');

    // Check if we already have the template files
    const templatePath = path.join(this.projectRoot, '.ai');
    const hasTemplates = fs.existsSync(path.join(templatePath, 'config.yaml'));

    if (!hasTemplates) {
      console.log('  ⚠ Templates not found. Please ensure .ai/ directory has the template files.');
      return false;
    }

    console.log('  ✓ Universal templates ready');
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
      } else {
        console.log(`  ⚠ ${fileName} already exists`);
      }
    });

    return true;
  }

  /**
   * Generate tool-specific configurations
   */
  async generateToolConfigs(tool) {
    console.log(`🔧 Generating ${tool} configurations...`);

    try {
      switch (tool) {
        case 'cursor':
          const cursorGen = new CursorGenerator(this.projectRoot);
          return cursorGen.generateAll();

        case 'claude-code':
          const claudeGen = new ClaudeCodeGenerator(this.projectRoot);
          return claudeGen.generateAll();

        case 'gemini-cli':
          const geminiGen = new GeminiGenerator(this.projectRoot);
          return geminiGen.generateAll();

        case 'all':
          const cursor = new CursorGenerator(this.projectRoot);
          const claude = new ClaudeCodeGenerator(this.projectRoot);
          const gemini = new GeminiGenerator(this.projectRoot);

          const cursorSuccess = cursor.generateAll();
          const claudeSuccess = claude.generateAll();
          const geminiSuccess = gemini.generateAll();

          return cursorSuccess && claudeSuccess && geminiSuccess;

        default:
          console.error(`Unknown tool: ${tool}`);
          return false;
      }
    } catch (error) {
      console.error(`Failed to generate ${tool} configs:`, error.message);
      return false;
    }
  }

  /**
   * Verify setup
   */
  verifySetup(tool) {
    console.log('\n🔍 Verifying setup...');

    const checks = [
      { name: 'Universal config', path: '.ai/config.yaml' },
      { name: 'Memory Bank', path: 'memory-bank/tasks.md' },
      { name: 'Global rules', path: '.ai/rules/global.md' }
    ];

    // Add tool-specific checks
    if (tool === 'cursor' || tool === 'all') {
      checks.push({ name: 'Cursor rules', path: '.cursorrules' });
    }
    if (tool === 'claude-code' || tool === 'all') {
      checks.push({ name: 'Claude config', path: 'CLAUDE.md' });
    }
    if (tool === 'gemini-cli' || tool === 'all') {
      checks.push({ name: 'Gemini config', path: '.geminirc' });
    }

    let allPassed = true;

    checks.forEach(check => {
      const fullPath = path.join(this.projectRoot, check.path);
      if (fs.existsSync(fullPath)) {
        console.log(`  ✅ ${check.name}`);
      } else {
        console.log(`  ❌ ${check.name}`);
        allPassed = false;
      }
    });

    return allPassed;
  }

  /**
   * Show completion message
   */
  showCompletion(tool) {
    console.log('\n🎉 Universal AI Copilot Setup Complete!');
    console.log('═════════════════════════════════════\n');

    console.log('📁 Structure created:');
    console.log('  .ai/              # Universal configuration');
    console.log('  memory-bank/      # Shared memory system');

    if (tool === 'cursor' || tool === 'all') {
      console.log('  .cursorrules      # Cursor configuration');
      console.log('  .cursor/          # Cursor commands & rules');
    }
    if (tool === 'claude-code' || tool === 'all') {
      console.log('  CLAUDE.md         # Claude Code configuration');
    }
    if (tool === 'gemini-cli' || tool === 'all') {
      console.log('  .geminirc         # Gemini CLI configuration');
    }

    console.log('\n🚀 Next steps:');

    if (tool === 'cursor' || tool === 'all') {
      console.log('  Cursor users: Type /van to initialize');
    }
    if (tool === 'claude-code' || tool === 'all') {
      console.log('  Claude Code users: Run /van');
    }
    if (tool === 'gemini-cli' || tool === 'all') {
      console.log('  Gemini CLI users: Run /van');
    }

    console.log('\n📚 Documentation:');
    console.log('  docs/unified-ai-copilot-architecture.md');
    console.log('  AI_WORKFLOW.md');
  }

  /**
   * Main initialization flow
   */
  async run() {
    console.log('🤖 Universal AI Copilot Initializer');
    console.log('═══════════════════════════════════\n');

    // Check if already initialized
    if (this.hasUniversalConfig()) {
      console.log('⚠️  Universal AI config already exists');
      console.log('Run with --force to reinitialize\n');

      if (!process.argv.includes('--force')) {
        process.exit(1);
      }
    }

    // Step 1: Select primary tool
    const tool = await this.selectPrimaryTool();
    console.log(`\n🎯 Selected: ${tool}\n`);

    // Step 2: Initialize structure
    if (!this.initializeStructure()) {
      console.error('❌ Failed to initialize structure');
      process.exit(1);
    }

    // Step 3: Copy templates
    if (!this.copyTemplates()) {
      console.error('❌ Failed to setup templates');
      process.exit(1);
    }

    // Step 4: Initialize Memory Bank
    if (!this.initializeMemoryBank()) {
      console.error('❌ Failed to initialize Memory Bank');
      process.exit(1);
    }

    // Step 5: Generate tool-specific configs
    const configSuccess = await this.generateToolConfigs(tool);
    if (!configSuccess) {
      console.error('❌ Failed to generate tool configurations');
      process.exit(1);
    }

    // Step 6: Verify setup
    const verificationPassed = this.verifySetup(tool);
    if (!verificationPassed) {
      console.error('❌ Setup verification failed');
      process.exit(1);
    }

    // Step 7: Show completion
    this.showCompletion(tool);

    console.log('\n✨ Ready to start your AI-powered development journey!');
  }

  // Template methods
  getTasksTemplate() {
    return `# Tasks

## Current Sprint

### 🎯 Active Tasks
- [ ] Initialize universal AI copilot system

### ⏳ Pending Tasks
- [ ] Define project goals
- [ ] Set up development environment

### ✅ Completed Tasks
- [x] Set up Memory Bank structure

## Backlog

### 🔮 Future Tasks
- [ ] TBD based on project needs

---

**Last updated:** ${new Date().toISOString().split('T')[0]}
**Phase:** VAN (Initialization)
`;
  }

  getActiveContextTemplate() {
    return `# Active Context

## Current Phase
**VAN** - Project Initialization

## Current Focus
Setting up universal AI copilot system for seamless collaboration across different AI tools.

## Recent Decisions
- Adopted universal AI configuration system
- Implemented tool-agnostic workflow phases
- Created Memory Bank for persistent context

## Current Work Items
- [x] Initialize .ai/ directory structure
- [x] Set up Memory Bank
- [x] Generate tool-specific configurations
- [ ] Define first project milestone

## Blockers & Issues
None currently.

## Next Steps
1. Run /van command to initialize
2. Define project goals in projectbrief.md
3. Begin planning phase

---

**Last updated:** ${new Date().toISOString().split('T')[0]}
`;
  }

  getProjectBriefTemplate() {
    return `# Project Brief

## Project Overview
**Name:** Universal AI Copilot Project
**Type:** Development Workflow
**Status:** Initializing

## Objectives
- [ ] Define primary project goals
- [ ] Establish technical requirements
- [ ] Set up development workflow

## Success Criteria
- Clear project definition
- Functional development environment
- Established AI collaboration workflow

## Scope
### In Scope
- TBD - to be defined during planning phase

### Out of Scope
- TBD - to be defined during planning phase

## Stakeholders
- Development team
- AI collaboration workflow

## Timeline
**Phase:** Initial setup
**Duration:** TBD

---

**Created:** ${new Date().toISOString().split('T')[0]}
**Phase:** VAN (Initialization)

> **Note:** This is a template. Update this file with your actual project details during the planning phase.
`;
  }

  getTechContextTemplate() {
    return `# Technical Context

## Technology Stack
- **Configuration:** YAML, Markdown
- **Automation:** Node.js, Shell scripting
- **AI Tools:** Cursor, Claude Code, Gemini CLI
- **Documentation:** Markdown

## Architecture
- Universal AI configuration system (.ai/)
- Memory Bank for persistent context
- Tool-specific adapters for seamless integration

## Development Environment
- Node.js for configuration generation
- Shell scripts for automation
- Markdown for documentation

## Dependencies
- js-yaml for YAML processing
- Node.js built-in modules
- Tool-specific configurations

## Deployment
- Configuration files committed to repository
- Tool-specific files generated automatically
- Environment setup scripts for each tool

---

**Last updated:** ${new Date().toISOString().split('T')[0]}
**System version:** Universal AI v1.0
`;
  }
}

// CLI execution
if (require.main === module) {
  const initializer = new UniversalAIInitializer();
  initializer.run().catch(error => {
    console.error('❌ Initialization failed:', error.message);
    process.exit(1);
  });
}

module.exports = UniversalAIInitializer;