const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Extract header
const headerMatch = indexHtml.match(/<!-- .......... HEADER .......... -->[\s\S]*?<\/header>/);
const headerRaw = headerMatch ? headerMatch[0] : '';
const headerContent = headerRaw.replace('<a href="index.html">INICIO</a>', '<a href="index.html">INICIO</a>').replace('<a href="productos.html">PRODUCTOS</a>', '<a href="productos.html" class="active">PRODUCTOS</a>');

// Extract footer
const footerMatch = indexHtml.match(/<!-- \?\.\?\?\.\?\?\.\?\?\.\?\?\.\?\?\.\? FOOTER \?\.\?\?\.\?\?\.\?\?\.\?\?\.\?\?\.\? -->[\s\S]*/);
const footerContent = footerMatch ? footerMatch[0] : '';

// Extract head part
const headMatch = indexHtml.match(/[\s\S]*?<\/head>/);
let headContent = headMatch ? headMatch[0] : '';
headContent = headContent.replace('<title>Inicio | HYTORC Colombia</title>', '<title>Herramientas Eléctricas | HYTORC Colombia</title>');
headContent = headContent.replace('content="Hytorc Colombia: Líder en soluciones de torque industrial."', 'content="Herramientas Eléctricas Hytorc Colombia."');

const mainContent = `
<body>
  ${headerContent}

  <!-- .......... MAIN .......... -->
  <main class="page-content">

  <!-- *************************************** BANNER PRINCIPAL PRODUCTOS *************************************** -->
  <section class="banner-productos" style="background: url('assets/dim-background-black.png') center/cover fixed;">
    <div class="container-xxl">
      <div class="row">
        <div class="col-12 col-md-6 offset-md-1">
        <h1>HERRAMIENTAS ELÉCTRICAS</h1>
        <h3>HERRAMIENTAS DE TORQUE ELÉCTRICAS</h3>
        <p>Las herramientas de torque eléctricas de HYTORC ofrecen una combinación de precisión, fiabilidad y facilidad de uso para
        aplicaciones industriales de empernado. Impulsadas por tecnología avanzada de baterías, estas herramientas brindan el
        rendimiento de las líneas hidráulicas y neumáticas, junto con los beneficios de la operación eléctrica, tales como un
        mantenimiento simplificado y niveles de ruido reducidos.</p>
        </div>
      </div>
    </div>
  </section>
  <!-- *************************************** BANNER PRINCIPAL PRODUCTOS *************************************** -->

  <!-- *************************************** PRODUCTOS *************************************** -->
   <section class="productos">
      <div class="container-xxl">
        <div class="row">
          <div class="col-12 col-md-4 thumb-producto">
              <!-- Placeholder for LITHIUM SERIES II -->
              <div style="width: 100%; height: 250px; background-color: #f0f0f0; margin-bottom: 15px;"></div>
              <h5 class="text-center">LITHIUM SERIES II</h5>
              <p>La herramienta de torque eléctrica Lithium Series II proporciona un empernado rápido, preciso y repetible para diversas
              aplicaciones industriales. Su diseño ligero, controles digitales y batería recargable aseguran la máxima eficiencia y
              productividad en campo.</p>
              <a href="#"></a>
          </div>

          <div class="col-12 col-md-4 thumb-producto">
            <!-- Placeholder for LION GUN X -->
            <div style="width: 100%; height: 250px; background-color: #f0f0f0; margin-bottom: 15px;"></div>
            <h5 class="text-center">LION GUN X</h5>
            <p>La LION GUN X es una herramienta eléctrica de torque profesional, liviana y fácil de usar. Esta herramienta alimentada
            por batería de 36 voltios tiene una capacidad de torque de hasta 3000 ft-lbs y tiene la capacidad de registrar datos.</p>
            <a href="#"></a>
          </div>

          <div class="col-12 col-md-4 thumb-producto">
            <!-- Placeholder for LION GUN -->
            <div style="width: 100%; height: 250px; background-color: #f0f0f0; margin-bottom: 15px;"></div>
            <h5 class="text-center">LION GUN</h5>
            <p>La herramienta de torque eléctrica LION GUN con registro de datos incorporado, ofrece portabilidad y comodidad
            inigualables, lo que simplifica el empernado seguro y preciso. Esta herramienta a batería de 18 voltios tiene una
            capacidad de torsión de hasta 700 ft-lbs. y la capacidad de registrar los trabajos realizados. Esta herramienta es
            compatible con los dados convencionales, la arandela HYTORC y la tuerca HYTORC.</p>
            <a href="#"></a>
          </div>

          <div class="col-12 col-md-4 thumb-producto">
            <!-- Placeholder for LION GUN DUAL SPEED -->
            <div style="width: 100%; height: 250px; background-color: #f0f0f0; margin-bottom: 15px;"></div>
            <h5 class="text-center">LION GUN DUAL SPEED</h5>
            <p>La herramienta eléctrica de torue de dos velocidades LION GUN es la herramienta eléctrica más rápida de HYTORC. Con
            hasta 125 ft-lbs (169,5 Nm) de torque, la herramienta LION GUN cambia fácilmente del modo de torque de alta velocidad al
            modo de torque preciso, lo que elimina la necesidad de varios sistemas.</p>
            <a href="#"></a>
          </div>
        </div><!-- /.row -->
      </div><!-- /.container -->
   </section>
  <!-- *************************************** PRODUCTOS *************************************** -->

  </main>
  
  ${footerContent}
`;

const finalHtml = headContent + '\\n' + mainContent;
fs.writeFileSync('productos_electricas.html', finalHtml, 'utf8');
console.log('Created productos_electricas.html');
