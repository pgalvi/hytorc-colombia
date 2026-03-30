const fs = require('fs');
const path = require('path');

const targetDir = 'C:\\\\Users\\\\EIADMIN\\\\.gemini\\\\antigravity\\\\scratch\\\\hytorc-colombia';
const files = fs.readdirSync(targetDir).filter(f => f.endsWith('.html'));

for (const file of files) {
 const filePath = path.join(targetDir, file);
 let content = fs.readFileSync(filePath, 'utf8');

 // Replace the link for Electricas
 let updated = content.replace(/href="productos\.html#electricas"/g, 'href="productos_electricas.html"');

 if (updated !== content) {
 fs.writeFileSync(filePath, updated, 'utf8');
 console.log(`Updated Electricas link in ${file}`);
 }
}
