const fs = require('fs');
const path = require('path');

const directoryPath = 'c:\\Users\\EIADMIN\\.gemini\\antigravity\\scratch\\hytorc-colombia';

const footerHtml = `
 <!-- *************************************** CREDITS *************************************** -->
 <section class="footer-credits" style="background: #000000 !important; color: #ffffff !important; padding: 15px 0 !important; text-align: center !important; width: 100% !important; display: block !important; clear: both !important; border-top: 1px solid rgba(255,255,255,0.1) !important;">
 <div class="container-xxl" style="width: 100% !important; max-width: 1320px !important; margin: 0 auto !important; text-align: center !important;">
 <p style="margin: 0 !important; color: #ffffff !important; text-align: center !important; font-family: sans-serif !important; font-size: 13px !important; letter-spacing: 0.5px !important;">© 2026 Hytorc Colombia. Todos los derechos reservados. Diseño web por Galvis Tech Solutions</p>
 </div>
 </section>
 <!-- *************************************** CREDITS *************************************** -->
`;

const files = fs.readdirSync(directoryPath);
const htmlFiles = files.filter(file => file.endsWith('.html'));

htmlFiles.forEach(file => {
 const filePath = path.join(directoryPath, file);
 let content = fs.readFileSync(filePath, 'utf8');

 // Remove old footer-credits first to replace with inline version
 const regex = /<!-- \*+ CREDITS \*+ -->[\s\S]*?<!-- \*+ CREDITS \*+ -->/g;
 content = content.replace(regex, '');

 // Inject before </body>
 const bodyEnd = content.lastIndexOf('</body>');
 if (bodyEnd !== -1) {
 const newContent = content.slice(0, bodyEnd) + footerHtml + content.slice(bodyEnd);
 fs.writeFileSync(filePath, newContent);
 console.log(`Centering fixed for ${file} (Inline styles applied)`);
 }
});
