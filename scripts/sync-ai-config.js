#!/usr/bin/env node
/**
 * Sync AI Configuration Script
 *
 * Synchronizes unified .ai/ configuration to tool-specific directories:
 * - .cursor/ (Cursor IDE)
 * - .claude/ (Claude Code)
 * - .gemini/ (Gemini CLI)
 * - .cursorrules, CLAUDE.md, GEMINI.md (main config files)
 * - memory-bank/ structure verification and setup
 *
 * Usage: node scripts/sync-ai-config.js [--tool cursor|claude|gemini|all]
 */

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const ROOT_DIR = path.resolve(__dirname, "..");
const AI_DIR = path.join(ROOT_DIR, ".ai");
const TEMPLATE_DIR = path.join(AI_DIR, "template");

// Tool-specific directories
const TOOL_DIRS = {
  cursor: path.join(ROOT_DIR, ".cursor"),
  claude: path.join(ROOT_DIR, ".claude"),
  gemini: path.join(ROOT_DIR, ".gemini"),
};

// Main config files
const CONFIG_FILES = {
  cursor: path.join(ROOT_DIR, ".cursorrules"),
  claude: path.join(ROOT_DIR, "CLAUDE.md"),
  gemini: path.join(ROOT_DIR, "GEMINI.md"),
};

// Template files
const TEMPLATE_FILES = {
  cursor: path.join(TEMPLATE_DIR, ".cursorrules"),
  claude: path.join(TEMPLATE_DIR, "CLAUDE.md"),
  gemini: path.join(TEMPLATE_DIR, "GEMINI.md"),
};

/**
 * Read and parse YAML front matter from markdown file
 */
function parseMarkdownWithFrontMatter(content) {
  const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (frontMatterMatch) {
    try {
      const metadata = yaml.load(frontMatterMatch[1]);
      const body = frontMatterMatch[2];
      return { metadata, body };
    } catch {
      return { metadata: {}, body: content };
    }
  }
  return { metadata: {}, body: content };
}

/**
 * Ensure directory exists
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Get all markdown files in a directory recursively
 */
function getMarkdownFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;

  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath));
    } else if (item.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * Read template content from .ai/template/
 */
function readTemplate(templateKey) {
  const templatePath = TEMPLATE_FILES[templateKey];
  if (fs.existsSync(templatePath)) {
    return fs.readFileSync(templatePath, "utf8");
  }
  console.warn(`Template file not found: ${templatePath}`);
  return "";
}


/**
 * Sync commands to Cursor format
 */
function syncCursorCommands() {
  const srcDir = path.join(AI_DIR, "commands");
  const destDir = path.join(TOOL_DIRS.cursor, "commands");

  ensureDir(destDir);

  // Get all command files
  const commandFiles = getMarkdownFiles(srcDir);

  for (const srcFile of commandFiles) {
    const content = fs.readFileSync(srcFile, "utf8");
    const { metadata, body } = parseMarkdownWithFrontMatter(content);

    // Create Cursor-formatted command
    const cursorTrigger = metadata.tools?.cursor?.trigger || `/${path.basename(srcFile, ".md")}`;
    const description = metadata.tools?.cursor?.description || metadata.description || "";

    const cursorContent = `---
description: ${description}
---

${body}`;

    const destFile = path.join(destDir, path.basename(srcFile));
    fs.writeFileSync(destFile, cursorContent);
  }

  console.log(`  Synced ${commandFiles.length} commands to .cursor/commands/`);
}

/**
 * Sync commands to Claude Code format
 */
function syncClaudeCommands() {
  const srcDir = path.join(AI_DIR, "commands");
  const destDir = path.join(TOOL_DIRS.claude, "commands");

  ensureDir(destDir);

  const commandFiles = getMarkdownFiles(srcDir);

  for (const srcFile of commandFiles) {
    const content = fs.readFileSync(srcFile, "utf8");
    const { metadata, body } = parseMarkdownWithFrontMatter(content);

    // Create Claude Code formatted command
    const allowedTools = metadata.tools?.["claude-code"]?.["allowed-tools"] || [];
    const description = metadata.tools?.["claude-code"]?.description || metadata.description || "";

    let claudeContent = `---
description: ${description}`;

    if (allowedTools.length > 0) {
      claudeContent += `
allowed-tools: ${JSON.stringify(allowedTools)}`;
    }

    claudeContent += `
---

${body}`;

    const destFile = path.join(destDir, path.basename(srcFile));
    fs.writeFileSync(destFile, claudeContent);
  }

  console.log(`  Synced ${commandFiles.length} commands to .claude/commands/`);
}

/**
 * Sync skills to Claude Code
 */
function syncClaudeSkills() {
  const srcDir = path.join(AI_DIR, "skills");
  const destDir = path.join(TOOL_DIRS.claude, "skills");

  if (!fs.existsSync(srcDir)) return;

  ensureDir(destDir);

  const items = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const item of items) {
    if (item.isDirectory()) {
      const skillSrc = path.join(srcDir, item.name);
      const skillDest = path.join(destDir, item.name);
      ensureDir(skillDest);

      // Copy SKILL.md
      const skillFile = path.join(skillSrc, "SKILL.md");
      if (fs.existsSync(skillFile)) {
        fs.copyFileSync(skillFile, path.join(skillDest, "SKILL.md"));
      }
    }
  }

  console.log(`  Synced skills to .claude/skills/`);
}

/**
 * Sync agents to Claude Code
 */
function syncClaudeAgents() {
  const srcDir = path.join(AI_DIR, "agents");
  const destDir = path.join(TOOL_DIRS.claude, "agents");

  if (!fs.existsSync(srcDir)) return;

  ensureDir(destDir);

  const files = fs.readdirSync(srcDir).filter((f) => f.endsWith(".md"));
  for (const file of files) {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
  }

  console.log(`  Synced ${files.length} agents to .claude/agents/`);
}

/**
 * Sync output styles to Claude Code
 */
function syncClaudeOutputStyles() {
  const srcDir = path.join(AI_DIR, "output-styles");
  const destDir = path.join(TOOL_DIRS.claude, "output-styles");

  if (!fs.existsSync(srcDir)) return;

  ensureDir(destDir);

  const files = fs.readdirSync(srcDir).filter((f) => f.endsWith(".md"));
  for (const file of files) {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
  }

  console.log(`  Synced ${files.length} output styles to .claude/output-styles/`);
}

/**
 * Generate Claude Code settings.json with hooks
 */
function syncClaudeSettings() {
  const hooksDir = path.join(AI_DIR, "hooks");
  const settingsFile = path.join(TOOL_DIRS.claude, "settings.json");

  ensureDir(TOOL_DIRS.claude);

  const settings = {
    hooks: {
      PreToolUse: [],
    },
  };

  // Add hooks if they exist
  if (fs.existsSync(hooksDir)) {
    const bashHook = path.join(hooksDir, "deny-dangerous-bash.py");
    const writeHook = path.join(hooksDir, "forbid-write-main.py");

    if (fs.existsSync(bashHook)) {
      settings.hooks.PreToolUse.push({
        matcher: "Bash",
        hooks: [
          {
            type: "command",
            command: `python3 ${path.relative(ROOT_DIR, bashHook)}`,
          },
        ],
      });
    }

    if (fs.existsSync(writeHook)) {
      settings.hooks.PreToolUse.push({
        matcher: "Write|Edit",
        hooks: [
          {
            type: "command",
            command: `python3 ${path.relative(ROOT_DIR, writeHook)}`,
          },
        ],
      });
    }
  }

  fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2));
  console.log(`  Generated .claude/settings.json with hooks`);
}

/**
 * Convert markdown command to TOML format for Gemini CLI
 * Preserves full content for better AI context
 */
function convertCommandToToml(mdContent, commandName) {
  const { metadata, body } = parseMarkdownWithFrontMatter(mdContent);

  // Extract description from metadata or first line
  let description = metadata.description || "";
  if (!description) {
    const firstLine = body.split("\n").find(line => line.startsWith("#"));
    if (firstLine) {
      description = firstLine.replace(/^#+\s*/, "").replace(/[🚀📋🎨💻🔍📚🐛📝🔧]/g, "").trim();
    }
  }

  // Clean up the markdown body for TOML
  let prompt = body.trim();

  // Remove tool-specific usage section (already handled by the command itself)
  prompt = prompt.replace(/## Tool-Specific Usage[\s\S]*?(?=\n## |$)/g, "");

  // Remove trailing separator lines
  prompt = prompt.replace(/\n---\s*\n*>.*$/g, "");

  // Escape triple quotes for TOML
  prompt = prompt.replace(/"""/g, '\\"\\"\\"');

  return `# /${commandName} - Gemini CLI command
# Generated from .ai/commands/

description = "${description.replace(/"/g, '\\"').substring(0, 100)}"

prompt = """
${prompt}

---
**User Request:** {{args}}

**Context:** Check Memory Bank (./memory-bank/) for project state.
- tasks.md: Current task list
- activeContext.md: Current focus
- progress.md: Implementation status
"""
`;
}

/**
 * Sync agents to Gemini CLI
 */
function syncGeminiAgents() {
  const srcDir = path.join(AI_DIR, "agents");
  const destDir = path.join(TOOL_DIRS.gemini, "agents");

  if (!fs.existsSync(srcDir)) return;

  ensureDir(destDir);

  const files = fs.readdirSync(srcDir).filter((f) => f.endsWith(".md"));
  for (const file of files) {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
  }

  console.log(`  Synced ${files.length} agents to .gemini/agents/`);
}

/**
 * Sync commands to .gemini/commands/ as .toml files
 */
function syncGeminiCommands() {
  const commandsDir = path.join(AI_DIR, "commands");
  const geminiCommandsDir = path.join(TOOL_DIRS.gemini, "commands");

  ensureDir(geminiCommandsDir);

  let count = 0;
  const categories = ["workflow", "utility", "system"];

  for (const category of categories) {
    const categoryDir = path.join(commandsDir, category);
    if (!fs.existsSync(categoryDir)) continue;

    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const commandName = path.basename(file, ".md");
      const content = fs.readFileSync(path.join(categoryDir, file), "utf-8");
      const tomlContent = convertCommandToToml(content, commandName);

      fs.writeFileSync(
        path.join(geminiCommandsDir, `${commandName}.toml`),
        tomlContent
      );
      count++;
    }
  }

  console.log(`  Synced ${count} commands to .gemini/commands/`);
}

/**
 * Main sync function
 */
function sync(tool = "all") {
  console.log("Syncing AI configuration...\n");

  if (tool === "all" || tool === "cursor") {
    console.log("Cursor:");
    const cursorrules = readTemplate("cursor");
    if (cursorrules) {
      fs.writeFileSync(CONFIG_FILES.cursor, cursorrules);
      console.log(`  Generated .cursorrules from template`);
    }
    syncCursorCommands();
  }

  if (tool === "all" || tool === "claude") {
    console.log("\nClaude Code:");
    const claudeMd = readTemplate("claude");
    if (claudeMd) {
      fs.writeFileSync(CONFIG_FILES.claude, claudeMd);
      console.log(`  Generated CLAUDE.md from template`);
    }
    syncClaudeCommands();
    syncClaudeSkills();
    syncClaudeAgents();
    syncClaudeOutputStyles();
    syncClaudeSettings();
  }

  if (tool === "all" || tool === "gemini") {
    console.log("\nGemini CLI:");
    const geminiMd = readTemplate("gemini");
    if (geminiMd) {
      fs.writeFileSync(CONFIG_FILES.gemini, geminiMd);
      console.log(`  Generated GEMINI.md from template`);
    }

    // Create .gemini/ directory and settings
    ensureDir(TOOL_DIRS.gemini);
    const geminiSettings = {
      output: { format: "text" },
      context: { fileName: ["GEMINI.md"] },
      privacy: { usageStatisticsEnabled: false }
    };
    fs.writeFileSync(
      path.join(TOOL_DIRS.gemini, "settings.json"),
      JSON.stringify(geminiSettings, null, 2)
    );
    console.log(`  Generated .gemini/settings.json`);

    // Sync commands as .toml files
    syncGeminiCommands();

    // Sync agents to .gemini/agents/
    syncGeminiAgents();
  }

  // Verify and setup Memory Bank structure
  if (tool === "all") {
    console.log("\nMemory Bank:");
    setupMemoryBankStructure();
  }

  console.log("\nSync complete!");
}

/**
 * Setup Memory Bank hierarchical structure
 */
function setupMemoryBankStructure() {
  const memoryBankDir = path.join(ROOT_DIR, "memory-bank");

  // Create main Memory Bank directory
  ensureDir(memoryBankDir);

  // Create subdirectories
  const subdirs = [
    "decisions",
    "decisions/templates",
    "metrics",
    "metrics/daily",
    "metrics/weekly",
    "metrics/monthly",
    "designs",
    "designs/architecture",
    "designs/api",
    "designs/database",
    "designs/database/migrations",
    "designs/interfaces"
  ];

  subdirs.forEach(subdir => {
    ensureDir(path.join(memoryBankDir, subdir));
  });

  // Create README files if they don't exist
  const readmeFiles = [
    { path: "README.md", template: "memory-bank-readme" },
    { path: "decisions/README.md", template: "decisions-readme" },
    { path: "metrics/README.md", template: "metrics-readme" },
    { path: "designs/README.md", template: "designs-readme" }
  ];

  readmeFiles.forEach(readme => {
    const readmePath = path.join(memoryBankDir, readme.path);
    if (!fs.existsSync(readmePath)) {
      // Create basic README if template doesn't exist
      const basicContent = `# ${path.dirname(readme.path).split('/').pop() || 'Memory Bank'}\n\n> Documentation will be auto-generated by AI agents\n`;
      fs.writeFileSync(readmePath, basicContent);
      console.log(`  Generated ${readme.path}`);
    }
  });

  // Create registry.yaml if it doesn't exist
  const registryPath = path.join(memoryBankDir, "decisions/registry.yaml");
  if (!fs.existsSync(registryPath)) {
    const basicRegistry = {
      metadata: {
        version: "1.0",
        last_updated: new Date().toISOString().split('T')[0],
        total_decisions: 0,
        next_number: 1
      },
      decisions: [],
      categories: {},
      status_counts: {
        proposed: 0,
        accepted: 0,
        deprecated: 0,
        superseded: 0
      },
      recent_activity: [],
      templates: {
        technology_selection: "templates/technology-selection.md",
        architecture_pattern: "templates/architecture-pattern.md",
        infrastructure_choice: "templates/infrastructure-choice.md",
        process_decision: "templates/process-decision.md"
      }
    };

    fs.writeFileSync(registryPath, yaml.dump(basicRegistry, { indent: 2 }));
    console.log(`  Generated decisions/registry.yaml`);
  }

  // Create dashboard.json if it doesn't exist
  const dashboardPath = path.join(memoryBankDir, "metrics/dashboard.json");
  if (!fs.existsSync(dashboardPath)) {
    const basicDashboard = {
      timestamp: new Date().toISOString(),
      velocity: {
        current_sprint_points: 0,
        completed_points: 0,
        sprint_progress: 0,
        velocity_trend: "stable"
      },
      quality: {
        test_coverage: 0,
        bug_count: 0,
        code_complexity_avg: 0,
        technical_debt_hours: 0
      },
      process: {
        deployment_frequency: 0,
        mttr_hours: 0,
        change_success_rate: 100
      },
      ai_agents: {
        total_agents: 7,
        active_agents: 0,
        last_activity: null
      }
    };

    fs.writeFileSync(dashboardPath, JSON.stringify(basicDashboard, null, 2));
    console.log(`  Generated metrics/dashboard.json`);
  }

  console.log(`  Memory Bank structure verified`);
}

// Parse command line arguments
const args = process.argv.slice(2);
let tool = "all";

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--tool" && args[i + 1]) {
    tool = args[i + 1];
  }
}

// Run sync
sync(tool);
