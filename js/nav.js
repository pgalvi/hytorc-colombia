/* ── HYTORC Colombia — Navigation ── */
(function () {
  'use strict';

  if (window.__nav_initialized) return;
  window.__nav_initialized = true;

  const header = document.querySelector('.site-header');
  const hamburger = document.querySelector('.hamburger');
  const mainNav = document.querySelector('.main-nav');
  const dropdowns = document.querySelectorAll('.has-dropdown');

  /* Sticky header on scroll */
  window.addEventListener('scroll', () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* Hamburger toggle */
  if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mainNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : ''; // Prevent scroll behind menu
    });
  }

  /* Navigation Link Click Handling (Unified) */
  const navLinks = mainNav ? mainNav.querySelectorAll('a') : [];
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const parentLi = link.closest('.has-dropdown');
      const isDropdownToggle = link.parentElement && link.parentElement.classList.contains('has-dropdown');
      const linkText = link.textContent.trim().toUpperCase();

      // Exception: INICIO ALWAYS navigates
      if (linkText === 'INICIO') {
        return;
      }

      if (isDropdownToggle) {
        // ALWAYS prevent navigation for categories except INICIO
        e.preventDefault();
        e.stopPropagation();

        if (window.innerWidth <= 1024) {
          const isOpen = parentLi.classList.contains('is-open');

          // Close other open sub-menus
          dropdowns.forEach(d => {
            if (d !== parentLi) d.classList.remove('is-open');
          });

          // Toggle current
          parentLi.classList.toggle('is-open');
        }
        return;
      }

      // regular links (navigation SHOULD happen)
      if (mainNav && mainNav.classList.contains('open')) {
        hamburger && hamburger.classList.remove('open');
        mainNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Prevent double-click navigation as well
    link.addEventListener('dblclick', (e) => {
      const isDropdownToggle = link.parentElement && link.parentElement.classList.contains('has-dropdown');
      const linkText = link.textContent.trim().toUpperCase();

      if (isDropdownToggle && linkText !== 'INICIO') {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  });

  /* Back to Top Button */
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Volver arriba');
  backToTop.innerHTML = '<svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>';
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* Close menu on outside click */
  document.addEventListener('click', e => {
    if (header && !header.contains(e.target)) {
      if (hamburger) {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
      mainNav && mainNav.classList.remove('open');
      dropdowns.forEach(d => d.classList.remove('is-open'));
      document.body.style.overflow = '';
    }
  });

  /* Mark current page in nav */
  function updateNavHighlighting() {
    const links = document.querySelectorAll('.main-nav a');

    // Force clear all first
    links.forEach(link => link.classList.remove('active'));

    links.forEach(link => {
      const href = link.getAttribute('href');
      const isCategoryParent = link.parentElement.classList.contains('has-dropdown');

      // EXCLUSION: Category parents and placeholders can NEVER be active via auto-highlight
      if (!href || href === '#' || href.startsWith('javascript:') || isCategoryParent) {
        return;
      }

      const currentPath = window.location.pathname;
      const linkPath = link.pathname;

      if (link.href === window.location.href ||
        (linkPath !== '/' && linkPath !== '' && currentPath.endsWith(linkPath))) {
        link.classList.add('active');
      }
    });
  }

  // Run immediately
  updateNavHighlighting();

  // Also run slightly later to override any late-running scripts or slow DOM updates
  setTimeout(updateNavHighlighting, 100);

})();
