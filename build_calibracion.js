const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\EIADMIN\\.gemini\\antigravity\\scratch\\hytorc-colombia';
const localTemplatePath = path.join(dir, 'taller-servicios.html');
const mexicoSourcePath = path.join(dir, 'calibracion_mexico_source.html');
const calibracionPath = path.join(dir, 'calibracion.html');

let templateHtml = fs.readFileSync(localTemplatePath, 'utf8');
const mexicoHtml = fs.readFileSync(mexicoSourcePath, 'utf8');

// Extract main content from mexico source
const mainMatch = mexicoHtml.match(/<main>([\s\S]*?)<\/main>/i);
if (!mainMatch) {
 console.error("Could not find <main> in mexico source limit");
 process.exit(1);
}
let newMainContent = mainMatch[1];

// Remove the Accreditation block
newMainContent = newMainContent.replace(/<!-- \** PRODUCTOS \** -->[\s\S]*?<section class="mb-5 mt-5">[\s\S]*?<h2 class="tit-Compara">SERVICIOS DE CALIBRACIÓN ACREDITADOS[\s\S]*?<\/section>[\s\S]*?<!-- \** PRODUCTOS \** -->/i, '');

// Remove LogoCoisa block from banner and adjust grid
newMainContent = newMainContent.replace(/<div class="col-12 col-md-8">\s*<h1>LABORATORIO DE CALIBRACIÓN<\/h1>\s*<h2>Tu Aliado en Calibración de Herramientas Hytorc<\/h2>\s*<\/div>\s*<div class="col-12 col-md-4 text-end">\s*<img src="img\/logos\/LogoCoisa.png"[^>]+>\s*<\/div>/i,
 '<div class="col-12">\n <h1>LABORATORIO DE CALIBRACIÓN</h1>\n <h2>Tu Aliado en Calibración de Herramientas Hytorc</h2>\n </div>');

// Replace Images with user provided assets
newMainContent = newMainContent.replace('img/var/bk-labCalibra-xs.jpg', 'assets/Captura de pantalla 2026-03-04 140500.png');
newMainContent = newMainContent.replace('img/var/rutaMovil.jpg', 'assets/Captura de pantalla 2026-03-04 140508.png');
newMainContent = newMainContent.replace('img/var/img-calibra.jpg', 'assets/Captura de pantalla 2026-03-04 140516.png');
newMainContent = newMainContent.replace('img/var/calibraParTorsional.jpg', 'assets/Captura de pantalla 2026-03-04 140522.png');
newMainContent = newMainContent.replace('img/var/calibraPresionRelativa.jpg', 'assets/Captura de pantalla 2026-03-04 140529.png');

// Additionally, replace ACREDITACIONES PDF links (Mexican assets not local) to # temporarily or strip them
newMainContent = newMainContent.replace(/<a href="img\/servicios\/laboratorio\/Certificado_de_acreditacion_PT_COISA\.pdf"[^>]*>ACREDITACIONES<\/a>/gi, '');
newMainContent = newMainContent.replace(/<a href="img\/servicios\/laboratorio\/Certificado_de_acreditacion_Presión_COISA\.pdf"[^>]*>ACREDITACIONES<\/a>/gi, '');

// Inject new main content into local template
const finalHtml = templateHtml.replace(/<main[^>]*>[\s\S]*?<\/main>/i, `<main class="page-content">\n${newMainContent}\n </main>`);

fs.writeFileSync(calibracionPath, finalHtml, 'utf8');
console.log('Successfully generated calibracion.html');

// Now, update navigation links across all files
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') || f.endsWith('.js'));
files.forEach(file => {
 const filePath = path.join(dir, file);
 let content = fs.readFileSync(filePath, 'utf8');

 // Ignore external logic or build scripts, focus on HTML and custom JS
 if (file === 'replace_taller_link.js' || file === 'calibracion_scraper.js' || file === 'taller_scraper.js' || file === 'calibracion_mexico_source.html') return;

 const targetString = 'href="calibracion.html"';
 const newString = 'href="calibracion.html"';

 if (content.includes(targetString)) {
 content = content.replace(new RegExp(targetString, 'g'), newString);
 fs.writeFileSync(filePath, content, 'utf8');
 console.log(`Updated link in ${file}`);
 }
});
