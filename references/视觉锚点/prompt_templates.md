# 《沸腾之雪》生图 Prompt 模板库

> 经过测试的稳定出图公式，直接用，不用抽卡。

---

## 🎭 模板一：电影冷色调武侠（项目主风格）

适合：人物定妆照、战斗场景、角色宣传图

```
ultrarealistic photography, young beautiful Chinese woman,
delicate oval face, large bright double-eyelid almond eyes with natural lashes,
high delicate nose bridge, full soft pink lips, glass skin with natural glow,
[发型描述],
ethereal wuxia goddess vibe.
[服装描述].
[场景描述], cold blue moonlight, single warm lantern side glow, light snowfall.
85mm portrait lens f/1.8, 35mm film grain, cinematic low-key lighting,
high contrast, physically realistic fabric texture.
NOT anime, NOT illustration, NOT CGI, photorealistic.
```

**关键词解析：**
- `glass skin` — 发光透亮肌必备
- `85mm portrait lens f/1.8` — 人像镜头景深，背景虚化
- `double-eyelid` — 明确双眼皮
- `NOT anime, NOT illustration` — 防出动漫风

---

## 🏮 模板二：复古胶片古风（小红书爆款风格）

适合：小红书宣推图、壁纸、人物氛围图

```
vintage film photography, obvious 35mm film grain, retro color grade, Fuji film filter warm tones.
A young beautiful Chinese woman, delicate face, large double-eyelid eyes, soft lips slightly parted,
jet black long hair in loose ancient updo with slightly disheveled strands,
[发饰描述].
Wearing [服装描述].
[场景描述], heavy snowfall, ancient Chinese imperial palace architecture glowing gold in background.
Strong Rembrandt side lighting, contre-jour backlight,
high contrast dark shadows with overexposed white highlights,
white and gold color elements against dark background.
Slow shutter motion blur on snowflakes, shallow depth of field bokeh,
dreamlike hazy beauty, Chinese dreamcore aesthetic, Liaozhai ghostly mood.
Full body shot from unusual low angle. 9:16 portrait.
```

**关键词解析：**
- `Fuji film filter` — 富士复古滤镜
- `Rembrandt light + contre-jour` — 伦勃朗+逆侧光组合
- `Chinese dreamcore / Liaozhai mood` — 中式梦核/聊斋氛围
- `slow shutter motion blur` — 雪花模糊动感
- `unusual low angle` — 奇特低角度视角

---

## 💪 模板三：帅哥武侠（男性角色）

适合：慕北歌、欧阳狂徒等男性角色定妆

```
ultrarealistic photography, young handsome Chinese man,
chiseled jawline, sharp defined masculine features, deep-set eyes,
strong nose bridge, [发型描述],
powerful imposing wuxia warrior vibe.
[服装描述].
[场景描述].
85mm portrait lens f/2.8, 35mm film grain, dramatic low-key side lighting,
deep shadows, physically realistic fabric and skin texture.
NOT anime, NOT illustration, photorealistic.
```

**关键词解析：**
- `chiseled jawline` — 刚毅下颌线
- `sharp defined masculine` — 立体硬朗感
- `dramatic low-key side lighting` — 戏剧性侧光

---

## 📐 通用发型参考词

| 发型 | 英文描述 |
|------|---------|
| 直刘海长直发 | straight-cut bangs, long straight black hair flowing past shoulders |
| 半扎高马尾 | half-up high ponytail with loose strands framing face |
| 高髻+发簪 | high bun with jade hairpin, a few loose strands |
| 乱发凌乱感 | slightly disheveled loose updo with wispy strands |
| 单侧垂发 | loose low side bun with one long strand flowing down |

---

## ⚙️ 模型选择

| 场景 | 模型 | 原因 |
|------|------|------|
| 定妆照/壁纸 | `imagen-4.0-ultra-generate-001` | 写实度最高 |
| 快速预览 | `gemini-3.1-flash-image-preview` | 速度快省配额 |
| edit 换装 | Gemini Flash（edit_image默认） | edit 不支持 Imagen |

---

## 🎬 从高质量 Prompt 提取的电影美学升级要素

> 来源：法式复古咖啡馆 prompt 拆解，可迁移到武侠电影场景

### 📷 相机设备参数（提升质感的关键）

| 参数 | 效果 | 武侠迁移写法 |
|------|------|------------|
| `Hasselblad X2D II 100C medium format` | 中画幅相机感，细节极丰富 | 直接加入 prompt |
| `XCD 90mm f/2.5 prime lens` | 定焦人像感，背景虚化优雅 | `90mm prime lens f/2.5` |
| `B0026556.3FR` | 哈苏颜色科学，色彩分级 | `Hasselblad color science` |

### 💡 光线体系（四层光打法）

原版：`伦勃朗光 + 发丝光 + 脸部光 + 侧身光`

武侠迁移版：
```
Rembrandt lighting on face,
hair rim light separating strands from background,
soft side face fill light,
full body side contour light,
strong light-shadow contrast with gradient transitions
```

特别注意：**发丝光（hair rim light）** 是让头发真实有层次感的关键，之前的 prompt 缺这个！

### 💇 头发质感（之前出图头发糊的原因）

原版核心词：`棕褐色长发，发丝分离度高，有点纷乱却很有美感`

武侠版：
```
jet black long hair with HIGH STRAND SEPARATION,
individual hair strands clearly visible,
naturally disheveled yet beautiful,
hair rim backlight highlighting each strand
```

### 🪟 光影图案（条纹光/斑驳光）

原版：百叶窗条纹光

武侠迁移：
```
bamboo shadow stripes across skin and fabric,
lattice window light patterns on face,
dappled tree shadow light on ground
```

### 🪞 表面反射（场景更真实的秘诀）

原版：桌面清晰反射出杯子、手机和人影

武侠迁移：
```
wet stone floor clearly reflecting character silhouette and lantern glow,
puddle reflection of character in foreground,
polished weapon surface reflecting scene
```

### 🧍 姿势与构图细节

原版：`双肘伏桌，双手支下巴，坐窗边偶尔望外`——一个动作描述十几个细节

武侠改进：不要只写"standing"，要写具体姿势：
```
one hand resting on sword hilt,
other hand slightly raised in guard position,
weight shifted to left foot,
gaze directed slightly off-camera to the right
```

### 📐 升级版武侠人物 Prompt 框架

```
[相机] Hasselblad medium format camera simulation, 90mm prime lens f/2.5, Hasselblad color science,
[人物] [具体五官描述], [发型+发丝分离度], [服装细节],
[姿势] [具体姿态描述，不少于3个动作细节],
[光线] Rembrandt lighting, hair rim light for strand separation, face fill light, side body contour,
[场景] [环境], [光影图案如竹影/格窗光], [地面反射],
[技术] 35mm film grain, high contrast gradients, shallow depth of field bokeh,
[禁止] NOT anime, NOT illustration, photorealistic
```


---

## 🔥 小红书爆款AI古风美女·核心词汇库

> 来源：小红书爆款内容拆解 + 网络资料整理

### 五官精描关键词（区分档次的细节）

```
# 眼部
phoenix eyes with slightly upturned outer corners (凤眼)
willow-leaf arched eyebrows (柳叶眉)
double eyelids, natural fold (双眼皮)
long natural curved lashes (自然卷翘睫毛)
bright clear iris catching light (眼神有光)

# 肤质
三白法 face makeup: bright forehead, nose bridge, chin
vermilion cheek rouge blending (朱砂晕染腮红)
glass skin luminous glow (玻璃肌)
visible fine pores (非滤镜感)
```

### 中国美学光影词（与西方光影不同）

```
月华渲染 moonlight rendering — not cold blue filter, layered translucent mist
烛光暖晕 candlelight halo — warm amber light diffusing through sheer fabric
丁达尔体积光 Tyndall volumetric light through fabric
敦煌壁画晕染 Dunhuang mural gradients on face
丝线光漫射 silk thread light diffusion — gold thread shimmering in candlelight
```

### 服饰精描关键词（提升服装真实感）

```
silk fabric with natural gravity drape and wind resistance (布料物理垂感)
visible embroidery thread texture (刺绣线迹可见)
17.5-degree side slit on Song-dynasty beizi (宋代褙子)
Tang-dynasty qi-xiong ruqun shoulder strap angle (齐胸襦裙肩带)
layered translucent outer garment over inner robe (层叠纱衣)
gold hairpin catching candlelight with subtle vibration (发钗微动)
```

### 发型精描关键词

```
ink-black hair flowing like dyed silk (发丝如墨染)
cloud-bun hairstyle (云鬓)
phoenix crown headdress (凤冠)
jade ornament pin (玉簪)
flowing silk hair ribbon (绸带发带)
individual strand separation with rim backlight (发丝分离度)
wisps framing temples (鬓发散逸)
```

### 场景氛围词（中式意境）

```
skirt hem sweeping across bluestone pavement (裙裾拂青石)
sandalwood incense lingering (檀香萦绕)
Return corridor lamp light (回廊提灯)
江南水乡薄雾 Jiangnan water town morning mist
千里江山图 style landscape scroll background
```

