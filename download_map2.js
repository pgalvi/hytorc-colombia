const fs = require('fs');

async function run() {
    try {
        const res = await fetch('https://upload.wikimedia.org/wikipedia/commons/e/ea/Blank_map_of_Colombia.svg');
        const text = await res.text();
        fs.writeFileSync('assets/mapa-colombia.svg', text, 'utf8');
        console.log('Saved! Length:', text.length);
        console.log(text.substring(0, 300));
    } catch (e) {
        console.error(e);
    }
}
run();
