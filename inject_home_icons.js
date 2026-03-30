const fs = require('fs');
const https = require('https');

// Helper to download files
const download = (url, dest) => {
 return new Promise((resolve, reject) => {
 const file = fs.createWriteStream(dest);
 https.get(url, response => {
 response.pipe(file);
 file.on('finish', () => {
 file.close(resolve);
 });
 }).on('error', err => {
 fs.unlink(dest, () => { });
 reject(err);
 });
 });
};

(async () => {
 // We will download exactly the icons provided by the user if we can find them,
 // or build SVGs that exactly match the shapes in the images:
 // 1. Black circle with a white 'H'
 // 2. Black circle with a white map pin
 // 3. Black circle with a white factory

 const svgH = `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
 <circle cx="32" cy="32" r="30" fill="#2d2d2d" />
 <path d="M22 18h6v10h8V18h6v28h-6V34h-8v12h-6V18z" fill="#ffffff" />
 </svg>`;

 const svgMap = `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
 <circle cx="32" cy="32" r="30" fill="#2d2d2d" />
 <path d="M32 12c-8.8 0-16 7.2-16 16 0 12 16 26 16 26s16-14 16-26c0-8.8-7.2-16-16-16zm0 22c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" fill="#ffffff" />
 </svg>`;

 const svgFactory = `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
 <circle cx="32" cy="32" r="30" fill="#2d2d2d" />
 <path d="M16 48V26l12-8v11l14-9v28H16zm12-19v19h14V29L28 29z" fill="#ffffff" />
 </svg>`;

 // Even better, let's just create SVGs that look exactly like the screenshot
 const exactFactory = `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
 <circle cx="32" cy="32" r="30" fill="#303030"/>
 <path d="M21 44V26l9-8v9l10-8v25H21z" stroke="#fff" stroke-width="3" fill="none" stroke-linejoin="round"/>
 <rect x="21" y="26" width="9" height="18" fill="none" />
 </svg>`;

 // Instead of messing with SVGs, I will generate an HTML replacement
 let html = fs.readFileSync('index.html', 'utf8');

 // Remove the old SVGs and replace them with precise new SVGs that perfectly match the screenshot shapes
 // 1. Calibracion (The H)
 const newCalibSVG = `
 <svg viewBox="0 0 100 100" class="mx-service-icon">
 <circle cx="50" cy="50" r="48" fill="#333" />
 <path d="M35 28h10v16h10V28h10v44H55V52H45v20H35V28z" fill="#fff" />
 </svg>`;

 // 2. Ubicaciones (The Map Pin)
 const newMapSVG = `
 <svg viewBox="0 0 100 100" class="mx-service-icon">
 <circle cx="50" cy="50" r="48" fill="#333" />
 <path d="M50 18c-14 0-24 10-24 24 0 18 24 40 24 40s24-22 24-40c0-14-10-24-24-24zm0 32c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" fill="#fff" />
 </svg>`;

 // 3. Industrias (The outline Factory)
 const newIndSVG = `
 <svg viewBox="0 0 100 100" class="mx-service-icon">
 <circle cx="50" cy="50" r="48" fill="#333" />
 <path d="M30 65V35l15-10v13l20-13v40H30z" stroke="#fff" stroke-width="5" fill="none" stroke-linejoin="round" />
 <path d="M45 65V38" stroke="#fff" stroke-width="5" />
 </svg>`;

 // Find the sections by their labels and replace the icons inside
 html = html.replace(/<div class="bstrip-icon">[\s\S]*?<\/div>[\s]*<span class="bstrip-label">CALIBRACIÓN<\/span>/i,
 `<div class="bstrip-icon">\n${newCalibSVG}\n </div>\n <span class="bstrip-label">CALIBRACIÓN</span>`);

 html = html.replace(/<div class="bstrip-icon">[\s\S]*?<\/div>[\s]*<span class="bstrip-label">UBICACIONES<\/span>/i,
 `<div class="bstrip-icon">\n${newMapSVG}\n </div>\n <span class="bstrip-label">UBICACIONES</span>`);

 html = html.replace(/<div class="bstrip-icon">[\s\S]*?<\/div>[\s]*<span class="bstrip-label">INDUSTRIAS<\/span>/i,
 `<div class="bstrip-icon">\n${newIndSVG}\n </div>\n <span class="bstrip-label">INDUSTRIAS</span>`);

 fs.writeFileSync('index.html', html, 'utf8');

 // Write a CSS update to ensure the text matches the screenshot
 const cssUpdate = `
/* Update Service Strip text to match MX screenshot */
.blueprint-strip .bstrip-label {
 color: #000;
 font-weight: 700;
 font-size: 18px;
 letter-spacing: 1.5px;
 margin-top: 15px;
}
.blueprint-strip .bstrip-item {
 background: transparent;
 box-shadow: none;
 transition: transform 0.3s;
}
.blueprint-strip .bstrip-item:hover {
 transform: translateY(-5px);
 box-shadow: none;
}
.mx-service-icon {
 width: 100px;
 height: 100px;
 display: block;
 margin: 0 auto;
}
`;
 let css = fs.readFileSync('css/styles.css', 'utf8');
 if (!css.includes('mx-service-icon')) {
 fs.writeFileSync('css/styles.css', css + cssUpdate, 'utf8');
 }

 console.log('Homepage icons patched.');

})();
