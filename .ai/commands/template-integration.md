# Template Integration Guide

## Overview
This guide ensures all workflow commands use standardized templates and automatically save outputs to memory-bank.

## Command Template Mappings

### 1. `/van` - Requirements Analysis
**Templates Used**:
- `.ai/template/outputs/van/requirements-spec.md`
**Output Location**:
- `memory-bank/requirements/requirements-[timestamp].md`
- `memory-bank/activeContext.md` (overwrite)

### 2. `/plan` - Conceptual Design
**Templates Used**:
- `.ai/template/outputs/plan/tasks.md`
**Output Location**:
- `memory-bank/tasks.md` (overwrite)
- `memory-bank/planning/wbs-[epic].md`

### 3. `/adr` - Tech Selection
**Templates Used**:
- `.ai/template/outputs/adr/adr-template.md`
**Output Location**:
- `memory-bank/decisions/adr-[number]-[slug].md`
- `memory-bank/decisions/registry.yaml` (update)

### 4. `/creative` - Architecture Design
**Templates Used**:
- `.ai/template/outputs/creative/architecture-design.md`
**Output Location**:
- `memory-bank/designs/architecture/architecture-[version].md`
- `memory-bank/techContext.md` (overwrite)

### 5. `/design-validator` - Detail Design & Validation
**Templates Used**:
- `.ai/template/outputs/design-validator/validation-report.md`
- `.ai/template/outputs/design-validator/openapi-spec.yaml`
**Output Location**:
- `memory-bank/validation/report-[timestamp].md`
- `memory-bank/designs/api/openapi-[version].yaml`

### 6. `/implement` - Implementation
**Templates Used**:
- `.ai/template/outputs/implement/implementation-guide.md`
**Output Location**:
- `memory-bank/implementation/guide-[version].md`

### 7. `/reflect` - Evolution & Optimization
**Templates Used**:
- `.ai/template/outputs/reflect/progress-report.md`
**Output Location**:
- `memory-bank/progress.md` (overwrite)
- `memory-bank/metrics/dashboard.json` (overwrite)

## AI Tool Instructions

When executing any workflow command, follow these steps:

1. **Load Template**: Read the corresponding template from `.ai/template/outputs/[command]/`
2. **Gather Data**: Collect required information from context and user input
3. **Fill Template**: Replace all `{{variables}}` with actual values
4. **Save to Memory Bank**: Write output to specified location in `memory-bank/`
5. **Confirm**: Report successful generation and file location

## Template Variables

All templates support these global variables:
- `{{timestamp}}` - ISO 8601 timestamp
- `{{date}}` - Current date (YYYY-MM-DD)
- `{{project_name}}` - From package.json
- `{{version}}` - Project version
- `{{ai_tool}}` - Current AI tool (cursor/claude/gemini)
- `{{git_branch}}` - Current git branch
- `{{git_commit}}` - Current commit hash

## Example Usage

```javascript
// When /van command is executed:
1. Read: .ai/template/outputs/van/requirements-spec.md
2. Fill variables with gathered requirements
3. Save to: memory-bank/requirements/requirements-2024-01-12T10:30:00.md
4. Update: memory-bank/activeContext.md
```

## Validation

Before saving, ensure:
- All required variables are filled
- Output directory exists (create if needed)
- File naming follows convention
- Overwrite rules are respected