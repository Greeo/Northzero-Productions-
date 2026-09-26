# Northzero Productions · Site Operations & Maintenance Runbook

> **Standard Operating Procedure:** Keep this repository fast, resilient, and zero-maintenance. Follow these rules when updating content or publishing new assets.

---

## 1. Publishing a New Journal Field Brief

To publish a new article without breaking grid layouts or routing:

1. **Create the Article File:**
   - Duplicate an existing post in `/journal/` (e.g., `journal/evidentiary-standard-municipal-review.html`).
   - Use clean, hyphenated lowercase filenames: `journal/your-slug-here.html`.
   - Ensure header links use `../` (e.g., `<link rel="stylesheet" href="../style.css?v=2.2">`).

2. **Register in `journal-posts.json`:**
   - Open `journal-posts.json` at root.
   - Prepend your new entry at the top:
     ```json
     {
       "id": "post-X",
       "slug": "journal/your-slug-here.html",
       "title": "Your Title Here",
       "category": "architectural",
       "categoryLabel": "Architectural Cinema",
       "date": "Month 2026",
       "readTime": "6 min read",
       "excerpt": "Two-sentence summary of the brief...",
       "image": "/assets/images/your-image.jpg",
       "imageAlt": "Visual description of the frame",
       "featured": true
     }
     ```
   - If setting `"featured": true`, remember to toggle the previous featured post to `false`.

---

## 2. Asset & Image Integrity Rules

- **Always Root-Relative:** All image sources in `journal-posts.json` and site HTML must begin with `/` (e.g., `/assets/images/photo.jpg`). Never use relative paths like `assets/...` or `../../`.
- **Naming Conventions:** Lowercase letters, numbers, and hyphens only (`estate-twilight-hudson.jpg`). No spaces, no uppercase characters.
- **Web Optimization:** Compress all production stills before uploading (WebP or 80–85% JPEG). Keep stills under 350KB where possible.

---

## 3. Contact & Intake Pipeline (Formspree)

- **Endpoint ID:** `xykedrkb` (Production Brief form).
- **Honeypot Protection:** Always verify the `<input type="text" name="_gotcha" style="display:none !important">` field remains intact inside `<form>`.
- **Calendly Handoff:** Ensure the fallback redirect remains locked to `https://calendly.com/northzeroproductions-info/30min`.

---

## 4. Cache-Busting Checklist (CSS / JS Updates)

Whenever you push core styling or navigation logic changes:
- Increment query version strings across all pages:
  - `<link rel="stylesheet" href="style.css?v=2.3">`
  - `<script src="nav.js?v=2.2"></script>`
- In subdirectories (`/journal/`), remember the relative jump:
  - `<link rel="stylesheet" href="../style.css?v=2.3">`

---

## 5. Routine Pre-Commit Smoke Test

Before pushing changes to `main`:
- [ ] Test `index.html` on mobile viewport (verify zero horizontal sway).
- [ ] Verify `work.html` filter tags switch without console errors.
- [ ] Check `journal.html` loads all posts and filter tabs respond.
- [ ] Verify links from `all-services.html` route cleanly without 404s.

When referencing your own local assets, the cleanest and most resilient method is using a **root-relative path** starting with a forward slash (`/`).

Assuming your project directory looks like this:

```text
root/
├── assets/
│   ├── images/
│   │   ├── leather-craft.jpg
│   │   ├── estate-twilight.jpg
│   │   └── stone-facade.jpg
├── journal-posts.json
├── journal.html
└── journal/
    └── why-luxury-brands-need-film.html

```

---

### In `journal-posts.json`

Write the `"image"` property starting with a forward slash `/`:

```json
[
  {
    "id": "post-1",
    "slug": "journal/why-luxury-brands-need-film.html",
    "title": "Why Luxury Brands Need Film, Not Photography",
    "category": "tactile",
    "categoryLabel": "Tactile Narratives · Materiality",
    "date": "April 2026",
    "readTime": "8 min read",
    "excerpt": "Photography captures surface aesthetics. Cinema communicates physical weight, finish, and tactile craft...",
    "image": "/assets/images/leather-craft.jpg",
    "imageAlt": "Macro cinematography study of luxury leather texture and stitching",
    "featured": true
  },
  {
    "id": "post-2",
    "slug": "journal/why-estate-listings-need-cinema.html",
    "title": "Why Estate Listings Need Cinema, Not Walkthroughs",
    "category": "architectural",
    "categoryLabel": "Architectural Cinema",
    "date": "March 2026",
    "readTime": "6 min read",
    "excerpt": "A virtual walkthrough displays floorplans. Deliberate 24fps spatial pacing and twilight optics command premium valuation...",
    "image": "/assets/images/estate-twilight.jpg",
    "imageAlt": "Modern architectural estate at twilight in Westchester County",
    "featured": false
  }
]

```

---

### Why the leading slash (`/`) is essential:

1. **Root-relative anchoring:** When a browser sees `/assets/images/estate-twilight.jpg`, it always resolves from your root domain (`[https://northzeroproductions.com/assets/images/estate-twilight.jpg](https://northzeroproductions.com/assets/images/estate-twilight.jpg)`), regardless of what page or subfolder loads it.
2. **Prevents path drift:** If you wrote `assets/images/...` without the leading `/`, loading it from inside the `/journal/` directory would cause the browser to search for `journal/assets/images/...` and trigger another `404 Not Found`.

---

### Using Local Images Inside Article HTML Files

If you are adding images directly into an article file (like `journal/why-luxury-brands-need-film.html`), you can also use that exact same root-relative syntax:

```html
<img src="/assets/images/leather-craft.jpg" alt="Macro detail framing" loading="lazy">

```

*(No need for `../assets`—the root `/` will work universally across every page and folder).*


### How to Drop In Your Real Headshot / On-Set Photo Later:
When you have the authentic photo of yourself on set or operating the rig ready:
Save it in your root directory as omar-greene.jpg `(or in assets/images/omar-greene.webp)`.
Simply change the src to omar-greene.jpg:
```HTML
<img
    src="omar-greene.jpg"
    alt="Omar A. Greene on location — Northzero Productions"
    loading="lazy"
    decoding="async"
    width="360"
    height="500"
>
```
The updated block above will load cleanly immediately—no broken image icon, no failed script callbacks, and with the architectural cove lighting active.
