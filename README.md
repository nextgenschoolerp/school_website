# Knowva Systems — School ERP Website

Static, high-performance marketing and product site for **Knowva Systems** and the **Knowva School ERP** platform. Built with semantic HTML5, Tailwind CSS (loaded from the Tailwind CDN, with design tokens in `tailwind-config`), a custom stylesheet, Material Symbols, and vanilla JavaScript. No build step is required: the site is plain files served as-is.

Based on the **Warm Institutional Modernism** design system pulled from Google Stitch project [15212067254820986152](https://stitch.google.com/projects/15212067254820986152).

---

## 🎨 Design System: Warm Institutional Modernism

- **Primary (`#BD5117`):** Warm Terracotta Orange — focal CTAs, active indicators, and high-impact brand accents.
- **Secondary (`#855314` / `#8C591A`):** Academic Gold / Ochre — institutional prestige, board certifications, metrics badges.
- **Tertiary (`#4D51A3`):** Slate Indigo — technical architecture, CBSE/ICSE integration modules.
- **Surfaces (`#FBF8FF`, `#F8F5F2`, `#FFFFFF`):** High-clarity paper bands alternating with deep navy contrast anchors (`#1B1F30`).
- **Typography:**
  - Headings: **Plus Jakarta Sans** (weights 600–800) with deliberate negative tracking.
  - Body & Labels: **DM Sans** for crisp legibility across academic matrices and multi-column tables.
  - Icons: **Material Symbols Outlined**

---

## 📄 Pages Directory

| Page | File | Purpose |
|---|---|---|
| **Home Page** | `index.html` | Hero narrative, live dashboard simulation, 14 module overview, zero re-keying lifecycle, persona workflows, parent app preview, governance, pricing, testimonials |
| **Product Architecture** | `pages/product.html` | The complete 14-module taxonomy, core architecture diagram, timetable clashing engine, and customization settings |
| **Fees & Payments** | `pages/fees.html` | Dedicated module deep dive: UPI gateway, concessions, NACH bank auto-reconciliation, physical counter receipts |
| **Role-Based Solutions** | `pages/solutions.html` | Tailored interfaces and workflows for Trustees, Principals, Admissions, Academic Coordinators, Teachers, Accounts, Transport & IT |
| **Parent Mobile App** | `pages/parent-app.html` | Android & iOS native parent app showcase: live GPS bus telemetry, digital homework diary, report cards, instant UPI fee settlement |
| **Capabilities Checklist** | `pages/capabilities.html` | Granular 140+ feature checklist categorized by module with real-time search and filter |
| **Security & IT Controls** | `pages/security.html` | Enterprise security architecture, field-level RBAC, immutable audit trails, multi-tenant schema isolation, India DPDP Act compliance |
| **Pricing & Calculator** | `pages/pricing.html` | Transparent per-student/year institutional pricing with an interactive cost estimator |
| **Resources & Docs** | `pages/resources.html` | Implementation playbooks, CBSE/ICSE evaluation matrices, and migration guides |
| **About Knowva** | `pages/about.html` | Company mission, leadership, engineering philosophy, and career openings |
| **Book a Demo** | `pages/demo.html` | Interactive 30-minute enterprise demo consultation booking form |
| **Demo Confirmed** | `pages/demo-success.html` | Submission confirmation and onboarding walkthrough schedule |

---

## 📁 Repository Structure

```
├── index.html                   # Home page and GitHub Pages entrypoint
├── CNAME                        # Custom domain (school.knowvasystems.com)
├── manifest.json                # PWA Web App Manifest (name, theme colour, icons)
├── favicon.ico                  # Site favicon
├── pages/                       # All other pages (11 HTML files)
│   ├── about.html               # Company, leadership, careers
│   ├── capabilities.html        # Searchable feature checklist
│   ├── demo.html                # Book-a-demo form
│   ├── demo-success.html        # Demo confirmation
│   ├── fees.html                # Fees & payments module
│   ├── parent-app.html          # Parent mobile app showcase
│   ├── pricing.html             # Pricing and cost estimator
│   ├── product.html             # Product architecture and modules
│   ├── resources.html           # Playbooks, evaluation matrices, migration guides
│   ├── security.html            # Security and IT controls
│   └── solutions.html           # Role-based solutions
├── assets/
│   ├── css/
│   │   └── styles.css           # Custom styles: layout, reveal/hover states, transitions
│   ├── js/
│   │   └── app.js               # Page interactions (see below)
│   ├── icons/                   # Favicons and PWA/touch icons (180, 192, 512 px, plus a 512 px favicon PNG)
│   ├── img/                     # Brand logos, hero and section illustrations, consultant photo
│   └── video/                   # Hero and features product videos (MP4 & WebM)
├── scripts/
│   └── validate_site.py         # Checks essential files, CNAME and internal links/anchors
└── .github/
    └── workflows/
        └── deploy.yml           # CI validation, secret scan and GitHub Pages deployment
```

### Shared site header

The header is defined once, in `assets/js/site-header.js` (markup) and `assets/css/site-header.css` (styles). Every page has the same mount point where the header used to be:

```html
<div id="site-header" data-root="../"></div>   <!-- "" on index.html, "../" in pages/ -->
<script src="../assets/js/site-header.js"></script>
```

- The current page's menu item gets `aria-current="page"`. `fees.html` highlights **Product**. The home page has no menu item, so nothing is highlighted there.
- Breakpoints: 1200px and up shows the inline menu. Below 1200px (tablet and mobile) the menu becomes a drawer. Below 640px the "Book a demo" button moves into the drawer.
- To add or rename a menu item, edit `NAV_ITEMS` in `site-header.js`. Every page updates.

### Shared site footer

The footer works the same way: `assets/js/site-footer.js` (content and links) and `assets/css/site-footer.css` (styles). Every page has `<div id="site-footer" data-root="…">` where the footer used to be. To change footer links, edit `FOOTER_COLUMNS` in `site-footer.js`. Every page updates.

### What `assets/js/app.js` does

Each feature starts on `DOMContentLoaded` and does nothing if its markup is missing on the page.

| Feature | Behaviour | Where it is used |
|---|---|---|
| Scroll reveals | Fades in `.reveal-item` / `.reveal-on-scroll` elements as they enter the viewport | `index.html`, `pages/parent-app.html` |
| Stat counters | Counts numeric stats up to their target value | Pages with counter markup |
| Hero and card tilt | Mouse-driven 3D tilt on the hero dashboard (`#heroDashboardMockup`) and tilt cards | `index.html` |
| Mobile navigation | Moved to `site-header.js` (see below) | — |
| Book-a-demo form | Handles the `#book-demo-form` submission | `pages/demo.html` |
| Beta sign-up form | Handles the `#betaForm` submission and shows `#betaSuccess` | `pages/parent-app.html` |
| Role tabs | Switches persona panels inside `[data-role-tabs]` | Markup not on any page yet |
| Pricing calculator | Per-student estimator (slider, board tier, add-ons) | Markup not on any page yet |
| Capabilities filter | Live search and count badge for the feature checklist | Markup not on any page yet |
| Accordions | Expand and collapse via `[data-accordion-toggle]` | Markup not on any page yet |

---

## 🚀 Running Locally

Serve the folder with any static HTTP server:

```bash
# Using Python 3:
python -m http.server 4600
```

Open [http://localhost:4600](http://localhost:4600) in your browser.

---

## 🧪 Automated Site Verification

Run the verification suite:

```bash
python scripts/validate_site.py
```

Checks:
- Essential files (`index.html`, `CNAME`, `styles.css`, `app.js`).
- CNAME correctness (`school.knowvasystems.com`).
- Every local `href`, `src`, `poster` and `#anchor` reference in all 12 HTML pages, and local `url(...)` references in CSS. External links are not fetched.

---

## 🌐 Deployment

The workflow in `.github/workflows/deploy.yml` runs on pushes and pull requests to `main`, and on manual dispatch:

1. **validate:** scans the repository for accidentally committed keys (Google, GitHub, AWS and private key patterns), then runs `scripts/validate_site.py`.
2. **deploy:** runs only on pushes to `main` (or manual dispatch) after validation passes, and publishes the repository root to GitHub Pages.
