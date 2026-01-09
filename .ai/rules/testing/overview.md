---
name: "Testing Standards"
description: "Test strategy, coverage goals, and best practices"
applies_to: ["all"]
priority: "high"
tools:
  cursor:
    mode: "alwaysApply"
    file_pattern: "**/*.test.*,**/*.spec.*,**/tests/**"
  claude-code:
    mode: "project_context"
  gemini-cli:
    mode: "system_prompt"
---

# Testing Standards

## Test Philosophy

### Test Pyramid
```
        /\
       /  \     E2E Tests (Few, Slow, Expensive)
      /----\
     /      \   Integration Tests (Some)
    /--------\
   /          \ Unit Tests (Many, Fast, Cheap)
  /------------\
```

### Coverage Goals
- **Unit Tests**: 80%+ line coverage
- **Integration Tests**: Critical paths covered
- **E2E Tests**: Happy paths and key user journeys

## Test Types

### Unit Tests
- Test single functions/methods in isolation
- Mock external dependencies
- Fast execution (<100ms per test)
- High volume, low cost

### Integration Tests
- Test component interactions
- Use real dependencies where practical
- Database, API, service integration
- Medium volume, medium cost

### E2E Tests
- Test full user workflows
- Real browser/environment
- Critical paths only
- Low volume, high cost

## Test Structure

### Arrange-Act-Assert (AAA)
```typescript
describe('FunctionName', () => {
  it('should [expected behavior] when [condition]', () => {
    // Arrange - Setup test data
    const input = createTestInput();

    // Act - Execute function
    const result = functionUnderTest(input);

    // Assert - Verify result
    expect(result).toEqual(expected);
  });
});
```

### Test Naming Convention
```
[Unit/Integration] [Subject] [Scenario] [Expected Result]

Examples:
- "should return user when valid ID provided"
- "should throw ValidationError when email is invalid"
- "should update database when form submitted"
```

## Test Categories

### Happy Path
- Normal, expected inputs
- Standard use cases
- Success scenarios

### Edge Cases
- Boundary values
- Empty inputs
- Maximum/minimum values
- Special characters

### Error Cases
- Invalid inputs
- Missing required data
- Network failures
- Permission errors

## Best Practices

### Do
- Write tests before or with code (TDD/BDD)
- Keep tests isolated and independent
- Use descriptive test names
- Test behavior, not implementation
- Clean up test data

### Don't
- Share state between tests
- Test private methods directly
- Write flaky tests
- Ignore failing tests
- Over-mock (test reality)

## Mocking Guidelines

### When to Mock
- External services (APIs, databases)
- Time-dependent operations
- Random/non-deterministic behavior
- Expensive operations

### When Not to Mock
- Simple value objects
- Pure functions
- Internal implementation details

### Mock Hierarchy
1. Prefer real implementations
2. Use in-memory alternatives
3. Use spies for observation
4. Use mocks as last resort

## Test File Organization

```
src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx      # Co-located unit test
├── services/
│   ├── api.ts
│   └── api.test.ts
tests/
├── integration/
│   └── user-flow.test.ts    # Integration tests
└── e2e/
    └── checkout.spec.ts     # E2E tests
```

## Framework-Specific Patterns

### Jest/Vitest
```typescript
describe('Module', () => {
  beforeEach(() => { /* setup */ });
  afterEach(() => { /* cleanup */ });

  it('test case', () => {
    expect(value).toBe(expected);
  });
});
```

### pytest
```python
import pytest

class TestModule:
    @pytest.fixture
    def setup(self):
        return create_test_data()

    def test_case(self, setup):
        assert result == expected
```

## CI Integration

### Pre-commit
- Unit tests must pass
- Lint checks must pass
- Type checks must pass

### Pull Request
- All tests must pass
- Coverage must not decrease
- No new warnings

### Main Branch
- Full test suite
- Performance benchmarks
- Security scans
