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

- [x] **Step 1: Add video container, poster overlay, play button, and card action styles to `src/style.css`**
- [x] **Step 2: Verify CSS syntax and responsiveness media queries**
- [x] **Step 3: Commit CSS styles**

---

### Task 2: JavaScript Controller for Click-to-Play Video Embeds

- [x] **Step 1: Implement `initCaseVideoEmbeds()` in `src/main.js`**
- [x] **Step 2: Hook `initCaseVideoEmbeds()` into `DOMContentLoaded` lifecycle**
- [x] **Step 3: Commit JavaScript controller**

---

### Task 3: Update Client Work Page (`work.html`)

- [x] **Step 1: Update cards in `work.html`**
- [x] **Step 2: Update subpage lead text in `work.html`**
- [x] **Step 3: Commit changes to `work.html`**

---

### Task 4: Update Home Page (`index.html`)

- [x] **Step 1: Update `#cases` grid in `index.html`**
- [x] **Step 2: Commit changes to `index.html`**

---

### Task 5: Build Verification, Responsive Testing & User Approval Checkpoint

- [x] **Step 1: Run production build**
- [x] **Step 2: Launch local dev server and test responsive rendering & interactions**
- [x] **Step 3: Hold deployment and await user review & approval**
