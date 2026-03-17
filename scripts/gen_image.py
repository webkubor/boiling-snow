#!/usr/bin/env python3
"""
《沸腾之雪》角色生图工具
用法：
  # python3 scripts/gen_image.py --char gu_qiyue --scene "竹林烟雨，轻纱飘动" --outfit "淡蓝白色轻纱汉服，斜肩设计"
  python3 scripts/gen_image.py --char gu_qiyue --scene "屋檐夜雨，持笛而立" --step costume  （只换服装）
  python3 scripts/gen_image.py --char su_mengcheng --scene "雪原远眺" --ratio 16:9
"""

import argparse
import json
import os
import subprocess
import sys
from pathlib import Path

# 项目根目录
PROJECT_ROOT = Path(__file__).parent.parent
ANCHORS_DIR = PROJECT_ROOT / "references" / "visual_anchors"
CHAR_ANCHORS_DIR = PROJECT_ROOT / "references" / "character_anchors"
OUTPUT_DIR = PROJECT_ROOT / "references" / "costume_designs"
NANOBANANA = Path.home() / "Desktop/skills/nanobanana-plus/mcp-server/dist/index.js"

# PRODUCTION.md 核心禁令（每次生图必须带上）
GLOBAL_NEGATIVE = (
    "NO colored contacts, NO circle lens, NO modern elements, NO armor, "
    "NO subtitles, NO watermarks, NO modern zipper, NO modern buttons, "
    "NO glowing energy effects, NO magical aura, natural skin texture, visible pores"
)

QUALITY_SPEC = (
    "8K Masterpiece, 35mm film grain, Traditional Chinese Wuxia style, "
    "cinematic low-key lighting, high contrast, physically realistic fabric texture"
)

def load_anchor(char_id: str) -> dict:
    path = ANCHORS_DIR / f"{char_id}.json"
    if not path.exists():
        print(f"❌ 找不到角色锚点: {path}")
        sys.exit(1)
    with open(path) as f:
        return json.load(f)

def find_base_image(char_id: str) -> Path | None:
    """找角色底图，优先用 costume_designs 里的古风图（人脸一致性更好）"""
    char_name_map = {
        
        "gu_qiyue": "顾栖月",
        "su_mengcheng": "苏梦城",
        "mu_xige": "慕夕歌",
        "ye_jinghong": "夜惊鸿",
        "yan_zhaoling": "燕照绫",
    }
    cn_name = char_name_map.get(char_id, char_id)

    # 1. 优先：costume_designs 里的古风概念图
    costume_dir = OUTPUT_DIR / cn_name
    if costume_dir.exists():
        # 优先找 wuxia/concept/古风 关键字的图
        for f in sorted(costume_dir.iterdir()):
            if any(k in f.name.lower() for k in ["wuxia", "concept", "古风", "final"]):
                if f.suffix in [".png", ".jpg", ".jpeg"]:
                    return f
        # 找目录下任意图
        for f in sorted(costume_dir.iterdir()):
            if f.suffix in [".png", ".jpg", ".jpeg"] and "现代" not in f.name:
                return f

    # 2. 备用：character_anchors 里的图
    for ext in [".png", ".jpg", ".jpeg"]:
        candidates = [
            CHAR_ANCHORS_DIR / f"{cn_name}{ext}",
            CHAR_ANCHORS_DIR / f"{cn_name}-l{ext}",
            CHAR_ANCHORS_DIR / f"{char_id}{ext}",
        ]
        for p in candidates:
            if p and p.exists():
                return p

    # 3. 模糊搜索
    for f in CHAR_ANCHORS_DIR.iterdir():
        if cn_name in f.name or char_id.lower() in f.name.lower():
            return f
    return None

def build_face_lock(anchor: dict) -> str:
    """从 JSON 构建人脸锁字符串"""
    fa = anchor.get("facial_anchors", {})
    parts = []
    if fa.get("face_shape"): parts.append(fa["face_shape"])
    if fa.get("eyes"):        parts.append(fa["eyes"])
    if fa.get("hair"):        parts.append(fa["hair"])
    if fa.get("skin"):        parts.append(fa["skin"])
    if fa.get("makeup"):      parts.append(fa["makeup"])
    return ", ".join(parts)

def build_prompt(anchor: dict, scene: str, outfit: str = "", step: str = "full") -> str:
    char_name = anchor.get("character", "")
    face_lock = build_face_lock(anchor)
    quality = anchor.get("visual_quality_spec", QUALITY_SPEC)

    if step == "costume":
        # 只换服装，不换背景
        prompt = (
            f"KEEP THE FACE EXACTLY THE SAME. DO NOT CHANGE FACE, EYES, HAIR, EXPRESSION. "
            f"Character: {char_name}. "
            f"Face lock: {face_lock}. "
            f"ONLY change the outfit to: {outfit}. "
            f"Keep original background and pose unchanged. "
            f"{GLOBAL_NEGATIVE}. {quality}."
        )
    elif step == "scene":
        # 只换背景，不换人物
        prompt = (
            f"KEEP THE FACE AND COSTUME EXACTLY THE SAME. DO NOT CHANGE PERSON. "
            f"Character: {char_name}. "
            f"Face lock: {face_lock}. "
            f"ONLY change background to: {scene}. "
            f"{GLOBAL_NEGATIVE}. {quality}."
        )
    else:
        # 完整换装+场景
        outfit_part = f"Wearing: {outfit}. " if outfit else ""
        prompt = (
            f"KEEP THE FACE EXACTLY THE SAME. PRESERVE ALL FACIAL FEATURES. "
            f"Character: {char_name}. "
            f"Face lock: {face_lock}. "
            f"{outfit_part}"
            f"Scene: {scene}. "
            f"{GLOBAL_NEGATIVE}. {quality}."
        )
    return prompt

def run_edit(base_image: Path, prompt: str, output_name: str, ratio: str, api_key: str):
    args_json = json.dumps({
        "prompt": prompt,
        "file": str(base_image),
    })
    cmd = [
        "mcporter", "call",
        "--stdio", f"node {NANOBANANA}",
        "--env", f"NANOBANANA_GEMINI_API_KEY={api_key}",
        "edit_image",
        "--args", args_json
    ]
    print(f"\n🎬 生成中...")
    print(f"📎 底图: {base_image.name}")
    print(f"📝 Prompt 预览: {prompt[:120]}...")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0:
        print("✅ 生成成功！")
        print(result.stdout)
    else:
        print("❌ 生成失败")
        print(result.stderr)

def run_generate(prompt: str, ratio: str, api_key: str):
    """纯文生图（无底图时使用）"""
    args_json = json.dumps({
        "prompt": prompt,
        "model": "imagen-4.0-ultra-generate-001",
        "aspectRatio": ratio,
    })
    cmd = [
        "mcporter", "call",
        "--stdio", f"node {NANOBANANA}",
        "--env", f"NANOBANANA_GEMINI_API_KEY={api_key}",
        "generate_image",
        "--args", args_json
    ]
    print(f"\n🎬 文生图中...")
    print(f"📝 Prompt: {prompt[:120]}...")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0:
        print("✅ 生成成功！")
        print(result.stdout)
    else:
        print("❌ 失败")
        print(result.stderr)

def main():
    parser = argparse.ArgumentParser(description="《沸腾之雪》角色生图工具")
    parser.add_argument("--char", required=True, help="角色ID，如 xiaozhu / gu_qiyue / su_mengcheng")
    parser.add_argument("--scene", default="", help="场景描述（中英文均可）")
    parser.add_argument("--outfit", default="", help="服装描述")
    parser.add_argument("--step", choices=["costume", "scene", "full"], default="full",
                        help="生图步骤：costume=只换服装，scene=只换背景，full=完整换（默认）")
    parser.add_argument("--ratio", default="9:16", help="宽高比，如 9:16 / 16:9 / 1:1（仅文生图有效）")
    parser.add_argument("--no-ref", action="store_true", help="强制文生图，不用底图")
    parser.add_argument("--print-only", action="store_true", help="只打印 prompt，不实际生图")
    parser.add_argument("--key", default=os.environ.get("NANOBANANA_GEMINI_API_KEY", ""), 
                        help="API Key（也可通过环境变量 NANOBANANA_GEMINI_API_KEY 传入）")
    args = parser.parse_args()

    # 加载锚点
    anchor = load_anchor(args.char)
    print(f"✅ 加载角色: {anchor.get('character', args.char)}")

    # 构建 prompt
    prompt = build_prompt(anchor, args.scene, args.outfit, args.step)

    if args.print_only:
        print("\n📋 完整 Prompt：\n")
        print(prompt)
        return

    if not args.key:
        print("❌ 需要 API Key，用 --key 传入或设置环境变量 NANOBANANA_GEMINI_API_KEY")
        sys.exit(1)

    # 找底图
    base_image = None if args.no_ref else find_base_image(args.char)
    
    if base_image:
        print(f"✅ 找到底图: {base_image}")
        run_edit(base_image, prompt, args.char, args.ratio, args.key)
    else:
        print(f"⚠️ 未找到底图，使用文生图模式")
        run_generate(prompt, args.ratio, args.key)

if __name__ == "__main__":
    main()
