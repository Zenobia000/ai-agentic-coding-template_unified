---
command: debug
phase: troubleshooting
version: 1.0.0
timestamp: {{timestamp}}
linked_commands: [/implement, /review-code]
---

# 🔍 Debug Root Cause Analysis Report

## Issue Summary
**Issue ID**: {{issue_id}}
**Severity**: {{severity}}
**Status**: {{status}}
**Reporter**: {{reporter}}
**Detected**: {{detection_time}}
**Environment**: {{environment}}

## Problem Description

### Symptoms
{{#symptoms}}
- {{symptom}}
{{/symptoms}}

### Error Messages
```{{error_language}}
{{error_message}}
```

### Stack Trace
```{{trace_language}}
{{stack_trace}}
```

## 🎯 Root Cause Analysis

### Investigation Timeline
{{#investigation_steps}}
**{{timestamp}}** - {{action}}
- Finding: {{finding}}
- Hypothesis: {{hypothesis}}
- Result: {{result}}
{{/investigation_steps}}

### Root Cause Identification

#### Primary Cause
**Category**: {{root_cause_category}}
**Component**: {{affected_component}}
**Root Cause**: {{root_cause_description}}

**Evidence**:
{{#evidence}}
- {{evidence_item}}
{{/evidence}}

#### Contributing Factors
{{#contributing_factors}}
- **Factor**: {{factor}}
  - Impact: {{impact}}
  - How it contributed: {{contribution}}
{{/contributing_factors}}

### Causal Chain Analysis
```mermaid
graph TD
    A[{{initial_trigger}}] --> B[{{intermediate_cause_1}}]
    B --> C[{{intermediate_cause_2}}]
    C --> D[{{root_cause}}]
    D --> E[{{observed_symptom}}]
```

## 🔬 Technical Analysis

### Code Analysis
{{#code_issues}}
#### Issue: {{issue_type}}
**File**: `{{file_path}}:{{line_number}}`
**Problematic Code**:
```{{language}}
{{problematic_code}}
```

**Fixed Code**:
```{{language}}
{{fixed_code}}
```

**Explanation**: {{explanation}}
{{/code_issues}}

### Data Flow Analysis
{{#data_flow}}
1. {{step}}: {{description}}
   - Input: {{input}}
   - Output: {{output}}
   - Issue: {{issue_at_step}}
{{/data_flow}}

### System State
```yaml
{{#system_state}}
{{component}}:
  status: {{status}}
  metrics:
    {{#metrics}}
    {{metric_name}}: {{value}}
    {{/metrics}}
{{/system_state}}
```

## 🛠️ Solution

### Immediate Fix
```{{fix_language}}
{{immediate_fix_code}}
```

**Steps to Apply**:
{{#fix_steps}}
1. {{step}}
{{/fix_steps}}

### Long-term Solution
{{#long_term_solutions}}
#### {{solution_name}}
- **Description**: {{description}}
- **Implementation**: {{implementation_detail}}
- **Effort**: {{effort_estimate}}
- **Impact**: {{impact_assessment}}
{{/long_term_solutions}}

## 🧪 Testing & Validation

### Test Cases
{{#test_cases}}
#### Test: {{test_name}}
```{{test_language}}
{{test_code}}
```
**Expected Result**: {{expected_result}}
**Actual Result**: {{actual_result}}
**Status**: {{test_status}}
{{/test_cases}}

### Regression Testing
{{#regression_tests}}
- [ ] {{test_description}}
{{/regression_tests}}

### Performance Impact
| Metric | Before | After | Change |
|--------|--------|-------|---------|
{{#performance_metrics}}
| {{metric}} | {{before}} | {{after}} | {{change}} |
{{/performance_metrics}}

## 🚨 Prevention Measures

### Code Improvements
{{#code_improvements}}
- **Area**: {{area}}
  - Current: {{current_state}}
  - Improvement: {{improvement}}
  - Priority: {{priority}}
{{/code_improvements}}

### Process Improvements
{{#process_improvements}}
1. {{improvement}}
   - Why: {{rationale}}
   - How: {{implementation}}
{{/process_improvements}}

### Monitoring Additions
{{#monitoring}}
- **Metric**: {{metric_name}}
  - Threshold: {{threshold}}
  - Alert: {{alert_condition}}
  - Dashboard: {{dashboard_location}}
{{/monitoring}}

## 📊 Impact Analysis

### Business Impact
- **Users Affected**: {{users_affected}}
- **Revenue Impact**: {{revenue_impact}}
- **SLA Status**: {{sla_status}}
- **Customer Sentiment**: {{customer_sentiment}}

### Technical Impact
- **Systems Affected**: {{#affected_systems}}{{system}}, {{/affected_systems}}
- **Data Integrity**: {{data_integrity_status}}
- **Performance Degradation**: {{performance_impact}}%
- **Security Implications**: {{security_impact}}

## 🔄 Similar Issues

### Historical Occurrences
{{#historical_issues}}
- **Date**: {{date}}
- **Issue**: {{issue_description}}
- **Resolution**: {{resolution}}
- **Similarity**: {{similarity_score}}%
{{/historical_issues}}

### Pattern Detection
{{#patterns}}
- **Pattern**: {{pattern_name}}
  - Frequency: {{frequency}}
  - Trigger: {{trigger}}
  - Prevention: {{prevention_strategy}}
{{/patterns}}

## 📈 Metrics & KPIs

### Debug Efficiency
- **Time to Detection**: {{time_to_detection}}
- **Time to Resolution**: {{time_to_resolution}}
- **Debug Iterations**: {{debug_iterations}}
- **False Positives**: {{false_positives}}

### Quality Metrics
- **Defect Escape Rate**: {{defect_escape_rate}}
- **Mean Time Between Failures**: {{mtbf}}
- **Code Coverage**: {{code_coverage}}%
- **Technical Debt Impact**: {{tech_debt_impact}}

## 📝 Lessons Learned

### What Went Well
{{#went_well}}
- {{item}}
{{/went_well}}

### What Could Be Improved
{{#improvements}}
- {{item}}
{{/improvements}}

### Action Items
{{#action_items}}
- [ ] **[{{priority}}]** {{action}}
  - Owner: {{owner}}
  - Due: {{due_date}}
{{/action_items}}

## Resolution Summary

**Status**: {{resolution_status}}
**Resolved By**: {{resolver}}
**Resolution Time**: {{resolution_time}}
**Verification**: {{verification_status}}

### Next Steps
{{#next_steps}}
1. {{step}}
{{/next_steps}}

---
*Debug Analysis by {{ai_tool}}*
*Session ID: {{session_id}}*
*Generated: {{timestamp}}*