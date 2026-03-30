const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');
const regex = /<li[^>]*>\s*<a[^>]*>(?:SERVICIOS|Servicios)<\/a>[\s\S]*?<\/li>/i;
const match = content.match(regex);
if (match) {
 console.log("MATCH FOUND:");
 console.log(match[0]);
} else {
 console.log("NO MATCH");
}
