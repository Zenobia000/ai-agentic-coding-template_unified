#!/usr/bin/env node
/**
 * Setup Template Enforcement System
 * Configures hooks and validation for mandatory template usage
 */

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const { execSync } = require("child_process");

const ROOT_DIR = path.resolve(__dirname, "..");
const AI_DIR = path.join(ROOT_DIR, ".ai");
const HOOKS_DIR = path.join(AI_DIR, "adapters", "claude-code", "hooks");
const ENFORCEMENT_CONFIG = path.join(AI_DIR, "enforcement.yaml");

/**
 * Setup enforcement system
 */
function setupEnforcement() {
  console.log("\n🔒 Setting up Template Enforcement System...\n");

  // 1. Check Python availability
  try {
    execSync("python3 --version", { stdio: "ignore" });
    console.log("✅ Python3 available");
  } catch (error) {
    console.error("❌ Python3 is required for enforcement hooks");
    process.exit(1);
  }

  // 2. Make hook executable
  const hookScript = path.join(HOOKS_DIR, "command-enforcer.py");
  if (fs.existsSync(hookScript)) {
    try {
      fs.chmodSync(hookScript, "755");
      console.log("✅ Enforcement hook made executable");
    } catch (error) {
      console.warn("⚠️ Could not set hook permissions:", error.message);
    }
  }

  // 3. Load enforcement config
  if (!fs.existsSync(ENFORCEMENT_CONFIG)) {
    console.error("❌ Enforcement config not found:", ENFORCEMENT_CONFIG);
    process.exit(1);
  }

  const config = yaml.load(fs.readFileSync(ENFORCEMENT_CONFIG, "utf8"));
  console.log("✅ Enforcement config loaded");

  // 4. Create git hooks for enforcement
  const gitHooksDir = path.join(ROOT_DIR, ".git", "hooks");
  if (fs.existsSync(gitHooksDir)) {
    // Create pre-commit hook
    const preCommitHook = `#!/bin/bash
# Template Enforcement Pre-commit Hook
# Validates that workflow commands used templates

# Check if any workflow commands were executed
if [ -f "memory-bank/.enforcement.log" ]; then
  python3 "${hookScript}" --report > /tmp/enforcement-report.json

  # Check for violations
  violations=$(cat /tmp/enforcement-report.json | grep -c '"severity": "HIGH"' || true)

  if [ "$violations" -gt 0 ]; then
    echo "⚠️ Template enforcement violations detected!"
    echo "Please ensure all workflow commands use standardized templates."
    cat /tmp/enforcement-report.json
    exit 1
  fi
fi

exit 0
`;

    const preCommitPath = path.join(gitHooksDir, "pre-commit");
    fs.writeFileSync(preCommitPath, preCommitHook);
    fs.chmodSync(preCommitPath, "755");
    console.log("✅ Git pre-commit hook installed");
  }

  // 5. Setup AI tool integrations
  setupAIToolIntegrations(config);

  // 6. Initialize enforcement log
  const memoryBankDir = path.join(ROOT_DIR, "memory-bank");
  if (!fs.existsSync(memoryBankDir)) {
    fs.mkdirSync(memoryBankDir, { recursive: true });
  }

  const enforcementLog = path.join(memoryBankDir, ".enforcement.log");
  if (!fs.existsSync(enforcementLog)) {
    const initialEntry = {
      timestamp: new Date().toISOString(),
      event: "ENFORCEMENT_INITIALIZED",
      version: config.version,
      settings: {
        strict_mode: config.enforcement.strict_mode,
        block_on_violation: config.enforcement.block_on_violation
      }
    };
    fs.writeFileSync(enforcementLog, JSON.stringify(initialEntry) + "\n");
    console.log("✅ Enforcement log initialized");
  }

  // 7. Create validation script
  const validateScript = `#!/bin/bash
# Quick validation script for workflow commands

COMMAND=$1
OUTPUT_FILE=$2

if [ -z "$COMMAND" ]; then
  echo "Usage: validate.sh <command> [output-file]"
  exit 1
fi

echo "Validating $COMMAND..."

# Pre-command check
python3 "${hookScript}" --check "$COMMAND"

if [ $? -ne 0 ]; then
  echo "❌ Pre-command validation failed"
  exit 1
fi

# Post-command check if output provided
if [ -n "$OUTPUT_FILE" ]; then
  python3 "${hookScript}" --validate "$COMMAND" --files "$OUTPUT_FILE"

  if [ $? -ne 0 ]; then
    echo "❌ Post-command validation failed"
    exit 1
  fi
fi

echo "✅ Validation passed"
`;

  const validateScriptPath = path.join(ROOT_DIR, "validate.sh");
  fs.writeFileSync(validateScriptPath, validateScript);
  fs.chmodSync(validateScriptPath, "755");
  console.log("✅ Validation script created: validate.sh");

  console.log("\n🎯 Enforcement System Setup Complete!\n");
  console.log("Template enforcement is now ACTIVE for all workflow commands.");
  console.log("\nKey features enabled:");
  console.log("  • Pre-command template verification");
  console.log("  • Post-command output validation");
  console.log("  • Git hook integration");
  console.log("  • Enforcement logging");
  console.log("\nCommands affected:");

  Object.keys(config.commands).forEach(cmd => {
    if (config.commands[cmd].enforce) {
      console.log(`  • ${cmd} - Template required`);
    }
  });

  console.log("\n📊 Check enforcement status:");
  console.log("  python3 .ai/hooks/command-enforcer.py --report");
  console.log("\n✨ Template enforcement ensures consistent, professional outputs!");
}

/**
 * Setup AI tool specific integrations
 */
function setupAIToolIntegrations(config) {
  // Create wrapper scripts for each AI tool
  const tools = ["cursor", "claude", "gemini"];

  tools.forEach(tool => {
    if (config.ai_tools[tool] && config.ai_tools[tool].enforce) {
      console.log(`  • Configuring ${tool} enforcement...`);

      // Tool-specific configuration would go here
      // For now, we rely on the AI reading the enforcement rules
    }
  });
}

/**
 * Verify enforcement is working
 */
function verifyEnforcement() {
  const hookScript = path.join(HOOKS_DIR, "command-enforcer.py");

  try {
    // Test pre-command check
    execSync(`python3 "${hookScript}" --check /van`, { stdio: "ignore" });
    console.log("✅ Enforcement system operational");
    return true;
  } catch (error) {
    console.error("❌ Enforcement system test failed");
    return false;
  }
}

// Main execution
function main() {
  console.log("Template Enforcement Setup");
  console.log("=========================");

  setupEnforcement();

  if (verifyEnforcement()) {
    console.log("\n✅ All systems operational!");
    console.log("Template enforcement is now protecting your workflow.\n");
  } else {
    console.log("\n⚠️ Please check the enforcement system manually.\n");
  }
}

if (require.main === module) {
  main();
}