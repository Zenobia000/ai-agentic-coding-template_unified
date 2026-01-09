#!/usr/bin/env node

/**
 * GitHub Publish Script
 * Initialize git and push to GitHub
 */

const { execSync } = require("child_process");
const readline = require("readline");
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
  red: "\x1b[31m",
  cyan: "\x1b[36m",
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

function run(cmd, options = {}) {
  try {
    return execSync(cmd, {
      cwd: ROOT_DIR,
      encoding: "utf-8",
      stdio: options.silent ? "pipe" : "inherit",
      ...options,
    });
  } catch (error) {
    if (!options.ignoreError) {
      throw error;
    }
    return null;
  }
}

function checkCommand(cmd) {
  try {
    execSync(`which ${cmd}`, { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

async function main() {
  console.log(`
${c.cyan}╔═══════════════════════════════════════════════════════════╗
║   ${c.bold}GitHub Publish${c.reset}${c.cyan}                                          ║
║   ${c.dim}Push your project to GitHub${c.reset}${c.cyan}                             ║
╚═══════════════════════════════════════════════════════════╝${c.reset}
`);

  // Check prerequisites
  console.log(`${c.bold}Checking prerequisites...${c.reset}\n`);

  if (!checkCommand("git")) {
    console.log(`${c.red}Error: git is not installed${c.reset}`);
    process.exit(1);
  }
  console.log(`  ${c.green}✓${c.reset} git installed`);

  const hasGhCli = checkCommand("gh");
  if (hasGhCli) {
    console.log(`  ${c.green}✓${c.reset} GitHub CLI (gh) installed`);
  } else {
    console.log(`  ${c.yellow}⚠${c.reset} GitHub CLI (gh) not found - will use manual method`);
  }

  // Check if already a git repo
  const isGitRepo = fs.existsSync(path.join(ROOT_DIR, ".git"));
  if (isGitRepo) {
    console.log(`  ${c.green}✓${c.reset} Git repository exists`);
  } else {
    console.log(`  ${c.dim}○${c.reset} Will initialize git repository`);
  }

  console.log();

  // Get repository name
  const defaultName = "universal-ai-copilot-template";
  const repoName = await ask(`${c.green}Repository name (${defaultName}): ${c.reset}`) || defaultName;

  // Get visibility
  const visibility = await ask(`${c.green}Visibility (public/private) [public]: ${c.reset}`) || "public";

  // Confirm
  console.log(`\n${c.bold}Summary:${c.reset}`);
  console.log(`  Repository: ${c.cyan}${repoName}${c.reset}`);
  console.log(`  Visibility: ${c.cyan}${visibility}${c.reset}`);
  console.log(`  Method: ${c.cyan}${hasGhCli ? "GitHub CLI" : "Manual"}${c.reset}`);

  const confirm = await ask(`\n${c.green}Proceed? (Y/n): ${c.reset}`);
  if (confirm.toLowerCase() === "n") {
    console.log(`\n${c.dim}Cancelled.${c.reset}\n`);
    rl.close();
    return;
  }

  console.log();

  try {
    // Initialize git if needed
    if (!isGitRepo) {
      console.log(`${c.cyan}Initializing git repository...${c.reset}`);
      run("git init");
    }

    // Add all files
    console.log(`${c.cyan}Staging files...${c.reset}`);
    run("git add .");

    // Check if there are changes to commit
    const status = run("git status --porcelain", { silent: true });
    if (status && status.trim()) {
      console.log(`${c.cyan}Creating initial commit...${c.reset}`);
      run(`git commit -m "Initial commit: Universal AI Copilot Template

- Unified configuration system (.ai/)
- Support for Cursor, Claude Code, Gemini CLI
- Memory Bank for context persistence
- 13 workflow commands
- Interactive setup script

Co-Authored-By: Claude <noreply@anthropic.com>"`);
    } else {
      console.log(`${c.dim}No changes to commit${c.reset}`);
    }

    // Ensure we're on main branch
    run("git branch -M main", { ignoreError: true });

    if (hasGhCli) {
      // Use GitHub CLI
      console.log(`${c.cyan}Creating GitHub repository...${c.reset}`);
      const visFlag = visibility === "private" ? "--private" : "--public";
      run(`gh repo create ${repoName} ${visFlag} --source=. --push`);
    } else {
      // Manual method
      console.log(`\n${c.yellow}Manual setup required:${c.reset}\n`);
      console.log(`1. Create repository on GitHub: ${c.cyan}https://github.com/new${c.reset}`);
      console.log(`   Name: ${c.bold}${repoName}${c.reset}`);
      console.log(`   Visibility: ${c.bold}${visibility}${c.reset}`);
      console.log();

      const username = await ask(`${c.green}Your GitHub username: ${c.reset}`);

      if (username) {
        console.log(`\n${c.cyan}Adding remote and pushing...${c.reset}`);
        run(`git remote add origin https://github.com/${username}/${repoName}.git`, { ignoreError: true });
        run("git push -u origin main");
      } else {
        console.log(`\n${c.dim}Run these commands after creating the repo:${c.reset}`);
        console.log(`  git remote add origin https://github.com/<username>/${repoName}.git`);
        console.log(`  git push -u origin main`);
      }
    }

    console.log(`\n${c.green}${c.bold}✓ Done!${c.reset}\n`);

    if (hasGhCli) {
      console.log(`${c.dim}View your repository:${c.reset}`);
      console.log(`  gh repo view --web\n`);
    }

  } catch (error) {
    console.error(`\n${c.red}Error: ${error.message}${c.reset}\n`);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
