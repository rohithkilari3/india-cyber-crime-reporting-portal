# National Cyber Crime Reporting Portal - Trauma-Informed Redesign

**Live app**: https://indiacybercrimeprototype.lovable.app

Project: Modern, Trauma-Informed Redesign of the Indian National Cyber Crime Reporting Portal (cybercrime.gov.in).

Objective: Build a functional React/Tailwind prototype that completely overhauls the current portal. The current site suffers from a 2014-2018-era visual vocabulary with drop-shadow cards, gradient buttons, and stock "hooded hacker" threat photography. Your goal is to build a modern, high-trust, trauma-informed application that prioritizes user safety, clarity, and speed over bureaucratic framing.

Phase 1: Global UI/UX & Design System Principles Apply the following strict UX guidelines inspired by the GOV.UK Design System, WCAG 2.2, and SAMHSA's trauma-informed care framework:

Visual Trust & Authority: Implement a flat, typography-forward, minimal design. Use a calming, authoritative color palette (deep navy blues, crisp whites, soft gray backgrounds). Strictly avoid any fear-inducing imagery (no glowing skulls or hooded hackers).

Trauma-Informed Cognitive Load: Users are panicked. Implement Progressive Disclosure. Do not overwhelm them with walls of legal text or liability warnings before they can get help. Remove any stress-inducing UI elements, such as live, red, ticking session countdown timers.

F-Pattern Scanning & Readability: Structure pages for rapid scanning. Use large touch targets, generous whitespace, and left-aligned text.

True Accessibility: Build native accessible components. Do not rely on external screen-reader links. Implement real font-size scaling controls, not just a binary contrast toggle.

Phase 2: Core Components & Layouts to Build

1. The Global Emergency Header (Sticky):

Must feature a highly visible, persistent, tap-to-call "1930" helpline button styled like an emergency service, not a passive banner image.

2. Triage-First Homepage:

Abandon the current flat menu of bureaucratic acronyms.

Build a plain-language triage hero section asking "What happened?".

Provide 3-4 massive, icon-first, single-tap routing cards:

"Money was stolen" (Prioritize this above all).

"Someone is threatening or harassing me/my child."

"I want to check a suspicious number or link."

3. Streamlined Financial Fraud Reporting Flow (Multi-step form):

Step 1: Ask for plain-language categories, providing an "I'm not sure" fallback path so victims don't have to self-diagnose technical banking taxonomy (like AEPS or Demat fraud).

Step 2 (Evidence): Implement a modern multi-file drag-and-drop upload zone, completely replacing the tedious one-file-at-a-time clicks.

Step 3 (Authentication): Build an authentication UI where OTP entry fields and CAPTCHA fields are visually and physically separated with distinct icons, so stressed users do not mix them up. Assume invisible/behavioral CAPTCHA is being used.

Step 4 (Success): Generate a clear, shareable Acknowledgement Number, fixing the flaw where users see the literal string "Save As Draft".

Phase 3: Interactivity & State

Use smooth, calming micro-interactions (e.g., soft fades for page transitions) to reduce anxiety.

Ensure all primary actions are actual route transitions (shareable URLs), rather than relying on legacy JavaScript postbacks that break upon page refresh. Also, strictly follow the colours and branding guidelines attached in the second PDF.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
