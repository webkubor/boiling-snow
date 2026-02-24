# 图像生成与路由指令指南 (Visual Routing Guide v2.0)

## 1. 核心路由矩阵

| 场景需求 | 推荐工具 | 强制参考/约束 | 归档路径 |
| :--- | :--- | :--- | :--- |
| **小烛助理人像** | `edit_image` | `docs/ucd/persona_refs/` | `~/Desktop/xhs-output/` |
| **特定 IP 角色** | `edit_image` | 各角色专属底稿 (如 `苏梦城.png`) | 项目对应 `assets/` |
| **纯技术/设计封面** | `generate_image` | `zero humans, zero faces` | `~/Documents/juejin/assets/` |
| **非特定高颜值人像** | `generate_xhs_image` | N/A | `~/Desktop/xhs-output/` |

## 2. 视觉红线
- **禁人像合成**: 对于非人像任务（技术封面、背景、静物），严禁调用 `generate_xhs_image`。
- **禁骨相漂移**: 凡涉及特定人设（小烛、苏梦城等），严禁 Text-to-Image 凭空生成，必须锁定底稿进行 `edit_image`。
- **强制上传**: 所有任务必须产出最终的 HTTPS 链接并归档至相应 assets 目录。

## 3. 标准指令模版 (Prompt Template)
- **技术类**: `[Subject], isometric 3D render, frosted glass elements, Juejin Blue palette, zero humans, 8k.`
- **IP 角色类**: `[Character Anchor], same facial features as reference, [Environment Action], low-key lighting, 35mm film grain.`

---
*Last Updated: 2026-02-24 (Optimized by Lao Die's Feedback)*
