import { ImageGenerator } from "/Users/webkubor/.gemini/extensions/nanobanana-plus/mcp-server/dist/imageGenerator.js";
import fs from "fs";
import path from "path";

// 动态读取秘钥，避免硬编码
const loadApiKey = () => {
    try {
        const keyData = fs.readFileSync('/Users/webkubor/Documents/memory/secrets/google.md', 'utf-8');
        const match = keyData.match(/AIzaSy[A-Za-z0-9_-]+/);
        return match ? match[0] : null;
    } catch (e) {
        console.error("Failed to load API key from secrets:", e.message);
        process.exit(1);
    }
};

const generator = new ImageGenerator({ apiKey: loadApiKey(), keyType: "GEMINI_API_KEY", source: "runtime" });

async function generateStory(prompt, outputCount = 4, targetDir) {
    const request = {
        prompt: prompt,
        outputCount: parseInt(outputCount, 10),
        mode: "generate",
        model: "gemini-3-pro-image-preview",
        aspectRatio: "21:9",
        customFileName: "storyboard_seq"
    };

    const argsParam = {
        type: "story",
        style: "consistent cinematic film",
        transition: "dramatic"
    };

    try {
        const res = await generator.generateStorySequence(request, argsParam);
        if (res.success) {
            console.log("Generated Sequence Paths:", res.generatedFiles);
            if (targetDir && fs.existsSync(targetDir)) {
                // 这里可以额外添加逻辑把生成在一排的文件全部 cp 到 targetDir
                console.log(`Please manually move the generated files from the temp directory to ${targetDir}`);
            }
        } else {
            console.error(`Failed generation:`, res.error || res.message);
        }
    } catch (e) {
        console.error(`Exception during generation:`, e.message);
    }
}

// 示例用法:
// node skills/scripts/gen_story.js "<prompt>" "<number_of_frames_default_4>" "<optional_target_dir>"
const args = process.argv.slice(2);
if (args.length >= 1) {
    generateStory(args[0], args[1] || 4, args[2]);
} else {
    console.log("Usage: node gen_story.js <prompt> [frame_count_default_4] [target_dir]");
}
