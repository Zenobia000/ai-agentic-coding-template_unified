#!/usr/bin/env python3
"""
Command Template Enforcer
Ensures all workflow commands use standardized templates and save to memory-bank
"""

import os
import sys
import json
import yaml
import hashlib
from datetime import datetime
from pathlib import Path

# Define project root
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
TEMPLATE_DIR = PROJECT_ROOT / ".ai" / "template" / "outputs"
MEMORY_BANK = PROJECT_ROOT / "memory-bank"
ENFORCEMENT_LOG = MEMORY_BANK / ".enforcement.log"

# Command template mappings (enforced)
COMMAND_TEMPLATES = {
    # Core workflow commands
    "/van": {
        "templates": ["van/requirements-spec.md"],
        "outputs": ["requirements/requirements-*.md", "activeContext.md"],
        "required": True
    },
    "/plan": {
        "templates": ["plan/tasks.md"],
        "outputs": ["tasks.md", "planning/wbs-*.md"],
        "required": True
    },
    "/adr": {
        "templates": ["adr/adr-template.md"],
        "outputs": ["decisions/adr-*-*.md"],
        "required": True
    },
    "/creative": {
        "templates": ["creative/architecture-design.md"],
        "outputs": ["designs/architecture/architecture-*.md", "techContext.md"],
        "required": True
    },
    "/design-validator": {
        "templates": ["design-validator/validation-report.md"],
        "outputs": ["validation/report-*.md", "designs/api/openapi-*.yaml"],
        "required": True
    },
    "/implement": {
        "templates": ["implement/implementation-guide.md"],
        "outputs": ["implementation/guide-*.md"],
        "required": True
    },
    "/reflect": {
        "templates": ["reflect/progress-report.md"],
        "outputs": ["progress.md", "metrics/dashboard.json"],
        "required": True
    },
    # Utility commands with templates
    "/task-next": {
        "templates": ["task-next/pm-recommendation.md"],
        "outputs": ["recommendations/pm-recommendation-*.md"],
        "required": True,
        "links_to": ["/plan"]
    },
    "/debug": {
        "templates": ["debug/root-cause-analysis.md"],
        "outputs": ["debug/debug-*-*.md"],
        "required": True,
        "links_to": ["/implement"]
    },
    "/review-code": {
        "templates": ["review-code/code-review-report.md"],
        "outputs": ["reviews/review-*-*.md"],
        "required": True,
        "links_to": ["/implement", "/write-tests"]
    },
    "/write-tests": {
        "templates": ["write-tests/test-strategy.md"],
        "outputs": ["tests/test-strategy-*-*.md"],
        "required": True,
        "links_to": ["/implement", "/review-code"]
    }
}

class TemplateEnforcer:
    """Enforces template usage for workflow commands"""

    def __init__(self):
        self.violations = []
        self.command_history = []
        self.load_history()

    def load_history(self):
        """Load command execution history"""
        if ENFORCEMENT_LOG.exists():
            with open(ENFORCEMENT_LOG, 'r') as f:
                for line in f:
                    if line.strip():
                        self.command_history.append(json.loads(line))

    def log_execution(self, command, status, details):
        """Log command execution"""
        entry = {
            "timestamp": datetime.now().isoformat(),
            "command": command,
            "status": status,
            "details": details
        }

        # Append to log file
        ENFORCEMENT_LOG.parent.mkdir(parents=True, exist_ok=True)
        with open(ENFORCEMENT_LOG, 'a') as f:
            f.write(json.dumps(entry) + "\n")

        self.command_history.append(entry)

    def validate_command(self, command):
        """Validate that a command will use proper templates"""
        if command not in COMMAND_TEMPLATES:
            # Not a workflow command, no enforcement needed
            return True, "Not a workflow command"

        config = COMMAND_TEMPLATES[command]

        # Check if templates exist
        for template_path in config["templates"]:
            full_path = TEMPLATE_DIR / template_path
            if not full_path.exists():
                self.violations.append({
                    "type": "MISSING_TEMPLATE",
                    "command": command,
                    "template": str(template_path),
                    "severity": "CRITICAL"
                })
                return False, f"Template missing: {template_path}"

        return True, "Templates available"

    def validate_output(self, command, generated_files=None):
        """Validate that command generated proper outputs"""
        if command not in COMMAND_TEMPLATES:
            return True, "Not a workflow command"

        config = COMMAND_TEMPLATES[command]

        # Check if required outputs were created
        if generated_files:
            # Verify files are in memory-bank
            for file_path in generated_files:
                if not str(file_path).startswith(str(MEMORY_BANK)):
                    self.violations.append({
                        "type": "INVALID_OUTPUT_LOCATION",
                        "command": command,
                        "file": str(file_path),
                        "severity": "HIGH"
                    })
                    return False, f"Output not in memory-bank: {file_path}"

        # Check output patterns
        found_outputs = []
        for pattern in config["outputs"]:
            # Convert pattern to Path and check existence
            pattern_path = MEMORY_BANK / pattern.replace("*", "")
            if pattern_path.parent.exists():
                # Check for files matching pattern
                matches = list(pattern_path.parent.glob(pattern_path.name.replace("*", "*")))
                if matches:
                    found_outputs.extend(matches)

        if not found_outputs and config.get("required", True):
            self.violations.append({
                "type": "NO_OUTPUT_GENERATED",
                "command": command,
                "severity": "HIGH"
            })
            return False, "No outputs generated"

        return True, f"Found {len(found_outputs)} outputs"

    def check_template_usage(self, command, content):
        """Check if content appears to use template structure"""
        if command not in COMMAND_TEMPLATES:
            return True, "Not a workflow command"

        # Load template to compare structure
        config = COMMAND_TEMPLATES[command]
        template_path = TEMPLATE_DIR / config["templates"][0]

        if template_path.exists():
            with open(template_path, 'r') as f:
                template_content = f.read()

            # Check for template markers
            has_frontmatter = content.startswith("---\n") and "\n---\n" in content
            has_structure = False

            # Extract main headings from template
            template_headings = [line.strip() for line in template_content.split('\n')
                                if line.startswith('#')]

            # Check if generated content has similar structure
            content_headings = [line.strip() for line in content.split('\n')
                               if line.startswith('#')]

            # Calculate structural similarity
            if template_headings and content_headings:
                matches = sum(1 for h in template_headings[:5] if h in content_headings)
                has_structure = matches >= 3  # At least 3 main headings match

            if not has_frontmatter:
                self.violations.append({
                    "type": "MISSING_FRONTMATTER",
                    "command": command,
                    "severity": "MEDIUM"
                })

            if not has_structure:
                self.violations.append({
                    "type": "TEMPLATE_NOT_USED",
                    "command": command,
                    "severity": "HIGH"
                })
                return False, "Content doesn't match template structure"

        return True, "Template structure detected"

    def validate_linkages(self, command, content=None):
        """Validate that utility commands properly link to parent commands"""
        if command not in COMMAND_TEMPLATES:
            return True, "Not a workflow command"

        config = COMMAND_TEMPLATES[command]
        links_to = config.get("links_to", [])

        if not links_to:
            return True, "No linkage requirements"

        # Check that parent command outputs exist
        missing_parents = []
        for parent_cmd in links_to:
            if parent_cmd in COMMAND_TEMPLATES:
                parent_config = COMMAND_TEMPLATES[parent_cmd]
                # Check if any parent outputs exist
                parent_found = False
                for pattern in parent_config["outputs"]:
                    pattern_path = MEMORY_BANK / pattern.replace("*", "")
                    if pattern_path.parent.exists():
                        matches = list(pattern_path.parent.glob(pattern_path.name.replace("*", "*")))
                        if matches:
                            parent_found = True
                            break

                if not parent_found:
                    missing_parents.append(parent_cmd)

        if missing_parents:
            self.violations.append({
                "type": "MISSING_PARENT_OUTPUT",
                "command": command,
                "missing_parents": missing_parents,
                "severity": "HIGH"
            })
            return False, f"Parent command outputs missing: {', '.join(missing_parents)}"

        # If content provided, check for references to parent outputs
        if content and links_to:
            has_reference = False
            for parent_cmd in links_to:
                # Check if content references parent command outputs
                if f"memory-bank/" in content or f"{parent_cmd[1:]}" in content:
                    has_reference = True
                    break

            if not has_reference:
                self.violations.append({
                    "type": "NO_PARENT_REFERENCE",
                    "command": command,
                    "severity": "MEDIUM"
                })
                return False, "Content doesn't reference parent command outputs"

        return True, "Linkage validation passed"

    def enforce_pre_command(self, command):
        """Pre-command enforcement hook"""
        valid, message = self.validate_command(command)

        if not valid:
            print(f"\n❌ ENFORCEMENT FAILED: {message}")
            print(f"Command '{command}' blocked due to template enforcement rules.")
            print("\nRequired action:")
            print(f"1. Ensure template exists: .ai/template/outputs/{COMMAND_TEMPLATES[command]['templates'][0]}")
            print("2. Use the template when executing the command")
            print("3. Save output to memory-bank/")

            self.log_execution(command, "BLOCKED", message)
            return False

        print(f"\n✅ Template enforcement check passed for {command}")
        return True

    def enforce_post_command(self, command, output_files=None, content=None):
        """Post-command enforcement hook"""
        results = []

        # Validate outputs
        valid_output, output_message = self.validate_output(command, output_files)
        results.append(("Output validation", valid_output, output_message))

        # Check template usage if content provided
        if content:
            valid_template, template_message = self.check_template_usage(command, content)
            results.append(("Template usage", valid_template, template_message))

        # Validate linkages for utility commands
        valid_linkage, linkage_message = self.validate_linkages(command, content)
        results.append(("Linkage validation", valid_linkage, linkage_message))

        # Log results
        all_valid = all(r[1] for r in results)
        details = {r[0]: {"valid": r[1], "message": r[2]} for r in results}

        self.log_execution(command, "SUCCESS" if all_valid else "VIOLATION", details)

        if not all_valid:
            print(f"\n⚠️ TEMPLATE ENFORCEMENT VIOLATIONS DETECTED:")
            for check_name, valid, message in results:
                if not valid:
                    print(f"  - {check_name}: {message}")

            print("\nRequired corrections:")
            print("1. Use the provided template from .ai/template/outputs/")
            print("2. Fill all required template variables")
            print("3. Save to the correct memory-bank location")

            return False

        print(f"\n✅ All enforcement checks passed for {command}")
        return True

    def generate_report(self):
        """Generate enforcement report"""
        report = {
            "timestamp": datetime.now().isoformat(),
            "total_commands": len(self.command_history),
            "violations": self.violations,
            "enforcement_rate": 0
        }

        if self.command_history:
            successful = sum(1 for cmd in self.command_history
                           if cmd["status"] == "SUCCESS")
            report["enforcement_rate"] = (successful / len(self.command_history)) * 100

        return report

def main():
    """CLI interface for enforcement checks"""
    import argparse

    parser = argparse.ArgumentParser(description="Template Enforcement System")
    parser.add_argument("--check", help="Check command before execution")
    parser.add_argument("--validate", help="Validate after execution")
    parser.add_argument("--report", action="store_true", help="Generate report")
    parser.add_argument("--files", nargs="+", help="Output files to validate")

    args = parser.parse_args()

    enforcer = TemplateEnforcer()

    if args.report:
        report = enforcer.generate_report()
        print(json.dumps(report, indent=2))

    elif args.check:
        valid = enforcer.enforce_pre_command(args.check)
        sys.exit(0 if valid else 1)

    elif args.validate:
        valid = enforcer.enforce_post_command(args.validate, args.files)
        sys.exit(0 if valid else 1)

    else:
        parser.print_help()

if __name__ == "__main__":
    main()