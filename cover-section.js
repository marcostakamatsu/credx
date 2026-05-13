/**
 * cover-section.js — zoom-in até cream + logo contida
 * Estratégia: cream é o fundo permanente da .cover. .cover-media (escuro) cobre no boot
 * e dissolve no final, revelando o cream que sempre esteve atrás. Logo faz scale inverso
 * pra manter tamanho visual contido enquanto o celular cresce 6x.
 * Dependências: GSAP, ScrollTrigger
 * Reduced-motion: cover estática, sem animação
 */
(function () {
  function initCover() {
    if (!document.querySelector('.cover')) return;
    if (window.__credxReducedMotion) return;
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

    // Estado inicial: background blurred (efeito focus-pull cinematográfico)
    gsap.set('.cover-media', { filter: 'blur(12px)' });

    // Fase 1 (0 → 0.35): texto cover fade-out + slide-up; background sai do blur (foco entra)
    tl.to('.cover-content', { opacity: 0, y: -40, duration: 0.35, ease: 'none' }, 0);
    tl.to('.cover-hint',    { opacity: 0,         duration: 0.25, ease: 'none' }, 0);
    tl.to('.cover-media',   { filter: 'blur(0px)', duration: 0.35, ease: 'none' }, 0);

    // Fase 2 (0.10 → 0.60): celular cresce devagar (zoom-in sutil)
    tl.to('.cover-phone', { scale: 1.6, duration: 0.50, ease: 'none' }, 0.10);

    // Fase 3 (0.20 → 0.60): overlay escuro clareia totalmente, revela logo
    tl.to('.cover-phone-overlay', { opacity: 0, duration: 0.40, ease: 'none' }, 0.20);

    // Fase 4 (0.60 → 0.95): celular cresce dramaticamente até ocupar viewport (scale 6)
    tl.to('.cover-phone', { scale: 6, duration: 0.35, ease: 'none' }, 0.60);

    // Fase 4b (0.60 → 0.95) PARALELO: conteúdo da tela (logo + placeholder) faz scale inverso
    // pra manter tamanho visual contido enquanto o phone cresce 6x. Scale 0.4 escolhido por
    // ajuste visual (1/6 estrito ficaria pequeno demais).
    tl.to('.cover-phone-content', { scale: 0.4, duration: 0.35, ease: 'none' }, 0.60);

    // Fase 5 (0.75 → 0.95): moldura do celular dissolve — frame fica transparente, sombras e notch somem
    tl.to('.cover-phone-frame', {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      duration: 0.20,
      ease: 'none',
    }, 0.75);
    tl.to('.cover-phone-notch', { opacity: 0, duration: 0.20, ease: 'none' }, 0.75);

    // Fase 6 (0.80 → 1.0): background escuro da cover dissolve.
    // Cream da .cover (background) aparece naturalmente atrás — sem flash preto.
    tl.to('.cover-media', { opacity: 0, duration: 0.20, ease: 'none' }, 0.80);

    // NÃO animar .cover-phone-screen — ele já é cream e se funde com o cream da .cover atrás.

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCover);
  } else {
    initCover();
  }
})();
