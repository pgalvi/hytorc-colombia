const fs = require('fs');
const path = require('path');

const directoryPath = 'C:\\Users\\EIADMIN\\.gemini\\antigravity\\scratch\\hytorc-colombia';

const newAddressText = '<p>Parque Industrial Oikos Ciem Bodega G 106,<br>Autopista Medellín Km 5 Vía Bogotá a Siberia, Cota, Cund.</p>';

// Match any paragraph immediately following the Ubicación header, regardless of its content
const superRegex = /(<h4 class="titLineRed">Ubicación<\/h4>\s*)<p>[\s\S]*?<\/p>/g;

function replaceAllFooters(filePath) {
 let content = fs.readFileSync(filePath, 'utf8');
 let modified = false;

 if (superRegex.test(content)) {
 content = content.replace(superRegex, `$1${newAddressText}`);
 modified = true;
 }

 if (modified) {
 fs.writeFileSync(filePath, content, 'utf8');
 console.log(`Updated footer in: ${path.basename(filePath)}`);
 } else {
 console.log(`No match found in: ${path.basename(filePath)}`);
 }
}

fs.readdir(directoryPath, (err, files) => {
 if (err) {
 console.error('Could not list the directory.', err);
 process.exit(1);
 }
 files.forEach(file => {
 if (path.extname(file).toLowerCase() === '.html') {
 replaceAllFooters(path.join(directoryPath, file));
 }
 });
});
