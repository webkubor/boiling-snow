# 沸腾之雪 Agent 创作中心 (Agent Center)

> **欢迎来到 Agent 创作中心**。这里是所有 AI Agent 进行剧本创作、分镜设计、视觉生成的统一调度站。

## 📁 目录结构

*   [CREATIVE_BIBLE.md](CREATIVE_BIBLE.md) - **全量创作手册**。整合了视觉、动作、镜头、环境的所有规则。
*   [QUICK_ACTIONS.md](QUICK_ACTIONS.md) - **快捷操作手册**。包含四视图、自动加水印等提效工具。
*   [../scripts/storyboards/VIDEO_LESSONS.md](../scripts/storyboards/VIDEO_LESSONS.md) - **Seedance 2.0 默认规则库**。S-A-C-S 结构、@引用、负面约束、5 秒分段、物理反馈都以此为准。
*   [../scripts/storyboards/COMBAT_SOP.md](../scripts/storyboards/COMBAT_SOP.md) - **Seedance 2.0 打斗流程**。负责把规则变成稳定交付步骤。
*   [../scripts/storyboards/top10_rank09_顾栖月.md](../scripts/storyboards/top10_rank09_顾栖月.md) - **黄金案例**。顾栖月百丈漈 Solo 是当前已验证通过的 `Seedance 2.0` 样板。
*   [../cast/](../cast/) - **人物全量档案 (JSON)**。
*   [../bibles/WORLD.md](../bibles/WORLD.md) - **世界规则与排名 (SSOT)**。
*   [../episodes/FINAL_SCRIPT_FORMAT.md](../episodes/FINAL_SCRIPT_FORMAT.md) - **15s 脚本唯一模板**。

## 🛠️ 创作流

1.  **查阅手册**：打开 [CREATIVE_BIBLE.md](CREATIVE_BIBLE.md) 确认当前视觉与动作红线。
2.  **平台优先级**：默认按 [../scripts/storyboards/VIDEO_LESSONS.md](../scripts/storyboards/VIDEO_LESSONS.md) 的 `Seedance 2.0` 规则工作，只有明确需要时才退回 Veo / 即梦。
3.  **获取人设**：在 [../cast/](../cast/) 目录下读取目标角色的 JSON。
4.  **确认地点**：在 [../bibles/WORLD.md](../bibles/WORLD.md) 确认地理环境逻辑。
5.  **对照黄金案例**：涉及 Solo / 打斗 / 高动态镜头时，优先参考 [../scripts/storyboards/top10_rank09_顾栖月.md](../scripts/storyboards/top10_rank09_顾栖月.md)。
6.  **生成脚本**：按照 [../episodes/FINAL_SCRIPT_FORMAT.md](../episodes/FINAL_SCRIPT_FORMAT.md) 的 15s 结构输出，再转为 `Seedance 2.0` 可投喂版本。

---
*Created for Father (老爹) by Agent Center.*
