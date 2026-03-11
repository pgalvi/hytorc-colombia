const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\EIADMIN\\.gemini\\antigravity\\scratch\\hytorc-colombia';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace href="servicios.html#taller" with href="taller-servicios.html" 
    // And also update update_servicios_menu.js if applicable, but we only filter for .html
    const targetString = 'href="servicios.html#taller"';
    const newString = 'href="taller-servicios.html"';

    if (content.includes(targetString)) {
        content = content.replace(new RegExp(targetString, 'g'), newString);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated link in ${file}`);
    } else {
        console.log(`No link to update in ${file}`);
    }
});
