const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let totalFixed = 0;
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    const regex = /<a [^>]*href=\"([^\"]+)\"[^>]*>[\s\S]*?<img [^>]*alt=\"([^>]*)\"/ig;

    let match;
    while ((match = regex.exec(content)) !== null) {
        const href = match[1];
        const altText = match[2];

        // If the alt text implies Cotizar but the href is not cotizar
        if (altText.toLowerCase().includes('cotizar') && !href.includes('cotiza')) {
            console.log(file + ': Cotizar alt points to -> ' + href);
            changed = true;
            // replace that specific occurrence
            const oldHref = 'href=\"' + href + '\"';
            const newHref = 'href=\"cotizaciones.html\"';
            content = content.replace(match[0], match[0].replace(oldHref, newHref));
        }

        // If the alt text implies Bolsa de Trabajo but href is not bolsa-trabajo
        if (altText.toLowerCase().includes('bolsa de trabajo') && !href.includes('bolsa')) {
            console.log(file + ': Bolsa de Trabajo alt points to -> ' + href);
            changed = true;
            const oldHref = 'href=\"' + href + '\"';
            const newHref = 'href=\"bolsa-trabajo.html\"';
            content = content.replace(match[0], match[0].replace(oldHref, newHref));
        }
    }

    if (changed) {
        fs.writeFileSync(file, content);
        console.log('Fixed file ' + file);
        totalFixed++;
    }
}
console.log('Total fixed: ' + totalFixed);
