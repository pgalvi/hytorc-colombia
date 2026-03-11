const fs = require('fs');
const path = require('path');

const dir = './';
const files = fs.readdirSync(dir);
const htmlFiles = files.filter(f => f.endsWith('.html'));

let updatedFiles = 0;

for (const file of htmlFiles) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Search for the privacy policy reference. Currently it's usually inside the footer links section
    // Replace anything that looks like <a href="...">Política de Privacidad</a>
    content = content.replace(
        /<a\s+[^>]*href=\"([^\"]*)\"[^>]*>Política de Privacidad<\/a>/gi,
        '<a href=\"https://www.hytorc.com.mx/aviso-privacidad-hytorc.pdf\" target=\"_blank\" class=\"linkFinal\">Política de Privacidad</a>'
    );

    // Also look for POLÍTICA DE PRIVACIDAD in upper case
    content = content.replace(
        /<a\s+[^>]*href=\"([^\"]*)\"[^>]*>POLÍTICA DE PRIVACIDAD<\/a>/gi,
        '<a href=\"https://www.hytorc.com.mx/aviso-privacidad-hytorc.pdf\" target=\"_blank\" class=\"btn-outlineNosotros\">POLÍTICA DE PRIVACIDAD</a>'
    );

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log('Updated ' + file);
        updatedFiles++;
    }
}

console.log('Total files updated: ' + updatedFiles);
