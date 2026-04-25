# RoThi Bouw — Company Website

Official website for **RoThi Bouw**, a construction company based in Hooge Mierde, Noord-Brabant, active in the Eindhoven and Tilburg region.

Built with Next.js 15, React 18, and Material-UI v6. The site is bilingual (Dutch primary, English secondary) and targets homeowners looking for carpentry, roofing, renovation, and wood construction services.

## Tech Stack

- **Next.js 15** — App Router, static generation, server-side metadata
- **React 18** — UI components
- **Material-UI v6** + Emotion — component library and CSS-in-JS styling
- **Framer Motion** — animations
- **React Hook Form** — contact form
- **Resend** — contact form email delivery
- **Custom i18n** — Dutch/English translations via `useTranslation` hook

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Create a `.env.local` file:

```
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_METADATA_BASE=https://www.rothibouw.nl
```

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── (default)/        # Public pages with shared layout
│   │   ├── about/        # /about
│   │   ├── contact/      # /contact
│   │   ├── projects/     # /projects and /projects/[slug]
│   │   ├── services/     # /services/[slug]
│   │   ├── privacy-policy/
│   │   └── terms-conditions/
│   ├── api/contact/      # Contact form endpoint (Resend)
│   ├── api/apply/        # Application form endpoint
│   ├── robots.js         # robots.txt generation
│   └── sitemap.js        # sitemap.xml generation
├── blocks/               # Reusable page section components
├── components/           # Shared UI components
├── data/                 # Static content (services, projects)
├── i18n/                 # Translation files (en, nl)
├── views/                # Page compositions and layouts
├── branding.json         # Brand name, logo paths, social links
├── config.js             # Theme and language defaults
├── metadata.js           # Per-page SEO metadata
└── path.js               # Route constants (PAGE_PATH)
```

## Content Management

All display text lives in `src/i18n/translations/`. **Dutch is the leading language** — update `nl.js` first, then align `en.js`.

Service and project data is defined in `src/data/services.js` and `src/data/projects.js`. These files contain slugs, image paths, and translation key references — no raw text.

To add a new project: add an entry to `src/data/projects.js` and add the corresponding translation keys to both `nl.js` and `en.js`.

To add a new service: add an entry to `src/data/services.js`, add translation keys, and add service images to `public/assets/services/<slug>/`.

## Routes

| Path | Description |
|------|-------------|
| `/` | Homepage |
| `/about` | About RoThi Bouw |
| `/projects` | Project overview |
| `/projects/[slug]` | Project detail |
| `/services/[slug]` | Service detail |
| `/contact` | Contact page |

Old Dutch URLs redirect permanently to the English equivalents (configured in `next.config.mjs`).
