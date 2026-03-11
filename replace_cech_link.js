const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\EIADMIN\\.gemini\\antigravity\\scratch\\hytorc-colombia';
const extensions = ['.html', '.js'];
const oldLink = 'capacitacion-cech.html';
const newLink = 'capacitacion-cech.html';

let totalFiles = 0;
let totalReplacements = 0;

function processDir(dirPath) {
    const items = fs.readdirSync(dirPath);
    for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
            processDir(fullPath);
        } else if (stat.isFile() && extensions.includes(path.extname(item).toLowerCase())) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const count = (content.split(oldLink).length - 1);
            if (count > 0) {
                content = content.split(oldLink).join(newLink);
                fs.writeFileSync(fullPath, content, 'utf8');
                totalFiles++;
                totalReplacements += count;
                console.log(`  Updated ${item}: ${count} replacement(s)`);
            }
        }
    }
}

processDir(dir);
console.log(`\nDone! Updated ${totalReplacements} links in ${totalFiles} files.`);
