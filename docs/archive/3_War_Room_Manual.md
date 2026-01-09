# 戰情室手冊 (運維與生存)

> **哲學**: "「希望」不是一種策略。"
> **焦點**: Day 2 運維、除錯與緊急應變。

## 1. 生命徵象 (監控)
*四大黃金信號*
*   **延遲 (Latency)**: [Dashboard 連結] (閾值: > 500ms)
*   **流量 (Traffic)**: [Dashboard 連結] (正常: 50 rps)
*   **錯誤 (Errors)**: [Dashboard 連結] (閾值: > 1%)
*   **飽和度 (Saturation)**: [Dashboard 連結] (CPU/RAM > 80%)

## 2. 緊急應變手冊 (Runbooks)
### 情境 A: API 高延遲
1. 檢查資料庫 CPU。
2. 檢查 Redis 連線池。
3. 如果 DB 被鎖死，砍掉執行過久的查詢: `SELECT pg_terminate_backend...`

### 情境 B: 支付 Webhook 失敗
1. 檢查 Stripe Dashboard。
2. 從 `dead-letter-queue` 重放失敗的事件。

## 3. 部署與回滾
*   **部署**: `make deploy-prod`
*   **回滾**: `make rollback-prod` (回復到上一個 Docker tag)
*   **設定**: `env.production` (Secrets 放在 Vault/AWS SSM)
