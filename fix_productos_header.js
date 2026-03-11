const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');
const headerMatch = index.match(/<header\s+class="site-header"[\s\S]*?<\/header>/i);
if (!headerMatch) {
    console.error("No header in index.html");
    process.exit(1);
}
const correctHeader = headerMatch[0];

const productos = fs.readFileSync('productos.html', 'utf8');

// In productos.html, the header starts at <header class="site-header">
// But it is missing closing tags, so it bleeds into <div class="products-layout">
// Let's replace from <header class="site-header"> to just before <div class="products-layout">

// Find the start of header
const headerStart = productos.indexOf('<header class="site-header">');
// Find the start of the layout content
const contentStart = productos.indexOf('<div class="products-layout">');

if (headerStart === -1 || contentStart === -1) {
    console.error("Could not find boundaries in productos.html");
    process.exit(1);
}

const beforeHeader = productos.slice(0, headerStart);
const afterHeader = productos.slice(contentStart);

fs.writeFileSync('productos.html', beforeHeader + correctHeader + '\n\n                ' + afterHeader);
console.log("Fixed productos.html header");
