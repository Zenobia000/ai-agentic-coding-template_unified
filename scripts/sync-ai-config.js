#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');
const yaml = require('js-yaml');

const TOOL_ARG = process.argv.find(arg => arg.startsWith('--tool='))?.split('=')[1] ||
                 (process.argv.includes('--tool') ? process.argv[process.argv.indexOf('--tool') + 1] : null);

const TOOLS = {
  cursor: {
    name: 'Cursor',
    templateFile: '.cursorrules',
    outputFile: '.cursorrules',
    commandsDir: '.cursor/commands',
    settingsFile: null
  },
  claude: {
    name: 'Claude Code',
    templateFile: 'CLAUDE.md',
    outputFile: 'CLAUDE.md',
    commandsDir: '.claude/commands',
    settingsFile: '.claude/settings.json'
  },
  gemini: {
    name: 'Gemini CLI',
    templateFile: 'GEMINI.md',
    outputFile: 'GEMINI.md',
    commandsDir: '.gemini/commands',
    settingsFile: '.gemini/settings.json'
  }
};

async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }
}

async function copyFile(src, dest) {
  try {
    const content = await fs.readFile(src, 'utf-8');
    await fs.writeFile(dest, content, 'utf-8');
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`Template file not found: ${src}`);
      return false;
    }
    throw error;
  }
}

async function copyDirectory(sourceDir, targetDir, extensions = null) {
  await ensureDir(targetDir);

  try {
    const entries = await fs.readdir(sourceDir, { withFileTypes: true });
    let count = 0;

    for (const entry of entries) {
      const sourcePath = path.join(sourceDir, entry.name);
      const targetPath = path.join(targetDir, entry.name);

      if (entry.isDirectory()) {
        const subCount = await copyDirectory(sourcePath, targetPath, extensions);
        count += subCount;
      } else if (entry.isFile()) {
        if (!extensions || extensions.some(ext => entry.name.endsWith(ext))) {
          await copyFile(sourcePath, targetPath);
          count++;
        }
      }
    }

    return count;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return 0;
    }
    throw error;
  }
}

async function convertMdToToml(mdContent, fileName) {
  try {
    // Extract YAML frontmatter
    const frontmatterMatch = mdContent.match(/^---\n([\s\S]*?)\n---\n/);
    if (!frontmatterMatch) {
      return null;
    }

    const frontmatter = yaml.load(frontmatterMatch[1]);
    const bodyContent = mdContent.slice(frontmatterMatch[0].length).trim();

    // Build TOML content
    let toml = `# ${frontmatter.name || fileName}\n`;
    toml += `# ${frontmatter.description || ''}\n\n`;

    toml += `[command]\n`;
    toml += `name = "${frontmatter.name || fileName}"\n`;
    toml += `description = "${frontmatter.description || ''}"\n`;

    if (frontmatter.phase) {
      toml += `phase = "${frontmatter.phase}"\n`;
    }

    if (frontmatter.prerequisites) {
      toml += `prerequisites = [${frontmatter.prerequisites.map(p => `"${p}"`).join(', ')}]\n`;
    }

    if (frontmatter.creates) {
      toml += `creates = [${frontmatter.creates.map(c => `"${c}"`).join(', ')}]\n`;
    }

    if (frontmatter.tools && frontmatter.tools['gemini-cli']) {
      const geminiConfig = frontmatter.tools['gemini-cli'];
      toml += `\n[command.gemini]\n`;
      toml += `trigger = "${geminiConfig.trigger || `/${fileName}`}"\n`;
      toml += `description = "${geminiConfig.description || ''}"\n`;
    }

    // Add the body content as documentation
    toml += `\n[documentation]\n`;
    toml += `content = """\n${bodyContent}\n"""\n`;

    return toml;
  } catch (error) {
    console.error(`Error converting ${fileName} to TOML:`, error.message);
    return null;
  }
}

async function syncGeminiCommands(sourceDir, targetDir) {
  await ensureDir(targetDir);

  try {
    const entries = await fs.readdir(sourceDir, { withFileTypes: true });
    let count = 0;

    for (const entry of entries) {
      const sourcePath = path.join(sourceDir, entry.name);

      if (entry.isDirectory()) {
        // Recursively process subdirectories
        const subTargetDir = path.join(targetDir, entry.name);
        const subCount = await syncGeminiCommands(sourcePath, subTargetDir);
        count += subCount;
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        // Convert MD to TOML for Gemini
        const mdContent = await fs.readFile(sourcePath, 'utf-8');
        const fileName = path.basename(entry.name, '.md');
        const tomlContent = await convertMdToToml(mdContent, fileName);

        if (tomlContent) {
          const targetPath = path.join(targetDir, `${fileName}.toml`);
          await fs.writeFile(targetPath, tomlContent, 'utf-8');
          count++;
        }
      }
    }

    return count;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return 0;
    }
    throw error;
  }
}

async function generateClaudeSettings() {
  const settings = {
    hooks: {
      "tool-use-before": "echo '🛠️  [Claude] Executing: {{tool_name}}'",
      "tool-use-after": "echo '✅ [Claude] Completed: {{tool_name}}'",
      "user-prompt-submit": "echo '💬 [User] {{prompt}}'"
    },
    env: {
      CLAUDE_PROJECT_ROOT: process.cwd()
    }
  };

  await ensureDir('.claude');
  await fs.writeFile('.claude/settings.json', JSON.stringify(settings, null, 2));
  return true;
}

async function generateGeminiSettings() {
  const settings = {
    version: "1.0.0",
    description: "Gemini CLI configuration",
    project_root: process.cwd(),
    memory_bank: "memory-bank",
    commands: {
      prefix: "/",
      source: ".gemini/commands"
    }
  };

  await ensureDir('.gemini');
  await fs.writeFile('.gemini/settings.json', JSON.stringify(settings, null, 2));
  return true;
}

async function generateMemoryBankStructure() {
  const dirs = [
    'memory-bank',
    'memory-bank/decisions',
    'memory-bank/metrics',
    'memory-bank/designs',
    'memory-bank/requirements',
    'memory-bank/validation',
    'memory-bank/implementation'
  ];

  for (const dir of dirs) {
    await ensureDir(dir);
  }

  const memoryBankFiles = {
    'memory-bank/README.md': `# Memory Bank

This directory contains project knowledge and context persistence.

## Structure
- \`requirements/\` - Requirements and specifications
- \`decisions/\` - Architecture Decision Records (ADRs)
- \`metrics/\` - Performance and quality metrics
- \`designs/\` - Design documents and specifications
- \`validation/\` - Validation reports
- \`implementation/\` - Implementation guides
`,
    'memory-bank/decisions/README.md': `# Architecture Decision Records

Document your architectural decisions here using the ADR format.
`,
    'memory-bank/metrics/README.md': `# Project Metrics

Track project metrics, performance data, and quality indicators.
`,
    'memory-bank/designs/README.md': `# Design Documents

Store design specifications, diagrams, and technical documentation.
`,
    'memory-bank/requirements/README.md': `# Requirements

Project requirements and specifications.
`,
    'memory-bank/validation/README.md': `# Validation Reports

Validation and testing reports.
`,
    'memory-bank/implementation/README.md': `# Implementation Guides

Implementation documentation and guides.
`,
    'memory-bank/decisions/registry.yaml': `# ADR Registry
adrs: []
`,
    'memory-bank/metrics/dashboard.json': `{
  "version": "1.0.0",
  "metrics": {},
  "last_updated": "${new Date().toISOString()}"
}
`
  };

  for (const [filePath, content] of Object.entries(memoryBankFiles)) {
    try {
      await fs.access(filePath);
    } catch {
      await fs.writeFile(filePath, content);
      console.log(`  Generated ${filePath}`);
    }
  }

  console.log('  Memory Bank structure initialized');
}

async function syncTool(toolKey) {
  const tool = TOOLS[toolKey];
  if (!tool) {
    console.error(`Unknown tool: ${toolKey}`);
    return;
  }

  console.log(`\n${tool.name}:`);

  const templatePath = path.join('.ai', 'template', tool.templateFile);
  const outputPath = tool.outputFile;

  const copied = await copyFile(templatePath, outputPath);
  if (copied) {
    console.log(`  ✓ Copied ${tool.templateFile} to root`);
  }

  // Sync commands with full directory structure
  const commandsSource = path.join('.ai', 'commands');

  // For Gemini, convert MD to TOML; for others, just copy
  if (toolKey === 'gemini') {
    const commandsCount = await syncGeminiCommands(commandsSource, tool.commandsDir);
    if (commandsCount > 0) {
      console.log(`  Generated ${commandsCount} TOML commands in ${tool.commandsDir}/`);
    }
  } else {
    const commandsCount = await copyDirectory(commandsSource, tool.commandsDir, ['.md']);
    if (commandsCount > 0) {
      console.log(`  Synced ${commandsCount} commands to ${tool.commandsDir}/`);
    }
  }

  // Sync tool-specific adapters
  if (toolKey === 'claude') {
    // Copy Claude-specific directories from adapters
    const claudeAdapterPath = path.join('.ai', 'adapters', 'claude-code');

    // Copy generator.js if it exists
    const generatorSrc = path.join(claudeAdapterPath, 'generator.js');
    const generatorDest = path.join('.claude', 'generator.js');
    try {
      await copyFile(generatorSrc, generatorDest);
      console.log(`  Copied generator.js to .claude/ (for manual execution if needed)`);
    } catch (error) {
      // File doesn't exist, skip
    }

    // Sync agents
    const agentsCount = await copyDirectory(
      path.join(claudeAdapterPath, 'agents'),
      path.join('.claude', 'agents'),
      ['.md']
    );
    if (agentsCount > 0) {
      console.log(`  Synced ${agentsCount} agents to .claude/agents/`);
    }

    // Sync hooks
    const hooksCount = await copyDirectory(
      path.join(claudeAdapterPath, 'hooks'),
      path.join('.claude', 'hooks'),
      ['.py']
    );
    if (hooksCount > 0) {
      console.log(`  Synced ${hooksCount} hooks to .claude/hooks/`);
    }

    // Sync output-styles
    const stylesCount = await copyDirectory(
      path.join(claudeAdapterPath, 'output-styles'),
      path.join('.claude', 'output-styles'),
      ['.md']
    );
    if (stylesCount > 0) {
      console.log(`  Synced ${stylesCount} output styles to .claude/output-styles/`);
    }

    // Sync skills
    const skillsCount = await copyDirectory(
      path.join(claudeAdapterPath, 'skills'),
      path.join('.claude', 'skills'),
      null // Copy all files in skills
    );
    if (skillsCount > 0) {
      console.log(`  Synced ${skillsCount} skill files to .claude/skills/`);
    }

    // Generate settings
    await generateClaudeSettings();
    console.log(`  Generated ${tool.settingsFile} with hooks`);
  }

  if (toolKey === 'cursor') {
    // Copy Cursor-specific directories from adapters
    const cursorAdapterPath = path.join('.ai', 'adapters', 'cursor');

    // Copy generator.js if it exists
    const generatorSrc = path.join(cursorAdapterPath, 'generator.js');
    const generatorDest = path.join('.cursor', 'generator.js');
    try {
      await copyFile(generatorSrc, generatorDest);
      console.log(`  Copied generator.js to .cursor/ (for manual execution if needed)`);
    } catch (error) {
      // File doesn't exist, skip
    }

    // Sync rules
    const rulesCount = await copyDirectory(
      path.join(cursorAdapterPath, 'rules'),
      path.join('.cursor', 'rules'),
      ['.md']
    );
    if (rulesCount > 0) {
      console.log(`  Synced ${rulesCount} rule files to .cursor/rules/`);
    }
  }

  if (toolKey === 'gemini') {
    // Copy Gemini-specific directories from adapters
    const geminiAdapterPath = path.join('.ai', 'adapters', 'gemini-cli');

    // Copy generator.js if it exists
    const generatorSrc = path.join(geminiAdapterPath, 'generator.js');
    const generatorDest = path.join('.gemini', 'generator.js');
    try {
      await copyFile(generatorSrc, generatorDest);
      console.log(`  Copied generator.js to .gemini/ (for manual execution if needed)`);
    } catch (error) {
      // File doesn't exist, skip
    }

    // Sync converters (even if empty, create the directory)
    await ensureDir(path.join('.gemini', 'converters'));
    const convertersCount = await copyDirectory(
      path.join(geminiAdapterPath, 'converters'),
      path.join('.gemini', 'converters'),
      null // Copy all files
    );
    if (convertersCount > 0) {
      console.log(`  Synced ${convertersCount} converter files to .gemini/converters/`);
    } else {
      console.log(`  Created empty converters directory in .gemini/`);
    }

    // Generate settings
    if (tool.settingsFile) {
      await generateGeminiSettings();
      console.log(`  Generated ${tool.settingsFile}`);
    }
  }
}

async function main() {
  console.log('Syncing AI configuration...');

  const toolsToSync = TOOL_ARG ? [TOOL_ARG] : Object.keys(TOOLS);

  for (const toolKey of toolsToSync) {
    await syncTool(toolKey);
  }

  // Generate Memory Bank structure
  if (!TOOL_ARG) {
    console.log('\nMemory Bank:');
    await generateMemoryBankStructure();
  }

  console.log('\nSync complete!');
}

main().catch(error => {
  console.error('Error during sync:', error);
  process.exit(1);
});