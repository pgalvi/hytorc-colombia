const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\EIADMIN\\.gemini\\antigravity\\scratch\\hytorc-colombia';
const newMenu = `          <li class="has-dropdown mega-dropdown">
            <a href="productos.html">PRODUCTOS</a>
            <div class="dropdown" style="width: auto; padding: 20px 30px;">
              <div class="product-nav-banner" style="margin-bottom: 0; padding: 0; border: none; background: transparent; justify-content: space-between; overflow: visible;">
                <a href="productos.html#hidraulicas" class="product-nav-item">
                  <div class="product-nav-icon">
                    <img src="assets/Silueta%20hidraulica.png" alt="Hidráulicas" style="width: 100%; height: 100%; object-fit: contain;">
                  </div>
                  <span class="product-nav-text">Hidráulicas</span>
                </a>
                <a href="productos_neumatica.html" class="product-nav-item">
                  <div class="product-nav-icon">
                    <img src="assets/neumaticas.png" alt="Neumáticas" style="width: 100%; height: 100%; object-fit: contain;">
                  </div>
                  <span class="product-nav-text">Neumáticas</span>
                </a>
                <a href="productos.html#electricas" class="product-nav-item">
                  <div class="product-nav-icon">
                    <img src="assets/Electricas.png" alt="Eléctricas" style="width: 100%; height: 100%; object-fit: contain;">
                  </div>
                  <span class="product-nav-text">Eléctricas</span>
                </a>
                <a href="productos.html#manuales" class="product-nav-item">
                  <div class="product-nav-icon">
                    <img src="assets/Manual.png" alt="Manual" style="width: 100%; height: 100%; object-fit: contain;">
                  </div>
                  <span class="product-nav-text">Manual</span>
                </a>
                <a href="productos_tensionadores_bombas.html" class="product-nav-item">
                  <div class="product-nav-icon">
                    <img src="assets/Tensionador.png" alt="Tensionadores" style="width: 100%; height: 100%; object-fit: contain;">
                  </div>
                  <span class="product-nav-text">Tensionadores</span>
                </a>
                <a href="productos_sujetadores.html" class="product-nav-item">
                  <div class="product-nav-icon">
                    <img src="assets/Sujeteadores.png" alt="Sujetadores" style="width: 100%; height: 100%; object-fit: contain;">
                  </div>
                  <span class="product-nav-text">Sujetadores</span>
                </a>
                <a href="productos_accesorios.html" class="product-nav-item">
                  <div class="product-nav-icon">
                    <img src="assets/Accesorios.png" alt="Accesorios" style="width: 100%; height: 100%; object-fit: contain;">
                  </div>
                  <span class="product-nav-text">Accesorios</span>
                </a>
                <a href="productos_bombas.html" class="product-nav-item">
                  <div class="product-nav-icon">
                    <img src="assets/Bombas.png" alt="Bombas" style="width: 100%; height: 100%; object-fit: contain;">
                  </div>
                  <span class="product-nav-text">Bombas</span>
                </a>
              </div>
            </div>
          </li>`;

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');
files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Regular expression to match any <li class="has-dropdown"> containing <a href="productos.html">Productos</a> 
  const regex1 = /<li\s+class="has-dropdown">\s*<a\s+href="productos.html">(?:Productos|PRODUCTOS)<\/a>\s*<ul\s+class="dropdown">[\s\S]*?<\/ul>\s*<\/li>/i;

  let updated = false;
  if (regex1.test(content)) {
    content = content.replace(regex1, newMenu);
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`No match in ${file}`);
  }
});
