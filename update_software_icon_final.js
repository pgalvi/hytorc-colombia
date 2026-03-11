const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\EIADMIN\\.gemini\\antigravity\\scratch\\hytorc-colombia';

const newMenu = `          <li class="has-dropdown mega-dropdown">
            <a href="servicios.html">SERVICIOS</a>
            <div class="dropdown">
              <div class="mega-menu-grid">
                <a href="taller-servicios.html" class="mega-menu-item">
                  <div class="mega-menu-icon" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;">
                    <img src="assets/taller .png" alt="Taller de Servicios" style="width: 38px; height: 38px; object-fit: contain;" loading="lazy" decoding="async">
                  </div>
                  <span>Taller de Servicios</span>
                </a>
                <a href="calibracion.html" class="mega-menu-item">
                  <div class="mega-menu-icon" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;">
                    <img src="assets/calibracion.png" alt="Calibración" style="width: 38px; height: 38px; object-fit: contain;" loading="lazy" decoding="async">
                  </div>
                  <span>Calibración</span>
                </a>
                <a href="software.html" class="mega-menu-item">
                  <div class="mega-menu-icon" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;">
                    <img src="assets/software.png" alt="Softwares" style="width: 38px; height: 38px; object-fit: contain;" loading="lazy" decoding="async">
                  </div>
                  <span>Softwares</span>
                </a>
                <a href="capacitacion-cech.html" class="mega-menu-item">
                  <div class="mega-menu-icon" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;">
                    <img src="assets/capacitacion.png" alt="Capacitación CECH" style="width: 38px; height: 38px; object-fit: contain;" loading="lazy" decoding="async">
                  </div>
                  <span>Capacitación CECH</span>
                </a>
              </div>
            </div>
          </li>`;

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Regex to find the SERVICIOS menu item across all variants
    const regex = /<li[^>]*class="[^"]*has-dropdown[^"]*mega-dropdown[^"]*"[^>]*>\s*<a[^>]*>(?:SERVICIOS|Servicios)<\/a>[\s\S]*?<\/li>/i;

    if (regex.test(content)) {
        content = content.replace(regex, newMenu);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${file}`);
    } else {
        // Fallback for cases without classes
        const regex2 = /<li[^>]*>\s*<a[^>]*>(?:SERVICIOS|Servicios)<\/a>[\s\S]*?<\/li>/i;
        if (regex2.test(content) && content.includes('mega-menu-grid')) {
            content = content.replace(regex2, newMenu);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated (fallback): ${file}`);
        }
    }
});
console.log('Done.');
