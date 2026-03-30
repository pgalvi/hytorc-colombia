/* ── HYTORC Colombia — Hero Slider ── */
(function () {
 'use strict';

 const slides = document.querySelectorAll('.slide');
 const dotsWrap = document.querySelector('.slider-dots');
 const prevBtn = document.querySelector('.slider-arrow.prev');
 const nextBtn = document.querySelector('.slider-arrow.next');
 const sliderEl = document.querySelector('.hero-slider');

 if (!slides.length) return;

 let current = 0;
 let autoPlay = null;
 const DELAY = 5000;

 /* Build dots */
 slides.forEach((_, i) => {
 const dot = document.createElement('button');
 dot.className = 'dot' + (i === 0 ? ' active' : '');
 dot.setAttribute('aria-label', `Ir a diapositiva ${i + 1}`);
 dot.addEventListener('click', () => goTo(i));
 dotsWrap && dotsWrap.appendChild(dot);
 });

 function getDots() { return document.querySelectorAll('.dot'); }

 function goTo(index) {
 slides[current].classList.remove('active');
 getDots()[current] && getDots()[current].classList.remove('active');
 current = (index + slides.length) % slides.length;
 slides[current].classList.add('active');
 getDots()[current] && getDots()[current].classList.add('active');
 }

 function next() { goTo(current + 1); }
 function prev() { goTo(current - 1); }

 function startAuto() { autoPlay = setInterval(next, DELAY); }
 function stopAuto() { clearInterval(autoPlay); }

 /* Arrow buttons */
 nextBtn && nextBtn.addEventListener('click', () => { stopAuto(); next(); startAuto(); });
 prevBtn && prevBtn.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });

 /* Pause on hover */
 sliderEl && sliderEl.addEventListener('mouseenter', stopAuto);
 sliderEl && sliderEl.addEventListener('mouseleave', startAuto);

 /* Touch swipe */
 let touchStartX = 0;
 sliderEl && sliderEl.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
 sliderEl && sliderEl.addEventListener('touchend', e => {
 const diff = touchStartX - e.changedTouches[0].clientX;
 if (Math.abs(diff) > 50) { stopAuto(); diff > 0 ? next() : prev(); startAuto(); }
 }, { passive: true });

 /* Keyboard nav */
 document.addEventListener('keydown', e => {
 if (e.key === 'ArrowRight') { stopAuto(); next(); startAuto(); }
 if (e.key === 'ArrowLeft') { stopAuto(); prev(); startAuto(); }
 });

 startAuto();
})();
