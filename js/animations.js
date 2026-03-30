/* ── HYTORC Colombia — Scroll Animations ── */
(function () {
 'use strict';
 const els = document.querySelectorAll('.fade-in');
 if (!els.length || !('IntersectionObserver' in window)) {
 els.forEach(e => e.classList.add('visible'));
 return;
 }
 const io = new IntersectionObserver(entries => {
 entries.forEach(entry => {
 if (entry.isIntersecting) {
 entry.target.classList.add('visible');
 io.unobserve(entry.target);
 }
 });
 }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });
 els.forEach(el => io.observe(el));
})();

// Accordion JS Script for Footer
document.addEventListener('DOMContentLoaded', function() {
 const accordionBtn = document.querySelector('.sitemap .accordion-button');
 const accordionCollapse = document.querySelector('.sitemap .accordion-collapse');
 
 if (accordionBtn && accordionCollapse) {
 accordionBtn.addEventListener('click', function() {
 const isExpanded = accordionBtn.getAttribute('aria-expanded') === 'true';
 if (isExpanded) {
 accordionBtn.setAttribute('aria-expanded', 'false');
 accordionCollapse.classList.remove('show');
 } else {
 accordionBtn.setAttribute('aria-expanded', 'true');
 accordionCollapse.classList.add('show');
 }
 });
 }
});
