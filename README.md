# Universal AI Copilot Template

> **一個架構，三種 AI 工具！統一 Cursor、Claude Code 和 Gemini CLI 的專業開發工作流程**
> **為初學者設計 - 見樹見林，輕鬆掌握整個 AI 協作生態系統**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)
[![AI Tools](https://img.shields.io/badge/AI-Cursor%20%7C%20Claude%20%7C%20Gemini-blue.svg)](#supported-ai-tools)
[![Version](https://img.shields.io/badge/version-2.0-green.svg)](#)

---

## 🔥 初學者指南 - 快速理解整體架構

### 🌲 見樹見林：這個專案是什麼？
這是一個 **統一的 AI 開發工作流程模板**，讓你可以用 **任何 AI 工具**（Cursor、Claude Code、Gemini CLI）進行 **專業級軟體開發**。

```
🎯 核心理念：一套工作流程 × 三種 AI 工具 = 無縫協作體驗
```

### 🧠 核心概念圖解

```
你的專案
    │
    ├── 🤖 .ai/           ← 統一大腦（所有 AI 工具的共同配置）
    │   ├── config.yaml   ← 主控制台
    │   ├── commands/     ← 指令庫（6個階段命令）
    │   ├── rules/        ← 開發規則
    │   └── adapters/     ← 各工具的翻譯器
    │
    ├── 📚 memory-bank/   ← 共享記憶（專案狀態與進度）
    │   ├── tasks.md      ← 任務清單
    │   ├── progress.md   ← 進度追蹤
    │   └── ...
    │
    └── 🔧 工具配置檔案   ← 自動生成給各 AI 工具使用
        ├── .cursorrules  ← Cursor 的設定檔
        ├── CLAUDE.md     ← Claude Code 的設定檔
        └── GEMINI.md     ← Gemini CLI 的設定檔
```

### ⚡ 30 秒快速上手

```bash
# 1️⃣ 複製專案模板
git clone [this-repo]
cd ai-agentic-coding-template_unified

# 2️⃣ 一鍵設置（選擇你常用的 AI 工具）
npm run setup

# 3️⃣ 開始使用（所有工具使用相同指令）
/van      # 不論你用 Cursor、Claude Code 還是 Gemini CLI
```

---

## Core Concept

```
                    .ai/ (Source of Truth)
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
      .cursorrules     CLAUDE.md       GEMINI.md
      .cursor/         .claude/        .gemini/
           │               │               │
           ▼               ▼               ▼
        Cursor        Claude Code     Gemini CLI
```

**One Configuration, Multiple AI Tools** - 所有 AI 工具從 `.ai/` 讀取統一配置，自動同步到各工具特定格式。

---

## Universal Commands

### Workflow Commands (Phase Sequence)

```
/van → /plan → /creative → /implement → /reflect → /archive
```

| Command | Description | Cursor | Claude Code | Gemini CLI |
|---------|-------------|--------|-------------|------------|
| `/van` | 初始化專案 | `/van` | `/van` | `/van` |
| `/plan` | 規劃任務 | `/plan` | `/plan` | `/plan` |
| `/creative` | 設計架構 | `/creative` | `/creative` | `/creative` |
| `/implement` | 程式實作 | `/implement` | `/implement` | `/implement` |
| `/reflect` | 回顧總結 | `/reflect` | `/reflect` | `/reflect` |
| `/archive` | 文件歸檔 | `/archive` | `/archive` | `/archive` |

### Utility Commands

| Command | Description | Function |
|---------|-------------|----------|
| `/task-init` | 創建 Epic | Convert user ideas into structured epic tasks |
| `/task-next` | PM 建議 | Analyze tasks and suggest next priority |
| `/debug` | 除錯模式 | Systematic debugging with hypothesis testing |
| `/review-code` | 代碼審查 | Comprehensive code review |
| `/write-tests` | 測試撰寫 | Test strategy and implementation |

### System Commands

| Command | Description | Function |
|---------|-------------|----------|
| `/commit` | Git 提交 | Generate high-quality commit message |
| `/resume` | 恢復上下文 | Resume context from Memory Bank |
| `/github` | 快速推送 | Stage, commit, and push to GitHub |

---

## Project Structure

```
project/
├── .ai/                              # Source of Truth (統一配置)
│   ├── config.yaml                   # 主配置檔案 (v2.0)
│   ├── commands/
│   │   ├── workflow/                 # 工作流命令 (6)
│   │   │   ├── van.md
│   │   │   ├── plan.md
│   │   │   ├── creative.md
│   │   │   ├── implement.md
│   │   │   ├── reflect.md
│   │   │   └── archive.md
│   │   ├── utility/                  # 工具命令 (5)
│   │   │   ├── task-init.md
│   │   │   ├── task-next.md
│   │   │   ├── debug.md
│   │   │   ├── review-code.md
│   │   │   └── write-tests.md
│   │   └── system/                   # 系統命令 (2)
│   │       ├── commit.md
│   │       └── resume.md
│   ├── rules/
│   │   ├── principles/               # 核心原則
│   │   │   ├── global.md
│   │   │   └── ai-behavior.md
│   │   ├── process/                  # 流程規則
│   │   │   └── git-workflow.md
│   │   ├── testing/                  # 測試規則
│   │   │   └── overview.md
│   │   ├── frontend.md
│   │   └── backend.md
│   ├── skills/                       # 自動觸發能力
│   │   └── repo-guard/SKILL.md
│   ├── agents/                       # 子代理
│   │   ├── test-runner.md
│   │   └── code-reviewer.md
│   ├── output-styles/                # 輸出風格
│   │   ├── spec-writer.md
│   │   └── concise.md
│   ├── hooks/                        # 安全鉤子
│   │   ├── deny-dangerous-bash.py
│   │   └── forbid-write-main.py
│   └── adapters/                     # 工具適配器
│       ├── cursor/
│       ├── claude-code/
│       └── gemini-cli/
│
├── .cursorrules                      # Cursor 主配置 (generated)
├── .cursor/                          # Cursor 專用目錄 (generated)
│
├── CLAUDE.md                         # Claude Code 主配置 (generated)
├── .claude/                          # Claude Code 專用目錄 (generated)
│   ├── commands/
│   ├── skills/
│   ├── agents/
│   ├── output-styles/
│   └── settings.json
│
├── GEMINI.md                         # Gemini CLI 主配置 (generated)
├── .gemini/                          # Gemini CLI 專用目錄
│
├── memory-bank/                      # 共享記憶庫
│   ├── tasks.md                      # 任務清單 (Source of Truth)
│   ├── activeContext.md              # 當前焦點
│   ├── progress.md                   # 進度追蹤
│   ├── projectbrief.md               # 專案概述
│   └── techContext.md                # 技術背景
│
└── scripts/
    └── sync-ai-config.js             # 同步腳本
```

---

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/your-username/ai-agentic-coding-template_unified.git
cd ai-agentic-coding-template_unified
npm install
```

### 2. Interactive Setup (Recommended)

```bash
npm run setup
```

This will guide you through:
- Selecting AI tool(s): Cursor / Claude Code / Gemini CLI / All
- Choosing workflow mode: Full / Minimal / Custom
- Setting project type

### 3. Start Development

```bash
# 所有工具使用相同指令
/van
```

### Alternative: Manual Setup

```bash
# 同步所有工具
npm run ai-sync

# 或僅同步特定工具
npm run ai-sync:cursor
npm run ai-sync:claude
npm run ai-sync:gemini

# 驗證設置
npm run ai-verify
```

---

## Feature Comparison by Tool

| Feature | Cursor | Claude Code | Gemini CLI |
|---------|--------|-------------|------------|
| Slash Commands | Yes (.md) | Yes (.md) | Yes (.toml) |
| Memory Bank | Yes | Yes | Yes |
| Rules | Yes | Yes | Yes (GEMINI.md) |
| Skills (Auto-trigger) | - | Yes | - |
| Agents (Subagents) | - | Yes | - |
| Output Styles | - | Yes | settings.json |
| Hooks (Safety) | - | Yes | - |
| MCP Servers | - | Yes | Yes |
| IDE Integration | Full | Terminal | Terminal |

---

## Claude Code Advanced Features

Claude Code 支援最完整的功能集：

### Skills (自動觸發能力)

```
.claude/skills/
└── repo-guard/SKILL.md    # 自動防護危險操作
```

**repo-guard** 會自動：
- 阻止危險的 bash 命令
- 防止提交敏感資料
- 禁止在 main 分支直接寫入

### Agents (子代理)

```
.claude/agents/
├── test-runner.md         # 自動執行測試並修復
└── code-reviewer.md       # 全面代碼審查
```

使用方式：AI 會根據上下文自動調用適當的 agent。

### Output Styles (輸出風格)

```
.claude/output-styles/
├── spec-writer.md         # PRD/SDD 文件格式
└── concise.md             # 簡潔直接回應
```

### Hooks (安全鉤子)

```json
// .claude/settings.json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Bash", "hooks": [...] },
      { "matcher": "Write|Edit", "hooks": [...] }
    ]
  }
}
```

---

## Configuration Details

### .ai/config.yaml

```yaml
# Universal AI Copilot Configuration
version: "2.0"
name: "Universal AI Workflow"

supported_tools:
  - cursor
  - claude-code
  - gemini-cli

paths:
  memory_bank: "./memory-bank"
  commands: "./.ai/commands"
  rules: "./.ai/rules"
  skills: "./.ai/skills"
  agents: "./.ai/agents"

workflow:
  phases: ["van", "plan", "creative", "implement", "reflect", "archive"]
  memory_bank_required: true

security:
  protected_branches: ["main", "master", "production"]
  dangerous_patterns: ["rm -rf /", "mkfs.", "dd if="]
```

---

## NPM Scripts

| Script | Description |
|--------|-------------|
| `npm run setup` | 互動式設置 (推薦，包含初始化) |
| `npm run publish` | 首次發布到 GitHub (初始化 repo) |
| `npm run ai-sync` | 同步所有工具配置 |
| `npm run ai-sync:cursor` | 僅同步 Cursor |
| `npm run ai-sync:claude` | 僅同步 Claude Code |
| `npm run ai-sync:gemini` | 僅同步 Gemini CLI |
| `npm run ai-verify` | 驗證設置完整性 |

> **Note:** `/github` 指令用於日常提交推送，`npm run publish` 用於首次發布專案到 GitHub。

---

## 📖 工作流程完整指南

### 🎯 六階段開發流程（為什麼這樣設計？）

```
🚀 VAN → 📋 PLAN → 🎨 CREATIVE → 🔨 IMPLEMENT → 🪞 REFLECT → 📦 ARCHIVE
```

這個流程設計來自於 **軟體工程最佳實踐**，確保每個階段都有明確目標和產出。

### 🔄 詳細階段說明

#### 🚀 Phase 1: VAN (初始化)
> **為什麼需要？** 就像蓋房子要先打地基，AI 協作也需要建立穩固的記憶結構

**核心任務**:
```
✅ 建立 Memory Bank（專案的共享大腦）
✅ 驗證工具配置（確保 AI 能正確理解專案）
✅ 初始化專案上下文（讓 AI 知道你在做什麼）
```

**對初學者的意義**: 這一步確保無論你用哪個 AI 工具，都能「記住」專案的全貌。

#### 📋 Phase 2: PLAN (規劃)
> **為什麼重要？** 避免「寫到一半才發現方向錯誤」的常見問題

**輸入與輸出**:
```
📝 輸入: "我想做一個部落格網站"
📊 輸出: 詳細的任務分解 (WBS) + 優先級排序
```

**AI 在這階段做什麼**:
- 將模糊想法轉換為具體任務
- 識別技術需求和依賴關係
- 估算開發時間和難度

#### 🎨 Phase 3: CREATIVE (設計)
> **為什麼分開設計和實作？** 先想清楚再動手，避免重複返工

**設計內容**:
```
🏗️ 系統架構（整體結構）
🎨 UI/UX 設計（使用者體驗）
📊 資料庫設計（資料結構）
🔧 技術選型（用什麼工具）
```

**對初學者的價值**: AI 會教你「為什麼這樣設計」，而不只是「怎麼做」。

#### 🔨 Phase 4: IMPLEMENT (實作)
> **真正寫程式的階段** - 但有了前面的準備，這階段會異常順利

**實作流程**:
```
📝 依照設計文件編寫程式碼
🧪 撰寫測試確保品質
📈 更新進度追蹤
🔧 處理實作中的技術問題
```

**AI 協助內容**: 程式碼生成、除錯建議、最佳實踐指導。

#### 🪞 Phase 5: REFLECT (回顧)
> **學習階段** - 從成功和錯誤中提取知識

**回顧重點**:
```
✅ 什麼做得好？（最佳實踐記錄）
❌ 遇到什麼問題？（避免重複錯誤）
🎯 下次如何改進？（持續改進）
💡 學到什麼新技術？（知識累積）
```

#### 📦 Phase 6: ARCHIVE (歸檔)
> **知識保存** - 讓這次的經驗變成下次的優勢

**歸檔內容**:
```
📚 技術文件整理
🏆 專案成果展示
📝 開發日誌歸檔
💎 最佳實踐提煉
```

### 🤔 為什麼要這樣分階段？

1. **降低認知負擔**: 每次只專注一個目標
2. **提高成功率**: 有計畫的開發比無頭蒼蠅效率高 10 倍
3. **累積經驗**: 每個專案都為下個專案打基礎
4. **團隊協作**: 清晰的階段讓團隊協作更順暢

### 📱 實際使用範例

```bash
# 📝 場景：我想做一個待辦事項 App

# 🚀 第一步：初始化
/van
# AI 會建立專案記憶結構，準備協作環境

# 📋 第二步：規劃
/plan "我想做一個簡單的待辦事項 App，有新增、刪除、標記完成功能"
# AI 會分解為具體任務：設計UI、建立資料庫、實作功能等

# 🎨 第三步：設計
/creative
# AI 會設計系統架構、選擇技術框架、設計資料結構

# 🔨 第四步：實作
/implement
# AI 會根據設計逐步實作功能，撰寫測試

# 🪞 第五步：回顧
/reflect
# AI 會總結開發過程，記錄學習重點和改進建議

# 📦 第六步：歸檔
/archive
# AI 會整理專案文件，為未來參考做準備
```

---

## 🏗️ SA 架構完整解析（Software Architecture）

### 🎯 整體架構設計原則

這個專案採用 **分層式架構 + 適配器模式**，確保：
1. **統一性**: 所有 AI 工具使用相同的工作流程
2. **擴展性**: 容易添加新的 AI 工具支援
3. **維護性**: 配置變更時自動同步到所有工具

```
🔄 統一架構流程圖
┌─────────────────────────────────────────────────────────────┐
│                     📱 用戶體驗層                              │
│  Cursor IDE    │   Claude Code    │   Gemini CLI              │
│  /van          │   Initialize     │   /van                    │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                     🔌 適配器層                               │
│  Cursor 適配器  │  Claude 適配器   │  Gemini 適配器           │
│  轉換為 .rules  │  生成 CLAUDE.md  │  生成 GEMINI.md        │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                     🧠 核心配置層                             │
│              .ai/config.yaml (Single Source of Truth)       │
│           commands/ │ rules/ │ skills/ │ agents/             │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                     📚 數據持久層                             │
│                    Memory Bank 共享記憶庫                     │
│        tasks.md │ progress.md │ activeContext.md             │
└─────────────────────────────────────────────────────────────┘
```

### 📁 架構目錄結構詳解

#### 🤖 `.ai/` - 統一配置中心
> **作用**: 所有 AI 工具的「統一大腦」，定義通用規則和流程

```
.ai/
├── config.yaml              # 🎛️ 主配置 - 定義支援的工具、路徑、安全規則
├── commands/                 # ⚔️ 命令庫
│   ├── workflow/            # 📋 六階段工作流程命令
│   │   ├── van.md           # 🚀 初始化命令
│   │   ├── plan.md          # 📋 規劃命令
│   │   ├── creative.md      # 🎨 設計命令
│   │   ├── implement.md     # 🔨 實作命令
│   │   ├── reflect.md       # 🪞 回顧命令
│   │   └── archive.md       # 📦 歸檔命令
│   ├── utility/             # 🛠️ 輔助工具命令
│   └── system/              # ⚙️ 系統級命令
├── rules/                   # 📏 開發規則庫
│   ├── principles/          # 💎 核心原則
│   ├── process/             # 📋 流程規則
│   ├── testing/             # 🧪 測試規則
│   ├── frontend.md          # 🎨 前端開發規則
│   └── backend.md           # ⚙️ 後端開發規則
├── skills/                  # 🎯 自動觸發技能（Claude Code 專用）
├── agents/                  # 🤖 子代理（Claude Code 專用）
├── output-styles/           # 🎨 輸出風格（Claude Code 專用）
├── hooks/                   # 🔐 安全鉤子（Claude Code 專用）
└── adapters/                # 🔌 工具適配器
    ├── cursor/              # Cursor 專用適配邏輯
    ├── claude-code/         # Claude Code 專用適配邏輯
    └── gemini-cli/          # Gemini CLI 專用適配邏輯
```

#### 📚 `memory-bank/` - 共享記憶中心
> **作用**: 所有 AI 工具的「共享大腦」，儲存專案狀態和進度

```
memory-bank/
├── tasks.md                 # 📋 任務清單 - 專案的 TODO List
├── activeContext.md         # 🎯 當前焦點 - 現在在做什麼？
├── projectbrief.md          # 📄 專案概述 - 專案的基本資訊
├── techContext.md           # 🔧 技術背景 - 使用的技術棧、架構決策
├── progress.md              # 📈 進度追蹤 - 各階段完成情況
├── creative-*.md            # 🎨 設計文件 - 各階段的設計產出
└── runbook.md              # 📚 操作手冊 - 如何運行這個專案
```

#### 🔧 工具配置檔案（自動生成）
> **作用**: 各 AI 工具的專用配置檔案，由適配器自動生成

```
├── .cursorrules             # Cursor 的主要配置檔案
├── .cursor/                 # Cursor 的專用目錄
├── CLAUDE.md               # Claude Code 的主要配置檔案
├── .claude/                # Claude Code 的專用目錄
├── GEMINI.md               # Gemini CLI 的主要配置檔案
└── .gemini/                # Gemini CLI 的專用目錄
```

### 🔄 架構運作流程

#### 1️⃣ 配置同步流程
```
用戶執行: npm run ai-sync
     ↓
讀取 .ai/config.yaml（統一配置）
     ↓
調用各工具適配器 (adapters/*.js)
     ↓
生成工具專用配置檔案
     ↓
工具可以正確讀取配置開始工作
```

#### 2️⃣ 工作流程執行流程
```
用戶在任何 AI 工具執行: /van（或等效命令）
     ↓
AI 工具讀取自己的配置檔案
     ↓
執行對應的工作流程步驟
     ↓
更新 Memory Bank 中的共享狀態
     ↓
其他 AI 工具可以看到最新狀態繼續工作
```

#### 3️⃣ 跨工具協作流程
```
Alice 用 Cursor: /plan（規劃任務）
     ↓ 更新 memory-bank/tasks.md
Bob 用 Claude Code: "繼續設計階段"（AI 讀取 tasks.md）
     ↓ 更新 memory-bank/creative-design.md
Charlie 用 Gemini CLI: /implement（開始實作）
```

### 🧩 核心設計模式

#### 1. 適配器模式 (Adapter Pattern)
**問題**: 不同 AI 工具有不同的配置格式
**解決**: 建立適配器將統一配置轉換為各工具專用格式

```javascript
// 範例：Cursor 適配器
function generateCursorRules(universalConfig) {
  return `
# Cursor Rules (Generated from .ai/config.yaml)
${universalConfig.rules.global}
${universalConfig.commands.workflow.map(cmd => `/${cmd}`).join('\n')}
  `;
}
```

#### 2. 單一真相來源 (Single Source of Truth)
**原則**: 所有配置都從 `.ai/config.yaml` 產生
**好處**:
- 修改一個地方，所有工具自動同步
- 避免配置衝突和不一致
- 易於版本控制和團隊協作

#### 3. 分層架構 (Layered Architecture)
```
🎨 表現層: 各 AI 工具的用戶介面
🔌 適配層: 工具特定的適配邏輯
🧠 業務層: 統一的工作流程和規則
📚 數據層: Memory Bank 共享狀態
```

### 🔐 安全性架構

#### 安全防護機制
```yaml
# .ai/config.yaml 中的安全設定
security:
  protected_branches: ["main", "master"]     # 保護重要分支
  dangerous_patterns: ["rm -rf /", "mkfs"]   # 阻擋危險命令
  secret_patterns: [".env", "*.key"]         # 防止洩漏敏感檔案
```

#### Claude Code 專用安全功能
```
🔐 Hooks: 在執行危險操作前進行檢查
🛡️ Skills: 自動觸發的保護機制
🤖 Agents: 專門負責安全審查的子代理
```

### 🚀 擴展性設計

#### 新增 AI 工具支援
```bash
# 1. 建立適配器目錄
mkdir .ai/adapters/new-ai-tool/

# 2. 實作適配器邏輯
touch .ai/adapters/new-ai-tool/generator.js

# 3. 更新主配置
# 在 .ai/config.yaml 中添加新工具

# 4. 更新同步腳本
# 在 scripts/sync-ai-config.js 中添加新工具處理
```

#### 自定義工作流程階段
```yaml
# .ai/config.yaml
workflow:
  phases:
    - van
    - plan
    - creative
    - implement
    - test        # 新增測試階段
    - deploy      # 新增部署階段
    - reflect
    - archive
```

### 💡 架構優勢總結

1. **🔄 工具無關性**: 一套流程適用所有 AI 工具
2. **📈 可擴展性**: 容易添加新工具、新功能
3. **🛡️ 一致性保證**: 統一配置避免設定衝突
4. **👥 團隊友好**: 共享 Memory Bank 支援多人協作
5. **🔐 安全性**: 多層安全防護機制
6. **📚 知識累積**: Memory Bank 保存專案知識避免流失

這個架構就像一個「翻譯中心」，讓不同語言的 AI 工具都能理解同一套工作流程，並且共享專案記憶！

---

## Team Collaboration

### Multi-Tool Workflow

```bash
# Alice (Cursor) - 初始化和規劃
/van
/plan

# Bob (Claude Code) - 設計
/creative

# Charlie (Gemini CLI) - 實作
/implement

# 全員回顧 - 所有工具使用相同指令
/reflect
```

### Memory Bank 是團隊的共享狀態

```
memory-bank/
├── tasks.md          ← 所有人看同一份任務清單
├── activeContext.md  ← 當前焦點同步
└── progress.md       ← 進度即時更新
```

---

## Best Practices

### Do

- 遵循工作流程順序：`van → plan → creative → implement → reflect → archive`
- 每完成重要工作就更新 Memory Bank
- 配置變更後執行 `npm run ai-sync`
- 使用 `/commit` 生成規範的提交訊息

### Don't

- 跳過 Memory Bank 驗證
- 在工作流程外手動修改 Memory Bank
- 忽略階段前置條件
- 直接在 main 分支提交（讓 repo-guard 保護你）

---

## Troubleshooting

### Memory Bank 遺失

```bash
# 重新執行設置以重建基礎
npm run setup
```

### 配置不同步

```bash
npm run ai-sync
```

### 驗證設置

```bash
npm run ai-verify
```

---

## Adding New AI Tool Support

1. 在 `.ai/adapters/` 建立新目錄
2. 實作 `generator.js` 適配器
3. 更新 `.ai/config.yaml`
4. 更新 `scripts/sync-ai-config.js`
5. 提交 PR

---

## Related Resources

- [Detailed Workflow Guide](AI_WORKFLOW.md)
- [Architecture Design](docs/unified-ai-copilot-architecture.md)
- [Claude Code Settings Guide](docs/claude_code_setting.md)

---

## License

MIT License - See [LICENSE](LICENSE) for details.

---

## Acknowledgments

- Cursor's slash commands design
- Claude Code's comprehensive tooling (skills, agents, hooks)
- Gemini CLI's command-line integration
- Memory Bank concept for AI context persistence

---

**Start your AI collaboration journey:**

```bash
npm install && npm run ai-sync
```

> *"One configuration to rule them all, one Memory Bank to find them, one workflow to bring them all, and in the AI bind them."*
