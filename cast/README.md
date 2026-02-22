# Storyboard Cast (角色-照片对照库)

此目录仅服务于 `cinematic-storyboard` 技能，用于维护角色的纯文字设定与一致性约束。

## 设计原则
- 小烛是外部大脑全局唯一助理，不放入此目录。
- 这里的角色仅用于分镜与出图任务。
- 每个角色一个 JSON，便于复用与版本管理。

## 文件结构
- `character.template.json`：角色模板
- `*.json`：具体角色档案
- 不依赖照片或图像ID，角色一致性仅由文字描述维护

## 使用流程
1. 复制 `character.template.json` 为新角色文件（例如：`heroine-a.json`）。
2. 填写角色描述与 `prompt_profile`（纯文字）。
3. 通过发型/服饰/武器/行为四项描述锁定跨镜头一致性。
