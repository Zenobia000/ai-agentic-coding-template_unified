#!/usr/bin/env python3
"""
Template Guidance Hook for LLM
將僵化的規則式模板轉換為靈活的引導式架構
允許 LLM 在保持結構的同時自由創造內容
"""

import yaml
import json
from pathlib import Path
from typing import Dict, List, Any

class TemplateGuide:
    """引導式模板系統 - 提供結構但不限制創意"""

    def __init__(self):
        self.template_dir = Path(__file__).parent.parent / "template" / "guides"
        self.v1_reference = Path.cwd() / "docs" / "archive" / "templates_v1"

    def get_template_guidance(self, command: str) -> Dict[str, Any]:
        """
        獲取模板引導而非填充規則
        返回：
        - essential_structure: 必須包含的核心結構
        - guidance_principles: 引導原則而非固定欄位
        - examples: 參考範例但可自由發揮
        - constraints: 最小約束條件
        """

        guidance = {
            "/van": {
                "purpose": "理解並轉化業務需求",
                "essential_structure": [
                    "專案背景與問題陳述",
                    "核心目標與成功指標",
                    "使用者故事與驗收標準",
                    "範圍定義與約束"
                ],
                "guidance_principles": {
                    "focus": "問題驅動而非解決方案驅動",
                    "clarity": "使用業務語言而非技術術語",
                    "completeness": "涵蓋 Why, What, Who, When",
                    "flexibility": "根據專案特性調整內容深度"
                },
                "freedom_areas": [
                    "故事格式可調整（不一定要 As a...I want...）",
                    "可加入領域特定章節（如合規要求、市場分析）",
                    "圖表和視覺化自由選擇"
                ],
                "minimal_constraints": {
                    "must_have": ["問題陳述", "目標", "範圍"],
                    "format": "Markdown with clear sections",
                    "output": "memory-bank/requirements/"
                }
            },

            "/creative": {
                "purpose": "架構設計與技術願景",
                "essential_structure": [
                    "架構總覽與設計理念",
                    "系統組成與互動關係",
                    "技術選型與理由",
                    "關鍵設計決策"
                ],
                "guidance_principles": {
                    "vision": "展現架構願景而非細節堆砌",
                    "rationale": "每個決策都要有理由",
                    "adaptability": "考慮未來演進路徑",
                    "context": "架構符合業務目標"
                },
                "freedom_areas": [
                    "架構圖表風格（C4, UML, 自定義）",
                    "可選擇性包含 DDD, Clean Architecture 等",
                    "技術棧描述深度根據需要調整",
                    "可加入架構模式、設計模式討論"
                ],
                "minimal_constraints": {
                    "must_have": ["系統架構圖", "技術選型", "設計決策"],
                    "format": "Visual + Narrative",
                    "output": "memory-bank/designs/architecture/"
                }
            },

            "/implement": {
                "purpose": "實作指導與開發藍圖",
                "essential_structure": [
                    "實作階段規劃",
                    "核心模組設計",
                    "介面定義",
                    "測試策略"
                ],
                "guidance_principles": {
                    "pragmatic": "實用導向而非理論完美",
                    "incremental": "漸進式交付價值",
                    "testable": "每個模組都可測試",
                    "maintainable": "考慮長期維護"
                },
                "freedom_areas": [
                    "代碼組織方式自由選擇",
                    "測試框架和策略彈性決定",
                    "可包含或省略詳細代碼範例",
                    "開發順序可根據優先級調整"
                ],
                "minimal_constraints": {
                    "must_have": ["模組劃分", "介面定義", "測試計劃"],
                    "format": "Actionable guide",
                    "output": "memory-bank/implementation/"
                }
            }
        }

        return guidance.get(command, self._default_guidance())

    def _default_guidance(self) -> Dict[str, Any]:
        """預設引導結構"""
        return {
            "purpose": "根據指令目的自由發揮",
            "essential_structure": [
                "目的與背景",
                "核心內容",
                "結論與下一步"
            ],
            "guidance_principles": {
                "clarity": "清晰表達核心觀點",
                "completeness": "涵蓋必要資訊",
                "actionable": "提供可執行建議"
            },
            "freedom_areas": ["格式", "深度", "範例"],
            "minimal_constraints": {
                "must_have": ["核心內容"],
                "format": "Markdown",
                "output": "memory-bank/"
            }
        }

    def create_llm_prompt(self, command: str, context: Dict[str, Any]) -> str:
        """
        為 LLM 創建引導提示而非填充指令
        """
        guidance = self.get_template_guidance(command)

        prompt = f"""
# 任務引導：{command}

## 目的
{guidance['purpose']}

## 核心結構（必須包含但形式自由）
{self._format_list(guidance['essential_structure'])}

## 引導原則（指導思想而非硬性規則）
{self._format_dict(guidance['guidance_principles'])}

## 創作自由區域（可根據專案特性發揮）
{self._format_list(guidance['freedom_areas'])}

## 最小約束（僅這些是強制的）
- 必要元素：{', '.join(guidance['minimal_constraints']['must_have'])}
- 格式：{guidance['minimal_constraints']['format']}
- 輸出位置：{guidance['minimal_constraints']['output']}

## 專案上下文
{json.dumps(context, indent=2, ensure_ascii=False)}

---
請根據以上引導創建文檔。記住：
1. 保持核心結構但形式可自由發揮
2. 根據專案特性調整內容深度和風格
3. 可以創新但要符合目的
4. 專注於價值而非形式
"""
        return prompt

    def _format_list(self, items: List[str]) -> str:
        """格式化列表為 markdown"""
        return '\n'.join(f"- {item}" for item in items)

    def _format_dict(self, items: Dict[str, str]) -> str:
        """格式化字典為 markdown"""
        return '\n'.join(f"- **{k}**: {v}" for k, v in items.items())

    def validate_output(self, command: str, content: str) -> Dict[str, Any]:
        """
        驗證輸出是否符合最小約束
        不檢查固定欄位，只確保核心元素存在
        """
        guidance = self.get_template_guidance(command)
        validation = {
            "valid": True,
            "missing": [],
            "suggestions": []
        }

        # 只檢查必要元素是否以某種形式存在
        for element in guidance['minimal_constraints']['must_have']:
            # 使用模糊匹配而非精確匹配
            if not self._fuzzy_check(content, element):
                validation["valid"] = False
                validation["missing"].append(element)

        # 提供改進建議而非強制要求
        if not validation["valid"]:
            validation["suggestions"].append(
                f"文檔缺少一些核心元素：{', '.join(validation['missing'])}。"
                f"建議補充這些內容，但可用適合專案的方式表達。"
            )

        return validation

    def _fuzzy_check(self, content: str, element: str) -> bool:
        """
        模糊檢查元素是否存在
        不要求特定格式或標題
        """
        # 簡單的關鍵詞檢查，可以更智能
        keywords = element.lower().split()
        content_lower = content.lower()

        # 如果大部分關鍵詞都出現，就認為元素存在
        matches = sum(1 for kw in keywords if kw in content_lower)
        return matches >= len(keywords) * 0.6  # 60% 匹配即可


def main():
    """CLI 介面"""
    import argparse

    parser = argparse.ArgumentParser(description="Template Guidance System")
    parser.add_argument("--command", help="Command to get guidance for")
    parser.add_argument("--prompt", action="store_true", help="Generate LLM prompt")
    parser.add_argument("--validate", help="Validate output file")
    parser.add_argument("--context", help="JSON context for prompt", default="{}")

    args = parser.parse_args()

    guide = TemplateGuide()

    if args.prompt and args.command:
        context = json.loads(args.context)
        prompt = guide.create_llm_prompt(args.command, context)
        print(prompt)

    elif args.validate and args.command:
        with open(args.validate, 'r') as f:
            content = f.read()
        result = guide.validate_output(args.command, content)
        print(json.dumps(result, indent=2, ensure_ascii=False))

    elif args.command:
        guidance = guide.get_template_guidance(args.command)
        print(json.dumps(guidance, indent=2, ensure_ascii=False))

    else:
        parser.print_help()


if __name__ == "__main__":
    main()