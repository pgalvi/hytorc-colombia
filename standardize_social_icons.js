const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const facebookSVG = `<svg viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>`;
const instagramSVG = `<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.975-9.658a1.44 1.44 0 100-2.881 1.44 1.44 0 000 2.88z" /></svg>`;
const linkedinSVG = `<svg viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.603 6.029-5.051 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>`;
const youtubeSVG = `<svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>`;

let totalFixed = 0;

for (const file of files) {
 let content = fs.readFileSync(file, 'utf8');

 // Replace the entire social-links-container block
 // We look for the container and its content
 const containerRegex = /<div class="social-links-container"[\s\S]*?<\/div>/g;

 let match;
 let changed = false;

 // We need to preserve the specific URLs in the footer
 // Let's find each link individually within the footer container
 const newContent = content.replace(containerRegex, (oldContainer) => {
 let updated = oldContainer;

 // Facebook
 const fbMatch = updated.match(/<a href="(https:\/\/www\.facebook\.com\/[^"]+)"[^>]*>[\s\S]*?<img[^>]*>[\s\S]*?<\/a>/);
 if (fbMatch) {
 updated = updated.replace(fbMatch[0], `<a href="${fbMatch[1]}" target="_blank" class="h-social-link" aria-label="Facebook">${facebookSVG}</a>`);
 }

 // Instagram
 const igMatch = updated.match(/<a href="(https:\/\/www\.instagram\.com\/[^"]+)"[^>]*>[\s\S]*?<img[^>]*>[\s\S]*?<\/a>/);
 if (igMatch) {
 updated = updated.replace(igMatch[0], `<a href="${igMatch[1]}" target="_blank" class="h-social-link" aria-label="Instagram">${instagramSVG}</a>`);
 }

 // LinkedIn
 const liMatch = updated.match(/<a href="(https:\/\/www\.linkedin\.com\/[^"]+)"[^>]*>[\s\S]*?<img[^>]*>[\s\S]*?<\/a>/);
 if (liMatch) {
 updated = updated.replace(liMatch[0], `<a href="${liMatch[1]}" target="_blank" class="h-social-link" aria-label="LinkedIn">${linkedinSVG}</a>`);
 }

 // YouTube
 const ytMatch = updated.match(/<a href="(https:\/\/www\.youtube\.com\/[^"]+)"[^>]*>[\s\S]*?<img[^>]*>[\s\S]*?<\/a>/);
 if (ytMatch) {
 updated = updated.replace(ytMatch[0], `<a href="${ytMatch[1]}" target="_blank" class="h-social-link" aria-label="YouTube">${youtubeSVG}</a>`);
 }

 if (updated !== oldContainer) {
 changed = true;
 // Ensure container has horizontal flex styling if not present
 if (!updated.includes('display:flex')) {
 updated = updated.replace('<div class="social-links-container"', '<div class="social-links-container" style="display:flex; justify-content:center; gap:16px; margin-top:15px;"');
 }
 return updated;
 }
 return oldContainer;
 });

 if (changed) {
 fs.writeFileSync(file, newContent);
 console.log(`Updated social icons in ${file}`);
 totalFixed++;
 }
}

console.log(`Total files updated: ${totalFixed}`);
