#!/usr/bin/env python3
"""
Hook: Deny Dangerous Bash Commands
Purpose: Block potentially destructive bash commands before execution.
Exit Code 2: Blocks the tool call and returns stderr to AI.
"""
import json
import sys
import re

# Dangerous command patterns to block
DANGEROUS_PATTERNS = [
    r"\brm\s+-rf\s+/\s*$",          # rm -rf /
    r"\brm\s+-rf\s+\*\s*$",          # rm -rf *
    r"\brm\s+-rf\s+\.\s*$",          # rm -rf .
    r"\bmkfs\.",                      # mkfs.* (format disk)
    r"\bdd\s+if=",                    # dd if= (disk operations)
    r">\s*/dev/sd",                   # Write to disk devices
    r"\bchmod\s+-R\s+777\s+/",        # chmod -R 777 /
    r"\bchown\s+-R\s+.*\s+/\s*$",     # chown -R ... /
    r":(){.*};:",                     # Fork bomb
    r"\bsudo\s+rm\s+-rf",             # sudo rm -rf
]

# Commands that require confirmation (warning only)
WARNING_PATTERNS = [
    r"\brm\s+-rf",                    # Any rm -rf
    r"\bgit\s+push\s+.*--force",      # Force push
    r"\bgit\s+reset\s+--hard",        # Hard reset
    r"\bdrop\s+database",             # Drop database
    r"\btruncate\s+table",            # Truncate table
]


def main():
    # Read tool input from stdin
    try:
        data = json.load(sys.stdin)
    except json.JSONDecodeError:
        sys.exit(0)  # Allow if can't parse

    tool_name = data.get("tool_name", "")
    tool_input = data.get("tool_input", {}) or {}

    # Only check Bash commands
    if tool_name != "Bash":
        sys.exit(0)

    command = tool_input.get("command", "")
    if not command:
        sys.exit(0)

    # Check for dangerous patterns (block)
    for pattern in DANGEROUS_PATTERNS:
        if re.search(pattern, command, re.IGNORECASE):
            print(
                f"BLOCKED: Dangerous command pattern detected.\n"
                f"Pattern: {pattern}\n"
                f"Command: {command}\n\n"
                f"This command could cause irreversible damage. "
                f"Please use a safer alternative.",
                file=sys.stderr
            )
            sys.exit(2)  # Exit code 2 blocks the tool call

    # Check for warning patterns (allow but warn)
    for pattern in WARNING_PATTERNS:
        if re.search(pattern, command, re.IGNORECASE):
            print(
                f"WARNING: Potentially dangerous command.\n"
                f"Pattern: {pattern}\n"
                f"Command: {command}\n\n"
                f"Proceeding with caution. Ensure this is intentional.",
                file=sys.stderr
            )
            # Don't block, just warn (exit 0)
            break

    sys.exit(0)  # Allow command


if __name__ == "__main__":
    main()
