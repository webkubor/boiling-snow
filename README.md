# 《沸腾之雪》 (Boiling Snow)

> **“雪落江湖，热血难凉。一笔写风月，一心藏滚烫。”**
>
> **电影级写实高武 AI 生产系统。以刀为眼，以速为魂，拒绝特效堆砌，重构物理真实的江湖梦。**

---

## 🎬 项目总览

*   **官方名称**：《沸腾之雪》(Boiling Snow)
*   **核心风格**：写实武侠、电影质感、35mm 胶片、自然光影。
*   **发布渠道**：
    *   **微电影**：微信视频号、哔哩哔哩（同步更新至第 6 集）。
    *   **原创 BGM**：网易云音乐（搜索「沸腾之雪」即可收听）。

## 📂 目录索引 (Directory Index)

### 核心管理
- **[README.md](./README.md)**: 项目总览、索引与核心介绍。
- **[SKILL.md](./SKILL.md)**: Gemini CLI 核心创作技能定义，包含分镜生成与提示词工程逻辑。
- **[VISUAL_BIBLE.md](./VISUAL_BIBLE.md)**: **视觉圣经**。锁定全剧视觉基调、构图哲学与光影美学规范。

### 创作资产
- **[cast/](./cast/)**: **角色档案库**。通过文字描述（JSON）锁定角色一致性。
    - `苏梦城.json`: 南楚王爷/枪神。
    - `慕北歌.json`: 孤山剑首。
    - `慕夕歌.json`: 灵动小师妹（白色剑鞘/流白剑）。
    - `欧阳狂徒.json`: 西燕狂刀/大将军。
    - `宁观尘.json`: 游侠道士（木剑+酒葫芦）。
    - `顾栖月.json`: 王府隐线/玉笛暗卫。
    - `萧烬弦.json`: 王府男暗卫（玄弓）。
    - `燕照绫.json`: 西燕女鞭手（赤练）。
- **[music/](./music/)**: **音乐设计库**。包含原创 BGM 结构、Suno/Udio 提示词。
    - `main.md`: 主题曲《雪沸》歌词与风格定义。
    - `bgm.md`: 《初雪·局中月》、《雪沸·命如刃》等配乐设计。
- **[references/](./references/)**: **视觉与美学参考库**。包含角色锚点图、服化道设计图及面部参考。
    - `visual_style_guide.md`: 光影、材质（金属/织物/皮肤）与色调指南。
    - `snow_stride_aesthetic.md`: 叙事美学、极端景别与留白构图规范。
    - `character_anchors/`: 角色视觉锁定图（Face/Pose）。
    - `costume_designs/`: 精细化服化道设计参考。

### 宣发内容与物料
- **[promotions/](./promotions/)**: **宣发文案与脚本库**。存放专为本项目设计的短视频脚本（15s/30s）及内容草稿。
    - `ep01-08.md`: 每一集的内容核心与预告脚本。
    - `clip_xiao_jinxian_su_mansion.md`: 萧烬弦专项短片脚本。
- **[展示页面 (*.html)](./)**: 项目可视化画廊，用于直观检视角色、服化道及动作分镜效果。
    - `master_costume_gallery.html`: 全角色服化道总览。
    - `action_snapshot_gallery.html`: 核心动作瞬间图集。
    - `character_persona_design.html`: 角色人格与视觉匹配设计。

### 生产流程
- **[scripts/](./scripts/)**: **剧本与世界观**。项目的灵魂与硬约束。
    - **[WORLD.md](./scripts/WORLD.md)**: **核心约束文件**。锁定世界观、神兵榜、角色背景与逻辑。
    - **[PRODUCTION_BIBLE.md](./scripts/PRODUCTION_BIBLE.md)**: **制作宣教手册**。统一视频风格、运镜及物理反馈标准。
    - **[VOICEOVER_BIBLE.md](./scripts/VOICEOVER_BIBLE.md)**: **旁白宝典**。全角色 Solo 视频及 POV 文案标准。
    - **[WEAPONS_BIBLE.md](./scripts/WEAPONS_BIBLE.md)**: **神兵谱**。细化各角色武器的物理属性与战斗逻辑。
    - **[canon/](./scripts/canon/)**: **正式剧情大纲库**。按集锁定已完成的剧情（1-7集）。
    - **[storyboards/](./scripts/storyboards/)**: **分镜制作库**。存放具体的 15s 制作脚本与 AI 提示词。
- **[nanobanana-output/](./nanobanana-output/)**: AI 生成图像暂存区，用于分镜参考与海报物料。

## 🛠 核心工作流

1.  **世界观同步**：所有创作必须通过 `scripts/WORLD.md` 的自检清单。
2.  **角色一致性**：利用 `cast/` 下的 JSON 描述，确保跨镜头不穿帮。
3.  **视听合一**：根据 `music/` 节奏进行画面剪辑与 Ducking 混音处理。
4.  **AI 赋能**：利用 Nanobanana/Pencil 插件生成具备胶片感与物理质感的视觉分镜。

---
**微信号：webkubor-heart**  
**2026.02.19 · 沸腾之雪 制作委员会**
