#!/usr/bin/env node

/**
 * Gemini CLI Configuration Generator
 *
 * Dynamically generates .geminirc and command configurations for Gemini CLI integration
 * by reading from GEMINI.md and .ai/ directory structure
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class GeminiGenerator {
  constructor(projectRoot = process.cwd()) {
    this.projectRoot = projectRoot;
    this.configPath = path.join(projectRoot, '.ai', 'config.yaml');
    this.geminiMdPath = path.join(projectRoot, 'GEMINI.md');
    this.geminiDir = path.join(projectRoot, '.gemini');
    this.outputPath = path.join(this.geminiDir, 'settings.json');
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
   * Load and parse GEMINI.md content
   */
  loadGeminiMd() {
    try {
      const content = fs.readFileSync(this.geminiMdPath, 'utf8');
      return this.parseGeminiMd(content);
    } catch (error) {
      console.error('Failed to load GEMINI.md:', error.message);
      return {
        systemPrompt: '',
        behavior: {},
        commands: {},
        workflow: {},
        preferences: {}
      };
    }
  }

  /**
   * Parse GEMINI.md into structured data
   */
  parseGeminiMd(content) {
    const sections = this.extractSections(content);

    return {
      systemPrompt: this.buildSystemPrompt(sections),
      behavior: this.extractBehaviorRules(sections),
      commands: this.extractGeminiCommands(sections),
      workflow: this.extractWorkflowRules(sections),
      preferences: this.extractPreferences(sections)
    };
  }

  /**
   * Extract sections from markdown content
   */
  extractSections(content) {
    const sections = {};
    const lines = content.split('\n');
    let currentSection = null;
    let currentContent = [];

    for (const line of lines) {
      // Match both ## level 2 headers and # level 1 headers
      const headerMatch = line.match(/^#{1,3}\s+(.+)/);

      if (headerMatch) {
        // Save previous section
        if (currentSection) {
          sections[currentSection] = currentContent.join('\n').trim();
        }

        // Start new section
        currentSection = this.normalizeHeader(headerMatch[1]);
        currentContent = [];
      } else if (currentSection) {
        currentContent.push(line);
      }
    }

    // Save last section
    if (currentSection) {
      sections[currentSection] = currentContent.join('\n').trim();
    }

    return sections;
  }

  /**
   * Normalize header text for section keys
   */
  normalizeHeader(header) {
    return header
      .toLowerCase()
      .replace(/[^\u4e00-\u9fffа-я\w\s-]/g, '') // Keep Chinese, Cyrillic, word chars, spaces, dashes
      .replace(/\s+/g, '_')     // Replace spaces with underscores
      .replace(/-+/g, '_')      // Replace dashes with underscores
      .replace(/_{2,}/g, '_')   // Collapse multiple underscores
      .replace(/^_|_$/g, '');   // Remove leading/trailing underscores
  }

  /**
   * Build comprehensive system prompt from GEMINI.md sections
   */
  buildSystemPrompt(sections) {
    const promptParts = [];

    // Core identity and philosophy
    const roleKey = this.findSectionKey(sections, ['角色定位', 'role_positioning']);
    if (roleKey) {
      promptParts.push("# ROLE & PHILOSOPHY");
      promptParts.push(this.cleanMarkdownForPrompt(sections[roleKey]));
      promptParts.push('');
    }

    // Behavior preferences
    const behaviorKey = this.findSectionKey(sections, ['一般行為偏好', 'general_behavior_preferences']);
    if (behaviorKey) {
      promptParts.push("# BEHAVIOR GUIDELINES");
      promptParts.push(this.cleanMarkdownForPrompt(sections[behaviorKey]));
      promptParts.push('');
    }

    // Workflow and thinking process
    const thinkingKey = this.findSectionKey(sections, ['linus_式思考流程', 'linus_thinking_process']);
    if (thinkingKey) {
      promptParts.push("# THINKING PROCESS");
      promptParts.push(this.cleanMarkdownForPrompt(sections[thinkingKey]));
      promptParts.push('');
    }

    // Development environment and tools
    const devKey = this.findSectionKey(sections, ['開發環境與工具', 'development_environment_tools']);
    if (devKey) {
      promptParts.push("# DEVELOPMENT TOOLS & ENVIRONMENT");
      promptParts.push(this.cleanMarkdownForPrompt(sections[devKey]));
      promptParts.push('');
    }

    // Security and safety
    const secKey = this.findSectionKey(sections, ['安全性規範', 'security_specifications']);
    if (secKey) {
      promptParts.push("# SECURITY GUIDELINES");
      promptParts.push(this.cleanMarkdownForPrompt(sections[secKey]));
      promptParts.push('');
    }

    // Subagents configuration
    promptParts.push("# SUBAGENTS");
    promptParts.push(this.buildSubagentsSection());
    promptParts.push('');

    // Custom commands
    const commandsKey = this.findSectionKey(sections, ['常用自訂指令模式', 'custom_commands']);
    if (commandsKey) {
      promptParts.push("# CUSTOM COMMANDS");
      promptParts.push(this.cleanMarkdownForPrompt(sections[commandsKey]));
      promptParts.push('');
    }

    return promptParts.join('\n');
  }

  /**
   * Build subagents section from .gemini/agents/ directory
   */
  buildSubagentsSection() {
    const agentsPath = path.join(this.geminiDir, 'agents');
    const subagents = [];

    try {
      if (fs.existsSync(agentsPath)) {
        const agentFiles = fs.readdirSync(agentsPath).filter(file => file.endsWith('.md'));

        agentFiles.forEach(file => {
          const filePath = path.join(agentsPath, file);
          const content = fs.readFileSync(filePath, 'utf8');
          const agentName = path.basename(file, '.md');

          // Parse agent metadata from frontmatter
          const frontmatterMatch = content.match(/^---\n(.*?)\n---/s);
          if (frontmatterMatch) {
            try {
              const metadata = yaml.load(frontmatterMatch[1]);
              if (metadata.name === 'code-reviewer') {
                subagents.push('Code Reviewer (/review-code): 負責深度代碼品質檢查、安全性審查、最佳實踐驗證');
              } else if (metadata.name === 'test-runner') {
                subagents.push('Test Runner (/write-tests): 負責測試策略規劃、測試生成、執行與失敗修復');
              }
            } catch (error) {
              console.warn(`Failed to parse agent metadata for ${agentName}`);
            }
          }
        });
      }
    } catch (error) {
      console.warn('Could not load subagents configuration:', error.message);
    }

    if (subagents.length > 0) {
      return 'Available subagents:\n' + subagents.map(s => `- ${s}`).join('\n');
    }

    return 'No subagents configured.';
  }

  /**
   * Find section key from possible alternatives
   */
  findSectionKey(sections, alternatives) {
    for (const alt of alternatives) {
      if (sections[alt]) {
        return alt;
      }
    }
    return null;
  }

  /**
   * Clean markdown formatting for system prompts
   */
  cleanMarkdownForPrompt(content) {
    return content
      .replace(/^#{1,6}\s+/gm, '')          // Remove markdown headers
      .replace(/\*\*(.*?)\*\*/g, '$1')     // Remove bold **text**
      .replace(/\*(.*?)\*/g, '$1')         // Remove italic *text*
      .replace(/`([^`]+)`/g, '$1')         // Remove inline code `text`
      .replace(/```[\s\S]*?```/g, '')      // Remove code blocks
      .replace(/^\s*[-*+]\s+/gm, '• ')     // Convert markdown lists to bullet points
      .replace(/^\s*\d+\.\s+/gm, '')       // Remove numbered list markers
      .replace(/\n{3,}/g, '\n\n')          // Normalize multiple newlines
      .trim();
  }

  /**
   * Extract behavior rules from sections
   */
  extractBehaviorRules(sections) {
    const rules = {};

    // Language preferences
    const behaviorSection = sections['general_behavior_preferences'] || sections['一般行為偏好'] || '';
    if (behaviorSection.includes('繁體中文')) {
      rules.language = 'zh-TW';
      rules.codeComments = 'en';
    }

    // Communication style
    if (behaviorSection.includes('直接、犀利、零廢話')) {
      rules.communicationStyle = 'direct_technical';
      rules.verbosity = 'minimal';
    }

    return rules;
  }

  /**
   * Extract Gemini-specific commands from sections
   */
  extractGeminiCommands(sections) {
    const commands = {};

    const customCommandsSection = sections['custom_commands'] || sections['常用自訂指令模式'] || '';

    // Extract command patterns using regex
    const commandPatterns = customCommandsSection.match(/###?\s*[「]([^」]+)[」]/g);

    if (commandPatterns) {
      commandPatterns.forEach(pattern => {
        const match = pattern.match(/###?\s*[「]([^」]+)[」]/);
        if (match) {
          const commandName = match[1];
          const normalizedName = commandName.toLowerCase().replace(/\s+/g, '_');
          commands[normalizedName] = {
            name: commandName,
            trigger: commandName,
            description: `Execute ${commandName} workflow`
          };
        }
      });
    }

    return commands;
  }

  /**
   * Extract workflow rules from sections
   */
  extractWorkflowRules(sections) {
    const workflow = {};

    const workflowSection = sections['workflow'] || sections['工作流程'] || '';

    if (workflowSection.includes('規劃優先')) {
      workflow.planFirst = true;
    }

    if (workflowSection.includes('TodoWrite')) {
      workflow.requireTodoTracking = true;
    }

    if (workflowSection.includes('主動解決')) {
      workflow.proactiveMode = true;
    }

    return workflow;
  }

  /**
   * Extract user preferences from sections
   */
  extractPreferences(sections) {
    const prefs = {};

    // File operation preferences
    const fileSection = sections['file_operation_principles'] || sections['檔案操作原則'] || '';
    if (fileSection.includes('Edit 優先')) {
      prefs.preferEdit = true;
    }
    if (fileSection.includes('檢查先行')) {
      prefs.checkBeforeCreate = true;
    }

    return prefs;
  }

  /**
   * Load universal rules from .ai/rules/
   */
  loadUniversalRules() {
    const rulesPath = path.join(this.projectRoot, '.ai', 'rules');
    const rules = {};

    try {
      const loadRulesRecursively = (dir, prefix = '') => {
        const items = fs.readdirSync(dir);

        items.forEach(item => {
          const itemPath = path.join(dir, item);
          const stat = fs.statSync(itemPath);

          if (stat.isDirectory()) {
            loadRulesRecursively(itemPath, prefix ? `${prefix}_${item}` : item);
          } else if (item.endsWith('.md')) {
            const content = fs.readFileSync(itemPath, 'utf8');
            const ruleName = prefix ? `${prefix}_${path.basename(item, '.md')}` : path.basename(item, '.md');
            rules[ruleName] = this.parseRuleFile(content);
          }
        });
      };

      if (fs.existsSync(rulesPath)) {
        loadRulesRecursively(rulesPath);
      }

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
   * Load command definitions from .ai/commands/
   */
  loadCommandDefinitions() {
    const commandsPath = path.join(this.projectRoot, '.ai', 'commands');
    const commands = {};

    try {
      const categories = ['workflow', 'utility', 'system'];

      categories.forEach(category => {
        const categoryPath = path.join(commandsPath, category);
        if (!fs.existsSync(categoryPath)) return;

        const commandFiles = fs.readdirSync(categoryPath).filter(file => file.endsWith('.md'));

        commandFiles.forEach(file => {
          const filePath = path.join(categoryPath, file);
          const content = fs.readFileSync(filePath, 'utf8');
          const commandName = path.basename(file, '.md');

          const command = this.parseCommandFile(content);
          if (command && command.metadata && command.metadata.tools && command.metadata.tools["gemini-cli"]) {
            const geminiConfig = command.metadata.tools["gemini-cli"];

            commands[commandName] = {
              trigger: geminiConfig.trigger,
              description: geminiConfig.description || command.metadata.description,
              phase: command.metadata.phase,
              prerequisites: command.metadata.prerequisites || [],
              creates: command.metadata.creates || [],
              category: category
            };
          }
        });
      });
    } catch (error) {
      console.warn('Warning: Could not load command definitions:', error.message);
    }

    return commands;
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
   * Generate official Gemini CLI settings.json configuration
   */
  generateGeminiConfig() {
    const config = this.loadConfig();
    const geminiData = this.loadGeminiMd();
    const universalRules = this.loadUniversalRules();
    const commands = this.loadCommandDefinitions();

    if (!config) {
      console.error('Could not load base configuration');
      return false;
    }

    const geminiConfig = this.buildGeminiSettingsJson(config, geminiData, universalRules, commands);

    try {
      // Ensure .gemini directory exists
      if (!fs.existsSync(this.geminiDir)) {
        fs.mkdirSync(this.geminiDir, { recursive: true });
      }

      fs.writeFileSync(this.outputPath, JSON.stringify(geminiConfig, null, 2));
      console.log('✅ Generated .gemini/settings.json from GEMINI.md and .ai/ configuration');
      return true;
    } catch (error) {
      console.error('Failed to write .gemini/settings.json:', error.message);
      return false;
    }
  }

  /**
   * Build official Gemini CLI settings.json configuration
   */
  buildGeminiSettingsJson(config, geminiData, universalRules, commands) {
    return {
      // Official Gemini CLI configuration structure
      general: {
        previewFeatures: false,
        preferredEditor: "code"
      },

      model: {
        name: "gemini-2.0-flash-exp",
        maxSessionTurns: -1
      },

      output: {
        format: "markdown"
      },

      ui: {
        hideContextSummary: false,
        hideDirPath: false,
        hideSandboxStatus: false,
        hideModelName: false,
        enableLineNumbers: true,
        enableCitations: true
      },

      privacy: {
        usageStatisticsEnabled: false
      },

      // Custom extensions (unofficial but useful for project context)
      _custom: {
        // Project context from GEMINI.md
        systemPrompt: geminiData.systemPrompt,

        // Project information
        project: {
          name: config.project?.name || 'Unknown Project',
          type: config.project?.type || 'general',
          description: config.project?.description || ''
        },

        // Workflow configuration
        workflow: {
          phases: config.workflow?.phases || [],
          memoryBankPath: config.defaults?.memory_bank_path || 'memory-bank',
          ...geminiData.workflow
        },

        // Behavior preferences from GEMINI.md
        behavior: {
          ...geminiData.behavior,
          ...geminiData.preferences
        },

        // Available commands
        commands: Object.keys(commands).reduce((acc, key) => {
          acc[key] = {
            trigger: commands[key].trigger,
            description: commands[key].description,
            phase: commands[key].phase
          };
          return acc;
        }, {}),

        // Generation metadata
        meta: {
          generatedAt: new Date().toISOString(),
          generatedFrom: ['GEMINI.md', '.ai/config.yaml', '.ai/commands/', '.ai/rules/'],
          generatorVersion: '3.0.0'
        }
      }
    };
  }

  /**
   * Generate all Gemini CLI configurations
   */
  generateAll() {
    console.log('💎 Generating official Gemini CLI settings.json from GEMINI.md...');

    const success = this.generateGeminiConfig();

    if (success) {
      console.log('✅ Gemini CLI configuration complete');
      console.log(`📄 Official settings.json saved to: ${this.outputPath}`);
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