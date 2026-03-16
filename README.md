# 《沸腾之雪》(Boiling Snow)

> **“雪落江湖，热血难凉。一笔写风月，一心藏滚烫。”**
>
> **电影级写实高武 AI 生产系统。以刀为眼，以速为魂，拒绝特效堆砌，重构物理真实的江湖梦。**

---

## 🚀 创作中心 (Agent Center) - 唯一入口

所有 AI Agent 和创作者应优先访问 **[agents/README.md](agents/README.md)**。这里整合了所有的生产力工具：

*   **[创意法典 (CREATIVE_BIBLE.md)](agents/CREATIVE_BIBLE.md)**: 视觉、动作、镜头、环境及角色制作的所有硬核规则。
*   **[快捷操作 (QUICK_ACTIONS.md)](agents/QUICK_ACTIONS.md)**: 四视图控制台、自动加水印等提效工具。
*   **[Prompt 资产库 (PROMPT_LIBRARY.md)](agents/PROMPT_LIBRARY.md)**: 沉淀好的视觉公式、场景矩阵、调参后缀。
*   **[脚本模板 (SCRIPT_TEMPLATE.md)](agents/SCRIPT_TEMPLATE.md)**: 15s 视频脚本生成的唯一标准格式。

---

## 🛠 生产工具栈 (Production Tools)

- **视频生成 (Video)**: Google Veo 3.1 / 即梦 AI (Jimeng)
- **视觉/海报 (Visual)**: Midjourney (MJ) / Nanobanana
- **封面制作 (Cover)**: [Gemini 视频封面创作中心](https://gemini.google.com/share/9915a3a902a0) (专用封面 Prompt 逻辑与画幅控制)
- **自动化套件 (Scripts)**: `scripts/` 目录下的 Python 自动化套件 (加字幕、水印、角色卡)

## 📂 目录索引 (Directory Index)

### 核心管理与规则

*   **[AGENT_GUIDE.md](./AGENT_GUIDE.md)**: 项目创作与导航总指南。
*   **[bibles/WORLD.md](./bibles/WORLD.md)**: **世界观总档**。时代背景、地理格局、三方博弈、叙事铁律、天榜规则。最高口径。
*   **[bibles/WEAPONS.md](./bibles/WEAPONS.md)**: **神兵谱**。神兵形制、物理逻辑与 IP 符号。
*   **[llms.txt](./llms.txt)**: AI 接入说明，精简版项目上下文摘要。

### 创作资产

*   **[cast/](./cast/)**: **角色全量档案 (JSON)**。包含性格、背景、核心冲突及视觉规范。
*   **[scripts/](./scripts/)**: **自动化生产工具**。包含出图脚本 (`gen_image.py`)、三视图工具、水印工具等。
*   **[references/](./references/)**: **视觉与美学参考库**。包含角色锚点图、服化道设计参考。
*   **[episodes/](./episodes/)**: **剧情大纲与定稿剧本**。

### 展示与控制

*   **[_dashboard/](./_dashboard/)**: **可视化控制台**。直观检视角色、神兵及场景资产。
*   **[action_snapshot_gallery.html](./action_snapshot_gallery.html)**: 核心动作瞬间图集。

---

## 🛠 核心工作流 (Workflow)

1.  **规则对齐**：在 [agents/CREATIVE_BIBLE.md](agents/CREATIVE_BIBLE.md) 确认视觉与动作红线。
2.  **人设提取**：从 [cast/](cast/) 目录下读取目标角色的 JSON 档案。
3.  **视觉调用**：从 [agents/PROMPT_LIBRARY.md](agents/PROMPT_LIBRARY.md) 获取经过验证的视觉公式。
4.  **脚本输出**：按照 [agents/SCRIPT_TEMPLATE.md](agents/SCRIPT_TEMPLATE.md) 格式输出 15s 视频指令。

---
*Created for Father (老爹) by Boiling Snow Team.*
