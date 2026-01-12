#!/usr/bin/env python3
"""
Flexible Template Enforcer
平衡結構與創意：提供引導而非限制
"""

import os
import json
from pathlib import Path
from datetime import datetime
from typing import Dict, Any, List, Optional

# 專案根目錄
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
GUIDES_DIR = PROJECT_ROOT / ".ai" / "template" / "guides"
MEMORY_BANK = PROJECT_ROOT / "memory-bank"

class FlexibleEnforcer:
    """
    靈活的模板執行器
    - 確保核心結構存在
    - 允許創意發揮
    - 提供引導而非規則
    """

    def __init__(self):
        self.mode = os.environ.get("TEMPLATE_MODE", "flexible")  # flexible | strict
        self.guides_dir = GUIDES_DIR
        self.memory_bank = MEMORY_BANK

    def pre_command_guidance(self, command: str) -> Dict[str, Any]:
        """
        命令執行前的引導（非阻擋）
        """
        # 檢查是否有引導文件
        guide_file = self.guides_dir / f"{command[1:]}-guide.md"

        if guide_file.exists():
            return {
                "status": "guided",
                "message": f"找到引導文件：{guide_file.name}",
                "guidance": self._load_guidance(guide_file),
                "mode": self.mode,
                "action": "proceed"  # 永不阻擋
            }

        # 沒有引導文件也可以繼續
        return {
            "status": "unguided",
            "message": f"無引導文件，自由創作",
            "mode": "creative",
            "action": "proceed"
        }

    def post_command_check(self, command: str, output_files: List[str]) -> Dict[str, Any]:
        """
        命令執行後的檢查（建議性而非強制性）
        """
        feedback = {
            "status": "reviewed",
            "suggestions": [],
            "warnings": [],
            "commendations": []
        }

        # 檢查是否輸出到 memory-bank
        for file_path in output_files:
            if not str(file_path).startswith(str(self.memory_bank)):
                feedback["warnings"].append(
                    f"建議將 {file_path} 保存到 memory-bank 以便追蹤"
                )

        # 檢查文件結構（建議性）
        if output_files:
            structure_feedback = self._check_structure(command, output_files[0])
            feedback["suggestions"].extend(structure_feedback.get("suggestions", []))
            feedback["commendations"].extend(structure_feedback.get("strengths", []))

        # 總是允許通過，只是提供回饋
        feedback["action"] = "proceed"
        feedback["overall"] = self._generate_overall_feedback(feedback)

        return feedback

    def _load_guidance(self, guide_file: Path) -> Dict[str, Any]:
        """載入引導內容"""
        with open(guide_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # 解析 markdown 結構（簡化版）
        sections = {}
        current_section = None
        current_content = []

        for line in content.split('\n'):
            if line.startswith('## '):
                if current_section:
                    sections[current_section] = '\n'.join(current_content)
                current_section = line[3:].strip()
                current_content = []
            elif current_section:
                current_content.append(line)

        if current_section:
            sections[current_section] = '\n'.join(current_content)

        return {
            "type": "guidance",
            "sections": sections,
            "flexibility_level": "high"
        }

    def _check_structure(self, command: str, file_path: str) -> Dict[str, Any]:
        """
        檢查文件結構（非強制性）
        返回建議和表揚
        """
        feedback = {
            "suggestions": [],
            "strengths": []
        }

        if not Path(file_path).exists():
            return feedback

        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # 檢查基本結構元素
        if command == "/creative":
            # 檢查是否包含架構思考
            if "架構" in content or "architecture" in content.lower():
                feedback["strengths"].append("包含架構設計思考 ✓")

            if "決策" in content or "decision" in content.lower():
                feedback["strengths"].append("記錄了設計決策 ✓")

            # 建議（非強制）
            if "trade-off" not in content.lower() and "權衡" not in content:
                feedback["suggestions"].append(
                    "考慮加入架構權衡(trade-offs)的討論，幫助理解設計選擇"
                )

            if not any(marker in content for marker in ["```mermaid", "```plantuml", "diagram"]):
                feedback["suggestions"].append(
                    "視覺化圖表能幫助理解架構，考慮加入架構圖"
                )

        elif command == "/van":
            # 需求分析的檢查
            if "為什麼" in content or "why" in content.lower():
                feedback["strengths"].append("清楚說明了業務動機 ✓")

            if "使用者" in content or "user" in content.lower():
                feedback["strengths"].append("包含使用者視角 ✓")

        return feedback

    def _generate_overall_feedback(self, feedback: Dict[str, Any]) -> str:
        """生成整體回饋訊息"""
        if feedback["commendations"] and not feedback["warnings"]:
            return "🎨 文檔創作良好！" + " ".join(feedback["commendations"])

        if feedback["suggestions"]:
            return "💡 文檔已接受。一些改進建議供參考。"

        return "✅ 文檔已保存。"

    def get_template_prompt(self, command: str) -> str:
        """
        為 LLM 生成引導提示
        強調創意自由和價值導向
        """
        guide_file = self.guides_dir / f"{command[1:]}-guide.md"

        if guide_file.exists():
            with open(guide_file, 'r', encoding='utf-8') as f:
                guide_content = f.read()

            return f"""
# {command} 任務引導

{guide_content}

## 重要提醒
1. 以上是引導而非規則，根據專案需求自由調整
2. 專注於創造價值，而不是符合模板
3. 形式服務於內容，不要本末倒置
4. 鼓勵創新和專案特定的解決方案

請根據專案實際情況，創造最合適的文檔。
"""
        else:
            return f"""
# {command} 自由創作

沒有預設模板限制，請根據以下原則自由創作：

1. **目的明確**：確保文檔服務於專案目標
2. **受眾考量**：為讀者創造價值
3. **結構清晰**：邏輯脈絡易於理解
4. **實用優先**：可執行勝過理論完美

請發揮創意，創造最適合當前專案的文檔。
"""


def main():
    """CLI 介面"""
    import argparse

    parser = argparse.ArgumentParser(description="Flexible Template Enforcer")
    parser.add_argument("--pre-check", help="Pre-command guidance")
    parser.add_argument("--post-check", help="Post-command feedback")
    parser.add_argument("--files", nargs="+", help="Output files")
    parser.add_argument("--prompt", help="Generate LLM prompt for command")

    args = parser.parse_args()

    enforcer = FlexibleEnforcer()

    if args.pre_check:
        result = enforcer.pre_command_guidance(args.pre_check)
        print(json.dumps(result, indent=2, ensure_ascii=False))

    elif args.post_check and args.files:
        result = enforcer.post_command_check(args.post_check, args.files)
        print(json.dumps(result, indent=2, ensure_ascii=False))

    elif args.prompt:
        prompt = enforcer.get_template_prompt(args.prompt)
        print(prompt)

    else:
        parser.print_help()


if __name__ == "__main__":
    main()