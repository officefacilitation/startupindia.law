# StartupIndia.Law — Enterprise Design System & Style Governance

**Version:** 1.0.0  
**Status:** Authoritative  
**Domain:** [startupindia.law](https://startupindia.law)  
**Governing Standard:** Advocates Act, 1961 & Bar Council of India Compliance  

---

## 1. Architectural Principles

This document defines the authoritative design tokens, typographic hierarchy, color systems, and reusable HTML partials for `StartupIndia.Law`. All future pages, components, and refactors **must** strictly adhere to these specifications.

1. **Strict DRY Modular Partials**: Never duplicate the header, footer, statutory disclaimer modal, legal bot widget, or Calendly modal across HTML pages. Always use the Vite pre-processor include syntax:
   ```html
   <!-- @include partials/disclaimer-modal.html -->
   <!-- @include partials/site-header.html -->
   <!-- @include partials/site-footer.html -->
   <!-- @include partials/chat-widget.html -->
   <!-- @include partials/calendly-modal.html -->
   ```
2. **Zero Runtime Layout Shift**: All partials are compiled into clean static HTML at build time via `htmlPartialsPlugin()` in `vite.config.mjs`, ensuring maximum Googlebot crawlability and zero client-side hydration delay.
3. **No Unsanctioned CSS Duplication**: All styles must reside in `src/style.css` using established CSS variables. Do not duplicate rules with `!important` flags.

---

## 2. Color Palette & Semantic Tokens

All color styling is rooted in CSS custom properties defined in `:root`.

| Token | Hex / HSL Value | Description & Purpose |
|---|---|---|
| `--color-ink` | `#111827` (Deep Slate / Obsidian) | Primary typography, headlines, active borders, primary buttons |
| `--color-charcoal` | `#374151` (Medium Charcoal) | Secondary text, lead paragraphs, body copy |
| `--color-grey` | `#6B7280` (Muted Grey) | Captions, dates, metadata, category labels, footnotes |
| `--color-light-grey` | `#9CA3AF` | Inactive icons, subtle breadcrumb delimiters |
| `--color-line` | `#E5E7EB` (Subtle Neutral Line) | Dividers, card borders, table separators |
| `--bg-light` | `#F9FAFB` (Off-White Canvas) | Primary page background, card surfaces |
| `--bg-soft` | `#F3F4F6` (Muted Studio Grey) | Footer canvas, subtle section alternates, disclaimer cards |
| `--color-white` | `#FFFFFF` | Card highlights, navbar backdrop pill, modal surfaces |
| `--color-gold` | `#B45309` / Amber | Editorial badge highlights, premier achievement tags |

---

## 3. Typography Scale & Fonts

The site uses a dual-typeface editorial system: serif for high-prestige headlines and crisp geometric sans for legal/technical legibility.

### Font Families
```css
--font-serif: 'Playfair Display', Georgia, Cambria, 'Times New Roman', serif;
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
--font-mono: 'JetBrains Mono', SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

### Typographic Hierarchy

| Role | Font Family | Size | Weight | Tracking / Line Height |
|---|---|---|---|---|
| **H1 (Hero Display)** | `--font-serif` | `clamp(36px, 5.2vw, 56px)` | 700 | `line-height: 1.1; letter-spacing: -0.02em` |
| **H2 (Section Header)** | `--font-serif` | `clamp(28px, 3.8vw, 40px)` | 600 / 700 | `line-height: 1.2; letter-spacing: -0.015em` |
| **H3 (Card / Subsection)** | `--font-serif` | `clamp(20px, 2.4vw, 24px)` | 600 | `line-height: 1.3; letter-spacing: -0.01em` |
| **Subpage Lead** | `--font-sans` | `clamp(15px, 1.8vw, 17px)` | 400 | `line-height: 1.6; color: var(--color-charcoal)` |
| **Body Copy** | `--font-sans` | `15px` | 400 | `line-height: 1.65; color: var(--color-charcoal)` |
| **Meta / Labels** | `--font-sans` | `11px - 12px` | 600 | `text-transform: uppercase; letter-spacing: 0.08em` |
| **Code / Citations** | `--font-mono` | `13px` | 400 | `line-height: 1.5; color: var(--color-charcoal)` |

---

## 4. Layout & Container Architecture

- **Max Container Width**: `--container-max: 1200px`
- **Container Padding**: `--container-pad: 24px` (Desktop) / `16px` (Mobile)
- **Breakpoints**:
  - Desktop: `> 1024px`
  - Tablet: `769px - 1024px`
  - Mobile: `481px - 768px`
  - Small Mobile: `<= 480px`

```css
.subpage-container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 120px var(--container-pad) 80px;
}
```

---

## 5. Universal Component Specifications

### 5.1 Floating Island Pill Header (`src/partials/site-header.html`)
- **Position**: `position: fixed; top: 16px; left: 0; right: 0; z-index: 10000;`
- **Surface**: `background: rgba(255, 255, 255, 0.82); backdrop-filter: blur(24px); border-radius: 9999px;`
- **Active Navigation Tracking**: Links include `data-nav="home|services|work|updates|about|contact"`. In `src/main.js`, `initHeader()` automatically matches current `window.location.pathname` and attaches `.active`.
- **Mobile Menu**: Responsive hamburger button triggers a slide-out drawer (`.mobile-nav-drawer`) with backdrop overlay.

### 5.2 Universal 4-Column Footer (`src/partials/site-footer.html`)
- **Structure**:
  - Column 1: Brand & Practice description + LinkedIn social button.
  - Column 2: Navigation Links (`home`, `services`, `work`, `updates`, `about`, `contact`).
  - Column 3: Counsel credentials, Berkeley Law alumni status, patent bar qualification, and regional hubs (Mumbai, Delhi-NCR, Silicon Valley, Europe).
  - Column 4: Direct contact channels (`info@startupindia.law`, `+91 78279 63285`, physical Noida office) + Calendly consultation trigger.
- **Statutory Bar**: Mandatory notice under Advocates Act 1961 clarifying independent private legal practice and non-affiliation with DPIIT / Government of India.

### 5.3 Statutory Legal Disclaimer Modal (`src/partials/disclaimer-modal.html`)
- **Compliance**: Required by the Bar Council of India & Advocates Act, 1961.
- **Storage**: Keyed via `localStorage.getItem('bci_disclaimer_accepted_v1')`.
- **Dismissal**: If accepted, stays closed. Triggers can manually re-open via `[data-open-disclaimer]`.

### 5.4 Direct Legal Desk Chat Widget (`src/partials/chat-widget.html`)
- **Behavior**: Collapsed bottom-right floating trigger button (`Hey, it's Aash`).
- **Interactive Capabilities**: Instant quick queries (consultation booking, WhatsApp direct channel, case studies, fee quotes).
- **Responsive**: Adapts gracefully to all mobile devices without covering page CTAs.

### 5.5 Calendly Booking Modal (`src/partials/calendly-modal.html`)
- **Functionality**: Lazily loads Calendly iframe on-demand when user clicks any consultation CTA (`#btnHeaderConsult`, `.btn-mobile-consult`, `.btn-footer-consult`).
- **Performance**: Zero external script loaded on page load; only loaded upon modal invocation.

---

## 6. Enterprise Clean Code Rules for Agents & Engineers

1. **NEVER** write duplicated header or footer blocks in `.html` files. Always use `<!-- @include partials/... -->`.
2. **NEVER** use inline `<style>` tags or arbitrary hex codes in HTML. Always map to design tokens in `src/style.css`.
3. **NEVER** add `!important` to header or footer rules without architectural review.
4. **ALWAYS** run `node scripts/verify-seo.cjs` and `npm run build` after making UI or structure changes.
