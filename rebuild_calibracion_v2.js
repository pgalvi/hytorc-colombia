const fs = require('fs');
const path = require('path');

const dir = __dirname;

// Read the WORKING taller-servicios.html as template
const template = fs.readFileSync(path.join(dir, 'taller-servicios.html'), 'utf8');

// Split into lines preserving \r\n
const lines = template.split('\n');

// HEAD section: lines 1-20 (index 0-19) — we'll modify title and add Bootstrap + styles
// HEADER+BODY: lines 21-171 (index 20-170) — keep exactly as is
// MAIN start: line 174 (index 173) — we replace everything from here
// FOOTER: lines 376-443 (index 375-442) — keep exactly as is

// Extract the header HTML dynamically (from <body> through </header>)
let bodyIndex = lines.findIndex(line => line.includes('<body>'));
if (bodyIndex === -1) bodyIndex = 123;
let headerEndIndex = lines.findIndex(line => line.includes('</header>'));
if (headerEndIndex === -1) headerEndIndex = 306;
const headerBlock = lines.slice(bodyIndex, headerEndIndex + 1).join('\n');

// Extract the footer HTML dynamically (from wrapFooter/FOOTER through </html>)
let footerIndex = lines.findIndex(line => line.includes('FOOTER') && line.includes('?.??.'));
if (footerIndex === -1) footerIndex = lines.findIndex(line => line.includes('wrapFooter'));
if (footerIndex === -1) footerIndex = 500;
const footerBlock = lines.slice(footerIndex).join('\n');

const calibracionStyles = `
 <style>
 /* ===== CALIBRACIÓN PAGE SCOPED STYLES ===== */
 .cal-page { font-family: 'Source Sans 3', Arial, sans-serif; }
 .cal-page .cal-section { max-width: 1400px; margin: 0 auto; padding: 0 15px; }

 /* Banner */
 .cal-banner {
 background: url('assets/Captura de pantalla 2026-03-04 140516.png') no-repeat center center;
 background-size: cover;
 padding: 160px 0 80px;
 position: relative;
 }
 .cal-banner::before {
 content: '';
 position: absolute; top:0; left:0; right:0; bottom:0;
 background: rgba(0,0,0,0.5);
 z-index: 0;
 }
 .cal-banner .cal-section { position: relative; z-index: 1; }
 .cal-banner h1 {
 font-size: 54px; color: #999966; font-weight: 600;
 margin: 0 0 10px; text-transform: uppercase;
 }
 .cal-banner h2 { font-size: 20px; color: #fff; font-weight: 400; margin: 0; }

 /* Laboratorio Section */
 .cal-lab {
 display: flex; flex-wrap: wrap; gap: 40px;
 padding: 60px 0;
 }
 .cal-lab-text { flex: 1 1 500px; }
 .cal-lab-img { flex: 1 1 400px; }
 .cal-lab-img img { width: 100%; border-radius: 8px; }
 .cal-lab h2 { font-size: 30px; font-weight: 600; color: #333; text-transform: uppercase; margin-bottom: 20px; }
 .cal-lab p { font-size: 15px; line-height: 1.7; color: #555; }

 .cal-features { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
 .cal-feature {
 padding: 15px 15px 15px 50px;
 position: relative;
 font-size: 14px; line-height: 1.6; color: #555;
 background: #f9f9f9; border-radius: 6px;
 }
 .cal-feature::before {
 content: '★';
 position: absolute; left: 15px; top: 15px;
 color: #d63031; font-size: 20px;
 }
 .cal-btn {
 display: inline-block;
 background: #999966; color: #fff; padding: 8px 24px;
 text-decoration: none; font-weight: 600; font-size: 13px;
 letter-spacing: 1px; margin-top: 10px; border: none;
 text-transform: uppercase; transition: background 0.3s;
 }
 .cal-btn:hover { background: #7a7a50; color: #fff; }

 /* Ruta Movil */
 .cal-ruta {
 display: flex; flex-wrap: wrap; align-items: center; gap: 40px;
 padding: 70px 0; background: #f5f5f5;
 }
 .cal-ruta-text { flex: 1 1 400px; }
 .cal-ruta-img { flex: 1 1 400px; }
 .cal-ruta-img img { width: 100%; border-radius: 8px; }
 .cal-ruta h2 { font-size: 32px; font-weight: 600; color: #333; text-transform: uppercase; margin-bottom: 15px; }
 .cal-ruta p { font-size: 15px; line-height: 1.7; color: #555; }

 /* Full-width image */
 .cal-fullimg { padding: 0; }
 .cal-fullimg img { width: 100%; display: block; }

 /* Servicios */
 .cal-servicios { padding: 80px 0; }
 .cal-servicios h2 { font-size: 32px; font-weight: 600; color: #333; text-transform: uppercase; margin-bottom: 15px; }
 .cal-servicios p { font-size: 15px; line-height: 1.7; color: #555; }
 .cal-serv-grid { display: flex; flex-wrap: wrap; gap: 30px; margin-top: 20px; }
 .cal-serv-col { flex: 1 1 400px; }
 .cal-serv-col img { width: 100%; border-radius: 8px; margin-bottom: 15px; }
 .cal-serv-col h5 { font-size: 20px; font-weight: 600; color: #333; }
 .cal-serv-col ul { padding-left: 20px; color: #555; }
 .cal-serv-col li { margin-bottom: 6px; font-size: 14px; }

 /* Tables */
 .cal-tables { margin-top: 40px; }
 .cal-tables h3 { font-size: 16px; font-weight: 700; color: #333; margin-bottom: 5px; }
 .cal-tables p { font-size: 14px; color: #555; margin-bottom: 15px; }
 .cal-table { overflow-x: auto; margin-bottom: 30px; }
 .cal-table table { width: 100%; border-collapse: collapse; }
 .cal-table th {
 background: #666; color: #fff; font-weight: 700;
 padding: 12px 15px; font-size: 14px; border: 1px solid #dee2e6; text-align: left;
 }
 .cal-table td { padding: 12px 15px; font-size: 14px; border: 1px solid #dee2e6; }
 .cal-table tr:nth-child(odd) td { background: rgba(100,100,100,0.12); }
 .cal-table tr:nth-child(even) td { background: rgba(100,100,100,0.25); }

 /* Contactanos */
 .cal-contact {
 background: #546670; padding: 50px 0; text-align: center;
 }
 .cal-contact h2 {
 font-size: 24px; color: #fff; letter-spacing: 5px;
 font-weight: 600; text-transform: uppercase; margin: 0;
 }

 @media (max-width: 991px) {
 .cal-banner { padding: 100px 0 50px; }
 .cal-banner h1 { font-size: 36px; }
 .cal-features { grid-template-columns: 1fr; }
 }
 @media (max-width: 575px) {
 .cal-banner h1 { font-size: 28px; }
 .cal-banner h2 { font-size: 16px; }
 }
 </style>`;

const calibracionContent = `
<main class="page-content cal-page">

 <!-- BANNER -->
 <section class="cal-banner">
 <div class="cal-section"
 style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:20px;">
 <div>
 <h1>LABORATORIO DE CALIBRACIÓN</h1>
 <h2>Tu Aliado en Calibración de Herramientas Hytorc</h2>
 </div>
 <div>
 
 </div>
 </div>
 </section>

 <!-- LABORATORIO -->
 <section>
 <div class="cal-section">
 <div class="cal-lab">
 <div class="cal-lab-text">
  <h2 class="tit-LineRedLeft">MAGNITUD PAR-TORSIONAL hasta &nbsp;20000 N.m<br><span style="font-size:0.75em; font-weight:400;">(Torquímetros HYTORC Hidráulicos, Eléctricos y Neumáticos)</span></h2>
  <p>
  El laboratorio de calibración forma parte del grupo de trabajo de HYTORC, y ofrece servicios de calibración en
  las magnitudes de Par-Torsional:
  </p>
  <div class="cal-features" style="grid-template-columns: 1fr;">
   <div class="cal-feature">
   En <strong>SOLUCIONES HYTORC COLOMBIA</strong> SAS contamos Acreditación ONAC, vigente a
   la fecha, con código de acreditación 19-LAC-008 bajo la norma ISO/IEC 17025:2017".
   <br><br>
   <a href="assets/8. ISO17025 19-LAC-008 Certificado (1).pdf#toolbar=0"
   target="_blank" class="cal-btn">REVISE AQUÍ NUESTRA ACREDITACIÓN</a>
   </div>
   </div>
   <div style="margin-top: 25px; display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
    <img src="assets/1.jpeg" alt="ONAC Acreditado" style="max-height: 80px; width: auto; border-radius: 4px;">
    <img src="assets/2.png" alt="Acreditación 2" style="max-height: 80px; width: auto; border-radius: 4px;">
    <img src="assets/hytorc-black-logo.png" alt="HYTORC Logo" style="max-height: 80px; width: auto; border-radius: 4px;">
   </div>
 </div>
 <div class="cal-lab-img">
 <img src="assets/RR.png" alt="Laboratorio de Calibración" loading="lazy" decoding="async">
 </div>
 </div>
 </div>
 </section>

 <!-- SERVICIOS DE CALIBRACIÓN EN SITIO -->
 <section class="cal-ruta">
 <div class="cal-section" style="display:flex; flex-wrap:wrap; align-items:center; gap:40px;">
 <div class="cal-ruta-text">
  <h2 class="tit-LineRedLeft"><span style="color: #0d6efd; display: inline !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important;">OTROS</span> SERVICIOS <span style="color: #0d6efd; display: inline !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important;">DE CALIBRACION (ofertados solo por trazabilidad o en convenio)</span></h2>
  <p>
  <span style="color: #0d6efd; font-weight: 600;">Prestamos otros servicios de calibracion fuera del alcance acreditado, estos</span> servicios de calibración se llevan a cabo de acuerdo con métodos y procedimientos internos basados en normas nacionales e internacionales.
  <br><br>
  Contamos con personal calificado en las magnitudes de presión y par torsional, con el fin de satisfacer las necesidades de nuestros clientes.
  </p>
 </div>
 <div class="cal-ruta-img">
 <video src="assets/VIDEO 02.mp4" autoplay loop muted playsinline title="Servicios de calibración en sitio" style="width: 100%; height: auto; border-radius: 6px;"></video>
 </div>
 </div>
 </section>

   <!-- FULL IMAGE -->
 <section class="cal-fullimg" style="position: relative; width: 100%; overflow: hidden;">
 <!-- Base image (shows the middle photo and the white separators perfectly preserving the aspect ratio) -->
 <img src="assets/Captura de pantalla 2026-03-04 140508.png" alt="Calibración" style="width:100%; display:block;" loading="lazy" decoding="async">
 
 <!-- Left Replacement: RR -->
 <div style="position: absolute; top: 0; left: 0; width: 33.70%; height: 100%; clip-path: polygon(0 0, 100% 0, 89.85% 100%, 0 100%); overflow: hidden;">
    <img src="assets/RR.png" alt="RR" style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
 </div>
 
 <!-- Right Replacement: Sin título (28) -->
 <div style="position: absolute; top: 0; right: 0; width: 34.05%; height: 100%; clip-path: polygon(9.86% 0, 100% 0, 100% 100%, 0 100%); overflow: hidden;">
    <img src="assets/Sin título (28).png" alt="Vehiculo" style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
 </div>
 </section>

 <!-- SERVICIOS -->
 <section class="cal-servicios">
 <div class="cal-section">
 <h2 class="tit-LineRedLeft">SERVICIOS</h2>
 <p>
 Los servicios de calibración se llevan a cabo de acuerdo con métodos y procedimientos internos basados en
 normas nacionales e internacionales. Contamos con personal calificado en las magnitudes de presión y par
 torsional, con el fin de satisfacer las necesidades de nuestros clientes.
 </p>

 <div class="cal-serv-grid">
 <div class="cal-serv-col">
 <img src="assets/Captura de pantalla 2026-03-04 140522.png" alt="Par Torsional" loading="lazy" decoding="async">
 <h5 class="tit-LineRedLeft">Magnitud: Par Torsional</h5>
 <ul>
 <li>Torquímetros hidráulicos.</li>
 <li>Herramientas rotativas (neumáticas y eléctricas).</li>
 <li>Torquímetros manuales.</li>
 <li>Medición de multiplicadores de torque (Ofertado solo con Trazabilidad Metrológica)</li>
 </ul>
 </div>
 <div class="cal-serv-col">
 <img src="assets/Captura de pantalla 2026-03-04 140516.png" alt="Presión Relativa" loading="lazy" decoding="async">
 <h5 class="tit-LineRedLeft">Magnitud: presión relativa</h5>
 <ul>
 <li>Calibración de manómetros secundarios de presión.</li>
 <li>Medición de dinamómetros hidráulicos (Ofertado solo con Trazabilidad Metrológica).</li>
 <li>Graficadores de presión (manógrafos).</li>
 <li>Manómetros digitales.</li>
 </ul>
 </div>
 </div>

  <!-- TABLES -->
  <div class="cal-tables">
  <h3 class="tit-LineRedLeft" style="font-size: 22px;">ALCANCE MAGNITUD DE PAR TORSIONAL</h3>
  <div class="cal-table">
  <table>
  <tr>
  <th>Instrumentos que calibramos</th>
  <th>Intervalo de medida</th>
  </tr>
  <tr>
  <td>Torquímetros <strong>HIDRÁULICOS</strong> de la marca Hytorc</td>
  <td>200 N.m hasta 20000 N.m (148 lbf.ft &nbsp;hasta 14751 lbf.ft)</td>
  </tr>
  <tr>
  <td>Torquímetros <strong>ROTATIVOS</strong> (Neumáticos y Eléctricos) de la marca Hytorc</td>
  <td>200 N.m hasta 4068 N.m (148 lbf.ft &nbsp;hasta 3000 lbf.ft)</td>
  </tr>
  </table>
  </div>
  <p style="font-size:13px; color:#d63031; margin-top:6px;">
  Para mayores detalles de la Acreditación ante ONAC en Par Torsional 19-LAC-008. pueden consultar / visitar www.onac.org.co
  </p>
   </div>
  </div>
 </section>

 <!-- CONTACTANOS -->
 <section class="cal-contact">
 <h2 style="text-align: center;">CONTÁCTANOS PARA MÁS INFORMACIÓN</h2>
 </section>

 </main>
 </main>
`;

// Build the complete file
const headSection = `<!DOCTYPE html>
<html lang="es">

<head>
 <meta charset="UTF-8" />
 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 <title>Laboratorio Calibración | HYTORC Colombia</title>
  <link rel="apple-touch-icon" sizes="180x180" href="assets/favicon-192x192.png">
 <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png">
 <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16x16.png">
 <link rel="icon" type="image/png" sizes="48x48" href="assets/favicon-48x48.png">
 <link rel="icon" type="image/png" sizes="192x192" href="assets/favicon-192x192.png">
 <meta name="theme-color" content="#dc143c">
 <meta name="description"
 content="Laboratorio de calibración HYTORC Colombia. Calibración de manómetros, torquímetros y equipos de medición." />
 <meta name="robots" content="index, follow" />
 <link rel="canonical" href="https://www.hytorc.com.co/calibracion.html" />
 <link rel="stylesheet" href="css/styles.css" />
 <link rel="stylesheet" href="css/mobile-fixes.css" />
 <!-- Google Font -->
 <link rel="preconnect" href="https://fonts.googleapis.com" />
 <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
 ${calibracionStyles}
</head>
`;

const finalHTML = headSection + headerBlock + '\n' + calibracionContent + '\n' + footerBlock;

fs.writeFileSync(path.join(dir, 'calibracion.html'), finalHTML, 'utf8');
console.log('Successfully rebuilt calibracion.html with CORRECT header from taller-servicios.html');
