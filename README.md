# 《沸腾之雪》(Boiling Snow)

> **“雪落江湖，热血难凉。一笔写风月，一心藏滚烫。”**
>
> **电影级写实高武 AI 生产系统。以刀为眼，以速为魂，拒绝特效堆砌，重构物理真实的江湖梦。**

---

## 🎬 项目总览

* **官方名称**：《沸腾之雪》(Boiling Snow)
* **核心风格**：写实武侠、电影质感、35mm 胶片、自然光影。
* **发布渠道**：
  * **微电影**：微信视频号、哔哩哔哩（同步更新至第 6 集）。
  * **原创 BGM**：网易云音乐（搜索「沸腾之雪」即可收听）。

## 📂 目录索引 (Directory Index)

### 核心管理

* **[README.md](./README.md)**: 项目总览、索引与核心介绍。
* **[SKILL.md](./SKILL.md)**: Gemini CLI 核心创作技能定义，包含分镜生成与提示词工程逻辑。
* **[llms.txt](./llms.txt)**: AI 接入说明，精简版项目上下文摘要。

### 圣经文件库 (`bibles/`)

> 四大创作铁律，所有内容产出的根。写任何分镜或脚本前必须通过这里自检。

* **[bibles/WORLD.md](./bibles/WORLD.md)**: **世界观总档**。时代背景、地理格局、三方博弈、叙事铁律、天榜规则与力量体系。最高口径，不得违反。
* **[bibles/VISUAL.md](./bibles/VISUAL.md)**: **视觉圣经**。锁定视觉红线、环境美学、动作物理、光影材质与技术参数（V5.0）。
* **[bibles/WEAPONS.md](./bibles/WEAPONS.md)**: **神兵谱**。十大神兵的形制、视觉特征、物理逻辑与 IP 符号全解。
* **[bibles/VOICEOVER.md](./bibles/VOICEOVER.md)**: **旁白宝典**。天榜全角色 Solo 视频文案标准及存档案例。
* **[bibles/PRODUCTION.md](./bibles/PRODUCTION.md)**: **制作宣教手册**。统一视频影调、运镜、动作物理、脚本格式、声音协议与多平台发布规则。

### 创作资产

* **[cast/](./cast/)**: **角色档案库**。通过文字描述（JSON）锁定角色一致性。
  * `苏梦城.json`: 南楚王爷/枪神。
  * `慕北歌.json`: 孤山剑首。
  * `慕夕歌.json`: 灵动小师妹（白色剑鞘/流白剑）。
  * `欧阳狂徒.json`: 西燕狂刀/大将军。
  * `宁观尘.json`: 游侠道士（木剑+酒葫芦）。
  * `顾栖月.json`: 王府隐线/玉笛暗卫。
  * `萧烬弦.json`: 王府男暗卫（玄弓）。
  * `燕照绫.json`: 西燕女鞭手（赤练）。

* **[music/](./music/)**: **音乐设计库**。包含原创 BGM 结构、Suno/Udio 提示词。
  * `main.md`: 主题曲《雪沸》歌词与风格定义。
  * `bgm.md`: 《初雪·局中月》、《雪沸·命如刃》等配乐设计。
* **[references/](./references/)**: **视觉与美学参考库**。包含角色锚点图、服化道设计图及面部参考。
  * `visual_style_guide.md`: 光影、材质（金属/织物/皮肤）与色调指南。
  * `snow_stride_aesthetic.md`: 叙事美学、极端景别与留白构图规范。
  * `character_anchors/`: 角色视觉锁定图（Face/Pose）。
  * `costume_designs/`: 精细化服化道设计参考。

### 宣发内容与物料

* **[promotions/](./promotions/)**: **宣发文案与脚本库**。存放专为本项目设计的短视频脚本（15s/30s）及内容草稿。
  * `ep01-08.md`: 每一集的内容核心与预告脚本。
  * `clip_xiao_jinxian_su_mansion.md`: 萧烬弦专项短片脚本。

* **[展示页面 (*.html)](./)**: 项目可视化画廊，用于直观检视角色、服化道及动作分镜效果。
  * `master_costume_gallery.html`: 全角色服化道总览。
  * `action_snapshot_gallery.html`: 核心动作瞬间图集。
  * `character_persona_design.html`: 角色人格与视觉匹配设计。

### 生产流程

* **[prompts/](./prompts/)**: **单角色 AI 提示词库（即用型）**。每个文件是一个特定场景下完整、自洽的 AI 生成提示词，可直接复制进生成工具使用。
  * `night_jinghong_solo_riding_charge_15s.md`: 夜惊鸿，骑马冲阵（天门关骑战）。
  * `night_jinghong_crush_charge_15s.md`: 夜惊鸿，冲阵压制版。
  * `gu_qiyue_solo_baizhangji_15s.md`: 顾栖月，百丈矶单人 Solo。

* **[scripts/canon/](./scripts/canon/)**: **正式剧情大纲库**。按集锁定已定稿的剧情大纲（第 1-10 集）。
* **[scripts/storyboards/](./scripts/storyboards/)**: **分镜制作库**。带完整镜头语言的 15s 制作分镜脚本，含动作设计与 AI 综合提示词。
  * `COMBAT_PROMPT_LIBRARY.md`: 武打戏公用母版与反错清单（必读）。
  * `top10_rank01-10_*.md`: 天榜十大角色各自的 Solo 分镜脚本。

## 📋 目录职责对照（防混用）

| 目录 | 存放内容 | 一句话区别 |
|------|----------|------------|
| `bibles/` | 世界观、视觉、武器、旁白、制作标准 | 规则层，定义什么是对的 |
| `cast/` | 角色 JSON 档案 | 角色层，锁定这个人长什么样 |
| `prompts/` | 即用型单文件 AI 提示词 | 执行层，直接复制粘贴进生成工具 |
| `scripts/storyboards/` | 带分镜结构的制作脚本 | 创作层，有完整镜头拆解 |
| `scripts/canon/` | 剧情大纲 | 叙事层，每集的故事核心与悬念 |
| `references/` | 参考图与样片 | 视觉锚点层，生成图像时必须引用 |

## 🛠 核心工作流

1. **世界观自检**：所有创作必须先通过 `bibles/WORLD.md` 的铁律自检。
2. **角色一致性**：利用 `cast/` 下的 JSON + `references/character_anchors/` 锚点图，确保跨镜头不穿帮。
3. **分镜生成**：参考 `scripts/storyboards/COMBAT_PROMPT_LIBRARY.md` 母版，执行反错自检清单。
4. **提示词交付**：即用型提示词输出至 `prompts/`，带分镜结构的输出至 `scripts/storyboards/`。
5. **视听合一**：根据 `music/` 节奏进行画面剪辑与 Ducking 混音处理。
6. **AI 赋能**：利用 Nanobanana/Pencil 插件生成具备胶片感与物理质感的视觉分镜。

---
**微信号：webkubor-heart**  
**2026.02.19 · 沸腾之雪 制作委员会**  
**README 版本**：V2.0 (2026-03-05)
