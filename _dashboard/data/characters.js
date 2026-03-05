// 《沸腾之雪》Boiling Snow | 天榜档案库
// 所有人物均为 Webkubor 旗下原创武侠 IP (Original Wuxia IP)
// 排序逻辑：剧情揭晓时间线 (Revelation Timeline)

const characters = [
    // --- 已入世角色 (Revealed) ---
    {
        id: "mu-xi-ge",
        isHeavenlyRoster: false,
        name: "慕夕歌",
        isOriginalIP: true,
        isRevealed: true,
        revealedIn: "EP 02",
        title: "孤山小师妹 / 风暴中心",
        desc: "孤山最清白的一页。第二集离山，单纯地以为下山只是为了看外面的世界，却不知自己早已成为各方势力角力的核心。",
        weapons: ["白色汉剑【流白】"],
        avatar: "https://cdn.jsdelivr.net/gh/webkubor/upic-images@main/assets/mu_xi_ge_anchor.png"
    },
    {
        id: "mu-bei-ge",
        isHeavenlyRoster: true,
        name: "慕北歌",
        isOriginalIP: true,
        isRevealed: true,
        revealedIn: "EP 02",
        title: "孤山剑首 / 守诺者",
        desc: "知晓一切却选择沉默。第二集雪中送别师妹。身着洗得发白的青衫，【问雪】长剑透明如冰。视承诺如生命，绝不踏出孤山半步。",
        weapons: ["透明汉剑【问雪】"],
        avatar: "https://cdn.jsdelivr.net/gh/webkubor/upic-images@main/assets/mu_bei_ge_anchor.jpg"
    },
    {
        id: "ye-jing-hong",
        isHeavenlyRoster: true,
        name: "夜惊鸿",
        isOriginalIP: true,
        isRevealed: true,
        revealedIn: "EP 04",
        title: "天榜高手 / 索命鬼神",
        desc: "第四集天门关现身。银面、白发、黑金大氅。他是南楚皇权最深的阴影，也是唯一的定海神针。点名要战西燕大将欧阳狂徒。",
        weapons: ["银色折叠枪【惊鸿】"],
        avatar: "https://cdn.jsdelivr.net/gh/webkubor/upic-images@main/assets/su_meng_cheng_anchor.png"
    },
    {
        id: "ou-yang-kuang-tu",
        isHeavenlyRoster: true,
        name: "欧阳狂徒",
        isOriginalIP: true,
        isRevealed: true,
        revealedIn: "EP 04 (Mentioned)",
        title: "西燕大将军 / 狂刀",
        desc: "西燕军魂，物理毁灭美学。虽未亲至南楚，但在第四集已被枪神点名。信奉绝对力量，唯有【破军】能让他开口。",
        weapons: ["门板重刃【破军】"],
        avatar: "https://cdn.jsdelivr.net/gh/webkubor/upic-images@main/assets/ouyang_kuang_tu_anchor.png"
    },
    {
        id: "ning-guan-chen",
        isHeavenlyRoster: false,
        name: "宁观尘",
        isOriginalIP: true,
        isRevealed: true,
        revealedIn: "EP 06",
        title: "游侠道士 / 顶级探子",
        desc: "第六集登场。背负着卖姐求生愧疚感的年轻人。总是仰头喝酒。他出卖情报只为了寻找姐姐。",
        weapons: ["无名长剑", "酒葫芦"],
        avatar: "https://cdn.jsdelivr.net/gh/webkubor/upic-images@main/assets/ning_guan_chen_anchor.png"
    },
    {
        id: "gu-qi-yue",
        isHeavenlyRoster: true,
        name: "顾栖月",
        isOriginalIP: true,
        isRevealed: true,
        revealedIn: "EP 07",
        title: "王府影子暗卫 / 花神",
        desc: "第七集凭空而降。作为苏王爷身边的影子暗卫，她总是赤足行走在光影边缘。看似吹奏横笛，实则在清理所有不速之客。",
        weapons: ["白玉横笛【玉尘】", "无声暗箭"],
        avatar: "https://cdn.jsdelivr.net/gh/webkubor/upic-images@main/assets/gu_qi_yue_anchor.png"
    },
    {
        id: "xiao-jin-xian",
        isHeavenlyRoster: true,
        name: "萧烬弦",
        isOriginalIP: true,
        isRevealed: true,
        revealedIn: "EP 08",
        title: "南楚王府第一战力 / 命债人",
        desc: "第八集联手清街。背负着苏府满门亲卫呈现血债。他是南楚皇权最忌惮的‘刺头’，【乌麟】长弓从不虚发。",
        weapons: ["玄角长弓【乌麟】"],
        avatar: "https://cdn.jsdelivr.net/gh/webkubor/upic-images@main/assets/xiao_jin_xian_anchor.png"
    },
    {
        id: "su-meng-cheng",
        isHeavenlyRoster: false,
        name: "苏梦城",
        isOriginalIP: true,
        isRevealed: true,
        revealedIn: "EP 10",
        title: "南楚异姓王 / 逍遥王",
        desc: "第十集正式露脸。南楚建国以来唯一的异姓王，据说当年他完全有机会让这江山姓苏。但他不仅让出了皇权，更自废了一身武功，此后满头白发，终日醉生梦死。眼神惫懒，自称连鸡都不敢杀。",
        weapons: ["青铜酒壶", "精钢折扇"],
        avatar: "https://img.webkubor.online/prince_su_white_hair.png"
    },
    {
        id: "yan-zhao-ling",
        isHeavenlyRoster: true,
        name: "燕照绫",
        isOriginalIP: true,
        isRevealed: true,
        revealedIn: "Late Game",
        title: "西燕百族领袖 / 赤练",
        desc: "野性而极度记仇。亲眼目睹生父死于孤山之手。腰间缠绕的【赤练】皮鞭由异兽皮淬毒而成。",
        weapons: ["异兽皮鞭【赤练】"],
        avatar: "https://cdn.jsdelivr.net/gh/webkubor/upic-images@main/assets/yan_zhao_ling_anchor.png"
    },

    // --- 幕后迷雾角色 (Unrevealed) ---
    {
        id: "ying",
        isHeavenlyRoster: true,
        name: "影",
        isOriginalIP: true,
        isRevealed: false,
        revealedIn: "???",
        title: "寒江淮影卫 / ???",
        desc: "???",
        weapons: ["???"],
        avatar: "https://img.webkubor.online/1772725378011-313y6om7.png"
    },
    {
        id: "xie-wu-feng",
        isHeavenlyRoster: true,
        name: "谢无锋",
        isOriginalIP: true,
        isRevealed: false,
        revealedIn: "???",
        title: "重剑无锋 / ???",
        desc: "???",
        weapons: ["???"],
        avatar: "https://img.webkubor.online/1772725378011-313y6om7.png"
    },
    {
        id: "hui-ming",
        isHeavenlyRoster: true,
        name: "慧明",
        isOriginalIP: true,
        isRevealed: false,
        revealedIn: "???",
        title: "天榜高手 / 青莲大自在",
        desc: "???",
        weapons: ["无 (以身为兵)"],
        avatar: "https://img.webkubor.online/1772725378011-313y6om7.png"
    },
    {
        id: "lu-ting-chao",
        isHeavenlyRoster: true,
        name: "陆听潮",
        isOriginalIP: true,
        isRevealed: false,
        revealedIn: "???",
        title: "雨幕残响 / ???",
        desc: "???",
        weapons: ["???"],
        avatar: "https://img.webkubor.online/1772725378011-313y6om7.png"
    }
];
