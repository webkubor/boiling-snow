# 《沸腾之雪》(Boiling Snow) Agent 创作中心

> **唯一创作入口**：[agents/README.md](agents/README.md)

为了确保 15s 视频脚本的设定一致性，请务必直接访问 **[Agent 创作中心 (agents/)](agents/README.md)**。

---

## 1. 核心创作导航 (The Optimal Path)

为了实现最高效的创作，所有生产资源已物理整合在 **[agents/](agents/)** 目录下：

| 资源名称 | 唯一事实来源 (SSOT) | 说明 |
| :--- | :--- | :--- |
| **创意法典** | [agents/CREATIVE_BIBLE.md](agents/CREATIVE_BIBLE.md) | 视觉、动作、镜头、环境的**最高准则**。 |
| **Prompt 资产库** | [agents/PROMPT_LIBRARY.md](agents/PROMPT_LIBRARY.md) | 沉淀好的视觉公式、场景矩阵、调参后缀. |
| **脚本模板** | [agents/SCRIPT_TEMPLATE.md](agents/SCRIPT_TEMPLATE.md) | 15s 视频脚本生成的**唯一格式**。 |
| **人物全量档案** | [cast/](cast/) | 角色 JSON 数据（性格、背景、冲突）。 |
| **世界观/排名** | [bibles/WORLD.md](bibles/WORLD.md) | 势力格局与天榜排名。 |

---

## 2. 关键非天榜角色 (Key Non-Tianbang Characters)

除天榜十强外，以下角色在各方势力中扮演着核心角色，创作时需重点解析其 JSON 档案：

*   **西燕攻坚**：[图门](cast/图门.json) (碎星锤/重装骑兵)、[拓跋乌兰](cast/拓跋乌兰.json) (蝎尾刺/西燕之影)。
*   **北荒部族**：[拓跋烈](cast/拓跋烈.json) (苍狼部首领/斩狼连枷)。
*   **权力中心**：[温小婉](cast/温小婉.json) (南楚皇后/北荒血脉)。
*   **江湖奇人**：[宁观尘](cast/宁观尘.json) (游侠道士/木剑)。
*   **孤山传承**：[慕夕歌](cast/慕夕歌.json) (问雪剑/灵动师妹)。

---

## 3. AI 工具协作准则 (Tool Collaboration SOP)

为了保证《沸腾之雪》的视觉质量与角色一致性，所有指令输出必须遵循以下分工：

### 1) 职能分工表
- **Veo 3.1 (Google)**: **高阶视频与原生音效工具**。侧重于 4K 高画质、精细镜头控制（Dolly-in/Tracking）、 原生音效同步（SFX）。
- **Jimeng (即梦)**: **常规视频生成工具**。侧重于快速动态捕捉和镜头衔接。**统一指令格式**：必须使用“一行流（Single Line）+ 时间锚点（如 [00:00-03:00]）+ 动态描述 + 电影质感后缀”的格式。禁止换行。
  - **示例**: `15秒电影镜头，主体描述，[00:00-05:00]镜头动态1，[05:00-10:00]镜头动态2，[10:00-15:00]镜头动态3。电影质感后缀。`

#### 🎭 角色电影海报通用模板 (V2.0 锁定版)
**用途**：制作极具视觉冲击力的角色面部特写海报。单变量（仅替换【角色名字】）。
**指令原文**：`一张极具视觉冲击力的中国武侠电影海报。画面聚焦于人物面部特写，一道冷冽侧逆光从右上方勾勒脸部坚毅轮廓。背景深邃模糊，带有古朴砖墙与飞溅水墨痕迹，光影对比强烈营造肃杀氛围。海报主标题《【角色名字】》采用凌厉行草书体，带有古朴金属铸纹质感，嵌入人物左肩负空间。副标题“沸腾之雪”以沉稳宋体排布于标题下方。黄金分割构图，顶级影视海报设计感，电影级8K分辨率，超现实细节。16:9比例。`

- **Midjourney (MJ)**: **意境与大景海报工具**。
- **Nanobanana**: **角色一致性工具**。

### 2) Veo 3.1 专用 Prompt 公式
采用五段式结构：**[镜头/运镜] + [主体细节] + [核心动作] + [环境背景] + [风格/音效]**。
- **示例**: `Cinematic dolly-in, Southern Chu army in black armor, marching forward through rain, Danyang stone gates, 35mm film grain. SFX: Heavy rain and metallic clashing.`

### 3) 视觉禁令 (Visual Hard Rules)
- **建筑风格**: 严禁出现西式城堡（Castle/Cathedral）。必须使用中式城池、歇山顶、青砖、关隘。
- **文字处理**: MJ/即梦中严禁强求写对汉字，应后期通过 PS 或脚本叠加。
- **视觉符号**: 
  - 南楚 = 黑金、秩序、冷雨、长枪、绸缎旗帜。
  - 西燕 = 铜革、暴力、黄沙、重刃、破损皮旗。
  - 北荒 = 白雪、苍凉、黑灰、补丁皮袄、石质孤城。
- **审美底线**: 拒绝高饱和度滤镜，追求 35mm 电影胶片感，自然肤质。

### 4) 物理文档操作规范 (Surgical Edit SOP) [MANDATORY]
- **严禁暴力覆盖**: 除非新建或老爹授权，禁止使用 `write_file` 整体重写已有复杂文档。
- **Read-Before-Write**: 修改前必先读取上下文（`read_file`）或搜索锚点（`grep`）。
- **精准插入/替换**: 必须使用 `replace` 进行增量修改。
- **原子性保护**: 严禁在修改过程中意外删除、泄露或篡改任何既有的逻辑、设定或检索规则。

## 4. 创作流 (Workflow)

1.  **查阅手册**：在 [agents/CREATIVE_BIBLE.md](agents/CREATIVE_BIBLE.md) 确认视觉、动作、镜头红线。
2.  **获取人设**：在 [cast/](cast/) 读取 JSON 档案。
3.  **确认环境**：在 [bibles/WORLD.md](bibles/WORLD.md) 确认地理逻辑。
4.  **执行输出**：按照 [agents/SCRIPT_TEMPLATE.md](agents/SCRIPT_TEMPLATE.md) 格式输出。

---
*Created by Agent Center for Father (老爹).*
