---
name: credx-copy
description: Write or edit copy for the CredX landing pages (4 verticals + global shared elements). Trigger when the user asks to draft, refine, review, or translate copy in `copy/<page>.md` files; when proposing headlines, CTAs, sub-copy, stat captions, FAQ answers, persona lines, or use-case storyboard captions; when checking tone/voice consistency on CredX deliverables; or when a copy section is marked DRAFT/SAMPLE/TBD and needs an iteration. Do NOT trigger for general landing-page copywriting outside the CredX project.
---

# CredX Copy Skill

You are writing copy for **CredX** — a closed-loop embedded credit + loyalty platform positioned as a *fairtech movement*, not a SaaS feature. Four landing pages, four audiences, one structural narrative.

## Always do this first

1. **Read the source of truth** before drafting:
   - `plan/01.Brand-Analysis.md` for brand facts (movement narrative, stats inventory, tone, personas, geography).
   - `plan/03.Full-Sitemap.md` Part 3 for the LOCKED per-page CMS field values (hero headline, sub, stats, CTAs, step examples — these are non-negotiable unless explicitly re-opened).
   - `plan/04.Brand-Direction-Review.md` for the "Quantified Manifesto" tonal frame.
   - `copy/_TEMPLATE.md` for the section block structure.
2. **Identify the audience** for the section you're writing (see `audiences/<vertical>.md`). Match register, persona vocabulary, and example transactions accordingly.
3. **Check the status flag** on the section: `LOCKED` (do not edit), `DRAFT` (iterating), `SAMPLE` (placeholder, must be replaced), `TBD` (not yet written).

## Hard rules (DO NOT)

- **Never invent numbers.** Every stat must trace to `plan/01.Brand-Analysis.md` §Stats Inventory verbatim ($6K vs $36K, 11–15% APR vs 19–44%, 43% lower default, 6-minute underwriting, $500M+ LOIs, etc.). If you need a number that isn't there, mark `[NUMBER NEEDED — pending external input]`.
- **Never edit LOCKED sections** without explicit user re-approval. LOCKED traces directly to an approved plan doc.
- **Never edit disclaimer copy** (Tier 1/2/3 from Brand Guide §4) — locked by CredX legal.
- **Never bury the movement narrative.** "Software should pay for people, not people for software" is the anchor. It leads the brand, never hides in a footer.
- **Never use Visa / MasterCard / BNPL approvingly.** They appear only in `copy/global.md` §G3 Comparison Table, as the system being disrupted.
- **Never hedge.** No "might," no "could potentially," no "we believe." Declarative. Founder-driven. Bold.
- **Never use ALL CAPS** except short labels (nav items, button micro-labels).
- **Never paraphrase founder quotes** from `Movement Deck.docx` or `Merchant Marketing Statement.docx` — use them verbatim or mark a section for fresh founder quote (and flag for Kendall approval).
- **Never use the D&Z-banned AI patterns** — see `voice.md` §"AI patterns to obliterate". These apply to every section, including section headers, button copy, and FAQ answers.

## Voice — three words

**Bold · Trustworthy · Empowering** (optional 4th: *Movement / Disruptive*).

See `voice.md` for the full do's/don'ts list, register notes, and the unresolved tone-descriptor question (Bold vs Confident/Decisive for conservative financial audiences).

## Copy mechanics

- **Sentence case.** Always.
- **Numbers in headlines** wherever a section *can* carry a number. Display weight visually (per `plan/04` §3 Typography).
- **Volume language matches the audience.** Automotive sees $1M/month dealer volume. Entertainment sees "$60K a night." Sports sees "per game night." POS sees "per $100M in merchant volume." Translate the same underlying fact into the visitor's worldview.
- **Persistent CTA mandate.** Every section that can carry a CTA, does. Minimum 4 CTA placements per page (`plan/03` Part 1 §G1 + Part 2 §S5/S9/S12 + G6 footer).
- **CTA copy is vertical-bound:**
  - Automotive / Entertainment / Sports → `Book a Demo` (with `Calculate Your Savings` secondary).
  - POS → `Explore a Partnership` (or `Talk to Our Team` — pending decision).
- **Canadian-first business register.** Conservative, professional. No regional political signals. No US-centric idioms.
- **Reading budget:** 30 seconds for the first screen (Kendall's mandate). Anything that doesn't earn its place there gets moved below the fold.

## Per-audience guidance

Each vertical has its own audience file with pain points, persona language, vertical-specific stats, anti-patterns, and approved example transactions. Read the relevant one before drafting:

- `audiences/automotive.md` — Dealership groups, DMS operators, OEM financing arms. Pink accent.
- `audiences/entertainment.md` — Venue operators, ticketing, indoor entertainment franchises. Dark Purple accent.
- `audiences/sports.md` — Pro teams & leagues, stadium operators, league admin bodies. Pink accent.
- `audiences/pos.md` — POS platforms (Square / Helcim / Clover / Toast). Light Purple accent. **Channel page** — partnership framing, not merchant pitch.

## Working with status flags

When iterating on a section:

| Flag | What to do |
|---|---|
| `LOCKED` | Don't touch. If user insists on edit, surface the source plan doc and ask them to re-open it explicitly. |
| `DRAFT` | Iterate freely. After the user approves, change to `LOCKED` only if the source plan doc supports it; otherwise leave as DRAFT until explicit approval. |
| `SAMPLE` | This is a placeholder waiting for external input (typically LOI quotes, partner logos, real volume figures). Keep the placeholder shape; suggest replacement only when the user signals the external input has arrived. |
| `TBD` | Write a first DRAFT. Flag any external dependencies in the section notes. |

## Reference workflow (the typical session)

1. User opens or references a `copy/<page>.md` file.
2. Skill activates. You read the relevant `audiences/<vertical>.md` and confirm the source plan refs.
3. You propose a tight DRAFT (one section at a time unless asked otherwise).
4. User refines or approves.
5. You update the status flag and commit the change in your response.

## What this skill does NOT do

- **Layout, motion, spacing, color** → `plan/04.Brand-Direction-Review.md` owns those. Don't introduce visual instructions inside copy files.
- **Image direction / generation prompts** → `prompts/<page>.md` owns those.
- **Section structure / order** → `plan/03.Full-Sitemap.md` owns that. Don't invent new sections.
- **Brand-fact updates** (palette, fonts, team roster) → `plan/01.Brand-Analysis.md` owns those.
- **Legal / disclaimer wording** → CredX legal owns that. Never edit.

## Extension points (for Marco to fill in later)

These files exist as stubs and are designed to be expanded with Marco's internal process documents:

- `audiences/<vertical>.md` — append client-specific intel: actual cold-email reply data, named champion contacts (PBS / Harley-Davidson / etc.), approved phrasing libraries, vertical-specific banned words, real volume figures once received.
- `voice.md` — add internal style-guide artifacts as they arrive (e.g., Kyle's BDR playbook lines that worked, Kendall's quote bank, Audrey's marketing tone refinements).
- `reference/` (create if needed) — drop in additional source docs (Movement Deck excerpts, EVP copy, competitor copy teardowns).

When new content arrives, treat it as authoritative over earlier guidance — but always reconcile against `plan/01.Brand-Analysis.md`. If a conflict is real, flag it; don't silently override.
