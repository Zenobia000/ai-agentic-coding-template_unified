---
name: "ARCHIVE - Documentation and Knowledge Preservation"
description: "Finalize documentation, preserve project knowledge, and prepare for deployment or handover"
phase: "completion"
prerequisites: ["completed implementation", "retrospective analysis"]
creates: ["final documentation", "deployment guides", "knowledge archive"]
tools:
  cursor:
    trigger: "/archive"
    description: "ARCHIVE MODE - Documentation and knowledge preservation"
  claude-code:
    trigger: "/archive"
    description: "Archive the project documentation and preserve knowledge"
    allowed-tools: ["Read", "Write", "Edit", "Bash"]
  gemini-cli:
    trigger: "/archive"
    description: "Finalize project documentation and create knowledge archive"
---

# 📦 ARCHIVE MODE - Documentation and Knowledge Preservation

## Objective
Consolidate project knowledge, finalize documentation, create deployment guides, and ensure long-term maintainability and knowledge transfer.

## Process

### 1. Documentation Finalization
- **Code Documentation**: Ensure all code is properly documented
- **API Documentation**: Complete API specifications and examples
- **User Documentation**: Create user guides and tutorials
- **Operational Documentation**: Deployment, monitoring, and maintenance guides

### 2. Knowledge Consolidation
- **Architecture Documentation**: Final system architecture overview
- **Decision Records**: Complete technical decision documentation
- **Troubleshooting Guides**: Common issues and solutions
- **Learning Resources**: Knowledge gained during development

### 3. Deployment Preparation
- **Environment Setup**: Production deployment configurations
- **Security Checklist**: Security review and hardening
- **Monitoring Setup**: Logging, metrics, and alerting
- **Backup and Recovery**: Data protection strategies

### 4. Knowledge Transfer
- **Handover Documentation**: For team transitions
- **Training Materials**: For new team members
- **Contact Information**: Key personnel and escalation paths
- **Support Procedures**: Ongoing maintenance and support processes

## Documentation Standards

### Code Documentation
```markdown
## README.md Structure
# Project Name
Brief project description

## Quick Start
Installation and setup instructions

## Architecture
High-level system overview

## API Reference
Link to detailed API documentation

## Development
Local development setup and guidelines

## Deployment
Production deployment instructions

## Contributing
Guidelines for contributors

## License
Legal information
```

### API Documentation Template
```markdown
# API Documentation

## Authentication
How to authenticate with the API

## Endpoints

### GET /api/users
**Description**: Retrieve user list
**Parameters**:
- `limit` (optional): Number of users to return
- `offset` (optional): Pagination offset

**Response**:
```json
{
  "users": [
    {
      "id": "string",
      "email": "string",
      "createdAt": "ISO date"
    }
  ],
  "total": "number"
}
```

**Example**:
```bash
curl -H "Authorization: Bearer TOKEN" \
     https://api.example.com/api/users?limit=10
```
```

### Deployment Guide Template
```markdown
# Deployment Guide

## Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+ (for caching)

## Environment Variables
```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRY=24h

# External Services
SMTP_HOST=smtp.example.com
SMTP_USER=your-email
SMTP_PASS=your-password
```

## Build Process
```bash
# Install dependencies
npm ci

# Run tests
npm run test

# Build production bundle
npm run build

# Start production server
npm start
```

## Health Checks
- **Application**: GET /health
- **Database**: Connection verification
- **External Services**: Service availability checks
```

## Archive Organization

### Final Project Structure
```
project-archive/
├── 📁 documentation/
│   ├── README.md               # Main project documentation
│   ├── API_REFERENCE.md        # Complete API documentation
│   ├── ARCHITECTURE.md         # System architecture overview
│   ├── DEPLOYMENT.md           # Deployment and operations guide
│   ├── SECURITY.md             # Security considerations
│   └── TROUBLESHOOTING.md      # Common issues and solutions
├── 📁 guides/
│   ├── USER_GUIDE.md           # End user documentation
│   ├── DEVELOPER_GUIDE.md      # Developer setup and guidelines
│   ├── ADMIN_GUIDE.md          # Administrative procedures
│   └── MAINTENANCE.md          # Ongoing maintenance procedures
├── 📁 decisions/
│   ├── ADR-001-framework.md    # Architecture Decision Records
│   ├── ADR-002-database.md     # Database choice documentation
│   └── ADR-003-security.md     # Security architecture decisions
├── 📁 diagrams/
│   ├── system-architecture.png # System overview diagram
│   ├── data-flow.png          # Data flow diagrams
│   └── deployment.png         # Deployment architecture
├── 📁 scripts/
│   ├── deploy.sh              # Deployment automation
│   ├── backup.sh              # Backup procedures
│   └── monitoring.sh          # Monitoring setup
└── 📁 templates/
    ├── environment.env         # Environment variable template
    ├── docker-compose.yml      # Container setup template
    └── nginx.conf             # Web server configuration
```

### Knowledge Base Archive
```markdown
# Project Knowledge Archive

## Project Summary
**Name**: [Project Name]
**Duration**: [Start Date] - [End Date]
**Team**: [Team Members and Roles]
**Status**: ✅ Completed / 🚀 Deployed / 📦 Archived

## Key Achievements
- [Major features delivered]
- [Technical milestones reached]
- [Business goals accomplished]

## Technical Stack
- **Frontend**: [Technologies used]
- **Backend**: [Technologies used]
- **Database**: [Database and version]
- **Infrastructure**: [Deployment platform]

## Final Metrics
- **Code Quality**: Test coverage, linting scores
- **Performance**: Response times, throughput
- **Security**: Security scan results, compliance status
- **Documentation**: Coverage and completeness

## Lessons Learned
### What Worked Well
- [Successful practices and decisions]
- [Effective tools and processes]

### What Could Be Improved
- [Areas for future enhancement]
- [Process improvements identified]

### Key Insights
- [Technical insights gained]
- [Business learnings discovered]

## Future Recommendations
- **Immediate**: Actions for next 30 days
- **Short-term**: Improvements for next 3 months
- **Long-term**: Strategic considerations for next year

## Handover Information
- **Primary Contact**: [Name and contact information]
- **Backup Contact**: [Name and contact information]
- **Documentation Location**: [Where to find all documentation]
- **Access Credentials**: [How to obtain necessary access]

## Maintenance Schedule
- **Daily**: Monitoring and basic maintenance
- **Weekly**: Performance review and optimization
- **Monthly**: Security updates and dependency management
- **Quarterly**: Architecture review and strategic planning
```

## Quality Assurance Checklist

### Documentation Review
- [ ] **Completeness**: All major components documented
- [ ] **Accuracy**: Information is current and correct
- [ ] **Clarity**: Documentation is understandable by target audience
- [ ] **Examples**: Code examples and tutorials provided
- [ ] **Links**: All internal and external links work correctly

### Deployment Readiness
- [ ] **Environment Setup**: Production environment configured
- [ ] **Security Review**: Security checklist completed
- [ ] **Performance Testing**: Load testing completed successfully
- [ ] **Backup Procedures**: Data backup and recovery tested
- [ ] **Monitoring**: Logging and alerting systems configured

### Knowledge Transfer
- [ ] **Team Training**: Key team members trained on system
- [ ] **Documentation Handover**: All documentation accessible to stakeholders
- [ ] **Support Procedures**: Support and escalation processes defined
- [ ] **Contact Information**: Key contacts documented and current

## Archive Formats

### Version Control Archive
```bash
# Create project archive with full git history
git archive --format=zip --prefix=project-archive/ HEAD > project-archive.zip

# Create clean archive without git history
git ls-files | zip project-clean-archive.zip -@

# Export specific documentation
git archive --format=tar.gz HEAD:docs/ > documentation-archive.tar.gz
```

### Documentation Export
```bash
# Generate static documentation site
npm run docs:build

# Export API documentation
npm run api:docs:export

# Create PDF documentation
pandoc README.md -o documentation.pdf
```

### Knowledge Base Backup
```bash
# Backup Memory Bank
cp -r memory-bank/ archive/memory-bank-backup/

# Backup configuration
cp -r .ai/ archive/ai-config-backup/

# Create complete project snapshot
tar -czf project-complete-$(date +%Y%m%d).tar.gz \
    --exclude=node_modules \
    --exclude=.git \
    .
```

## Success Criteria
- [ ] All documentation complete and accurate
- [ ] Deployment procedures tested and documented
- [ ] Knowledge successfully transferred to stakeholders
- [ ] Project ready for long-term maintenance
- [ ] Archive accessible and well-organized

## Anti-Patterns to Avoid
- **Documentation Debt**: Don't leave documentation incomplete
- **Knowledge Silos**: Ensure knowledge is accessible, not locked in individual minds
- **Deployment Gaps**: Don't assume deployment knowledge is obvious
- **Contact Vacuum**: Ensure ongoing support contacts are clearly defined

## Next Steps

### Immediate Actions
1. **Final Review**: Conduct comprehensive documentation review
2. **Stakeholder Approval**: Get sign-off from key stakeholders
3. **Archive Creation**: Generate final project archives
4. **Knowledge Transfer**: Complete handover to maintenance team

### Long-term Maintenance
1. **Regular Reviews**: Schedule periodic documentation updates
2. **Knowledge Updates**: Keep documentation current with system changes
3. **Archive Maintenance**: Ensure archived information remains accessible
4. **Continuous Improvement**: Apply lessons learned to future projects

---

## Tool-Specific Usage

### Cursor
```
/archive
```

### Claude Code
```
"Let's finalize all project documentation and create a comprehensive knowledge archive"
```

### Gemini CLI
```
/archive
```

---

> **ARCHIVE MODE activated. Finalizing documentation and preserving project knowledge...**