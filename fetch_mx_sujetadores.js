const https = require('https');
const fs = require('fs');

const options = {
 hostname: 'www.hytorc.com.mx',
 port: 443,
 path: '/productos_sujetadores.html',
 method: 'GET',
 headers: {
 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
 }
};

const file = fs.createWriteStream("mx_sujetadores.html");

const req = https.request(options, (res) => {
 res.pipe(file);
 file.on('finish', () => {
 file.close();
 console.log("Download completed.");
 });
});

req.on('error', (e) => {
 console.error("Error: " + e.message);
});

req.end();
