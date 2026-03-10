---
name: generate_character_sheet
description: Agentic SOP: 基于单张原图生成高保真三视图（正面、侧面、背面）
---

# 角色三视图生成技能 (SOP)

## 技能定义

当需要将单张角色原图（Anchor）扩展为标准的 16:9 画幅三视图展板时，AI Agent 应当遵循物理一致性原则，禁止任何基于剧情的自创解读。

## 执行准则 (High Fidelity & Cinematic Rules)

1. **物理克隆 (Physical Cloning)**：
   - **强制锚点**：必须基于 `references/character_anchors/` 下的原图执行 `edit_image`。
   - **面部五官**：100% 克隆面部骨相、瞳色、神韵。
   - **服饰材质**：锁定原图材质（如织物纹理、皱褶、色彩深度）。
2. **电影级制式 (Cinematic Master Standards)**：
   - **画质**：强制 8K, Dolby Vision, HDR10+。
   - **影调**：采用 **低调摄影 (Low-key)**，强调高对比度阴影，利用丁达尔体积光 (Volumetric Light)。
   - **质感**：强制加入 **35mm 胶片颗粒 (Film Grain)**，避免塑料感/CG感。保持可见的毛孔。
3. **三视图构造**：**纯白或浅灰中性背景**（三视图是给AI做参考用的，不是实景，背景必须干净无干扰），展示正面、侧面、背面三个机位。

## 工作流 (Agent Workflow)

1. **特征提取**：调用 `analyze_visual_anchors` 锁定核心视觉点（如：银面具、玄色锦缎、惊鸿枪锚点）。
2. **母版生成 (Master Generation)**：
   - 使用以下提示词母版：
     `[MASTER PROMPT: 8K CINEMATIC MOVIE QUALITY] A professional character design model sheet of {CharacterName} in 16:9 (2.39:1 movie style). [SOP: Physical Cloning] MUST EXACTLY CLONE the face, features, and {CoreCostumeDetails} from image 1. [SOP: Cinematic Aesthetic] 35mm film grain, Low-key photography, high contrast, Tyndall effect volumetric lighting, visible skin pores, realistic raw fabric texture. No CGI look. 100% fidelity. Vibe: {SceneAesthetic}. No markers/text. 3 views (full front, side, and back).`
3. **归档**：存入 `references/三视图/{角色名}.png`。

## 注意事项

- 图片边缘如果出现乱码文字，必须在 Prompt 中显式说明 `Do not add any text.`。
- 生成后，必须主动将其存档至 `references/三视图/{角色名}.png`。
