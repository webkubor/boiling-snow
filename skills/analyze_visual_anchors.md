---
name: analyze_visual_anchors
description: Agentic SOP: 解析图片视觉细节，提取用于“同类克隆”或“一致性重制”的描述锚点
---

# 图片视觉锚点解析技能 (SOP)

## 技能定义

这是一种“逆向解析”能力。当用户提供一个参考锚点（如特定武器、服饰图案或面部特征）时，AI Agent 应当主动利用其视觉感知能力（或多模态模型）将图片转化为**结构化的文本特征矩阵（Visual Anchors）**，以便在后续的生图指令中通过词汇级别进行精准复刻。

## 工作流 (Agent Workflow)

1. **视觉读取**：直接查看用户指定的参考图文件（如 `references/武器/惊鸿枪.jpg`）。
2. **特征矩阵提取**（Agent 自行执行）：
   - **几何形态 (Geometry)**：主体的形状（如：叶形刃、流线型柄）。
   - **材质物理 (Material)**：质感（如：抛光银、磨砂黑、半透明玉质）。
   - **核心装饰 (Details)**：具体的标志性设计（如：柄端的龙首浮雕、缠绕的银丝、特定的刻痕）。
   - **影调光效 (Atmosphere)**：光影氛围（如：青色冷光、金属高光反射、丁达尔效应）。
3. **构造种子 Prompt (Seed Prompt Construction)**：
   - 将上述特征合并为一个高度描述性的英文段落。
   - **公式**：`[High-fidelity requirement] + [Material] + [Specific Ornaments/Joints] + [Lighting details]`。

## 如何应用到生成

在调用 `nanobanana-plus` 的 `edit_image` 或 `generate_image` 工具时，将提取出的“视觉锚点矩阵”填入 Prompt 的核心区域，并加上强力约束词（如 `STRICTLY CLONE`, `EXACT MATCH`）。

## 注意事项

- 绝不猜测剧情，只描述物理属性。
- 优先提取英文描述词，以获得生图引擎的最佳理解。
- 针对武器等精密组件，要特别关注“连接处（Joints）”的构造，这是保持相似度的关键。
