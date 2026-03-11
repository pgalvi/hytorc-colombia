const fs = require('fs');

const mxHtml = fs.readFileSync('mx_manual.html', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');

const headerStart = indexHtml.indexOf('<!-- .......... HEADER .......... -->');
const headerEnd = indexHtml.indexOf('</header>') + 9;
let headerContent = indexHtml.substring(headerStart, headerEnd);
headerContent = headerContent.replace('<a href="index.html">INICIO</a>', '<a href="index.html">INICIO</a>').replace('<a href="productos.html">PRODUCTOS</a>', '<a href="productos.html" class="active">PRODUCTOS</a>');

const footerStart = indexHtml.indexOf('<!-- ?.?.?.?.?.?.? FOOTER ?.?.?.?.?.?.? -->');
const footerContent = footerStart > -1 ? indexHtml.substring(footerStart) : '';

const headEnd = indexHtml.indexOf('</head>') + 7;
let headContent = indexHtml.substring(0, headEnd);
headContent = headContent.replace('<title>Inicio | HYTORC Colombia</title>', '<title>Herramienta Manual | HYTORC Colombia</title>');
headContent = headContent.replace('</head>', '  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css" />\\n</head>');

const bannerStart = mxHtml.indexOf('<!-- *************************************** BANNER PRINCIPAL PRODUCTOS *************************************** -->');
const bannerEnd = mxHtml.indexOf('<!-- *************************************** BANNER PRINCIPAL PRODUCTOS *************************************** -->', bannerStart + 10) + 115;
let bannerContent = mxHtml.substring(bannerStart, bannerEnd);
bannerContent = bannerContent.replace('<section class="banner-productos">', '<section class="banner-productos" style="background: url(assets/dim-background-black.png) center/cover fixed;">');

const section80Start = mxHtml.indexOf('<section class="wrapSection80">');
const section80End = mxHtml.indexOf('</section>', section80Start) + 10;
let section80Content = mxHtml.substring(section80Start, section80End);
section80Content = section80Content.replace('<img src="img/productos/manual/clicker_wrench_hero.png" alt="MXY feature with spline cover" class="img-fluid">', '<div style="width: 100%; height: 350px; background-color: #f0f0f0;"></div>');

const featureStart = mxHtml.indexOf('<section class="wrapSpecToolGray">');
const featureEnd = mxHtml.indexOf('</section>', featureStart) + 10;
let featureContent = mxHtml.substring(featureStart, featureEnd);
featureContent = featureContent.replace(new RegExp('<img src="img/productos/manual/[^"]+"\\\\s*class="img-fluid">', 'g'), '<div style="width: 100px; height: 100px; background-color: #e0e0e0; margin: 0 auto 15px;"></div>');

const accessoriesStart = mxHtml.indexOf('<section class="wrapSpecToolWhite mt-4">');
const accessoriesEnd = mxHtml.indexOf('</section>', accessoriesStart) + 10;
let accessoriesContent = mxHtml.substring(accessoriesStart, accessoriesEnd);
accessoriesContent = accessoriesContent.replace(new RegExp('<img src="img/productos/[^"]+"\\\\s*class="img-fluid mb-5">', 'g'), '<div style="width: 100px; height: 100px; background-color: #f0f0f0; margin: 0 auto 15px;"></div>');
accessoriesContent = accessoriesContent.replace(new RegExp('<img src="img/productos/[^/]+/[^/]+/[^"]+"\\\\s*class="img-fluid mb-5">', 'g'), '<div style="width: 100px; height: 100px; background-color: #f0f0f0; margin: 0 auto 15px;"></div>');

const swiperStart = mxHtml.indexOf('<!-- ********************************************  RECURSOS CARRUSEL  ********************************************* -->');
const swiperEnd = mxHtml.indexOf('<!-- ********************************************  RECURSOS CARRUSEL  ********************************************* -->', swiperStart + 20) + 117;
let swiperScripts = mxHtml.substring(swiperStart, swiperEnd);

const mainContent = `
<body>
  ${headerContent}
  <main class="page-content">
  ${bannerContent}
  ${section80Content}
  ${featureContent}
  ${accessoriesContent}
  </main>
  ${swiperScripts}
  ${footerContent}
`;

fs.writeFileSync('herramienta-manual.html', headContent + '\\n' + mainContent, 'utf8');
console.log('Created herramienta-manual.html');
