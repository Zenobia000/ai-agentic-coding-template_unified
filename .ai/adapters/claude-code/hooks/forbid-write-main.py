#!/usr/bin/env python3
"""
Hook: Forbid Write on Main Branch
Purpose: Block file writes when on main/master branch.
Exit Code 2: Blocks the tool call and returns stderr to AI.
"""
import json
import sys
import subprocess


def get_current_branch():
    """Get the current git branch name."""
    try:
        result = subprocess.run(
            ["git", "rev-parse", "--abbrev-ref", "HEAD"],
            capture_output=True,
            text=True,
            timeout=5
        )
        if result.returncode == 0:
            return result.stdout.strip()
    except (subprocess.TimeoutExpired, FileNotFoundError):
        pass
    return None


def main():
    # Read tool input from stdin
    try:
        data = json.load(sys.stdin)
    except json.JSONDecodeError:
        sys.exit(0)  # Allow if can't parse

    tool_name = data.get("tool_name", "")

    # Only check Write and Edit tools
    if tool_name not in ("Write", "Edit"):
        sys.exit(0)

    # Get current branch
    branch = get_current_branch()
    if branch is None:
        sys.exit(0)  # Allow if not in git repo

    # Protected branches
    protected_branches = ["main", "master", "production", "prod"]

    if branch.lower() in protected_branches:
        tool_input = data.get("tool_input", {}) or {}
        file_path = tool_input.get("file_path", "unknown")

        print(
            f"BLOCKED: Cannot write files on protected branch.\n"
            f"Current branch: {branch}\n"
            f"File: {file_path}\n\n"
            f"Please create a feature branch first:\n"
            f"  git checkout -b feature/your-feature-name\n\n"
            f"Then make your changes and create a pull request.",
            file=sys.stderr
        )
        sys.exit(2)  # Exit code 2 blocks the tool call

    sys.exit(0)  # Allow on non-protected branches


if __name__ == "__main__":
    main()
