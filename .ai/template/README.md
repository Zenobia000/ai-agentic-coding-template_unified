# Template System

## Quick Start

All workflow commands use mandatory templates from `.ai/template/outputs/`:

| Command | Template Location | Output Location |
|---------|------------------|-----------------|
| `/van` | `outputs/van/requirements-spec.md` | `memory-bank/requirements/` |
| `/plan` | `outputs/plan/tasks.md` | `memory-bank/tasks.md` |
| `/adr` | `outputs/adr/adr-template.md` | `memory-bank/decisions/` |
| `/creative` | `outputs/creative/architecture-design.md` | `memory-bank/designs/architecture/` |
| `/design-validator` | `outputs/design-validator/validation-report.md` | `memory-bank/validation/` |
| `/implement` | `outputs/implement/implementation-guide.md` | `memory-bank/implementation/` |
| `/reflect` | `outputs/reflect/progress-report.md` | `memory-bank/progress.md` |

## How It Works

1. **Template Loading**: Commands automatically load their template
2. **Variable Filling**: Replace `{{variables}}` with actual data
3. **Output Generation**: Save to memory-bank with proper naming
4. **Enforcement**: System blocks commands that don't use templates

## Integration Flow

```
Core Workflow: /van → /plan → /adr → /creative → /design-validator → /implement → /reflect
                        ↕         ↕                                      ↕          ↕
Utility:         /task-next   /debug                            /review-code  /write-tests
```

## Configuration

- **Template Config**: `outputs/config.yaml` - defines all template mappings
- **Enforcement Rules**: `/enforcement.yaml` - mandatory validation rules
- **Template Generator**: `scripts/template-generator.js` - CLI tool for testing

## For AI Tools

When executing any workflow command:
1. Check template exists in `outputs/[command]/`
2. Load template and fill all variables
3. Save to memory-bank only
4. Report success with file location

---
*Templates are mandatory, not optional. Enforcement is automatic.*