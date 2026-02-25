# 《沸腾之雪》视觉圣经 (VISUAL BIBLE v3.0)

> **核心原则**：拒绝页游感，拥抱电影感。每一帧都必须具备“物理真实”。

---

## 1. 视觉红线 (Visual Red Lines) - **最高禁令**

- **【禁甲令】 (No Armor)**：在《沸腾之雪》的视觉设定中，江湖人（包括所有天榜高手和主角团）**严禁穿戴盔甲**（包括硬甲、板甲及各种软甲）。服化道应以丝绸、布料、皮革、皮草（如狼毫、狐裘）为主，强调江湖侠客的随性与利落质感。
- **【女性身段令】 (Form-fitting Female Clothing)**：所有女性江湖角色（如顾栖月、慕夕歌、燕照绫等）的服装设计必须遵循“**轻盈且勾勒身段**”的原则。剪裁应修身、利落，通过丝绸、薄纱、细革等轻质材料体现身姿。**严禁厚重、臃肿或掩盖身形曲线的设计**，确保美感与高武武侠的敏捷感并存。
- **【禁人像合成】**: 对于非人像任务（技术封面、背景、静物），严禁调用 `generate_xhs_image`。
- **【禁骨相漂移】**: 凡涉及特定人设（小烛、苏梦城等），严禁 Text-to-Image 凭空生成，必须锁定 `references/character_anchors/` 下的底稿进行 `edit_image`。
- **【强制上传】**: 所有生成的图像必须产出最终的 HTTPS 链接并归档至相应 assets 目录。

---

## 2. 图像生成路由矩阵 (Routing Matrix)

| 场景需求 | 推荐工具 | 强制参考/约束 | 归档路径 |
| :--- | :--- | :--- | :--- |
| **小烛助理人像** | `edit_image` | `docs/ucd/persona_refs/` | `~/Desktop/xhs-output/` |
| **特定 IP 角色** | `edit_image` | `references/character_anchors/` | 项目对应 `assets/` |
| **纯技术/设计封面** | `generate_image` | `zero humans, zero faces` | `~/Documents/juejin/assets/` |
| **非特定高颜值人像** | `generate_xhs_image` | N/A | `~/Desktop/xhs-output/` |

---

## 3. 标准指令模版 (Prompt Template)
- **技术类**: `[Subject], isometric 3D render, frosted glass elements, Juejin Blue palette, zero humans, 8k.`
- **IP 角色类**: `[Character Anchor], same facial features as reference, perfect neat eyebrows, [Outfit Mandates], [Environment Action], low-key lighting, 35mm film grain, realistic wuxia style.`

---

## 4. 材质与光影 (Materials & Lighting)
- **自然光源**: 优先使用月光、火把、雪地反光、窗边侧光。禁止任何法阵、符文、神光。
- **低饱和度**: 颜色要沉下去，强调布料、金属、木材的原始质感。
- **妆容自然铁律 (Natural Makeup)**：严禁出现现代感强烈的夸张妆容。尤其是女性角色的腮红（红晕）必须极其自然、克制，呈现的是皮肤自然的透亮感或极淡的健康色泽，严禁出现“高原红”或大面积不自然的红色。保持真实的皮肤纹理、毛孔和微小的自然瑕疵。
- **体积光 (Volumetric Light)**：雪中的丁达尔效应，光束必须能看见风雪的流动。
- **古代器物规范 (Historical Accuracy)**：严禁出现任何现代结构的伞（如自动折叠伞、金属骨架伞）。所有场景中的伞必须是**古代油纸伞 (Traditional Oil-paper Umbrella)**。
- **严禁现代衣物细节 (No Modern Details)**：严禁出现任何形式的**现代丝袜 (Stockings/Pantyhose)**、现代袜装或现代内衣边。严禁出现任何形式的**连体衣 (Jumpsuits/One-piece suits)**、拉链、现代排扣。女性角色的腿部展现必须是**纯粹的瓷白皮肤质感**，或者是古代形制的**丝绸衬裤 (Silk Trousers/Leggings)**。
- **古代服装结构 (Traditional Construction)**：所有服装（尤其是皮革、兽皮类）必须符合古代制衣逻辑：**分体剪裁、系带、束腰、布扣或交叉掩襟**。强调材质的天然纹理（如手工缝线、粗粝皮缘）。严禁出现任何连体衣 (Jumpsuits)、现代拉链、现代排扣。
- **古代鞋履铁律 (Ancient Footwear)**：严禁出现现代结构的靴子（如厚底、现代高跟、工业化橡胶底、拉链皮靴）。鞋履必须是**古代软皮胡靴 (Soft Leather Xue/Boots)**、**千层底布鞋**或**草鞋**。胡靴应呈现为软质皮革或兽皮手工缝制，**平底或传统层底**，通过皮革系带（Cords）缠绕固定，鞋身无现代工业硬质支撑结构。
- **乐器持握铁律 (Instrument Posture)**：严禁混淆笛与箫。
顾栖月使用的为**横笛 (Transverse Flute)**，必须**横向持握**或**横向吹奏**。严禁出现竖持笛子的错误动作。

---
**版本**: V3.0 (2026-02-25)  
**更新记录**: 
- 新增【禁甲令】
- 新增【女性身段令】
- 统一路由至 `references/character_anchors/`
