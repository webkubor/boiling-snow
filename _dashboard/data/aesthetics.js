const aestheticBible = {
    title: "视觉与美学圣经 (Visual & Aesthetic Bible)",
    version: "v5.0",
    philosophy: "物理真实 > 视觉华丽。拒绝页游感，拥抱电影级暴力美学。",
    directives: [
        { name: "【禁甲令】", desc: "严禁盔甲，衣着以丝绸、皮革、皮草为主，强调随性与利落。" },
        { name: "【女性身段令】", desc: "服装必须修身利落，勾勒曲线，体现敏捷感。" },
        { name: "【神兵不离身】", desc: "神兵严禁在构图中截断，应展示武器的延伸感。" },
        { name: "【左右手物理逻辑】", desc: "主手持兵，副手握鞘或结剑指，区分剑与鞘。" }
    ],
    environment: "风雪即角色。粒子奇观、真空旋涡、真实踏雪深坑感。",
    technical: "8K, Dolby Vision, 2.39:1 电影宽画幅。"
};

const aiInstructions = [
    {
        name: "电影冷色调武侠 (主风格)",
        prompt: "ultrarealistic photography, [FACE LOCK], cold blue moonlight, single warm lantern side glow, light snowfall, 85mm portrait lens f/1.8, 35mm film grain, low-key lighting."
    },
    {
        name: "复古胶片感 (宣推风格)",
        prompt: "vintage film photography, obvious 35mm film grain, retro color grade, Fuji film filter, heavy snowfall, Rembrandt side lighting, dreamlike hazy beauty."
    },
    {
        name: "极端特写 (情感爆发)",
        prompt: "[ECU], eyes only reflecting killing intent, tight grip on sword hilt, high contrast, visible fine pores, silk thread light diffusion."
    }
];

const cinematicDirectives = [
    { name: "动量守恒", desc: "画面严禁死板站立，必须保持惯性移动或残影滑行。" },
    { name: "打击卡点", desc: "0.5s 慢放 + 极速回正的弹性节奏。" },
    { name: "以刃为眼", desc: "镜头贴合武器轨迹运动，如跟刀拍摄或环绕枪尖。" }
];
