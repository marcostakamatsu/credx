/**
 * credx-animation: micro-fx
 * Tier 1 + 2 micro-interactions que precisam de JS triggers.
 * Pure-CSS fx (hovers, transitions, keyframes) ficam em style.css.
 *
 * Triggers cobertos aqui:
 *   - Hero mockup: chart path draw-in + rows stagger (viewport enter)
 *   - Compare table: shimmer único no header CredX (viewport enter)
 *   - Storyboard panels: .ticked no viewport-enter (libera color rotation)
 *   - Final CTA: cursor tracking → CSS vars --mx --my
 *
 * Reduced-motion: respeita window.__credxReducedMotion (motion-core.js)
 * Load: defer no <head>; inicia em DOMContentLoaded.
 */
(function(){
  'use strict';
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    const reduced = window.__credxReducedMotion === true ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Helper: dispara cb uma vez quando el entra no viewport
    function onceVisible(el, cb, opts) {
      if (!('IntersectionObserver' in window)) { cb(el); return; }
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { cb(e.target); io.unobserve(e.target); }
        });
      }, opts || { threshold: 0.3 });
      io.observe(el);
    }

    // === Hero mockup: chart draw + rows stagger ===
    const mockup = document.querySelector('.hero .mockup');
    if (mockup) {
      // Setup do path: mede o tamanho real e seta dasharray/offset inline
      const path = mockup.querySelector('.mockup-chart path:not(.area)');
      if (path && typeof path.getTotalLength === 'function') {
        try {
          const len = path.getTotalLength();
          path.style.strokeDasharray = len;
          path.style.strokeDashoffset = len;
        } catch (_) { /* SVG não pronto — animation simplesmente não roda */ }
      }
      const reveal = () => {
        mockup.classList.add('drawn');
        if (path) path.style.strokeDashoffset = 0;
      };
      if (reduced) reveal();
      else onceVisible(mockup, reveal, { threshold: 0.25 });
    }

    // === Compare table: shimmer no header CredX ===
    const compareTable = document.querySelector('.compare-table');
    if (compareTable && !reduced) {
      onceVisible(compareTable, () => compareTable.classList.add('shimmer'), { threshold: 0.35 });
    }

    // === Storyboard panel ticks ===
    document.querySelectorAll('.usecase-panels .panel').forEach(panel => {
      if (reduced) { panel.classList.add('ticked'); return; }
      onceVisible(panel, () => panel.classList.add('ticked'), { threshold: 0.4 });
    });

    // === Final CTA: cursor tracking → --mx --my ===
    const finalCta = document.querySelector('.final-cta');
    if (finalCta && !reduced) {
      finalCta.addEventListener('mousemove', (e) => {
        const rect = finalCta.getBoundingClientRect();
        const mx = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
        const my = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
        finalCta.style.setProperty('--mx', mx + '%');
        finalCta.style.setProperty('--my', my + '%');
      });
    }
  }
})();
