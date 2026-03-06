---
name: generate_story
description: 连续分镜预演技能 (Story Sequence Generator)
---

# 连续分镜预演技能

## 适用场景

用于快速视效打版、剧情分镜预演。通过生成一组（多张）连续画面，模拟电影镜头的演进。

## 执行方式

不要直接在 Skill 或代码中硬编码 Prompt。请调用封装好的脚本来执行生成逻辑。

```bash
# 执行示例
node skills/scripts/gen_story.js \
  "A cinematic wide shot of Su Mengcheng standing on the peak, then unsheathing his sword, with snow swirling around." \
  4
```

## 执行逻辑说明

脚本位于 `skills/scripts/gen_story.js`：

1. **自动授权**：脚本会安全地从本地秘钥路径读取 API Key。
2. **多镜连贯**：调用 MCP 的 `generateStorySequence` 模式，模型会尝试在 4 镜之间保持画面风格和角色视觉的连贯性。
3. **输出规格**：默认锁定 `21:9` 宽画幅和电影级质感后缀。

## 注意事项

- 画面连贯性属于“弱一致性”预演，不建议用于对细节要求极其严苛的成品环节。
- 建议传入的 Prompt 包含环境基调、核心动作三个阶段（起、中、转）。
