const fs = require('fs');
let css = fs.readFileSync('css/styles.css', 'utf8');

// The new MX styling to inject at the top of the file
const mxGlobals = `
/* ══════════════════════════════════════════
 GLOBAL MX STYLES (Acumin Pro & Variables)
 ══════════════════════════════════════════ */
@font-face {
 font-family: 'Acumin Pro';
 src: url('../assets/fonts/AcuminPro-Italic.woff2') format('woff2'), url('../assets/fonts/AcuminPro-Italic.woff') format('woff');
 font-weight: normal;
 font-style: italic;
 font-display: swap;
}

:root {
 --swiper-navigation-size: 44px;
 --swiper-theme-color: #007aff;
 --body-font: 'Acumin Pro', serif;
 --font-sizexx: 10px;
 --color-black: #222325;
 --color-white: #ffffff;
 --transition-link: all .3s ease;
 
 /* Bootstrap-like vars from MX */
 --bs-blue: #0d6efd;
 --bs-indigo: #6610f2;
 --bs-purple: #6f42c1;
 --bs-pink: #d63384;
 --bs-red: #dc3545;
 --bs-orange: #fd7e14;
 --bs-yellow: #ffc107;
 --bs-green: #198754;
 --bs-teal: #20c997;
 --bs-cyan: #0dcaf0;
 --bs-black: #000;
 --bs-white: #fff;
 --bs-gray: #6c757d;
 --bs-gray-dark: #343a40;
 --bs-primary: #0d6efd;
 --bs-secondary: #6c757d;
 --bs-success: #198754;
 --bs-info: #0dcaf0;
 --bs-warning: #ffc107;
 --bs-danger: #dc3545;
 --bs-light: #f8f9fa;
 --bs-dark: #212529;
}

@media (prefers-reduced-motion: no-preference) {
 :root {
 scroll-behavior: smooth;
 }
}

html, body {
 font-family: var(--body-font) !important;
 font-weight: normal;
 color: var(--color-black) !important;
 text-align: justify;
}
*, ::after, ::before {
 box-sizing: border-box;
}

/* ══════════════════════════════════════════ */
`;

// Prepend the new styles right after the first comment block or at the very beginning
if (!css.includes('GLOBAL MX STYLES')) {
 // Let's just put it at the top 
 css = mxGlobals + '\n' + css;
 fs.writeFileSync('css/styles.css', css, 'utf8');
 console.log('Successfully injected MX global CSS styles at the top of styles.css');
} else {
 console.log('MX global styles are already present.');
}
