# Knowva Systems — School ERP website

Static marketing site for Knowva Systems and its School ERP product. Plain HTML, CSS and JavaScript with no build step.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home page and hero |
| `product.html` | The 13 modules |
| `capabilities.html` | Filterable capability checklist |
| `solutions.html` | Role-based solutions |
| `security.html` | Access control, audit and security controls |
| `pricing.html` | Pricing and estimator |
| `resources.html` | Resources and documentation |
| `about.html` | Company page |
| `demo.html` | Demo request |

## Structure

- `assets/styles.css` — design tokens (`:root`) and all page styles
- `assets/app.js` — mobile nav, role-workflow tabs, stat count-up, pricing estimator and capability filter

Pages link to the stylesheet and script with a `?v=N` query string. Bump `N` on every page when either file changes so browsers fetch the new version.

## Run locally

Serve the folder over HTTP (opening the HTML files directly skips nothing but may break relative paths in some browsers):

```bash
cd school_website
python -m http.server 4599
```

Then open http://localhost:4599/index.html.

## Notes

- Fonts load from Google Fonts (Plus Jakarta Sans, DM Sans).
- Copy avoids unverified claims. Security and compliance pages describe controls the product implements; they do not claim certifications.
