# Palmorama Retreat Home — Static (HTML/CSS/JS)

A pure vanilla HTML / CSS / JavaScript port of the immersive Palmorama site (originally a React + Framer Motion + Lenis app). No build step required — just open `index.html` or serve the folder with any static host.

## Folder structure
```
static-site/
├── index.html        # All sections (single page)
├── css/
│   └── styles.css    # All styling (palette, typography, layout, animations)
├── images/           # Local Palmorama image assets
└── js/
    └── main.js       # Lenis smooth scroll, GSAP parallax, interactions
```

## What works
- **Cinematic loader** with progress
- **Lenis smooth scrolling** (inertia, momentum)
- **GSAP ScrollTrigger** for:
  - Hero background parallax + zoom
  - Per-section parallax images (`data-parallax-y`)
  - Watermark drift
  - **Pinned horizontal-scroll gallery** (24 frames)
- **IntersectionObserver reveal** animations (words, lines, fade-up)
- **Curtain reveal** on room images
- **Auto-rotating testimonials carousel** (prev / next / dots)
- **Mobile drawer** menu
- **Sticky nav** with scroll-aware state
- **Contact form** → opens user's mail client (`mailto:`)
- **Top scroll-progress bar**

## Tech / CDNs
- Lenis 1.3.4 (smooth scroll)
- GSAP 3.12.5 + ScrollTrigger
- Google Fonts — Cormorant Garamond (serif), Inter (sans)
- Local image files from `static-site/images`

## Local preview
Any of:
```bash
# Python
python3 -m http.server 8080
# Node
npx serve .
# Or just open index.html directly (Lenis/GSAP load from CDN)
```
Then open http://localhost:8080.

## Content
All content (rooms, prices, testimonials, attractions, address, phone, email, social links) is real and sourced from [palmorama.in](https://palmorama.in/).

## Notes
- All "Book" buttons link to the real Palmorama booking page on `bookings.asiatech.in`.
- Contact form has no backend — it opens the user's email client pre-filled.
- Images are local relative paths, so the static site does not depend on an external image proxy.
