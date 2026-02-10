const fs = require('fs');
const path = require('path');

// Configuration
const CAST_DIR = path.join(__dirname, '../cast');
const REF_DIR = path.join(__dirname, '../cast_refs');

console.log('Validating cast profiles...');

// 1. Get all JSON files
const files = fs.readdirSync(CAST_DIR).filter(f => f.endsWith('.json') && f !== 'character.template.json');

let errors = 0;

files.forEach(file => {
    const filePath = path.join(CAST_DIR, file);
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);

        console.log(`Checking ${file}...`);

        // Check required fields
        if (!data.id) {
            console.error(`  [ERROR] Missing 'id' in ${file}`);
            errors++;
        }
        if (!data.name && !data.display_name) {
             console.error(`  [ERROR] Missing 'name' or 'display_name' in ${file}`);
             errors++;
        }

        // Check references
        let refImage = null;
        if (data.visual_specs && data.visual_specs.base_ref) {
            refImage = data.visual_specs.base_ref;
        } else if (data.reference_images && data.reference_images.length > 0) {
            refImage = data.reference_images[0].path;
        }

        if (refImage) {
            // Resolve path relative to project root
            // The JSON paths might be relative to project root or absolute
            // We'll try to find the file
            let imagePath = refImage;
            if (!fs.existsSync(imagePath)) {
                 // Try relative to CAST_DIR or project root
                 const relativeToRoot = path.join(__dirname, '..', refImage);
                 if (fs.existsSync(relativeToRoot)) {
                     // Found it
                 } else {
                     console.warn(`  [WARN] Reference image not found: ${refImage}`);
                     // Don't count as error strictly unless we want to enforce it
                 }
            }
        } else {
             console.warn(`  [WARN] No reference image defined for ${data.id}`);
        }

    } catch (e) {
        console.error(`  [ERROR] Failed to parse ${file}: ${e.message}`);
        errors++;
    }
});

if (errors === 0) {
    console.log('✅ All cast profiles are valid JSON.');
} else {
    console.log(`❌ Found ${errors} errors.`);
    process.exit(1);
}
