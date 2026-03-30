const fs = require('fs');
const path = require('path');

const directoryPath = './';
const oldLink = 'contacto.html'; // Based on what I saw in index.html for Bolsa de Trabajo
const newLink = 'bolsa-trabajo.html';

fs.readdir(directoryPath, (err, files) => {
 if (err) {
 return console.log('Unable to scan directory: ' + err);
 }
 files.forEach(file => {
 if (path.extname(file) === '.html') {
 let content = fs.readFileSync(file, 'utf8');

 // Specifically target the Bolsa de Trabajo span or link
 // In index.html it was: <a href="contacto.html" class="mega-menu-item">...<span>Bolsa de Trabajo</span></a>

 const regex = /<a href="contacto\.html" class="mega-menu-item">([\s\S]*?<span>Bolsa de Trabajo<\/span>)/g;
 if (regex.test(content)) {
 const newContent = content.replace(regex, `<a href="${newLink}" class="mega-menu-item">$1`);
 fs.writeFileSync(file, newContent, 'utf8');
 console.log(`Updated link in ${file}`);
 }
 }
 });
});
