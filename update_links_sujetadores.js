const fs = require('fs');
const path = require('path');

const targetDir = 'C:\\\\Users\\\\EIADMIN\\\\.gemini\\\\antigravity\\\\scratch\\\\hytorc-colombia';
const files = fs.readdirSync(targetDir).filter(f => f.endsWith('.html'));

for (const file of files) {
 const filePath = path.join(targetDir, file);
 let content = fs.readFileSync(filePath, 'utf8');

 // Replace the link for Sujetadores
 let updated = content.replace(/href="productos\.html#sujetadores"/g, 'href="productos_sujetadores.html"');

 if (updated !== content) {
 fs.writeFileSync(filePath, updated, 'utf8');
 console.log(`Updated Sujetadores link in ${file}`);
 }
}
