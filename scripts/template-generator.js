#!/usr/bin/env node
/**
 * Template Generator for Command Outputs
 *
 * Generates standardized output files from templates when AI commands are executed
 * Uses Mustache templating engine for variable substitution
 *
 * Usage: node scripts/template-generator.js --command van --data context.json
 */

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const Mustache = require("mustache");

const ROOT_DIR = path.resolve(__dirname, "..");
const TEMPLATE_DIR = path.join(ROOT_DIR, ".ai", "template", "outputs");
const MEMORY_BANK_DIR = path.join(ROOT_DIR, "memory-bank");
const CONFIG_PATH = path.join(TEMPLATE_DIR, "config.yaml");

/**
 * Load template configuration
 */
function loadConfig() {
  try {
    const configContent = fs.readFileSync(CONFIG_PATH, "utf8");
    return yaml.load(configContent);
  } catch (error) {
    console.error("Error loading template config:", error);
    process.exit(1);
  }
}

/**
 * Get global metadata
 */
function getGlobalMetadata() {
  const now = new Date();
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(ROOT_DIR, "package.json"), "utf8")
  );

  // Try to get git info
  let gitBranch = "main";
  let gitCommit = "unknown";
  try {
    const { execSync } = require("child_process");
    gitBranch = execSync("git branch --show-current", { encoding: "utf8" }).trim();
    gitCommit = execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
  } catch (error) {
    // Git not available or not a git repo
  }

  return {
    ai_tool: process.env.AI_TOOL || "claude",
    timestamp: now.toISOString(),
    date: now.toISOString().split("T")[0],
    version: packageJson.version || "1.0.0",
    user: process.env.USER || "developer",
    project_name: packageJson.name || "project",
    git_branch: gitBranch,
    git_commit: gitCommit,
  };
}

/**
 * Generate output from template
 */
function generateFromTemplate(command, outputType, data = {}) {
  const config = loadConfig();

  if (!config.commands[command]) {
    throw new Error(`Unknown command: ${command}`);
  }

  const commandConfig = config.commands[command];
  const output = commandConfig.outputs.find(o => o.type === outputType);

  if (!output) {
    throw new Error(`Unknown output type '${outputType}' for command '${command}'`);
  }

  // Load template
  const templatePath = path.join(TEMPLATE_DIR, output.template);
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }

  const template = fs.readFileSync(templatePath, "utf8");

  // Merge data with global metadata
  const renderData = {
    ...getGlobalMetadata(),
    ...data,
  };

  // Render template
  const rendered = Mustache.render(template, renderData);

  // Determine output path
  const outputDir = path.join(ROOT_DIR, output.location);
  const filename = Mustache.render(output.filename, renderData);
  const outputPath = path.join(outputDir, filename);

  // Create directory if needed
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Check overwrite setting
  if (fs.existsSync(outputPath) && !output.overwrite) {
    console.log(`File exists and overwrite is false: ${outputPath}`);
    return null;
  }

  // Write file
  fs.writeFileSync(outputPath, rendered);
  console.log(`Generated: ${outputPath}`);

  return outputPath;
}

/**
 * Generate all outputs for a command
 */
function generateCommandOutputs(command, data = {}) {
  const config = loadConfig();

  if (!config.commands[command]) {
    throw new Error(`Unknown command: ${command}`);
  }

  const commandConfig = config.commands[command];
  const generatedFiles = [];

  console.log(`\nGenerating outputs for: ${commandConfig.name}`);
  console.log(`Phase: ${commandConfig.phase}`);

  for (const output of commandConfig.outputs) {
    try {
      const filePath = generateFromTemplate(command, output.type, data);
      if (filePath) {
        generatedFiles.push(filePath);
      }
    } catch (error) {
      console.error(`Error generating ${output.type}:`, error.message);
    }
  }

  return generatedFiles;
}

/**
 * Initialize all template directories
 */
function initializeTemplateStructure() {
  const config = loadConfig();
  const dirs = new Set();

  // Collect all output directories
  for (const command of Object.values(config.commands)) {
    for (const output of command.outputs) {
      dirs.add(path.join(ROOT_DIR, output.location));
    }
  }

  // Create directories
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  }

  console.log("\nTemplate structure initialized");
}

/**
 * CLI Interface
 */
function main() {
  const args = process.argv.slice(2);

  if (args.includes("--init")) {
    initializeTemplateStructure();
    return;
  }

  const commandIndex = args.indexOf("--command");
  const dataIndex = args.indexOf("--data");
  const typeIndex = args.indexOf("--type");

  if (commandIndex === -1 || args[commandIndex + 1] === undefined) {
    console.error("Usage: template-generator.js --command <command> [--type <type>] [--data <json-file>]");
    console.error("       template-generator.js --init");
    process.exit(1);
  }

  const command = args[commandIndex + 1];
  let data = {};

  // Load data if provided
  if (dataIndex !== -1 && args[dataIndex + 1]) {
    const dataFile = args[dataIndex + 1];
    if (fs.existsSync(dataFile)) {
      data = JSON.parse(fs.readFileSync(dataFile, "utf8"));
    } else {
      console.error(`Data file not found: ${dataFile}`);
      process.exit(1);
    }
  }

  // Generate specific type or all
  if (typeIndex !== -1 && args[typeIndex + 1]) {
    const type = args[typeIndex + 1];
    try {
      generateFromTemplate(command, type, data);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  } else {
    generateCommandOutputs(command, data);
  }
}

// Export for programmatic use
module.exports = {
  loadConfig,
  getGlobalMetadata,
  generateFromTemplate,
  generateCommandOutputs,
  initializeTemplateStructure,
};

// Run if called directly
if (require.main === module) {
  main();
}