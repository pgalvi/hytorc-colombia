const fs = require('fs');

const mxHtml = fs.readFileSync('mx_bombas.html', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');

const headerStart = indexHtml.indexOf('<!-- .......... HEADER .......... -->');
const headerEnd = indexHtml.indexOf('</header>') + 9;
let headerContent = indexHtml.substring(headerStart, headerEnd);
headerContent = headerContent.replace('<a href="index.html">INICIO</a>', '<a href="index.html">INICIO</a>').replace('<a href="productos.html">PRODUCTOS</a>', '<a href="productos.html" class="active">PRODUCTOS</a>');

const footerStart = indexHtml.indexOf('<!-- ?.?.?.?.?.?.? FOOTER ?.?.?.?.?.?.? -->');
const footerContent = footerStart > -1 ? indexHtml.substring(footerStart) : '';

const headEnd = indexHtml.indexOf('</head>') + 7;
let headContent = indexHtml.substring(0, headEnd);
headContent = headContent.replace('<title>Inicio | HYTORC Colombia</title>', '<title>Bombas | HYTORC Colombia</title>');

// Extract main content boundaries
const bannerStart = mxHtml.indexOf('<!-- *************************************** BANNER PRINCIPAL PRODUCTOS *************************************** -->');
const bannerEnd = mxHtml.indexOf('<!-- *************************************** BANNER PRINCIPAL PRODUCTOS *************************************** -->', bannerStart + 10) + 115;
let bannerContent = mxHtml.substring(bannerStart, bannerEnd);
bannerContent = bannerContent.replace('<section class="banner-productos">', '<section class="banner-productos" style="background: url(assets/dim-background-black.png) center/cover fixed; padding: 120px 0;">');

const productosStart = mxHtml.indexOf('<!-- *************************************** PRODUCTOS *************************************** -->');
const productosEnd = mxHtml.indexOf('<!-- *************************************** PRODUCTOS *************************************** -->', productosStart + 10) + 98;
let productosContent = mxHtml.substring(productosStart, productosEnd);

// General replacement for all product thumbnails inside the main grid chunk
productosContent = productosContent.replace(/<img[^>]+class="img-fluid p-4"[^>]*>/g, '<div style="width: 100%; height: 250px; background-color: #f0f0f0;"></div>');

const mainContent = `
<body>
  ${headerContent}
  <main class="page-content">
  ${bannerContent}
  ${productosContent}
  </main>
  ${footerContent}
</body>
</html>
`;

fs.writeFileSync('productos_bombas.html', headContent + '\\n' + mainContent, 'utf8');
console.log('Created productos_bombas.html');
