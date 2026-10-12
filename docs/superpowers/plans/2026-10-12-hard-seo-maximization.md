# Comprehensive SEO Maximization & SERP Dominance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Execute full technical and on-page SEO optimization across StartupIndia.Law to dominate search results for `startup india law`, `startup india tech`, `startup india tech law`, and related startup legal queries, with zero-truncation snippets, FAQPage rich schema, BreadcrumbList markup, updated sitemap/robots, and zero disruption to the visible brand design.

**Architecture:** Semantic HTML5, Schema.org JSON-LD microdata graph, XML Sitemaps, Robots.txt search engine directives, and structured plain-text LLM context (`llms.txt`).

**Tech Stack:** HTML5, JSON-LD, XML, Vite build system.

## Global Constraints
- Zero visual disruption to the existing website design, styling, and typography.
- Meta descriptions strictly under 158 characters to guarantee zero truncation (`...`) on Google SERPs.
- Titles strictly under 60 characters with front-loaded target keywords.
- All JSON-LD structured data must be 100% valid Schema.org syntax.

---

### Task 1: Technical Crawling & Indexing Infrastructure

**Files:**
- Modify: `public/robots.txt`
- Modify: `public/sitemap.xml`
- Modify: `public/llms.txt`

- [ ] **Step 1: Update `public/robots.txt`**
Add comprehensive bot directives for Googlebot, Bingbot, Applebot, and AI crawlers (GPTBot, PerplexityBot, ClaudeBot), referencing `sitemap.xml` and `llms.txt`.

- [ ] **Step 2: Update `public/sitemap.xml`**
Update timestamps to `2026-10-12` with consistent canonical locators, priorities, and change frequencies.

- [ ] **Step 3: Enrich `public/llms.txt`**
Ensure search engine AI agents (ChatGPT, Perplexity, Gemini) have crystal-clear entity associations for `Startup India Law`, `Tech Startup Law`, and `Aashish Gupta`.

- [ ] **Step 4: Commit technical crawling infrastructure**
```bash
git add public/robots.txt public/sitemap.xml public/llms.txt
git commit -m "seo: optimize robots.txt, sitemap.xml, and llms.txt context"
```

---

### Task 2: Homepage (`index.html`) SERP Maximization & Rich Snippets

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Update metadata in `<head>`**
- `<title>`: `Startup India Law | Tech Startups, Legal Advisory & IP Counsel` (60 chars)
- `<meta name="description">`: `Startup India Law: Premier legal counsel for tech startups, deep-tech ventures & founders in India & globally. IP protection, venture finance & advisory.` (154 chars)
- `<meta name="robots">`: `index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`
- Open Graph and Twitter Card tags matching exact title and description.

- [ ] **Step 2: Inject Comprehensive JSON-LD Graph**
Add multi-entity schema including:
- `LegalService` with `knowsAbout`, coordinates, founder details, and verified citations.
- `WebSite` with Sitelinks Searchbox markup.
- `FAQPage` schema featuring 4 Bar Council-compliant FAQs to unlock Google rich accordion SERP snippets.

- [ ] **Step 3: Add discreet semantic topic micro-tag in Hero**
Add `<span class="hero-eyebrow-seo">TECH STARTUP LEGAL &bull; INTELLECTUAL PROPERTY &bull; VENTURE ADVISORY</span>` above the hero H1 for topical search weighting.

- [ ] **Step 4: Commit homepage SEO updates**
```bash
git add index.html
git commit -m "seo(home): add zero-truncation SERP snippet, FAQPage schema, and crawler directives"
```

---

### Task 3: Services Page (`services.html`) SEO & Breadcrumb Schema

**Files:**
- Modify: `services.html`

- [ ] **Step 1: Update `<head>` metadata**
- `<title>`: `Tech Startup Law Services | IP & Legal Advisory | StartupIndia.Law` (64 chars)
- `<meta name="description">`: `Comprehensive tech startup legal services: IPR protection, technology transfer, IP valuation, tech law, fund advisory & cross-border structuring in India.` (153 chars)
- Update `<meta name="robots">` with rich preview directives.

- [ ] **Step 2: Add `BreadcrumbList` & Service Offer Catalog Schema**
Add JSON-LD for breadcrumbs and practice areas.

- [ ] **Step 3: Commit services SEO updates**
```bash
git add services.html
git commit -m "seo(services): add breadcrumb schema, target keywords, and rich metadata"
```

---

### Task 4: Client Work (`work.html`) & About (`about.html`) SEO Optimization

**Files:**
- Modify: `work.html`
- Modify: `about.html`

- [ ] **Step 1: Update `work.html` metadata and schema**
- `<title>`: `Client Case Studies & Tech Startups | StartupIndia.Law` (53 chars)
- `<meta name="description">`: `Explore verified case outcomes for deep-tech, cleantech, and mobility startups advised by StartupIndia.Law across patent architecture and venture growth.` (153 chars)
- Add `BreadcrumbList` and `ItemList` schema for client achievements.

- [ ] **Step 2: Update `about.html` metadata and schema**
- `<title>`: `About Counsel | Aashish Gupta | Startup India Law Director` (58 chars)
- `<meta name="description">`: `Meet Aashish (Aash) Gupta: Global innovation strategist, UC Berkeley Law alumnus, and techno-legal counsel for high-growth tech startups in India & globally.` (157 chars)
- Add `BreadcrumbList` schema and enhanced Person profile data.

- [ ] **Step 3: Commit work and about page SEO updates**
```bash
git add work.html about.html
git commit -m "seo: optimize metadata, breadcrumb schema, and entity markup on work and about pages"
```

---

### Task 5: Contact (`contact.html`) & Keynotes (`updates.html`) SEO Optimization

**Files:**
- Modify: `contact.html`
- Modify: `updates.html`

- [ ] **Step 1: Update `contact.html` metadata and schema**
- `<title>`: `Contact Startup India Law | Consult Tech & IP Counsel` (53 chars)
- `<meta name="description">`: `Connect directly with StartupIndia.Law for confidential startup legal advisory, patent strategy, IP valuation, and venture consultations in India & globally.` (157 chars)
- Add `BreadcrumbList` and `ContactPage` schema.

- [ ] **Step 2: Update `updates.html` metadata and schema**
- `<title>`: `Tech Keynotes & Legal Masterclasses | Startup India Law` (55 chars)
- `<meta name="description">`: `Keynotes, institutional primers, and techno-legal workshops delivered across IITs, universities, and accelerators by StartupIndia.Law counsel.` (143 chars)
- Add `BreadcrumbList` schema.

- [ ] **Step 3: Commit contact and updates SEO updates**
```bash
git add contact.html updates.html
git commit -m "seo: optimize metadata and breadcrumb schema on contact and updates pages"
```

---

### Task 6: Build Verification & Validation

**Files:**
- Verify: All HTML files, XML sitemap, robots.txt

- [ ] **Step 1: Run production build**
Run `npm run build` to verify zero errors or broken assets.

- [ ] **Step 2: Validate JSON-LD structured data and length constraints**
Verify that all meta descriptions are under 158 chars, titles are under 65 chars, and schemas contain valid JSON.

- [ ] **Step 3: Present verification report to the user**
