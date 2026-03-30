const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\EIADMIN\\.gemini\\antigravity\\scratch\\hytorc-colombia';

// Icons for QUIÉNES SOMOS
// Acerca de nosotros: Sin título-1.png (People)
// Industria: Sin título-5.png (Towers)
// Hytorc Standard: hytorc_standard.png (Shield)
const newMenu = ` <li class="has-dropdown mega-dropdown">
 <a href="#">QUIÉNES SOMOS</a>
 <div class="dropdown">
 <div class="mega-menu-grid">
 <a href="sobre-nosotros.html" class="mega-menu-item">
 <div class="mega-menu-icon" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;">
 <img src="assets/Sin título-1.png" alt="Sobre nosotros" style="width: 38px; height: 38px; object-fit: contain;" loading="lazy" decoding="async">
 </div>
 <span>Acerca de nosotros</span>
 </a>
 <a href="industrias.html" class="mega-menu-item">
 <div class="mega-menu-icon" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;">
 <img src="assets/Sin título-5.png" alt="Industria" style="width: 38px; height: 38px; object-fit: contain;" loading="lazy" decoding="async">
 </div>
 <span>Industria</span>
 </a>
 <a href="estandar-hytorc.html" class="mega-menu-item">
 <div class="mega-menu-icon" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;">
 <img src="assets/hytorc_standard.png" alt="Hytorc Standard" style="width: 38px; height: 38px; object-fit: contain;" loading="lazy" decoding="async">
 </div>
 <span>Hytorc Standard</span>
 </a>
 </div>
 </div>
 </li>`;

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
 const filePath = path.join(dir, file);
 let content = fs.readFileSync(filePath, 'utf8');

 // Regex to find the QUIÉNES SOMOS menu item
 const regex = /<li[^>]*class="[^"]*has-dropdown[^"]*mega-dropdown[^"]*"[^>]*>\s*<a[^>]*>(?:QUIÉNES SOMOS|Quiénes Somos)<\/a>[\s\S]*?<\/li>/i;

 if (regex.test(content)) {
 content = content.replace(regex, newMenu);
 fs.writeFileSync(filePath, content, 'utf8');
 console.log(`Updated: ${file}`);
 } else {
 // Fallback for cases without classes or different structure
 const regex2 = /<li[^>]*>\s*<a[^>]*>(?:QUIÉNES SOMOS|Quiénes Somos)<\/a>[\s\S]*?<\/li>/i;
 if (regex2.test(content) && content.includes('sobre-nosotros.html')) {
 content = content.replace(regex2, newMenu);
 fs.writeFileSync(filePath, content, 'utf8');
 console.log(`Updated (fallback): ${file}`);
 }
 }
});
console.log('Done.');
