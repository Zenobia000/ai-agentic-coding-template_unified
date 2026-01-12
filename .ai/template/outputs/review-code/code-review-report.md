---
command: review-code
phase: quality-assurance
version: 1.0.0
timestamp: {{timestamp}}
linked_commands: [/implement, /write-tests]
---

# 🔍 Code Review Report

## Review Summary
**Review ID**: {{review_id}}
**Reviewer**: {{reviewer}}
**Review Date**: {{review_date}}
**Repository**: {{repository_name}}
**Branch**: {{branch_name}}
**Commit Range**: {{commit_range}}

## 📊 Overall Assessment

### Quality Score: {{overall_score}}/100

| Category | Score | Grade | Details |
|----------|-------|-------|---------|
| **Code Quality** | {{code_quality_score}}/25 | {{code_quality_grade}} | {{code_quality_summary}} |
| **Architecture** | {{architecture_score}}/25 | {{architecture_grade}} | {{architecture_summary}} |
| **Security** | {{security_score}}/25 | {{security_grade}} | {{security_summary}} |
| **Performance** | {{performance_score}}/25 | {{performance_grade}} | {{performance_summary}} |

### Risk Level: {{risk_level}}
- **Critical Issues**: {{critical_count}}
- **Major Issues**: {{major_count}}
- **Minor Issues**: {{minor_count}}
- **Suggestions**: {{suggestion_count}}

## 🎯 Linus Torvalds "Good Taste" Assessment

### Good Taste Score: {{taste_score}}
{{#taste_assessment}}
#### {{category}}
- **Current Approach**: {{current_approach}}
- **Issue**: {{issue}}
- **Better Approach**: {{better_approach}}
- **Why It's Better**: {{rationale}}
{{/taste_assessment}}

### Special Cases Detected
{{#special_cases}}
- **File**: `{{file_path}}:{{line_number}}`
  - **Special Case**: {{special_case_description}}
  - **How to Eliminate**: {{elimination_strategy}}
{{/special_cases}}

## 🚨 Critical Issues (Must Fix)

{{#critical_issues}}
### {{index}}. {{title}}
**File**: `{{file_path}}:{{line_range}}`
**Severity**: CRITICAL
**Category**: {{category}}

**Problem**:
```{{language}}
{{problematic_code}}
```

**Issue**: {{issue_description}}

**Fix**:
```{{language}}
{{fixed_code}}
```

**Impact if Not Fixed**: {{impact}}
{{/critical_issues}}

## ⚠️ Major Issues (Should Fix)

{{#major_issues}}
### {{index}}. {{title}}
**File**: `{{file_path}}:{{line_range}}`
**Severity**: MAJOR
**Category**: {{category}}

**Current Code**:
```{{language}}
{{current_code}}
```

**Recommendation**: {{recommendation}}

**Improved Code**:
```{{language}}
{{improved_code}}
```
{{/major_issues}}

## 💡 Suggestions (Nice to Have)

{{#suggestions}}
### {{category}}: {{title}}
- **Location**: `{{file_path}}`
- **Suggestion**: {{suggestion}}
- **Benefit**: {{benefit}}
{{/suggestions}}

## 🔒 Security Analysis

### Vulnerabilities Found
{{#vulnerabilities}}
- **Type**: {{vulnerability_type}}
- **Severity**: {{severity}}
- **Location**: `{{file_path}}:{{line}}`
- **CWE**: {{cwe_id}}
- **Fix**: {{fix_description}}
{{/vulnerabilities}}

### Security Best Practices
{{#security_checklist}}
- [{{status}}] {{practice}}
{{/security_checklist}}

## ⚡ Performance Analysis

### Performance Issues
{{#performance_issues}}
#### {{title}}
- **Location**: `{{file_path}}`
- **Issue**: {{issue}}
- **Impact**: {{performance_impact}}
- **Solution**: {{solution}}
{{/performance_issues}}

### Complexity Analysis
| File | Cyclomatic Complexity | Cognitive Complexity | Recommendation |
|------|----------------------|---------------------|----------------|
{{#complexity_analysis}}
| {{file}} | {{cyclomatic}} | {{cognitive}} | {{recommendation}} |
{{/complexity_analysis}}

## 🏗️ Architecture Review

### Design Patterns
{{#design_patterns}}
- **Pattern**: {{pattern_name}}
- **Usage**: {{usage_context}}
- **Assessment**: {{assessment}}
{{/design_patterns}}

### SOLID Principles
{{#solid_principles}}
- **{{principle}}**: {{status}} - {{notes}}
{{/solid_principles}}

### Coupling & Cohesion
- **Coupling Level**: {{coupling_level}}
- **Cohesion Level**: {{cohesion_level}}
- **Modularity Score**: {{modularity_score}}/10

## 📝 Code Style & Standards

### Style Violations
{{#style_violations}}
- `{{file}}:{{line}}` - {{violation}}
{{/style_violations}}

### Naming Conventions
{{#naming_issues}}
- **Issue**: {{issue}}
- **Location**: `{{location}}`
- **Suggestion**: {{suggestion}}
{{/naming_issues}}

## 🧪 Test Coverage Impact

### Coverage Metrics
- **Lines Covered**: {{lines_covered}}%
- **Branches Covered**: {{branches_covered}}%
- **Functions Covered**: {{functions_covered}}%

### Untested Code
{{#untested_code}}
- `{{file}}:{{line_range}}` - {{description}}
{{/untested_code}}

### Test Recommendations
{{#test_recommendations}}
1. {{recommendation}}
{{/test_recommendations}}

## 📊 Technical Debt

### Debt Items
{{#tech_debt}}
- **Type**: {{debt_type}}
- **Location**: {{location}}
- **Effort to Fix**: {{effort_estimate}}
- **Priority**: {{priority}}
{{/tech_debt}}

### Debt Score: {{debt_score}}/100
- **New Debt Added**: {{new_debt}}
- **Debt Removed**: {{debt_removed}}
- **Net Change**: {{debt_change}}

## ✅ Good Practices Found

{{#good_practices}}
### {{practice}}
- **Location**: `{{location}}`
- **Why It's Good**: {{reason}}
{{/good_practices}}

## 📋 Action Items

### Immediate Actions (Block Merge)
{{#immediate_actions}}
- [ ] {{action}}
{{/immediate_actions}}

### Required Actions (Before Production)
{{#required_actions}}
- [ ] {{action}}
{{/required_actions}}

### Recommended Actions (Technical Debt)
{{#recommended_actions}}
- [ ] {{action}}
{{/recommended_actions}}

## 🔄 Links to Implementation

### Related Implementation Files
{{#implementation_files}}
- `{{file_path}}` - {{description}}
{{/implementation_files}}

### Implementation Guide Reference
- **Guide**: `memory-bank/implementation/guide-{{implementation_version}}.md`
- **Phase**: {{implementation_phase}}
- **Task**: {{implementation_task}}

## 📈 Metrics Comparison

### Compared to Previous Review
| Metric | Previous | Current | Change |
|--------|----------|---------|--------|
{{#metrics_comparison}}
| {{metric}} | {{previous}} | {{current}} | {{change}} |
{{/metrics_comparison}}

## Review Decision

**Decision**: {{decision}}

{{#approval_conditions}}
### Conditions for Approval
1. {{condition}}
{{/approval_conditions}}

{{#rejection_reasons}}
### Reasons for Rejection
1. {{reason}}
{{/rejection_reasons}}

---
*Code Review by {{ai_tool}}*
*Review Session: {{session_id}}*
*Generated: {{timestamp}}*