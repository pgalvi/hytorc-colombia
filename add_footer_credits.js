const fs = require('fs');
const path = require('path');

const directoryPath = 'c:\\Users\\EIADMIN\\.gemini\\antigravity\\scratch\\hytorc-colombia';
const cssPath = path.join(directoryPath, 'css', 'styles.css');

const footerHtml = `
 <!-- *************************************** CREDITS *************************************** -->
 <section class="footer-credits">
 <div class="container-xxl text-center">
 <p>© 2026 Hytorc Colombia. Todos los derechos reservados. Diseño web por Galvis Tech Solutions</p>
 </div>
 </section>
 <!-- *************************************** CREDITS *************************************** -->
`;

const footerCss = `
/* ══════════════════════════════════════════
 FOOTER CREDITS
 ══════════════════════════════════════════ */
.footer-credits {
 background: #111111;
 color: #ffffff;
 padding: 15px 0;
 font-family: 'Acumin Pro Condensed', sans-serif;
 font-size: 13px;
 letter-spacing: 0.5px;
 border-top: 1px solid rgba(255, 255, 255, 0.05);
}
.footer-credits p {
 margin: 0 !important;
 color: #ffffff !important;
 text-align: center !important;
}
`;

// 1. Append CSS
if (fs.existsSync(cssPath)) {
 let cssContent = fs.readFileSync(cssPath, 'utf8');
 if (!cssContent.includes('.footer-credits')) {
 fs.appendFileSync(cssPath, footerCss);
 console.log('CSS added to styles.css');
 }
}

// 2. Add to all HTML files
const files = fs.readdirSync(directoryPath);
const htmlFiles = files.filter(file => file.endsWith('.html'));

htmlFiles.forEach(file => {
 const filePath = path.join(directoryPath, file);
 let content = fs.readFileSync(filePath, 'utf8');

 // Skip if already has footer-credits
 if (content.includes('footer-credits')) {
 console.log(`Skipping ${file} (already has footer-credits)`);
 return;
 }

 // Try to find the end of wrapFooter section
 if (content.includes('</section>') && content.includes('wrapFooter')) {
 // Find the LAST </section> that belongs to wrapFooter
 // In our case it's usually before scripts
 const parts = content.split('<!-- *************************************** FOOTER *************************************** -->');
 if (parts.length >= 3) {
 // It's the standard structure: Header, then Footer start, then Footer end tagging
 // Replacement: part[0] + Footer_Start + part[1] + Footer_End + Creds + part[2]
 const newContent = parts[0] +
 '<!-- *************************************** FOOTER *************************************** -->' +
 parts[1] +
 '<!-- *************************************** FOOTER *************************************** -->' +
 footerHtml +
 parts[2];
 fs.writeFileSync(filePath, newContent);
 console.log(`Updated ${file} (standard structure)`);
 } else {
 // Fallback: search for last </section> before </body>
 const bodyEnd = content.lastIndexOf('</body>');
 const lastSectionCap = content.lastIndexOf('</section>', bodyEnd);
 if (lastSectionCap !== -1) {
 const insertPos = content.indexOf('>', lastSectionCap) + 1;
 const newContent = content.slice(0, insertPos) + footerHtml + content.slice(insertPos);
 fs.writeFileSync(filePath, newContent);
 console.log(`Updated ${file} (fallback injection)`);
 } else {
 console.log(`Could not find injection point for ${file}`);
 }
 }
 } else {
 // Fallback for files without wrapFooter
 const bodyEnd = content.lastIndexOf('</body>');
 if (bodyEnd !== -1) {
 const newContent = content.slice(0, bodyEnd) + footerHtml + content.slice(bodyEnd);
 fs.writeFileSync(filePath, newContent);
 console.log(`Updated ${file} (raw body injection)`);
 }
 }
});
