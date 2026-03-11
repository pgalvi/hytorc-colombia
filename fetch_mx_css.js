const fs = require('fs');
const https = require('https');

function fetchFile(url) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': '*/*'
            }
        };
        https.get(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => resolve(data));
        }).on("error", reject);
    });
}

async function main() {
    try {
        const css = await fetchFile('https://www.hytorc.com.mx/css/style_personalizado.css');
        fs.writeFileSync('mx_style_personalizado.css', css);
        console.log('Fetched style_personalizado.css: ' + css.length + ' bytes');

        const fonts = await fetchFile('https://www.hytorc.com.mx/css/style_fonts.css');
        fs.writeFileSync('mx_style_fonts.css', fonts);
        console.log('Fetched style_fonts.css: ' + fonts.length + ' bytes');
    } catch (e) {
        console.error('Error:', e.message);
    }
}

main();
