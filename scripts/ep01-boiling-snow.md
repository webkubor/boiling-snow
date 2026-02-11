# 第一集：夏日悬念 (The Summer Hook)

## A. 场景上下文
*   **氛围**: 极度燥热，汗水与尘土的质感。
*   **剧情**: 市井酒客闲谈，引出“除夕雪山之巅”的惊世传闻，最后以“是谁”结尾。

## B. 分镜表格 (略 - 保持原样)

## C. AI 视频生成 (AI Video Generation)

> **首帧资产**: `ep01-start-signboard.png`
> **首帧生成命令**: 
> 电影级写实武侠镜头，特写。一面破旧的木头客栈牌匾在刺眼的烈日下暴晒，木头纹理清晰，表面的漆皮因高温而卷曲剥落。空气因热浪而产生强烈的扭曲波动，背景是模糊的边境荒漠。焦黄影调，高对比度，35mm胶片感，大师级画质。
>
> **尾帧资产**: `ep01-eye-reflection.png`
> **尾帧生成命令**: 
> 极端特写镜头，一个皮肤粗粝的成年男人的眼睛，眼神中充满极致的惊恐。瞳孔急剧收缩，瞳孔中心清晰地倒映出一朵晶莹剔透的白色雪花。睫毛上挂着汗珠，夕阳侧光勾勒出眼部的皮肤肌理。写实武侠电影风格，35mm胶片感，4k。
>
> **视频转换指令**: 
> 从 [首帧资产] 开始，镜头平滑地从暴晒的牌匾向下摇移进入客栈内部。画面中酒客们满头大汗地喧闹交谈。随着对话深入，环境色调迅速从焦黄转为冰冷的深蓝。最后镜头极速推进，死死锁定在 [尾帧资产] 的惊恐眼神特写上，瞳孔中的雪花微颤。

## D. 第一幕扩展版：12 段 x 15s AI 镜头提示词 (可直接用于生成)

> **总时长**: 180s (3min)
> **叙事结构**: 传说引子 -> 小人物视角 -> 三杰 Solo -> 命运交点
> **统一风格锚点**: 写实武侠电影感，35mm 胶片颗粒，冷暖对撞，体积光，真实材质，不要二次元，不要卡通。

### Shot 01 (00:00-00:15) - 传说开场
```text
Scene: 雪夜荒原，黑云压境，远处孤城灯火若隐若现。
Camera: Drone wide shot -> slow push in.
Action: 无人物，风卷雪尘，旌旗残破。
Style: Realistic wuxia cinema, cold blue-gray palette, volumetric moonlight, high dynamic range, 35mm film grain.
Audio: BGM《初雪·局中月》Intro，强风低频。
VO: 江湖有局，三人必有一战。
Duration: 15s
```

### Shot 02 (00:15-00:30) - 小人物登场
```text
Scene: 边城外土路，风雪交加。
Camera: Handheld medium shot tracking from behind -> side close-up.
Action: 驿卒抱紧油布信筒，踉跄奔走，频繁回头。
Style: Gritty realism, wet cloth texture, breath vapor visible, cinematic contrast.
Audio: 脚步踩雪、急促喘息、远处狼嚎。
Dialogue: 驿卒低声“今夜必达……”
Duration: 15s
```

### Shot 03 (00:30-00:45) - 茶肆传闻
```text
Scene: 城门茶肆，灯火昏黄，人声嘈杂。
Camera: Exterior-to-interior one-take, pass-by foreground silhouettes.
Action: 说书人拍醒木，众人侧耳，驿卒在门边停住。
Style: Warm interior vs cold exterior, smoke haze, practical lantern lighting.
Audio: 人群低语 + 木拍声。
Dialogue: 说书人“雪山之巅，三杰同夜现身。”
Duration: 15s
```

### Shot 04 (00:45-01:00) - 慕北歌 Solo
```text
Scene: 雪林空地，月色如霜。
Camera: Low-angle close-up on sword hilt -> whip pan to full-body.
Action: 慕北歌拔剑，一剑斩断飘落灯笼火线。
Style: Clean, sharp, restrained; white robe edge highlights; slow-motion sparks.
Audio: 金属出鞘 + 短促破风。
Dialogue: 慕北歌“剑出，不问旧名。”
Duration: 15s
```

### Shot 05 (01:00-01:15) - 欧阳狂徒 Solo
```text
Scene: 破败渡口木栈，浪拍冰岸。
Camera: Push-in from boots -> chest -> weapon close-up.
Action: 欧阳狂徒拖重刃前行，一击劈裂木桩。
Style: Heavy, brutal, strong shadow contrast, debris flying, wet wood splinters.
Audio: 重刃摩擦声 + 木裂爆响。
Dialogue: 欧阳狂徒“拦路者，断。”
Duration: 15s
```

### Shot 06 (01:15-01:30) - 南楚枪神（未揭身份）Solo
```text
Scene: 王府偏厅，烛火摇曳，棋盘半局。
Camera: Top-down chessboard -> macro on fingers placing piece.
Action: 南楚王府执棋人落子，门外侍卫立刻领命而去。
Style: Elegant but cold, black-gold costume accents, controlled motion.
Audio: 棋子落盘清脆声 + 低沉鼓点过门。
Dialogue: 执棋人“子落，局成。”
Duration: 15s
```

### Shot 07 (01:30-01:45) - 追杀起
```text
Scene: 城中窄巷，雨雪混杂，地面积水反光。
Camera: Handheld chase cam, rapid corner turns.
Action: 驿卒被黑衣人追杀，翻倒又起身，死护信筒。
Style: High tension, motion blur control, practical street fire.
Audio: 追逐脚步、短刀破空、心跳低频。
Dialogue: 驿卒“信在人在！”
Duration: 15s
```

### Shot 08 (01:45-02:00) - 三线并轨信号
```text
Scene: 雪林/渡口/王府 三地交叉剪辑。
Camera: Match-cut on同一枚黑色蜡印。
Action: 三人同时收到同样蜡印密令，神情各异。
Style: Cross-cut montage, unified symbol motif, rhythmic editing.
Audio: 同步“咔”一声印章音效，BGM进入推进段。
VO: 同夜，同印，同一场局。
Duration: 15s
```

### Shot 09 (02:00-02:15) - 赴局
```text
Scene: 三地外景快速并剪。
Camera: Horse mount shot / weapon lift close-up / cloak turn profile.
Action: 慕北歌上马、欧阳磨刃、南楚王府执棋人披氅出门。
Style: Heroic kinetic montage, medium-fast shutter for crisp action.
Audio: 鼓点增强，弦乐上行。
Dialogue: 无。
Duration: 15s
```

### Shot 10 (02:15-02:30) - 桥头围堵
```text
Scene: 古桥中央，风雪横切，桥灯摇晃。
Camera: Wide establishing -> rapid push to close-up.
Action: 驿卒被围堵，黑衣人步步压近。
Style: Strong depth perspective, lantern flicker, snow streaks.
Audio: 风声突然变窄，留出对白空间。
Dialogue: 驿卒“这封信，只能交给你们其中一人！”
Duration: 15s
```

### Shot 11 (02:30-02:45) - 三杰首次同框
```text
Scene: 桥头三方站位，雪幕中对峙。
Camera: 240-degree arc around triangle blocking.
Action: 三人不交手，只对视，各自一步定位。
Style: Mythic tension with realism, breath vapor and cloth flutter emphasized.
Audio: BGM短暂停顿后重击回归。
Dialogue: 慕北歌“剑只对该死之人。” 欧阳狂徒“我只信刀。” 执棋人“我只信结果。”
Duration: 15s
```

### Shot 12 (02:45-03:00) - 钩子收尾
```text
Scene: 桥头近景，雪地染红。
Camera: Extreme close-up on信封 -> rack focus to fallen hand.
Action: 暗箭突至，驿卒中箭倒地，密信滑入雪中，蜡印半裂。
Style: Dramatic final beat, color contrast (snow white / blood red), freeze-frame ending.
Audio: 弓弦破空 + 突然静默 + 一记低频轰鸣。
VO: 真相，今夜开封。
On-screen text: To Be Continued.
Duration: 15s
```
