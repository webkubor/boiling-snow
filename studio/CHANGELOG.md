# CHANGELOG

## 2026-08-27 · v0.4.0 — 多季架构 + Prompt 实验室 + 全局搜索

### 重构(breaking:仓库结构)
- 仓库目录重组,`cast/` `episodes/` `bibles/` `music/` `references/` `scripts/storyboards/` → `seasons/s1/`(`git mv` 保留历史)
- `agents/` 留在根目录,作为跨季共享(创作红线 `CREATIVE_BIBLE.md`)
- `studio/server/lib/paths.js` 新增 `getSeasonRoot()` / `listSeasons()` / `setSeason()`,向后兼容
- 所有 server API 自动接受 `?season=xxx` 参数,前端 `api.js` 自动拼
- 侧栏顶栏新增**季/IP 下拉切换器**,持久化到 localStorage

### 新功能
- **剧集看板** `/episodes` — 14 集按状态分组(已完结/已发布/已定稿/待开发),5 种 kind 自适应渲染(prologue / structured-15s / detailed-scenes / outline / storyboard),右侧 JImeng 指令侧栏可一键复制
- **创意法典** `/bible` — 7 大节法典 + 角色评卷版旁白 + 镜头美学 SKILL
- **三轴预览** `/aesthetic` — 镜头 / 音乐(BGM 库 + 主题曲「雪沸」) / 审美(12 神兵)
- **Prompt 实验室** `/prompt-lab` — 选场景/角色/神兵 + 8 维度镜头偏好(情绪/力量/节奏/景别/光影/色调/质感/时长)→ 自动生成 S-A-C-S 结构化 Prompt + 负面约束 + 一键复制投喂 Seedance 2.0 / Veo 3.1 / 即梦
- **角色库升级** — 加"神兵"tab(显示当前角色持有/全部 12 把,可一键复制 IP 符号)
- **全局搜索** — 侧栏顶栏,200ms debounce,跨角色/剧集/神兵/BGM

### Server API 新增
- `GET /api/seasons` / `/api/seasons/:name/manifest` / `/api/search`
- 9 个新数据路由(episodes / storyboards / bible / voiceover / camera-skill / aesthetic / bgm / theme / weapons)
- 全部支持 `?season=xxx` 切季

### 解析器(parser.js)修复
- `detectKind` 补 `m` flag(原来 `^## 场景\d+` 永远不匹配)
- 中文集号 `第一集` → 用 `parseEpNumber` 支持中文数字
- `**加粗**` 标记兼容(Jimeng 指令 / 台词 / 音频)
- ep00 序幕用 `### 第X段` 三级标题(原用 ##)
- ep12 场景元字段用 `### 时间\n- xxx` 双格式兼容

### 已知限制
- `episodes/*.md` **永不回写** —— 14 集 4 种文档结构,安全回写做不到。镜头在工作台里独立建,只引用剧集。
- `_dashboard/` 仍是单 IP(第一季《沸腾之雪》)的对外展示站,第二季要展示得另开一个工作台或加 dashboard 路由分流。
- `STUDIO_SEASON` 环境变量还没接上,目前默认 `s1`,切换全靠 localStorage。

### 下一步
- 键盘快捷键(⌘-K 唤起搜索, g+e 跳剧集, g+c 跳角色库…)
- Prompt 实验室历史记录
- 批量出图(从剧集看板一键生成所有 14 集的首版图)
- i18n(目前全中文)

---

## 之前版本

### 0.1.0 · 2026-08 之前
- 镜头台 + 角色库 + 参考图库 + 渲染队列(4 个视图)
- museav CLI 集成 + SSE 进度推送
- 4 套命名映射的 registry 层
