---
name: generate_story
description: Agentic SOP: 基于环境描述与核心视觉锚点，生成连贯的连续分镜序列图
---

# 连续分镜预演技能 (SOP)

## 技能定义

通过 `nanobanana-plus` 的 `generateStorySequence` MCP 能力，为一段故事大纲生成 3-5 张在视觉风格、角色形象上具有强连贯性的动作/场景分镜。

## 执行准则 (Consistency Rules)

1. **锚点前置 (Anchor Initialization)**：在生成分镜前，必须先获取目标角色和核心物品（如武器）的描述词。
2. **基调锁定 (Tone Locking)**：
   - 必须在 Prompt 开头锁定朝代质感、天气质感及摄影影调（如：8K cinematic, heavy snow, low-key lighting）。
3. **动作路径 (Action Path)**：
   - Prompt 应当涵盖动作的起、承、转、合，模型会根据 `outputCount` 自动切分时间轴。

## 工作流 (Agent Workflow)

1. **环境与角色建模**：
   - 若角色已存在，调用 `references/三视图/` 中的特征。
   - 若武器已存在，调用 `analyze_visual_anchors` 的成果。
2. **调用 `generateStorySequence` MCP 工具**：
   - `prompt`: 综合环境、角色锚点与动作剧情的描述。
   - `outputCount`: 建议 4。
   - `aspectRatio`: 必须锁定 `21:9`。
   - `args`: 设置 `type: "story"`, `style: "consistent cinematic film"`。

## 注意事项

- 连续分镜属于“弱连贯”系统，主要用于视效打版和镜头感预演。
- 严禁在分镜中加入现代元素或无意义的文字。
