# 📚 Memory Bank - 共享記憶庫

> AI 代理系統的統一數據存儲和知識管理中心

## 📁 資料夾結構

```
memory-bank/
├── 📄 README.md                    # 本文件 - Memory Bank 使用說明
│
├── 🎯 核心狀態檔案 (根目錄)
│   ├── 📋 tasks.md                 # Single Source of Truth - 任務狀態
│   ├── 🎯 activeContext.md         # 當前工作焦點和決策上下文
│   ├── 📄 projectbrief.md          # 專案概述和目標定義
│   ├── 🔧 techContext.md           # 技術背景和架構決策
│   └── 📈 progress.md              # 進度追蹤和里程碑
│
├── 📝 decisions/ - 架構決策記錄
│   ├── README.md                   # ADR 使用指南
│   ├── adr-001-example.md          # 範例 ADR 格式
│   ├── registry.yaml               # ADR 註冊表
│   └── templates/                  # ADR 模板庫
│       ├── technology-selection.md
│       ├── architecture-pattern.md
│       └── infrastructure-choice.md
│
├── 📊 metrics/ - 開發指標數據
│   ├── README.md                   # 指標說明文件
│   ├── daily/                      # 每日指標
│   │   └── 2025-01-09.json
│   ├── weekly/                     # 週度報告
│   ├── dashboard.json              # 即時儀表板數據
│   └── trends.json                 # 趋勢分析數據
│
└── 🎨 designs/ - 設計文件和架構圖
    ├── README.md                   # 設計文件規範
    ├── architecture/               # 系統架構
    │   ├── system-overview.md
    │   ├── component-diagram.md
    │   └── deployment-diagram.md
    ├── api/                        # API 設計
    │   ├── openapi-spec.yaml
    │   └── endpoint-definitions.md
    ├── database/                   # 資料庫設計
    │   ├── schema.sql
    │   ├── migrations/
    │   └── erd-diagram.md
    └── interfaces/                 # 介面定義
        ├── typescript-interfaces.ts
        └── validation-schemas.json
```

## 🔄 資料夾職責

### 🎯 **核心狀態檔案** (根目錄)
**用途**: 存放最關鍵的專案狀態信息，所有 AI 代理都會頻繁讀寫
**存取**: 高頻讀寫，需要快速存取
**文件特性**: 經常更新，結構相對穩定

### 📝 **decisions/ - 架構決策記錄**
**用途**: 存放所有重要的技術和架構決策記錄 (ADR)
**管理**: 由 `/adr` 命令和 Architecture Advisor 管理
**結構**:
- 按時間順序編號 (adr-001, adr-002...)
- 包含決策模板庫
- 維護決策註冊表

### 📊 **metrics/ - 開發指標數據**
**用途**: 存放開發效率、品質指標和分析數據
**管理**: 由 Metrics Tracker 代理自動收集和更新
**結構**: 按時間分層 (daily/weekly/monthly)

### 🎨 **designs/ - 設計文件和架構圖**
**用途**: 存放詳細的設計文件、架構圖、API 規格等
**管理**: 由 `/creative` 階段和 Design Validator 生成
**結構**: 按設計類型分類 (architecture/api/database/interfaces)

## 🤖 AI 代理存取模式

### Architecture Advisor
```yaml
讀取: projectbrief.md, techContext.md, decisions/
寫入: decisions/adr-*.md, techContext.md
```

### Design Validator
```yaml
讀取: designs/, techContext.md
寫入: designs/api/, designs/database/, designs/interfaces/
```

### Metrics Tracker
```yaml
讀取: tasks.md, progress.md
寫入: metrics/daily/, metrics/dashboard.json
```

### Performance Optimizer
```yaml
讀取: designs/, metrics/
寫入: techContext.md, activeContext.md
```

### Security Scanner
```yaml
讀取: designs/, techContext.md
寫入: activeContext.md (安全建議)
```

## 📋 使用指南

### 初始化 Memory Bank
```bash
/van  # 自動創建完整的資料夾結構
```

### 檢查結構完整性
```bash
npm run ai-verify  # 驗證 Memory Bank 結構
```

### 清理過期數據
```bash
# 定期清理舊的指標數據 (保留最近 3 個月)
find memory-bank/metrics/daily -name "*.json" -mtime +90 -delete
```

## 🔒 最佳實踐

1. **不要直接編輯**: 盡量通過 AI 指令更新檔案，確保一致性
2. **定期備份**: Memory Bank 包含專案的完整歷史，需要定期備份
3. **版本控制**: 所有 Memory Bank 檔案都應納入 Git 版本控制
4. **權限管理**: 敏感的決策和指標數據需要適當的存取權限
5. **結構穩定**: 不要隨意更改資料夾結構，會影響 AI 代理運作

## 🚨 故障排除

### Memory Bank 結構損壞
```bash
npm run ai-sync  # 重新生成配置
/van             # 重建 Memory Bank 結構
```

### 指標數據異常
```bash
# 檢查 Metrics Tracker 代理狀態
ls -la memory-bank/metrics/
# 重新初始化指標收集
```

### ADR 編號衝突
```bash
# 檢查 registry.yaml 中的編號分配
cat memory-bank/decisions/registry.yaml
```