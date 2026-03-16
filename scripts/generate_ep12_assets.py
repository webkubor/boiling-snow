#!/usr/bin/env python3
"""
《沸腾之雪》第12集视觉素材批量生成脚本
用法：python3 scripts/generate_ep12_assets.py [场景类型]

场景类型：
  all - 生成所有场景
  western_yan - 只生成西燕铁骑
  southern_chu - 只生成南楚大军  
  refugees - 只生成北荒难民
  gushan - 只生成孤山场景
  characters - 只生成角色特写
"""

import argparse
import json
import os
import subprocess
import sys
import time
from pathlib import Path

# 项目根目录
PROJECT_ROOT = Path(__file__).parent.parent
OUTPUT_DIR = PROJECT_ROOT / "references" / "scenes" / "ep12"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# 创建子目录
(OUTPUT_DIR / "western_yan").mkdir(exist_ok=True)
(OUTPUT_DIR / "southern_chu").mkdir(exist_ok=True)
(OUTPUT_DIR / "northern_wilderness").mkdir(exist_ok=True)
(OUTPUT_DIR / "gushan").mkdir(exist_ok=True)
(OUTPUT_DIR / "characters").mkdir(exist_ok=True)

# 项目标准负面提示词
NEGATIVE_PROMPT = (
    "NO colored contacts, NO circle lens, NO modern elements, NO armor, "
    "NO subtitles, NO watermarks, NO modern zipper, NO modern buttons, "
    "NO glowing energy effects, NO magical aura, natural skin texture, visible pores"
)

# 基础质量参数
QUALITY_SUFFIX = (
    "35mm film aesthetic, grainy texture, high dynamic range, "
    "authentic Han Dynasty style, deep moody shadows, desaturated cinematic tones. "
    "21:9 aspect ratio."
)

def generate_image(prompt: str, output_path: Path, model: str = "gemini-3-pro-image-preview"):
    """调用nanobanana-plus生成图片"""
    try:
        # 检查nanobanana-plus是否安装
        nanobanana_path = Path.home() / "Desktop/skills/nanobanana-plus/mcp-server/dist/index.js"
        if not nanobanana_path.exists():
            print(f"❌ nanobanana-plus未安装，请先安装：{nanobanana_path}")
            return False
            
        # 构建完整prompt
        full_prompt = f"{prompt} {QUALITY_SUFFIX}"
        
        print(f"🎨 生成: {output_path.name}")
        print(f"   Prompt: {prompt[:100]}...")
        
        # 这里需要根据你的实际生成工具调整
        # 暂时使用模拟命令，实际使用时替换为你的生成命令
        cmd = [
            "node", str(nanobanana_path),
            "--prompt", full_prompt,
            "--output", str(output_path),
            "--model", model,
            "--negative", NEGATIVE_PROMPT
        ]
        
        # 模拟生成过程
        print(f"   ⏳ 正在生成（模拟）...")
        time.sleep(2)
        
        # 创建占位文件
        with open(output_path, "w") as f:
            f.write(f"# Placeholder for: {prompt[:50]}\n")
            f.write(f"Generated: {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write(f"Prompt: {prompt}\n")
        
        print(f"   ✅ 已创建: {output_path}")
        return True
        
    except Exception as e:
        print(f"❌ 生成失败: {e}")
        return False

def generate_western_yan_scenes():
    """生成西燕铁骑场景"""
    print("\n" + "="*60)
    print("生成西燕铁骑场景")
    print("="*60)
    
    scenes = [
        {
            "name": "western_yan_cavalry_panorama",
            "prompt": "Epic wide shot: 5000 heavy cavalry of Western Yan at dawn in Gobi desert, black iron armor, blood-red flags with '燕' character, horses with black leather armor, dust rising from hooves, low-angle morning sun casting long shadows, war atmosphere, authentic ancient Chinese cavalry"
        },
        {
            "name": "general_tumen_portrait", 
            "prompt": "Close-up: General Tumen on black warhorse, holding Meteor Hammer, rough face with steel-like beard, black heavy armor with Western Yan insignia, fierce eagle-like eyes, dawn light on face, authentic ancient Chinese general, desert background"
        },
        {
            "name": "cavalry_line_detail",
            "prompt": "Detailed shot: Western Yan cavalry line, iron masks covering faces, only eyes visible, long spears forming forest, horse hooves kicking up yellow sand, morning light reflecting on armor, war preparation scene"
        },
        {
            "name": "cavalry_charging_dynamic",
            "prompt": "Dynamic action shot: Western Yan heavy cavalry charging, horses galloping at full speed, dust cloud behind, flags fluttering violently, low camera angle from ground, sense of speed and power, motion blur effect"
        }
    ]
    
    for scene in scenes:
        output_path = OUTPUT_DIR / "western_yan" / f"{scene['name']}.png"
        generate_image(scene['prompt'], output_path)

def generate_southern_chu_scenes():
    """生成南楚大军场景"""
    print("\n" + "="*60)
    print("生成南楚大军场景")
    print("="*60)
    
    scenes = [
        {
            "name": "yanmen_pass_panorama",
            "prompt": "Epic wide shot: Southern Chu army marching out of Yanmen Pass at dawn, 8000 silver-armored infantry in formation, 500 light cavalry on flanks, dark grey stone walls 30 meters high, heavy gate opening, morning mist lingering, crimson flags with '楚' character, cool silver-grey tones"
        },
        {
            "name": "infantry_phalanx_detail",
            "prompt": "Medium shot: Southern Chu infantry phalanx, front row with giant shields like wall, middle row with long spears like forest, back row archers with full quivers, unified silver armor, synchronized steps kicking up dust, disciplined military formation"
        },
        {
            "name": "imperial_general_portrait",
            "prompt": "Portrait: Southern Chu general on white horse, cold stern face with scar near eye, exquisite but practical armor, crimson cape, calculating gaze, behind him the Yanmen Pass gate, morning mist, authentic ancient Chinese imperial general"
        },
        {
            "name": "army_marching_long_shot",
            "prompt": "Long tracking shot: Southern Chu army marching through mountain pass, silver river of soldiers winding through valley, uniform drumbeat pace, light cavalry scouting ahead, banners flowing in morning breeze, epic scale"
        }
    ]
    
    for scene in scenes:
        output_path = OUTPUT_DIR / "southern_chu" / f"{scene['name']}.png"
        generate_image(scene['prompt'], output_path)

def generate_refugee_scenes():
    """生成北荒难民场景"""
    print("\n" + "="*60)
    print("生成北荒难民场景")
    print("="*60)
    
    scenes = [
        {
            "name": "refugees_fleeing_panorama",
            "prompt": "Northern wilderness border village, refugees fleeing with belongings, old people reluctant to leave ancestral homes, children crying, driving livestock, snowy landscape, distant smoke of approaching armies, desperate atmosphere, cold blue-grey tones"
        },
        {
            "name": "old_man_and_child",
            "prompt": "Emotional shot: old man being carried by younger relative, looking back at ancestral home with tears, child clinging to mother's skirt, confused and scared, simple winter clothing, snow falling, human suffering in war"
        },
        {
            "name": "huiming_helping_refugees",
            "prompt": "Distant shot: Monk Huiming leading group of refugees toward Gushan mountain, snow-covered mountain path, monks assisting elderly and children, peaceful calm amidst chaos, Buddhist robes against white snow, compassionate scene"
        }
    ]
    
    for scene in scenes:
        output_path = OUTPUT_DIR / "northern_wilderness" / f"{scene['name']}.png"
        generate_image(scene['prompt'], output_path)

def generate_gushan_scenes():
    """生成孤山场景"""
    print("\n" + "="*60)
    print("生成孤山场景")
    print("="*60)
    
    scenes = [
        {
            "name": "refugee_camp_at_gushan",
            "prompt": "Gushan mountain foot, hundreds of Northern wilderness refugees gathering, temporary shelters being set up, disciples of Gushan assisting, snow-covered pine trees, mountain mist, desperate but hopeful atmosphere"
        },
        {
            "name": "mu_beige_conflicted",
            "prompt": "Mu Beige standing at Gushan sword pavilion, looking down at refugee camp below, holding 'Ask Heaven' sword, conflicted expression, snow falling on black robes, isolated and burdened leader, moral dilemma moment"
        },
        {
            "name": "mu_xige_caring_for_refugees",
            "prompt": "Mu Xige distributing blankets and food to refugee children, gentle smile, warm interaction, contrast between her youthful innocence and war's cruelty, simple hanfu, snow environment"
        }
    ]
    
    for scene in scenes:
        output_path = OUTPUT_DIR / "gushan" / f"{scene['name']}.png"
        generate_image(scene['prompt'], output_path)

def generate_character_closeups():
    """生成角色特写"""
    print("\n" + "="*60)
    print("生成角色特写")
    print("="*60)
    
    scenes = [
        {
            "name": "gu_qiyue_nightmare_wake",
            "prompt": "Close-up shot of Gu Qiyue's face, waking up from nightmare in dim morning light, cold sweat on forehead, terrified expression, hair slightly messy, wearing simple silk sleeping robe, authentic Han Dynasty style interior, bedside jade flute visible"
        },
        {
            "name": "gu_qiyue_nightmare_flashback",
            "prompt": "Nightmare flashback: Northern wilderness snowstorm, war-torn village, distant cavalry silhouettes, burning houses, refugee children crying, cold blue tones, blurry motion effect, chaotic composition, authentic ancient China war scene"
        }
    ]
    
    for scene in scenes:
        output_path = OUTPUT_DIR / "characters" / f"{scene['name']}.png"
        generate_image(scene['prompt'], output_path)

def main():
    parser = argparse.ArgumentParser(description="生成第12集视觉素材")
    parser.add_argument("scene_type", nargs="?", default="all", 
                       choices=["all", "western_yan", "southern_chu", "refugees", "gushan", "characters"],
                       help="要生成的场景类型")
    
    args = parser.parse_args()
    
    print("🎬 《沸腾之雪》第12集视觉素材生成工具")
    print(f"📁 输出目录: {OUTPUT_DIR}")
    
    # 根据参数生成对应场景
    if args.scene_type == "all" or args.scene_type == "western_yan":
        generate_western_yan_scenes()
    
    if args.scene_type == "all" or args.scene_type == "southern_chu":
        generate_southern_chu_scenes()
    
    if args.scene_type == "all" or args.scene_type == "refugees":
        generate_refugee_scenes()
    
    if args.scene_type == "all" or args.scene_type == "gushan":
        generate_gushan_scenes()
    
    if args.scene_type == "all" or args.scene_type == "characters":
        generate_character_closeups()
    
    print("\n" + "="*60)
    print("✅ 生成完成！")
    print(f"📂 素材已保存到: {OUTPUT_DIR}")
    print("\n目录结构:")
    for root, dirs, files in os.walk(OUTPUT_DIR):
        level = root.replace(str(OUTPUT_DIR), '').count(os.sep)
        indent = ' ' * 2 * level
        print(f"{indent}{os.path.basename(root)}/")
        subindent = ' ' * 2 * (level + 1)
        for file in files[:5]:  # 只显示前5个文件
            print(f"{subindent}{file}")
        if len(files) > 5:
            print(f"{subindent}... 还有 {len(files)-5} 个文件")
    print("="*60)

if __name__ == "__main__":
    main()