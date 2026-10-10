# Client Work Videos and Card Reordering Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorder portfolio cards so clients with video case studies (Liger Mobility, Metadome.ai, Airth, Oizom) appear first with responsive click-to-play YouTube embeds on `work.html`, show prominent client names on both Home and Client Work pages, add "Know more about this &rarr;" on `index.html`, and "Connect with Us &rarr;" on `work.html`, while preserving responsive design and preventing deployment until approved.

**Architecture:** Vanilla HTML, CSS, and JS using semantic markup, YouTube `hqdefault.jpg` lazy posters swapped on click for zero-layout-shift `iframe` embeds, and standard anchor/button navigation.

**Tech Stack:** HTML5, Vanilla CSS (`src/style.css`), Vanilla JS (`src/main.js`), Vite build system.

## Global Constraints
- Do NOT deploy until user explicitly approves.
- Maintain responsive layout across all device sizes (mobile down to 320px, tablet, desktop).
- No YouTube video embeds on homepage (`index.html`); videos only on `work.html`.
- On homepage, add "Know more about this &rarr;" linking to `work.html`.
- On client work page, add "Connect with Us &rarr;" linking to `contact.html`.

---

### Task 1: CSS Styling for Video Embeds, Subtitles, and Action Links

**Files:**
- Modify: `src/style.css`

**Interfaces:**
- Produces: `.case-video-embed`, `.case-video-poster`, `.case-video-play-btn`, `.case-subtitle`, `.case-connect-btn`, `.case-know-more-link`

- [ ] **Step 1: Add video container, poster overlay, play button, and card action styles to `src/style.css`**
Add styles supporting:
- Responsive 16:9 aspect-ratio video container with border radius and overflow hidden.
- High-res poster image with subtle hover zoom and gradient overlay.
- Play button badge (red YouTube accent or refined monochrome glass with red play triangle, pulse on hover).
- Subtitle under case title with refined Cormorant/Inter typography.
- "Connect with Us &rarr;" secondary action button.
- "Know more about this &rarr;" link on homepage cards with hover underline and arrow transition.

- [ ] **Step 2: Verify CSS syntax and responsiveness media queries**
Ensure styles scale gracefully on screens under 860px and 480px.

- [ ] **Step 3: Commit CSS styles**
```bash
git add src/style.css
git commit -m "style: add styles for case video embeds, subtitles, and card action links"
```

---

### Task 2: JavaScript Controller for Click-to-Play Video Embeds

**Files:**
- Modify: `src/main.js`

**Interfaces:**
- Produces: `initCaseVideoEmbeds()` function in `src/main.js`, called during DOM initialization.

- [ ] **Step 1: Implement `initCaseVideoEmbeds()` in `src/main.js`**
Find all elements matching `.case-video-embed[data-youtube-id]`. When clicked:
- Prevent card parent navigation (`e.stopPropagation()`, `e.preventDefault()`).
- Create an `<iframe>` with attributes:
  - `src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0"`
  - `title="Client Case Study Video"`
  - `frameborder="0"`
  - `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"`
  - `allowfullscreen`
- Replace poster with iframe smoothly.

- [ ] **Step 2: Hook `initCaseVideoEmbeds()` into `DOMContentLoaded` lifecycle**
Ensure it initializes on all pages that have case video elements.

- [ ] **Step 3: Commit JavaScript controller**
```bash
git add src/main.js
git commit -m "feat: add click-to-play YouTube embed controller for client case cards"
```

---

### Task 3: Update Client Work Page (`work.html`)

**Files:**
- Modify: `work.html`

**Interfaces:**
- Consumes: `.case-video-embed`, `initCaseVideoEmbeds()`, `.case-connect-btn`
- Produces: 8 reordered cards with IDs `case-01` through `case-08`:
  - 01: Liger Mobility (`2omauJEUhao`)
  - 02: Metadome.ai (`jY2HpXTvgiE`)
  - 03: Airth (`oC9OHmc55js`)
  - 04: Oizom (`z9bNoLxF6yY`)
  - 05: Handheld Breast Screening Diagnostic Device
  - 06: Waterless Sanitation Infrastructure
  - 07: Diamond-Frame Folding Electric Bicycle
  - 08: Smoke-Free Heating Material Research Spinout
- Each video card contains click-to-play markup.
- Each card contains "Connect with Us &rarr;" linking to `/contact.html?inquiry=portfolio`.

- [ ] **Step 1: Update cards in `work.html`**
Reorder cards, update titles, add subtitles, embed preview containers for cards 01–04, and add "Connect with Us &rarr;" buttons to all cards.

- [ ] **Step 2: Update subpage lead text in `work.html`**
Reflect that public video showcases are featured with client permission, while institutional mandates remain confidential.

- [ ] **Step 3: Commit changes to `work.html`**
```bash
git add work.html
git commit -m "feat: reorder client cards and add YouTube video previews on work.html"
```

---

### Task 4: Update Home Page (`index.html`)

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: `.case-know-more-link`, `.case-subtitle`
- Produces: Reordered cards in `#cases` section:
  - 01: Liger Mobility
  - 02: Metadome.ai
  - 03: Airth
  - 04: Oizom
  - 05: Handheld Breast Screening Diagnostic Device
  - 06: Waterless Sanitation Infrastructure
- Each card has "Know more about this &rarr;" linking to `/work.html#case-01`, `/work.html#case-02`, etc.
- No video embeds on home page.

- [ ] **Step 1: Update `#cases` grid in `index.html`**
Reorder items, add client names to 01–04, add subtitles, and add the "Know more about this &rarr;" action link.

- [ ] **Step 2: Commit changes to `index.html`**
```bash
git add index.html
git commit -m "feat: update homepage case card ordering, names, and link to client work page"
```

---

### Task 5: Build Verification, Responsive Testing & User Approval Checkpoint

**Files:**
- Verify: `work.html`, `index.html`, `src/style.css`, `src/main.js`

- [ ] **Step 1: Run production build**
Run `npm run build` to verify there are zero build or syntax errors.

- [ ] **Step 2: Launch local dev server and test responsive rendering & interactions**
- Test desktop view (cards side-by-side).
- Test mobile view (single-column, no horizontal scroll, clean video aspect ratios).
- Test clicking "Watch" on video card (plays YouTube smoothly without navigating).
- Test clicking "Connect with Us &rarr;" (navigates to `/contact.html?inquiry=portfolio`).
- Test clicking "Know more about this &rarr;" on homepage (navigates to `/work.html#case-XX`).

- [ ] **Step 3: Hold deployment and await user review & approval**
Confirm git status is clean, no deployment commands are triggered, and present verification report to the user.
