/**
 * credx-animation: motion-core
 * Cobre: TODAS as seções (boot global)
 * Dependências: GSAP, ScrollTrigger, SplitText, Lenis (todos via CDN)
 * Auto-ativa se: sempre (carregar antes dos outros snippets)
 * Reduced-motion: Lenis não inicia, ScrollTrigger continua com scroll nativo
 *
 * Lazy-load gate: este script tem `defer` no <script> tag — executa após parse,
 * antes de DOMContentLoaded. Não bloqueia LCP. NÃO mover pra <head> sem defer.
 *
 * Substituições:
 *   - script.js:19–32 (IntersectionObserver .reveal) → snippets/split-reveal.js
 *   - script.js:34–53 (rAF counter) → snippets/counter.js
 *   - script.js:55–64 (sticky nav window.scrollY) → snippets/nav-sticky.js
 *   - script.js:66–85 (calc handler) → snippets/calc-tween.js
 */

(function () {
  'use strict';

  // === Reduced-motion check (single source of truth) ===
  const reducedMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  window.__credxReducedMotion = reducedMQ.matches;
  reducedMQ.addEventListener('change', (e) => {
    window.__credxReducedMotion = e.matches;
    // Reload é a saída mais segura — re-init parcial é frágil.
    location.reload();
  });

  // === Touch detection ===
  window.__credxIsTouch =
    ('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
    window.matchMedia('(hover: none)').matches;

  // === Remove conflicting CSS scroll-behavior (belt + suspenders;
  //     a linha em style.css:44 deve ser removida manualmente também) ===
  document.documentElement.style.scrollBehavior = 'auto';

  // Esperar DOMContentLoaded pra ter acesso ao CSSOM e ao DOM real.
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    // Cache do accent resolvido (ver references/accent-system.md)
    window.__credxAccent = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim();

    // Se libs não carregaram (CDN falhou), abortar gracefully.
    if (typeof gsap === 'undefined') {
      console.warn('[credx-animation] GSAP missing — motion disabled.');
      // Garantir que .reveal não fique invisível
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('on'));
      return;
    }

    // === GSAP plugins ===
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      // Defaults intencionalmente NÃO centralizados aqui.
      // Cada snippet declara start/toggleActions/etc inline nos seus próprios ScrollTriggers.
      // Razão: ScrollTrigger.defaults() é global; vaza pra triggers de outros snippets
      // (ex: pin de cover-section herda configs incompatíveis e gera tweens paused).
    }
    if (typeof SplitText !== 'undefined') {
      gsap.registerPlugin(SplitText);
    }

    // === Lenis (só se não reduced-motion E lib existe) ===
    if (!window.__credxReducedMotion && typeof Lenis !== 'undefined') {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false, // touch usa scroll nativo
      });

      // Bridge Lenis ↔ ScrollTrigger
      if (typeof ScrollTrigger !== 'undefined') {
        // scrollerProxy: dá ao ScrollTrigger uma fonte autoritativa de scroll
        // (Lenis), evitando ambiguidade quando pinSpacer altera o layout.
        // Crítico pra qualquer ScrollTrigger com pin: true funcionar junto com Lenis.
        ScrollTrigger.scrollerProxy(window, {
          scrollTop(value) {
            if (arguments.length) {
              window.__credxLenis.scrollTo(value, { immediate: true });
            }
            return window.__credxLenis.scroll;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
          pinType: document.body.style.transform ? 'transform' : 'fixed',
        });

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // Resync Lenis quando ScrollTrigger refresh recalcular layouts
        ScrollTrigger.addEventListener('refresh', () => lenis.resize?.());
      } else {
        // Lenis sozinho, sem ScrollTrigger
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }

      // Anchor links com Lenis
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
          const href = a.getAttribute('href');
          if (href === '#' || href.length < 2) return;
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -80 });
          }
        });
      });

      window.__credxLenis = lenis;
    } else {
      window.__credxLenis = null;
      // Reduced-motion: garantir que .reveal não fique invisível.
      // CSS já cobre (style.css:1200–1204) — isso é cinto extra.
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('on'));
    }

    // === ScrollTrigger refresh after load (fonts + lazy images settle) ===
    if (typeof ScrollTrigger !== 'undefined') {
      window.addEventListener('load', () => ScrollTrigger.refresh());

      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
      });
    }
  }
})();
