# 第12集《旧梦北荒：兵锋将至》视觉素材生成指南

## 项目标准参数
```javascript
{
  aspectRatio: "21:9",  // 电影宽幅
  model: "gemini-3-pro-image-preview",  // Gemini 3 Pro 图像预览
  negative: "NO characters, NO CGI look, NO text, NO modern elements, NO glowing effects"
}
```

## 一、顾栖月噩梦惊醒（场景1）

### 1.1 噩梦惊醒特写
```javascript
generate_image({
  prompt: "Close-up shot of Gu Qiyue's face, waking up from nightmare in dim morning light, cold sweat on forehead, terrified expression, hair slightly messy, wearing simple silk sleeping robe, 35mm film aesthetic, grainy texture, high dynamic range, deep moody shadows, desaturated cinematic tones, authentic Han Dynasty style interior, bedside jade flute visible",
  aspectRatio: "21:9"
})
```

### 1.2 北荒噩梦闪回（15年前）
```javascript
generate_image({
  prompt: "Nightmare flashback: Northern wilderness snowstorm, war-torn village, distant cavalry silhouettes, burning houses, refugee children crying, 35mm film aesthetic, grainy texture, high dynamic range, cold blue tones, blurry motion effect, chaotic composition, authentic ancient China war scene",
  aspectRatio: "21:9"
})
```

## 二、西燕大漠铁骑出征（场景4）

### 2.1 西燕铁骑全景（黎明）
```javascript
generate_image({
  prompt: "Epic wide shot: 5000 heavy cavalry of Western Yan at dawn in Gobi desert, black iron armor, blood-red flags with '燕' character, horses with black leather armor, dust rising from hooves, low-angle morning sun casting long shadows, 35mm film aesthetic, grainy texture, high dynamic range, desaturated yellow-brown tones, war atmosphere, authentic ancient Chinese cavalry",
  aspectRatio: "21:9"
})
```

### 2.2 图门将军特写
```javascript
generate_image({
  prompt: "Close-up: General Tumen on black warhorse, holding Meteor Hammer, rough face with steel-like beard, black heavy armor with Western Yan insignia, fierce eagle-like eyes, dawn light on face, 35mm film aesthetic, grainy texture, high dynamic range, authentic ancient Chinese general, desert background",
  aspectRatio: "21:9"
})
```

### 2.3 骑兵阵列细节
```javascript
generate_image({
  prompt: "Detailed shot: Western Yan cavalry line, iron masks covering faces, only eyes visible, long spears forming forest, horse hooves kicking up yellow sand, morning light reflecting on armor, 35mm film aesthetic, grainy texture, high dynamic range, war preparation scene",
  aspectRatio: "21:9"
})
```

### 2.4 铁骑冲锋（动态）
```javascript
generate_image({
  prompt: "Dynamic action shot: Western Yan heavy cavalry charging, horses galloping at full speed, dust cloud behind, flags fluttering violently, low camera angle from ground, sense of speed and power, 35mm film aesthetic, motion blur effect, grainy texture, high dynamic range",
  aspectRatio: "21:9"
})
```

## 三、南楚雁门关大军出关（场景5）

### 3.1 雁门关全景
```javascript
generate_image({
  prompt: "Epic wide shot: Southern Chu army marching out of Yanmen Pass at dawn, 8000 silver-armored infantry in formation, 500 light cavalry on flanks, dark grey stone walls 30 meters high, heavy gate opening, morning mist lingering, crimson flags with '楚' character, 35mm film aesthetic, grainy texture, high dynamic range, cool silver-grey tones",
  aspectRatio: "21:9"
})
```

### 3.2 步兵方阵细节
```javascript
generate_image({
  prompt: "Medium shot: Southern Chu infantry phalanx, front row with giant shields like wall, middle row with long spears like forest, back row archers with full quivers, unified silver armor, synchronized steps kicking up dust, 35mm film aesthetic, grainy texture, high dynamic range, disciplined military formation",
  aspectRatio: "21:9"
})
```

### 3.3 朝廷将领特写
```javascript
{
  prompt: "Portrait: Southern Chu general on white horse, cold stern face with scar near eye, exquisite but practical armor, crimson cape, calculating gaze, behind him the Yanmen Pass gate, morning mist, 35mm film aesthetic, grainy texture, high dynamic range, authentic ancient Chinese imperial general",
  aspectRatio: "21:9"
}
```

### 3.4 大军行军长镜头
```javascript
generate_image({
  prompt: "Long tracking shot: Southern Chu army marching through mountain pass, silver river of soldiers winding through valley, uniform drumbeat pace, light cavalry scouting ahead, banners flowing in morning breeze, 35mm film aesthetic, grainy texture, high dynamic range, epic scale",
  aspectRatio: "21:9"
})
```

## 四、北荒百姓逃难（场景3）

### 4.1 难民逃难全景
```javascript
generate_image({
  prompt: "Northern wilderness border village, refugees fleeing with belongings, old people reluctant to leave ancestral homes, children crying, driving livestock, snowy landscape, distant smoke of approaching armies, desperate atmosphere, 35mm film aesthetic, grainy texture, high dynamic range, cold blue-grey tones",
  aspectRatio: "21:9"
})
```

### 4.2 老人与孩童
```javascript
generate_image({
  prompt: "Emotional shot: old man being carried by younger relative, looking back at ancestral home with tears, child clinging to mother's skirt, confused and scared, simple winter clothing, snow falling, 35mm film aesthetic, grainy texture, high dynamic range, human suffering in war",
  aspectRatio: "21:9"
})
```

### 4.3 慧明救助难民（侧面）
```javascript
generate_image({
  prompt: "Distant shot: Monk Huiming leading group of refugees toward Gushan mountain, snow-covered mountain path, monks assisting elderly and children, peaceful calm amidst chaos, Buddhist robes against white snow, 35mm film aesthetic, grainy texture, high dynamic range, compassionate scene",
  aspectRatio: "21:9"
})
```

## 五、孤山剑首抉择（场景7）

### 5.1 孤山脚下难民聚集
```javascript
generate_image({
  prompt: "Gushan mountain foot, hundreds of Northern wilderness refugees gathering, temporary shelters being set up, disciples of Gushan assisting, snow-covered pine trees, mountain mist, desperate but hopeful atmosphere, 35mm film aesthetic, grainy texture, high dynamic range",
  aspectRatio: "21:9"
})
```

### 5.2 慕北歌俯瞰难民
```javascript
generate_image({
  prompt: "Mu Beige standing at Gushan sword pavilion, looking down at refugee camp below, holding 'Ask Heaven' sword, conflicted expression, snow falling on black robes, isolated and burdened leader, 35mm film aesthetic, grainy texture, high dynamic range, moral dilemma moment",
  aspectRatio: "21:9"
})
```

### 5.3 慕夕歌照顾难民
```javascript
generate_image({
  prompt: "Mu Xige distributing blankets and food to refugee children, gentle smile, warm interaction, contrast between her youthful innocence and war's cruelty, simple hanfu, snow environment, 35mm film aesthetic, grainy texture, high dynamic range",
  aspectRatio: "21:9"
})
```

## 六、南北对比蒙太奇（场景6）

### 6.1 西燕黑潮特写组
```javascript
// 马蹄特写
generate_image({
  prompt: "Extreme close-up: Western Yan warhorse hoof kicking up yellow sand, iron horseshoe detail, dynamic motion, ground vibration, 35mm film aesthetic, grainy texture, high dynamic range",
  aspectRatio: "1:1"
})

// 铁甲反光
generate_image({
  prompt: "Close-up: black iron armor reflecting dawn light, detailed forging texture, Western Yan insignia, morning frost on metal, 35mm film aesthetic, grainy texture, high dynamic range",
  aspectRatio: "1:1"
})

// 军旗猎猎
generate_image({
  prompt: "Medium shot: blood-red '燕' flag violently fluttering in desert wind, tattered edges, worn fabric texture, against stormy sky, 35mm film aesthetic, grainy texture, high dynamic range",
  aspectRatio: "1:1"
})
```

### 6.2 南楚银流特写组
```javascript
// 步伐特写
generate_image({
  prompt: "Low angle close-up: Southern Chu infantry boots marching in unison, kicking up dust, detailed leather and iron construction, synchronized movement, 35mm film aesthetic, grainy texture, high dynamic range",
  aspectRatio: "1:1"
})

// 盾牌移动
generate_image({
  prompt: "Medium shot: giant rectangular shields of Southern Chu infantry moving as solid wall, iron reinforcements, wooden texture, unified motion, 35mm film aesthetic, grainy texture, high dynamic range",
  aspectRatio: "1:1"
})

// 长枪如林
generate_image({
  prompt: "Upward angle: forest of Southern Chu long spears against grey sky, iron spearheads glinting, wooden shafts, disciplined formation, 35mm film aesthetic, grainy texture, high dynamic range",
  aspectRatio: "1:1"
})
```

## 七、使用说明

### 7.1 生成命令（Python脚本）
```bash
# 使用项目脚本生成（推荐）
cd /Users/webkubor/Desktop/create/boiling-snow-film
python3 scripts/gen_image.py --prompt "你的prompt内容" --ratio 21:9 --model gemini-3-pro-image-preview
```

### 7.2 批量生成脚本
```bash
#!/bin/bash
# 批量生成第12集素材
cd /Users/webkubor/Desktop/create/boiling-snow-film

# 西燕场景
python3 scripts/gen_image.py --prompt "Epic wide shot: 5000 heavy cavalry of Western Yan at dawn in Gobi desert..." --ratio 21:9 --out "references/scenes/ep12/western_yan_cavalry.png"

# 南楚场景  
python3 scripts/gen_image.py --prompt "Epic wide shot: Southern Chu army marching out of Yanmen Pass at dawn..." --ratio 21:9 --out "references/scenes/ep12/southern_chu_infantry.png"

# 顾栖月场景
python3 scripts/gen_image.py --char gu_qiyue --scene "waking from nightmare" --outfit "simple silk sleeping robe" --out "references/scenes/ep12/gu_qiyue_nightmare.png"
```

### 7.3 视觉风格统一要点
1. **质感**：35mm film aesthetic, grainy texture
2. **色调**：desaturated cinematic tones
3. **光影**：high dynamic range, deep moody shadows
4. **时代**：authentic Han Dynasty style
5. **禁忌**：NO characters（除非特写），NO CGI look, NO text

### 7.4 输出目录结构
```
references/scenes/ep12/
├── western_yan/          # 西燕铁骑
│   ├── cavalry_panorama.png
│   ├── general_tumen.png
│   └── charging_detail.png
├── southern_chu/         # 南楚步兵
│   ├── yanmen_pass.png
│   ├── infantry_phalanx.png
│   └── general_portrait.png
├── northern_wilderness/  # 北荒难民
│   ├── refugees_fleeing.png
│   ├── old_man_tears.png
│   └── huiming_helping.png
└── gushan/              # 孤山场景
    ├── refugee_camp.png
    ├── mu_beige_conflict.png
    └── mu_xige_caring.png
```

## 八、优先生成顺序

1. **西燕铁骑全景** - 最具视觉冲击力
2. **南楚雁门关** - 对比场景
3. **顾栖月噩梦特写** - 个人线关键
4. **北荒难民逃难** - 百姓视角
5. **细节特写组** - 蒙太奇素材

---

**最后更新时间**：2026-03-15  
**对应集数**：第12集《旧梦北荒：兵锋将至》  
**生成工具**：Gemini 3 Pro Image Preview + nanobanana-plus
