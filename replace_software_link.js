const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\EIADMIN\\.gemini\\antigravity\\scratch\\hytorc-colombia';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') || f.endsWith('.js'));

let count = 0;
for (const file of files) {
 const filePath = path.join(dir, file);
 let content = fs.readFileSync(filePath, 'utf8');
 if (content.includes('software.html')) {
 content = content.replace(/servicios\.html#softwares/g, 'software.html');
 fs.writeFileSync(filePath, content, 'utf8');
 count++;
 console.log(`Updated: ${file}`);
 }
}
console.log(`\nDone. Updated ${count} files.`);
