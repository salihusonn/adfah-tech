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

The contact form is connected to the Formspree endpoint `https://formspree.io/f/mqppeegq`, stored in `src/data.js`. It validates the required fields and sends a JSON POST request to Formspree. A success confirmation is shown only after Formspree returns a successful response.

The form includes disabled/loading, success, server-error, network-error, and timeout states. If submission fails, the website clearly says the message was not sent and offers a pre-filled WhatsApp fallback. The form and privacy notice explain that submissions are processed by Formspree.

Ensure the form is activated and email notifications are configured in the Formspree dashboard. Manage Formspree spam protection, submission retention, and notification settings in that account. No test submissions are included in the project.

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
