
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

## 🔄 統一工作流程

所有 AI 工具使用相同的六階段流程：

| 階段 | 指令 | 用途 |
|------|------|------|
| 🚀 初始化 | `/van` | 建立 Memory Bank 結構 |
| 📋 規劃 | `/plan` | 任務分解與優先級 |
| 🎨 設計 | `/creative` | 架構設計與技術選型 |
| 🔨 實作 | `/implement` | 程式碼開發 |
| 🪞 回顧 | `/reflect` | 進度總結 |
| 📦 歸檔 | `/archive` | 知識保存 |

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

| NPM 指令 | 說明 |
|----------|------|
| `npm run setup` | 互動式初始設置 |
| `npm run ai-sync` | 同步所有 AI 工具配置 |
| `npm run ai-sync:cursor` | 僅同步 Cursor |
| `npm run ai-sync:claude` | 僅同步 Claude Code |
| `npm run ai-sync:gemini` | 僅同步 Gemini CLI |
| `npm run ai-verify` | 驗證配置完整性 |

## 🔑 關鍵特性

### 1. **模板優先設計**
- 所有配置從 `.ai/template/` 直接讀取
- 無動態生成，確保一致性
- 修改模板後執行 `npm run ai-sync` 即可更新

### 2. **Memory Bank 共享記憶**
- 所有 AI 工具共享專案狀態
- 支援團隊協作（Alice 用 Cursor，Bob 用 Claude）
- 自動追蹤進度與上下文

### 3. **獨立代理配置**
- `.claude/agents/` - Claude 專用代理
- `.gemini/agents/` - Gemini 專用代理
- 統一的角色與責任定義

### 4. **安全防護**
```yaml
# .ai/config.yaml 內建安全規則
security:
  protected_branches: ["main"]
  dangerous_patterns: ["rm -rf /"]
  secret_patterns: [".env", "*.key"]
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

1. **每次開始前執行** `/van` 確保 Memory Bank 存在
2. **遵循六階段流程**，不要跳過階段
3. **定期執行** `npm run ai-sync` 保持配置同步
4. **使用** `/commit` 生成規範的提交訊息
5. **團隊協作時**共享 `memory-bank/` 目錄

## 📖 相關資源

- [AI_WORKFLOW.md](./AI_WORKFLOW.md) - 詳細工作流程說明
- [.ai/config.yaml](./.ai/config.yaml) - 主配置檔案
- [GitHub Issues](https://github.com/your-repo/issues) - 問題回報

## 📄 License

MIT © 2026 AI Agentic Coding Template

---

**Quick Start**: `npm install` → `npm run ai-sync` → 開始使用！