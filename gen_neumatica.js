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
headContent = headContent.replace('<title>Inicio | HYTORC Colombia</title>', '<title>Herramientas Neumáticas | HYTORC Colombia</title>');
headContent = headContent.replace('content="Hytorc Colombia: Líder en soluciones de torque industrial."', 'content="Herramientas Neumáticas Hytorc Colombia."');

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
 <h1>HERRAMIENTAS NEUMÁTICAS</h1>
 <h3>LLAVES DE TORQUE, LLAVES DE IMPACTO</h3>
 <p>La fiabilidad líder en la industria, combinada con la conveniencia de la energía neumática, hacen de la línea jGun de
 HYTORC la solución simple para el mantenimiento industrial.</p>
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
 <!-- Placeholder for jGUN SINGLE SPEED -->
 <div style="width: 100%; height: 250px; background-color: #f0f0f0; margin-bottom: 15px;"></div>
 <h5 class="text-center">jGUN SINGLE SPEED</h5>
 <p>El jGun SINGLE SPEED es la opción simple para el empernado industrial alimentado por aire. Con una relación
 potencia-peso líder en la industria y una fuerza de ruptura que supera las tuercas corroídas y dañadas, esta herramienta
 se impone donde las llaves de impacto y las barras de palanca no resultan.</p>
 <a href="#"></a>
 </div>

 <div class="col-12 col-md-4 thumb-producto">
 <!-- Placeholder for jGUN DIGITAL SINGLE SPEED -->
 <div style="width: 100%; height: 250px; background-color: #f0f0f0; margin-bottom: 15px;"></div>
 <h5 class="text-center">jGUN DIGITAL SINGLE SPEED</h5>
 <p>La nueva serie jGun DIGITAL Single Speed de HYTORC es la primera multiplicadora neumática ajustable en torque del mundo,
 con pantalla digital y operación sin FRL. A diferencia de otros sistemas que requieren un filtro, regulador y sistema de
 lubricación separados entre la línea de aire y la herramienta, su diseño patentado elimina la necesidad de estos
 accesorios, ofreciendo el máximo nivel de portabilidad y conveniencia.</p>
 <a href="#"></a>
 </div>

 <div class="col-12 col-md-4 thumb-producto">
 <!-- Placeholder for jGUN DUAL SPEED -->
 <div style="width: 100%; height: 250px; background-color: #f0f0f0; margin-bottom: 15px;"></div>
 <h5 class="text-center">jGUN DUAL SPEED</h5>
 <p>El jGun DUAL SPEED es la única multiplicadora neumática que te brinda la flexibilidad de utilizarla para el preapriete,
 el empernado final y la ruptura en aplicaciones de alta demanda. Para un preapriete rápido y una capacidad de empernado
 potente, el jGun DUAL SPEED es la opción más confiable de la industria.</p>
 <a href="#"></a>
 </div>

 <div class="col-12 col-md-4 thumb-producto">
 <!-- Placeholder for PISTOLA DE IMPACTO NEUMÁTICA -->
 <div style="width: 100%; height: 250px; background-color: #f0f0f0; margin-bottom: 15px;"></div>
 <h5 class="text-center">PISTOLA DE IMPACTO NEUMÁTICA</h5>
 <p>Cuando la velocidad es la consideración más importante, las pistolas de impacto HYTORC son una excelente solución,
 especialmente cuando se utilizan para realizar el preapriete de las tuercas antes del empernado con otras herramientas
 de precisión HYTORC.</p>
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
fs.writeFileSync('productos_neumatica.html', finalHtml, 'utf8');
console.log('Created productos_neumatica.html');
