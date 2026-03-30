const fs = require('fs');
const path = require('path');

const targetDir = 'C:\\\\Users\\\\EIADMIN\\\\.gemini\\\\antigravity\\\\scratch\\\\hytorc-colombia';
const files = fs.readdirSync(targetDir).filter(f => f.endsWith('.html'));

for (const file of files) {
 const filePath = path.join(targetDir, file);
 let content = fs.readFileSync(filePath, 'utf8');

 // Replace the link for Bombas everywhere
 let updated = content.replace(/href="productos\.html#bombas"/g, 'href="productos_bombas.html"');

 // Quick fix: in menu there might be some that still point to "productos.html" but looking for bombas? No, they mostly point to productos.html#bombas.
 // Also cover href="productos_bombas.html" in case it's in the menu.

 if (updated !== content) {
 fs.writeFileSync(filePath, updated, 'utf8');
 console.log(`Updated Bombas link in ${file}`);
 }
}
