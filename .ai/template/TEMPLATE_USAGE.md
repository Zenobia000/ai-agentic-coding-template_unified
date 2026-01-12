# 📋 Template Usage Guide for AI Commands

## Purpose
This guide ensures all AI tools (Cursor, Claude Code, Gemini CLI) use standardized templates when executing workflow commands.

## Core Principle
**Every workflow command MUST:**
1. Load the template from `.ai/template/outputs/[command]/`
2. Fill template variables with actual data
3. Save output to `memory-bank/` specified location
4. Never create ad-hoc documents outside the template system

## Template Execution Process

### Step 1: Load Template
```javascript
// Example for /van command
const template = readFile('.ai/template/outputs/van/requirements-spec.md');
```

### Step 2: Prepare Data
Collect all required information:
```javascript
const data = {
  // Global metadata (always available)
  timestamp: new Date().toISOString(),
  date: new Date().toISOString().split('T')[0],
  project_name: 'from package.json',
  version: '1.0.0',
  ai_tool: 'claude', // or cursor, gemini

  // Command-specific data
  problem_statement: 'User provided description',
  business_goals: ['Goal 1', 'Goal 2'],
  // ... other required fields
};
```

### Step 3: Fill Template
Replace all `{{variable}}` placeholders:
```javascript
const output = Mustache.render(template, data);
```

### Step 4: Save to Memory Bank
```javascript
// Determine output path based on config
const outputPath = 'memory-bank/requirements/requirements-2024-01-12T10:30:00.md';
writeFile(outputPath, output);
```

## Command-Specific Instructions

### `/van` - Requirements Analysis
```yaml
Template: outputs/van/requirements-spec.md
Output: memory-bank/requirements/requirements-{{timestamp}}.md
Required Variables:
  - problem_statement
  - business_goals[]
  - success_criteria[]
  - core_features[]
  - constraints
```

### `/plan` - Task Planning
```yaml
Template: outputs/plan/tasks.md
Output: memory-bank/tasks.md (overwrite)
Required Variables:
  - epic_id
  - epic_name
  - phase1_tasks[]
  - phase2_tasks[]
  - milestones[]
```

### `/adr` - Architecture Decision
```yaml
Template: outputs/adr/adr-template.md
Output: memory-bank/decisions/adr-{{number}}-{{slug}}.md
Required Variables:
  - number (e.g., 001, 002)
  - title
  - status (proposed/accepted/deprecated)
  - context_description
  - chosen_solution
  - options[]
```

### `/creative` - Architecture Design
```yaml
Template: outputs/creative/architecture-design.md
Output: memory-bank/designs/architecture/architecture-{{version}}.md
Additional: memory-bank/techContext.md (overwrite)
Required Variables:
  - architecture_pattern
  - components[]
  - data_flows[]
  - security_layers[]
```

### `/design-validator` - Validation
```yaml
Template: outputs/design-validator/validation-report.md
Output: memory-bank/validation/report-{{timestamp}}.md
Required Variables:
  - overall_score
  - passed_validations[]
  - warnings[]
  - critical_issues[]
```

### `/implement` - Implementation Guide
```yaml
Template: outputs/implement/implementation-guide.md
Output: memory-bank/implementation/guide-{{version}}.md
Required Variables:
  - implementation_phases[]
  - code_structure
  - testing_strategy
```

### `/reflect` - Progress Report
```yaml
Template: outputs/reflect/progress-report.md
Output: memory-bank/progress.md (overwrite)
Additional: memory-bank/metrics/dashboard.json
Required Variables:
  - completed_tasks[]
  - pending_tasks[]
  - blockers[]
  - metrics

## Variable Naming Convention

### Global Variables (Available to all templates)
- `{{timestamp}}` - ISO 8601 format: 2024-01-12T10:30:00Z
- `{{date}}` - Date only: 2024-01-12
- `{{project_name}}` - From package.json
- `{{version}}` - Project version
- `{{ai_tool}}` - cursor/claude/gemini
- `{{user}}` - Current user
- `{{git_branch}}` - Current branch
- `{{git_commit}}` - Short commit hash

### Arrays in Templates
```mustache
{{#array_name}}
- {{property}}
{{/array_name}}
```

### Conditionals
```mustache
{{#has_warnings}}
⚠️ Warnings found
{{/has_warnings}}
```

## File Naming Rules

### Timestamp Format
- Use ISO 8601: `2024-01-12T10:30:00Z`
- For filenames, replace `:` with `-`: `2024-01-12T10-30-00Z`

### Version Format
- Semantic versioning: `1.0.0`, `2.1.3`
- For filenames: `v1.0.0`, `v2.1.3`

### Slug Format
- Lowercase, hyphenated: `database-selection`, `api-design`

## Validation Rules

Before saving any output:
1. ✅ All required variables are filled
2. ✅ No `{{variable}}` placeholders remain
3. ✅ Output directory exists
4. ✅ File naming follows convention
5. ✅ Respect overwrite settings

## Error Handling

If template processing fails:
```text
ERROR: Template variable missing: {{variable_name}}
ACTION: Request missing information from user
FALLBACK: Use default value if appropriate
```

## Testing Templates

Test your template filling:
```bash
# Generate test output
node scripts/template-generator.js --command van --data test-data.json

# Verify output
cat memory-bank/requirements/requirements-*.md
```

## Important Notes

1. **Never modify templates during execution** - Templates are source of truth
2. **Always use timestamps** - Ensures unique filenames and traceability
3. **Respect overwrite rules** - Some files like tasks.md should be overwritten
4. **Create directories** - Ensure output directories exist before writing
5. **Report success** - Always confirm file generation and location

---

*This guide is mandatory for all AI tools executing workflow commands*