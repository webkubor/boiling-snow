![logo](https://cdn.jsdelivr.net/gh/webkubor/picx-images-hosting@master/blog/projects/cinematic-storyboard-pro/cs-token4ai-1784194077304407000.png)

![banner](https://cdn.jsdelivr.net/gh/webkubor/picx-images-hosting@master/blog/projects/cinematic-storyboard-pro-banner/cs-token4ai-1784205644937428000.png)

# 沸雪 · 武侠 AI 工作台 (Boiling Snow — Wuxia AI Workbench)

> **"雪落江湖，热血难凉。一笔写风月，一心藏滚烫。"**
>
> **武侠题材 AI 影视生产工作台**。以刀为眼，以速为魂，拒绝特效堆砌，重构物理真实的江湖梦。
> 当前旗舰季：《沸腾之雪》(Boiling Snow)。

沸雪工作台是一个**面向武侠 / 高武题材的 AI 影视生产平台**：把世界观、角色、神兵、剧本、分镜、镜头、视觉生成、视频生成、后期合成全部沉淀为可复用资产，用 Vue 3 本地工作台一站式调度，多季 IP 同仓共存。

---

## 🎬 当前季：《沸腾之雪》(Boiling Snow)

第一季《沸腾之雪》是工作台的旗舰实例，承载完整 14 集 + 18 角色 + 12 神兵 + 主题曲「雪沸」的全季 SSOT（Single Source of Truth）。

> **电影级写实高武 AI 生产系统**。拒绝法术光圈 / 符文 / 飞行；每一次挥刀都要有雪尘、墙裂、布料物理。
> 结构化分段（0–4s 起势 / 4–10s 撞击 / 10–15s 余势），Seedance 2.0 为默认视频平台。

### 创作入口（Agent Center）

所有 AI Agent 和创作者应优先访问 **[agents/README.md](agents/README.md)**：

*   **[创意法典 (CREATIVE_BIBLE.md)](agents/CREATIVE_BIBLE.md)** — 视觉、动作、镜头、环境及角色制作的所有硬核规则。
*   **[学习素材总览](seasons/s1/scripts/storyboards/LEARNING_MATERIALS.md)** ⭐ — **8 个验证过的 15s 动作脚本一条条列出来**，每个标注「学习要点 / 适用场景 / 推荐程度」。写新分镜前**先扫这一页**。

### 跨季 Skills（生产模块）

*   **[视频打斗戏 Skill](skills/视频打斗戏/SKILL.md)** — 15s 打斗脚本生成规则，含大师思维框架 v2.0。
*   **[人设模板 Skill](skills/人设模板/SKILL.md)** — 角色 JSON 结构规范。
*   **[镜头美学 Skill](skills/镜头美学/SKILL.md)** — 镜头偏好收集与 Camera Prompt 生成。

---

## 🛠 工作台平台 (Studio Platform)

工作台本身独立于季，是平台的运行内核 —— **Vue 3 + Vite 8 + Node 后端（Vite dev middleware 零外部进程）**。

```bash
cd studio
pnpm install
pnpm dev   # http://127.0.0.1:5273
```

8 个视图（全部支持 `?season=xxx` 切季，localStorage 记忆）：

| 路径 | 用途 |
|---|---|
| `/shots` | 镜头台 — 分镜 CRUD + museav 出图/出视频 |
| `/episodes` | **剧集看板** — 14 集 + 状态分组 + 详情按 kind 自适应 + JImeng 指令侧栏 |
| `/cast` | 角色库 — 角色档案可编辑 + 4 tab（档案 / 参考图 / 神兵 / 原文 JSON） |
| `/gallery` | 参考图库缩略图 |
| `/bible` | 创意法典 — 7 大节法典 + 旁白文案 + 镜头美学 SKILL |
| `/aesthetic` | 三轴预览 — 镜头 / 音乐 / 审美（神兵） |
| `/prompt-lab` | **Prompt 实验室** — 法典 + 角色 + 神兵自动套用 S-A-C-S，一键复制投喂 Seedance 2.0 |
| `/queue` | 渲染队列 — museav jobs |

详见 [studio/README.md](studio/README.md)。

---

## 📚 多季架构 (Multi-Season)

平台天生支持多季 IP 同仓切换。第一季是《沸腾之雪》，将来加季：

```
seasons/
  s1/   ← 第一季《沸腾之雪》(默认)
    cast/ episodes/ bibles/ music/ references/ scripts/storyboards/
  s2/   ← 将来加季：mkdir 骨架即可，工作台下拉切换
agents/  ← 跨季共享(创作红线 CREATIVE_BIBLE.md)
scripts/  ← 跨季工具脚本
studio/   ← 工作台本身
_dashboard/ ← 第一季对外展示站(将来可按季分流)
```

新增一季 = `mkdir -p seasons/s2/{cast,episodes,bibles,music,references,scripts/storyboards}` → 从 s1 复制骨架 → 工作台顶栏下拉选 s2。

---

## 🛠 生产工具栈

- **视频生成**: Seedance 2.0（默认优先）/ Google Veo 3.1 / 即梦 AI (Jimeng)
- **视觉/海报**: Midjourney (MJ) / Nanobanana
- **封面制作**: [Gemini 视频封面创作中心](https://gemini.google.com/share/9915a3a902a0)
- **出图/出视频 CLI**: [`museav`](https://github.com/webkubor/museav-cli)（工作台 `/shots` 与 `/queue` 全部 shell out 到它）
- **后期**: `scripts/` 下的 Python 自动化套件（加字幕、水印、角色卡）

---

## 📂 目录索引

### 平台层（跨季）
*   **[agents/CREATIVE_BIBLE.md](agents/CREATIVE_BIBLE.md)** — 创作红线（视觉、动作、镜头、环境、角色），跨季共享。
*   **[agents/README.md](agents/README.md)** — Agent 创作中心入口。
*   **[studio/README.md](studio/README.md)** — 工作台完整文档。
*   **[scripts/README.md](scripts/README.md)** — 跨季自动化工具说明。

### 第一季 s1（默认）
*   **[seasons/s1/bibles/WORLD.md](seasons/s1/bibles/WORLD.md)** — 世界观总档：时代背景、地理格局、三方博弈、叙事铁律、天榜规则。**最高口径**。
*   **[seasons/s1/bibles/WEAPONS.md](seasons/s1/bibles/WEAPONS.md)** — 神兵谱：神兵形制、物理逻辑与 IP 符号。
*   **[seasons/s1/cast/](seasons/s1/cast/)** — 18 角色全量档案（JSON）。
*   **[seasons/s1/episodes/](seasons/s1/episodes/)** — 14 集剧情大纲与定稿剧本（ep00 序幕 → ep13 待开发）。
*   **[seasons/s1/references/](seasons/s1/references/)** — 三视图 / 定妆照 / 场景设计 / 武器 / 海报 / 脸部参考 / 坐骑 视觉库。
*   **[seasons/s1/scripts/storyboards/](seasons/s1/scripts/storyboards/)** — 15s 镜头脚本（含 8 个验证过的分镜 + 1 个总览）。

### 📚 学习素材（动作/镜头/Prompt 参考脚本）

**[seasons/s1/scripts/storyboards/LEARNING_MATERIALS.md](seasons/s1/scripts/storyboards/LEARNING_MATERIALS.md)** — 8 个验证过的 15s 动作脚本一条条列出来作为学习素材：

* ⭐ 金标：[顾栖月·百丈漈 Solo 母版](seasons/s1/scripts/storyboards/top10_rank09_顾栖月.md)
* 🥈 天榜正式版（4 种动作范式）：[影·潜行瞬杀](seasons/s1/scripts/storyboards/top10_rank04_影.md) / [萧烬弦·远射弓刃](seasons/s1/scripts/storyboards/top10_rank07_萧烬弦.md) / [陆听潮·泥沼双刃](seasons/s1/scripts/storyboards/top10_rank08_陆听潮.md) / [燕照绫·大漠鞭术](seasons/s1/scripts/storyboards/top10_rank10_燕照绫.md)
* 🥉 顾栖月系列：[雨夜古巷·交付格式样板](seasons/s1/scripts/storyboards/雨夜古巷_顾栖月_15s.md) / [剑门关·V2.0 重制版](seasons/s1/scripts/storyboards/顾栖月_剑门关_重制版.md)
* 🟢 序章：[prologue_tianbang_intro_15s.md](seasons/s1/scripts/storyboards/prologue_tianbang_intro_15s.md)

### 展示与控制
*   **[_dashboard/](_dashboard/)** — 第一季对外展示站。
*   **[studio/.state/](studio/.state/)** — 工作台内部镜头账本（gitignored）。

---

## 🛠 核心工作流

1.  **规则对齐** — 读 [agents/CREATIVE_BIBLE.md](agents/CREATIVE_BIBLE.md) 确认视觉与动作红线。
2.  **扫学习素材** — 来 [LEARNING_MATERIALS.md](seasons/s1/scripts/storyboards/LEARNING_MATERIALS.md) 找跟你现在写的角色/动作/场景最像的那一条，先读完再去写 prompt。
3.  **人设提取** — 从当前季 `seasons/{s}/cast/*.json` 读目标角色档案。
4.  **平台规则对齐** — 走 `agents/CREATIVE_BIBLE.md` 第 5 章「神兵镜头专属逻辑」+ `skills/视频打斗戏/SKILL.md` 大师思维框架。
5.  **脚本输出** — 参考金标 `top10_rank09_顾栖月.md` 或最终交付格式样板 `雨夜古巷_顾栖月_15s.md` 的 prompt 结构（细节见 LEARNING_MATERIALS.md）。
6.  **工作台出图/出视频** — `studio/` 起本地工作台 → `/shots` 镜头台建条目 → museav 出图 → take 验收 → 入库。

---

*Created for Father (老爹) by Boiling Snow Team.*
