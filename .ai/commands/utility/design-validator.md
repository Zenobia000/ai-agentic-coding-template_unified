---
name: "Design Validator - Detail Design and Validation"
description: "Generate detailed specifications from architecture design and validate compliance"
phase: "design_validation"
prerequisites: ["creative-*.md design documents"]
creates: ["validation reports", "auto-generated specs", "compliance checks"]
tools:
  cursor:
    trigger: "/design-validator"
    description: "DESIGN VALIDATION MODE - Automated design validation and specification generation"
  claude-code:
    trigger: "/design-validator"
    description: "Validate designs and auto-generate technical specifications"
    allowed-tools: ["Read", "Write", "Edit", "Grep", "Glob", "Task"]
  gemini-cli:
    trigger: "/design-validator"
    description: "Comprehensive design validation and auto-generation"
---

# ✅ DESIGN VALIDATOR MODE - Detail Design and Validation

## Objective
Transform architecture designs into detailed specifications (API, Schema, Interfaces) and validate against compliance standards. This unified phase combines spec generation with validation for optimal workflow.

## Process

### 1. Design Validation Framework
- **Architecture Compliance**: Validate against established patterns and principles
- **Best Practice Check**: Ensure industry standards compliance
- **Consistency Analysis**: Check design coherence and alignment
- **Risk Assessment**: Identify potential design risks and mitigation strategies

### 2. Automated Specification Generation
- **API Specification**: Auto-generate OpenAPI/Swagger specs
- **Database Schema**: Generate migration scripts and ERD diagrams
- **Component Specifications**: Create detailed interface definitions
- **Configuration Templates**: Generate deployment and infrastructure configs

### 3. Quality Assurance
- **Performance Validation**: Check for performance anti-patterns
- **Security Review**: Validate security design decisions
- **Scalability Assessment**: Ensure design supports scaling requirements
- **Maintainability Check**: Assess long-term maintenance implications

## Validation Checklist

### Architecture Principles Validation
```yaml
solid_principles:
  single_responsibility:
    check: "Each component has one clear responsibility"
    validation: "component_analysis"
    auto_fix: "suggest_refactoring"

  open_closed:
    check: "Open for extension, closed for modification"
    validation: "interface_analysis"
    auto_fix: "suggest_abstraction"

  liskov_substitution:
    check: "Subtypes are substitutable for base types"
    validation: "inheritance_hierarchy"
    auto_fix: "suggest_composition"

  interface_segregation:
    check: "Interfaces are focused and cohesive"
    validation: "interface_size_analysis"
    auto_fix: "suggest_interface_split"

  dependency_inversion:
    check: "Depend on abstractions, not concretions"
    validation: "dependency_analysis"
    auto_fix: "suggest_injection"
```

### Design Pattern Validation
```yaml
pattern_compliance:
  microservices:
    checks:
      - bounded_contexts: "Services align with domain boundaries"
      - data_ownership: "Each service owns its data"
      - communication: "Async communication preferred"
      - fault_tolerance: "Circuit breakers implemented"

  mvc_pattern:
    checks:
      - separation_of_concerns: "Model, View, Controller separated"
      - controller_responsibility: "Controllers coordinate, don't implement business logic"
      - model_independence: "Models don't know about views"

  repository_pattern:
    checks:
      - abstraction_layer: "Repository interface defined"
      - data_access_encapsulation: "Data access logic isolated"
      - testability: "Repository can be mocked"
```

### Security Design Validation
```yaml
security_checklist:
  authentication:
    - multi_factor_auth: "MFA implementation planned"
    - password_policy: "Strong password requirements defined"
    - session_management: "Secure session handling designed"

  authorization:
    - role_based_access: "RBAC model defined"
    - least_privilege: "Minimum necessary permissions"
    - permission_checking: "Authorization checks at every layer"

  data_protection:
    - encryption_at_rest: "Sensitive data encrypted in storage"
    - encryption_in_transit: "All communication encrypted"
    - data_classification: "Data sensitivity levels defined"

  input_validation:
    - sanitization: "All inputs validated and sanitized"
    - parameterized_queries: "No direct SQL injection possibilities"
    - file_upload_security: "Secure file handling designed"
```

## Automated Specification Generation

### API Specification Generator
```javascript
// Automated OpenAPI specification generation
const generateAPISpec = (designDocument) => {
  const endpoints = extractEndpoints(designDocument);
  const dataModels = extractDataModels(designDocument);

  return {
    openapi: "3.0.0",
    info: {
      title: designDocument.projectName,
      version: "1.0.0",
      description: designDocument.description
    },
    paths: generatePaths(endpoints),
    components: {
      schemas: generateSchemas(dataModels),
      securitySchemes: generateSecuritySchemes(designDocument.security)
    }
  };
};

// Example generated API specification
const exampleAPISpec = {
  "/users": {
    "get": {
      "summary": "List users",
      "parameters": [
        {
          "name": "limit",
          "in": "query",
          "schema": { "type": "integer", "default": 10 }
        }
      ],
      "responses": {
        "200": {
          "description": "Successful response",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UserList"
              }
            }
          }
        }
      }
    }
  }
};
```

### Database Schema Generator
```sql
-- Automated database schema generation
-- Generated from design document: user-management-system

CREATE SCHEMA IF NOT EXISTS user_management;

-- Users table (from User entity in design)
CREATE TABLE user_management.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role user_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,

    -- Constraints from design specifications
    CONSTRAINT chk_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT chk_name_length CHECK (length(first_name) >= 1 AND length(last_name) >= 1)
);

-- Indexes for performance (derived from access patterns in design)
CREATE INDEX idx_users_email ON user_management.users(email);
CREATE INDEX idx_users_role ON user_management.users(role);
CREATE INDEX idx_users_created_at ON user_management.users(created_at);

-- User roles enum (from authorization design)
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'user', 'guest');

-- Audit trigger (from compliance requirements)
CREATE TRIGGER users_updated_at_trigger
    BEFORE UPDATE ON user_management.users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### Component Interface Generator
```typescript
// Automated TypeScript interface generation

// Generated from design document: user-management-interfaces

// Domain entities
export interface User {
  readonly id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  isActive: boolean;
}

export type UserRole = 'admin' | 'manager' | 'user' | 'guest';

// Service interfaces (from service layer design)
export interface UserService {
  createUser(userData: CreateUserRequest): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  updateUser(id: string, updates: UpdateUserRequest): Promise<User>;
  deleteUser(id: string): Promise<void>;
  listUsers(filter: UserFilter): Promise<User[]>;
}

// Repository interfaces (from data access layer design)
export interface UserRepository {
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(filter: UserFilter): Promise<User[]>;
  delete(id: string): Promise<void>;
}

// Request/Response types (from API design)
export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

export interface UpdateUserRequest {
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface UserFilter {
  role?: UserRole;
  isActive?: boolean;
  createdAfter?: Date;
  limit?: number;
  offset?: number;
}

// Validation schemas (from input validation design)
export const CreateUserSchema = {
  type: 'object',
  required: ['email', 'password', 'firstName', 'lastName'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
      maxLength: 255
    },
    password: {
      type: 'string',
      minLength: 8,
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]'
    },
    firstName: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    lastName: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    role: {
      type: 'string',
      enum: ['admin', 'manager', 'user', 'guest']
    }
  },
  additionalProperties: false
};
```

## Design Validation Rules Engine

### Rule-Based Validation
```yaml
validation_rules:
  performance_rules:
    - name: "avoid_n_plus_1_queries"
      description: "Detect potential N+1 query patterns"
      pattern: "list_operations_without_eager_loading"
      severity: "high"
      auto_fix: "suggest_eager_loading"

    - name: "proper_indexing"
      description: "Ensure query columns are indexed"
      pattern: "where_clauses_without_indexes"
      severity: "medium"
      auto_fix: "suggest_index_creation"

  security_rules:
    - name: "input_validation"
      description: "All inputs must be validated"
      pattern: "endpoints_without_validation"
      severity: "critical"
      auto_fix: "generate_validation_schema"

    - name: "authentication_required"
      description: "Protected endpoints need authentication"
      pattern: "private_endpoints_without_auth"
      severity: "critical"
      auto_fix: "add_auth_middleware"

  maintainability_rules:
    - name: "interface_segregation"
      description: "Interfaces should be focused"
      pattern: "large_interfaces"
      threshold: 10
      severity: "medium"
      auto_fix: "suggest_interface_split"

    - name: "dependency_direction"
      description: "Dependencies should flow inward"
      pattern: "outward_dependencies"
      severity: "high"
      auto_fix: "suggest_dependency_inversion"
```

### Automated Fix Suggestions
```javascript
// Automated design issue resolution
const designFixSuggestions = {
  n_plus_1_query: {
    problem: "Potential N+1 query in user orders endpoint",
    impact: "High latency under load",
    solution: `
      // Before (N+1 problem)
      const users = await User.findAll();
      for (const user of users) {
        user.orders = await Order.findByUserId(user.id);
      }

      // After (fixed with eager loading)
      const users = await User.findAll({
        include: [{ model: Order, as: 'orders' }]
      });
    `,
    implementation_steps: [
      "Update User model to include Order association",
      "Modify query to use eager loading",
      "Add test case for performance validation"
    ]
  },

  missing_input_validation: {
    problem: "POST /users endpoint lacks input validation",
    impact: "Security vulnerability and data integrity risk",
    solution: `
      // Add validation middleware
      import { validateRequest } from './middleware/validation';
      import { CreateUserSchema } from './schemas/user';

      app.post('/users', validateRequest(CreateUserSchema), createUser);
    `,
    generated_artifacts: [
      "validation_schema.json",
      "validation_middleware.ts",
      "validation_tests.spec.ts"
    ]
  }
};
```

## Compliance Validation

### Industry Standards Compliance
```yaml
compliance_frameworks:
  owasp_compliance:
    - input_validation: "All inputs validated against schema"
    - output_encoding: "All outputs properly encoded"
    - authentication: "Strong authentication mechanisms"
    - authorization: "Proper access controls implemented"
    - session_management: "Secure session handling"
    - cryptography: "Strong encryption for sensitive data"
    - error_handling: "No sensitive info in error messages"
    - logging: "Comprehensive security logging"

  gdpr_compliance:
    - data_minimization: "Only necessary data collected"
    - consent_management: "Clear consent mechanisms"
    - data_portability: "Export functionality designed"
    - right_to_deletion: "Data deletion capabilities"
    - privacy_by_design: "Privacy considered in all designs"

  pci_dss_compliance:
    - secure_transmission: "All card data encrypted in transit"
    - secure_storage: "No card data stored unless necessary"
    - access_control: "Strict access controls to card data"
    - monitoring: "All access to card data logged"
```

### Organizational Policy Compliance
```yaml
internal_policies:
  coding_standards:
    - naming_conventions: "Follow company naming standards"
    - code_documentation: "All public APIs documented"
    - test_coverage: "Minimum 80% test coverage required"
    - dependency_approval: "All dependencies must be approved"

  architecture_standards:
    - microservice_size: "Services should be manageable by 2-3 developers"
    - api_versioning: "All APIs must support versioning"
    - data_consistency: "ACID transactions for critical operations"
    - monitoring_requirements: "All services must expose health endpoints"

  security_policies:
    - authentication_standards: "OAuth 2.0 for external integrations"
    - encryption_requirements: "AES-256 for data encryption"
    - audit_logging: "All administrative actions logged"
    - vulnerability_management: "Regular security scans required"
```

## Automated Reporting

### Design Validation Report Template
```markdown
# Design Validation Report

**Project**: {project_name}
**Validation Date**: {current_date}
**Design Version**: {design_version}

## Executive Summary
- **Overall Score**: {validation_score}/100
- **Critical Issues**: {critical_count}
- **Recommendations**: {recommendation_count}
- **Compliance Status**: {compliance_percentage}% compliant

## Validation Results

### ✅ Passed Validations
1. **Security Design** - All authentication mechanisms properly designed
2. **Performance Patterns** - Caching strategy well-defined
3. **Data Modeling** - Database schema follows normalization principles

### ⚠️ Warnings
1. **API Design** - Missing rate limiting specification
   - **Impact**: Potential DoS vulnerability
   - **Recommendation**: Add rate limiting to all public endpoints
   - **Auto-fix Available**: Generate rate limiting middleware

2. **Monitoring** - Limited observability design
   - **Impact**: Difficult troubleshooting in production
   - **Recommendation**: Add comprehensive logging and metrics
   - **Auto-fix Available**: Generate monitoring configuration

### ❌ Critical Issues
1. **Input Validation** - Missing validation on user registration endpoint
   - **Impact**: Security vulnerability
   - **Recommendation**: Add comprehensive input validation
   - **Auto-fix Available**: Generate validation schemas
   - **Priority**: High

## Generated Artifacts
- **API Specification**: `generated/api-spec.yaml`
- **Database Schema**: `generated/schema.sql`
- **Interface Definitions**: `generated/interfaces.ts`
- **Validation Schemas**: `generated/validation/`

## Compliance Check
### OWASP Top 10
- [x] A01: Broken Access Control - Compliant
- [x] A02: Cryptographic Failures - Compliant
- [ ] A03: Injection - **Missing input validation**
- [x] A04: Insecure Design - Compliant
- [ ] A05: Security Misconfiguration - **Missing security headers**

### Company Standards
- [x] Naming Conventions - Compliant
- [x] Documentation Requirements - Compliant
- [ ] Test Coverage Planning - **Test strategy incomplete**

## Recommendations
1. **Immediate**: Fix critical input validation issues
2. **This Week**: Complete security header configuration
3. **Next Sprint**: Enhance monitoring and observability design
4. **Future**: Consider implementing distributed tracing

## Next Steps
1. Review and address critical issues
2. Implement auto-generated artifacts
3. Update design documents with fixes
4. Schedule follow-up validation
```

### Performance Impact Analysis
```markdown
# Performance Impact Analysis

## Design Performance Assessment

### Database Performance
- **Query Complexity**: Medium
- **Index Coverage**: 85% (Good)
- **N+1 Query Risk**: Low
- **Connection Pooling**: Configured

### API Performance
- **Expected Response Time**: < 200ms (95th percentile)
- **Concurrent User Capacity**: ~10,000
- **Rate Limiting**: Configured
- **Caching Strategy**: Redis + CDN

### Scaling Characteristics
- **Horizontal Scaling**: Supported
- **Stateless Design**: ✅ Compliant
- **Database Bottlenecks**: User table indexing needed
- **Resource Requirements**: 2 CPU, 4GB RAM per instance

## Performance Recommendations
1. Add database indexes for user lookup queries
2. Implement result caching for frequent read operations
3. Consider read replicas for high-read scenarios
4. Monitor and tune connection pool sizes
```

## Success Criteria

### Validation Coverage
- [ ] **100% Architecture Compliance**: All design decisions validated
- [ ] **Security Best Practices**: OWASP compliance achieved
- [ ] **Performance Standards**: All performance requirements validated
- [ ] **Auto-Generation**: Key specifications auto-generated

### Quality Assurance
- [ ] **Consistency**: Design coherence across all components
- [ ] **Completeness**: All required artifacts generated
- [ ] **Accuracy**: Generated specs match design intent
- [ ] **Maintainability**: Clear validation and update processes

### Team Integration
- [ ] **Automated Workflow**: Validation runs automatically
- [ ] **Developer Feedback**: Clear, actionable validation results
- [ ] **Continuous Improvement**: Validation rules evolve with experience
- [ ] **Knowledge Sharing**: Validation insights inform future designs

---

## Usage Examples

### Comprehensive Design Validation
```bash
# Validate all design documents
/design-validator validate-all

# Output:
# - Validation report with issues and recommendations
# - Auto-generated API specs, schemas, and interfaces
# - Compliance check results
# - Performance impact analysis
```

### Specific Validation Focus
```bash
# Security-focused validation
/design-validator --focus=security

# Performance validation
/design-validator --focus=performance

# Generate specifications only
/design-validator --generate-specs
```

---

> **DESIGN VALIDATOR MODE activated. Running comprehensive design validation and auto-generating specifications...**