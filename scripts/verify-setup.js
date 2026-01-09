#!/usr/bin/env node

/**
 * Universal AI Copilot Template - Setup Verification Script
 * Verifies that the project setup is complete and correct.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

// ANSI color codes
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkExists(filePath, description) {
  const fullPath = path.join(ROOT_DIR, filePath);
  const exists = fs.existsSync(fullPath);
  const status = exists ? `${colors.green}[OK]` : `${colors.red}[MISSING]`;
  console.log(`  ${status}${colors.reset} ${description} (${filePath})`);
  return exists;
}

function checkDirectory(dirPath, description) {
  const fullPath = path.join(ROOT_DIR, dirPath);
  const exists = fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory();
  const status = exists ? `${colors.green}[OK]` : `${colors.red}[MISSING]`;
  console.log(`  ${status}${colors.reset} ${description} (${dirPath})`);
  return exists;
}

function verifyMemoryBank() {
  log('\n1. Memory Bank Structure', 'blue');
  const required = [
    ['memory-bank/', 'Memory Bank directory'],
    ['memory-bank/tasks.md', 'Tasks file (Source of Truth)'],
    ['memory-bank/activeContext.md', 'Active Context file'],
    ['memory-bank/progress.md', 'Progress tracking file'],
    ['memory-bank/projectbrief.md', 'Project brief file'],
    ['memory-bank/techContext.md', 'Tech context file']
  ];

  let allPassed = true;
  for (const [filePath, desc] of required) {
    if (filePath.endsWith('/')) {
      if (!checkDirectory(filePath.slice(0, -1), desc)) allPassed = false;
    } else {
      if (!checkExists(filePath, desc)) allPassed = false;
    }
  }
  return allPassed;
}

function verifyAIConfig() {
  log('\n2. AI Configuration (.ai/)', 'blue');
  const required = [
    ['.ai/', 'AI config directory'],
    ['.ai/config.yaml', 'Main configuration'],
    ['.ai/commands/', 'Commands directory'],
    ['.ai/commands/workflow/', 'Workflow commands'],
    ['.ai/commands/utility/', 'Utility commands'],
    ['.ai/commands/system/', 'System commands'],
    ['.ai/rules/', 'Rules directory'],
    ['.ai/skills/', 'Skills directory'],
    ['.ai/agents/', 'Agents directory'],
    ['.ai/output-styles/', 'Output styles directory'],
    ['.ai/hooks/', 'Hooks directory'],
    ['.ai/adapters/', 'Adapters directory']
  ];

  let allPassed = true;
  for (const [filePath, desc] of required) {
    if (filePath.endsWith('/')) {
      if (!checkDirectory(filePath.slice(0, -1), desc)) allPassed = false;
    } else {
      if (!checkExists(filePath, desc)) allPassed = false;
    }
  }
  return allPassed;
}

function verifyWorkflowCommands() {
  log('\n3. Workflow Commands', 'blue');
  const commands = ['van', 'plan', 'creative', 'implement', 'reflect', 'archive'];

  let allPassed = true;
  for (const cmd of commands) {
    if (!checkExists(`.ai/commands/workflow/${cmd}.md`, `/${cmd} command`)) {
      allPassed = false;
    }
  }
  return allPassed;
}

function verifyUtilityCommands() {
  log('\n4. Utility Commands', 'blue');
  const commands = ['task-init', 'task-next', 'debug', 'review-code', 'write-tests'];

  let allPassed = true;
  for (const cmd of commands) {
    if (!checkExists(`.ai/commands/utility/${cmd}.md`, `/${cmd} command`)) {
      allPassed = false;
    }
  }
  return allPassed;
}

function verifySystemCommands() {
  log('\n5. System Commands', 'blue');
  const commands = ['commit', 'resume'];

  let allPassed = true;
  for (const cmd of commands) {
    if (!checkExists(`.ai/commands/system/${cmd}.md`, `/${cmd} command`)) {
      allPassed = false;
    }
  }
  return allPassed;
}

function verifyGeneratedConfigs() {
  log('\n6. Generated Tool Configurations', 'blue');
  const configs = [
    ['.cursorrules', 'Cursor rules'],
    ['CLAUDE.md', 'Claude Code config'],
    ['GEMINI.md', 'Gemini CLI config']
  ];

  let allPassed = true;
  for (const [file, desc] of configs) {
    if (!checkExists(file, desc)) allPassed = false;
  }
  return allPassed;
}

function verifyToolDirectories() {
  log('\n7. Tool-specific Directories', 'blue');
  const dirs = [
    ['.cursor/', 'Cursor directory'],
    ['.cursor/commands/', 'Cursor commands'],
    ['.claude/', 'Claude Code directory'],
    ['.claude/commands/', 'Claude Code commands'],
    ['.claude/skills/', 'Claude Code skills'],
    ['.claude/agents/', 'Claude Code agents'],
    ['.claude/output-styles/', 'Claude Code output styles'],
    ['.claude/settings.json', 'Claude Code settings'],
    ['.gemini/', 'Gemini CLI directory'],
    ['.gemini/settings.json', 'Gemini CLI settings'],
    ['.gemini/commands/', 'Gemini CLI commands']
  ];

  let allPassed = true;
  for (const [filePath, desc] of dirs) {
    if (filePath.endsWith('/')) {
      if (!checkDirectory(filePath.slice(0, -1), desc)) allPassed = false;
    } else {
      if (!checkExists(filePath, desc)) allPassed = false;
    }
  }
  return allPassed;
}

function verifyClaudeCodeFeatures() {
  log('\n8. Claude Code Advanced Features', 'blue');
  const features = [
    ['.ai/skills/repo-guard/SKILL.md', 'repo-guard skill'],
    ['.ai/agents/test-runner.md', 'test-runner agent'],
    ['.ai/agents/code-reviewer.md', 'code-reviewer agent'],
    ['.ai/output-styles/spec-writer.md', 'spec-writer style'],
    ['.ai/output-styles/concise.md', 'concise style'],
    ['.ai/hooks/deny-dangerous-bash.py', 'deny-dangerous-bash hook'],
    ['.ai/hooks/forbid-write-main.py', 'forbid-write-main hook']
  ];

  let allPassed = true;
  for (const [file, desc] of features) {
    if (!checkExists(file, desc)) allPassed = false;
  }
  return allPassed;
}

function main() {
  log('============================================', 'bold');
  log('  Universal AI Copilot Template Verifier', 'bold');
  log('============================================', 'bold');

  const results = [];

  results.push(['Memory Bank', verifyMemoryBank()]);
  results.push(['AI Configuration', verifyAIConfig()]);
  results.push(['Workflow Commands', verifyWorkflowCommands()]);
  results.push(['Utility Commands', verifyUtilityCommands()]);
  results.push(['System Commands', verifySystemCommands()]);
  results.push(['Generated Configs', verifyGeneratedConfigs()]);
  results.push(['Tool Directories', verifyToolDirectories()]);
  results.push(['Claude Code Features', verifyClaudeCodeFeatures()]);

  // Summary
  log('\n============================================', 'bold');
  log('  Summary', 'bold');
  log('============================================', 'bold');

  let allPassed = true;
  for (const [name, passed] of results) {
    const status = passed ? `${colors.green}PASS` : `${colors.red}FAIL`;
    console.log(`  ${status}${colors.reset} ${name}`);
    if (!passed) allPassed = false;
  }

  console.log();

  if (allPassed) {
    log('All checks passed! Your setup is complete.', 'green');
    log('\nYou can now use:', 'reset');
    log('  /van        - Initialize project', 'reset');
    log('  /plan       - Plan tasks', 'reset');
    log('  /creative   - Design architecture', 'reset');
    log('  /implement  - Write code', 'reset');
    log('  /reflect    - Review progress', 'reset');
    log('  /archive    - Archive documentation', 'reset');
    process.exit(0);
  } else {
    log('Some checks failed. Please run:', 'yellow');
    log('  npm run ai-sync', 'reset');
    log('\nOr initialize fresh with:', 'reset');
    log('  npm run ai-init', 'reset');
    process.exit(1);
  }
}

main();
