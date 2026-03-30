const fs = require('fs');
const https = require('https');

async function scrape() {
 const url = 'https://www.hytorc.com.mx/taller-servicio.html';
 const options = {
 headers: {
 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
 'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8'
 }
 };

 https.get(url, options, (res) => {
 let data = '';

 // A chunk of data has been received.
 res.on('data', (chunk) => {
 data += chunk;
 });

 // The whole response has been received.
 res.on('end', () => {
 fs.writeFileSync('taller_mexico_source.html', data);
 console.log('Successfully fetched size: ' + data.length);
 });

 }).on("error", (err) => {
 console.log("Error: " + err.message);
 });
}

scrape();
