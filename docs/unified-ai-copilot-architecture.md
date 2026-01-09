# 🤖 Universal AI Copilot Architecture

> 統一多種 AI Copilot 的工作流程架構（Claude Code, Cursor, Gemini CLI 通用）

## 🎯 設計原則

### 1. AI 工具無關性 (Tool-Agnostic)
- **核心邏輯與 AI 工具解耦**
- **相同的工作流程，不同的觸發方式**
- **統一的配置格式，多種載入方式**

### 2. 漸進式增強 (Progressive Enhancement)
- **基礎：Memory Bank + 核心規則**
- **增強：AI 特定的語法糖和快捷指令**
- **專業：針對特定 AI 的最佳化**

### 3. 一致性體驗 (Consistent Experience)
- **相同的工作階段流程**
- **統一的文件結構**
- **標準化的術語和概念**

---

## 🏗️ 架構概覽

```text
project-root/
├── .ai/                          # 🤖 通用 AI 配置目錄
│   ├── config.yaml              # 📋 主配置檔案
│   ├── rules/                   # 📏 通用規則定義
│   │   ├── global.md           # 🌍 全域規則
│   │   ├── frontend.md         # 🎨 前端規則
│   │   ├── backend.md          # ⚙️ 後端規則
│   │   └── ai.md               # 🤖 AI 特定規則
│   ├── commands/                # ⚔️ 通用命令定義
│   │   ├── van.md              # 🚀 初始化
│   │   ├── plan.md             # 📋 規劃
│   │   ├── creative.md         # 🎨 創意設計
│   │   ├── implement.md        # 🔨 實作
│   │   ├── reflect.md          # 🪞 回顧
│   │   └── archive.md          # 📦 歸檔
│   └── adapters/                # 🔌 AI 工具適配器
│       ├── cursor/             # Cursor 專用配置
│       ├── claude-code/        # Claude Code 專用配置
│       └── gemini-cli/         # Gemini CLI 專用配置
├── memory-bank/                 # 📚 共享記憶庫（保持不變）
│   ├── tasks.md
│   ├── activeContext.md
│   ├── projectbrief.md
│   ├── techContext.md
│   └── progress.md
└── AI_WORKFLOW.md              # 📖 統一工作流程說明
```

---

## 🔄 工作流程統一化

### 核心階段流程
```text
/van → /plan → /creative → /implement → /reflect → /archive
```

### 各 AI 工具的觸發方式

| 階段 | Cursor | Claude Code | Gemini CLI |
|------|--------|-------------|------------|
| 初始化 | `/van` | `/van` | `/van` |
| 規劃 | `/plan` | `/plan` | `/plan` |
| 設計 | `/creative` | `/creative` | `/creative` |
| 實作 | `/implement` | `/implement` | `/implement` |
| 回顧 | `/reflect` | `/reflect` | `/reflect` |
| 歸檔 | `/archive` | `/archive` | `/archive` |

---

## 📋 配置系統設計

### 1. 主配置檔案 (.ai/config.yaml)

```yaml
# Universal AI Copilot Configuration
version: "1.0"
name: "Universal AI Workflow"

# 支援的 AI 工具
supported_tools:
  - cursor
  - claude-code
  - gemini-cli

# 預設設定
defaults:
  memory_bank_path: "./memory-bank"
  rules_path: "./.ai/rules"
  commands_path: "./.ai/commands"

# 工具特定設定
tools:
  cursor:
    config_files: [".cursorrules", ".cursor/"]
    command_prefix: "/"

  claude-code:
    config_files: ["CLAUDE.md"]
    command_prefix: "ai "

  gemini-cli:
    config_files: [".geminirc"]
    command_prefix: "gemini "

# 專案資訊
project:
  name: "My Project"
  type: "web-app"
  tech_stack: ["typescript", "react", "node"]
```

### 2. 通用規則格式 (.ai/rules/*.md)

```markdown
---
name: "Global Rules"
description: "Universal coding standards"
applies_to: ["all"]
tools:
  cursor:
    mode: "alwaysApply"
  claude-code:
    mode: "project_context"
  gemini-cli:
    mode: "system_prompt"
---

# 🌍 Universal Coding Standards

## Core Principles
- Use TypeScript for type safety
- Follow established patterns in the codebase
- Write tests before implementation

## Security Rules
- Never expose sensitive data
- Validate all inputs
- Use proper authentication

## AI Safety
- Validate AI-generated code
- Never trust external input directly
- Implement proper error handling
```

### 3. 通用命令格式 (.ai/commands/*.md)

```markdown
---
name: "VAN - Initialize"
description: "Initialize or verify project memory structure"
phase: "setup"
tools:
  cursor:
    trigger: "/van"
  claude-code:
    trigger: "/van"
    keywords: ["initialize", "setup", "memory bank"]
  gemini-cli:
    trigger: "/van"
---

# 🚀 VAN MODE - Universal Initialization

## Objective
Initialize the Memory Bank structure for consistent AI collaboration across all tools.

## Process
1. **Check Memory Bank Structure**
   - Verify `memory-bank/` directory exists
   - Check core files: `tasks.md`, `activeContext.md`, `projectbrief.md`

2. **Create/Repair Missing Components**
   - Create directory structure if missing
   - Generate template files with proper format

3. **Tool-Specific Setup**
   - Cursor: Generate `.cursorrules` and `.cursor/` structure
   - Claude Code: Update `CLAUDE.md` with project context
   - Gemini CLI: Create `.geminirc` configuration

## Success Criteria
- [ ] Memory Bank structure complete
- [ ] Tool-specific configurations generated
- [ ] All files accessible by chosen AI tool

## Next Steps
Execute `/plan` to begin task breakdown and planning phase.
```

---

## 🔌 適配器系統

### Cursor 適配器 (.ai/adapters/cursor/)

```text
cursor/
├── generator.js         # 生成 .cursorrules 和 .cursor/ 結構
├── rules-mapper.js      # 將通用規則轉換為 Cursor 格式
└── commands-mapper.js   # 將通用命令轉換為 slash commands
```

### Claude Code 適配器 (.ai/adapters/claude-code/)

```text
claude-code/
├── generator.js         # 更新 CLAUDE.md
├── context-builder.js   # 建立專案上下文
└── workflow-mapper.js   # 映射工作流程到自然對話
```

### Gemini CLI 適配器 (.ai/adapters/gemini-cli/)

```text
gemini-cli/
├── generator.js         # 生成 .geminirc
├── prompt-builder.js    # 建立系統提示
└── command-mapper.js    # 映射命令到 CLI 格式
```

---

## 🚀 實現策略

### Phase 1: 架構遷移
1. 建立 `.ai/` 目錄結構
2. 將現有 Cursor 配置轉換為通用格式
3. 保留 Memory Bank 不變

### Phase 2: 適配器開發
1. 實作 Cursor 適配器（向下相容）
2. 實作 Claude Code 適配器
3. 實作 Gemini CLI 適配器

### Phase 3: 工具鏈整合
1. 建立初始化腳本
2. 開發配置同步機制
3. 建立驗證工具

### Phase 4: 文件和範例
1. 更新使用說明
2. 建立最佳實踐指南
3. 提供多工具範例

---

## 📚 使用範例

### 初次設置
```bash
# 1. 初始化通用配置
npm run ai-init

# 2. 選擇主要 AI 工具
? Which AI tool do you primarily use?
  ◉ Cursor
  ◯ Claude Code
  ◯ Gemini CLI

# 3. 自動生成對應配置
✅ Generated .ai/ structure
✅ Generated Cursor-specific configs
✅ Memory Bank ready
```

### 工作流程範例

```bash
# Cursor 用戶
/van                    # 初始化
/plan                   # 規劃任務

# Claude Code 用戶
/van
/plan

# Gemini CLI 用戶
/van
/plan
```

---

## ✨ 核心優勢

1. **工具無關性**: 相同工作流程，不同工具
2. **漸進遷移**: 可以逐步從 Cursor 遷移到其他工具
3. **一致體驗**: 無論使用哪個 AI，都有相同的專業級工作流程
4. **配置共享**: 團隊可以共享 `.ai/` 配置，個人選擇工具
5. **向下相容**: Cursor 用戶無需改變現有習慣

這個架構讓你的「海賊船」可以在不同的海域（AI 工具）中航行，但始終保持相同的船員配置和航海規則！