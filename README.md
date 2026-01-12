
## 桑尼王炸核彈火神銃 一波流

# Universal AI Copilot Template

> **統一 Cursor、Claude Code 和 Gemini CLI 的專業開發工作流程**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)
[![AI Tools](https://img.shields.io/badge/AI-Cursor%20%7C%20Claude%20%7C%20Gemini-blue.svg)](#supported-ai-tools)

## ⚡ 快速開始

```bash
# 1. 複製專案
git clone [this-repo]
cd ai-agentic-coding-template_unified

# 2. 安裝依賴
npm install

# 3. 生成配置（從 .ai/template/ 讀取模板）
npm run ai-sync

# 4. 開始使用任何 AI 工具
# Cursor / Claude Code / Gemini CLI 都使用相同指令
```

## 🎯 核心概念

```
.ai/template/          # 📝 配置模板（源頭）
     ↓ npm run ai-sync
生成三個配置檔案：
├── .cursorrules       # Cursor 配置
├── CLAUDE.md          # Claude Code 配置
└── GEMINI.md          # Gemini CLI 配置
```

## 🔄 七步架構設計工作流程

基於架構師核心思維的專業開發流程：

| 步驟 | 指令 | 階段 | AI 增強 | 自動化程度 |
|------|------|------|---------|-----------|
| 1️⃣ | `/van` | 理解需求 | Architecture Advisor | 90% |
| 2️⃣ | `/plan` | 概念設計 | 自動領域建模 | 85% |
| 3️⃣ | `/adr` | 技術選型 | 決策記錄自動化 | 95% |
| 4️⃣ | `/design-validator` | 詳細設計 | 規格自動生成 | 90% |
| 5️⃣ | `/creative` | 驗證評審 | 合規自動檢查 | 95% |
| 6️⃣ | `/implement` | 實施指導 | Performance Guidance | 85% |
| 7️⃣ | `/reflect` | 演進優化 | 數據驅動改進 | 90% |

## 📁 專案結構

```
project/
├── .ai/                    # 統一配置中心
│   ├── template/          # 配置模板
│   │   ├── CLAUDE.md     # Claude 模板
│   │   ├── GEMINI.md     # Gemini 模板
│   │   └── .cursorrules  # Cursor 模板
│   ├── config.yaml       # 主配置
│   ├── commands/         # 指令定義
│   ├── rules/           # 開發規則
│   └── agents/          # AI 代理配置
│
├── memory-bank/           # 共享記憶（專案狀態）
│   ├── tasks.md          # 任務清單
│   ├── activeContext.md  # 當前焦點
│   └── progress.md       # 進度追蹤
│
├── scripts/              # 同步腳本
│   └── sync-ai-config.js # 配置同步器
│
└── [生成的檔案]          # 由 npm run ai-sync 產生
    ├── .cursorrules      # Cursor 使用
    ├── CLAUDE.md         # Claude Code 使用
    ├── GEMINI.md         # Gemini CLI 使用
    ├── .cursor/          # Cursor 工具目錄
    ├── .claude/          # Claude 工具目錄
    └── .gemini/          # Gemini 工具目錄
```

## 🛠️ 可用指令

### NPM 管理指令
| NPM 指令 | 說明 |
|----------|------|
| `npm run setup` | 互動式初始設置 |
| `npm run ai-sync` | 同步所有 AI 工具配置 |
| `npm run ai-sync:cursor` | 僅同步 Cursor |
| `npm run ai-sync:claude` | 僅同步 Claude Code |
| `npm run ai-sync:gemini` | 僅同步 Gemini CLI |
| `npm run ai-verify` | 驗證配置完整性 |

### 架構設計核心指令
| 指令 | 步驟 | 階段 | AI 增強 | 自動化程度 |
|------|------|------|---------|-----------|
| `/van` | 1️⃣ | 理解需求 | Architecture Advisor | 90% |
| `/plan` | 2️⃣ | 概念設計 | 自動領域建模 | 85% |
| `/adr` | 3️⃣ | 技術選型 | 決策記錄自動化 | 95% |
| `/design-validator` | 4️⃣ | 詳細設計 | 規格自動生成 | 90% |
| `/creative` | 5️⃣ | 驗證評審 | 合規自動檢查 | 95% |
| `/implement` | 6️⃣ | 實施指導 | Performance Guidance | 85% |
| `/reflect` | 7️⃣ | 演進優化 | 數據驅動改進 | 90% |

### 智能輔助指令
| 指令 | 功能 | AI 代理 |
|------|------|---------|
| `/adr` | Architecture Decision Records | ADR 自動化 |
| `/design-validator` | 設計驗證與規格生成 | Design Validator |
| `/task-next` | PM 建議下一步 | Task Advisor |
| `/debug` | 智能除錯 | Debug Assistant |
| `/review-code` | 代碼審查 | Code Reviewer |
| `/write-tests` | 測試撰寫 | Test Runner |

## 🔑 關鍵特性

### 1. **🎯 Level 4 創新期架構成熟度**
- **AI 賦能**: 7大智能代理系統完整覆蓋開發流程
- **自動化設計**: API、Schema、Interface 自動生成
- **智能決策**: Architecture Advisor 提供技術選型建議
- **預測優化**: Performance Optimizer 主動識別瓶頸

### 2. **🧠 智能代理生態系統**
```yaml
intelligent_agents:
  - architecture-advisor    # 🏗️ 架構建議和技術選型
  - design-validator       # ✅ 設計驗證和規格自動生成
  - metrics-tracker        # 📊 開發指標和質量閘門
  - performance-optimizer  # ⚡ 效能監控和優化建議
  - security-scanner      # 🛡️ 安全掃描和合規檢查
  - code-reviewer         # 👁️ 代碼審查和品質控制
  - test-runner          # 🧪 自動化測試執行
```

### 3. **📋 架構師級七步設計流程**
> 基於軟體架構師核心思維，每個步驟都有對應的 AI 智能增強

| 步驟 | 主要指令 | 輔助工具 | AI 增強 | 自動化程度 |
|------|---------|---------|---------|-----------|
| 1️⃣ 理解需求 | `/van` | `/plan` | Architecture Advisor | 90% |
| 2️⃣ 概念設計 | `/plan` | `/creative` | 自動領域建模 | 85% |
| 3️⃣ 技術選型 | `/adr` | - | 決策記錄自動化 | 95% |
| 4️⃣ 詳細設計 | `/design-validator` | - | 規格自動生成 | 90% |
| 5️⃣ 驗證評審 | `/creative` | Design Validator | 合規自動檢查 | 95% |
| 6️⃣ 實施指導 | `/implement` | Performance Optimizer | Performance Guidance | 85% |
| 7️⃣ 演進優化 | `/reflect` | Metrics Tracker | 數據驅動改進 | 90% |

### 4. **🔄 Memory Bank 共享記憶**
- 所有 AI 工具共享專案狀態
- 支援團隊協作（Alice 用 Cursor，Bob 用 Claude）
- 自動追蹤進度與上下文
- ADR 決策歷史完整保存

### 5. **🛡️ 企業級安全防護**
```yaml
# .ai/config.yaml 內建安全規則
security:
  protected_branches: ["main"]
  dangerous_patterns: ["rm -rf /"]
  secret_patterns: [".env", "*.key"]
  owasp_compliance: true
  automated_security_scans: true
```

## 👥 團隊協作範例

```bash
# Alice 使用 Cursor
打開 Cursor → 執行 /van → /plan

# Bob 使用 Claude Code
打開專案 → AI 讀取 Memory Bank → 繼續 /implement

# Charlie 使用 Gemini CLI
gemini chat → /reflect → 總結進度
```

## 📚 進階配置

### 修改工作流程
編輯 `.ai/template/` 中的模板檔案：
- `CLAUDE.md` - Claude Code 行為規範
- `GEMINI.md` - Gemini CLI 行為規範
- `.cursorrules` - Cursor 規則

### 新增自定義指令
在 `.ai/commands/` 新增指令定義：
```yaml
# .ai/commands/workflow/custom.md
---
name: custom
description: 自定義指令
phase: custom
---
```

### 擴展 AI 代理
在 `.ai/agents/` 新增代理配置：
- `code-reviewer.md` - 代碼審查專家
- `test-runner.md` - 測試執行專家

## 🚀 最佳實踐

### 架構師級基礎流程
1. **每次開始前執行** `/van` 確保 Memory Bank 存在並理解需求
2. **遵循七步架構設計流程**，按序進行不跳步
3. **重要技術決策使用** `/adr` 建立決策記錄
4. **設計階段執行** `/design-validator` 確保規格完整性
5. **定期執行** `npm run ai-sync` 保持配置同步
6. **團隊協作時**共享 `memory-bank/` 目錄

### Level 4 進階實踐
6. **設計階段使用** `/adr` 記錄重要技術決策
7. **創建設計後執行** `/design-validator` 自動驗證和生成規格
8. **實作前諮詢** Architecture Advisor 獲取最佳實踐建議
9. **開發過程中啟用** Performance Optimizer 持續監控
10. **定期執行** Security Scanner 確保合規性
11. **使用** Metrics Tracker 追蹤開發速度和品質指標

### 企業級應用
- **建立質量閘門**: 設定自動化測試和代碼審查標準
- **實施 ADR 流程**: 所有架構決策都要有文檔記錄
- **啟用安全掃描**: 集成到 CI/CD pipeline 中
- **監控開發指標**: 建立數據驅動的改進機制

## 📖 相關資源

### 核心文檔
- [architecture-diagram.md](./architecture-diagram.md) - 完整架構關聯圖譜
- [.ai/config.yaml](./.ai/config.yaml) - 主配置檔案
- [AI_WORKFLOW.md](./AI_WORKFLOW.md) - 詳細工作流程說明

### 智能代理文檔
- [architecture-advisor.md](./.ai/agents/architecture-advisor.md) - 🏗️ 架構建議專家
- [design-validator.md](./.ai/agents/design-validator.md) - ✅ 設計驗證和規格生成
- [metrics-tracker.md](./.ai/agents/metrics-tracker.md) - 📊 開發指標追蹤
- [performance-optimizer.md](./.ai/agents/performance-optimizer.md) - ⚡ 效能優化專家
- [security-scanner.md](./.ai/agents/security-scanner.md) - 🛡️ 安全掃描專家
- [code-reviewer.md](./.ai/agents/code-reviewer.md) - 👁️ 代碼審查專家
- [test-runner.md](./.ai/agents/test-runner.md) - 🧪 測試執行專家

### 進階功能
- [ADR 指令文檔](./.ai/commands/utility/adr.md) - Architecture Decision Records
- [Design Validator](./.ai/commands/utility/design-validator.md) - 設計驗證器

### 社群
- [GitHub Issues](https://github.com/your-repo/issues) - 問題回報
- [架構成熟度評估](./MATURITY_ASSESSMENT.md) - Level 4 成熟度指南

## 📄 License

MIT © 2026 AI Agentic Coding Template

---

**Quick Start**: `npm install` → `npm run ai-sync` → 開始使用！