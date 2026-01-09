#!/usr/bin/env node

/**
 * Gemini CLI Configuration Generator
 *
 * Generates .geminirc and command configurations for Gemini CLI integration
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class GeminiGenerator {
  constructor(projectRoot = process.cwd()) {
    this.projectRoot = projectRoot;
    this.configPath = path.join(projectRoot, '.ai', 'config.yaml');
    this.geminiMdPath = path.join(projectRoot, 'GEMINI.md');
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
   * Generate .geminirc configuration file
   */
  generateGeminiConfig() {
    const config = this.loadConfig();
    const rules = this.loadUniversalRules();

    if (!config) return false;

    const geminiConfig = this.buildGeminiConfig(config, rules);

    try {
      const configYaml = yaml.dump(geminiConfig, {
        indent: 2,
        lineWidth: 80,
        noRefs: true
      });

      fs.writeFileSync(this.geminiRcPath, configYaml);
      console.log('✅ Generated .geminirc');
      return true;
    } catch (error) {
      console.error('Failed to write .geminirc:', error.message);
      return false;
    }
  }

  /**
   * Build Gemini CLI configuration structure
   */
  buildGeminiConfig(config, rules) {
    return {
      // Project information
      project: {
        name: config.project.name,
        type: config.project.type,
        description: config.project.description,
        tech_stack: config.project.tech_stack
      },

      // Memory Bank configuration
      memory_bank: {
        path: config.defaults.memory_bank_path,
        required_files: ['tasks.md', 'activeContext.md', 'projectbrief.md', 'techContext.md'],
        auto_verify: true
      },

      // Workflow configuration
      workflow: {
        phases: config.workflow.phases,
        current_phase: null,
        require_memory_bank: config.workflow.memory_bank_required
      },

      // System prompts generated from rules
      system_prompts: this.buildSystemPrompts(rules),

      // Command aliases
      commands: this.buildCommandAliases(config),

      // Gemini-specific settings
      gemini: {
        model: "gemini-pro",
        temperature: 0.7,
        max_tokens: 2048,
        safety_settings: {
          harassment: "BLOCK_MEDIUM_AND_ABOVE",
          hate_speech: "BLOCK_MEDIUM_AND_ABOVE",
          sexually_explicit: "BLOCK_MEDIUM_AND_ABOVE",
          dangerous_content: "BLOCK_MEDIUM_AND_ABOVE"
        }
      },

      // Environment variables
      environment: {
        MEMORY_BANK_PATH: config.defaults.memory_bank_path,
        AI_CONFIG_PATH: ".ai",
        WORKFLOW_ACTIVE: true
      }
    };
  }

  /**
   * Build system prompts from universal rules
   */
  buildSystemPrompts(rules) {
    const prompts = {};

    Object.entries(rules).forEach(([ruleName, rule]) => {
      if (rule.metadata && rule.metadata.tools && rule.metadata.tools["gemini-cli"]) {
        const geminiConfig = rule.metadata.tools["gemini-cli"];

        prompts[ruleName] = {
          content: this.convertRuleToPrompt(rule.content),
          weight: geminiConfig.weight || "medium",
          scope: rule.metadata.applies_to || ["all"]
        };
      }
    });

    return prompts;
  }

  /**
   * Convert markdown rule content to system prompt format
   */
  convertRuleToPrompt(content) {
    // Convert markdown formatting to plain text for system prompts
    return content
      .replace(/^#+ /gm, '') // Remove headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/`([^`]+)`/g, '$1') // Remove code formatting
      .replace(/^\s*[-*+]\s+/gm, '• ') // Convert lists
      .trim();
  }

  /**
   * Build command aliases for Gemini CLI
   */
  buildCommandAliases(config) {
    const aliases = {};

    // Load command definitions
    const commandsPath = path.join(this.projectRoot, '.ai', 'commands');

    try {
      const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.md'));

      commandFiles.forEach(file => {
        const filePath = path.join(commandsPath, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const commandName = path.basename(file, '.md');

        const command = this.parseCommandFile(content);
        if (command && command.metadata && command.metadata.tools && command.metadata.tools["gemini-cli"]) {
          const geminiTrigger = command.metadata.tools["gemini-cli"].trigger;

          aliases[commandName] = {
            trigger: geminiTrigger,
            description: command.metadata.description,
            phase: command.metadata.phase,
            prerequisites: command.metadata.prerequisites || [],
            creates: command.metadata.creates || []
          };
        }
      });
    } catch (error) {
      console.warn('Warning: Could not load command definitions:', error.message);
    }

    return aliases;
  }

  /**
   * Parse command file with frontmatter
   */
  parseCommandFile(content) {
    const frontmatterRegex = /^---\n(.*?)\n---\n(.*)/s;
    const match = content.match(frontmatterRegex);

    if (match) {
      try {
        const frontmatter = yaml.load(match[1]);
        const body = match[2];
        return { metadata: frontmatter, content: body };
      } catch (error) {
        console.warn('Failed to parse command frontmatter:', error.message);
        return { metadata: {}, content: content };
      }
    }

    return { metadata: {}, content: content };
  }

  /**
   * Generate environment setup script
   */
  generateEnvScript() {
    const config = this.loadConfig();
    if (!config) return false;

    const envScript = `#!/bin/bash
# Gemini CLI Environment Setup Script
# Generated by Universal AI Copilot System

export MEMORY_BANK_PATH="${config.defaults.memory_bank_path}"
export AI_CONFIG_PATH=".ai"
export PROJECT_NAME="${config.project.name}"
export PROJECT_TYPE="${config.project.type}"
export WORKFLOW_ACTIVE="true"

# Command aliases (all tools use same slash commands)
alias van="/van"
alias plan="/plan"
alias creative="/creative"
alias implement="/implement"
alias reflect="/reflect"
alias archive="/archive"

# Verification function
verify_memory_bank() {
  if [ ! -d "$MEMORY_BANK_PATH" ]; then
    echo "❌ Memory Bank not found. Run '/van' to initialize."
    return 1
  fi
  echo "✅ Memory Bank verified"
  return 0
}

# Quick status function
gemini_status() {
  echo "🤖 Gemini CLI Status"
  echo "Project: $PROJECT_NAME"
  echo "Type: $PROJECT_TYPE"
  echo "Memory Bank: $MEMORY_BANK_PATH"
  verify_memory_bank
}

echo "🚀 Gemini CLI environment ready"
echo "Run 'gemini_status' to check system status"
echo "Run '/van' to initialize if needed"
`;

    const envScriptPath = path.join(this.projectRoot, '.ai', 'gemini-env.sh');

    try {
      fs.writeFileSync(envScriptPath, envScript);
      fs.chmodSync(envScriptPath, '755'); // Make executable
      console.log('✅ Generated Gemini environment script');
      return true;
    } catch (error) {
      console.error('Failed to write Gemini env script:', error.message);
      return false;
    }
  }

  /**
   * Generate all Gemini CLI configurations
   */
  generateAll() {
    console.log('💎 Generating Gemini CLI configurations...');

    const configSuccess = this.generateGeminiConfig();
    const envSuccess = this.generateEnvScript();

    if (configSuccess && envSuccess) {
      console.log('✅ Gemini CLI configuration complete');
      console.log('💡 Run: source .ai/gemini-env.sh');
      return true;
    } else {
      console.error('❌ Gemini CLI configuration failed');
      return false;
    }
  }
}

// CLI execution
if (require.main === module) {
  const generator = new GeminiGenerator();
  const success = generator.generateAll();
  process.exit(success ? 0 : 1);
}

module.exports = GeminiGenerator;