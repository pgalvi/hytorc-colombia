const fs = require('fs');

// Fix Ubicacion
let ubicacion = fs.readFileSync('contacto-ubicacion.html', 'utf8');
const ubiOld = /\.banner-ubica-bolsa \{\s*background: url\('assets\/dim-background-black\.png'\) center\/cover fixed !important;\s*\}/;
const ubiNew = `.banner-ubica-bolsa {
            background: url('assets/dim-background-black.png') center/cover fixed !important;
            padding: 200px 0 80px;
        }

        .banner-ubica-bolsa h1 {
            color: #999966 !important;
        }`;
if (ubicacion.match(ubiOld)) {
    ubicacion = ubicacion.replace(ubiOld, ubiNew);

    // Alse let's make sure the inline style of h1 isn't interfering if it doesn't exist 
    // Wait, the h1 in contacto-ubicacion.html is plain: <h1>HYTORC COLOMBIA</h1>
    fs.writeFileSync('contacto-ubicacion.html', ubicacion);
    console.log('Fixed contacto-ubicacion.html');
}

// Fix Quejas
let quejas = fs.readFileSync('quejas-y-sugerencias.html', 'utf8');
const queOld = /\.banner-ubica-bolsa \{\s*background: url\('assets\/dim-background-black\.png'\) center\/cover fixed !important;\s*\}/;
const queNew = `.banner-ubica-bolsa {
            background: url('assets/dim-background-black.png') center/cover fixed !important;
            padding: 200px 0 80px;
        }`;
if (quejas.match(queOld)) {
    quejas = quejas.replace(queOld, queNew);
    fs.writeFileSync('quejas-y-sugerencias.html', quejas);
    console.log('Fixed quejas-y-sugerencias.html');
}
