// Product Carousel — horizontal scroll with arrows
(function () {
    const track = document.getElementById('prod-track');
    if (!track) return;

    const slides = track.querySelectorAll('.prod-slide');
    const total = slides.length;
    let current = 0;

    // How many slides visible at once based on viewport
    function visibleCount() {
        const w = window.innerWidth;
        if (w <= 600) return 2;
        if (w <= 900) return 3;
        return 5;
    }

    function getMaxIndex() {
        return Math.max(0, total - visibleCount());
    }

    function slideTo(idx) {
        current = Math.max(0, Math.min(idx, getMaxIndex()));
        const pct = (100 / visibleCount()) * current;
        track.style.transform = `translateX(-${pct}%)`;
    }

    document.querySelector('.prod-prev')?.addEventListener('click', () => slideTo(current - 1));
    document.querySelector('.prod-next')?.addEventListener('click', () => slideTo(current + 1));

    // Auto-advance every 3s
    setInterval(() => {
        const next = current >= getMaxIndex() ? 0 : current + 1;
        slideTo(next);
    }, 3000);

    window.addEventListener('resize', () => slideTo(current));
})();
