/**
 * credx-animation: split-reveal  [motion-test POC variant — refactored 2026-05-13]
 * Cobre: S1 hero H1, S3 movement headline+sub, S9 proof quote, S12 final CTA + reveal global
 * Dependências: GSAP, ScrollTrigger (obrigatórios); SplitText (Club — opcional, com fallback)
 *
 * Refactor: duas funções independentes.
 *   - initGenericReveal():  processa .reveal / .reveal-d1/2/3/4 + [data-credx-stagger].
 *                           Roda SEMPRE. Não depende de SplitText.
 *   - initSplitReveal():    processa [data-credx-split]. Se SplitText ausente, delega
 *                           o elemento ao fade-up genérico (sem split, sem doble-anim).
 *
 * Reduced-motion: ambos respeitam window.__credxReducedMotion (estado final imediato).
 *
 * Substitui: script.js:19–32 (IntersectionObserver .reveal)
 *
 * NOTA: este é o snippet local do motion-test/. O original em
 * .claude/skills/credx-animation/snippets/split-reveal.js ainda NÃO foi sincronizado —
 * vai ser sincronizado após validação do POC.
 */

(function () {
  'use strict';

  // Delays do .reveal-d1/2/3/4 — convenção da skill, casa com style.css:1191–1194 (80/160/240/320ms).
  const REVEAL_DELAYS = {
    'reveal-d1': 0.08,
    'reveal-d2': 0.16,
    'reveal-d3': 0.24,
    'reveal-d4': 0.32,
  };

  function getRevealDelay(el) {
    for (const cls in REVEAL_DELAYS) {
      if (el.classList.contains(cls)) return REVEAL_DELAYS[cls];
    }
    return 0;
  }

  // Anima um único elemento via gsap.set(initial) + gsap.to(target).
  // Não usa gsap.from pra evitar conflito de especificidade com .reveal/.reveal.on do CSS legado.
  function animateFadeUp(el) {
    gsap.set(el, { opacity: 0, y: 20, willChange: 'opacity, transform' });
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: getRevealDelay(el),
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onComplete: () => {
        el.classList.add('on');
        el.style.willChange = 'auto';
      },
    });
  }

  function initGenericReveal() {
    const elements = gsap.utils.toArray('.reveal:not([data-credx-split])');
    const staggerContainers = document.querySelectorAll('[data-credx-stagger]');

    // === Reduced-motion: estado final imediato, sem ScrollTrigger ===
    if (window.__credxReducedMotion) {
      if (elements.length) gsap.set(elements, { opacity: 1, y: 0 });
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('on'));
      staggerContainers.forEach((c) => {
        const children = c.getAttribute('data-credx-stagger') === 'rows'
          ? c.querySelectorAll('tr')
          : c.children;
        if (children.length) gsap.set(Array.from(children), { opacity: 1, y: 0 });
      });
      return;
    }

    // === .reveal genérico — controle 100% via JS, vence CSS legado por especificidade inline ===
    elements.forEach(animateFadeUp);

    // === Stagger containers ===
    staggerContainers.forEach((container) => {
      const mode = container.getAttribute('data-credx-stagger');
      const children = mode === 'rows' ? container.querySelectorAll('tr') : container.children;
      if (!children.length) return;
      const childArr = Array.from(children);

      const staggerVal = childArr.length >= 6 ? 0.06 : 0.08;
      gsap.set(childArr, { opacity: 0, y: 20, willChange: 'opacity, transform' });
      gsap.to(childArr, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: staggerVal,
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onComplete: () => childArr.forEach((c) => (c.style.willChange = 'auto')),
      });
    });

    // Recalcula triggers — captura elementos acima da dobra que poderiam ter passado do start
    ScrollTrigger.refresh();
  }

  /**
   * wordSplit(element) — split vanilla por palavra, preservando inline tags.
   *
   * Regras:
   *   - childNode === Element (ex: <span class="serif-italic accent">$30,000</span>):
   *     wrap o elemento INTEIRO em um <span class="credx-word"> — trata o inline tag
   *     como UMA palavra única, preservando estilos internos.
   *   - childNode === TextNode: split por whitespace via /(\s+)/. Cada palavra (non-blank)
   *     vira <span class="credx-word">. Espaços ficam como text nodes simples entre os spans.
   *
   * Retorna: array dos .credx-word criados (na ordem do DOM).
   *
   * NOTE: line-split manual fica como opt-in futuro — exigiria Range measurement +
   * responsividade no resize (~150 linhas). Hoje data-credx-split="lines" cai pra word-split.
   */
  function wordSplit(element) {
    const original = Array.from(element.childNodes);
    const newNodes = [];
    const words = [];

    original.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Inline tag: wrap inteiro como uma única palavra
        const wrap = document.createElement('span');
        wrap.className = 'credx-word';
        wrap.style.display = 'inline-block';
        wrap.style.willChange = 'opacity, transform';
        wrap.appendChild(node);
        newNodes.push(wrap);
        words.push(wrap);
      } else if (node.nodeType === Node.TEXT_NODE) {
        const text = node.nodeValue || '';
        const parts = text.split(/(\s+)/); // capturing group preserva os whitespaces
        parts.forEach((part) => {
          if (part === '') return;
          if (/^\s+$/.test(part)) {
            // Whitespace puro: text node solto pra browser fazer break-word natural no resize
            newNodes.push(document.createTextNode(part));
          } else {
            const wrap = document.createElement('span');
            wrap.className = 'credx-word';
            wrap.style.display = 'inline-block';
            wrap.style.willChange = 'opacity, transform';
            wrap.textContent = part;
            newNodes.push(wrap);
            words.push(wrap);
          }
        });
      }
      // Outros node types (Comment etc) são ignorados — não esperamos no markup
    });

    element.innerHTML = '';
    newNodes.forEach((n) => element.appendChild(n));
    return words;
  }

  function initSplitReveal() {
    const splitTargets = document.querySelectorAll('[data-credx-split]');
    if (!splitTargets.length) return;

    // === Reduced-motion: estado final, SEM split, SEM mexer no DOM ===
    if (window.__credxReducedMotion) {
      gsap.set(Array.from(splitTargets), { opacity: 1, y: 0 });
      splitTargets.forEach((el) => el.classList.add('on'));
      return;
    }

    // === Word-split manual (sempre) ===
    // Se SplitText estiver disponível, ignoramos — comportamento previsível em todos os ambientes.
    splitTargets.forEach((el) => {
      // data-credx-split="lines" cai pra word-split (degradação graciosa). Ver comentário em wordSplit().
      const words = wordSplit(el);
      if (!words.length) return;

      gsap.set(el, { opacity: 1 });
      gsap.set(words, { opacity: 0, y: 20 });
      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.04,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onComplete: () => {
          el.classList.add('on');
          words.forEach((w) => (w.style.willChange = 'auto'));
        },
      });
    });

    ScrollTrigger.refresh();
  }

  function boot() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      // Sem GSAP/ScrollTrigger: garantir que .reveal não fique invisível.
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('on'));
      return;
    }

    initGenericReveal();
    initSplitReveal();
  }

  // defer scripts já rodam após parse, mas DOMContentLoaded pode ainda não ter disparado.
  // Cobre os dois caminhos.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
