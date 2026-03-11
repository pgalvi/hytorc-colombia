const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\EIADMIN\\.gemini\\antigravity\\scratch\\hytorc-colombia';

// Read the current file to extract header (lines 1-173) and footer (lines 520-587)
const currentContent = fs.readFileSync(path.join(dir, 'calibracion.html'), 'utf8');
const lines = currentContent.split(/\r?\n/);

// Extract the header section (nav, logo, etc.) - lines 22 (body) through 171 (end of header div)
const headerLines = lines.slice(21, 171); // body through end of header
const footerLines = lines.slice(519);     // </main> through </html>

const headerHTML = headerLines.join('\n');
const footerHTML = footerLines.join('\n');

const newHTML = `<!DOCTYPE html>
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
  <!-- Bootstrap 5.3 for grid system -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
  <!-- Google Font similar to Acumin Pro -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

  <style>
    /* ===== CALIBRACIÓN PAGE SCOPED STYLES (matching hytorc.com.mx) ===== */
    .calibracion-content { font-family: 'Source Sans 3', 'Acumin Pro', Arial, sans-serif; color: #333; }
    .calibracion-content p { font-size: 15px; line-height: 1.7; color: #555; }

    /* --- Banner --- */
    .banner-calibracion {
      background: url('assets/Captura de pantalla 2026-03-04 140500.png') no-repeat center center;
      background-size: cover;
      background-attachment: fixed;
      padding: 160px 0 80px;
      position: relative;
    }
    .banner-calibracion::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.45);
    }
    .banner-calibracion .container-xxl { position: relative; z-index: 1; }
    .banner-calibracion h1 {
      font-size: 60px;
      color: #999966;
      font-weight: 600;
      font-family: 'Source Sans 3', Arial, sans-serif;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    .banner-calibracion h2 {
      font-size: 20px;
      color: #ffffff;
      font-weight: 500;
    }

    /* --- Laboratorio Section --- */
    .laboratorioCalibra {
      background: url('assets/Captura de pantalla 2026-03-04 140500.png') no-repeat right center;
      background-size: 50%;
      padding: 60px 0;
      min-height: 500px;
    }
    .titLaboratorioCalibra {
      font-size: 32px;
      font-weight: 500;
      color: #333;
      margin-bottom: 20px;
      text-transform: uppercase;
    }
    .iconLabCalibra {
      padding-left: 50px;
      position: relative;
      font-size: 14px;
      line-height: 1.6;
      color: #555;
      min-height: 40px;
    }
    .iconLabCalibra::before {
      content: '';
      position: absolute;
      left: 5px;
      top: 0;
      width: 30px;
      height: 30px;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23d63031"><path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/></svg>') no-repeat center center;
      background-size: contain;
    }
    .btnCalibracion {
      display: inline-block;
      background: #d63031;
      color: #fff !important;
      padding: 10px 30px;
      text-decoration: none;
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 1px;
      border: none;
      transition: background 0.3s;
      text-transform: uppercase;
    }
    .btnCalibracion:hover { background: #c0392b; color: #fff !important; }
    .mrCalbtn { margin-top: 10px; }

    /* --- Ruta Movil Section --- */
    .rutaMovil {
      padding: 70px 0;
      background-color: #f8f9fa;
    }

    /* --- tit-Compara heading --- */
    .tit-Compara {
      font-size: 34px;
      font-weight: 600;
      color: #333;
      padding: 10px 0 5px 0;
      margin-bottom: 15px;
      text-transform: uppercase;
    }

    /* --- Servicios Calibra Section --- */
    .servCalibra {
      padding: 80px 0;
    }
    .servCalibra h5 {
      font-size: 20px;
      font-weight: 600;
      color: #333;
      margin-top: 10px;
    }
    .servCalibra ul {
      padding-left: 20px;
      color: #555;
    }
    .servCalibra ul li {
      margin-bottom: 6px;
      font-size: 15px;
    }

    /* --- Tables --- */
    .tableCalibra { overflow-x: auto; }
    .tableCalibra table {
      width: 100%;
      border-collapse: collapse;
    }
    .tableCalibra th {
      background-color: #666666;
      color: #ffffff;
      font-weight: 700;
      padding: 12px 15px;
      font-size: 14px;
      border: 1px solid #dee2e6;
    }
    .tableCalibra td {
      padding: 12px 15px;
      font-size: 14px;
      border: 1px solid #dee2e6;
    }
    .gris1Table { background-color: rgba(100, 100, 100, 0.15); }
    .gris2Table { background-color: rgba(100, 100, 100, 0.30); }

    /* --- Contactanos Section --- */
    .bk-contactanos-cal {
      background-color: #546670;
      padding: 50px 0;
      text-align: center;
    }
    .bk-contactanos-cal button {
      background: none;
      border: none;
      width: 100%;
      cursor: pointer;
      padding: 20px 0;
    }
    .bk-contactanos-cal h2 {
      font-size: 24px;
      color: #ffffff;
      letter-spacing: 6px;
      font-weight: 600;
      text-transform: uppercase;
      margin: 0;
    }

    /* --- Full-width image section --- */
    .full-img-section img { width: 100%; height: auto; display: block; }

    /* --- Responsive --- */
    @media (max-width: 991px) {
      .banner-calibracion { padding: 100px 0 50px; background-attachment: scroll; }
      .banner-calibracion h1 { font-size: 36px; }
      .laboratorioCalibra { background-image: none !important; padding: 40px 0; min-height: auto; }
    }
    @media (max-width: 575px) {
      .banner-calibracion h1 { font-size: 28px; }
      .banner-calibracion h2 { font-size: 16px; }
      .tit-Compara { font-size: 24px; }
      .titLaboratorioCalibra { font-size: 24px; }
    }
  </style>
</head>

${headerHTML}

  <!-- .......... MAIN .......... -->
  <main class="page-content calibracion-content">

  <!-- *************************************** BANNER *************************************** -->
  <section class="banner-calibracion">
    <div class="container-xxl">
      <div class="row align-items-center">
        <div class="col-12">
          <h1>LABORATORIO DE CALIBRACIÓN</h1>
          <h2>Tu Aliado en Calibración de Herramientas Hytorc</h2>
        </div>
      </div>
    </div>
  </section>
  <!-- *************************************** BANNER *************************************** -->

  <!-- *************************************** LABORATORIO *************************************** -->
  <section class="laboratorioCalibra">
    <div class="container-xxl">
      <div class="row justify-content-lg-end">

        <div class="col-12 d-block d-lg-none mb-5">
          <img src="assets/Captura de pantalla 2026-03-04 140500.png" class="img-fluid" alt="Laboratorio de Calibración">
        </div>

        <div class="col-12 col-lg-6">
          <h2 class="titLaboratorioCalibra mb-4">LABORATORIO DE CALIBRACIÓN</h2>
          <p>
            El laboratorio de calibración forma parte del grupo de trabajo de HYTORC, y ofrece servicios de calibración en las magnitudes de par torsional y presión relativa, contamos con:
          </p>
          <div class="row">

            <div class="col-12 col-sm-6 mb-4">
              <p class="iconLabCalibra">
                Acreditación ante la ema a.c. en la magnitud de Par Torsional (No. De Acreditación PT-10)
              </p>
              <div class="text-center">
                <a href="#" class="btnCalibracion mrCalbtn">ACREDITACIONES</a>
              </div>
            </div>

            <div class="col-12 col-sm-6 mb-4">
              <p class="iconLabCalibra">
                Sistema de gestión de la calidad basado en la norma NMX-EC-17025-IMNC-vigente (ISO/IEC vigente).<br>
                "Requisitos generales para la competencia de los laboratorios de ensayo y de calibración".
              </p>
            </div>

            <div class="col-12 col-sm-6 mb-4">
              <p class="iconLabCalibra">
                Acreditación ante la ema a.c. en la magnitud de Presión Relativa (No. De Acreditación PT-144)
              </p>
              <div class="text-center">
                <a href="#" class="btnCalibracion mrCalbtn">ACREDITACIONES</a>
              </div>
            </div>

            <div class="col-12 col-sm-6 mb-4">
              <p class="iconLabCalibra">
                Trazabilidad Metrológica a Patrones Nacionales de Presión y Par Torsional mantenidos en el CENAM.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
  <!-- *************************************** LABORATORIO *************************************** -->


  <!-- *************************************** RUTA MOVIL *************************************** -->
  <section class="rutaMovil">
    <div class="container-xxl">
      <div class="row align-items-center">
        <div class="col-12 col-md-6">
          <h2 class="tit-Compara">RUTA MÓVIL</h2>
          <p>
            Los servicios de mantenimiento y calibración en sitio, han sido completamente diseñados para incluir la más reciente tecnología de calibración móvil y mano de obra con experiencia en un ambiente controlado, con la capacidad de atender herramientas hidráulicas y accesorios a fin de 250 lbf.ft hasta 20 000 lbf.ft.
          </p>
        </div>
        <div class="col-12 col-md-6">
          <img src="assets/Captura de pantalla 2026-03-04 140508.png" class="img-fluid" alt="Ruta Móvil">
        </div>
      </div>
    </div>
  </section>
  <!-- *************************************** RUTA MOVIL *************************************** -->


  <!-- *************************************** IMAGEN FULL *************************************** -->
  <section class="full-img-section">
    <div class="container-xxl">
      <div class="row">
        <div class="col-12">
          <img src="assets/Captura de pantalla 2026-03-04 140516.png" class="img-fluid" alt="Calibración">
        </div>
      </div>
    </div>
  </section>
  <!-- *************************************** IMAGEN FULL *************************************** -->


  <!-- *************************************** SERVICIOS *************************************** -->
  <section class="servCalibra">
    <div class="container-xxl">

      <div class="row">
        <div class="col-12" id="servicios">
          <h2 class="tit-Compara">SERVICIOS</h2>
          <p>
            Los servicios de calibración se llevan a cabo de acuerdo con métodos y procedimientos internos basados en normas nacionales e internacionales. Contamos con personal calificado en las magnitudes de presión y par torsional, con el fin de satisfacer las necesidades de nuestros clientes.
          </p>
        </div>
        <div class="col-12 col-sm-6">
          <img src="assets/Captura de pantalla 2026-03-04 140522.png" class="img-fluid mt-4 mb-4" alt="Par Torsional">
          <h5>Magnitud: Par Torsional</h5>
          <ul>
            <li>Torquímetros hidráulicos.</li>
            <li>Herramientas rotativas (neumáticas y eléctricas).</li>
            <li>Torquímetros manuales.</li>
            <li>Medición de multiplicadores de torque (Ofertado solo con Trazabilidad Metrológica)</li>
          </ul>
        </div>
        <div class="col-12 col-sm-6">
          <img src="assets/Captura de pantalla 2026-03-04 140529.png" class="img-fluid mt-4 mb-4" alt="Presión Relativa">
          <h5>Magnitud: presión relativa</h5>
          <ul>
            <li>Calibración de manómetros secundarios de presión.</li>
            <li>Medición de dinamómetros hidráulicos (Ofertado solo con Trazabilidad Metrológica).</li>
            <li>Graficadores de presión (manógrafos).</li>
            <li>Manómetros digitales.</li>
          </ul>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-12">
          <p>
            <strong>PAR TORSIONAL</strong><br>
            Acreditación ante EMA en Par Torsional No. PT-10. Para mayor información visitar www.ema.org.mx
          </p>
          <div class="tableCalibra">
            <table class="table table-bordered">
              <tr>
                <th>Instrumentos que calibramos</th>
                <th>Intervalo de medida</th>
              </tr>
              <tr class="gris1Table">
                <td>Torquímetros hidráulicos de la marca Hytorc</td>
                <td>50 lbf.ft a 25 000 lbf.ft</td>
              </tr>
              <tr class="gris2Table">
                <td>Torquímetros hidráulicos de la marca Hytorc (Servicio en Sitio)</td>
                <td>185 lbf.ft a 20 000 lbf.ft</td>
              </tr>
              <tr class="gris1Table">
                <td>Torquímetros neumáticos y eléctricos de la marca Hytorc</td>
                <td>50 lbf.ft a 7 375 lbf.ft</td>
              </tr>
              <tr class="gris2Table">
                <td>Torquímetros neumáticos y eléctricos de la marca Hytorc (Servicio en Sitio)</td>
                <td>185 lbf.ft a 7 375 lbf.ft</td>
              </tr>
            </table>
          </div>
          <div class="tableCalibra mt-4">
            <table class="table table-bordered">
              <tr>
                <th>Instrumentos que calibramos</th>
                <th>Intervalo de medida</th>
              </tr>
              <tr class="gris1Table">
                <td rowspan="3">
                  <br />
                  <p>Torquímetros Manuales</p>
                </td>
                <td>2 lbf.ft a 20 lbf.ft</td>
              </tr>
              <tr class="gris2Table">
                <td>20 lbf.ft a 200 lbf.ft</td>
              </tr>
              <tr class="gris1Table">
                <td>200 lbf.ft a 2000 lbf.ft</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="col-12 mt-5">
          <p>
            <strong>PRESIÓN RELATIVA</strong><br>
            Acreditación ante EMA en Presión Relativa No. PT-144. Para mayor información visitar www.ema.org.mx
          </p>
          <div class="tableCalibra">
            <table class="table table-bordered">
              <tr>
                <th>Instrumentos que calibramos</th>
                <th>Intervalo de medida</th>
              </tr>
              <tr class="gris1Table">
                <td>Manómetros Secundarios de Presión Manómetros de Presión con Elemento Elástico Sensible, Manómetros Digitales y/o Graficadores de Presión, Manómetros de Proceso, etc.</td>
                <td>
                  1.5 psi a 29 700 psi
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>

    </div>
  </section>
  <!-- *************************************** SERVICIOS *************************************** -->


  <!-- *************************************** CONTACTANOS *************************************** -->
  <section class="bk-contactanos-cal">
    <div class="container-xxl">
      <div class="row">
        <div class="col-12">
          <h2>CONTÁCTANOS PARA MÁS INFORMACIÓN</h2>
        </div>
      </div>
    </div>
  </section>
  <!-- *************************************** CONTACTANOS *************************************** -->


${footerHTML}`;

fs.writeFileSync(path.join(dir, 'calibracion.html'), newHTML, 'utf8');
console.log('Successfully rebuilt calibracion.html with proper styling');
