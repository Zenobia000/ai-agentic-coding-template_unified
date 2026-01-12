# ADR-001: Implementing Git Flow Lite (3-Step Workflow)

---

**狀態 (Status):** 已接受 (Accepted)

**決策者 (Deciders):** Gemini AI, User

**日期 (Date):** 2026-01-12

---

## 1. 背景與問題陳述 (Context and Problem Statement)

*   **上下文 (Context):** 專案原本使用單一的 `/github` 指令來同時處理 git add、commit 與 push 操作。
*   **問題陳述 (Problem Statement):** 對於 AI 助手而言，合併「本地提交」與「遠端推送」的操作存在風險，容易導致尚未完成或未經審查的程式碼被意外推送到伺服器。此外，缺乏結構化的分支管理流程。
*   **驅動因素/約束條件 (Drivers / Constraints):**
    *   需要防止 AI 助手意外執行 `git push`。
    *   需要支持「單人模式」(Solo Mode) 與「團隊模式」(Team Mode) 的平滑切換。
    *   需要自動化生成高品質的 PR 說明文檔。

## 2. 考量的選項 (Considered Options)

### 選項一：保留單一 /github 指令並增加確認步驟
*   **描述：** 在執行 push 前增加 AI 的確認詢問。
*   **優點：** 保持操作簡單。
*   **缺點：** 依然無法從根本上解決本地與遠端操作混淆的問題，且流程不夠結構化。

### 選項二：引入 Git Flow Lite (3-Step Workflow)
*   **描述：** 將工作流拆分為 `Start` (分支管理)、`Commit` (本地存檔)、`PR` (同步與推送)。
*   **優點：**
    *   **安全性**：`/commit` 嚴格禁止 push，確保本地 checkpoint 的安全性。
    *   **結構化**：強制使用功能分支，保持 `main` 乾淨。
    *   **自動化**：在推送時自動生成 PR 描述，提升開發效率。
*   **缺點：** 使用者需要學習三個指令而非一個。

---

## 3. 決策 (Decision Outcome)

**最終選擇的方案：** 選項二：引入 Git Flow Lite (3-Step Workflow)。

**選擇理由 (Rationale):**
*   符合 "Safety First" 原則，將本地操作與遠端操作完全解耦。
*   透過 `/start` 指令，AI 可以根據 `develop` 分支是否存在自動偵測「單人」或「團隊」模式，提供更智能的適配。
*   `/pr` 指令整合了 rebase 邏輯，有助於保持線性的 Git 歷史紀錄。

---

## 4. 決策的後果與影響 (Consequences)

*   **正面影響 / 預期收益：**
    *   降低了錯誤推送的風險。
    *   程式碼審查 (PR) 流程更加標準化。
    *   Git 提交紀錄更加整潔 (Conventional Commits)。
*   **負面影響 / 引入的風險：**
    *   開發者需要適應新的指令集。
    *   不再支援一鍵推送 (Add + Commit + Push)，這在極少數緊急情況下可能會稍慢。

## 5. 執行計畫概要 (Implementation Plan Outline)

1.  建立 `.ai/commands/system/` 下的 `start.md`, `commit.md`, `pr.md`。
2.  移除舊有的 `/github` 指令定義。
3.  更新 `docs/workflow/git-workflow.md` 文件。
4.  更新 `scripts/sync-commands.sh` 以同步指令至所有編輯器環境。
5.  在 `memory-bank` 中記錄此項變更。

---
**ADR 審核記錄 (Review History):**

| 日期       | 審核人     | 角色       | 備註/主要問題 |
| :--------- | :--------- | :--------- | :------------ |
| 2026-01-12 | Gemini AI  | AI Assistant | 初始提案與實作 |
| 2026-01-12 | User       | Lead Developer | 通過指令定義審核 |
