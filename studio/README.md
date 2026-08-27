# 沸雪工作台 (Boiling Snow Studio)

《沸腾之雪》的**本地**生产工作台。跑在自己机器上，直接读写仓库里的真源文件。

```bash
cd studio && pnpm install && pnpm dev
```

一条命令起完整工作台（前端 + 后端同进程，后端是 Vite 的 middleware，不用另开服务）。

`pnpm build` 只用来做构建校验。**构建产物不能部署** —— 静态站没有后端，所有 `/api/*` 都会 404。
这是本地工具，只跑 `dev`。

## 这个工作台和 `_dashboard/` 什么关系

两套前端，**互不干扰**，共用同一批真源：

| | `_dashboard/` | `studio/`（本工作台） |
|---|---|---|
| 给谁看 | 对外访客 | 只给自己 |
| 部署 | Vercel 静态站 | **只在本地跑，不部署** |
| 目的 | 沉浸叙事（入阵动画、BGM、宣言） | 干活（信息密度、可编辑、能出图） |
| 数据 | `_dashboard/data/*.js` 手抄副本 | 直接读 `cast/` `episodes/` `references/` 真源 |

分开是刻意的：展示站要沉浸感，工作台要信息密度，塞进一个页面两边都做不好。

## 真源与状态的边界（重要）

**工作台永远不会自作主张改你的内容真源。**

| 数据 | 位置 | 谁是真源 | 工作台的权限 |
|---|---|---|---|
| 角色档案 | `cast/*.json` | 文件本身 | 读 + **显式点保存才写** |
| 剧集剧本 | `episodes/*.md` | 文件本身 | **只读**，永不回写 |
| 参考图库 | `references/` | 文件本身 | 只读索引 |
| 镜头/出图记录 | `studio/.state/` | 工作台 | 读写（已 gitignore） |

所以：**工作台崩了、删了、重写了，你的内容一个字都不会少。** 丢的最多是生产状态（哪张图采用了）。

保存角色档案时的格式：缩进 2 空格、中文不转义、字段顺序原样保留 —— 和仓库里现有 JSON 一致，
diff 只会显示你真正改的那几行。唯一的例外是**文件末尾会补一个换行**：18 个角色里有 16 个本来就有，
只有 `温小婉.json` 和 `顾栖月.json` 缺，第一次保存这两个会多一行 EOF 的 diff，之后就稳定了。

`episodes/*.md` 之所以只读，是因为 14 集里有至少 4 种不同的文档结构（ep02–07 只有大纲、压根没有镜头；ep01/ep12/ep13 各是一套镜头写法）。写一个能吃下全部格式还能安全回写的解析器，是个永远修不完的坑。所以镜头在工作台里独立建，只**引用**剧集，不反向改写它。

## 目录

```
studio/
├── server/          后端（挂在 Vite middleware 上，零外部依赖，只用 node: 内置模块）
│   ├── registry.js  资产索引层 —— 统一四套命名（见下）
│   └── routes/      cast / episodes / refs / shots / gen
├── src/             Vue 3 前端
│   └── styles/      设计 token
└── .state/          生产状态侧车（gitignore）
```

## 四套命名的问题

同一个角色，仓库里历史上有四种叫法：

| 位置 | 顾栖月长什么样 |
|---|---|
| `cast/顾栖月.json` | 文件名中文，内含 `"ID": "gu-qi-yue"` |
| `_dashboard/assets/characters/` | `gu_qi_yue.png`（下划线） |
| `references/定妆照/` | 中文目录 + 中文文件名 |
| `scripts/gen_image.py`（已废弃） | `gu_qiyue`（第三种拼法） |

`server/registry.js` 在运行时把这四套映射到一起。**不移动、不重命名任何现有文件** —— 移目录会炸掉一堆硬编码引用，代价远大于收益。

## 出图链路

出图/出视频全部 shell out 到 [`museav`](https://github.com/webkubor/museav-cli) CLI，工作台自己不写任何模型调用代码：

- 出图/出视频 → `museav gen`（`--ref` 垫图、`--video --image` 图生视频首帧）
- 队列 → `museav jobs`
- 后处理 → `museav upscale` / `remove-bg` / `remove-watermark`

> `scripts/gen_image.py` **已废弃**：它引用的 `references/visual_anchors`、`character_anchors`、`costume_designs` 三个目录都不存在了，依赖的 nanobanana MCP 路径也没了。功能由 `museav` 全部覆盖，不再维护。

解析 `museav` 输出时**只读 stdout** —— 人类可读的那部分走 stderr，照终端所见去解析会抓空。
