# 《沸腾之雪》制作工具脚本手册

> 本项目目前有 **5 个成熟工作流**，覆盖从角色造型到内容发布的完整制作链路。

---

## 🗺️ 五大工作流总览

```
工作流 A：角色造型工作流
face anchor JSON → 底图 edit → 定妆照 → character_sheets

工作流 B：场景图发布工作流  
场景图原图 → 加水印 → 小红书发布

工作流 C：分镜脚本工作流
剧情设定 → generate_story SOP → 21:9 连续分镜图

工作流 D：公众号发布工作流
Markdown/HTML → baoyu-post-to-wechat → 草稿箱 → 发布

工作流 E：宣推内容工作流
promotions/*.md → 整理配图 → 各平台分发
```

---

> 所有脚本放在 `scripts/` 目录下，字体放 `scripts/fonts/`

---

## 🎭 工具一览（工作流 A/B 的执行层）

| 脚本 | 功能 | 输入 | 输出 |
|------|------|------|------|
| `gen_image.py` | 角色出图（定妆/三视图） | JSON锚点 + 底图 | 生成图 |
| `watermark.py` | 批量图片加水印 | 场景图目录 | 带水印图 |

---

## 📋 完整制作流程

### Step 1：建立面部锚点 JSON

路径：`references/visual_anchors/{角色ID}.json`

记录角色面部核心特征（脸型、眼型、发型、肤色），用于生图时拼接「人脸锁」，防止脸漂移。

```json
{
  "character": "角色名",
  "facial_anchors": {
    "face_shape": "...",
    "eyes": "...",
    "hair": "...",
    "skin": "..."
  }
}
```

---

### Step 2：出古风造型定妆图

**工具**：`gen_image.py` + `edit_image`（必须有底图）

**底图优先级**：

1. `references/costume_designs/{角色名}/` 里的古风概念图（最稳）
2. `references/character_anchors/{角色名}.png`（现代照→古风会漂移）

**命令**：

```bash
# 只换服装（第一步，保持背景）
python3 scripts/gen_image.py \
  --char gu_qiyue \
  --outfit "黑色修身武侠劲装，领口银线绣边" \
  --step costume \
  --key <API_KEY>

# 只换背景（第二步，用上一步结果）
python3 scripts/gen_image.py \
  --char gu_qiyue \
  --scene "月夜古巷，冷蓝月光，暖灯侧光" \
  --step scene \
  --key <API_KEY>

# 完整换（服装+场景一步到位）
python3 scripts/gen_image.py \
  --char gu_qiyue \
  --outfit "月白色蝉翼纱外罩，内衬银丝织锦" \
  --scene "王府月夜，银月映雪" \
  --key <API_KEY>

# 只看 prompt，不生图
python3 scripts/gen_image.py --char gu_qiyue --scene "雪原" --print-only
```

**支持的角色 ID**：
`gu_qiyue` / `gu_qiyue` / `su_mengcheng` / `mu_xige` / `ye_jinghong` / `yan_zhaoling`

**关键参数**：

- `--step costume`：只换服装，背景不动（漂移最小）
- `--step scene`：只换背景，人物不动
- `--step full`：完整换（默认）
- `--no-ref`：强制文生图（不建议用于IP角色）

---

### Step 3：出三视图 (Character Sheets)

**SOP 来源**：`skills/generate_character_sheet.md`

**规则**：

- ✅ 必须用定妆照做底图（`costume_designs/{角色}/gu_qiyue_film_official.png`）
- ✅ 用 `edit_image`，不用文生图
- ❌ 禁止直接文生图出三视图（会假，会跟定妆照割裂）

**命令**：

```bash
mcporter call \
  --stdio "node ~/Desktop/skills/nanobanana-plus/mcp-server/dist/index.js" \
  --env "NANOBANANA_GEMINI_API_KEY=<KEY>" \
  edit_image \
  --args '{
    "prompt": "[MASTER PROMPT: 8K CINEMATIC MOVIE QUALITY] Character design model sheet of {角色名}. [SOP: Physical Cloning] EXACTLY CLONE face and costume from reference. [SOP: Three Views] Show SAME person THREE TIMES side by side: LEFT=front, CENTER=side profile, RIGHT=back. Full body all views. [SOP: Cinematic] 35mm film grain, Low-key, high contrast, volumetric light, visible pores. Background: {场景}. Do not add any text.",
    "file": "references/costume_designs/{角色}/定妆照.png"
  }'
```

**存档**：`references/character_sheets/{角色名}.png`

---

### Step 4：场景图批量加水印

**工具**：`watermark.py`

**功能**：

- 底部渐变遮罩 + 金色毛笔主标题 + 灰色副标题
- 字体：`fonts/汉仪尚巍手书W.ttf`（武侠风毛笔感）

**命令**：

```bash
python3 scripts/watermark.py
# 默认：读 _dashboard/assets/scenery/，输出到 scenery_watermarked/
```

**自定义标题**：修改脚本第7行

```python
def add_watermark(input_path, output_path, title="沸腾之雪", subtitle="@司南烛"):
```

---

## 🔑 API Key 管理

```bash
export NANOBANANA_GEMINI_API_KEY="your_key"
```

或通过 `--key` 参数传入。

**模型选择**：

- `imagen-4.0-ultra-generate-001` — 最高质量，文生图用（Pro Key必须）
- `gemini-3.1-flash-image-preview` — edit_image 默认，速度快

---

## 📁 关键目录速查

```
references/
  character_anchors/   # 角色原始底图（定妆用底图）
  visual_anchors/      # 角色 JSON 锚点（人脸锁数据）
  costume_designs/     # 各角色定妆照和服装图
  character_sheets/  # 标准三视图存档
  场景设计/            # 场景参考图
_dashboard/assets/scenery/           # 场景图原图
_dashboard/assets/scenery_watermarked/  # 场景图水印版
```

---

## 🔄 工作流 C：分镜脚本工作流

**SOP 来源**：`skills/generate_story.md`

**流程**：

```
剧情大纲 → 锁定角色锚点（cast/*.json + character_sheets）
        → generate_story MCP 工具
        → 4张 21:9 连贯分镜图
        → 存入 scripts/storyboards/
```

**要点**：

- 必须先从 `references/三视图/` 读取角色特征
- `aspectRatio` 固定 `21:9`
- `outputCount` 建议 4

---

## 🔄 工作流 D：公众号发布工作流

**工具**：`baoyu-post-to-wechat` skill

**流程**：

```
写文章（Markdown）→ 准备配图（压缩至1MB以内）
               → wechat-api.ts 发布
               → 草稿箱审查 → 发布
```

**模板**：`promotions/wechat_publish/版本B_墨金古典.html`（已定为公众号固定样式）

**注意**：

- 微信API IP白名单：101.68.51.99（已加）
- 图片必须压缩到1MB以内（用 sips 工具）
- 内联CSS才能在微信端正常渲染（CSS变量会被过滤）

---

## 🔄 工作流 E：宣推内容工作流

**流程**：

```
promotions/epXX.md（已有ep01-09）
    → 提取标题/文案/话题标签
    → 配图（costume_designs/ 或 scenery_watermarked/）
    → 小红书：xhs-sinanzhu MCP publish_content（10个话题满配）
    → 公众号：工作流D
```

**小红书话题（固定10个，每次必须用全）**：

- 司南烛：`#手机壁纸 #壁纸分享 #古风壁纸 #武侠壁纸 #免费壁纸 #古风 #武侠 #AI绘画 #沸腾之雪 #古风插画`
- 旁白：`#AI虚拟人 #古风美女 #AI美女 #武侠 #古风 #沸腾之雪 #AI绘画 #二次元 #古风插画 #虚拟偶像`
