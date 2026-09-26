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
