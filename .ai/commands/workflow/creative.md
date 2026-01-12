---
name: "CREATIVE - Architecture Design"
description: "Design system architecture, component relationships, and technical patterns"
phase: "architecture"
prerequisites: ["tasks.md with planned tasks"]
creates: ["creative-*.md", "architecture diagrams", "technical decisions"]
tools:
  cursor:
    trigger: "/creative"
    description: "CREATIVE MODE - Design decisions and architecture planning"
  claude-code:
    trigger: "/creative"
    description: "Design the system architecture and make technical decisions"
    allowed-tools: ["Read", "Write", "Edit", "Grep"]
  gemini-cli:
    trigger: "/creative"
    description: "Create architectural designs and technical specifications"
---

# 🎨 CREATIVE MODE - System Architecture Design

## Objective
Design the system architecture, define component relationships, and establish technical patterns that guide implementation.

## Process

### 1. Architecture Design
- **System Overview**: High-level system architecture and components
- **Data Flow**: How data moves through the system
- **Component Relationships**: How different parts interact
- **Technology Stack**: Specific tools, frameworks, and libraries

### 2. Technical Decision Making
- **Framework Selection**: Choose appropriate frameworks and libraries
- **Database Design**: Schema design and data modeling
- **API Design**: Endpoint design and data contracts
- **Security Architecture**: Authentication, authorization, and data protection

### 3. Design Pattern Documentation
- **Code Organization**: File structure and module organization
- **Naming Conventions**: Consistent naming across the codebase
- **Error Handling**: Standard error handling patterns
- **Testing Strategy**: Unit, integration, and e2e testing approaches

### 4. Non-Functional Requirements
- **Performance Targets**: Response times, throughput, scalability
- **Security Requirements**: Data protection, compliance needs
- **Reliability Goals**: Uptime, error rates, recovery procedures
- **Maintainability Standards**: Code quality, documentation requirements

## Deliverables

### Architecture Document (creative-architecture-{date}.md)
```markdown
# System Architecture

## Overview
Brief description of the system and its purpose

## Components
### Frontend
- Technology stack
- Key components
- State management

### Backend
- API architecture
- Business logic organization
- Data access patterns

### Database
- Schema design
- Relationships
- Performance considerations

## Data Flow
Describe how data moves through the system

## Security Design
Authentication, authorization, and data protection strategies

## Deployment Architecture
How the system will be deployed and scaled
```

### Technical Decisions (creative-decisions-{date}.md)
```markdown
# Technical Decisions

## Framework Choices
### Frontend Framework: [Selected Framework]
**Decision**: Choose React with Next.js
**Reasons**:
- Server-side rendering capabilities
- Strong TypeScript support
- Large ecosystem and community

**Alternatives Considered**: Vue.js, Angular
**Trade-offs**: Learning curve vs development speed

### Database Choice: [Selected Database]
**Decision**: PostgreSQL with Prisma ORM
**Reasons**:
- ACID compliance for data consistency
- Strong TypeScript integration
- Advanced querying capabilities

**Alternatives Considered**: MongoDB, MySQL
**Trade-offs**: Schema flexibility vs data consistency

## Architecture Patterns
### Chosen Patterns
- Clean Architecture for backend
- Component composition for frontend
- Repository pattern for data access

### Rejected Patterns
- Microservices (too complex for current scale)
- GraphQL (REST is sufficient for current needs)
```

### API Design (creative-api-{date}.md)
```markdown
# API Design Specification

## REST Endpoints

### Authentication
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/refresh

### User Management
- GET /api/users/profile
- PUT /api/users/profile
- DELETE /api/users/account

## Data Models
### User Model
```typescript
interface User {
  id: string
  email: string
  createdAt: Date
  updatedAt: Date
}
```

## Error Handling
Standard error response format and status codes

## Rate Limiting
API rate limits and throttling strategies
```

## Design Review Checklist

### Architecture Review
- [ ] **Scalability**: Can the architecture handle expected load?
- [ ] **Maintainability**: Is the code organization clear and logical?
- [ ] **Security**: Are security concerns properly addressed?
- [ ] **Performance**: Will the system meet performance requirements?
- [ ] **Testability**: Can all components be easily tested?

### Technical Decision Review
- [ ] **Justification**: Are all major decisions properly justified?
- [ ] **Alternatives**: Were alternatives considered and documented?
- [ ] **Trade-offs**: Are trade-offs clearly understood and accepted?
- [ ] **Dependencies**: Are external dependencies minimized and justified?
- [ ] **Future Impact**: How will decisions affect future development?

### Documentation Review
- [ ] **Completeness**: Are all major components and decisions documented?
- [ ] **Clarity**: Can a new team member understand the design?
- [ ] **Diagrams**: Are visual aids helpful and accurate?
- [ ] **Examples**: Are code examples provided where helpful?

## Design Principles

### SOLID Principles
- **Single Responsibility**: Each class/module has one reason to change
- **Open/Closed**: Open for extension, closed for modification
- **Liskov Substitution**: Subtypes must be substitutable for base types
- **Interface Segregation**: Clients shouldn't depend on unused interfaces
- **Dependency Inversion**: Depend on abstractions, not concretions

### Additional Principles
- **DRY (Don't Repeat Yourself)**: Avoid code duplication
- **KISS (Keep It Simple)**: Prefer simple solutions over complex ones
- **YAGNI (You Aren't Gonna Need It)**: Don't build features before they're needed
- **Composition over Inheritance**: Favor object composition over class inheritance

## Success Criteria
- [ ] Clear technical direction for implementation
- [ ] All major architectural decisions documented
- [ ] Team alignment on technical approach
- [ ] Implementation-ready specifications
- [ ] Risk mitigation strategies defined

## Anti-Patterns to Avoid
- **Over-engineering**: Don't add complexity without clear benefits
- **Analysis Paralysis**: Don't postpone decisions indefinitely
- **Technology Resume**: Don't choose tech just because it's new/trendy
- **Premature Optimization**: Don't optimize before measuring performance issues

## Next Steps
After completing creative design:
1. **Design Review**: Present to technical stakeholders
2. **Prototype**: Build small proof-of-concept if needed
3. **Implementation Planning**: Break design into implementation tasks
4. **Begin Development**: Move to `/implement` phase

---

## Tool-Specific Usage

### Cursor
```
/creative
```

### Claude Code
```
"Let's design the system architecture and make the key technical decisions for this project"
```

### Gemini CLI
```
/creative
```

---

> **CREATIVE MODE activated. Designing system architecture and documenting technical decisions...**