/* ============================================================
   CredX — Automotive Landing Page
   Tier 1 motion stack (per plan/04 §0 Mercury lock):
   - reveals on scroll
   - number counters
   - sticky nav state
   - calculator
   - form modal
   - cookie banner
   Native (no custom JS): FAQ accordion (uses <details>),
   smooth scroll (CSS scroll-behavior).
   ============================================================ */

(function(){
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // === Reveal on scroll === — moved to ./split-reveal.js (credx-animation)

  // === Number counter === (adiciona .counted ao .stat parent ao terminar — micro-fx unit fade)
  const counterIO = ('IntersectionObserver' in window) ? new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count, 10);
      const stat = el.closest('.stat');
      if (reduced) {
        el.textContent = target.toLocaleString();
        if (stat) stat.classList.add('counted');
        counterIO.unobserve(el);
        return;
      }
      const duration = 1200;
      const start = performance.now();
      const ease = t => 1 - Math.pow(1 - t, 3);
      function tick(now){
        const t = Math.min(1, (now - start) / duration);
        el.textContent = Math.round(target * ease(t)).toLocaleString();
        if (t < 1) requestAnimationFrame(tick);
        else if (stat) stat.classList.add('counted');
      }
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.5 }) : null;
  if (counterIO) document.querySelectorAll('[data-count]').forEach(el => counterIO.observe(el));

  // === Sticky nav state ===
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 8) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // === Calculator === (morph numérico + pulse no $30k da hero)
  const vol = document.getElementById('vol');
  const volDisplay = document.getElementById('volDisplay');
  const savingsEl = document.getElementById('savings');
  const annualEl = document.getElementById('annualSavings');
  const heroAccent = document.querySelector('.hero h1 .serif-italic.accent');
  if (vol && volDisplay && savingsEl && annualEl) {
    let currentSavings = 30000;
    let currentAnnual = 360000;
    let pulseDebounce;
    function fmt(n){ return n.toLocaleString(); }
    function morph(el, from, to, duration, formatter) {
      if (reduced) { el.textContent = formatter(to); return; }
      const start = performance.now();
      const ease = t => 1 - Math.pow(1 - t, 3);
      function tick(now){
        const t = Math.min(1, (now - start) / duration);
        const v = Math.round(from + (to - from) * ease(t));
        el.textContent = formatter(v);
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    function pulseHero() {
      if (!heroAccent || reduced) return;
      heroAccent.classList.remove('pulse');
      void heroAccent.offsetWidth; // force reflow para reiniciar animation
      heroAccent.classList.add('pulse');
    }
    function recalc(animate) {
      const v = parseInt(vol.value, 10);
      // Visa benchmark: $36K per $1M. CredX: $6K per $1M. Savings = 30 * v / 1M
      const perMillion = v / 1000000;
      const savings = Math.round(30000 * perMillion);
      const annual = savings * 12;
      volDisplay.textContent = '$' + fmt(v);
      if (animate) {
        morph(savingsEl, currentSavings, savings, 380, n => fmt(n));
        morph(annualEl, currentAnnual, annual, 380, n => '$' + fmt(n));
      } else {
        savingsEl.textContent = fmt(savings);
        annualEl.textContent = '$' + fmt(annual);
      }
      currentSavings = savings;
      currentAnnual = annual;
    }
    vol.addEventListener('input', () => {
      recalc(true);
      clearTimeout(pulseDebounce);
      pulseDebounce = setTimeout(pulseHero, 180);
    });
    recalc(false);
  }

  // === Modal ===
  const modal = document.getElementById('demoModal');
  let lastFocused = null;

  function openModal() {
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    window.__credxLenis?.stop();
    const firstInput = modal.querySelector('input, select, textarea, button');
    if (firstInput) setTimeout(() => firstInput.focus(), 50);
  }
  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
    window.__credxLenis?.start();
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  document.querySelectorAll('[data-modal="demo"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });
  if (modal) {
    modal.querySelectorAll('[data-close]').forEach(btn => btn.addEventListener('click', closeModal));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) closeModal();
    });
    // Submit handling
    const form = modal.querySelector('form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        // TODO: POST to Zapier/Make webhook → DayAI CRM (per plan/07)
        const panel = modal.querySelector('.modal-panel');
        if (panel) {
          panel.innerHTML = '<button class="modal-close" data-close aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg></button>' +
            '<h2>Thanks.</h2>' +
            '<p class="modal-sub">Kyle will reach out within 1 business day. Or grab a slot directly: <a href="#" style="color:var(--ink);font-weight:500;">Calendly link</a>.</p>';
          panel.querySelector('[data-close]').addEventListener('click', closeModal);
        }
      });
    }
  }

  // === Cookie banner ===
  const cookie = document.getElementById('cookie');
  if (cookie) {
    const stored = localStorage.getItem('credx-cookie-consent');
    if (!stored) {
      // Show after a brief delay so it doesn't fight the hero reveal
      setTimeout(() => { cookie.hidden = false; }, 1200);
    }
    cookie.querySelectorAll('[data-cookie]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.cookie;
        localStorage.setItem('credx-cookie-consent', action);
        cookie.hidden = true;
      });
    });
  }

})();
