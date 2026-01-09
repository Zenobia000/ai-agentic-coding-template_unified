---
name: "Write Tests"
description: "Test strategy and implementation support"
phase: "implementation"
prerequisites: ["code to test exists"]
creates: ["test files"]
tools:
  cursor:
    trigger: "/write-tests"
    description: "Generate test strategy and implementation"
  claude-code:
    trigger: "/write-tests"
    description: "Test generation and strategy"
    allowed-tools: ["Read", "Write", "Edit", "Bash", "Grep"]
  gemini-cli:
    trigger: "/write-tests"
    description: "Test writing assistance"
---

# Write Tests - Test Strategy & Implementation

## Objective
Create comprehensive test coverage with appropriate test types, following project testing conventions.

## Test Strategy Framework

### 1. Identify Test Scope
- **Unit Tests**: Individual functions/methods
- **Integration Tests**: Component interactions
- **E2E Tests**: Full user workflows
- **API Tests**: Endpoint contracts

### 2. Test Pyramid Approach
```
        /\
       /  \     E2E (Few)
      /----\
     /      \   Integration (Some)
    /--------\
   /          \ Unit (Many)
  /------------\
```

### 3. Test Case Generation

For each function/component, identify:

#### Happy Path
- Normal input → Expected output
- Standard use cases

#### Edge Cases
- Empty input
- Maximum/minimum values
- Boundary conditions
- Special characters

#### Error Cases
- Invalid input
- Missing required data
- Network failures
- Permission errors

## Test Template

### Unit Test (Jest/Vitest)
```typescript
describe('[Function/Component Name]', () => {
  // Setup
  beforeEach(() => {
    // Common setup
  });

  describe('happy path', () => {
    it('should [expected behavior] when [condition]', () => {
      // Arrange
      const input = ...;

      // Act
      const result = functionUnderTest(input);

      // Assert
      expect(result).toBe(expected);
    });
  });

  describe('edge cases', () => {
    it('should handle empty input', () => {
      // Test implementation
    });

    it('should handle boundary values', () => {
      // Test implementation
    });
  });

  describe('error cases', () => {
    it('should throw when input is invalid', () => {
      expect(() => functionUnderTest(invalid)).toThrow();
    });
  });
});
```

### Python Test (pytest)
```python
import pytest
from module import function_under_test

class TestFunctionName:
    """Tests for function_name"""

    def test_happy_path(self):
        """Should return expected result for valid input"""
        result = function_under_test(valid_input)
        assert result == expected

    def test_edge_case_empty(self):
        """Should handle empty input gracefully"""
        result = function_under_test([])
        assert result == []

    def test_error_invalid_input(self):
        """Should raise ValueError for invalid input"""
        with pytest.raises(ValueError):
            function_under_test(invalid_input)
```

## Test Quality Checklist

- [ ] Tests are isolated (no shared state)
- [ ] Tests are deterministic (same result every time)
- [ ] Tests are fast (unit tests < 100ms)
- [ ] Test names describe the scenario
- [ ] Arrange-Act-Assert pattern followed
- [ ] No logic in tests (no conditionals)
- [ ] Mocks/stubs used appropriately
- [ ] Coverage targets met (aim for >80%)

## Common Testing Patterns

### Mocking External Dependencies
```typescript
jest.mock('./api', () => ({
  fetchData: jest.fn().mockResolvedValue({ data: 'mocked' })
}));
```

### Testing Async Code
```typescript
it('should handle async operation', async () => {
  const result = await asyncFunction();
  expect(result).toBe(expected);
});
```

### Testing React Components
```typescript
import { render, screen, fireEvent } from '@testing-library/react';

it('should update on user interaction', () => {
  render(<Component />);
  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByText('Updated')).toBeInTheDocument();
});
```

## Tool-Specific Usage

### Cursor
```
/write-tests
```

### Claude Code
```
Write tests for [function/component name]
```

### Gemini CLI
```
/write-tests
```
