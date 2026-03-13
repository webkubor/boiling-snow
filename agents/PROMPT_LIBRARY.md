# 《沸腾之雪》电影级场景扩展 Prompt 矩阵

## 定位

这份文档用于统一《沸腾之雪》的视觉语言。

核心公式：

- 锁定质感
- 极简构图
- 时代情绪

目标结果：

- 统一的实拍感电影质感
- 稳定的 21:9 宽画幅输出
- 适合持续扩展新场景，而不丢失整体风格

## 通用锁相公式

电影质感锁死句式：

```text
35mm film aesthetic, grainy texture, high dynamic range, authentic Han Dynasty style, deep moody shadows, desaturated cinematic tones. No characters, no CGI look, no text. 21:9 aspect ratio.
```

使用规则：

- 前半段写主体场景
- 后半段尽量固定，作为统一质感后缀
- 如果要调风格，优先改色调、曝光、构图，不轻易改电影质感主干

## 基础参数

默认参数：

```javascript
{
  aspectRatio: "21:9",
  model: "gemini-3-pro-image-preview"
}
```

推荐保留词：

- `35mm film aesthetic`
- `grainy texture`
- `high dynamic range`
- `deep moody shadows`
- `desaturated cinematic tones`
- `No characters, no CGI look, no text`

## 一、电影镜头场景矩阵

这组更适合：

- 概念海报
- 剧情分镜
- 世界观场景设定
- 文档插图

### 1. 丹阳夜雨

氛围定位：南楚、暗黑权谋、湿冷压迫感。

```javascript
generate_image({
  prompt: "A hyper-realistic cinematic 21:9 wide-angle shot of traditional Han Dynasty dark slate roof tiles under heavily pouring rain at night. Water splashing dramatically off the eaves in slow motion. Deep indigo and pitch black color grading with a very faint, distant warm lantern glow reflecting on the wet stone. 35mm film aesthetic, grainy texture, high dynamic range, tense Wuxia atmosphere. No characters, no CGI look, no text.",
  aspectRatio: "21:9",
  model: "gemini-3-pro-image-preview"
})
```

参考图：

```markdown
![](https://img.webkubor.online/roof-rain-21-9.png)
```

### 2. 幽寒竹林

氛围定位：杀机暗藏、冷雾压林、静中带险。

```javascript
generate_image({
  prompt: "A hyper-realistic cinematic 21:9 wide-angle shot of a dense, misty bamboo forest in ancient China. Tall, dark green bamboo stalks reaching into a thick, cold fog. Dim, diffused natural light filtering through the leaves creating moody, long shadows. 35mm film aesthetic, grainy texture, high dynamic range, desaturated cold tones. Eerie and desolate martial arts atmosphere. No characters, no CGI look, no text.",
  aspectRatio: "21:9",
  model: "gemini-3-pro-image-preview"
})
```

### 3. 铁血城池上

氛围定位：西燕、黑云压城、战争前夜。

```javascript
generate_image({
  prompt: "A hyper-realistic cinematic 21:9 wide-angle shot from the top of an ancient, weathered Han Dynasty city wall. Rain-slicked dark stone battlements overlooking a bleak, empty battlefield. Heavy, storm clouds gathering in the sky. Deep, moody shadows and cold slate tones. 35mm film aesthetic, grainy texture, high dynamic range, epic and heavy Wuxia atmosphere. No characters, no CGI look, no text.",
  aspectRatio: "21:9",
  model: "gemini-3-pro-image-preview"
})
```

### 4. 孤江渡口

氛围定位：河边埋伏、离别感、迟滞的危险。

```javascript
generate_image({
  prompt: "A hyper-realistic cinematic 21:9 wide-angle shot of a desolate ancient riverbank at deep dusk. A lone, rotting wooden ferry boat moored to a dead, twisted tree. Dark, slow-moving river water reflecting a bleak, overcast sky. Cold mist rolling off the water surface. Deep blue and slate gray tones. 35mm film aesthetic, grainy texture, high dynamic range, melancholic Wuxia atmosphere. No characters, no CGI look, no text.",
  aspectRatio: "21:9",
  model: "gemini-3-pro-image-preview"
})
```

### 5. 午后长街

氛围定位：风雨欲来前的死寂，偏暖但不明亮。

```javascript
generate_image({
  prompt: "A hyper-realistic cinematic 21:9 wide-angle shot of an empty, dusty ancient Han Dynasty street in the late afternoon. Tightly closed wooden doors, stark architecture, and faded hanging lanterns swaying slightly in the wind. Long, dramatic shadows cast by the harsh, low-angle sunlight. Desaturated warm tones with deep, pitch-black shadows. 35mm film aesthetic, grainy texture, high dynamic range, tense calm-before-the-storm atmosphere. No characters, no CGI look, no text.",
  aspectRatio: "21:9",
  model: "gemini-3-pro-image-preview"
})
```

## 二、暗色网页底图矩阵

这组更适合：

- 网站 Hero 背景
- 剧情介绍区底图
- 世界观板块背景
- 神兵谱 / 阵营页 / 大地图页铺底

统一控制目标：

- 整体偏暗，便于白字覆盖
- 构图极简，不抢排版
- 留出大片负空间，保证前端可读性

### 1. 北荒·幽暗冰渊

适用：整体大背板、世界观首页、北荒章节页。

```javascript
generate_image({
  prompt: "A cinematic 21:9 ultra-wide background image for a Wuxia website. Deep inside a massive, dark ice chasm. The jagged, translucent ice walls emit a faint, ghostly blue glow. Swirling snow and thick mist obscure the bottomless depth. Extreme 35mm film aesthetic, very dark and moody, high dynamic range but low exposure. No characters, no text, no distracting elements. Designed as a seamless, subtle website background. Photorealistic.",
  aspectRatio: "21:9",
  model: "gemini-3-pro-image-preview"
})
```

### 2. 南楚·丹阳夜雨

适用：天下棋局、剧情介绍、悬疑板块。

```javascript
generate_image({
  prompt: "A cinematic 21:9 ultra-wide background image. A close-up of traditional Han Dynasty dark slate roof tiles under heavily pouring rain at night. Water splashing dramatically off the eaves in slow motion. Deep indigo and pitch black color grading with a very faint, distant warm lantern glow reflecting on the wet stone. 35mm film grain, moody, desaturated. No characters, no text. Perfect for a clean, dark website hero background.",
  aspectRatio: "21:9",
  model: "gemini-3-pro-image-preview"
})
```

### 3. 西燕·铁血狼烟

适用：神兵谱、西燕阵营页、战场章节页。

```javascript
generate_image({
  prompt: "A cinematic 21:9 ultra-wide background image. A desolate battlefield at dusk in the Gobi desert. The ground is covered in black volcanic ash and shattered archaic weapons. Thick, dark smoke rising in the distance, contrasting with a blood-red horizon. Minimalist composition, deep shadows, 35mm film grain, ultra-realistic gritty textures. Very dark overall tone to support website text overlay. No living characters, no UI. 2.39:1 widescreen.",
  aspectRatio: "21:9"
})
```

### 4. 西燕·长河落日

适用：纯净大漠背板、大段文字铺底、阵营落地页。

```javascript
generate_image({
  prompt: "A cinematic 21:9 ultra-wide background image for a Wuxia website. Vast, wind-swept Gobi desert dunes at deep twilight. Minimalist composition focusing on the sweeping curves of the sand. Deep, pitch black shadows contrasting with a very faint, desaturated amber glow on the dune crests. Thick dust haze in the air. 35mm film grain, extremely moody and desolate atmosphere, low exposure. No characters, no buildings, no text. Photorealistic, seamless dark background.",
  aspectRatio: "21:9"
})
```

### 5. 北境·雪原古道

适用：长篇叙事铺底、北境地图页、路线板块。

```javascript
generate_image({
  prompt: "A cinematic 21:9 ultra-wide background image for a Wuxia website. A vast snow-covered wilderness road disappearing into blowing white frost. Bare black tree trunks and broken wooden posts barely visible through the storm. Extremely minimalist composition with large negative space, low exposure, deep blue-gray shadows, subtle 35mm film grain, photorealistic and bleak. No characters, no buildings, no text.",
  aspectRatio: "21:9"
})
```

### 6. 寒江·冰河残舟

适用：埋伏感页面、过渡章节、夜景底图。

```javascript
generate_image({
  prompt: "A cinematic 21:9 ultra-wide background image for a Wuxia website. A frozen river at night with fractured ice sheets and a half-buried abandoned wooden boat near the shore. Cold mist drifting low across the surface, deep charcoal blues and muted steel tones, almost no highlight except a faint reflected moon glow. 35mm film grain, very dark and moody, photorealistic, clean composition for text overlay. No characters, no text.",
  aspectRatio: "21:9",

})
```

### 7. 孤关·冷月石阶

适用：宗门页、门派介绍、压迫感章节背景。

```javascript
generate_image({
  prompt: "A cinematic 21:9 ultra-wide background image for a Wuxia website. Ancient stone steps ascending into darkness beneath a cold moonlit sky. Wet black stone, faint fog drifting over the edges, a near-silhouette mountain gate barely visible at the top. Minimalist framing, heavy negative space, deep shadows, desaturated cold tones, 35mm film grain, photorealistic and oppressive. No characters, no text, no decorative clutter.",
  aspectRatio: "21:9",

})
```

## 三、调参速查

### 色调控制

- 冷青调：`cold slate tones`
- 褪色暖调：`desaturated warm tones`
- 极寒幽蓝：`ghostly blue glow`, `deep blue-gray shadows`
- 焦土血暮：`blood-red horizon`, `black volcanic ash`

### 暗部控制

- 更适合网页铺字：`very dark and moody`, `low exposure`, `deep shadows`
- 增加留白留黑：`negative space`, `minimalist composition`
- 降低干扰元素：`no distracting elements`, `clean composition for text overlay`

### 实拍感增强

- `subtle lens imperfections`
- `natural atmospheric depth`
- `real film exposure`
- `photorealistic`

## 四、扩展规则

如果后续继续补场景，直接套这个流程：

1. 先确定场景用途：电影镜头，还是网页底图。
2. 再确定气质基调：北荒冷蓝、南楚夜雨、西燕焦土、暮色暖灰。
3. 主体描述只写一个核心视觉，不要堆太多物件。
4. 最后统一接上电影质感与限制词。

## 五、使用建议

- 画幅统一使用 `21:9`
- 所有场景优先保持无人、无字、无 CGI 感
- 新场景扩展时，优先复用已有基调，不要随意漂移到另一种审美体系

---

## 六、剧情绑定场景矩阵（按集索引）

> 以下场景与具体剧集剧情强绑定，可直接用作当集空镜/转场/封面素材。
> 每条 prompt 已包含完整质感锁相句式，可直接调用。

---

### EP01 · 密信截杀 — 雨夜客栈外景

**戏剧功能**：开篇截杀空镜，建立"危机已至"的第一帧压迫感。

```javascript
generate_image({
  prompt: "A hyper-realistic cinematic 21:9 wide-angle shot of an isolated ancient Han Dynasty roadside inn at night during a heavy rainstorm. The inn's wooden signboard barely swings in the storm. Warm lantern light bleeds through cracked paper windows onto the flooded mud path outside. Fresh blood smeared down the door frame, barely visible in the rain. A shattered bowl on the doorstep. Deep indigo night sky, 35mm film grain, high dynamic range, heavy rain streaks catching the lantern light. No characters, no CGI look, no text.",
  aspectRatio: "21:9",
  model: "gemini-3-pro-image-preview"
})
```

---

### EP02 · 小师妹下山 — 孤山雪道

**戏剧功能**：时间闪回切入镜，建立北荒孤山视觉基调，脚印细节暗示"有人已离开"。

```javascript
generate_image({
  prompt: "A hyper-realistic cinematic 21:9 wide-angle shot of a remote mountain peak in deep northern winter. Bare black rocky cliff face, sparse ancient pine trees bent permanently by decades of relentless blizzard. A single narrow stone staircase descending into thick snowfall below, footprints in fresh snow leading downward — away from the summit. Heavy snowfall blurs the sky and valley below into formless white. Cold blue-white tones, 35mm film grain, high dynamic range, desolate and vast Wuxia atmosphere. No characters, no CGI look, no text.",
  aspectRatio: "21:9",
  model: "gemini-3-pro-image-preview"
})
```

---

### EP08 · 皇影入局 — 黑市暗坊入口

**戏剧功能**：宁观尘引慕夕歌入暗坊前的过场空镜，"红灯·铁门·深处暖光"三层递进建立江湖情报站氛围。

```javascript
generate_image({
  prompt: "A hyper-realistic cinematic 21:9 wide-angle shot of the entrance to an ancient Chinese underground black market at midnight. A narrow alley between weathered stone walls, a single red lantern hanging motionless above a heavy black lacquered door studded with iron. Worn wooden signboard barely legible. Wet cobblestones reflecting dim red lantern glow. Thick shadow beyond the threshold, faint warm amber light hinting at life within. 35mm film grain, high dynamic range, deep red and black tones, dense air of danger and secrecy. No characters, no CGI look, no text.",
  aspectRatio: "21:9",
  model: "gemini-3-pro-image-preview"
})
```

---

### EP10 · 暗坊索剑 — 夜间发榜墙

**戏剧功能**：集尾钩子空镜。慕夕歌看见"孤山剑首"刺杀悬赏那一刻的主观视角对位。最新白纸 vs 旧榜的视觉对比强化冲击感。

```javascript
generate_image({
  prompt: "A hyper-realistic cinematic 21:9 wide-angle shot of an ancient Chinese public notice board standing on a dark market street at night. Multiple layers of yellowed and torn wanted posters plastered across the board, the newest one freshly posted on top, still damp. Cold moonlight catching the edge of the fresh white paper. Iron nails pinning old curled posters. Deep indigo and ash-gray tones, 35mm film grain, high dynamic range, oppressive and ominous urban Wuxia atmosphere. No characters, no CGI look, no text.",
  aspectRatio: "21:9",
  model: "gemini-3-pro-image-preview"
})
```

---

### EP11 · 慧明出场 — 北荒暴雪山道

**戏剧功能**：慧明护人那一幕前的场景建立。红布条是唯一人迹，强调"越往深处越无人敢走"的险境感。

```javascript
generate_image({
  prompt: "A hyper-realistic cinematic 21:9 wide-angle shot of a blizzard-swept northern mountain pass. A narrow road flanked by dead, snow-laden black trees and jagged rock faces. The path ahead twists and disappears into a wall of howling white snow. On the roadside, a lone withered plum tree holds a single red cloth strip whipping violently in the gale. Heavy snow and brutal wind, extreme cold atmosphere, deep blue-white-gray tones, 35mm film grain, high dynamic range, photorealistic. No characters, no CGI look, no text.",
  aspectRatio: "21:9",
  model: "gemini-3-pro-image-preview"
})
```

---

### EP10/11 · 苏梦城宣战 — 王府演武堂

**戏剧功能**：苏梦城落锤"按战时规矩"那场戏的场景基底。兵器架与香炉烟气传递"刀已出鞘"的权力压迫感。

```javascript
generate_image({
  prompt: "A hyper-realistic cinematic 21:9 wide-angle shot of an ancient Chinese nobleman's private martial arts training hall at dusk. Dark polished stone tile floor, high arched wooden ceiling with iron hanging lamps casting amber pools. Weapon racks lining the wall — long spears, dao sabers — all immaculately kept. A single burning incense bowl on a stone pedestal in the center, thin smoke rising undisturbed. Desaturated warm amber and deep shadow tones, 35mm film grain, high dynamic range, low-key cinematography, powerful and oppressive atmosphere. No characters, no CGI look, no text.",
  aspectRatio: "21:9",
  model: "gemini-3-pro-image-preview"
})
```
