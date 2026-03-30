const fs = require('fs');
const path = require('path');

const targetDir = 'C:\\\\Users\\\\EIADMIN\\\\.gemini\\\\antigravity\\\\scratch\\\\hytorc-colombia';
const files = fs.readdirSync(targetDir).filter(f => f.endsWith('.html'));

for (const file of files) {
 const filePath = path.join(targetDir, file);
 let content = fs.readFileSync(filePath, 'utf8');

 // Replace the link for Neumáticas
 let updated = content.replace(/href="productos\.html#neumaticas"/g, 'href="productos_neumatica.html"');

 if (updated !== content) {
 fs.writeFileSync(filePath, updated, 'utf8');
 console.log(`Updated Neumáticas link in ${file}`);
 }
}
