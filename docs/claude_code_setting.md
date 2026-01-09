一句話：**把 AI Copilot 當成「會說話的作業系統」——你先定義「要達成什麼結果」，再用不同層級的機制，把它變成可重複、可控、可擴充的工作流。**

---

## 0) 第一性原理：所有 Copilot IDE 的底層，其實只有 3 件事

1. **語言模型 = 規劃器（Planner）**
   會猜、會推理、會寫，但「不保證每次都做對」。
2. **工具 = 執行器（Executor）**
   讀檔、改檔、跑指令、打 API、查 DB…把抽象變成現實。
3. **約束 = 穩定器（Stabilizer）**
   把「建議」變成「一定會發生」，把「風險」變成「先擋下來再說」。

Claude Code（以及任何 AI Copilot IDE）提供的各種功能，其實都在對應這三件事，只是名字不同。

---

## 1) Claude Code 的「關聯架構」：7 個積木，各自管不同層級

我用「 **你要把什麼寫死** 」來分類（越往下越穩、越不靠運氣）：

### A. 你要它「永遠記得」：Memory / Rules

* `CLAUDE.md` / `.claude/CLAUDE.md`：專案共用記憶（架構、規範、常用流程）
* `.claude/rules/*.md`：更細、可模組化、可分路徑的規則
  Claude Code 會在啟動時自動載入，且有層級優先順序（企業/專案/規則等）。([code.claude.com](https://code.claude.com/docs/en/memory "Manage Claude's memory - Claude Code Docs"))

### B. 你要它「用固定口吻輸出」：Output Styles

* `.claude/output-styles/*.md`：像「可切換的系統提示模板」
* 預設會關掉 Claude Code 內建的工程化提示；需要保留工程化行為要 `keep-coding-instructions: true`。([code.claude.com](https://code.claude.com/docs/en/output-styles "Output styles - Claude Code Docs"))

### C. 你要它「按鈕一按就跑」：Slash Commands

* `.claude/commands/*.md`：把常用提示做成 `/xxx` 指令
* 支援參數 `$ARGUMENTS`、`$1`、`$2`；也能用 `!` 先跑 bash、用 `@file` 引用檔案。([code.claude.com](https://code.claude.com/docs/en/slash-commands "Slash commands - Claude Code Docs"))

### D. 你要它「自己判斷何時該用」：Agent Skills

* `.claude/skills/<skill>/SKILL.md`：Claude 會依 description 自動套用
* Skill 的 YAML metadata 至少要 `name`、`description`；可用 `allowed-tools` 限縮工具；也可 `context: fork` 讓它在分叉上下文跑（不汙染主對話）。([code.claude.com](https://code.claude.com/docs/en/skills "Agent Skills - Claude Code Docs"))

### E. 你要它「分工成不同角色」：Subagents (Agents)

* `.claude/agents/*.md`：子代理，有獨立上下文與可用工具清單
* 也能用 CLI `claude --agents '{...}'` 動態塞 agent。([code.claude.com](https://code.claude.com/docs/en/sub-agents "Subagents - Claude Code Docs"))

### F. 你要它「不管模型怎麼想都一定執行」：Hooks

* 在 `~/.claude/settings.json` 或 `.claude/settings.json` 設定 hook，跑 shell command（或 prompt-based hook）([code.claude.com](https://code.claude.com/docs/en/hooks "Hooks reference - Claude Code Docs"))
* **關鍵：Exit code 2** 會直接阻擋（例如 `PreToolUse` 會 block 工具呼叫），並把 `stderr` 回饋給 Claude。([code.claude.com](https://code.claude.com/docs/en/hooks "Hooks reference - Claude Code Docs"))

### G. 你要它「接外部工具與資料」：MCP

* 透過 MCP server 把 Claude Code 接到你自己的工具/資料源（DB、API、內部系統）。([code.claude.com](https://code.claude.com/docs/zh-TW/mcp?utm_source=chatgpt.com "透過MCP 將Claude Code 連接到工具"))

---

## 2) 把這套泛化到「所有 AI Copilot IDE」：對照表（底層同構）

| 你在解的問題                                       | Claude Code 對應 | 其他 Copilot IDE 常見對應                               |
| -------------------------------------------------- | ---------------- | ------------------------------------------------------- |
| 長期規範/專案背景                                  | Memory / Rules   | Workspace instructions / custom context / repo prompt   |
| 固定輸出格式（PRD、SDD、評論風格）                 | Output Styles    | Persona / response template / formatting profile        |
| 重複提示、一鍵執行                                 | Slash Commands   | Prompt snippets / command palette macros                |
| 需要自動觸發的能力                                 | Skills           | Auto-rules / agents “skills” / context-aware triggers |
| 需要分工角色（reviewer、tester）                   | Subagents        | Multi-agent roles / “modes” / separate agents         |
| 必須 100% 發生的流程（測試、格式化、阻擋危險行為） | Hooks            | pre-commit hooks, CI gates, IDE tasks, policy checks    |
| 接外部系統（DB/API/內部工具）                      | MCP              | Extensions/plugins/tools integration                    |

 **所以你要看透的不是「功能名字」** ，而是：

> 你要的是「記憶、風格、按鈕、自動化、分工、強制、整合」哪一種控制。

---

## 3) 先定義用途，再整合：一個很實用的決策樹

把需求丟進來，照這個分流：

1. **這件事「每次都要做」？**

* 是 →  **Hook** （最穩）
* 否 → 下一題

2. **要不要人手動觸發（可控、可預期）？**

* 要 → **Slash Command**
* 不要 → 下一題

3. **要不要 Claude 自己判斷何時套用？**

* 要 →  **Skill** （description 寫準）
* 不要 → 下一題

4. **是不是需要不同角色/不同工具權限/隔離上下文？**

* 是 → **Subagent**
* 否 → 下一題

5. **只是輸出格式或口吻**

* 是 →  **Output Style** （而不是把一堆格式規範塞在提示裡）

6. **是專案長期知識/規範**

* 是 → **CLAUDE.md / rules**

---

## 4) 最小可用 Starter Kit（你直接複製就能開幹）

### 4.1 建議目錄

```txt
.
├─ CLAUDE.md
└─ .claude/
   ├─ settings.json
   ├─ output-styles/
   │  └─ spec-writer.md
   ├─ commands/
   │  ├─ prd.md
   │  └─ commit.md
   ├─ skills/
   │  └─ repo-guard/
   │     └─ SKILL.md
   ├─ agents/
   │  └─ test-runner.md
   └─ scripts/
      ├─ deny-dangerous-bash.py
      └─ forbid-write-main.py
```

### 4.2 `CLAUDE.md`（專案記憶：短、硬、可執行）

```md
# Project Operating Rules

## North Star
- Prioritize: correctness > safety > maintainability > speed.

## Workflow defaults
- Before editing code: summarize plan + list affected files.
- After editing code: run tests (fast suite first).
- Never commit secrets; never modify production configs without explicit request.

## Repo map (fill these)
- Entry: src/main.py
- Tests: tests/
- Lint: ruff + mypy
```

（你可以把「專案結構、常用指令、不可碰清單」放這裡，因為它會被自動載入並跨 session 記住。）([code.claude.com](https://code.claude.com/docs/en/memory "Manage Claude's memory - Claude Code Docs"))

### 4.3 Output Style：`.claude/output-styles/spec-writer.md`

```md
---
name: Spec Writer (PRD/SDD)
description: 用產品/工程文件口吻輸出：先結論、再架構、再驗收與邊界。
keep-coding-instructions: true
---

# Output rules
- 先給一句話結論（口語）
- 再用 Markdown 分層：背景→目標→非目標→需求→驗收→風險→Open Questions
- 需求用 MUST/SHOULD/MAY
- 有資料/假設要標註（Assumption）
```

（Output style 是「系統提示級」的風格開關。）([code.claude.com](https://code.claude.com/docs/en/output-styles "Output styles - Claude Code Docs"))

### 4.4 Slash Command：`.claude/commands/commit.md`

```md
---
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git commit:*)
description: 產生一個高品質 commit（含範圍、why、風險）
---

## Context
- status: !`git status`
- diff: !`git diff --staged`
- recent: !`git log --oneline -5`

## Task
根據以上，產生一個 commit message（50 字內 summary + body 說明 why）。
```

（Slash commands 支援 `!` 跑 bash、也能用 `$ARGUMENTS` 接參數，與 `@file` 引用檔案。）([code.claude.com](https://code.claude.com/docs/en/slash-commands "Slash commands - Claude Code Docs"))

### 4.5 Skill：`.claude/skills/repo-guard/SKILL.md`

```md
---
name: repo-guard
description: 在做任何改檔/執行指令前，先檢查風險（機密、破壞性指令、main 分支寫入）。
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash(git:*), Bash(rg:*), Bash(ls:*), Bash(cat:*)
---

# Repo Guard

## Instructions
1) 若偵測到可能是破壞性操作（rm -rf、format disk、wipe），先停下來改成安全替代方案。
2) 若目前在 main/master 分支，禁止直接寫檔或提交，改走 feature branch。
3) 若可能涉及 secrets（.env、keys、tokens），改用 placeholder 並提示使用者自行注入。
```

（Skill 會依 `description` 自動觸發；`allowed-tools` 可把能力鎖小；也能 `context: fork` 做隔離。）([code.claude.com](https://code.claude.com/docs/en/skills "Agent Skills - Claude Code Docs"))

### 4.6 Subagent：`.claude/agents/test-runner.md`

```md
---
name: test-runner
description: Use proactively to run tests after code changes and fix failures.
tools: Read, Grep, Glob, Bash
model: sonnet
---

你是測試自動化專家：看見程式碼變更就主動跑對應測試；失敗就定位、修正、再驗證。
```

（子代理可隔離上下文、限制工具；也能 CLI 動態宣告。）([code.claude.com](https://code.claude.com/docs/en/sub-agents "Subagents - Claude Code Docs"))

### 4.7 Hooks：`.claude/settings.json`（把「建議」變成「強制」）

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "python .claude/scripts/deny-dangerous-bash.py" }
        ]
      },
      {
        "matcher": "Write|Edit",
        "hooks": [
          { "type": "command", "command": "python .claude/scripts/forbid-write-main.py" }
        ]
      }
    ]
  }
}
```

（hooks 的結構與設定位置、matcher 規則都在 settings 檔中定義。）([code.claude.com](https://code.claude.com/docs/en/hooks "Hooks reference - Claude Code Docs"))

`deny-dangerous-bash.py`（關鍵：違規就 `exit(2)`，直接 block）

```python
#!/usr/bin/env python3
import json, sys, re

DANGEROUS = [
    r"\brm\s+-rf\b",
    r"\bmkfs\.",
    r"\bdd\s+if=",
]

data = json.load(sys.stdin)
tool = data.get("tool_name", "")
cmd = (data.get("tool_input") or {}).get("command", "") or ""

if tool != "Bash" or not cmd:
    sys.exit(0)

for pat in DANGEROUS:
    if re.search(pat, cmd):
        print(f"Blocked dangerous command pattern: {pat}\nCommand: {cmd}", file=sys.stderr)
        sys.exit(2)  # blocks PreToolUse for Bash

sys.exit(0)
```

（Exit code 2 在 `PreToolUse` 會 block 工具呼叫，並把 stderr 回饋給 Claude。）([code.claude.com](https://code.claude.com/docs/en/hooks "Hooks reference - Claude Code Docs"))

---

## 5) 心法內化（五歲也懂）

你可以把整套想成「玩具工廠」：

* **CLAUDE.md** ：工廠規章（大家都要照做）
* **Output Style** ：你要的說話方式（像穿制服）
* **Slash Command** ：按鈕（按一下就做同一件事）
* **Skill** ：小老師（看到某種狀況就自己出來幫忙）
* **Subagent** ：分身（派去做專門工作）
* **Hook** ：安全門（不管誰想幹嘛，先過安檢）
* **MCP** ：工廠外包機器（接上別的設備）

---

## 6) 口訣（3 個重點）

1. **先定義用途，再挑機制** （別急著裝插件）
2. **不想靠運氣的，就用 Hook 鎖死**
3. **「按鈕用 Command，自動用 Skill，分工用 Agent，風格用 Output Style」**

---

如果你願意，我可以用你目前最常見的 3 個場景（例如：寫 PRD、批次改碼、Debug log）幫你把上面這套「裁切成你自己的專案版」，讓每個積木都有明確對應的輸入/輸出與放置位置。
