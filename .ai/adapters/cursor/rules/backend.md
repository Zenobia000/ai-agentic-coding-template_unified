---
name: "Backend Rules"
description: "Backend and API development standards and security practices"
applies_to: ["backend", "api", "server"]
priority: "high"
tools:
  cursor:
    mode: "applyToSpecificFiles"
    globs: ["api/**/*", "server/**/*", "src/app/api/**/*", "backend/**/*", "*.api.ts"]
  claude-code:
    mode: "context_aware"
    scope: "backend"
  gemini-cli:
    mode: "conditional_prompt"
    trigger: ["api", "server", "database", "backend"]
---

# ⚙️ Backend Development Rules

## API Design Standards
- **RESTful Principles**: Follow REST conventions for resource endpoints
- **Consistent Naming**: Use kebab-case for URLs, camelCase for JSON
- **HTTP Status Codes**: Use appropriate status codes (200, 201, 400, 401, 404, 500)
- **API Versioning**: Implement versioning strategy (/api/v1/, /api/v2/)

## Security Requirements
- **Authentication**: Implement proper JWT or session-based auth
- **Authorization**: Role-based access control (RBAC)
- **Input Validation**: Validate and sanitize all inputs
- **Rate Limiting**: Implement rate limiting for public endpoints
- **CORS**: Configure CORS properly for cross-origin requests

## Database Best Practices
- **Query Optimization**: Use proper indexing and avoid N+1 queries
- **Transactions**: Use database transactions for atomic operations
- **Connection Pooling**: Implement proper connection pooling
- **Migrations**: All schema changes through migration files
- **Data Validation**: Validate data at database level with constraints

## Error Handling
- **Structured Errors**: Consistent error response format
- **Logging**: Comprehensive logging with appropriate levels
- **Monitoring**: Implement health checks and monitoring endpoints
- **Graceful Degradation**: Handle service failures gracefully

## Code Architecture
```
src/
├── routes/             # API route handlers
├── middleware/         # Express/framework middleware
├── models/            # Database models and schemas
├── services/          # Business logic layer
├── utils/             # Utility functions
├── config/            # Configuration management
└── tests/             # Backend tests
```

## Performance Guidelines
- **Caching**: Implement Redis or in-memory caching where appropriate
- **Pagination**: Always paginate large datasets
- **Async/Await**: Use modern async patterns
- **Database Queries**: Optimize queries and use proper indexes
- **Compression**: Enable gzip compression for responses

## Environment Management
- **Environment Variables**: Use .env files for configuration
- **Secrets Management**: Never commit secrets to version control
- **Configuration Validation**: Validate required environment variables on startup
- **Environment Separation**: Clear separation between dev/staging/production

## Testing Standards
- **Unit Tests**: Test business logic and utility functions
- **Integration Tests**: Test API endpoints and database operations
- **Mock External Services**: Mock third-party API calls
- **Test Data**: Use fixtures and factories for test data

## Documentation Requirements
- **API Documentation**: Maintain up-to-date API documentation (OpenAPI/Swagger)
- **Code Comments**: Document complex business logic
- **README**: Include setup and deployment instructions
- **Changelog**: Track API changes and breaking changes

## Forbidden Practices
- **SQL Injection**: Never concatenate user input into SQL queries
- **Hardcoded Secrets**: No API keys or passwords in code
- **Global Variables**: Avoid global state in server applications
- **Synchronous Operations**: Don't block the event loop
- **Unhandled Promises**: Always handle promise rejections