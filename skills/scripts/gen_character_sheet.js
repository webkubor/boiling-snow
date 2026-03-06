import { ImageGenerator } from "/Users/webkubor/.gemini/extensions/nanobanana-plus/mcp-server/dist/imageGenerator.js";
import { FileHandler } from "/Users/webkubor/.gemini/extensions/nanobanana-plus/mcp-server/dist/fileHandler.js";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { exec } from "child_process";

const execAsync = promisify(exec);

// 核心：Monkey-patch 插件的静态路径常量，彻底避开权限受限的目录
FileHandler.PROJECT_ROOT = "/tmp";
FileHandler.OUTPUT_DIR = "nanobanana_fidelity_fix";

// 动态读取秘钥
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

async function generateCharacterSheet(sourceImage, targetFile) {
    if (!fs.existsSync(sourceImage)) {
        console.error(`Source image missing at ${sourceImage}`);
        return;
    }

    // 极致锁相：专注于物理属性克隆
    const prompt = `A professional wide character model sheet (front, side, back views) of the character in the input image. 
STRICTLY CLONE the face, facial features, hair style, and clothing details from the input image. 
Subject: The exact character from the provided input. 
Style: Consistent 3D game art model sheet, clean flat neutral background. 
No text, no variations in personality. 100% physical fidelity.`;

    const charName = path.basename(targetFile, '.png');
    console.log(`Generating high-fidelity img2img for ${charName}...`);
    try {
        const res = await generator.editImage({
            prompt: prompt,
            inputImage: sourceImage,
            mode: "edit",
            model: "gemini-3-pro-image-preview",
            aspectRatio: "16:9",
            customFileName: `${charName}_fidelity`
        });

        if (res.success && res.generatedFiles.length > 0) {
            const generatedFile = res.generatedFiles[0];
            await execAsync(`cp "${generatedFile}" "${targetFile}"`);
            console.log(`SUCCESS: Saved ${charName} to ${targetFile}`);
        } else {
            console.error(`FAILED:`, res.error || res.message);
        }
    } catch (e) {
        console.error(`EXCEPTION:`, e.message);
    }
}

const args = process.argv.slice(2);
if (args.length >= 2) {
    generateCharacterSheet(args[0], args[1]);
} else {
    console.log("Usage: node gen_character_sheet.js <source_image> <target_image>");
}
