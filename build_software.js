const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\EIADMIN\\.gemini\\antigravity\\scratch\\hytorc-colombia';

// Read the WORKING taller-servicios.html as template
const template = fs.readFileSync(path.join(dir, 'taller-servicios.html'), 'utf8');
const lines = template.split('\n');

// Extract header HTML (from <body> through </header>) — lines 21-171
const headerBlock = lines.slice(20, 171).join('\n');

// Extract footer HTML (from </main> through </html>) — lines 376 onwards
const footerBlock = lines.slice(375).join('\n');

const softwareStyles = `
 <style>
 /* ===== SOFTWARE PAGE SCOPED STYLES ===== */
 .sw-page { font-family: 'Source Sans 3', Arial, sans-serif; }
 .sw-section { max-width: 1400px; margin: 0 auto; padding: 0 15px; }

 /* Banner */
 .sw-banner {
 background: url('assets/dim-background-black.png') no-repeat center center;
 background-size: cover;
 padding: 100px 0 50px;
 position: relative;
 }
 .sw-banner::before {
 content: '';
 position: absolute; top:0; left:0; right:0; bottom:0;
 background: rgba(0,0,0,0.55);
 z-index: 0;
 }
 .sw-banner .sw-section { position: relative; z-index: 1; max-width: 700px; margin: 0 auto 0 60px; }
 .sw-banner h1 {
 font-size: 42px; color: #999966; font-weight: 700;
 font-style: italic; text-transform: uppercase; margin-bottom: 15px;
 }
 .sw-banner h2 { font-size: 18px; color: #fff; font-weight: 400; margin: 0; line-height: 1.6; }

 /* App Sections */
 .sw-app { padding: 60px 0; }
 .sw-app-grid {
 display: flex; flex-wrap: wrap; gap: 40px;
 align-items: center;
 }
 .sw-app-img { flex: 1 1 400px; }
 .sw-app-img img { width: 100%; border-radius: 4px; }
 .sw-app-text { flex: 1 1 400px; }
 .sw-app-text h2 {
 font-size: 28px; font-weight: 400; color: #333;
 margin-bottom: 20px; font-style: italic;
 }
 .sw-app-text h2 span {
 font-weight: 700; color: #333;
 }
 .sw-app-text p { font-size: 15px; line-height: 1.7; color: #555; text-align: justify; }
 .sw-app-text p b { color: #333; }

 .sw-store-badges { display: flex; align-items: center; gap: 12px; margin: 20px 0; flex-wrap: wrap; }
 .sw-store-badges img { height: 40px; width: auto; }

 .sw-small-note { font-size: 13px; color: #999; }

 .sw-btn-outline {
 display: inline-block;
 border: 2px solid #333;
 color: #333;
 padding: 8px 24px;
 text-decoration: none;
 font-weight: 600;
 font-size: 14px;
 text-transform: uppercase;
 letter-spacing: 1px;
 transition: all 0.3s;
 }
 .sw-btn-outline:hover {
 background: #333; color: #fff;
 }

 /* Servicios Web */
 .sw-web {
 background: #e8e8e8;
 padding: 60px 0;
 }
 .sw-web h2 {
 font-size: 28px; font-weight: 700; font-style: normal; color: #1a2936;
 margin-bottom: 30px; border-left: 3px solid #e42528; padding-left: 15px;
 text-transform: uppercase;
 }
 .sw-web h2 strong { font-weight: 700; }
 .sw-web-grid {
 display: flex; flex-wrap: wrap; gap: 30px;
 }
 .sw-web-card { flex: 1 1 400px; }
 .sw-web-card img { width: 100%; border-radius: 4px; margin-bottom: 15px; }
 .sw-web-card h4 { font-size: 22px; font-weight: 600; color: #333; margin-bottom: 10px; }
 .sw-web-card ul { padding-left: 20px; color: #555; margin-bottom: 20px; }
 .sw-web-card li { margin-bottom: 6px; font-size: 14px; line-height: 1.6; }
 .sw-web-card li strong { color: #333; }

 /* Contact */
 .sw-contact {
 background: #546670; padding: 50px 0; text-align: center; cursor: pointer;
 }
 .sw-contact h2 {
 font-size: 24px; color: #fff; letter-spacing: 5px;
 font-weight: 600; text-transform: uppercase; margin: 0;
 }

 @media (max-width: 991px) {
 .sw-banner { padding: 100px 0 50px; }
 .sw-banner .sw-section { margin: 0 auto; padding: 0 20px; }
 .sw-banner h1 { font-size: 32px; }
 .sw-app-grid.sw-reverse { flex-direction: column-reverse; }
 }
 @media (max-width: 575px) {
 .sw-banner h1 { font-size: 26px; }
 .sw-banner h2 { font-size: 16px; }
 }
 </style>`;

const softwareContent = `
 <!-- .......... MAIN .......... -->
 <main class="page-content sw-page">

 <!-- BANNER -->
 <section class="sw-banner">
 <div class="sw-section">
 <h1>APLICACIONES Y SOFTWARE DE HYTORC</h1>
 <h2>Explore nuestro conjunto de soluciones de software diseñadas para llevar su empernado a la era moderna.</h2>
 </div>
 </section>

 <!-- APLICACIÓN HYTORC CONNECT -->
 <section class="sw-app">
 <div class="sw-section">
 <div class="sw-app-grid">
 <div class="sw-app-img">
 <img src="assets/Captura de pantalla 2026-03-04 141927.png" alt="Aplicación HYTORC Connect">
 </div>
 <div class="sw-app-text">
 <h2><span>APLICACIÓN</span> HYTORC CONNECT</h2>
 <p>
 <b>Creación de plantillas de empernado sin inconvenientes:</b> cree y envíe sin esfuerzo plantillas de atornillado a su herramienta de torsión eléctrica HYTORC con Bluetooth®* habilitada para lograr precisión y eficiencia.
 </p>
 <p>
 <b>Documentación completa del proyecto:</b> simplifique los flujos de trabajo de su proyecto con herramientas de documentación fáciles de usar, garantizando la precisión y el cumplimiento. Operaciones de empernado avanzadas simplificadas: navegue con confianza por operaciones de empernado secuenciales de ruedas complejas y de múltiples pasadas, ahorrando tiempo y reduciendo errores.
 </p>
 <p>
 <b>Accesibilidad desde múltiples dispositivos:</b> mantenga el control dondequiera que esté, ya sea en un dispositivo móvil, una tableta o una PC con Windows®, la aplicación HYTORC Connect lo mantiene conectado y productivo.
 </p>
 <div class="sw-store-badges">
 <a href="https://apps.apple.com/us/app/hytorc-connect/id1596349132" target="_blank">
 <img src="assets/Captura de pantalla 2026-03-04 141843.png" alt="App Store">
 </a>
 <a href="https://play.google.com/store/apps/details?id=com.hytorc.hytorcconnect" target="_blank">
 <img src="assets/Captura de pantalla 2026-03-04 141920.png" alt="Google Play">
 </a>
 <a href="https://apps.microsoft.com/detail/9pj1s051mq5r?mode=direct" target="_blank">
 <img src="assets/Captura de pantalla 2026-03-04 141955.png" alt="Microsoft Store">
 </a>
 </div>
 <p class="sw-small-note">
 *Herramientas LION GUN, LION GUN X y LITHIUM SERIES II que están equipadas con Bluetooth®.
 </p>
 </div>
 </div>
 </div>
 </section>

 <!-- BOLTING MANAGER -->
 <section class="sw-app">
 <div class="sw-section">
 <div class="sw-app-grid sw-reverse">
 <div class="sw-app-text">
 <h2><span>APLICACIÓN</span> HYTORC CONNECT</h2>
 <p>Bolting Manager es un sistema de gestión de empernado basado en la nube que simplifica la configuración, la documentación y el control del trabajo.</p>
 <p>
 <b>Simplifique la configuración del trabajo:</b> cree y guarde plantillas de trabajos de atornillado personalizadas para ahorrar tiempo y reducir errores. Conectividad sin esfuerzo: conecte su bomba a Wi-Fi para una integración perfecta a su red.
 </p>
 <p>
 <b>Compatibilidad mejorada:</b> Soporte de protocolo abierto disponible en modelos seleccionados para una fácil integración con sus sistemas.
 </p>
 <p>
 <b>Control y documentación optimizados:</b> obtenga un mejor control de calidad, una gestión de datos organizada e informes detallados para cada operación de empernado.
 </p>
 <a href="contacto.html" class="sw-btn-outline">Contacta con un vendedor</a>
 </div>
 <div class="sw-app-img">
 <img src="assets/Captura de pantalla 2026-03-04 141859.png" alt="Bolting Manager">
 </div>
 </div>
 </div>
 </section>

 <!-- APLICACIÓN MÓVIL -->
 <section class="sw-app">
 <div class="sw-section">
 <div class="sw-app-grid">
 <div class="sw-app-img">
 <img src="assets/Captura de pantalla 2026-03-04 141936.png" alt="Aplicación Móvil HYTORC">
 </div>
 <div class="sw-app-text">
 <h2><span>APLICACIÓN MÓVIL</span> HYTORC CONNECT</h2>
 <p>
 <b>Acceso instantáneo:</b> obtenga tablas de torsión, videos operativos y manuales de productos, todo en un solo lugar.
 </p>
 <p>
 <b>Localizador de servicios:</b> encuentre fácilmente el centro de servicio HYTORC más cercano.
 </p>
 <p>
 <b>Disponibilidad multiplataforma:</b> disponible para dispositivos Android e iOS.
 </p>
 <div class="sw-store-badges">
 <a href="https://apps.apple.com/us/app/hytorc-industrial-bolting-systems/id904956429" target="_blank">
 <img src="assets/Captura de pantalla 2026-03-04 141843.png" alt="App Store">
 </a>
 <a href="https://play.google.com/store/apps/details?id=com.app.hytorc&hl=en" target="_blank">
 <img src="assets/Captura de pantalla 2026-03-04 141920.png" alt="Google Play">
 </a>
 </div>
 </div>
 </div>
 </div>
 </section>

 <!-- SERVICIOS WEB -->
 <section class="sw-web">
 <div class="sw-section">
 <h2>SERVICIOS<strong> WEB</strong></h2>
 <div class="sw-web-grid">
 <div class="sw-web-card">
 <img src="assets/Captura de pantalla 2026-03-04 141944.png" alt="Convertidor de par y presión">
 <h4>Convertidor de par y presión</h4>
 <ul>
 <li><strong>Preciso:</strong> elimina errores manuales para una aplicación de torque precisa.</li>
 <li><strong>Fácil de usar:</strong> Interfaz sencilla para entrada y conversión rápidas.</li>
 <li><strong>Versátil:</strong> compatible con múltiples herramientas HYTORC.</li>
 </ul>
 <a href="https://hytorc.com/converter" target="_blank" class="sw-btn-outline">Convertidor de par y presión</a>
 </div>
 <div class="sw-web-card">
 <img src="assets/Captura de pantalla 2026-03-04 141912.png" alt="Calculadora de bridas">
 <h4>Calculadora de bridas</h4>
 <ul>
 <li><strong>Personalizable:</strong> ingrese las especificaciones de la brida, el tamaño del perno y el material de la junta.</li>
 <li><strong>Cumplimiento de estándares:</strong> se alinea con las pautas ASME y API.</li>
 <li><strong>Eficiente:</strong> ahorra tiempo y garantiza una distribución precisa de la carga del perno.</li>
 </ul>
 <a href="https://hytorc.com/app01/calculator" target="_blank" class="sw-btn-outline">Calculadora de bridas</a>
 </div>
 </div>
 </div>
 </section>

 <!-- CONTACTANOS -->
 <section class="sw-contact">
 <h2>CONTÁCTANOS PARA MÁS INFORMACIÓN</h2>
 </section>

 </main>`;

// Build the complete file
const headSection = `<!DOCTYPE html>
<html lang="es">

<head>
 <meta charset="UTF-8" />
 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 <title>Softwares | HYTORC Colombia</title>
 <meta name="description"
 content="Aplicaciones y software de HYTORC. HYTORC Connect, Bolting Manager, convertidor de par y calculadora de bridas." />
 <meta name="robots" content="index, follow" />
 <link rel="canonical" href="https://www.hytorc.com.co/software.html" />
 <link rel="stylesheet" href="css/styles.css" />
 <!-- Google Font -->
 <link rel="preconnect" href="https://fonts.googleapis.com" />
 <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
 ${softwareStyles}
</head>
`;

const finalHTML = headSection + headerBlock + '\n' + softwareContent + '\n' + footerBlock;

fs.writeFileSync(path.join(dir, 'software.html'), finalHTML, 'utf8');
console.log('Successfully built software.html');

