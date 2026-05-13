/**
 * cover-section.js — ETAPA 5 (coreografia cinematográfica)
 * Cobre: pin da cover por 150vh + timeline scrub-linked com fade/scale internos
 * Dependências: GSAP, ScrollTrigger
 *
 * Coreografia (label 0..1 normalizado pelo scrub):
 *   - 0%  → 30%:  .cover-content opacity 1→0, y 0→-40px  | .cover-hint opacity → 0
 *   - 20% → 100%: .cover-media scale 1→0.4, borderRadius 0→24px
 *   - 60% → 100%: .cover-media opacity 1→0  (revela nav+hero embaixo)
 *
 * Toda config inline em cada tween/ScrollTrigger — sem ScrollTrigger.defaults / gsap.defaults.
 */
(function () {
  function initCoverSection() {
    if (!document.querySelector('.cover')) return;
    if (window.__credxReducedMotion) return; // reduced-motion: cover estática, sem pin/scrub
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.cover',
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // ease: 'none' inline em cada tween — em scrub o easing real vem do scrub: 1 (lerp).
    tl.to('.cover-content', { opacity: 0, y: -40, duration: 0.30, ease: 'none' }, 0);
    tl.to('.cover-hint',    { opacity: 0,         duration: 0.30, ease: 'none' }, 0);
    tl.to('.cover-media',   { scale: 0.4, borderRadius: 24, duration: 0.80, ease: 'none' }, 0.20);
    tl.to('.cover-media',   { opacity: 0,         duration: 0.40, ease: 'none' }, 0.60);

    // Aguardar pin estar registrado no layout antes de refrescar outros triggers
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCoverSection);
  } else {
    initCoverSection();
  }
})();
