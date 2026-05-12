# Audience — POS Systems

> Used for `copy/pos.md`. Read before drafting any section on that page.
>
> ⚠ **This is a channel-partnership page, not a merchant pitch.** CTA copy, S5 swap, and S7 swap are different from the other three verticals. `is_channel_page = true` in the CMS.

## Targets

POS platforms with 1,000+ merchants and $100M+ volume:
- **Square** (primary, named by Kendall).
- **Helcim** (primary, named by Kendall).
- **Clover** (primary, named by Kendall).
- **Toast** (named).
- **Hit the Dishes** (named).

## Personas (page S8)

| Role | Pain | Outcome |
|---|---|---|
| VP Partnerships / BD (primary) | Acquiring merchants is expensive; retention is fragile. | Differentiated offer competitors can't match. |
| CTO / VP Product | Integrating a credit + loyalty layer is months of work. | One API. Onboarding 4–8 weeks. |
| CEO / Founder (mid-size) | Platform locked into card-network economics. | Structural moat: merchants stay because savings are built in. |
| Head of Merchant Success | Hard to prove the platform makes merchants more money. | $30M saved per $100M in volume — case writes itself. |

## Positioning

**Partnership / integration conversation — NOT a direct merchant pitch.**
Everything on this page reads platform-to-platform: API, revenue share, white-label, channel economics, operating model. The merchant ROI is the *outcome* of the partnership, not the subject.

## Pain (use the platform's language)

- Card-network interchange is a fixed cost passed to merchants — no platform leverage.
- Merchant churn is high; loyalty is owned by Visa, not the platform.
- New differentiated offers are hard to build — credit + underwriting + servicing + compliance is a 12-month build.
- Sponsor revenue is capped by what card networks allow.
- Competitor platforms are saying the same merchant story.

## Hook (locked)

> "You process the payment. We own the loyalty. Together, your merchants save $30M per $100M in volume — and they stay with your platform because the value is built in."

Hero headline (S1, locked):
> "Your merchants pay $36K per million to Visa. You can offer them $6K. That's your new competitive advantage."

## Volume language

- **Per $100M in merchant volume:** $30M saved.
- **Per $1M in merchant volume:** $6K with CredX vs $36K with Visa/MC.
- **Integration:** "one API integration."
- **Onboarding:** 4–8 weeks (vs months for an in-house build).
- **Default S5 figure:** *not* a calculator — the channel page swaps to Channel Multiplier Stats (`X,000 merchants × $6K savings × annual volume = $Y million unlocked`).

## CTA — different from the other three verticals

- Primary: **Explore a Partnership** *(⚠ alternative pending: "Talk to Our Team")*
- Secondary: **See the Merchant ROI**
- No "Book a Demo" — this is a partnership conversation.
- No "Calculate Your Savings" — savings are *the merchant's*, not the platform's.

## Section swaps (per `is_channel_page = true`)

- **S5** — swap calculator → **Channel Multiplier Stats**: three large stats (merchants × $6K × annual volume = unlocked $).
- **S7** — swap use-case storyboard → **Channel Operating Model table**: CredX · POS Partner · Merchant; rows = underwriting / funding / servicing / collections / support / risk / compliance / revenue share. Maps directly to Brand Guide §6 Lender One-Pager.
- **Partnership Parameters sub-block** (after S7) carries Tier 3 disclaimer verbatim: *"For discussion purposes only; not a commitment or offer."*

## Vertical-specific examples (S4 step examples)

- **Step 1:** a toggle in the platform; one API; no new hardware for merchants.
- **Step 2:** each merchant flips CredX on at checkout; Onus.ai underwrites their customers in 6 minutes.
- **Step 3:** $1=$1 rewards on every transaction; loyalty stays inside the platform; merchants stay too.

## Vertical-specific FAQ (S11 extras)

- API integration model (REST API, SDKs, sandbox, production 4–8 weeks).
- Revenue share structure (per-platform agreement; CredX captures credit + servicing margin; platform captures share of interchange-savings delta).
- White-label scope (full white-label is the default for channel partnerships).

## Anti-patterns (don't say this)

- "Empower your merchants." (vague, doesn't address platform priorities)
- "Book a demo." (wrong CTA — this is partnership framing)
- "Acquire more merchants." (the value is *retention*, not acquisition)
- Anything that treats Square / Helcim / Clover as a marketing channel — these are peers in a partnership conversation.
- Naming any POS platform without explicit public-use approval (they are *targets*, not yet partners).

## Tone notes specific to this vertical

POS-platform decision-makers read partnership decks every week. The win comes from:
1. Reading the room — this is *not* a sales call disguised as a partnership pitch.
2. Numbers framed at *platform scale* (merchant count × volume × savings), not merchant scale.
3. Operating model clarity (rows in the table = decision-making clarity).
4. Tier 3 disclaimer hygiene (this is a "for discussion only" page until LOIs are signed).
5. White-label as the default — never as a feature to be sold.

## Extension point

⏳ Awaiting from Marco:
- Status of conversations with Square / Helcim / Clover / Toast.
- Internal partnership deck (compare its operating-model phrasing to the table on this page).
- Approved revenue-share numeric ranges (currently "per agreement" — may be possible to publish a range).
- Any objection-handling library specific to VP Partnerships / CTOs.
