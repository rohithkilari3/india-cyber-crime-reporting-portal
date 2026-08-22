# Trauma-Informed Redesign — National Cyber Crime Reporting Portal

A functional React + Tailwind prototype that replaces the bureaucratic, fear-styled portal with a calm, triage-first service. Front-end only (no backend); the reporting flow uses real routes and in-memory state, and generates a realistic acknowledgement number on submit.

## Design system (from the branding PDF, implemented as tokens)

All colours as CSS custom properties in `src/styles.css` — no hard-coded hex in components.

- brand-navy `#12294B` (header/institutional), brand-blue `#1D4ED8` (single "safe to click" colour), hover `#1642AE`
- emergency-red (muted crimson) + tint `#FBEAE9` — used only for the 1930 CTA and blocking errors
- success-green `#0F7A52` / tint `#EAF6F0`; caution-amber `#B7791F` / tint `#FDF3E2`
- focus-yellow `#FFDD00` — keyboard focus outline only
- text-primary `#0B0C0C`, text-secondary `#4B4F54`, border `#D1D5DB`, surface-white `#FFFFFF`, surface-grey `#F5F6F8`
- Flat only: no gradients, no drop-shadow cards, no threat imagery. Line icons in brand-blue or near-black.
- One typeface throughout, 16px base, left-aligned, generous whitespace, min 44px tap targets.
- Every status uses icon + text label, never colour alone.

## Pages and components

**Global sticky header** (in the root layout, on every page)
- Emblem + plain-language service name (no acronym soup)
- Emergency "Call 1930 now" button — `tel:1930`, phone icon, emergency-red on tint, always visible
- "Leave this site" button — instantly replaces the page with google.com (history-replacing, no back-trail)
- Accessibility controls: real font-size scaling (A / A+ / A++ at 100/125/150%, persisted) and a high-contrast mode — native buttons, labelled, no external screen-reader link
- Skip-to-content link; single `<main>` per page

**Homepage `/` — triage first**
- Hero: "What happened?" in plain language, one short reassuring line ("We're here to help")
- Four large icon-first routing cards, money first:
  1. Money was stolen from my account → financial fraud flow
  2. Someone is threatening or harassing me or my child → safety flow entry
  3. I want to check a suspicious number, link or UPI ID → suspect check
  4. I'm not sure / something else
- Below: quiet secondary strip — track an existing complaint, what happens after you report. Institutional/legal content collapsed behind progressive disclosure, never above the triage.

**Financial fraud flow — real routes, shareable URLs**
- `/report/financial/what-happened` — plain-language options ("Money left my bank account", "I was tricked into paying someone", "Someone used my card", "My UPI was used") plus a prominent **"I'm not sure"** path that continues without self-diagnosis. Amount and when-it-happened, with an urgency note about the golden hour.
- `/report/financial/evidence` — modern multi-file drag-and-drop zone with click fallback, file list with per-file remove, size/type feedback with icon + text. Optional; skippable.
- `/report/financial/verify` — mobile number, then a **clearly separated OTP section** (lock icon, 6 separate digit boxes, own card) and a distinct **security check** section (shield icon, invisible/behavioural check shown as a passive "Verified — no puzzle needed" state). No countdown timer; a quiet "resend code" instead.
- `/report/financial/submitted` — success page with a large, clearly labelled **Acknowledgement number** (e.g. `NCRP-2026-XXXXXXX`), copy button, plain next-steps list, and what to do right now (call your bank / 1930). No "Save As Draft" string anywhere.
- A calm step indicator ("Step 2 of 4"), back links between steps, and no legal wall — liability/consent text sits in a collapsible "Your declaration" block at the final step only.

**Supporting routes**
- `/report/safety` — plain-language entry ("Tell us in your own words what happened") with anonymous vs tracked explained in one sentence each, consequences stated plainly.
- `/check-suspect` — single radio toggle (Mobile / Email / Bank account / UPI / Social media) + one field; disclaimer collapsed below the result, not above the box.
- `/track` — acknowledgement number lookup (prototype result).

## Interaction & accessibility

- Motion limited to 150–250ms fades on route/step change; respects `prefers-reduced-motion`. No carousels, no auto-advance, no red countdown.
- Native semantic form controls with visible labels, `aria-describedby` help text, error summary at the top of the form linking to fields.
- Focus-visible outline in focus-yellow on every interactive element.
- Each route defines its own head() title/description/og tags.

## Technical notes

- TanStack Router file routes under `src/routes/`; the flow's shared answers live in a small React context provider so each step is still its own URL and refresh-safe for navigation (answers reset on hard refresh, which is acceptable for a prototype).
- Tailwind v4 tokens in `src/styles.css` under `@theme inline`; shadcn primitives restyled flat (no shadows, no gradients).
- No backend, no database, no auth — uploads and OTP are simulated client-side.
