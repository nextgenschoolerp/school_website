# Knowva Systems — School ERP website

Static marketing site for Knowva Systems and its School ERP product. Plain HTML, CSS and JavaScript with no build step.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home page and hero |
| `pages/product.html` | The 13 modules |
| `pages/capabilities.html` | Filterable capability checklist |
| `pages/solutions.html` | Role-based solutions |
| `pages/security.html` | Access control, audit and security controls |
| `pages/pricing.html` | Pricing and estimator |
| `pages/resources.html` | Resources and documentation |
| `pages/about.html` | Company page |
| `pages/demo.html` | Demo request |

## Structure

```
index.html          home page (the only page at the root, as GitHub Pages expects)
CNAME               custom domain for GitHub Pages (must stay at the root)
pages/              all other pages
assets/css/         styles.css — design tokens (`:root`) and all page styles
assets/js/          app.js — mobile nav, role-workflow tabs, stat count-up, pricing estimator, capability filter
assets/img/         logos, hero and section illustrations (WebP / PNG)
assets/video/       hero and features videos (WebM and MP4)
scripts/            validate_site.py — checks required files, CNAME and every local link
.github/workflows/  deploy.yml — validates, then deploys to GitHub Pages
```

Pages link to the stylesheet and script with a `?v=N` query string. Bump `N` on every page when either file changes so browsers fetch the new version.

## Run locally

Serve the folder over HTTP (opening the HTML files directly skips nothing but may break relative paths in some browsers):

```bash
cd school_website
python -m http.server 4599
```

Then open http://localhost:4599/index.html

## Check links

```bash
python scripts/validate_site.py
```

The same script runs in CI before every deploy. It checks every local `href`, `src` and `poster`, the `#anchor` targets, and local `url()` references in CSS.

## Notes

- Fonts load from Google Fonts (Plus Jakarta Sans, DM Sans).
- Copy avoids unverified claims. Security and compliance pages describe controls the product implements; they do not claim certifications.
