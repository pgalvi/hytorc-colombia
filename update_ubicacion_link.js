const fs = require('fs');
const path = require('path');

const dir = __dirname;

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('mexico_source') && !f.startsWith('mx_'));

files.forEach(file => {
 const filePath = path.join(dir, file);
 let content = fs.readFileSync(filePath, 'utf8');

 // Find the Ubicación mega-menu-item in CONTÁCTANOS section and update href to contacto-ubicacion.html
 // Match: <a href="contacto.html" class="mega-menu-item">...<span>Ubicación</span></a>
 const regex = /<a href="contacto\.html" class="mega-menu-item">\s*<div class="mega-menu-icon"[^>]*>\s*<img src="assets\/Sin título-4\.png"[^>]*>\s*<\/div>\s*<span>Ubicación<\/span>\s*<\/a>/;

 if (regex.test(content)) {
 content = content.replace(regex, (match) => {
 return match.replace('href="contacto.html"', 'href="contacto-ubicacion.html"');
 });
 fs.writeFileSync(filePath, content, 'utf8');
 console.log('Updated Ubicación link in ' + file);
 } else {
 console.log('No Ubicación link found in ' + file);
 }
});
