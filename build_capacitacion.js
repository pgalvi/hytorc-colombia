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

const capacitacionStyles = `
 <style>
 /* ===== / CAPACITACIÓN PAGE SCOPED STYLES ===== */
 .-page { font-family: 'Source Sans 3', Arial, sans-serif; }
 .-section { max-width: 1400px; margin: 0 auto; padding: 0 15px; }

 /* Banner */
 .-banner {
 background: url('assets/dim-background-black.png') no-repeat center center;
 background-size: cover;
 padding: 100px 0 50px;
 position: relative;
 }
 .-banner::before {
 content: '';
 position: absolute; top:0; left:0; right:0; bottom:0;
 background: rgba(0,0,0,0.45);
 z-index: 0;
 }
 .-banner .-section {
 position: relative; z-index: 1;
 display: flex; align-items: center; justify-content: space-between;
 flex-wrap: wrap; gap: 30px;
 }
 .-banner-text h1 {
 font-size: 36px; color: #fff; font-weight: 700;
 text-transform: uppercase; margin-bottom: 8px;
 }
 .-banner-text h2 { font-size: 18px; color: #fff; font-weight: 400; margin: 0; }
 .-banner-text h2.gold { color: goldenrod; }
 .-banner-logo img { width: 160px; }

 /* Title style (red left border) */
 .-title {
 font-size: 26px; font-weight: 700; color: #1a2936;
 border-left: 3px solid #e42528; padding-left: 15px;
 text-transform: uppercase; margin-bottom: 25px;
 }
 .-title span { font-weight: 400; }

 /* Asociaciones */
 .-asociaciones { padding: 60px 0; }
 .-asociaciones-grid {
 display: flex; flex-wrap: wrap; gap: 40px; align-items: center;
 }
 .-asoc-text { flex: 1 1 450px; }
 .-asoc-text p { font-size: 15px; line-height: 1.7; color: #555; }
 .-asoc-text p strong { color: #333; }
 .-asoc-logos {
 flex: 1 1 300px;
 display: flex; align-items: center; justify-content: flex-end; gap: 20px;
 }
 .-asoc-logos img { height: 80px; }
 .-asoc-logos .-separator {
 width: 1px; height: 80px; background: #ccc;
 }

 /* Formación (image left, text right) */
 .-formacion { padding: 0; }
 .-formacion-grid {
 display: flex; flex-wrap: wrap; align-items: stretch;
 }
 .-formacion-img { flex: 1 1 50%; }
 .-formacion-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
 .-formacion-content { flex: 1 1 50%; padding: 50px 40px; }
 .-formacion-content p { font-size: 14px; color: #777; line-height: 1.7; margin-bottom: 25px; }

 .-features-grid {
 display: grid; grid-template-columns: 1fr 1fr; gap: 25px;
 }
 .-feature { display: flex; gap: 12px; }
 .-feature-icon { width: 30px; height: 30px; flex-shrink: 0; margin-top: 3px; }
 .-feature-icon img { width: 100%; height: 100%; object-fit: contain; }
 .-feature h5 { font-size: 15px; font-weight: 700; color: #333; margin-bottom: 6px; }
 .-feature ul { padding-left: 18px; margin: 0; }
 .-feature li { font-size: 13px; color: #777; line-height: 1.6; }
 .-feature p { font-size: 13px; color: #777; margin: 0; }

 /* Certificaciones */
 .-certificaciones { padding: 60px 0; }
 .-cert-grid {
 display: flex; flex-wrap: wrap; gap: 60px; justify-content: center;
 margin-top: 30px;
 }
 .-cert-card { flex: 1 1 350px; max-width: 500px; }
 .-cert-card h3 {
 font-size: 22px; font-weight: 700; color: #1a2936;
 text-align: center; margin-bottom: 15px;
 }
 .-cert-card p, .-cert-card li {
 font-size: 14px; color: #555; line-height: 1.7;
 }
 .-cert-card ul { padding-left: 20px; }
 .-cert-card a.-read-more {
 color: #555; font-size: 14px; text-decoration: none;
 cursor: pointer;
 }
 .-cert-card a.-read-more:hover { text-decoration: underline; }
 .-cert-card .-hidden-text { display: none; }
 .-cert-card .-hidden-text.-expanded { display: block; }

 /* Entrenar es fácil */
 .-training {
 background: url('assets/bk-WhiteTools.jpg') no-repeat center center;
 background-size: cover; position: relative;
 padding: 60px 0; color: #fff;
 }
 .-training::before {
 content: '';
 position: absolute; top:0; left:0; right:0; bottom:0;
 background: rgba(0,0,0,0.65);
 z-index: 0;
 }
 .-training .-section { position: relative; z-index: 1; }
 .-training-grid {
 display: flex; flex-wrap: wrap; align-items: center; gap: 40px;
 }
 .-training-text { flex: 1 1 300px; }
 .-training-text h2 {
 font-size: 28px; font-weight: 400; color: #fff;
 border-left: 3px solid goldenrod; padding-left: 15px; margin-bottom: 15px;
 }
 .-training-text h2 b { font-weight: 700; }
 .-training-text p { font-size: 14px; color: #ddd; line-height: 1.7; }

 .-training-features { flex: 1 1 500px; }
 .-training-feat-grid {
 display: grid; grid-template-columns: 1fr 1fr; gap: 25px;
 }
 .-train-feat { display: flex; gap: 12px; }
 .-train-feat-icon { width: 40px; height: 40px; flex-shrink: 0; }
 .-train-feat-icon img { width: 100%; }
 .-train-feat h5 {
 font-size: 14px; font-weight: 700; color: #fff; text-transform: uppercase; margin-bottom: 5px;
 }
 .-train-feat p { font-size: 13px; color: #ccc; margin: 0; line-height: 1.6; }

 /* Cursos */
 .-cursos { padding: 60px 0; }
 .-cursos-grid {
 display: flex; flex-wrap: wrap; gap: 30px; margin-top: 30px;
 }
 .-curso-card { flex: 1 1 300px; }
 .-curso-card img { width: 100%; border-radius: 4px; margin-bottom: 15px; }
 .-curso-card h4 {
 font-size: 14px; font-weight: 700; color: #1a2936;
 text-transform: uppercase; margin-bottom: 10px;
 }
 .-curso-card p { font-size: 13px; color: #555; line-height: 1.7; }
 .-curso-card p b { color: #333; }

 /* Contacto form */
 .-contacto { padding: 60px 0; background: #f8f8f8; }
 .-contacto .-title { margin-bottom: 30px; }
 .-form-grid { display: flex; flex-wrap: wrap; gap: 30px; }
 .-form-left { flex: 1 1 350px; }
 .-form-right { flex: 1 1 350px; }
 .-form-group { margin-bottom: 20px; }
 .-form-group label {
 font-size: 12px; text-transform: uppercase; color: #999;
 letter-spacing: 1px; display: block; margin-bottom: 6px;
 }
 .-form-group input, .-form-group textarea {
 width: 100%; border: none; border-bottom: 1px solid #ccc;
 background: transparent; padding: 8px 0;
 font-size: 14px; color: #333; outline: none;
 font-family: 'Source Sans 3', Arial, sans-serif;
 }
 .-form-group textarea { resize: vertical; min-height: 180px; }
 .-form-submit {
 text-align: right; margin-top: 15px;
 }
 .-form-submit button {
 background: #1a2936; color: #fff; border: none;
 padding: 10px 30px; font-size: 14px; font-weight: 600;
 text-transform: uppercase; letter-spacing: 1px; cursor: pointer;
 transition: background 0.3s;
 }
 .-form-submit button:hover { background: #333; }

 @media (max-width: 991px) {
 .-formacion-grid { flex-direction: column; }
 .-features-grid { grid-template-columns: 1fr; }
 .-training-feat-grid { grid-template-columns: 1fr; }
 }
 @media (max-width: 575px) {
 .-banner-text h1 { font-size: 26px; }
 }
 </style>`;

const capacitacionContent = `
 <!-- .......... MAIN .......... -->
 <main class="page-content -page">

 <!-- BANNER -->
 <section class="-banner">
 <div class="-section">
 <div class="-banner-text">
 <h1>CAPACITACIÓN HYTORC</h1>
 <h2>NO TE LIMITES A CAPACITARTE,</h2>
 <h2 class="gold">¡CAPACÍTATE EN EL !</h2>
 </div>
 </div>
 </section>

 <!-- ASOCIACIONES PERFECTAS -->
 <section class="-asociaciones">
 <div class="-section">
 <div class="-asociaciones-grid">
 <div class="-asoc-text">
 <h2 class="-title">ASOCIACIONES <span>PERFECTAS</span></h2>
 <p>HYTORC es la <strong>ÚNICA</strong> empresa de torque que ofrece capacitación certificada por ASME.</p>
 <p><strong>Norma de Competencia Técnica:</strong> Operación de Equipos Hytorc certificada por ANCE.</p>
 <p>• <strong>AGENTE CAPACITADOR STPS: CIS8803057Z6</strong></p>
 <p>•Acreditados por <strong>ANCE</strong> como Centro Evaluador de la Norma de Competencia Técnica: <strong>Operación de Equipos HYTORC de Torque/Tensión.</strong></p>
 </div>
 <div class="-asoc-logos">
 <img src="assets/Captura de pantalla 2026-03-04 191551.png" alt="HYTORC">
 <div class="-separator"></div>
 <img src="assets/Captura de pantalla 2026-03-04 182125.png" alt="ASME">
 </div>
 </div>
 </div>
 </section>

 <!-- ¿POR QUÉ FORMACIÓN HYTORC? -->
 <section class="-formacion">
 <div class="-formacion-grid">
 <div class="-formacion-img">
 <img src="assets/Captura de pantalla 2026-03-04 114134.png" alt="Formación HYTORC">
 </div>
 <div class="-formacion-content">
 <h2 class="-title">¿POR QUÉ FORMACIÓN HYTORC?</h2>
 <p>En el Centro de Evaluación y Certificación HYTORC , nuestro objetivo es elevar la seguridad de sus requisitos operativos y de mantenimiento, mejorando los principios y prácticas de empernado industrial y ayudándolo a mejorar sus habilidades en el manejo de herramientas para satisfacer sus necesidades de mantenimiento.</p>
 <div class="-features-grid">
 <div class="-feature">
 <div class="-feature-icon"><img src="assets/Captura de pantalla 2026-03-04 182217.png" alt=""></div>
 <div>
 <h5>¡Ahorra dinero!</h5>
 <ul>
 <li>Tasas de lesiones más bajas.</li>
 <li>Tiempo de inactividad reducido.</li>
 <li>Menos reelaboración.</li>
 <li>Soporte continuo.</li>
 </ul>
 </div>
 </div>
 <div class="-feature">
 <div class="-feature-icon"><img src="assets/Captura de pantalla 2026-03-04 182112.png" alt=""></div>
 <div>
 <h5>Formación de expertos</h5>
 <ul>
 <li>Seguridad incorporada en cada curso.</li>
 <li>Evaluaciones prácticas durante las clases.</li>
 </ul>
 </div>
 </div>
 <div class="-feature">
 <div class="-feature-icon"><img src="assets/Captura de pantalla 2026-03-04 182129.png" alt=""></div>
 <div>
 <h5>Personal Certificado</h5>
 <ul>
 <li>Agente Capacitador con Registro STPS.</li>
 <li>Instructores Certificados ante CONOCER.</li>
 <li>Personal Certificado en la Norma de Competencia Técnica: Operación de Equipos Hytorc.</li>
 </ul>
 </div>
 </div>
 <div class="-feature">
 <div class="-feature-icon"><img src="assets/Captura de pantalla 2026-03-04 182200.png" alt=""></div>
 <div>
 <h5>Asociado ASME y ANCE</h5>
 <ul>
 <li>Cursos alineados con ASME PCC-1 – 2022.</li>
 <li>Certificación en Norma de Competencia Técnica Operación de Equipos Hytorc.</li>
 </ul>
 </div>
 </div>
 <div class="-feature">
 <div class="-feature-icon"><img src="assets/m.png" alt=""></div>
 <div>
 <h5>Excelencia Operativa</h5>
 <ul>
 <li>Equipos capacitados contribuyen a operaciones más fluidas y confiables.</li>
 <li>Menos retrabajos y tiempo de inactividad.</li>
 </ul>
 </div>
 </div>
 <div class="-feature">
 <div class="-feature-icon"><img src="assets/Captura de pantalla 2026-03-04 182155.png" alt=""></div>
 <div>
 <h5>Cumplimiento normativo</h5>
 <p>Garantizar el cumplimiento de estándares y regulaciones de la industria.</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 <!-- LAS CERTIFICACIONES -->
 <section class="-certificaciones">
 <div class="-section">
 <h2 class="-title">LAS CERTIFICACIONES</h2>
 <div class="-cert-grid">
 <div class="-cert-card">
 <h3>¿POR QUÉ ASME?</h3>
 <p>Certificación mundial reconocida en 114 países.</p>
 <p>Contenido aprobado por ASME, manteniendo los más altos estándares de la industria.</p>
 <div class="-hidden-text" id="asme-extra">
 <ul>
 <li>Cursos impartidos por instructores certificados por ASME que garantizan una experiencia de aprendizaje superior.</li>
 <li>Cumplir con los requisitos en el sitio, ya que puede ser necesaria una certificación para acceder al sitio.</li>
 <li>Evaluaciones integrales que proporcionan ejercicios prácticos con evaluaciones escritas.</li>
 <li>De acuerdo con las pautas PCC-1, los propietarios de los sitios tienen la responsabilidad de certificar a las cuadrillas. HYTORC ofrece amplios sistemas de capacitación y retención de registros, lo que garantiza el cumplimiento y la competencia en las actividades de empernado.</li>
 </ul>
 </div>
 <a href="#" class="-read-more" onclick="event.preventDefault(); var el=document.getElementById('asme-extra'); el.classList.toggle('-expanded'); this.textContent=el.classList.contains('-expanded')?'Leer menos':'Leer más';">Leer más</a>
 </div>
 <div class="-cert-card">
 <h3>¿POR QUÉ ANCE?</h3>
 <p>Asociación de Normalización y Certificación (ANCE), organismo mexicano, líder en evaluación de la conformidad, mismo que certifica nuestra NORMA DE COMPETENCIA TÉCNICA: OPERACIÓN DE EQUIPOS HYTORC DE TORQUE/TENSIÓN.</p>
 <div class="-hidden-text" id="ance-extra">
 <ul>
 <li>Avalada por organismos internacionales.</li>
 <li>Certificación realizada por Instructores y Evaluadores certificados ante CONOCER en el EC. 0217.01 y EC.076.</li>
 <li>Evaluar y certificar la competencia de personas que realizan la función de operación de los equipos de torque y tensión HYTORC, facilitando las acciones de ensamblaje, mantenimiento y/o construcción industriales costa afuera y terrestres en el tema de empernado a diferentes equipos y/o estructuras dentro de las normativas, estándares y especificaciones vigentes.</li>
 </ul>
 </div>
 <a href="#" class="-read-more" onclick="event.preventDefault(); var el=document.getElementById('ance-extra'); el.classList.toggle('-expanded'); this.textContent=el.classList.contains('-expanded')?'Leer menos':'Leer más';">Leer más</a>
 </div>
 </div>
 </div>
 </section>

 <!-- ENTRENAR ES FÁCIL CON HYTORC -->
 <section class="-training">
 <div class="-section">
 <div class="-training-grid">
 <div class="-training-text">
 <h2>Entrenar es fácil<br><b>con HYTORC</b></h2>
 <p>Capacite a su equipo en nuestro Centro de capacitación y Certificación HYTORC para lograr la excelencia en empernado.</p>
 </div>
 <div class="-training-features">
 <div class="-training-feat-grid">
 <div class="-train-feat">
 <div class="-train-feat-icon"><img src="assets/Captura de pantalla 2026-03-04 182045.png" alt=""></div>
 <div>
 <h5>PEQUEÑAS CLASES</h5>
 <p>Los tamaños limitados de las clases permiten instrucción individualizada y mayor seguridad.</p>
 </div>
 </div>
 <div class="-train-feat">
 <div class="-train-feat-icon"><img src="assets/Captura de pantalla 2026-03-04 182143.png" alt=""></div>
 <div>
 <h5>EXPERIENCIA INIGUALABLE</h5>
 <p>Benefíciese de nuestro profundo conocimiento y comprensión de métodos de cierre de juntas.</p>
 </div>
 </div>
 <div class="-train-feat">
 <div class="-train-feat-icon"><img src="assets/Captura de pantalla 2026-03-04 182212.png" alt=""></div>
 <div>
 <h5>ALQUILE/COMPRE Y AHORRE</h5>
 <p>Ofrecemos descuentos al comprar o alquilar herramientas, comodidad sin comprometer calidad.</p>
 </div>
 </div>
 <div class="-train-feat">
 <div class="-train-feat-icon"><img src="assets/Captura de pantalla 2026-03-04 182138.png" alt=""></div>
 <div>
 <h5>LLEGAMOS A TI</h5>
 <p>Nuestros instructores certificados visitan las instalaciones de nuestros clientes.</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 <!-- CURSOS DE FORMACIÓN MÁS POPULARES -->
 <section class="-cursos">
 <div class="-section">
 <h2 class="-title"><strong>CURSOS DE FORMACIÓN</strong> <span>MÁS POPULARES</span></h2>
 <div class="-cursos-grid">
 <div class="-curso-card">
 <img src="assets/Captura de pantalla 2026-03-04 182050.png" alt="Operación de Equipos">
 <h4>OPERACIÓN DE EQUIPOS HYTORC DE TORQUE/TENSIÓN</h4>
 <p><b>Entregable:</b> DC-3 Curso presencial Duración del curso: 16 horas Registro STPS</p>
 </div>
 <div class="-curso-card">
 <img src="assets/Captura de pantalla 2026-03-04 182119.png" alt="Certificación NCT">
 <h4>CERTIFICACIÓN DE OPERADOR HYTORC EN LA NCT: OPERACIÓN DE EQUIPOS HYTORC DE TORQUE/TENSIÓN</h4>
 <p><b>Entregable:</b> Certificado ANCE + DC-3 + Credencial Curso presencial Duración de proceso de certificación: 24 horas Registro STPS Avalado por ANCE</p>
 </div>
 <div class="-curso-card">
 <img src="assets/Captura de pantalla 2026-03-04 182223.png" alt="ASME PCC1-2022">
 <h4>ASME PCC1-2022 FUNDAMENTOS DE ENSAMBLAJE DE PERNOS</h4>
 <p><b>Entregable:</b> Certificado Digital Curso presencial Duración: 16 horas</p>
 </div>
 </div>
 </div>
 </section>

 <!-- CONTÁCTENOS PARA CAPACITACIÓN -->
 <section class="-contacto">
 <div class="-section">
 <h2 class="-title"><strong>CONTÁCTENOS</strong> <span>PARA CAPACITACIÓN</span></h2>
 <form id="form_capacitacion_co">
 <div class="-form-grid">
 <div class="-form-left">
 <div class="-form-group">
 <label>Nombre</label>
 <input type="text" placeholder="Escribe tu nombre">
 </div>
 <div class="-form-group">
 <label>Correo electrónico</label>
 <input type="email" placeholder="tucorreo@ejemplo.com">
 </div>
 <div class="-form-group">
 <label>País o Ciudad</label>
 <input type="text" placeholder="Ej. Colombia, Bogotá">
 </div>
 </div>
 <div class="-form-right">
 <div class="-form-group">
 <label>Mensaje</label>
 <textarea placeholder="Escribe tu mensaje"></textarea>
 </div>
 </div>
 </div>
 <div class="-form-submit">
 <button type="submit">ENVIAR MENSAJE</button>
 </div>
 </form>
 </div>
 </section>

 </main>`;

// Build the complete file
const headSection = `<!DOCTYPE html>
<html lang="es">

<head>
 <meta charset="UTF-8" />
 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 <title>Capacitación | HYTORC Colombia</title>
 <meta name="description"
 content="Capacitación de HYTORC. Centro de Evaluación y Certificación HYTORC. Cursos de formación certificados por ASME." />
 <meta name="robots" content="index, follow" />
 <link rel="canonical" href="https://www.hytorc.com.co/capacitacion.html" />
 <link rel="stylesheet" href="css/styles.css" />
 <!-- Google Font -->
 <link rel="preconnect" href="https://fonts.googleapis.com" />
 <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
 ${capacitacionStyles}
</head>
`;

const finalHTML = headSection + headerBlock + '\n' + capacitacionContent + '\n' + footerBlock;

fs.writeFileSync(path.join(dir, 'capacitacion.html'), finalHTML, 'utf8');
console.log('Successfully built capacitacion.html');

