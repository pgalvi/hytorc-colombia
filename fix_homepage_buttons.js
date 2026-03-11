const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove the "Ver Productos" button and keep "Solicitar Asesoría" (removing its left margin)
// Search for the container block to be safe
const actionRegex = /<div class=\"hero-actions-mx fade-in\"[^>]*>[\s\S]*?<a href=\"productos\.html\" class=\"btn btn-primary\">Ver Productos<\/a>\s*<a href=\"contacto\.html\" class=\"btn btn-outline\" style=\"margin-left:8px;\">Solicitar Asesoría<\/a>\s*<\/div>/;

const actionMatch = html.match(actionRegex);
if (actionMatch) {
    console.log('Found hero actions block');
    const newActions = '<div class="hero-actions-mx fade-in" style="transition-delay: 0.2s;">\n          <a href="contacto.html" class="btn btn-outline">Solicitar Asesoría</a>\n        </div>';
    html = html.replace(actionRegex, newActions);
} else {
    // Fallback for more flexible matching
    html = html.replace(/<a href=\"productos\.html\" class=\"btn btn-primary\">Ver Productos<\/a>\s*/, '');
    html = html.replace(/style=\"margin-left:8px;\"/, '');
}

// 2. Remove "Ver Catálogo Completo" block
const catalogBlockRegex = /<div class=\"text-center\" style=\"margin-top:32px;\">\s*<a href=\"productos\.html\" class=\"btn btn-dark\">Ver Catálogo Completo<\/a>\s*<\/div>/;

if (html.match(catalogBlockRegex)) {
    console.log('Found catalog buttons block');
    html = html.replace(catalogBlockRegex, '');
} else {
    // Fallback
    html = html.replace(/<a href=\"productos\.html\" class=\"btn btn-dark\">Ver Catálogo Completo<\/a>/, '');
}

fs.writeFileSync('index.html', html);
console.log('Successfully modified index.html');
