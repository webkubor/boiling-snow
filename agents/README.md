# 沸腾之雪 Agent 创作中心 (Agent Center)

> **欢迎来到 Agent 创作中心**。这里是所有 AI Agent 进行剧本创作、分镜设计、视觉生成的统一调度站。

## 📖 SSOT 体系（唯一数据源）

| 数据类型 | 唯一口径文件 | 禁止重复维护 |
|----------|-------------|-------------|
| 世界观 / 天榜 / 势力 | `bibles/WORLD.md` | ❌ 不另建排行文件 |
| 角色数据 | `cast/*.json`（18个JSON） | ❌ 不另建百科全书 |
| 武器物理 | `bibles/WEAPONS.md` | ❌ 不在其他文件重写武器属性 |
| 视频规则 | `scripts/storyboards/VIDEO_LESSONS.md` | ❌ 不另建规则文件 |
| 打斗流程 | `scripts/storyboards/COMBAT_SOP.md` | — |
| 旁白文案标准 | `bibles/VOICEOVER.md` | — |
| 创作红线 | `agents/CREATIVE_BIBLE.md` | — |

## 📁 导航

**SSOT 核心**
- [../bibles/WORLD.md](../bibles/WORLD.md) — 世界规则与排名
- [../bibles/WEAPONS.md](../bibles/WEAPONS.md) — 神兵谱（武器物理唯一口径）
- [../bibles/VOICEOVER.md](../bibles/VOICEOVER.md) — Solo 视频旁白文案标准
- [../cast/](../cast/) — 人物全量档案（JSON，唯一数据源）

**规则与流程**
- [CREATIVE_BIBLE.md](CREATIVE_BIBLE.md) — 创作红线：视觉、动作、镜头、环境
- [../scripts/storyboards/VIDEO_LESSONS.md](../scripts/storyboards/VIDEO_LESSONS.md) — 视频规则库（Seedance 2.0）
- [../scripts/storyboards/COMBAT_SOP.md](../scripts/storyboards/COMBAT_SOP.md) — 打斗脚本生成流程
- [../scripts/storyboards/top10_rank09_顾栖月.md](../scripts/storyboards/top10_rank09_顾栖月.md) — 黄金案例（已验证）

**Skills（可复用生产模块）**
- [../skills/视频打斗戏/SKILL.md](../skills/视频打斗戏/SKILL.md) — 15秒打斗脚本生成规则
- [../skills/人设模板/SKILL.md](../skills/人设模板/SKILL.md) — 角色 JSON 结构规范
- [../skills/镜头美学/SKILL.md](../skills/镜头美学/SKILL.md) — 镜头偏好收集与 Camera Prompt 生成

## 🛠️ 创作流

1. **查红线**：读 [CREATIVE_BIBLE.md](CREATIVE_BIBLE.md) 确认视觉与动作规则
2. **读人设**：从 [../cast/](../cast/) 取目标角色 JSON
3. **查世界**：从 [../bibles/WORLD.md](../bibles/WORLD.md) 确认地理与势力逻辑
4. **查武器**：从 [../bibles/WEAPONS.md](../bibles/WEAPONS.md) 确认武器物理特性
5. **写脚本**：按 [VIDEO_LESSONS.md](../scripts/storyboards/VIDEO_LESSONS.md) 的 S-A-C-S 结构输出 Seedance 2.0 版本
6. **对照黄金案例**：参考 [top10_rank09_顾栖月.md](../scripts/storyboards/top10_rank09_顾栖月.md)

---
*Created for Father (老爹) by Boiling Snow Team.*
