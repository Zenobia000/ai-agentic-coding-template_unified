一句話先講透：**你把 Gemini CLI（和 Claude Code）都當成「可設定的推理引擎」就好——用 *Context(脈絡)* + *Tools(工具)* + *Policy(規則)* + *Commands(快捷)* 來穩定產出你要的輸出。** ([Google Cloud Documentation][1])

---

## 1) 先定義用途，再決定要怎麼「像 Claude Code 一樣」設定 Gemini CLI

你其實只要先選一個工作模式（用途）：

* **Copilot 模式（你主導）**：只要它「給方案 + 產生 patch」，不自動亂跑工具
* **Agent 模式（它主導）**：允許它用 MCP/內建工具跑調查、修 bug、補測試（ReAct loop） ([Google Cloud Documentation][1])
* **Enterprise / 安全模式（最穩）**：工具白名單 + sandbox + 輸出格式固定（最好加 /plan → /apply 流程）

後面所有設定，都只是把這個「用途」落地。

---

## 2) Claude Code ↔ Gemini CLI 的「對應零件」地圖（看完就通了）

| 你腦中熟的 Claude Code 概念     | Gemini CLI 對應物                | 你該放哪裡                                                            |
| ------------------------ | ----------------------------- | ---------------------------------------------------------------- |
| 專案長期記憶（CLAUDE.md）        | `GEMINI.md`（context file）     | repo 根目錄 + 需要時子資料夾 ([Google Gemini][2])                          |
| 全域偏好 / 行為設定              | `~/.gemini/settings.json`     | 使用者家目錄 ([Google Gemini][3])                                      |
| 專案偏好 / 行為設定              | `.gemini/settings.json`       | 專案根目錄下 `.gemini/` ([Google Gemini][3])                           |
| slash commands（快速指令）     | `.toml` 自訂 slash commands     | `~/.gemini/commands/` 或 `.gemini/commands/` ([Google Cloud][4])  |
| tools / extensions / MCP | Extensions & MCP servers      | `gemini extensions ...` + `mcpServers` 設定 ([Google Codelabs][5]) |
| 輸出風格（output style）       | `GEMINI.md` + `output.format` | `settings.json` + 你自訂 `/style` command ([Google Gemini][3])      |

---

## 3) 你要的「像 Claude Code」的 Gemini CLI 設定：最小可用 SOP

### Step A — 先準備兩個檔案位置（全域 vs 專案）

Gemini CLI 的設定層級與位置是固定邏輯：**system defaults → user → project → env vars → CLI args** ([Google Gemini][3])

* **全域設定**：`~/.gemini/settings.json` ([Google Gemini][3])
* **專案設定**：`<repo>/.gemini/settings.json` ([Google Gemini][3])
* **專案脈絡**：`<repo>/GEMINI.md`（或你想統一名稱也行） ([Google Gemini][2])

> Windows 也支援 system defaults / system settings 的路徑（例如 `C:\ProgramData\gemini-cli\...`），但一般你先管 user + project 就夠了。 ([Google Gemini][3])

---

### Step B — 建一份「跨所有 copilot/IDE 都泛化」的 Context 檔（建議叫 AGENTS.md）

Gemini CLI 預設吃 `GEMINI.md`，但你可以在 `settings.json` 裡改成 **同時支援多個檔名**，讓你一份規則吃遍多工具。 ([Google Gemini][2])

**`~/.gemini/settings.json`（或專案 `.gemini/settings.json`）範例：**

```json
{
  "context": {
    "fileName": ["AGENTS.md", "GEMINI.md"]
  },
  "output": {
    "format": "text"
  }
}
```

（`output.format` 支援 `"text"` / `"json"`）([Google Gemini][3])

然後在 repo 根目錄放一份 `AGENTS.md`（或 GEMINI.md 也行），內容我建議長這樣：

**`AGENTS.md` / `GEMINI.md` 模板（可直接貼）**

```md
# Project Intent
- 這個專案是做什麼的：<一句話>
- 你（Gemini）要扮演的角色：偏 copilot / 偏 agent

# Ground Rules（最重要）
- 預設先 /plan 再動手
- 任何會改檔案/跑指令：先說「你要做什麼、為什麼、風險」
- 不確定就問；不要腦補

# Commands (Build/Test/Run)
- build: <command>
- test: <command>
- lint: <command>

# Output Style（你要的 output style）
- 預設用：條列 + 小段落
- 有步驟就給 checklist
- 有程式就給最小可跑範例
```

---

### Step C — 把「你在 Claude Code 常用的 /command」搬到 Gemini CLI（.toml）

Gemini CLI 的自訂 slash commands 是 **.toml 檔**，支援 `{{args}}`（參數）跟 `!{...}`（把 shell 指令輸出塞進 prompt）。([Google Cloud][4])

* 全域：`~/.gemini/commands/*.toml`
* 專案：`.gemini/commands/*.toml` ([Google Cloud][4])

**例 1：做一個強制「先規劃」的 /plan**
`.gemini/commands/plan.toml`

```toml
prompt = """
你只輸出計畫，不要直接修改檔案。
目標：{{args}}

請給：
1) 你理解的問題
2) Step-by-step plan
3) 風險與回復策略
4) 需要我確認的地方
"""
```

**例 2：做一個 /check 把測試跑完再回報（含 shell output）**
`.gemini/commands/check.toml`

```toml
prompt = """
請執行並解讀輸出，最後用 checklist 回報：
!{npm test}
!{npm run lint}

回報格式：
- ✅ 通過項目
- ❌ 失敗項目（原因 + 建議修法）
"""
```

---

### Step D — Extensions / MCP：把 Gemini CLI 變成「真的會做事」的 agent

Gemini CLI 可以用 Extensions 來裝工作流工具（本質上常是 MCP server），管理指令是 `gemini extensions ...`。([Google Codelabs][5])

常用操作（概念上像你在 Claude Code 裝 MCP/工具）：

* 列出 extensions：`gemini extensions list` ([Google Codelabs][5])
* 安裝 extension（例：從 GitHub）：`gemini extensions install <repo_url>` ([Google Codelabs][5])
* 列出 MCP tools：CLI 內用 `/mcp list`（codelab 範例有示意） ([Google Codelabs][5])

你也可以直接在 `settings.json` 配 `mcpServers`（Google 的文件也用 `~/.gemini/settings.json` 當入口）。([Google Cloud Documentation][6])

---

## 4) 你問的「hook 怎麼辦？」——Gemini CLI 的等價做法

Claude Code 的「hook」你多半拿來做：**前置檢查、保護欄、流程控管**。
在 Gemini CLI 這邊，我會用這三招做等價：

1. **用 `/plan` `/check` 這種自訂 commands 把流程固化**（最像 hook）([Google Cloud][4])
2. **用 `settings.json` 限制工具**（例如排除危險 tool / 強制 sandbox）([Google Gemini][3])
3. **把真正的「不可違反」交給 Git hooks / CI**（因為模型再乖也會失手）

> Gemini CLI 也提供 sandbox/工具相關設定欄位（設定文件裡有 `tools`、`sandbox` 等示例）。([Google Gemini][3])

---

## 5) 進階：如果你想「像系統提示詞那樣」硬控它

Gemini CLI 有 `GEMINI_SYSTEM_MD` 可以用外部 Markdown **整個覆蓋** 系統提示詞（這是「核彈級」的控制法）。文件也提醒：這是 full replacement，不是 merge。([Gemini CLI][7])

你可以先把它當成：

* 平常用 `GEMINI.md/AGENTS.md`（柔性、專案脈絡）
* 只有在它一直亂跑、一直不聽話時，才用 `GEMINI_SYSTEM_MD`（硬性、人格/行為重寫）

---

## 6) 最小建議配置（你照這個抄，馬上就「像 Claude Code」了）

**repo 裡放：**

* `AGENTS.md`（或 `GEMINI.md`）
* `.gemini/settings.json`
* `.gemini/commands/plan.toml`
* `.gemini/commands/check.toml`

**` .gemini/settings.json` 最小範例**

```json
{
  "output": { "format": "text" },
  "context": { "fileName": ["AGENTS.md", "GEMINI.md"] },
  "privacy": { "usageStatisticsEnabled": true }
}
```

（`settings.json` 的層級與路徑、`output.format` 等都在官方設定文件中有定義）([Google Gemini][3])

---

如果你願意我直接幫你「落一套你自己的工作流」，你只要丟我兩樣東西就行（不用多）：

1. 你常用的 repo 類型（Node / Python / monorepo）
2. 你希望它預設是 **copilot** 還是 **agent**（會影響 commands 與工具白名單的設計）

[1]: https://docs.cloud.google.com/gemini/docs/codeassist/gemini-cli "Gemini CLI  |  Gemini for Google Cloud  |  Google Cloud Documentation"
[2]: https://google-gemini.github.io/gemini-cli/docs/cli/gemini-md.html "Provide Context with GEMINI.md Files | gemini-cli"
[3]: https://google-gemini.github.io/gemini-cli/docs/get-started/configuration.html "Gemini CLI Configuration | gemini-cli"
[4]: https://cloud.google.com/blog/topics/developers-practitioners/gemini-cli-custom-slash-commands "Gemini CLI: Custom slash commands | Google Cloud Blog"
[5]: https://codelabs.developers.google.com/getting-started-gemini-cli-extensions "Getting Started with Gemini CLI Extensions  |  Google Codelabs"
[6]: https://docs.cloud.google.com/gemini/docs/codeassist/use-agentic-chat-pair-programmer?utm_source=chatgpt.com "Use the Gemini Code Assist agent mode"
[7]: https://geminicli.com/docs/cli/system-prompt/?utm_source=chatgpt.com "System Prompt Override (GEMINI_SYSTEM_MD) - Gemini CLI"
