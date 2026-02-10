# Storyboard Cast (角色-照片对照库)

此目录仅服务于 `cinematic-storyboard` 技能，用于维护“角色人物”和“参考照片”的映射关系。

## 设计原则
- 小烛是外部大脑全局唯一助理，不放入此目录。
- 这里的角色仅用于分镜与出图任务。
- 每个角色一个 JSON，便于复用与版本管理。

## 文件结构
- `character.template.json`：角色模板
- `*.json`：具体角色档案
- `../cast_refs/`：该角色库对应的人脸参考照片目录

## 使用流程
1. 复制 `character.template.json` 为新角色文件（例如：`heroine-a.json`）。
2. 填写角色描述与 `reference_images`。
3. 将参考图放入 `../cast_refs/` 并在角色 JSON 的 `reference_images` 中填写路径。
