const https = require('https');
const fs = require('fs');

const url = 'https://www.hytorc.com.mx/software.html';

https.get(url, {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'es-MX,es;q=0.9,en;q=0.8'
    }
}, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        fs.writeFileSync('software_mexico_source.html', data, 'utf8');
        console.log(`Saved ${data.length} bytes to software_mexico_source.html`);
    });
}).on('error', err => console.error('Error:', err.message));
