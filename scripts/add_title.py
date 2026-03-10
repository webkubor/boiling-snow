#!/usr/bin/env python3
"""给底图加片名+集标题，适合序幕/片头封面"""
from PIL import Image, ImageDraw, ImageFont
import sys, os

def add_title(input_path, output_path,
              title="沸腾之雪",
              subtitle="序",
              font_path=None):

    img = Image.open(input_path).convert("RGBA")
    w, h = img.size

    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # 顶部和底部轻微暗化（压字区域）
    for i in range(h // 6):
        alpha = int(120 * i / (h // 6))
        draw.rectangle([(0, h - h//6 + i), (w, h - h//6 + i + 1)],
                       fill=(0, 0, 0, alpha))

    # 字体
    script_dir = os.path.dirname(__file__)
    font_candidates = [
        font_path,
        os.path.join(script_dir, "fonts/汉仪尚巍手书W.ttf"),
        os.path.join(script_dir, "fonts/江西拙楷2.0.ttf"),
        "/System/Library/Fonts/STHeiti Medium.ttc",
        "/System/Library/Fonts/PingFang.ttc",
    ]

    title_font = None
    sub_font = None
    for fp in font_candidates:
        if fp and os.path.exists(fp):
            try:
                title_font = ImageFont.truetype(fp, int(h * 0.09))
                sub_font = ImageFont.truetype(fp, int(h * 0.05))
                break
            except:
                continue
    if not title_font:
        title_font = ImageFont.load_default()
        sub_font = ImageFont.load_default()

    # 主标题「沸腾之雪」居中偏下
    bbox = draw.textbbox((0, 0), title, font=title_font)
    tw = bbox[2] - bbox[0]
    tx = (w - tw) // 2
    ty = h - int(h * 0.25)

    # 描边
    for dx in [-3, -2, -1, 0, 1, 2, 3]:
        for dy in [-3, -2, -1, 0, 1, 2, 3]:
            if dx != 0 or dy != 0:
                draw.text((tx+dx, ty+dy), title, font=title_font,
                          fill=(0, 0, 0, 160))
    # 金色主文字
    draw.text((tx, ty), title, font=title_font,
              fill=(230, 195, 100, 240))

    # 副标题「序」居中在主标题上方
    if subtitle:
        bbox2 = draw.textbbox((0, 0), subtitle, font=sub_font)
        sw = bbox2[2] - bbox2[0]
        sx = (w - sw) // 2
        sy = ty - int(h * 0.09)
        for dx in [-2, -1, 0, 1, 2]:
            for dy in [-2, -1, 0, 1, 2]:
                if dx != 0 or dy != 0:
                    draw.text((sx+dx, sy+dy), subtitle, font=sub_font,
                              fill=(0, 0, 0, 140))
        draw.text((sx, sy), subtitle, font=sub_font,
                  fill=(200, 185, 155, 220))

    result = Image.alpha_composite(img, overlay).convert("RGB")
    result.save(output_path, quality=95)
    print(f"✅ {os.path.basename(output_path)}")


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--title", default="沸腾之雪")
    parser.add_argument("--subtitle", default="序")
    parser.add_argument("--font", default=None)
    args = parser.parse_args()
    add_title(args.input, args.output, args.title, args.subtitle, args.font)
