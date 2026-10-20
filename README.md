# Acumen Interiors — static website

Next.js (App Router) + CSS Modules, exported as a **fully static site**.

## Pages
| Route | Status |
|---|---|
| `/` Home | Complete |
| `/services/` | Complete |
| `/about/` | Temporary placeholder |
| `/portfolio/` | Temporary placeholder |
| `/contact/` | Temporary placeholder |

Placeholder pages use `components/common/TempSection.tsx` — replace it with real sections when ready.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # writes the static site to ./out
```
Upload the contents of `out/` to any static host (Netlify, Vercel, Hostinger/cPanel, S3, GitHub Pages…).

## Notes
- Images are loaded online (Unsplash) — see `src/data/images.ts`. `images.unoptimized` is on because static export has no image server.
- Site text, nav, phone, address live in `src/data/content.ts`.
- Styles: global tokens in `src/app/globals.css`, per-component CSS Modules in `src/styles/components/`.
- Forms (enquiry modal, newsletter) are front-end only. Connect them to a form service (Formspree, Web3Forms, Google Apps Script…) — there is a `TODO` in each file.
