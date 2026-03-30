const fs = require('fs');
const path = require('path');

const directoryPath = 'C:\\Users\\EIADMIN\\.gemini\\antigravity\\scratch\\hytorc-colombia';

// Social Media URLs for Hytorc Colombia
const socialUrls = {
 facebook: 'https://www.facebook.com/hytorccolombia/',
 instagram: 'https://www.instagram.com/hytorccolombia/',
 linkedin: 'https://www.linkedin.com/company/hytorc-colombia/',
 youtube: 'https://www.youtube.com/@HytorcColombia'
};

// Footer Icon Mappings (Verified by viewing assets)
// 115211: Facebook ('f')
// 115220: YouTube (play button)
// 115233: Instagram (camera)
// 115241: LinkedIn ('in')
const footerIcons = {
 facebook: 'assets/Captura de pantalla 2026-03-05 115211.png',
 youtube: 'assets/Captura de pantalla 2026-03-05 115220.png',
 instagram: 'assets/Captura de pantalla 2026-03-05 115233.png',
 linkedin: 'assets/Captura de pantalla 2026-03-05 115241.png'
};

function updateSocialLinks(filePath) {
 let content = fs.readFileSync(filePath, 'utf8');
 let modified = false;

 // 1. Update Header Social Links
 // Facebook Header
 const fbHeaderRegex = /<a[^>]*aria-label="Facebook"[^>]*>/g;
 if (fbHeaderRegex.test(content)) {
 content = content.replace(fbHeaderRegex, `<a href="${socialUrls.facebook}" target="_blank" class="h-social-link" aria-label="Facebook">`);
 modified = true;
 }

 // Instagram Header
 const igHeaderRegex = /<a[^>]*aria-label="Instagram"[^>]*>/g;
 if (igHeaderRegex.test(content)) {
 content = content.replace(igHeaderRegex, `<a href="${socialUrls.instagram}" target="_blank" class="h-social-link" aria-label="Instagram">`);
 modified = true;
 }

 // LinkedIn Header
 const liHeaderRegex = /<a[^>]*aria-label="LinkedIn"[^>]*>/g;
 if (liHeaderRegex.test(content)) {
 content = content.replace(liHeaderRegex, `<a href="${socialUrls.linkedin}" target="_blank" class="h-social-link" aria-label="LinkedIn">`);
 modified = true;
 }

 // YouTube Header
 const ytHeaderRegex = /<a[^>]*aria-label="YouTube"[^>]*>/g;
 if (ytHeaderRegex.test(content)) {
 content = content.replace(ytHeaderRegex, `<a href="${socialUrls.youtube}" target="_blank" class="h-social-link" aria-label="YouTube">`);
 modified = true;
 }

 // 2. Update Footer Social Links and Icons (Container replacement for perfect alignment)
 const footerContainerRegex = /<div class="social-links-container"[\s\S]*?<\/div>/;
 const newFooterContainer = `<div class="social-links-container" style="display:flex; justify-content:center; gap:16px; margin-top:15px;">
 <a href="${socialUrls.facebook}" target="_blank" aria-label="Facebook">
 <img src="${footerIcons.facebook}" alt="Facebook" style="width:36px; height:auto;">
 </a>
 <a href="${socialUrls.instagram}" target="_blank" aria-label="Instagram">
 <img src="${footerIcons.instagram}" alt="Instagram" style="width:36px; height:auto;">
 </a>
 <a href="${socialUrls.linkedin}" target="_blank" aria-label="LinkedIn">
 <img src="${footerIcons.linkedin}" alt="LinkedIn" style="width:36px; height:auto;">
 </a>
 <a href="${socialUrls.youtube}" target="_blank" aria-label="YouTube">
 <img src="${footerIcons.youtube}" alt="YouTube" style="width:36px; height:auto;">
 </a>
 </div>`;

 if (footerContainerRegex.test(content)) {
 content = content.replace(footerContainerRegex, newFooterContainer);
 modified = true;
 }

 if (modified) {
 fs.writeFileSync(filePath, content, 'utf8');
 console.log(`Updated: ${filePath}`);
 }
}

fs.readdir(directoryPath, (err, files) => {
 if (err) {
 console.error('Could not list the directory.', err);
 process.exit(1);
 }
 files.forEach(file => {
 if (path.extname(file).toLowerCase() === '.html') {
 updateSocialLinks(path.join(directoryPath, file));
 }
 });
});
