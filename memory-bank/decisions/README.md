# 📝 Architecture Decision Records (ADR)

> 架構決策記錄 - 記載所有重要的技術和架構決策

## 🎯 ADR 使用指南

### 什麼是 ADR？
Architecture Decision Records (ADR) 是用來記錄軟體架構重要決策的文檔格式。每個 ADR 記錄一個具體的架構決策、背景、原因和後果。

### 何時創建 ADR？
- 選擇技術棧或框架時
- 設計系統架構模式時
- 選擇第三方服務或工具時
- 修改現有架構決策時
- 團隊對技術方案有爭議時

## 📁 檔案結構

```
decisions/
├── README.md                    # 本文件
├── registry.yaml                # ADR 註冊表 (自動維護)
├── adr-001-project-setup.md     # 專案初始設置
├── adr-002-frontend-framework.md
├── adr-003-database-choice.md
└── templates/                   # ADR 模板庫
    ├── technology-selection.md
    ├── architecture-pattern.md
    └── infrastructure-choice.md
```

## 🔢 ADR 編號規則

- **格式**: `adr-{number:03d}-{slug}.md`
- **編號**: 從 001 開始，連續遞增
- **Slug**: 簡短的英文描述，使用小寫和連字符
- **範例**: `adr-015-microservices-architecture.md`

## 📋 ADR 狀態

| 狀態 | 說明 | 何時使用 |
|------|------|----------|
| **Proposed** | 提議中 | 決策還在討論階段 |
| **Accepted** | 已接受 | 決策已確定並開始實施 |
| **Deprecated** | 已廢棄 | 決策不再適用但保留記錄 |
| **Superseded** | 已被取代 | 被新的 ADR 取代 |

## 🤖 AI 輔助創建

### 使用 /adr 指令
```bash
# 自動檢測決策點並創建 ADR
/adr

# 手動創建特定 ADR
/adr new "選擇 React 作為前端框架"

# 審查現有 ADR
/adr review

# 更新 ADR 狀態
/adr update 003 --status accepted
```

### Architecture Advisor 整合
Architecture Advisor 會自動:
- 監控技術決策點
- 建議創建 ADR
- 提供決策選項分析
- 評估決策影響

## 📝 ADR 模板

### 基本模板結構
```markdown
# ADR-{number}: {Title}

**Date**: {YYYY-MM-DD}
**Status**: {Proposed|Accepted|Deprecated|Superseded}
**Decision Makers**: {Who was involved}

## Context
{Background and problem description}

## Decision Drivers
- Driver 1
- Driver 2

## Considered Options
### Option 1: {Name}
- Pros: [benefits]
- Cons: [drawbacks]
- Cost/Risk: {assessment}

### Option 2: {Name}
- Pros: [benefits]
- Cons: [drawbacks]
- Cost/Risk: {assessment}

## Decision Outcome
**Chosen Option**: {selected option}
**Justification**: {reasoning}

## Consequences
### Positive
- Benefit 1
- Benefit 2

### Negative
- Trade-off 1
- Trade-off 2

### Risks
- Risk 1: {mitigation strategy}
- Risk 2: {mitigation strategy}

## Implementation
- [ ] Action item 1
- [ ] Action item 2

## Review Date
{When to review this decision}
```

## 🔍 ADR 最佳實踐

### 撰寫原則
1. **簡潔明瞭**: 重點突出，避免冗長描述
2. **客觀中性**: 基於事實和數據，不帶個人情感
3. **完整記錄**: 包含背景、選項、決策和後果
4. **及時更新**: 決策變更時立即更新狀態

### 決策品質
1. **多選項比較**: 至少考慮 2-3 個可行方案
2. **量化評估**: 盡可能用數據支持決策
3. **風險評估**: 識別和規劃風險緩解策略
4. **實施計畫**: 明確實施步驟和責任人

### 維護管理
1. **定期審查**: 每季度審查 ADR 的有效性
2. **狀態更新**: 及時更新 ADR 狀態變化
3. **關聯管理**: 維護 ADR 之間的關聯關係
4. **知識傳承**: 新團隊成員入職時學習重要 ADR

## 📊 ADR 統計 (自動更新)

```yaml
# 由 Metrics Tracker 自動維護
total_adrs: 0
status_distribution:
  proposed: 0
  accepted: 0
  deprecated: 0
  superseded: 0

recent_activity:
  last_created: null
  last_updated: null

categories:
  technology_selection: 0
  architecture_pattern: 0
  infrastructure: 0
  process: 0
```

## 🚨 常見問題

### Q: ADR 太多，如何管理？
A: 使用 `registry.yaml` 註冊表和分類標籤，定期歸檔過時的 ADR。

### Q: 決策變更時怎麼辦？
A: 創建新的 ADR 取代舊的，將舊 ADR 狀態設為 "Superseded"。

### Q: 團隊不習慣寫 ADR？
A: 從重要決策開始，使用 AI 輔助生成，逐步培養習慣。

### Q: ADR 與其他文檔重複？
A: ADR 專注於決策邏輯，其他文檔專注於實作細節，各有側重。