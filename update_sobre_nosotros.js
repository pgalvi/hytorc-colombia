const fs = require('fs');
let content = fs.readFileSync('sobre-nosotros.html', 'utf8');

// 1. CSS changes
content = content.replace(
    /(\.topNosotros::before\s*\{[\s\S]*?\})/,
    '.topNosotros::before {\n      display: none;\n    }'
);
content = content.replace(
    /(\.topNosotros\s*\{\s*background-color:\s*#1a1a1a;\s*color:\s*#fff;\s*padding:\s*100px 40px;\s*position:\s*relative;\s*\})/,
    '.topNosotros {\n      background-color: #1a1a1a;\n      color: #fff;\n      padding: 0;\n      position: relative;\n      overflow: hidden;\n    }\n\n    .topNosotros-content {\n      padding: 100px 40px;\n    }'
);
content = content.replace(
    /(@media \(max-width: 991px\)\s*\{\s*\.topNosotros\s*\{\s*padding:\s*60px 20px;\s*\})/,
    '@media (max-width: 991px) {\n      .topNosotros {\n        padding: 0;\n      }\n      .topNosotros-content {\n        padding: 60px 20px;\n      }'
);

let oldHtml = `    <!-- *************************************** BANNER PRINCIPAL SOBRE NOSOTROS *************************************** -->
    <section class="topNosotros">
      <div class="container-xxl">
        <div class="row justify-content-sm-center justify-content-lg-start">
          <div class="col-12 col-lg-6 col-xl-7">
            <h1>Sobre nosotros</h1>
            <p>
              Con más de 37 años de experiencia, HYTORC es la marca más confiable en herramientas de torque y tensión a
              nivel mundial. Ofrecemos soluciones innovadoras para el apriete y afloje de tuercas en sectores clave como
              la minería, siderurgia, refinerías, energía eólica y plantas nucleares. Nuestra tecnología reduce tiempos
              de mantenimiento, mejora la seguridad y garantiza la máxima precisión en cada aplicación.
            </p>
            <p>
              En Comercializadora del Istmo, S.A. de CV. (COISA), distribuimos en México la tecnología más avanzada en
              llaves de torque hidráulicas, sistemas de tensión y equipos de apriete controlado. Nuestro compromiso es
              ayudar a las empresas a optimizar procesos industriales, reducir costos operativos y minimizar riesgos,
              asegurando trabajos más seguros y eficientes.
            </p>
            <p>
              Descubre por qué HYTORC es la solución líder en herramientas de torque en México.
            </p>
          </div>
          <div class="col-11 mt-4 d-block d-lg-none">
            <img src="assets/Captura de pantalla 2026-03-04 232855.png" class="img-fluid">
          </div>
        </div>
      </div>
    </section>
    <!-- *************************************** BANNER PRINCIPAL SOBRE NOSOTROS *************************************** -->`;

let newHtml = `    <!-- *************************************** BANNER PRINCIPAL SOBRE NOSOTROS *************************************** -->
    <section class="topNosotros">
      <div class="container-xxl" style="position: relative; z-index: 2;">
        <div class="row justify-content-sm-center justify-content-lg-start">
          <div class="col-12 col-lg-6 topNosotros-content">
            <h1>SOBRE NOSOTROS</h1>
            <p>
              Con más de 37 años de experiencia, HYTORC es la marca más confiable en herramientas de torque y tensión a
              nivel mundial. Ofrecemos soluciones innovadoras para el apriete y afloje de tuercas en sectores clave como
              la minería, siderurgia, refinerías, energía eólica y plantas nucleares. Nuestra tecnología reduce tiempos
              de mantenimiento, mejora la seguridad y garantiza la máxima precisión en cada aplicación.
            </p>
            <p>
              En Comercializadora del Istmo, S.A. de CV. (COISA), distribuimos en México la tecnología más avanzada en
              llaves de torque hidráulicas, sistemas de tensión y equipos de apriete controlado. Nuestro compromiso es
              ayudar a las empresas a optimizar procesos industriales, reducir costos operativos y minimizar riesgos,
              asegurando trabajos más seguros y eficientes.
            </p>
            <p>
              Descubre por qué HYTORC es la solución líder en herramientas de torque en México.
            </p>
          </div>
        </div>
      </div>
      <!-- Right Side Background Image -->
      <div class="d-none d-lg-block" style="position: absolute; right: 0; top: 0; width: 50%; height: 100%; z-index: 1; background: url('assets/Captura de pantalla 2026-03-06 100724.png') left center/cover no-repeat;"></div>
      <div class="d-block d-lg-none" style="width: 100%; height: 300px; background: url('assets/Captura de pantalla 2026-03-06 100724.png') center/cover no-repeat;"></div>
    </section>
    <!-- *************************************** BANNER PRINCIPAL SOBRE NOSOTROS *************************************** -->`;

oldHtml = oldHtml.replace(/\r\n/g, '\n');
content = content.replace(/\r\n/g, '\n');
content = content.replace(oldHtml, newHtml);

// 3. Contact footer center
content = content.replace(
    '<div class=\"col-12\" style=\"text-align:center;\">',
    '<div class=\"col-12\" style=\"display: flex; justify-content: center; text-align:center;\">'
);

fs.writeFileSync('sobre-nosotros.html', content);
console.log('Update Complete');
