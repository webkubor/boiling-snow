# 角色档案库 (Storyboard Cast)

> **本目录是第一季《沸腾之雪》的角色 JSON 全量档案（18 个）**，由 [../../agents/CREATIVE_BIBLE.md](../../agents/CREATIVE_BIBLE.md) 视觉红线约束，由 [../../skills/人设模板/SKILL.md](../../skills/人设模板/SKILL.md) 规范结构。

## 设计原则

- 每个角色一个 JSON，便于复用与版本管理。
- 角色一致性仅由文字描述（发型 / 服饰 / 武器 / 行为四项）维护，**不依赖照片或图像 ID**。
- 视觉一致性参考图见 [`../references/定妆照/`](../references/定妆照/) 与 [`../references/三视图/`](../references/三视图/)。

## 文件结构

- `*.json`：具体角色档案（18 个）
- 模板在 [../../skills/人设模板/SKILL.md](../../skills/人设模板/SKILL.md)，**不放在本目录**（避免误用为脚本数据）

## 使用流程

1. 在 [../../skills/人设模板/SKILL.md](../../skills/人设模板/SKILL.md) 查角色 JSON 模板结构。
2. 复制模板字段新建角色文件，文件名用角色中文名（如 `顾栖月.json`）。
3. 填写发型 / 服饰 / 武器 / 行为四项描述，**跨镜头一致性由这四项硬约束**。
4. 视觉规范章节 (`视觉规范`) 用纯文字约束，作为出图/出视频 prompt 的视觉锚点。

---
*Boiling Snow Team.*
