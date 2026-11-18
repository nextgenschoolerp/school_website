# Knowva Systems — School ERP Website

Static, high-performance marketing and product site for **Knowva Systems** and the **Knowva School ERP** platform. Engineered with modern semantic HTML5, Tailwind CSS design tokens, Material Symbols, and vanilla JavaScript (no build tools required).

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
├── index.html                   # Root landing page (GitHub Pages root entrypoint)
├── CNAME                        # Custom domain mapping (school.knowvasystems.com)
├── manifest.json                # PWA Web App Manifest
├── favicon.ico                  # Multi-resolution favicon (16, 32, 48px)
├── pages/                       # All subpages
│   ├── about.html
│   ├── capabilities.html
│   ├── demo.html
│   ├── demo-success.html
│   ├── fees.html
│   ├── parent-app.html
│   ├── pricing.html
│   ├── product.html
│   ├── resources.html
│   ├── security.html
│   └── solutions.html
├── assets/
│   ├── css/
│   │   └── styles.css           # Design tokens, interactive states, transitions
│   ├── js/
│   │   └── app.js               # Mobile nav, role tabs, pricing slider, search filter
│   ├── icons/                   # PWA & touch icons (180x180, 192x192, 512x512)
│   ├── img/                     # Local brand assets, hero illustrations, consultant portrait
│   └── video/                   # Hero and feature product videos (MP4 & WebM)
├── scripts/
│   └── validate_site.py         # Link, anchor, and essential files integrity checker
└── .github/
    └── workflows/
        └── deploy.yml           # Automated CI/CD validation & GitHub Pages deployment
```

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
- All 700+ internal `href`, `src`, `poster`, and `#anchor` references across all 12 pages.
