const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const target = 'class="btn-outlineNosotros">POLÍTICA DE PRIVACIDAD</a>';
const replacement = 'class="linkFinal">Política de Privacidad</a>';

let updated = 0;
for (const file of files) {
 let content = fs.readFileSync(file, 'utf8');
 if (content.includes(target)) {
 content = content.replaceAll(target, replacement);
 fs.writeFileSync(file, content);
 console.log('Fixed ' + file);
 updated++;
 }
}
console.log('Files updated: ' + updated);
