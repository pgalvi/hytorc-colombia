const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let issues = 0;
for (const file of files) {
 let content = fs.readFileSync(file, 'utf8');
 let changed = false;

 // Fix Cotizar link leading to bolsa-trabajo.html or others
 // We use string replacement to specifically target the wrong link that surrounds the Cotizar icon and text
 const wrongCotizarLink1 = '<a href=\"bolsa-trabajo.html\" class=\"mega-menu-item\">\n <div class=\"mega-menu-icon\" style=\"width: 50px;\">\n <img src=\"assets/Sin título-3.png\" alt=\"Cotizar\"';
 const rightCotizarLink1 = '<a href=\"cotizaciones.html\" class=\"mega-menu-item\">\n <div class=\"mega-menu-icon\" style=\"width: 50px;\">\n <img src=\"assets/Sin título-3.png\" alt=\"Cotizar\"';

 if (content.includes(wrongCotizarLink1)) {
 content = content.replace(wrongCotizarLink1, rightCotizarLink1);
 changed = true;
 }

 // Also on the same page there might be Bolsa de Trabajo linking to contacto.html
 const wrongBolsaLink1 = '<a href=\"contacto.html\" class=\"mega-menu-item\">\n <div class=\"mega-menu-icon\" style=\"width: 50px;\">\n <img src=\"assets/Sin título-1.png\" alt=\"Bolsa de Trabajo\"';
 const rightBolsaLink1 = '<a href=\"bolsa-trabajo.html\" class=\"mega-menu-item\">\n <div class=\"mega-menu-icon\" style=\"width: 50px;\">\n <img src=\"assets/Sin título-1.png\" alt=\"Bolsa de Trabajo\"';

 if (content.includes(wrongBolsaLink1)) {
 content = content.replace(wrongBolsaLink1, rightBolsaLink1);
 changed = true;
 }

 // Check for the alternative spacing if previous fails
 const wrongCotizarLink2 = '<a href=\"bolsa-trabajo.html\" class=\"mega-menu-item\">\r\n <div class=\"mega-menu-icon\" style=\"width: 50px;\">\r\n <img src=\"assets/Sin título-3.png\" alt=\"Cotizar\"';
 const rightCotizarLink2 = '<a href=\"cotizaciones.html\" class=\"mega-menu-item\">\r\n <div class=\"mega-menu-icon\" style=\"width: 50px;\">\r\n <img src=\"assets/Sin título-3.png\" alt=\"Cotizar\"';

 if (content.includes(wrongCotizarLink2)) {
 content = content.replace(wrongCotizarLink2, rightCotizarLink2);
 changed = true;
 }

 const wrongBolsaLink2 = '<a href=\"contacto.html\" class=\"mega-menu-item\">\r\n <div class=\"mega-menu-icon\" style=\"width: 50px;\">\r\n <img src=\"assets/Sin título-1.png\" alt=\"Bolsa de Trabajo\"';
 const rightBolsaLink2 = '<a href=\"bolsa-trabajo.html\" class=\"mega-menu-item\">\r\n <div class=\"mega-menu-icon\" style=\"width: 50px;\">\r\n <img src=\"assets/Sin título-1.png\" alt=\"Bolsa de Trabajo\"';

 if (content.includes(wrongBolsaLink2)) {
 content = content.replace(wrongBolsaLink2, rightBolsaLink2);
 changed = true;
 }

 // Check for a third spacing style
 const wrongCotizarLink3 = '<a href=\"bolsa-trabajo.html\" class=\"mega-menu-item\">\n <div class=\"mega-menu-icon\" style=\"width: 50px;\">\n <img src=\"assets/Sin título-3.png\" alt=\"Cotizar\"';
 const rightCotizarLink3 = '<a href=\"cotizaciones.html\" class=\"mega-menu-item\">\n <div class=\"mega-menu-icon\" style=\"width: 50px;\">\n <img src=\"assets/Sin título-3.png\" alt=\"Cotizar\"';

 if (content.includes(wrongCotizarLink3)) {
 content = content.replace(wrongCotizarLink3, rightCotizarLink3);
 changed = true;
 }

 const badRegexCotizar = /<a href=\"[^\"]+\"[^>]*>\s*<div class=\"mega-menu-icon\"[^>]*>\s*<img src=\"[^\"]*Sin t.tulo-3\.png\" alt=\"Cotizar\"/g;
 content = content.replace(badRegexCotizar, (match) => {
 if (match.includes('bolsa-trabajo.html') || match.includes('contacto.html')) {
 changed = true;
 return match.replace(/href=\"[^\"]+\"/, 'href=\"cotizaciones.html\"');
 }
 return match;
 });

 const badRegexBolsa = /<a href=\"[^\"]+\"[^>]*>\s*<div class=\"mega-menu-icon\"[^>]*>\s*<img src=\"[^\"]*Sin t.tulo-1\.png\" alt=\"Bolsa de Trabajo\"/g;
 content = content.replace(badRegexBolsa, (match) => {
 if (match.includes('contacto.html') || match.includes('cotizaciones.html')) {
 changed = true;
 return match.replace(/href=\"[^\"]+\"/, 'href=\"bolsa-trabajo.html\"');
 }
 return match;
 });


 if (changed) {
 fs.writeFileSync(file, content);
 console.log('Fixed menu links in ' + file);
 issues++;
 }
}
console.log('Total fixed: ' + issues);
