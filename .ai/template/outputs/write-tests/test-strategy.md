---
command: write-tests
phase: quality-assurance
version: 1.0.0
timestamp: {{timestamp}}
linked_commands: [/implement, /review-code]
---

# 🧪 Test Strategy & Implementation Plan

## Test Strategy Overview
**Project**: {{project_name}}
**Component**: {{component_name}}
**Test Type**: {{test_type}}
**Coverage Target**: {{coverage_target}}%
**Test Framework**: {{test_framework}}
**Created**: {{creation_date}}

## 📊 Testing Scope

### What to Test
{{#test_scope}}
#### {{category}}
- **Priority**: {{priority}}
- **Components**: {{components}}
- **Rationale**: {{rationale}}
{{/test_scope}}

### What NOT to Test
{{#out_of_scope}}
- {{item}} - **Reason**: {{reason}}
{{/out_of_scope}}

## 🎯 Test Coverage Goals

| Coverage Type | Current | Target | Gap | Priority |
|--------------|---------|--------|-----|----------|
{{#coverage_goals}}
| {{type}} | {{current}}% | {{target}}% | {{gap}}% | {{priority}} |
{{/coverage_goals}}

## 🏗️ Test Architecture

### Test Pyramid
```
         /\        {{e2e_count}} E2E Tests ({{e2e_percentage}}%)
        /  \
       /    \      {{integration_count}} Integration Tests ({{integration_percentage}}%)
      /      \
     /________\    {{unit_count}} Unit Tests ({{unit_percentage}}%)
```

### Test Categories
{{#test_categories}}
#### {{category_name}}
- **Purpose**: {{purpose}}
- **Count**: {{test_count}}
- **Tools**: {{tools}}
- **Execution Time**: {{execution_time}}
{{/test_categories}}

## 📝 Test Cases

### Critical Path Tests (P0)
{{#critical_tests}}
#### Test: {{test_name}}
- **ID**: {{test_id}}
- **Type**: {{test_type}}
- **Component**: {{component}}
- **Scenario**: {{scenario}}
- **Expected Result**: {{expected_result}}
- **Implementation Status**: {{status}}

**Test Code**:
```{{language}}
{{test_code}}
```
{{/critical_tests}}

### Core Functionality Tests (P1)
{{#core_tests}}
#### Test: {{test_name}}
- **ID**: {{test_id}}
- **Coverage**: {{coverage_area}}
- **Preconditions**: {{preconditions}}
- **Steps**:
{{#steps}}
  1. {{step}}
{{/steps}}
- **Assertions**: {{assertions}}
{{/core_tests}}

### Edge Cases & Error Handling (P2)
{{#edge_cases}}
#### Edge Case: {{case_name}}
- **Scenario**: {{scenario}}
- **Input**: {{input}}
- **Expected Behavior**: {{expected_behavior}}
- **Test Implementation**: {{implementation_status}}
{{/edge_cases}}

## 🔧 Test Implementation

### Unit Tests
{{#unit_tests}}
#### {{file_to_test}}
**Test File**: `{{test_file_path}}`
**Coverage**: {{coverage}}%

**Test Structure**:
```{{language}}
{{test_structure}}
```

**Key Test Cases**:
{{#test_cases}}
- `{{test_case}}` - {{description}}
{{/test_cases}}
{{/unit_tests}}

### Integration Tests
{{#integration_tests}}
#### {{integration_name}}
**Components**: {{components}}
**Test File**: `{{test_file}}`

**Setup**:
```{{language}}
{{setup_code}}
```

**Test Scenario**:
```{{language}}
{{test_scenario_code}}
```

**Teardown**:
```{{language}}
{{teardown_code}}
```
{{/integration_tests}}

### End-to-End Tests
{{#e2e_tests}}
#### {{e2e_test_name}}
**User Journey**: {{user_journey}}
**Critical Path**: {{is_critical}}

**Test Flow**:
```{{language}}
{{test_flow_code}}
```

**Validation Points**:
{{#validation_points}}
- {{point}}
{{/validation_points}}
{{/e2e_tests}}

## 🏃 Test Execution Plan

### Test Suites
{{#test_suites}}
#### Suite: {{suite_name}}
- **Command**: `{{command}}`
- **Files**: {{file_pattern}}
- **Timeout**: {{timeout}}
- **Parallel**: {{parallel_execution}}
- **Tags**: {{tags}}
{{/test_suites}}

### Execution Order
```bash
# Phase 1: Unit Tests (Fast Feedback)
{{unit_test_command}}

# Phase 2: Integration Tests
{{integration_test_command}}

# Phase 3: E2E Tests (if all pass)
{{e2e_test_command}}
```

### CI/CD Integration
```yaml
{{ci_config}}
```

## 🎭 Test Data & Fixtures

### Test Data Strategy
{{#test_data}}
#### {{data_type}}
- **Source**: {{source}}
- **Generation**: {{generation_method}}
- **Cleanup**: {{cleanup_strategy}}
{{/test_data}}

### Fixtures
{{#fixtures}}
#### {{fixture_name}}
```{{language}}
{{fixture_code}}
```
{{/fixtures}}

### Mocks & Stubs
{{#mocks}}
#### Mock: {{mock_name}}
- **Target**: {{target}}
- **Purpose**: {{purpose}}
- **Implementation**:
```{{language}}
{{mock_implementation}}
```
{{/mocks}}

## 🐛 Regression Testing

### Regression Test Suite
{{#regression_tests}}
- **Bug ID**: {{bug_id}}
- **Test Name**: {{test_name}}
- **Prevents**: {{prevents}}
- **Added**: {{date_added}}
{{/regression_tests}}

### Regression Prevention
{{#prevention_strategies}}
1. {{strategy}}
{{/prevention_strategies}}

## 📈 Performance Testing

### Performance Benchmarks
{{#performance_tests}}
#### {{benchmark_name}}
- **Target**: {{target_metric}}
- **Threshold**: {{threshold}}
- **Current**: {{current_value}}
- **Test Code**:
```{{language}}
{{benchmark_code}}
```
{{/performance_tests}}

## 🔒 Security Testing

### Security Test Cases
{{#security_tests}}
#### {{security_test}}
- **Vulnerability Type**: {{vulnerability_type}}
- **OWASP Category**: {{owasp_category}}
- **Test Implementation**: {{implementation}}
{{/security_tests}}

## 🔄 Links to Implementation

### Implementation Files
{{#implementation_links}}
- **Source**: `{{source_file}}`
- **Test**: `{{test_file}}`
- **Coverage**: {{coverage}}%
{{/implementation_links}}

### Implementation Guide Reference
- **Guide**: `memory-bank/implementation/guide-{{implementation_version}}.md`
- **Testing Section**: {{testing_section_ref}}

## 📊 Test Metrics & Reporting

### Key Metrics
- **Total Tests**: {{total_tests}}
- **Pass Rate**: {{pass_rate}}%
- **Flaky Tests**: {{flaky_count}}
- **Average Runtime**: {{avg_runtime}}
- **Last Run**: {{last_run_date}}

### Coverage Report
```
File                | % Stmts | % Branch | % Funcs | % Lines |
--------------------|---------|----------|---------|---------|
{{#coverage_report}}
{{file_name}} | {{stmt_coverage}} | {{branch_coverage}} | {{func_coverage}} | {{line_coverage}} |
{{/coverage_report}}
```

## ✅ Test Checklist

### Before Implementation
{{#before_checklist}}
- [ ] {{item}}
{{/before_checklist}}

### During Implementation
{{#during_checklist}}
- [ ] {{item}}
{{/during_checklist}}

### After Implementation
{{#after_checklist}}
- [ ] {{item}}
{{/after_checklist}}

## 🚀 Next Steps

### Immediate Actions
{{#immediate_actions}}
1. {{action}}
{{/immediate_actions}}

### Future Improvements
{{#future_improvements}}
- {{improvement}}
{{/future_improvements}}

---
*Test Strategy by {{ai_tool}}*
*Session ID: {{session_id}}*
*Generated: {{timestamp}}*