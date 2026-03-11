const fs = require('fs');
const path = require('path');

const dir = __dirname;

const newContactMenu = `          <li class="has-dropdown mega-dropdown">
            <a href="contacto.html">CONTÁCTANOS</a>
            <div class="dropdown">
              <div class="mega-menu-grid">
                <a href="contacto.html" class="mega-menu-item">
                  <div class="mega-menu-icon" style="width: 50px;">
                    <img src="assets/Sin título-4.png" alt="Ubicación" style="width: 100%; height: auto; object-fit: contain;">
                  </div>
                  <span>Ubicación</span>
                </a>
                <a href="contacto.html" class="mega-menu-item">
                  <div class="mega-menu-icon" style="width: 50px;">
                    <img src="assets/Sin título-2.png" alt="Quejas y Sugerencias" style="width: 100%; height: auto; object-fit: contain;">
                  </div>
                  <span>Quejas y Sugerencias</span>
                </a>
                <a href="contacto.html" class="mega-menu-item">
                  <div class="mega-menu-icon" style="width: 50px;">
                    <img src="assets/Sin título-3.png" alt="Cotizar" style="width: 100%; height: auto; object-fit: contain;">
                  </div>
                  <span>Cotizar</span>
                </a>
                <a href="contacto.html" class="mega-menu-item">
                  <div class="mega-menu-icon" style="width: 50px;">
                    <img src="assets/Sin título-1.png" alt="Bolsa de Trabajo" style="width: 100%; height: auto; object-fit: contain;">
                  </div>
                  <span>Bolsa de Trabajo</span>
                </a>
              </div>
            </div>
          </li>`;

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('mexico_source') && !f.startsWith('mx_'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Match mega-dropdown version: <li class="has-dropdown mega-dropdown">..CONTÁCTANOS..</li>
    const megaRegex = /<li\s+class="has-dropdown mega-dropdown">\s*<a\s+href="[^"]*">CONT[ÁA]CTANOS<\/a>\s*<div\s+class="dropdown">[\s\S]*?<\/div>\s*<\/div>\s*<\/li>/i;

    // Match simple dropdown: <li class="has-dropdown">..CONTÁCTANOS..</li>
    const simpleRegex = /<li\s+class="has-dropdown">\s*<a\s+href="[^"]*">CONT[ÁA]CTANOS<\/a>\s*<ul\s+class="dropdown">[\s\S]*?<\/ul>\s*<\/li>/i;

    if (megaRegex.test(content)) {
        content = content.replace(megaRegex, newContactMenu);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated (Mega) ' + file);
    } else if (simpleRegex.test(content)) {
        content = content.replace(simpleRegex, newContactMenu);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated (Simple) ' + file);
    } else {
        console.log('No match in ' + file);
    }
});
