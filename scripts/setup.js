#!/usr/bin/env node

/**
 * Interactive Setup Script for Universal AI Copilot Template
 * Guides users through choosing their AI tool configuration
 */

const readline = require("readline");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");

// ANSI colors
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

function printBanner() {
  console.log(`
${c.cyan}╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   ${c.bold}Universal AI Copilot Template${c.reset}${c.cyan}                         ║
║   ${c.dim}One Configuration, Multiple AI Tools${c.reset}${c.cyan}                   ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝${c.reset}
`);
}

function printMenu(title, options) {
  console.log(`\n${c.bold}${c.yellow}${title}${c.reset}\n`);
  options.forEach((opt, i) => {
    console.log(`  ${c.cyan}${i + 1})${c.reset} ${opt.label}`);
    if (opt.desc) {
      console.log(`     ${c.dim}${opt.desc}${c.reset}`);
    }
  });
  console.log();
}

async function selectTool() {
  printMenu("Select AI Tool(s) to configure:", [
    { label: "All tools (Cursor + Claude Code + Gemini CLI)", desc: "Recommended for teams using multiple tools" },
    { label: "Cursor only", desc: "IDE with AI integration" },
    { label: "Claude Code only", desc: "Terminal-based AI assistant" },
    { label: "Gemini CLI only", desc: "Google's CLI AI tool" },
    { label: "Cursor + Claude Code", desc: "Most common combination" },
  ]);

  const answer = await ask(`${c.green}Enter choice (1-5): ${c.reset}`);

  switch (answer) {
    case "1": return "all";
    case "2": return "cursor";
    case "3": return "claude";
    case "4": return "gemini";
    case "5": return "cursor,claude";
    default: return "all";
  }
}

async function selectWorkflowMode() {
  printMenu("Select workflow mode:", [
    { label: "Full Workflow", desc: "All 6 phases: van → plan → creative → implement → reflect → archive" },
    { label: "Minimal", desc: "Essential commands only: van, plan, implement" },
    { label: "Custom", desc: "Choose specific commands to enable" },
  ]);

  const answer = await ask(`${c.green}Enter choice (1-3): ${c.reset}`);

  switch (answer) {
    case "1": return "full";
    case "2": return "minimal";
    case "3": return "custom";
    default: return "full";
  }
}

async function selectProjectType() {
  printMenu("Select project type:", [
    { label: "Web Application", desc: "Frontend/Backend web development" },
    { label: "CLI Tool", desc: "Command-line application" },
    { label: "Library/Package", desc: "Reusable code library" },
    { label: "Data/ML Project", desc: "Data science or machine learning" },
    { label: "General", desc: "No specific type" },
  ]);

  const answer = await ask(`${c.green}Enter choice (1-5): ${c.reset}`);

  const types = ["web", "cli", "library", "data", "general"];
  return types[parseInt(answer) - 1] || "general";
}

async function confirmSetup(config) {
  console.log(`\n${c.bold}${c.blue}Configuration Summary:${c.reset}`);
  console.log(`  ${c.dim}AI Tool(s):${c.reset}     ${config.tools}`);
  console.log(`  ${c.dim}Workflow:${c.reset}       ${config.workflow}`);
  console.log(`  ${c.dim}Project Type:${c.reset}   ${config.projectType}`);
  console.log();

  const confirm = await ask(`${c.green}Proceed with setup? (Y/n): ${c.reset}`);
  return confirm.toLowerCase() !== "n";
}

function runSync(tools) {
  console.log(`\n${c.cyan}Syncing configuration...${c.reset}\n`);

  if (tools === "all") {
    execSync("node scripts/sync-ai-config.js", { cwd: ROOT_DIR, stdio: "inherit" });
  } else {
    const toolList = tools.split(",");
    for (const tool of toolList) {
      execSync(`node scripts/sync-ai-config.js --tool ${tool.trim()}`, {
        cwd: ROOT_DIR,
        stdio: "inherit"
      });
    }
  }
}

function updateProjectBrief(projectType) {
  const briefPath = path.join(ROOT_DIR, "memory-bank", "projectbrief.md");

  if (fs.existsSync(briefPath)) {
    let content = fs.readFileSync(briefPath, "utf-8");

    // Update project type if placeholder exists
    content = content.replace(
      /Type: .*/,
      `Type: ${projectType}`
    );

    fs.writeFileSync(briefPath, content);
  }
}

function printNextSteps(tools) {
  console.log(`\n${c.green}${c.bold}✓ Setup complete!${c.reset}\n`);

  console.log(`${c.bold}Next steps:${c.reset}`);
  console.log(`  1. Run ${c.cyan}/van${c.reset} in your AI tool to initialize the project`);
  console.log(`  2. Run ${c.cyan}/plan${c.reset} to start planning your tasks`);
  console.log();

  console.log(`${c.bold}Generated files:${c.reset}`);

  if (tools === "all" || tools.includes("cursor")) {
    console.log(`  ${c.dim}Cursor:${c.reset}      .cursorrules, .cursor/commands/`);
  }
  if (tools === "all" || tools.includes("claude")) {
    console.log(`  ${c.dim}Claude Code:${c.reset} CLAUDE.md, .claude/`);
  }
  if (tools === "all" || tools.includes("gemini")) {
    console.log(`  ${c.dim}Gemini CLI:${c.reset}  GEMINI.md, .gemini/`);
  }

  console.log();
  console.log(`${c.bold}Documentation:${c.reset}`);
  console.log(`  ${c.dim}README.md${c.reset}      - Quick start guide`);
  console.log(`  ${c.dim}AI_WORKFLOW.md${c.reset} - Detailed workflow documentation`);
  console.log();
}

async function main() {
  printBanner();

  try {
    // Check if already configured
    const hasConfig = fs.existsSync(path.join(ROOT_DIR, ".cursorrules")) ||
                      fs.existsSync(path.join(ROOT_DIR, "CLAUDE.md")) ||
                      fs.existsSync(path.join(ROOT_DIR, "GEMINI.md"));

    if (hasConfig) {
      console.log(`${c.yellow}⚠ Existing configuration detected.${c.reset}`);
      const overwrite = await ask(`${c.green}Overwrite? (y/N): ${c.reset}`);
      if (overwrite.toLowerCase() !== "y") {
        console.log(`\n${c.dim}Setup cancelled. Run ${c.cyan}npm run ai-sync${c.dim} to update existing config.${c.reset}\n`);
        rl.close();
        return;
      }
      console.log();
    }

    // Interactive selection
    const tools = await selectTool();
    const workflow = await selectWorkflowMode();
    const projectType = await selectProjectType();

    const config = { tools, workflow, projectType };

    // Confirm and execute
    if (await confirmSetup(config)) {
      runSync(tools);
      updateProjectBrief(projectType);
      printNextSteps(tools);
    } else {
      console.log(`\n${c.dim}Setup cancelled.${c.reset}\n`);
    }

  } catch (error) {
    console.error(`\n${c.red}Error: ${error.message}${c.reset}\n`);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run
main();
