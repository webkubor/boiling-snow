---
name: generate_character_sheet
description: 基于单张原图生成正、侧、背三视图
---

# 角色三视图生成技能

## 适用场景

当需要将角色原图扩展为建模专用的标准三视图时调用。

## 物理特征锁定 (Fidelity Rules)

- **人脸强一致性**：必须严格遵循输入图的面部轮廓和五官比例。
- **服饰强一致性**：必须完整继承原图的服装材质、花纹及层叠逻辑。
- **禁止自行阐释**：不要在 Prompt 中加入对角色的剧情猜测或性格描述，以免干扰模型。

## 调用方式

不要在对话中重写逻辑，直接调用项目内封装好的脚本，并传入对应路径。

```bash
# 执行示例
node skills/scripts/gen_character_sheet.js \
  "references/character_anchors/夜惊鸿.png" \
  "references/三视图/夜惊鸿.png"
```

## 执行逻辑说明

该脚本位于 `skills/scripts/gen_character_sheet.js`，它会自动执行以下安全逻辑：

1. **秘钥隔离**：动态从 `/Users/webkubor/Documents/memory/secrets/google.md` 读取 Key，不在代码中留痕。
2. **比例锁定**：强制使用 `16:9` 宽画幅确保三个身位均匀分布。
3. **视觉锁定**：自动注入“严格保留原图特征”的强负面限制与正向引导词。
4. **归档**：自动将生成结果存入 `references/三视图/`。
