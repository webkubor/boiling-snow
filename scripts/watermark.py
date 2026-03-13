#!/usr/bin/env python3
"""给图片加水印标题"""
from PIL import Image, ImageDraw, ImageFont
import sys, os

def add_watermark(input_path, output_path, title="沸腾之雪", subtitle="@司南烛"):
    img = Image.open(input_path).convert("RGBA")
    w, h = img.size

    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # 底部渐变遮罩
    for i in range(h//3):
        alpha = int(180 * i / (h//3))
        draw.rectangle([(0, h - h//3 + i), (w, h - h//3 + i + 1)],
                       fill=(0, 0, 0, alpha))

    # 字体 - 用系统字体
    font_paths = [
        os.path.join(os.path.dirname(__file__), "fonts/汉仪尚巍手书W.ttf"),
        os.path.join(os.path.dirname(__file__), "fonts/江西拙楷2.0.ttf"),
        os.path.join(os.path.dirname(__file__), "fonts/杨任东竹石体-Bold.ttf"),
        "/System/Library/Fonts/STHeiti Light.ttc",
        "/System/Library/Fonts/PingFang.ttc",
    ]
    title_font = None
    sub_font = None
    for fp in font_paths:
        if os.path.exists(fp):
            try:
                title_font = ImageFont.truetype(fp, int(h * 0.07))
                sub_font = ImageFont.truetype(fp, int(h * 0.035))
                break
            except:
                continue
    if not title_font:
        title_font = ImageFont.load_default()
        sub_font = ImageFont.load_default()

    # 主标题位置
    bbox = draw.textbbox((0, 0), title, font=title_font)
    tw = bbox[2] - bbox[0]
    tx = (w - tw) // 2
    ty = h - int(h * 0.22)

    # 描边效果
    for dx in [-2, -1, 0, 1, 2]:
        for dy in [-2, -1, 0, 1, 2]:
            if dx != 0 or dy != 0:
                draw.text((tx+dx, ty+dy), title, font=title_font, fill=(0, 0, 0, 180))
    draw.text((tx, ty), title, font=title_font, fill=(255, 240, 180, 230))

    # 副标题
    bbox2 = draw.textbbox((0, 0), subtitle, font=sub_font)
    sw = bbox2[2] - bbox2[0]
    sx = (w - sw) // 2
    sy = ty + int(h * 0.09)
    draw.text((sx, sy), subtitle, font=sub_font, fill=(200, 200, 200, 180))

    # 合并
    result = Image.alpha_composite(img, overlay).convert("RGB")
    result.save(output_path, quality=92)
    print(f"✅ {os.path.basename(output_path)}")

if __name__ == "__main__":
    # 使用相对路径定位项目根目录
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    scenery_dir = os.path.join(base_dir, "_dashboard/assets/scenery")
    out_dir = os.path.join(base_dir, "_dashboard/assets/scenery_watermarked")
    os.makedirs(out_dir, exist_ok=True)

    for fname in sorted(os.listdir(scenery_dir)):
        if not fname.lower().endswith((".png", ".jpg", ".jpeg")):
            continue
        inp = os.path.join(scenery_dir, fname)
        name, ext = os.path.splitext(fname)
        outp = os.path.join(out_dir, name + "_wm.jpg")
        add_watermark(inp, outp)

    print(f"\n全部完成，输出目录：{out_dir}")
