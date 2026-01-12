# 引導式模板系統 v2.0

## 理念轉變：從規則到引導

### v1.0 問題（規則式）
```yaml
問題：
  - 僵化的欄位填充降低創意
  - 每個專案差異被忽視
  - LLM 變成填表機器
  - 形式主義over實用價值
```

### v2.0 解決方案（引導式）
```yaml
特點：
  - 提供思考框架而非固定欄位
  - 根據專案特性自由調整
  - LLM 保持創造性思考
  - 價值導向而非形式導向
```

## 系統架構

```
.ai/template/
├── guides/              # 引導式模板（v2.0）
│   ├── van-guide.md     # 需求理解引導
│   ├── creative-guide.md # 架構設計引導
│   └── implement-guide.md # 實作引導
├── outputs/             # 規則式模板（v1.0，保留相容）
└── README.md           # 快速參考

.ai/hooks/
├── template-guide.py           # LLM 引導生成器
└── template-enforcer-flexible.py # 靈活執行器

.ai/template-mode.yaml  # 模式配置
```

## 使用方式

### 1. 靈活模式（預設）
```bash
# LLM 讀取引導文件，自由創作
export TEMPLATE_MODE=flexible
/creative  # 獲得引導但不受限制
```

### 2. 嚴格模式（相容 v1.0）
```bash
# 使用傳統填充式模板
export TEMPLATE_MODE=strict
/creative  # 必須填充所有欄位
```

### 3. 混合模式
```bash
# 核心欄位必填，其餘自由
export TEMPLATE_MODE=hybrid
/adr  # ADR 保持標準格式但允許擴展
```

## 引導範例

### 傳統模板 v1.0（規則式）
```markdown
## 架構設計
**架構模式**: {{architecture_pattern}}
**主要組件**:
{{#components}}
- {{name}}: {{description}}
{{/components}}
```

### 引導模板 v2.0（引導式）
```markdown
## 架構思考引導

思考這些問題，但不限於此：
- 系統的自然邊界在哪裡？
- 什麼會經常變化？什麼相對穩定？

用適合的方式表達：
- 可以用 C4 Model
- 可以用 DDD
- 可以自創表達方式

核心是讓讀者理解你的設計理念。
```

## 核心差異

| 面向 | v1.0 規則式 | v2.0 引導式 |
|-----|------------|------------|
| **控制** | 高度控制 | 最小約束 |
| **創意** | 受限 | 鼓勵 |
| **一致性** | 強制統一 | 原則一致 |
| **適應性** | 低 | 高 |
| **LLM角色** | 填表者 | 思考者 |

## 實作指南

### For LLM/AI Tools

當執行命令時：
1. 檢查 `template-mode.yaml` 中的模式設定
2. 如果是 `flexible`，載入對應的 guide 文件
3. 使用引導框架思考，而非填充欄位
4. 根據專案特性自由調整內容和形式

### For Developers

配置你的偏好：
```yaml
# .ai/template-mode.yaml
commands:
  /creative:
    mode: "flexible"  # 給我自由！
  /adr:
    mode: "hybrid"    # 保持 ADR 標準格式
```

## 設計原則

### 1. 引導而非限制
- ❌ "必須包含以下所有欄位"
- ✅ "考慮這些面向，選擇相關的"

### 2. 價值優於形式
- ❌ "模板完整度 100%"
- ✅ "解決實際問題"

### 3. 適應而非統一
- ❌ "所有專案用同樣模板"
- ✅ "每個專案找到最適合的表達"

## 遷移策略

### 保持向後相容
- v1.0 模板仍在 `outputs/` 目錄
- 可通過 `TEMPLATE_MODE=strict` 使用
- 團隊可漸進式遷移

### 建議步驟
1. 先在新專案試用 flexible 模式
2. 收集團隊回饋
3. 逐步調整各命令的模式設定
4. 保留真正需要標準化的（如 ADR）

## FAQ

**Q: 會不會太自由導致混亂？**
A: 引導系統仍有最小約束，確保核心要素。重點是避免形式主義。

**Q: 如何確保品質？**
A: 透過 post-command feedback 提供建議，而非強制阻擋。

**Q: 團隊如何統一風格？**
A: 在 `team_preferences` 中設定偏好，但仍保持彈性。

---

**記住：模板應該幫助思考，而不是限制思考。**