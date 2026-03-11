const https = require('https');
const fs = require('fs');

const url = 'https://simplemaps.com/static/svg/co/co.svg';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        const match = data.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
        if (match) {
            // Find the viewBox
            const vMatch = data.match(/viewBox="([^"]+)"/i);
            const viewBox = vMatch ? vMatch[1] : '0 0 1000 1000';

            fs.writeFileSync('assets/mapa-colombia.svg', data, 'utf8');
            console.log('Saved SVG to assets/mapa-colombia.svg');
            console.log('ViewBox:', viewBox);
            console.log(match[1].substring(0, 300));
        } else {
            console.log('No SVG match found. Data was:');
            console.log(data.substring(0, 300));
        }
    });
}).on('error', (err) => {
    console.log('Error:', err.message);
});
