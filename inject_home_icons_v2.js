const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// We need to replace the entire 'blueprint-strip' section to make sure it's clean
const newBlueprintSection = `
    <!-- == SERVICES STRIP (Blueprint background) == -->
    <section class="blueprint-strip" aria-label="Servicios principales" style="background:#fff; border-bottom:1px solid #eee; padding: 60px 0;">
      <div class="blueprint-strip-inner container" style="display:flex; justify-content:center; gap: 80px; text-align:center;">
        
        <!-- CALIBRACION -->
        <a href="calibracion.html" class="bstrip-item mx-icon-item">
          <div class="mx-icon-circle">
            <svg viewBox="0 0 100 100">
              <path d="M35 30h9v15h12V30h9v40h-9V53H44v17h-9V30z" fill="#fff" />
            </svg>
          </div>
          <span class="mx-icon-label">CALIBRACIÓN</span>
        </a>

        <!-- UBICACIONES -->
        <a href="contacto.html" class="bstrip-item mx-icon-item">
          <div class="mx-icon-circle">
            <svg viewBox="0 0 100 100">
              <path d="M50 20c-13.8 0-25 11.2-25 25 0 18.8 25 43.8 25 43.8s25-25 25-43.8c0-13.8-11.2-25-25-25zm0 34c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z" fill="#fff" />
            </svg>
          </div>
          <span class="mx-icon-label">UBICACIONES</span>
        </a>

        <!-- INDUSTRIAS -->
        <a href="industrias.html" class="bstrip-item mx-icon-item">
          <div class="mx-icon-circle">
            <svg viewBox="0 0 100 100">
              <path d="M30 65V42l15-12v15l18-14v34H30z" stroke="#fff" stroke-width="6" fill="none" stroke-linejoin="round" />
              <rect x="30" y="42" width="15" height="23" stroke="#fff" stroke-width="6" fill="none" />
            </svg>
          </div>
          <span class="mx-icon-label">INDUSTRIAS</span>
        </a>

      </div>
    </section>
`;

const sectionRegex = /<!-- == SERVICES STRIP \(Blueprint background\) == -->[\s\S]*?<\/section>/i;

if (sectionRegex.test(html)) {
    html = html.replace(sectionRegex, newBlueprintSection);
    fs.writeFileSync('index.html', html, 'utf8');

    // Also inject CSS
    let css = fs.readFileSync('css/styles.css', 'utf8');
    const newCSS = `
/* MX Icons for Homepage Services */
.mx-icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    transition: transform 0.3s;
    background: transparent !important;
    box-shadow: none !important;
}
.mx-icon-item:hover {
    transform: translateY(-5px);
}
.mx-icon-circle {
    width: 130px;
    height: 130px;
    background-color: #2b2b2b; /* Dark charcoal */
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}
.mx-icon-circle svg {
    width: 60px;
    height: 60px;
}
.mx-icon-label {
    color: #111;
    font-weight: 700;
    font-size: 19px;
    letter-spacing: 2px;
    font-family: 'Acumin Pro', sans-serif;
}
/* Ensure the parent container has no bg */
.blueprint-strip {
    background: #fff !important;
    position: relative;
    z-index: 2;
}
.blueprint-strip::before {
    display: none !important;
}
`;
    // Clean up previous attempts if present
    css = css.replace(/\/\* MX Icons for Homepage Services \*\/[\s\S]*/, '');
    fs.writeFileSync('css/styles.css', css + newCSS, 'utf8');
    console.log('Homepage icons perfectly adapted to new MX screenshot.');
} else {
    console.log('Could not find the blueprint strip section.');
}
