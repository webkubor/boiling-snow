---
name: generate_character_sheet
description: Agentic SOP: 基于单张原图生成高保真三视图（正面、侧面、背面）
---

# 角色三视图生成技能 (SOP)

## 技能定义

当需要将单张角色原图（Anchor）扩展为标准的 16:9 画幅三视图展板时，AI Agent 应当遵循物理一致性原则，禁止任何基于剧情的自创解读。

## 执行准则 (High Fidelity Rules)

1. **物理克隆 (Physical Cloning)**：
   - **面部**：严防人脸偏移，必须严格克隆面部轮廓、瞳色、五官间距。
   - **发型**：必须保持原图的发色、长度及扎发逻辑。
   - **服装**：严禁改变衣服的剪裁、花纹和色彩深度。
2. **禁止剧情干扰**：不准在 Prompt 中加入“英气十足”、“杀意凛然”等情绪化词汇，也不准加入对该角色剧情地位的描述，避免模型通过“脑补”改变细节。

## 工作流 (Agent Workflow)

1. **参考解析**：通过视觉读取 `references/character_anchors/` 下的原图。
2. **调用 `edit_image` (图生图模式)**：
   - `inputImage`: 原图绝对路径。
   - `prompt`: 采用极简物理描述。
     - **模板**：`A professional wide character model sheet (front, side, back views) showing the EXACT character from the input image. STRICTLY maintain the face, hairstyle, and clothing with 100% fidelity. No text. Photorealistic 3D game engine aesthetic. Clean neutral background.`
   - `model`: `gemini-3-pro-image-preview`
   - `aspectRatio`: `16:9`
3. **复合产出 (如有需求)**：如果角色带有核心武器，需先执行 `analyze_visual_anchors` 提取武器特征，并合并到上述 Prompt 中。

## 注意事项

- 图片边缘如果出现乱码文字，必须在 Prompt 中显式说明 `Do not add any text.`。
- 生成后，必须主动将其存档至 `references/三视图/{角色名}.png`。
