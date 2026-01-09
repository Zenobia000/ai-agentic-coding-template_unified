---
name: "IMPLEMENT - Code Implementation"
description: "Execute development tasks, write code, and track implementation progress"
phase: "implementation"
prerequisites: ["tasks.md", "creative-*.md design documents"]
creates: ["source code", "tests", "progress.md", "updated tasks.md"]
tools:
  cursor:
    trigger: "/implement"
    description: "IMPLEMENT MODE - Code implementation with progress tracking"
  claude-code:
    trigger: ["implement", "write code", "build feature", "develop"]
    description: "Implement the designed features and functionality"
  gemini-cli:
    trigger: "gemini implement"
    description: "Execute implementation tasks and track progress"
---

# 🔨 IMPLEMENT MODE - Code Implementation and Development

## Objective
Transform architectural designs and task specifications into working code while maintaining quality standards and tracking implementation progress.

## Process

### 1. Implementation Preparation
- **Review Design Documents**: Understand architectural decisions and specifications
- **Setup Development Environment**: Configure tools, dependencies, and local setup
- **Create Implementation Plan**: Break down design into coding tasks
- **Establish Quality Gates**: Define testing and code review standards

### 2. Development Workflow
- **Feature Branch Strategy**: Create branches for each feature or task
- **Test-Driven Development**: Write tests before or alongside implementation
- **Incremental Development**: Build in small, testable increments
- **Continuous Integration**: Ensure code builds and tests pass regularly

### 3. Code Quality Standards
- **Coding Standards**: Follow established style guides and conventions
- **Code Review**: Peer review all significant changes
- **Testing Coverage**: Maintain appropriate test coverage levels
- **Documentation**: Keep code documentation current

### 4. Progress Tracking
- **Task Status Updates**: Keep tasks.md current with progress
- **Progress Metrics**: Track completion rates and velocity
- **Blocker Identification**: Document and resolve impediments quickly
- **Communication**: Regular updates to stakeholders

## Implementation Standards

### Code Quality Checklist
- [ ] **Functionality**: Code works as specified
- [ ] **Readability**: Code is clear and well-documented
- [ ] **Testing**: Adequate test coverage exists
- [ ] **Performance**: No obvious performance issues
- [ ] **Security**: Security best practices followed
- [ ] **Error Handling**: Proper error handling implemented

### Testing Strategy
```markdown
## Testing Levels
### Unit Tests
- Test individual functions/methods
- Mock external dependencies
- Fast execution (<1s per test)

### Integration Tests
- Test component interactions
- Use real database/external services
- Medium execution (<10s per test)

### End-to-End Tests
- Test complete user workflows
- Use production-like environment
- Slower execution (<5min total)
```

### Git Workflow
```bash
# Feature development
git checkout -b feature/user-authentication
# Make changes, commit regularly
git add .
git commit -m "feat: add user login endpoint"
# Push and create pull request
git push origin feature/user-authentication
```

## Progress Tracking Format

### Updated tasks.md
```markdown
## 🔄 Implementation Progress

### ✅ Completed Tasks
- [x] Setup project structure (2025-01-08) @alice
- [x] Configure database connection (2025-01-08) @bob
- [x] Implement user model (2025-01-09) @alice

### 🚧 In Progress
- [ ] User authentication API (50% complete, ETA: 2025-01-10) @bob
  - [x] Login endpoint
  - [x] Registration endpoint
  - [ ] Password reset endpoint
  - [ ] JWT token validation

### ⏸️ Blocked
- [ ] Email integration (Blocked: waiting for SMTP credentials) @alice

### 📋 Ready to Start
- [ ] Frontend login form (depends on auth API) @charlie
- [ ] User profile page (depends on auth API) @charlie
```

### progress.md Creation
```markdown
# Implementation Progress

## Sprint Overview
**Sprint Goal**: Implement user authentication system
**Start Date**: 2025-01-08
**Target End**: 2025-01-15

## Daily Progress

### 2025-01-08
**Completed**:
- Project setup and initial configuration
- Database schema design and migration

**Blockers**:
- None

**Next Day Plan**:
- Begin API endpoint implementation

### 2025-01-09
**Completed**:
- User model and validation logic
- Database connection setup

**Blockers**:
- Need design approval for login UI

**Next Day Plan**:
- Complete authentication endpoints

## Metrics
- **Velocity**: 8 story points completed (target: 10)
- **Bug Count**: 2 minor bugs identified and fixed
- **Test Coverage**: 85% (target: 80%)
- **Code Review**: All PRs reviewed within 24 hours
```

## Common Implementation Patterns

### Error Handling Pattern
```typescript
// Backend API error handling
try {
  const result = await userService.createUser(userData)
  return res.status(201).json({ data: result })
} catch (error) {
  logger.error('User creation failed', { error, userData })
  return res.status(400).json({
    error: 'User creation failed',
    message: error.message
  })
}
```

### Frontend State Management
```typescript
// React component with proper error handling
const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)

const handleSubmit = async (data: FormData) => {
  setLoading(true)
  setError(null)

  try {
    await apiService.createUser(data)
    // Handle success
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}
```

### Database Migration Pattern
```sql
-- migrations/001_create_users.sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
```

## Quality Gates

### Before Merge Checklist
- [ ] **Tests Pass**: All automated tests pass
- [ ] **Code Review**: At least one peer review completed
- [ ] **Documentation**: README and inline documentation updated
- [ ] **No Security Issues**: Security scan passes
- [ ] **Performance**: No significant performance regressions

### Continuous Integration
```yaml
# Example CI pipeline checks
checks:
  - lint: ESLint, Prettier formatting
  - type-check: TypeScript compilation
  - test: Unit and integration tests
  - security: Security vulnerability scan
  - build: Production build verification
```

## Troubleshooting Common Issues

### Development Environment
```bash
# Clear dependency cache
rm -rf node_modules package-lock.json
npm install

# Reset database
npm run db:reset

# Check environment variables
npm run env:check
```

### Testing Issues
```bash
# Run specific test file
npm test user.test.ts

# Run with coverage
npm run test:coverage

# Debug failing test
npm run test:debug user.test.ts
```

## Success Criteria
- [ ] All planned features implemented according to design
- [ ] Code quality standards met
- [ ] Test coverage targets achieved
- [ ] No critical bugs or security issues
- [ ] Documentation updated and accurate

## Next Steps
After implementation milestone:
1. **Code Freeze**: Stop new feature development
2. **Testing Phase**: Comprehensive testing and bug fixes
3. **Deployment Preparation**: Environment setup and deployment scripts
4. **Move to Reflect**: Conduct `/reflect` phase for retrospective

---

## Tool-Specific Usage

### Cursor
```
/implement
```

### Claude Code
```
"Let's implement the [specific feature] according to our design specifications"
```

### Gemini CLI
```
gemini implement
```

---

> **IMPLEMENT MODE activated. Beginning code implementation with progress tracking...**