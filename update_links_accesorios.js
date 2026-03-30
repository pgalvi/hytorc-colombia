const fs = require('fs');
const path = require('path');

const targetDir = 'C:\\\\Users\\\\EIADMIN\\\\.gemini\\\\antigravity\\\\scratch\\\\hytorc-colombia';
const files = fs.readdirSync(targetDir).filter(f => f.endsWith('.html'));

for (const file of files) {
 const filePath = path.join(targetDir, file);
 let content = fs.readFileSync(filePath, 'utf8');

 // Replace the link for Accesorries everywhere
 let updated = content.replace(/href="productos\.html#accesorios"/g, 'href="productos_accesorios.html"');

 if (updated !== content) {
 fs.writeFileSync(filePath, updated, 'utf8');
 console.log(`Updated Accesorios link in ${file}`);
 }
}
