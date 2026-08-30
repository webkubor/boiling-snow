# 沸雪工作台 (Boiling Snow Studio — Wuxia AI Workbench)

沸雪·武侠 AI 工作台的内核 —— **面向武侠 / 高武题材的多季 IP 生产平台**。当前旗舰季：《沸腾之雪》。

Vue 3 + Vite 8 前端，Node 后端挂在 Vite dev middleware（零外部进程）。一个命令起全部，只跑 127.0.0.1，**纯本地工具，不部署**。

> 平台定位：把世界观、角色、神兵、剧本、分镜、镜头、视觉/视频生成、后期合成全部沉淀为可复用资产，让多季武侠 IP 都能在同一工作台里跑完整条生产线。第一季《沸腾之雪》是平台的完整实例。

## 跑起来

```bash
cd studio
pnpm install   # 首次
pnpm dev       # http://127.0.0.1:5273
```

> `pnpm build` 只做语法/打包校验。**不能直接部署** —— 静态站没有后端,`/api/*` 都会 404。生产请直接 `pnpm dev`。

## 多季架构(2026-08 后)

```
seasons/
  s1/                  ← 第一季《沸腾之雪》(默认)
    cast/ episodes/ bibles/ music/ references/ scripts/storyboards/
  s2/                  ← 第二季(同结构,新建空目录后从 s1 复制骨架)
  s3/
agents/                ← 跨季共享(创作红线 CREATIVE_BIBLE.md 等)
scripts/               ← 跨季工具脚本
studio/                ← 工作台本身(独立)
_dashboard/            ← 第一季对外展示站
```

**顶栏下拉切换季**(`/api/seasons` 列出 `seasons/` 下的子目录),所有视图自动重读对应季的 cast/episodes/bibles。`localStorage` 记住上次选择。

新增第二季:`mkdir -p seasons/s2/{cast,episodes,bibles,music,references,scripts/storyboards}` → 复制 s1 骨架 → 工作台下拉选 s2。

## 8 个视图

| 路径 | 用途 |
|---|---|
| `/shots` | 镜头台 — 分镜 CRUD + museav 出图/出视频 |
| `/episodes` | **剧集看板** — 14 集 + 状态分组 + 详情按 kind 自适应 + JImeng 指令侧栏 |
| `/cast` | 角色库 — 18 角色档案可编辑 + 4 tab(档案/参考图/神兵/原文 JSON) |
| `/gallery` | 参考图库 — references/ 缩略图 |
| `/bible` | 创意法典 — 7 大节法典 + 旁白文案 + 镜头美学 SKILL |
| `/aesthetic` | 三轴预览 — 镜头 / 音乐 / 审美(神兵) |
| `/prompt-lab` | **Prompt 实验室** — 法典+角色+神兵 自动套用 S-A-C-S,一键复制投喂 Seedance 2.0 |
| `/queue` | 渲染队列 — museav jobs |

侧栏顶栏还有**全局搜索**(⌘-K 风格的字符搜,跨角色/剧集/神兵/BGM,200ms debounce)。

## API 路由

| Method | Path | 说明 |
|---|---|---|
| `GET` | `/api/health` | 后端健康(museav / registry) |
| `GET` | `/api/registry` | 角色索引(全部,不含 raw) |
| `GET` | `/api/cast/:name` | 单角色 raw |
| `PUT` | `/api/cast/:name` | 写回 cast JSON(2 空格缩进,中文不转义) |
| `GET` | `/api/seasons` | 所有季列表 |
| `GET` | `/api/seasons/:name/manifest` | 单季 manifest(集数/角色/神兵/BGM 计数) |
| `GET` | `/api/search?q=...` | 全局搜索(角色/剧集/神兵/BGM) |
| `GET` | `/api/episodes[?season=s1]` | 14 集摘要 |
| `GET` | `/api/episodes/:n[?season=s1]` | 单集详情(5 种 kind 自适应) |
| `GET` | `/api/storyboards[?season=s1]` | storyboard 列表 |
| `GET` | `/api/storyboards/:file[?season=s1]` | 单个 storyboard |
| `GET` | `/api/bible[?season=s1]` | 创意法典结构化 |
| `GET` | `/api/voiceover[?season=s1]` | 角色评卷版文案 |
| `GET` | `/api/camera-skill[?season=s1]` | 镜头美学 SKILL |
| `GET` | `/api/aesthetic[?season=s1]` | 影调协议(去重) |
| `GET` | `/api/bgm[?season=s1]` | BGM 库 |
| `GET` | `/api/theme[?season=s1]` | 主题曲「雪沸」 |
| `GET` | `/api/weapons[?season=s1]` | 12 把神兵 |
| `GET` | `/api/shots` | 工作台镜头账本(studio/.state/) |
| `POST` | `/api/shots` | 新建镜头 |
| `PUT` | `/api/shots/:id` | 更新 |
| `DELETE` | `/api/shots/:id` | 删除 |
| `POST` | `/api/shots/:id/adopt` | 标记采用某 take |
| `POST` | `/api/shots/:id/generate` | 出图/视频(SSE 推进度) |
| `GET` | `/api/jobs?limit=20` | museav 队列 |
| `POST` | `/api/post-process` | upscale / remove-bg / remove-watermark |
| `GET` | `/api/asset?p=...` | 仓库内图片/视频/字体直出 |
| `GET` | `/api/events` | SSE(出图进度推送) |
| `GET` | `/api/doc/:rel` | 读任意 md 文件(白名单内) |

所有 `?season=xxx` 缺省 = 默认季(`STUDIO_SEASON` env 或 `s1`)。

## 真源与状态的边界

| 数据 | 位置 | 谁是真源 | 工作台权限 |
|---|---|---|---|
| 角色档案 | `seasons/{s}/cast/*.json` | 文件本身 | 读 + **显式点保存才写** |
| 剧集剧本 | `seasons/{s}/episodes/*.md` | 文件本身 | **只读** |
| 神兵谱 | `seasons/{s}/bibles/WEAPONS.md` | 文件本身 | 只读 |
| 创作红线 | `agents/CREATIVE_BIBLE.md` | 文件本身 | 只读(跨季共享) |
| 参考图库 | `seasons/{s}/references/` | 文件本身 | 只读索引 |
| 镜头/出图记录 | `studio/.state/` | 工作台 | 读写(gitignore) |

`episodes/*.md` 之所以只读:14 集至少 4 种文档结构(ep02–07 是大纲、ep01/ep12/ep13 各一套镜头写法),安全回写解析器是个无底洞。**镜头在工作台里独立建,只引用剧集,不反向改写**。

## 5 种 Episode Kind

parser 自动识别,UI 按 kind 决定渲染:

| Kind | 样例 | 识别规则 |
|---|---|---|
| `prologue` | ep00 | 文件名 ep00 |
| `structured-15s` | ep01 | 含 `## 第X幕` 或 `### N. xxx` |
| `detailed-scenes` | ep12 | 含 `## 场景N：xxx` |
| `outline` | ep07, ep02-11 | 默认(短剧情大纲) |
| `storyboard` | scripts/storyboards/*.md | 含 `0-3秒\|起势` |
| `pending` | ep13(待开发) | 文件不存在 |

## 命名映射(registry 4 套同名问题)

同一个角色,仓库里历史上有 4 种叫法:`cast/顾栖月.json`(中文文件名 + ID `gu-qi-yue`)、`_dashboard/assets/characters/gu_qi_yue.png`(下划线)、`references/定妆照/顾栖月_v1_玉笛.png`(中文目录+版本后缀)、`scripts/gen_image.py` 已废弃的 `gu_qiyue`(第三种拼法)。`server/registry.js` 在运行时把它们映射到一起。**不移动、不重命名任何现有文件**。

## 出图链路

出图/出视频全部 shell out 到 [`museav`](https://github.com/webkubor/museav-cli) CLI:

- 出图/出视频 → `museav gen`(`--ref` 垫图、`--video --image` 图生视频首帧)
- 队列 → `museav jobs`
- 后处理 → `museav upscale` / `remove-bg` / `remove-watermark`

> `scripts/gen_image.py` **已废弃**,功能由 `museav` 全部覆盖,不再维护。

解析 `museav` 输出时**只读 stdout** —— 人类可读的那部分走 stderr,照终端所见去解析会抓空。

## 路径安全

`server/lib/paths.js` 写白名单不写黑名单:**新增目录默认读不到**。可读白名单:`cast/ episodes/ bibles/ music/ references/ scripts/storyboards/ agents/ skills/ _dashboard/assets/`。可写白名单:只有 `cast/`。`episodes/` 刻意不可写 —— 14 集 4 种结构,安全回写做不到。

## 测试

```bash
cd studio
pnpm test         # 跑 vitest(parser 核心函数回归)
```

测试覆盖:`parseEpNumber`(中文/阿拉伯数字集号)、`parseEpisodeIndex`(README 索引表)、`detectKind`(5 种 kind 自动识别)、`extractJimengPrompts`(容忍加粗+空格+全角)、`extractMetaField`(双格式兼容)、`globalSearch`(跨类合并)。

## 路线图

- [x] **阶段 1**: 仓库重构 + 多季架构(2026-08)
- [x] **阶段 2**: Prompt 实验室(2026-08)
- [x] **阶段 3**: 全局搜索(2026-08)
- [x] **阶段 4**: 文档 + 单测(2026-08)
- [ ] **阶段 5**: 键盘快捷键(⌘-K 唤起搜索, g+e 跳剧集…)

---

*Created for Father (老爹) by Boiling Snow Team.*
