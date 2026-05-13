# CredX

Closed-loop embedded credit + loyalty platform — landing page (Automotive vertical).

## Estrutura

- `/` — produção (cover cinematográfica + animações)
- `/motion-test` — POC sem cover (rollback funcional, reveals 100% via wheel)
- `/motion-test-cover` — POC com cover (espelho da produção atual)
- `/.claude/skills/credx-animation` — skill interna (snippets reusáveis)

## Bug conhecido em produção

Reveals (.reveal fade-up) não animam via mouse wheel — animam via barra de scroll.
Causa: dessincronia entre Lenis e ScrollTrigger quando há pin presente (cover-section).
Aceito conscientemente pra preservar o gesto cinematográfico do cover.
Rollback rápido: substituir conteúdo da raiz pelo de /motion-test (sem cover, sem bug).

## Stack

- HTML/CSS/JS vanilla, sem build step
- GSAP + ScrollTrigger + SplitText (via CDN)
- Lenis smooth scroll (via CDN)

## Deploy

GitHub Pages a partir do branch principal, pasta raiz `/`.
