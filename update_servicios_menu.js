const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\EIADMIN\\.gemini\\antigravity\\scratch\\hytorc-colombia';
const newMenu = ` <li class="has-dropdown mega-dropdown">
 <a href="taller-servicios.html">SERVICIOS</a>
 <div class="dropdown">
 <div class="mega-menu-grid">
 <a href="taller-servicios.html" class="mega-menu-item">
 <div class="mega-menu-icon" style="width: 50px;">
 <img src="assets/taller.png" alt="Taller de Servicios" style="width: 100%; height: auto; object-fit: contain;">
 </div>
 <span>Taller de Servicios</span>
 </a>
 <a href="calibracion.html" class="mega-menu-item">
 <div class="mega-menu-icon" style="width: 50px;">
 <img src="assets/calibracion.png" alt="Calibración" style="width: 100%; height: auto; object-fit: contain;">
 </div>
 <span>Calibración</span>
 </a>
 <a href="software.html" class="mega-menu-item">
 <div class="mega-menu-icon" style="width: 50px;">
 <img src="assets/software.png" alt="softwares" style="width: 100%; height: auto; object-fit: contain;">
 </div>
 <span>softwares</span>
 </a>
 <a href="capacitacion.html" class="mega-menu-item">
 <div class="mega-menu-icon" style="width: 50px;">
 <img src="assets/capacitacion.png" alt="Capacitación" style="width: 100%; height: auto; object-fit: contain;">
 </div>
 <span>Capacitación</span>
 </a>
 </div>
 </div>
 </li>`;

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
files.forEach(file => {
 const filePath = path.join(dir, file);
 let content = fs.readFileSync(filePath, 'utf8');

 const regex = /<li[^>]*>\s*<a[^>]*>(?:SERVICIOS|Servicios)<\/a>[\s\S]*?<\/li>/i;

 let updated = false;
 if (regex.test(content)) {
 content = content.replace(regex, newMenu);
 updated = true;
 }

 if (updated) {
 fs.writeFileSync(filePath, content, 'utf8');
 console.log(`Updated ${file}`);
 } else {
 console.log(`No match in ${file}`);
 }
});
