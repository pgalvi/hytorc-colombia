const https = require('https');
const fs = require('fs');

const options = {
 hostname: 'www.hytorc.com.mx',
 port: 443,
 path: '/productos_electricas.html',
 method: 'GET',
 headers: {
 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
 }
};

const req = https.request(options, (res) => {
 let data = '';
 res.on('data', (chunk) => { data += chunk; });
 res.on('end', () => {
 fs.writeFileSync('C:\\\\Users\\\\EIADMIN\\\\.gemini\\\\antigravity\\\\scratch\\\\hytorc-colombia\\\\mx_electricas.html', data);
 console.log('Done Fetching Electricas MX');
 });
});
req.on('error', (e) => { console.error(e); });
req.end();
