# AdFah Tech Website

A responsive, single-page React website for **AdFah Tech**, built with Vite and styled with custom CSS.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

Deploy the generated `dist/` directory to a static host such as Netlify, Vercel, Cloudflare Pages, or your preferred web host.

## Business details used

- Phone: `09028149646`
- WhatsApp: `https://wa.me/2349028149646`
- Email: `aadamsalihu34@gmail.com`
- Location: `Maiduguri, Borno State, Nigeria`

Shared business details, navigation, services, portfolio categories, and testimonial placeholders are in `src/data.js`.

## Supplied portrait

The supplied Cloudinary portrait is preserved as the remote fallback URL in `src/data.js`. A locally optimized WebP version is loaded first from `public/images/adfah-tech.webp` for performance. If both sources fail, an accessible fallback panel is displayed.

## Contact form behavior

No form backend or third-party form delivery service is configured. The form validates the required fields, then opens WhatsApp with a pre-filled enquiry. It clearly tells visitors that they must tap **Send** in WhatsApp; it never claims that a message was delivered automatically. No submission is stored by this website.

To enable direct website delivery later, connect `src/components/ContactForm.jsx` to a secure server-side endpoint or a supported form service, add spam protection and rate limiting, and update the visible form notice and privacy policy.

## Updating portfolio and testimonials

- Edit `PROJECT_CATEGORIES` in `src/data.js` to replace example categories with verified projects. Remove the concept-preview disclosures only when genuine project content is shown.
- Edit `TESTIMONIAL_PLACEHOLDERS` in `src/data.js` with genuine feedback supplied with client permission. Remove placeholder labels only for verified reviews.
- No social links are included because no official social profile URLs were supplied.

## Main files

- `src/App.jsx` — page sections and reusable content cards
- `src/components/` — navigation, portrait, contact form, carousel, logo, and legal dialogs
- `src/styles.css` — responsive design system and component styling
- `src/data.js` — business details and editable site content
- `index.html` — SEO metadata and structured business information
