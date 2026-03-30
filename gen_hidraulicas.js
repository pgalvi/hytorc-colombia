const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Extract header
const headerMatch = indexHtml.match(/<!-- .......... HEADER .......... -->[\s\S]*?<\/header>/);
const headerRaw = headerMatch ? headerMatch[0] : '';

// Update active state in header slightly
const headerContent = headerRaw.replace('<a href="index.html">INICIO</a>', '<a href="index.html">INICIO</a>').replace('<a href="productos.html">PRODUCTOS</a>', '<a href="productos.html" class="active">PRODUCTOS</a>');

// Extract footer
const footerMatch = indexHtml.match(/<!-- \?\.\?\?\.\?\?\.\?\?\.\?\?\.\?\?\.\? FOOTER \?\.\?\?\.\?\?\.\?\?\.\?\?\.\?\?\.\? -->[\s\S]*/);
const footerContent = footerMatch ? footerMatch[0] : '';

// Extract head part
const headMatch = indexHtml.match(/[\s\S]*?<\/head>/);
let headContent = headMatch ? headMatch[0] : '';
headContent = headContent.replace('<title>Inicio | HYTORC Colombia</title>', '<title>Herramientas Hidráulicas | HYTORC Colombia</title>');
headContent = headContent.replace('content="Hytorc Colombia: Líder en soluciones de torque industrial."', 'content="Herramientas Hidráulicas Hytorc Colombia."');

const mainContent = `
<body>
 ${headerContent}

 <!-- .......... MAIN .......... -->
 <main class="page-content">

 <!-- *************************************** BANNER PRINCIPAL PRODUCTOS *************************************** -->
 <section class="banner-productos" style="background: url('assets/bk-software.jpg') center/cover fixed;">
 <div class="container-xxl">
 <div class="row">
 <div class="col-12 col-md-6 offset-md-1">
 <h1>HERRAMIENTAS HIDRÁULICAS</h1>
 <h3>Llaves de torque hidráulicas</h3>
 <p>HYTORC ofrece la última tecnología de empernado hidráulico con beneficios patentados únicos que brindan seguridad y
 precisión líderes en la industria. Ofreciendo repetibilidad, confiabilidad y durabilidad increíbles: los sistemas de
 empernado hidráulico y la llave de torque hidráulica de HYTORC son las máquinas de torque/tensión originales.</p>
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
 <!-- Placeholder for MXT+ -->
 <div style="width: 100%; height: 250px; background-color: #f0f0f0; margin-bottom: 15px;"></div>
 <h5 class="text-center">MXT+</h5>
 <p>La galardonada llave de torque hidráulica MXT+ combina lo mejor de la llave MXT original de HYTORC con la tecnología
 avanzada más reciente, que incluye un accionamiento de reacción coaxial, función de liberación automática y un nuevo
 contador de ciclos. La llave MXT+ está construida con materiales de mayor resistencia para un uso industrial exigente y
 un rendimiento altamente repetible.</p>
 <a href="#"></a>
 </div>

 <div class="col-12 col-md-4 thumb-producto">
 <!-- Placeholder for MXT -->
 <div style="width: 100%; height: 250px; background-color: #f0f0f0; margin-bottom: 15px;"></div>
 <h5 class="text-center">MXT</h5>
 <p>El MXT es el sistema de empernado industrial más vendido del mundo, con más de cien mil unidades en uso a nivel global.
 Desde 1990, su emblemático revestimiento azul ha representado calidad, durabilidad y fiabilidad en sitios de trabajo en
 todas las industrias principales. Desde las montañas rusas más altas hasta los puentes más grandes del mundo, el MXT
 tiene el poder de realizar el trabajo.</p>
 <a href="#"></a>
 </div>

 <div class="col-12 col-md-4 thumb-producto">
 <!-- Placeholder for EDGE S -->
 <div style="width: 100%; height: 250px; background-color: #f0f0f0; margin-bottom: 15px;"></div>
 <h5 class="text-center">EDGE S</h5>
 <p>Para mantenimiento general que requiere valores de torque altos y resultados repetibles, el EDGE S es el caballo de
 batalla de HYTORC. Su diseño simple de tres partes móviles fue creado por HYTORC hace más de 30 años y se ha ido
 perfeccionando de forma constante, resultando en la línea de llaves de torque hidráulicas más probada y comprobada del
 mundo.</p>
 <a href="#"></a>
 </div>

 <div class="col-12 col-md-4 thumb-producto">
 <!-- Placeholder for AVANTI -->
 <div style="width: 100%; height: 250px; background-color: #f0f0f0; margin-bottom: 15px;"></div>
 <h5 class="text-center">AVANTI</h5>
 <p>El sistema de empernado AVANTI ofrece la gama más amplia de salida de torque, con un máximo de más de 130,000 ft-lbs en
 su modelo más grande. Con decenas de miles en uso alrededor del mundo, el AVANTI es la solución confiable de la
 industria para el empernado de próxima generación.</p>
 <a href="#"></a>
 </div>

 <div class="col-12 col-md-4 thumb-producto">
 <!-- Placeholder for STEALTH -->
 <div style="width: 100%; height: 250px; background-color: #f0f0f0; margin-bottom: 15px;"></div>
 <h5 class="text-center">STEALTH</h5>
 <p>La llave de torque hidráulica STEALTH es el sistema de empernado hidráulico de espacio reducido más avanzado de la
 industria. Su diseño delgado se adapta a lugares donde otras herramientas no caben y su cabeza de potencia de doble
 pistón proporciona una velocidad y potencia sin igual. Además, es compatible con la arandela y la tuerca HYTORC,
 permitiendo que la herramienta STEALTH conquiste aplicaciones de empernado desde mantenimiento general hasta caminos
 críticos.</p>
 <a href="#"></a>
 </div>

 <div class="col-12 col-md-4 thumb-producto">
 <!-- Placeholder for VERSA -->
 <div style="width: 100%; height: 250px; background-color: #f0f0f0; margin-bottom: 15px;"></div>
 <h5 class="text-center">VERSA</h5>
 <p>Para mantenimiento general que requiere valores de torque altos y resultados repetibles, la Versa es un caballo de
 batalla. Su diseño simple de tres partes móviles fue creado por HYTORC hace más de 30 años y se ha ido perfeccionando de
 forma constante, resultando en la línea de llaves de torque hidráulicas más probada y comprobada del mundo.</p>
 <a href="#"></a>
 </div>

 <div class="col-12 col-md-4 thumb-producto">
 <!-- Placeholder for XLCT -->
 <div style="width: 100%; height: 250px; background-color: #f0f0f0; margin-bottom: 15px;"></div>
 <h5 class="text-center">XLCT</h5>
 <p>El XLCT es el sistema de empernado industrial de espacio reducido más vendido del mundo, con más de cien mil unidades en
 uso a nivel global. Desde 1992, su emblemático revestimiento rojo ha representado calidad, durabilidad y fiabilidad en
 sitios de trabajo en todas las industrias principales. Desde las montañas rusas más altas hasta los puentes más grandes
 del mundo, el XLCT tiene el poder de realizar el trabajo.</p>
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
fs.writeFileSync('productos_hidraulica.html', finalHtml, 'utf8');
console.log('Created productos_hidraulica.html');
