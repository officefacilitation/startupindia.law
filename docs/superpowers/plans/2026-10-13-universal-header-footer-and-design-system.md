# Universal Header, Footer, and Enterprise Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish a single-source-of-truth HTML partials architecture for the universal header, footer, and shared modals; deduplicate and unify CSS in `src/style.css`; and publish authoritative design system documentation in `docs/DESIGN_SYSTEM.md`.

**Architecture:** Native Vite build-time pre-rendering plugin via `transformIndexHtml` in `vite.config.mjs` inlining `src/partials/`, smart client-side active nav resolution in `src/main.js`, and token-governed CSS consolidation.

**Tech Stack:** Vanilla HTML5, Vanilla CSS3 (Custom Properties), Vite 5 (`vite.config.mjs`), Node.js.

## Global Constraints
- **Preserve Visible UI & Editorial Design:** The floating pill header, monochromatic aesthetics, typography, animations, and legal compliance disclaimers must look and behave identically or better.
- **Strict Character Limits for SEO:** All page titles ≤ 60 chars, descriptions 150–158 chars.
- **No Unapproved Pushes:** Do not push to GitHub unless explicitly commanded by the user.
- **No Browser Screenshots:** Do not open browser to capture screenshots.

---

### Task 1: Create HTML Partials in `src/partials/`

**Files:**
- Create: `src/partials/disclaimer-modal.html`
- Create: `src/partials/site-header.html`
- Create: `src/partials/site-footer.html`
- Create: `src/partials/chat-widget.html`
- Create: `src/partials/calendly-modal.html`

- [ ] **Step 1: Create `src/partials/disclaimer-modal.html`**
Extract the canonical statutory legal disclaimer modal (`#disclaimerOverlay`).

- [ ] **Step 2: Create `src/partials/site-header.html`**
Extract the universal floating pill header (`.site-header`), brand wordmark, desktop navigation with `data-nav` attributes, social button, consultation button, hamburger trigger, and mobile drawer.

- [ ] **Step 3: Create `src/partials/site-footer.html`**
Extract the universal 4-column editorial footer (`.site-footer`), social connect, navigation links, hub items, direct contact, Calendly trigger, and statutory Bar Council disclaimer bar.

- [ ] **Step 4: Create `src/partials/chat-widget.html`**
Extract the direct legal desk chat widget (`#legalBotWidget`).

- [ ] **Step 5: Create `src/partials/calendly-modal.html`**
Extract the Calendly 1:1 consultation booking modal (`#calendlyModal`).

- [ ] **Step 6: Commit Task 1**
```bash
git add src/partials/
git commit -m "feat(partials): extract universal header, footer, and modal partials"
```

---

### Task 2: Configure Vite Native HTML Partials Pre-Renderer & Dynamic Active Nav

**Files:**
- Modify: `vite.config.mjs`
- Modify: `src/main.js`

- [ ] **Step 1: Add `htmlPartialsPlugin()` in `vite.config.mjs`**
Implement zero-dependency regex replacement hook `transformIndexHtml(html)` that resolves `<!-- @include partials/<filename> -->` from `src/partials/`.

- [ ] **Step 2: Update `initHeader()` in `src/main.js` for dynamic active nav**
Automatically determine current route (`/`, `/services.html`, `/work.html`, `/updates.html`, `/about.html`, `/contact.html`) and toggle the `.active` class on the corresponding `[data-nav]` links.

- [ ] **Step 3: Test partial inclusion in a test run**
Run `npm run build` or node evaluation to ensure the plugin resolves partials without errors.

- [ ] **Step 4: Commit Task 2**
```bash
git add vite.config.mjs src/main.js
git commit -m "feat(build): add native Vite HTML partials plugin and dynamic active nav"
```

---

### Task 3: Refactor All 6 HTML Pages to Use Universal Partials

**Files:**
- Modify: `index.html`
- Modify: `services.html`
- Modify: `work.html`
- Modify: `about.html`
- Modify: `contact.html`
- Modify: `updates.html`

- [ ] **Step 1: Refactor `index.html`**
Replace duplicated modal, header, footer, chat widget, and Calendly HTML blocks with `<!-- @include partials/... -->` directives.

- [ ] **Step 2: Refactor `services.html`**
Replace duplicated blocks with partial directives.

- [ ] **Step 3: Refactor `work.html`**
Replace duplicated blocks with partial directives.

- [ ] **Step 4: Refactor `about.html`**
Replace duplicated blocks with partial directives.

- [ ] **Step 5: Refactor `contact.html`**
Replace duplicated blocks with partial directives.

- [ ] **Step 6: Refactor `updates.html`**
Replace duplicated blocks with partial directives.

- [ ] **Step 7: Verify build with `npm run build`**
Verify all 6 pages compile and generate clean output in `dist/`.

- [ ] **Step 8: Commit Task 3**
```bash
git add index.html services.html work.html about.html contact.html updates.html
git commit -m "refactor(pages): replace duplicated headers, footers, and modals with universal partials"
```

---

### Task 4: Consolidate `src/style.css` Header & Footer Styles

**Files:**
- Modify: `src/style.css`

- [ ] **Step 1: Deduplicate `.site-header` in `src/style.css`**
Merge lines 2470–2510 and lines 5829–5870 into a single authoritative block. Remove unnecessary `!important` flags.

- [ ] **Step 2: Solidify `.site-footer` in `src/style.css`**
Ensure all grid layouts (`.footer-grid-main`), responsive breakpoints (`1024px`, `640px`), typography, and disclaimer card styles are consolidated without conflicting rules.

- [ ] **Step 3: Verify build and styles**
Run `npm run build` to verify CSS compiles cleanly.

- [ ] **Step 4: Commit Task 4**
```bash
git add src/style.css
git commit -m "style: consolidate site-header and site-footer styles and eliminate duplicate rules"
```

---

### Task 5: Author Enterprise Design System & Update Agent Guidelines

**Files:**
- Create: `docs/DESIGN_SYSTEM.md`
- Modify: `.agents/AGENTS.md`

- [ ] **Step 1: Write `docs/DESIGN_SYSTEM.md`**
Document all design tokens (`:root`), typography scale, color palette, glassmorphism specs, component anatomy (`site-header`, `site-footer`, buttons), and coding rules.

- [ ] **Step 2: Update `.agents/AGENTS.md`**
Add mandatory design system adherence rules: forbid duplicate CSS appending, require use of established tokens and partials.

- [ ] **Step 3: Commit Task 5**
```bash
git add docs/DESIGN_SYSTEM.md .agents/AGENTS.md
git commit -m "docs: author design system reference and enforce agent styling rules"
```

---

### Task 6: Comprehensive Verification

**Files:**
- Test: `scripts/verify-seo.cjs`
- Command: `npm run build`

- [ ] **Step 1: Run automated SEO and structure audit**
Run `node scripts/verify-seo.cjs` to confirm 100% compliance across all 6 pages.

- [ ] **Step 2: Run production build verification**
Run `npm run build` to ensure all pages and asset bundles build with zero warnings or errors.

- [ ] **Step 3: Verify dev server response**
Verify local Vite server serves the transformed HTML with pre-rendered headers and footers.
