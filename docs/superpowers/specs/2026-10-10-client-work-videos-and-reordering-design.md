# Client Work Video Integration & Case Card Reordering Design

## 1. Overview & Objective
This design defines the implementation for integrating client YouTube videos into the Client Work page (`work.html`), reordering the client portfolio cards so that all client engagements with video case studies appear first, displaying recognized client names on both Home (`index.html`) and Client Work pages, and adding intuitive navigation bridges between Home &rarr; Client Work &rarr; Contact.

As requested by the client:
- **No deployment** until user tests and explicitly approves.
- **Strict responsiveness preservation** across mobile, tablet, and desktop.
- **Visual elegance** adhering to the existing editorial typographic aesthetic.

---

## 2. Card Reordering & Content Hierarchy

The 4 recognized client ventures with public video materials will be positioned as the primary cards (01 to 04), followed by the confidential institutional achievements (05 to 08):

| Card # | Client Name | Sector & Domain | Descriptive Subtitle | Video Title & URL |
|---|---|---|---|---|
| **01** | **Liger Mobility** | Electric Mobility &bull; Automotive | Self-Balancing Electric Scooter Venture | *Liger X \| Liger X+ \| World's First AutoBalancing Scooters* (`2omauJEUhao`) |
| **02** | **Metadome.ai** | Spatial Computing &bull; AI / XR | Immersive 3D & AR/VR Spatial Commerce Platform | *Chiratae Ventures DeepTech Portfolio: Metadome.ai* (`jY2HpXTvgiE`) |
| **03** | **Airth** | CleanTech &bull; Academic Spinout | India's First AC Air Purification Technology | *Airth’s Journey \| Clean Air Impact Over the Years* (`oC9OHmc55js`) |
| **04** | **Oizom** | Environmental IoT &bull; Sensors | Environmental Sensor Monitoring Hardware | *Oizom Journey (Company Video)* (`z9bNoLxF6yY`) |
| **05** | Confidential Entity | MedTech &bull; Early Diagnostics | Handheld Breast Screening Diagnostic Device | N/A (Identity withheld under privilege) |
| **06** | Confidential Entity | Sustainability &bull; Sanitation | Waterless Sanitation Infrastructure | N/A (Identity withheld under privilege) |
| **07** | Confidential Entity | Hardware &bull; Electric Mobility | Diamond-Frame Folding Electric Bicycle | N/A (Identity withheld under privilege) |
| **08** | Confidential Entity | Advanced Materials &bull; Cleantech | Smoke-Free Heating Material Research Spinout | N/A (Identity withheld under privilege) |

---

## 3. Client Work Page (`work.html`) Specifications

1. **Card Architecture**:
   - Header: Sector tag (`.case-sector-tag`) + Index number tag (`01` through `08`).
   - Title Hierarchy:
     - Main Title: Client Name (e.g., `Liger Mobility`) for cards 01–04, or descriptive domain title for 05–08.
     - Subtitle: The descriptive focus area (e.g., `Self-Balancing Electric Scooter Venture`).
   - Narrative Body: Retain the rigorous, legally compliant case narrative.
   - **Click-to-Play Video Preview Element** (Cards 01–04):
     - Responsive 16:9 container (`case-video-embed`).
     - Default state: High-resolution YouTube thumbnail (`https://img.youtube.com/vi/<ID>/hqdefault.jpg`) with an overlay play button badge, video duration/title tag, and subtle dark vignette.
     - Active state: Clicking swaps the thumbnail for a responsive embedded YouTube player (`https://www.youtube.com/embed/<ID>?autoplay=1&rel=0`) without layout shift.
     - Nested click safety: Clicking video play does not trigger card navigation.
   - **Advisory Bridge & CTA to Contact Page**:
     - Below the narrative/video, a chamber outcome note and button:
     - Example: *"Connect with Chamber for Similar Advisory &rarr;"* directing to `/contact.html?inquiry=portfolio&client=liger-mobility`.
     - For confidential cards: *"Inquire Confidentially &rarr;"* directing to `/contact.html?inquiry=portfolio`.

2. **Lead Narrative Update**:
   - Update `work.html` lead text to clarify: Public showcase features client-permitted videos from high-profile launches; all other client engagements maintain strict statutory confidentiality.

---

## 4. Home Page (`index.html`) Specifications

1. **Card Ordering in `#cases` Section**:
   - Matches the new order:
     - 01: Liger Mobility
     - 02: Metadome.ai
     - 03: Airth
     - 04: Oizom
     - 05: Handheld Breast Screening Diagnostic Device
     - 06: Waterless Sanitation Infrastructure
2. **Main Page Presentation**:
   - Prominent Client Names on cards 01–04.
   - **No video player** on the homepage to preserve speed, clean layout, and restrained aesthetics.
   - **"Know more about this &rarr;" Link**:
     - At the bottom of each card, add a discrete, elegant action link: `<a href="/work.html#case-01" class="case-card-link">Know more about this &rarr;</a>`.
     - Clicking routes directly to the detailed card on `work.html`.

---

## 5. Responsive Design & Styling System

- Add `.case-video-embed`, `.video-poster-wrapper`, `.video-play-btn`, `.case-client-badge`, and `.case-card-action` classes in `src/style.css`.
- Ensure aspect-ratio `16/9` with fallback for mobile devices.
- Guarantee that cards stack gracefully in single-column on tablets and phones (`max-width: 860px` and `max-width: 480px`).
- Ensure no overflow, horizontal scrolling, or layout jumping.

---

## 6. Verification & Safety Constraints

- Verify both pages in desktop (1280px+), tablet (768px), and mobile (375px/414px) screen sizes.
- Verify click interactions: video play triggers inline player; "Know more about this" routes to `work.html`; card CTA routes to `contact.html`.
- Run build/type check (`npm run build`).
- **NO deployment** until user testing and explicit approval.
