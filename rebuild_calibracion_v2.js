const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\EIADMIN\\.gemini\\antigravity\\scratch\\hytorc-colombia';

// Read the WORKING taller-servicios.html as template
const template = fs.readFileSync(path.join(dir, 'taller-servicios.html'), 'utf8');

// Split into lines preserving \r\n
const lines = template.split('\n');

// HEAD section: lines 1-20 (index 0-19) — we'll modify title and add Bootstrap + styles
// HEADER+BODY: lines 21-171 (index 20-170) — keep exactly as is
// MAIN start: line 174 (index 173) — we replace everything from here
// FOOTER: lines 376-443 (index 375-442) — keep exactly as is

// Extract the header HTML (from <body> through </header>) 
const headerBlock = lines.slice(20, 171).join('\n'); // Lines 21-171

// Extract the footer HTML (from </main> through </html>)
const footerBlock = lines.slice(375).join('\n'); // Lines 376 onwards

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
 <!-- .......... MAIN .......... -->
 <main class="page-content cal-page">

 <!-- BANNER -->
 <section class="cal-banner">
 <div class="cal-section" style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:20px;">
 <div>
 <h1>LABORATORIO DE CALIBRACIÓN</h1>
 <h2>Tu Aliado en Calibración de Herramientas Hytorc</h2>
 </div>
 <div>
 <img src="assets/LogoCoisa.png" alt="COISA" style="max-height:80px; width:auto;">
 </div>
 </div>
 </section>

 <!-- LABORATORIO -->
 <section>
 <div class="cal-section">
 <div class="cal-lab">
 <div class="cal-lab-text">
 <h2>Laboratorio de Calibración</h2>
 <p>
 El laboratorio de calibración forma parte del grupo de trabajo de HYTORC, y ofrece servicios de calibración en las magnitudes de par torsional y presión relativa, contamos con:
 </p>
 <div class="cal-features">
 <div class="cal-feature">
 Acreditación ante la ema a.c. en la magnitud de Par Torsional (No. De Acreditación PT-10)
 <br><br>
 <a href="#" class="cal-btn">ACREDITACIONES</a>
 </div>
 <div class="cal-feature">
 Sistema de gestión de la calidad basado en la norma NMX-EC-17025-IMNC-vigente (ISO/IEC vigente).<br>
 "Requisitos generales para la competencia de los laboratorios de ensayo y de calibración".
 </div>
 <div class="cal-feature">
 Acreditación ante la ema a.c. en la magnitud de Presión Relativa (No. De Acreditación PT-144)
 <br><br>
 <a href="#" class="cal-btn">ACREDITACIONES</a>
 </div>
 <div class="cal-feature">
 Trazabilidad Metrológica a Patrones Nacionales de Presión y Par Torsional mantenidos en el CENAM.
 </div>
 </div>
 </div>
 <div class="cal-lab-img">
 <img src="assets/Captura de pantalla 2026-03-04 140529.png" alt="Laboratorio de Calibración">
 </div>
 </div>
 </div>
 </section>

 <!-- RUTA MOVIL -->
 <section class="cal-ruta">
 <div class="cal-section" style="display:flex; flex-wrap:wrap; align-items:center; gap:40px;">
 <div class="cal-ruta-text">
 <h2>RUTA MÓVIL</h2>
 <p>
 Los servicios de mantenimiento y calibración en sitio, han sido completamente diseñados para incluir la más reciente tecnología de calibración móvil y mano de obra con experiencia en un ambiente controlado, con la capacidad de atender herramientas hidráulicas y accesorios a fin de 250 lbf.ft hasta 20 000 lbf.ft.
 </p>
 </div>
 <div class="cal-ruta-img">
 <img src="assets/Captura de pantalla 2026-03-04 140500.png" alt="Ruta Móvil">
 </div>
 </div>
 </section>

 <!-- FULL IMAGE -->
 <section class="cal-fullimg">
 <img src="assets/Captura de pantalla 2026-03-04 140508.png" alt="Calibración" style="width:100%; display:block;">
 </section>

 <!-- SERVICIOS -->
 <section class="cal-servicios">
 <div class="cal-section">
 <h2>SERVICIOS</h2>
 <p>
 Los servicios de calibración se llevan a cabo de acuerdo con métodos y procedimientos internos basados en normas nacionales e internacionales. Contamos con personal calificado en las magnitudes de presión y par torsional, con el fin de satisfacer las necesidades de nuestros clientes.
 </p>

 <div class="cal-serv-grid">
 <div class="cal-serv-col">
 <img src="assets/Captura de pantalla 2026-03-04 140522.png" alt="Par Torsional">
 <h5>Magnitud: Par Torsional</h5>
 <ul>
 <li>Torquímetros hidráulicos.</li>
 <li>Herramientas rotativas (neumáticas y eléctricas).</li>
 <li>Torquímetros manuales.</li>
 <li>Medición de multiplicadores de torque (Ofertado solo con Trazabilidad Metrológica)</li>
 </ul>
 </div>
 <div class="cal-serv-col">
 <img src="assets/Captura de pantalla 2026-03-04 140516.png" alt="Presión Relativa">
 <h5>Magnitud: presión relativa</h5>
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
 <h3>PAR TORSIONAL</h3>
 <p>Acreditación ante EMA en Par Torsional No. PT-10. Para mayor información visitar www.ema.org.mx</p>
 <div class="cal-table">
 <table>
 <tr><th>Instrumentos que calibramos</th><th>Intervalo de medida</th></tr>
 <tr><td>Torquímetros hidráulicos de la marca Hytorc</td><td>50 lbf.ft a 25 000 lbf.ft</td></tr>
 <tr><td>Torquímetros hidráulicos de la marca Hytorc (Servicio en Sitio)</td><td>185 lbf.ft a 20 000 lbf.ft</td></tr>
 <tr><td>Torquímetros neumáticos y eléctricos de la marca Hytorc</td><td>50 lbf.ft a 7 375 lbf.ft</td></tr>
 <tr><td>Torquímetros neumáticos y eléctricos de la marca Hytorc (Servicio en Sitio)</td><td>185 lbf.ft a 7 375 lbf.ft</td></tr>
 </table>
 </div>
 <div class="cal-table">
 <table>
 <tr><th>Instrumentos que calibramos</th><th>Intervalo de medida</th></tr>
 <tr><td rowspan="3"><br><strong>Torquímetros Manuales</strong></td><td>2 lbf.ft a 20 lbf.ft</td></tr>
 <tr><td>20 lbf.ft a 200 lbf.ft</td></tr>
 <tr><td>200 lbf.ft a 2000 lbf.ft</td></tr>
 </table>
 </div>

 <h3>PRESIÓN RELATIVA</h3>
 <p>Acreditación ante EMA en Presión Relativa No. PT-144. Para mayor información visitar www.ema.org.mx</p>
 <div class="cal-table">
 <table>
 <tr><th>Instrumentos que calibramos</th><th>Intervalo de medida</th></tr>
 <tr><td>Manómetros Secundarios de Presión Manómetros de Presión con Elemento Elástico Sensible, Manómetros Digitales y/o Graficadores de Presión, Manómetros de Proceso, etc.</td><td>1.5 psi a 29 700 psi</td></tr>
 </table>
 </div>
 </div>
 </div>
 </section>

 <!-- CONTACTANOS -->
 <section class="cal-contact">
 <h2>CONTÁCTANOS PARA MÁS INFORMACIÓN</h2>
 </section>

 </main>`;

// Build the complete file
const headSection = `<!DOCTYPE html>
<html lang="es">

<head>
 <meta charset="UTF-8" />
 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 <title>Laboratorio Calibración | HYTORC Colombia</title>
 <meta name="description"
 content="Laboratorio de calibración HYTORC Colombia. Calibración de manómetros, torquímetros y equipos de medición." />
 <meta name="robots" content="index, follow" />
 <link rel="canonical" href="https://www.hytorc.com.co/calibracion.html" />
 <link rel="stylesheet" href="css/styles.css" />
 <!-- Google Font -->
 <link rel="preconnect" href="https://fonts.googleapis.com" />
 <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
 ${calibracionStyles}
</head>
`;

const finalHTML = headSection + headerBlock + '\n' + calibracionContent + '\n' + footerBlock;

fs.writeFileSync(path.join(dir, 'calibracion.html'), finalHTML, 'utf8');
console.log('Successfully rebuilt calibracion.html with CORRECT header from taller-servicios.html');
