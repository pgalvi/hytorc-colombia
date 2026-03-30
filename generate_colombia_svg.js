const fs = require('fs');
const topojson = require('topojson-client');

async function buildMap() {
 try {
 const d3 = await import('d3-geo');
 console.log('Fetching world atlas...');
 const res = await fetch('https://unpkg.com/world-atlas@2.0.2/countries-50m.json');
 const world = await res.json();

 console.log('Extracting Colombia (ID 170)...');
 // id 170 is Colombia
 const feature = topojson.feature(world, world.objects.countries).features.find(d => d.id === "170");

 if (!feature) {
 console.error('Colombia not found!');
 return;
 }

 console.log('Generating map path...');
 const width = 450;
 const height = 550;
 const projection = d3.geoMercator().fitSize([width, height], feature);
 const pathGenerator = d3.geoPath().projection(projection);

 const pathData = pathGenerator(feature);

 // Bogota/Cota approximation coordinates (Lng: -74.1, Lat: 4.8)
 const marker = projection([-74.1, 4.8]);

 const svgContent = `<svg class="colombia-map-svg" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
 <path d="${pathData}" fill="#4b4e53" stroke="#fff" stroke-width="2"/>
 <!-- Location marker for Cota/Bogotá area -->
 <circle cx="${marker[0]}" cy="${marker[1]}" r="8" fill="#d63031"/>
 <circle cx="${marker[0]}" cy="${marker[1]}" r="4" fill="#fff"/>
 <text x="${marker[0] + 15}" y="${marker[1] + 5}" font-family="Acumin Pro Condensed, sans-serif" font-size="16" fill="#d63031" font-weight="700">COTA</text>
 </svg>`;

 console.log('Reading HTML file...');
 let html = fs.readFileSync('contacto-ubicacion.html', 'utf8');

 // Replace existing SVG
 html = html.replace(/<svg\s+class="colombia-map-svg"[\s\S]*?<\/svg>/i, svgContent);

 fs.writeFileSync('contacto-ubicacion.html', html, 'utf8');
 console.log('Updated contacto-ubicacion.html successfully!');

 } catch (e) {
 console.error('Error:', e);
 }
}

buildMap();
