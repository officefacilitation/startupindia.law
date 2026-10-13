# Design Specification: Universal Header, Universal Footer, and Enterprise Design System

**Date:** 2026-10-13  
**Status:** Approved  
**Author:** Antigravity Engineering  
**Scope:** Architecture Refactor, Design Token Standardization, HTML Partials Engine, CSS Consolidation  

---

## 1. Problem Statement & Motivation

Across `index.html`, `services.html`, `work.html`, `about.html`, `contact.html`, and `updates.html`, there is approximately 340 lines of duplicate boilerplate HTML per page:
- The Statutory Legal Notice Disclaimer Modal (`#disclaimerOverlay`)
- The Global Header and Mobile Drawer Navigation (`.site-header`)
- The 4-Column Editorial Site Footer (`.site-footer`)
- The Legal Desk Interactive Chat Widget (`#legalBotWidget`)
- The Calendly 1:1 Consultation Modal (`#calendlyModal`)

Furthermore, in `src/style.css`, critical structural components like `.site-header` are defined in multiple separate locations (e.g., line 2470 and line 5829), relying on `!important` overrides and scattered media queries. This leads to visual drift, redundant code, maintenance overhead, and risk of inconsistency whenever new pages or updates are made.

---

## 2. Goals & Success Criteria

1. **Single Source of Truth (DRY Architecture):**  
   Header, footer, and shared modals defined in exactly one place under `src/partials/`.
2. **Zero-Dependency Native Build-Time Inlining:**  
   Use Vite's native `transformIndexHtml` hook in `vite.config.mjs` to pre-render partials into pure HTML during both `npm run dev` and `npm run build`.
3. **100% SEO & Crawler Native:**  
   Googlebot and other crawlers receive fully rendered HTML with no client-side rendering delay or JavaScript layout shift.
4. **CSS Consolidation & Token Enforcement:**  
   Deduplicate header and footer styles in `src/style.css`. Remove conflicting `!important` rules.
5. **Dynamic Active Navigation:**  
   Smart detection in `src/main.js` so that active page navigation (`home`, `services`, `work`, `updates`, `about`, `contact`) is automatically highlighted based on current path without hardcoded per-page hacks.
6. **Permanent Design System Documentation:**  
   Establish `docs/DESIGN_SYSTEM.md` and enforce it in `.agents/AGENTS.md` so that all future edits use canonical tokens for colors, typography, spacing, and components.

---

## 3. Architecture & File Structure

```
StartupIndiaLaw/
├── docs/
│   ├── DESIGN_SYSTEM.md                   <-- Enterprise design tokens & component guidelines
│   └── superpowers/
│       ├── specs/
│       │   └── 2026-10-13-universal-header-footer-and-design-system-design.md
│       └── plans/
│           └── 2026-10-13-universal-header-footer-and-design-system.md
├── src/
│   ├── partials/
│   │   ├── disclaimer-modal.html          <-- Bar Council statutory notice
│   │   ├── site-header.html               <-- Header, brand, nav, CTA, mobile drawer
│   │   ├── site-footer.html               <-- 4-col footer, credentials, disclaimer bar
│   │   ├── chat-widget.html               <-- Aash direct legal desk widget
│   │   └── calendly-modal.html            <-- 1:1 booking modal
│   ├── main.js                            <-- Client logic with dynamic active nav
│   └── style.css                          <-- Consolidated, deduplicated design system styles
├── vite.config.mjs                        <-- Native HTML partials transform plugin
├── index.html                             <-- Uses @include partials
├── services.html                          <-- Uses @include partials
├── work.html                              <-- Uses @include partials
├── about.html                             <-- Uses @include partials
├── contact.html                           <-- Uses @include partials
└── updates.html                           <-- Uses @include partials
```

---

## 4. Component Specifications

### 4.1. Vite HTML Partials Pre-Renderer (`vite.config.mjs`)
A lightweight Vite plugin hook:
```javascript
function htmlPartialsPlugin() {
  return {
    name: 'html-partials-pre-render',
    transformIndexHtml(html, ctx) {
      const partialsDir = resolve('src/partials');
      return html.replace(/<!--\s*@include\s+partials\/([\w.-]+)\s*-->/g, (match, filename) => {
        const filePath = resolve(partialsDir, filename);
        if (fs.existsSync(filePath)) {
          return fs.readFileSync(filePath, 'utf-8');
        }
        console.warn(`[html-partials] Warning: Partial not found: ${filePath}`);
        return match;
      });
    }
  };
}
```

### 4.2. Navigation Active State Handling (`src/main.js`)
In `initHeader()`:
```javascript
const currentPath = window.location.pathname.replace(/\/index\.html$/, '/');
const navMap = {
  '/': 'home',
  '/services.html': 'services',
  '/work.html': 'work',
  '/updates.html': 'updates',
  '/about.html': 'about',
  '/contact.html': 'contact'
};
const activeKey = navMap[currentPath] || 'home';

document.querySelectorAll('.site-header .nav-link, .mobile-nav-links .mobile-nav-link').forEach(link => {
  if (link.dataset.nav === activeKey) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});
```

### 4.3. Consolidated Stylesheet Architecture (`src/style.css`)
- **Canonical Header Block:** Unified floating pill navigation with glassmorphism backdrop blur (`rgba(255, 255, 255, 0.82)`), border radius `9999px`, and responsive mobile drawer. Remove redundant definitions at lines 2470 and 5829.
- **Canonical Footer Block:** Unified 4-column layout (`1.5fr 1fr 1.1fr 1.4fr`), brand wordmark, social connect button, and statutory disclaimer card with Bar Council compliance text.

---

## 5. Design System Tokens (`docs/DESIGN_SYSTEM.md`)

- **Palette:**
  - Canvas: `--bg-canvas: #FBFAF8;`
  - Text: `--color-ink: #111827;`, `--color-charcoal: #4B5563;`, `--color-grey: #6B7280;`
  - Accent: `--color-accent: #1E3A8A;`
  - Border: `--color-line: rgba(17, 24, 39, 0.08);`
- **Typography:**
  - Serif: `--font-serif: 'Cormorant Garamond', 'Instrument Serif', Georgia, serif;`
  - Sans: `--font-sans: 'Inter', system-ui, sans-serif;`
  - Mono: `--font-mono: 'SF Mono', 'Fira Code', monospace;`

---

## 6. Testing & Verification

1. **Build Validation:** Run `npm run build` to confirm all 6 HTML files transform cleanly and generate dist assets without syntax errors.
2. **SEO & Integrity Script:** Run `scripts/verify-seo.cjs` to confirm titles, meta descriptions, and schemas remain 100% compliant.
3. **Visual & Behavioral Consistency:** Check dev server routes (`/`, `/services.html`, `/work.html`, `/about.html`, `/contact.html`, `/updates.html`) to ensure header, footer, modals, and active nav links function identically across all pages.
