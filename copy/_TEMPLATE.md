# Copy — Page Template

> **Convention:** one file per vertical landing page (`automotive.md`, `entertainment.md`, `sports.md`, `pos.md`) plus `global.md` for shared elements. Order matches `plan/03.Full-Sitemap.md` master section list (S1 → S13) and global symbols (G1 → G7).

> **Tracked in git** — copy is a build input that ships with the site.

> **Status flags per section:** `LOCKED` (verbatim from plan/03, do not edit), `DRAFT` (proposed, awaiting approval), `SAMPLE` (placeholder, must be replaced before launch), `TBD` (not yet written).

---

## Header

```
Page: <Automotive | Entertainment | Sports | POS>
Accent: <vertical accent hex>
Status: <DRAFT | APPROVED>
Sources: plan/03.Full-Sitemap.md Part 3 · plan/04.Brand-Direction-Review.md
```

---

## Section block (repeat per section)

```markdown
### S1 — Hero

**Status:** LOCKED | DRAFT | SAMPLE | TBD

**Headline (H1, ≤ 14 words):**
> [copy goes here]

**Sub (≤ 22 words):**
> [copy goes here]

**Stat chip (visible on hero):**
> [e.g., "$30,000 saved per $1M"]

**Primary CTA:** [Book a Demo | Explore a Partnership | etc.]
**Secondary link:** [See How Much You Save → S5 Calculator]

**Notes:**
- [tone notes, brand constraints, anti-patterns to avoid]
```

---

## Copy rules (apply to every page)

- **Language:** English. Canadian-first business register, no regional political signals.
- **Tone:** Bold · Trustworthy · Empowering (per `plan/01.Brand-Analysis.md`). No hedging, no apologies. Declarative.
- **Numbers:** every section that *can* carry a number, *does*. Numbers go in display weight visually (see `plan/04` §3 Typography).
- **Sentence case** everywhere. No ALL CAPS except short labels (nav, button micro-labels).
- **CTAs:** persistent mandate — every section that supports a CTA gets one. Min 4 CTA placements per page.
- **No card-network language:** never name Visa / MC / BNPL approvingly. Use them only in the comparison table as the system being disrupted.
- **No buried movement:** the "Software should pay for people…" frame must lead, not hide in footer.
- **Disclaimer hygiene:** any downloadable asset gets Tier 3; marketing CTAs get Tier 2 (per `plan/01` §Disclaimer System). Disclaimer text is **locked** — no edits without CredX legal.

---

## What this file does NOT contain

- Image direction / prompts → see `prompts/<page>.md`.
- Layout / motion / spacing → see `plan/04.Brand-Direction-Review.md`.
- Section structure → see `plan/03.Full-Sitemap.md`.
- Brand facts (palette, fonts, stats inventory) → see `plan/01.Brand-Analysis.md`.
