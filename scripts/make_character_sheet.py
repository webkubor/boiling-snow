#!/usr/bin/env python3
"""
《沸腾之雪》三视图生成工具
流程：分别生成正面/侧面/背面 → PIL 横向拼接 → 存档
用法：
  # python3 scripts/make_character_sheet.py --char gu_qiyue --key <API_KEY>
  # python3 scripts/make_character_sheet.py --char gu_qiyue --key <API_KEY> --front-only  # 只重新生成正面
"""

import argparse
import json
import os
import subprocess
import sys
from pathlib import Path
from PIL import Image

PROJECT_ROOT = Path(__file__).parent.parent
ANCHORS_DIR = PROJECT_ROOT / "references" / "visual_anchors"
CHAR_ANCHORS_DIR = PROJECT_ROOT / "references" / "character_anchors"
COSTUME_DIR = PROJECT_ROOT / "references" / "costume_designs"
OUTPUT_DIR = PROJECT_ROOT / "references" / "character_sheets"
NANOBANANA = Path.home() / "Desktop/skills/nanobanana-plus/mcp-server/dist/index.js"
TEMP_DIR = Path("/tmp/boiling_snow_sheets")

CHAR_NAME_MAP = {
    
    "xiaonan": "小楠",
    "gu_qiyue": "顾栖月",
    "su_mengcheng": "苏梦城",
    "mu_xige": "慕夕歌",
    "ye_jinghong": "夜惊鸿",
    "yan_zhaoling": "燕照绫",
    "wen_xiaowan": "温小婉",
}

# 摄影棚背景 prompt（对标苏梦城三视图风格）
STUDIO_BG = (
    "indoor wuxia photography studio setting, dark stone floor with subtle texture, "
    "soft warm top-down volumetric light beams, dark neutral walls, dim lantern ambient glow"
)

QUALITY = "8K cinematic, 35mm film grain, visible skin pores, realistic fabric texture, no airbrushing, STRICTLY NO TEXT, NO WATERMARK, NO LABELS, NO WRITING anywhere in the image"

VIEW_PROMPTS = {
    "front": "FRONT VIEW: facing camera directly, looking straight ahead, neutral standing pose, full body from top of head to feet",
    "side": "SIDE VIEW: turned exactly 90 degrees showing right profile, looking forward, neutral standing pose, full body from top of head to feet",
    "back": "BACK VIEW: turned completely away from camera, back facing viewer, neutral standing pose, full body from top of head to feet",
}

def load_anchor(char_id: str) -> dict:
    path = ANCHORS_DIR / f"{char_id}.json"
    if not path.exists():
        print(f"❌ 找不到角色锚点: {path}")
        sys.exit(1)
    with open(path) as f:
        return json.load(f)

def get_face_lock(anchor: dict) -> str:
    fa = anchor.get("facial_anchors", {})
    parts = [v for v in fa.values() if v]
    return ", ".join(parts)

def find_base_image(char_id: str) -> Path:
    cn_name = CHAR_NAME_MAP.get(char_id, char_id)
    # 优先找定妆照
    costume_dir = COSTUME_DIR / cn_name
    if costume_dir.exists():
        for name in ["film_official", "official", "wuxia", "concept", "final"]:
            for ext in [".png", ".jpg", ".jpeg"]:
                p = costume_dir / f"{char_id}_{name}{ext}"
                if p.exists(): return p
                # 中文命名
                for f in costume_dir.iterdir():
                    if name in f.name.lower() and f.suffix in [".png", ".jpg", ".jpeg"]:
                        return f
    # 备用
    for ext in [".png", ".jpg", ".jpeg"]:
        p = CHAR_ANCHORS_DIR / f"{cn_name}{ext}"
        if p.exists(): return p
    print(f"❌ 找不到底图")
    sys.exit(1)

def build_view_prompt(anchor: dict, view: str) -> str:
    char_name = anchor.get("character", "")
    face_lock = get_face_lock(anchor)
    costume = anchor.get("film_costume", {})
    view_desc = VIEW_PROMPTS[view]

    return (
        f"[8K CINEMATIC] Character reference of {char_name}. "
        f"[FACE LOCK — DO NOT CHANGE]: {face_lock}. "
        f"[COSTUME — DO NOT CHANGE]: {costume.get('style', 'same costume as reference')}. "
        f"[VIEW]: {view_desc}. "
        f"IMPORTANT: correct human proportions, figure occupies full image height. "
        f"[BACKGROUND]: {STUDIO_BG}. "
        f"[QUALITY]: {QUALITY}."
    )

def run_edit(base_image: Path, prompt: str, output_path: Path, api_key: str) -> bool:
    args_json = json.dumps({"prompt": prompt, "file": str(base_image)})
    cmd = [
        "mcporter", "call",
        "--stdio", f"node {NANOBANANA}",
        "--env", f"NANOBANANA_GEMINI_API_KEY={api_key}",
        "edit_image",
        "--args", args_json
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  ❌ 失败: {result.stderr[-200:]}")
        return False

    # 找生成的文件
    import re
    match = re.search(r'• (.+\.png)', result.stdout)
    if match:
        src = Path(match.group(1).strip())
        if src.exists():
            output_path.parent.mkdir(parents=True, exist_ok=True)
            import shutil
            shutil.copy(src, output_path)
            print(f"  ✅ 存到: {output_path.name}")
            return True
    print(f"  ❌ 找不到输出文件")
    return False

def stitch_views(front: Path, side: Path, back: Path, output: Path, char_name: str):
    """横向拼接三张图"""
    imgs = [Image.open(p).convert("RGB") for p in [front, side, back]]

    # 统一高度
    target_h = max(img.height for img in imgs)
    resized = []
    for img in imgs:
        if img.height != target_h:
            ratio = target_h / img.height
            img = img.resize((int(img.width * ratio), target_h), Image.LANCZOS)
        resized.append(img)

    # 拼接（加4px分隔线）
    sep = 4
    total_w = sum(img.width for img in resized) + sep * 2
    result = Image.new("RGB", (total_w, target_h), (30, 30, 30))

    x = 0
    for i, img in enumerate(resized):
        result.paste(img, (x, 0))
        x += img.width
        if i < 2:
            # 暗色分隔线
            for px in range(sep):
                for py in range(target_h):
                    result.putpixel((x + px, py), (20, 20, 20))
            x += sep

    output.parent.mkdir(parents=True, exist_ok=True)
    result.save(str(output), quality=95)
    print(f"\n✅ 三视图已拼合: {output}")

def main():
    parser = argparse.ArgumentParser(description="《沸腾之雪》三视图生成工具")
    parser.add_argument("--char", required=True, help="角色ID，如 xiaozhu")
    parser.add_argument("--key", default=os.environ.get("NANOBANANA_GEMINI_API_KEY", ""), help="API Key")
    parser.add_argument("--front-only", action="store_true", help="只重新生成正面")
    parser.add_argument("--side-only", action="store_true", help="只重新生成侧面")
    parser.add_argument("--back-only", action="store_true", help="只重新生成背面")
    parser.add_argument("--stitch-only", action="store_true", help="只拼接（已有三张单图）")
    args = parser.parse_args()

    if not args.key:
        print("❌ 需要 API Key，用 --key 传入或设置环境变量")
        sys.exit(1)

    anchor = load_anchor(args.char)
    cn_name = CHAR_NAME_MAP.get(args.char, args.char)
    base_image = find_base_image(args.char)
    print(f"✅ 角色: {anchor.get('character')}")
    print(f"✅ 底图: {base_image.name}")

    TEMP_DIR.mkdir(parents=True, exist_ok=True)
    front_path = TEMP_DIR / f"{args.char}_front.png"
    side_path  = TEMP_DIR / f"{args.char}_side.png"
    back_path  = TEMP_DIR / f"{args.char}_back.png"
    output_path = OUTPUT_DIR / f"{cn_name}.png"

    only_one = args.front_only or args.side_only or args.back_only

    if not args.stitch_only:
        views_to_gen = []
        if not only_one or args.front_only:
            views_to_gen.append(("front", front_path))
        if not only_one or args.side_only:
            views_to_gen.append(("side", side_path))
        if not only_one or args.back_only:
            views_to_gen.append(("back", back_path))

        for view, path in views_to_gen:
            view_cn = {"front":"正面","side":"侧面","back":"背面"}[view]
            print(f"\n🎬 生成{view_cn}...")
            prompt = build_view_prompt(anchor, view)
            run_edit(base_image, prompt, path, args.key)

    # 拼接
    if front_path.exists() and side_path.exists() and back_path.exists():
        print(f"\n🖼️  拼接三视图...")
        stitch_views(front_path, side_path, back_path, output_path, cn_name)
        print(f"📁 存档: references/三视图/{cn_name}.png")
    else:
        missing = [v for v, p in [("front", front_path), ("side", side_path), ("back", back_path)] if not p.exists()]
        print(f"⚠️  缺少视图: {missing}，请先生成")

if __name__ == "__main__":
    main()
