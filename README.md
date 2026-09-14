# StartupIndia.Law

> **Techno-Legal & Intellectual Property Counsel for High-Growth Startups, Deep-Tech Innovations & Investment Funds.**  
> Chambers of **Aashish (Aash) Gupta** — UC Berkeley Law Alumnus • USA Patent Bar Cleared.

[![Website](https://img.shields.io/badge/Website-startupindia.law-111827?style=flat-square)](https://startupindia.law)
[![Platform](https://img.shields.io/badge/Deployed_on-Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare)](https://pages.cloudflare.com/)
[![Email](https://img.shields.io/badge/Email_Delivery-Resend-000000?style=flat-square&logo=resend)](https://resend.com)
[![License](https://img.shields.io/badge/All_Rights_Reserved-StartupIndia.Law-1E3A8A?style=flat-square)](https://startupindia.law)

---

## Overview

[StartupIndia.Law](https://startupindia.law) is the official web portal of an independent techno-legal advisory practice. We integrate technical, legal, and financial intelligence under one roof, advising venture-backed startups, university spinouts, and tech-focused funds worldwide.

### Practice Moats
- **Intellectual Property Rights (IPR)**: Patent strategy, trade secrets, prosecution, and international filings.
- **Technology & Privacy Law**: Algorithmic governance, data protection, AI compliance, and digital platforms.
- **IP Transactions & Licensing**: Cross-border technology transfers, joint ventures, and licensing agreements.
- **Fund & Venture Advisory**: Cap table structuring, IP defensibility due diligence, and term sheet advisory.

---

## Website Architecture

The portal is built as a high-performance Multi-Page Application (MPA) designed with a quiet, editorial venture-studio aesthetic:

| Page | File | Purpose |
| :--- | :--- | :--- |
| **Homepage** | [`index.html`](index.html) | Interactive Query Basin, practice taxonomy, 6 landmark cases, testimonial stream, and binary hover lens. |
| **Specialties** | [`services.html`](services.html) | 10 trimmed techno-legal practice cards with scope descriptions and deliverables. |
| **Client Work** | [`work.html`](work.html) | Confidential case studies across healthcare, mobility, cleantech, and agritech. |
| **About Counsel** | [`about.html`](about.html) | Director profile, Berkeley credentials, USPTO patent bar qualification, and Apple v. Samsung trial work. |
| **Masterclasses** | [`updates.html`](updates.html) | 22 institutional workshops and keynote sessions across premier universities and accelerators. |
| **Contact** | [`contact.html`](contact.html) | Confidential inquiry portal with prefilled routing, WhatsApp direct access, and Calendly scheduling. |

---

## Tech Stack & Architecture

- **Frontend**: Semantic HTML5, Vanilla Modern CSS3, and ES6+ JavaScript.
- **Design System**: Warm canvas (`#FBFAF8`), obsidian ink (`#111827`), Cormorant Garamond & Inter typography, and subtle glassmorphism.
- **Serverless API**: Cloudflare Pages Functions ([`/functions/api/submit.js`](functions/api/submit.js)).
- **Email Infrastructure**: [Resend](https://resend.com) API for transactional firm notifications (`info@startupindia.law`) and client confirmation emails.
- **Booking Integration**: 1:1 Calendly consultation modal embed (`https://calendly.com/startupindia-info/30min`).
- **AI & LLM Discovery**: Optimized with semantic JSON-LD schema (`ProfilePage`, `Person`, `LegalService`) and a dedicated [`public/llms.txt`](public/llms.txt) dossier.

---

## Local Development

### Prerequisites
- Node.js 18+
- npm

### Setup & Run
```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```

The site will be available at `http://localhost:5173`.

> **Note on Local Form Submissions:**  
> The Vite dev server includes a local middleware in `vite.config.js` that intercepts `/api/submit` and runs the Resend dispatch function using credentials in `.dev.vars`.

### Production Build
```bash
npm run build
```
Generates production assets into `/dist` in <400ms.

---

## Deployment (Cloudflare Pages)

The website is configured for direct deployment on **Cloudflare Pages**:

1. **Framework Preset**: `Vite` (or None)
2. **Build Command**: `npm run build`
3. **Build Output Directory**: `dist`
4. **Environment Variables**:
   - `RESEND_API_KEY`: Encrypted secret key for transactional email dispatch.
5. **Functions**: Cloudflare Pages automatically detects the top-level [`/functions`](functions/) directory and deploys `/api/submit` as an edge serverless function.

---

## Statutory Legal Notice

- **Advocates Act, 1961**: This website complies with the statutory regulations and ethics of the Bar Council of India. All preliminary communications and disclosures are held in strict legal confidentiality.
- **Non-Affiliation Notice**: StartupIndia.Law is an independent private practice and is **not** affiliated, associated, or endorsed by the Government of India, DPIIT, or the official `startupindia.gov.in` portal.

---

&copy; StartupIndia.Law. All rights reserved. Confidentiality guaranteed under the Advocates Act, 1961.
