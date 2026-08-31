# 第二季（占位）

> **状态**: 🟡 骨架已建，**待用户填入故事内容**。
>
> 第一季是《沸腾之雪》，第二季的故事、角色、神兵、世界观**完全独立**。
> 本目录只是工作台的脚手架 —— 工作台能正确识别 s2，下拉切到 s2 后能列出 0 个角色 / 0 集 / 0 神兵，避免下拉选完发现是空白报错。

## 启动第二季需要做的事

按 studio/README.md 的多季架构指引：

```bash
# 1. 填故事：bibles/WORLD.md + bibles/WEAPONS.md
# 2. 建人物：cast/*.json 18 人（同第一季结构）
# 3. 写剧本：episodes/ep00.md ~ ep13.md
# 4. 沉淀分镜：scripts/storyboards/ 下累积 15s Solo
# 5. 录旁白：bibles/VOICEOVER.md
```

## 与第一季的关系

- **完全独立**：不共享人物 / 不共享世界 / 不共享神兵
- **共享机制**：工作台 / 法典红线 / Skill 中心 / Prompt 实验室都是平台层（位于 `agents/` `skills/` `studio/`），第二季可直接复用
- **数据隔离**：s1 和 s2 互不影响，切季不会污染另一季的 cast / episodes / storyboards

## 文件清单（占位）

| 子目录 | 状态 | 说明 |
|---|---|---|
| `bibles/` | 🟡 空 | 等填世界观 + 神兵谱 + 旁白口径 |
| `cast/` | 🟡 空 | 等建角色档案 |
| `episodes/` | 🟡 空 | 等写剧集 |
| `music/` | 🟡 空 | 等录 BGM |
| `references/` | 🟡 空 | 等出参考图 |
| `scripts/storyboards/` | 🟡 空 | 等沉淀 15s 分镜 |
| `novels/` | 🟡 空 | 等同步小说灵感（如有） |

---

*Created for Father (老爹) by Boiling Snow Team.*