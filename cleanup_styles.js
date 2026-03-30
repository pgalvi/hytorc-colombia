const fs = require('fs');
const path = require('path');

const targetDir = 'C:\\Users\\EIADMIN\\.gemini\\antigravity\\scratch\\hytorc-colombia';
let filesToProcess = [];

// Find all HTML files
function walkDir(dir) {
 const files = fs.readdirSync(dir);
 for (const file of files) {
 const fullPath = path.join(dir, file);
 if (fs.statSync(fullPath).isDirectory()) {
 // Do not recurse for now, all are in root
 } else if (fullPath.endsWith('.html')) {
 filesToProcess.push(fullPath);
 }
 }
}

walkDir(targetDir);

const dropdownInlineStyle = '<div class="dropdown" style="width: auto; padding: 20px 30px;">';
const dropdownClean = '<div class="dropdown">';

const bannerInlineStyle = '<div class="product-nav-banner" style="margin-bottom: 0; padding: 0; border: none; background: transparent; justify-content: space-between; overflow: visible;">';
const bannerClean = '<div class="product-nav-banner">';

for (const filePath of filesToProcess) {
 let content = fs.readFileSync(filePath, 'utf8');
 let hasChanges = false;

 // Replace dropdown inline style
 if (content.includes(dropdownInlineStyle)) {
 content = content.replace(dropdownInlineStyle, dropdownClean);
 hasChanges = true;
 }

 // Replace banner inline style
 if (content.includes(bannerInlineStyle)) {
 content = content.replace(bannerInlineStyle, bannerClean);
 hasChanges = true;
 }

 if (hasChanges) {
 fs.writeFileSync(filePath, content, 'utf8');
 console.log(`Cleaned inline styles in ${path.basename(filePath)}`);
 } else {
 // console.log(`No match in ${path.basename(filePath)}`);
 }
}

console.log('Cleanup finished.');
