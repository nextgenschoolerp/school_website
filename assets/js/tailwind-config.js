/* Shared Tailwind (Play CDN) configuration for every page.
   Loaded right after https://cdn.tailwindcss.com. Index colours are the brand standard. */
tailwind.config = {
  "darkMode": "class",
  "theme": {
    "extend": {
      "colors": {
        "error": "#ba1a1a",
        "outline": "#8b7268",
        "primary-fixed-dim": "#ffb596",
        "secondary-fixed-dim": "#fcb972",
        "on-primary-fixed": "#360f00",
        "on-secondary-container": "#794909",
        "secondary-fixed": "#ffdcbc",
        "surface-bright": "#fbf8ff",
        "on-tertiary-fixed-variant": "#3a3d8e",
        "tertiary": "#4d51a3",
        "on-tertiary-fixed": "#080863",
        "background": "#fbf8ff",
        "on-surface": "#161b2d",
        "tertiary-fixed-dim": "#bfc1ff",
        "tertiary-container": "#666abd",
        "on-error": "#ffffff",
        "surface": "#fbf8ff",
        "surface-dim": "#f3f2ff",
        "on-primary": "#ffffff",
        "on-tertiary-container": "#faf7ff",
        "on-secondary": "#ffffff",
        "primary-fixed": "#ffdbcd",
        "secondary-container": "#ffbc74",
        "tertiary-fixed": "#e1e0ff",
        "surface-tint": "#a33e00",
        "on-primary-fixed-variant": "#7c2e00",
        "surface-container-highest": "#dee1fb",
        "surface-container-lowest": "#ffffff",
        "on-primary-container": "#fff6f4",
        "on-background": "#161b2d",
        "error-container": "#ffdad6",
        "on-secondary-fixed": "#2c1700",
        "primary-container": "#bd5117",
        "outline-variant": "#dec0b5",
        "on-tertiary": "#ffffff",
        "surface-container": "#ececff",
        "inverse-on-surface": "#efefff",
        "surface-variant": "#dee1fb",
        "primary": "#bd5117",
        "inverse-surface": "#2b2f43",
        "on-surface-variant": "#574239",
        "inverse-primary": "#ffb596",
        "surface-container-high": "#e4e7ff",
        "secondary": "#855314",
        "on-error-container": "#93000a",
        "surface-container-low": "#f3f2ff",
        "on-secondary-fixed-variant": "#683d00",
        "primary-dark": "#9b3b00",
        "primary-light": "#ffb596",
        "primary-subtle": "#fff4ee",
        "navy": "#1B1F30",
        "navy-dark": "#131724",
        "accent": "#1E6B55"
      },
      "fontFamily": {
        "display-hero": [
          "Plus Jakarta Sans"
        ],
        "headline-sm": [
          "Plus Jakarta Sans"
        ],
        "body-md": [
          "DM Sans"
        ],
        "body-sm": [
          "DM Sans"
        ],
        "headline-lg": [
          "Plus Jakarta Sans"
        ],
        "headline-md": [
          "Plus Jakarta Sans"
        ],
        "headline-lg-mobile": [
          "Plus Jakarta Sans"
        ],
        "title-card": [
          "Plus Jakarta Sans"
        ],
        "label-caps": [
          "DM Sans"
        ],
        "body-lg": [
          "DM Sans"
        ],
        "display-hero-mobile": [
          "Plus Jakarta Sans"
        ],
        "label-md": [
          "DM Sans"
        ],
        "display": [
          "\"Plus Jakarta Sans\"",
          "sans-serif"
        ],
        "body": [
          "\"DM Sans\"",
          "sans-serif"
        ]
      },
      "fontSize": {
        "display-hero": [
        "54px",
        {
          "lineHeight": "62px",
            "letterSpacing": "-0.03em",
            "fontWeight": "800"
          }
        ],
        "headline-sm": [
          "22px",
          {
            "lineHeight": "30px",
            "letterSpacing": "-0.01em",
            "fontWeight": "600"
          }
        ],
        "body-md": [
          "16px",
          {
            "lineHeight": "24px",
            "letterSpacing": "0",
            "fontWeight": "400"
          }
        ],
        "body-sm": [
          "14px",
          {
            "lineHeight": "20px",
            "letterSpacing": "0.005em",
            "fontWeight": "400"
          }
        ],
        "headline-lg": [
        "36px",
        {
          "lineHeight": "40px",
            "letterSpacing": "-0.025em",
            "fontWeight": "700"
          }
        ],
        "headline-md": [
          "28px",
          {
            "lineHeight": "36px",
            "letterSpacing": "-0.02em",
            "fontWeight": "700"
          }
        ],
        "headline-lg-mobile": [
          "28px",
          {
            "lineHeight": "34px",
            "letterSpacing": "-0.02em",
            "fontWeight": "700"
          }
        ],
        "title-card": [
          "19px",
          {
            "lineHeight": "26px",
            "letterSpacing": "-0.01em",
            "fontWeight": "600"
          }
        ],
        "label-caps": [
          "12px",
          {
            "lineHeight": "16px",
            "letterSpacing": "0.08em",
            "fontWeight": "700"
          }
        ],
        "body-lg": [
          "18px",
          {
            "lineHeight": "28px",
            "letterSpacing": "0",
            "fontWeight": "400"
          }
        ],
        "display-hero-mobile": [
          "38px",
          {
            "lineHeight": "44px",
            "letterSpacing": "-0.02em",
            "fontWeight": "800"
          }
        ],
        "label-md": [
          "14px",
          {
            "lineHeight": "18px",
            "letterSpacing": "0.01em",
            "fontWeight": "600"
          }
        ]
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "spacing": {
        "space-md": "1rem",
        "margin": "1.5rem",
        "space-xs": "0.375rem",
        "space-2xl": "5rem",
        "gutter-desktop": "2rem",
        "space-sm": "0.625rem",
        "space-xl": "3rem",
        "margin-desktop": "3rem",
        "gutter-mobile": "1rem",
        "gutter": "1.5rem",
        "margin-mobile": "1.5rem",
        "space-lg": "1.75rem"
      }
    }
  }
};
