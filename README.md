# Universal AI Copilot Template

> **一個架構，三種 AI 工具！統一 Cursor、Claude Code 和 Gemini CLI 的專業開發工作流程**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)
[![AI Tools](https://img.shields.io/badge/AI-Cursor%20%7C%20Claude%20%7C%20Gemini-blue.svg)](#supported-ai-tools)
[![Version](https://img.shields.io/badge/version-2.0-green.svg)](#)

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
git clone https://github.com/your-username/universal-ai-copilot-template.git
cd universal-ai-copilot-template
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
| `npm run setup` | 互動式設置 (推薦) |
| `npm run publish` | 首次發布到 GitHub (初始化 repo) |
| `npm run ai-init` | 初始化專案 |
| `npm run ai-sync` | 同步所有工具配置 |
| `npm run ai-sync:cursor` | 僅同步 Cursor |
| `npm run ai-sync:claude` | 僅同步 Claude Code |
| `npm run ai-sync:gemini` | 僅同步 Gemini CLI |
| `npm run ai-verify` | 驗證設置完整性 |

> **Note:** `/github` 指令用於日常提交推送，`npm run publish` 用於首次發布專案到 GitHub。

---

## Workflow Details

### Phase 1: VAN (初始化)

**目標**: 建立專案記憶庫，確保 AI 協作基礎

```
✅ 檢查 Memory Bank 目錄結構
✅ 驗證核心檔案完整性
✅ 生成工具特定配置
```

### Phase 2: PLAN (規劃)

**目標**: 分解任務，制定開發計畫

```
輸入: 高層次需求描述
輸出: tasks.md 中的 WBS 結構
```

### Phase 3: CREATIVE (設計)

**目標**: 架構設計，技術選型

```
輸入: 規劃階段的任務清單
輸出: 設計決策文件
```

### Phase 4: IMPLEMENT (實作)

**目標**: 編寫程式碼，實現功能

```
輸入: 設計文件、任務清單
輸出: 程式碼、測試、progress.md 更新
```

### Phase 5: REFLECT (回顧)

**目標**: 檢討成果，總結經驗

```
輸入: 實作成果、遇到的問題
輸出: 經驗總結、改進建議
```

### Phase 6: ARCHIVE (歸檔)

**目標**: 整理文件，知識保存

```
輸入: 專案成果、學習記錄
輸出: 歸檔文檔、最佳實踐
```

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
npm run ai-init --force
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
