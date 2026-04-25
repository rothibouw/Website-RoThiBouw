# Architecture & Development Guide

This document defines the rules, patterns, and conventions for this project.
It is the authoritative reference for creating new pages, blocks, and components,
and for refactoring existing template code into the correct architecture.

---

## Table of Contents

1. [Mental Model — Four Layers](#1-mental-model--four-layers)
2. [File & Folder Conventions](#2-file--folder-conventions)
3. [Layer 1 — App Route](#3-layer-1--app-route)
4. [Layer 2 — View Page](#4-layer-2--view-page)
5. [Layer 3 — Block](#5-layer-3--block)
6. [Layer 4 — Component](#6-layer-4--component)
7. [Block vs Component Decision Rule](#7-block-vs-component-decision-rule)
8. [Data Layer](#8-data-layer)
9. [i18n Rules](#9-i18n-rules)
10. [Lazy Loading](#10-lazy-loading)
11. [Design Tokens](#11-design-tokens)
12. [Shared Design Components Reference](#12-shared-design-components-reference)
13. [Dynamic Pages (slug routes)](#13-dynamic-pages-slug-routes)
14. [How to Create a New Static Page](#14-how-to-create-a-new-static-page)
15. [How to Create a New Block](#15-how-to-create-a-new-block)
16. [How to Create a New Component](#16-how-to-create-a-new-component)
17. [How to Convert a Template Block](#17-how-to-convert-a-template-block)
18. [Architectural Rules — Complete List](#18-architectural-rules--complete-list)
19. [Known Violations to Avoid](#19-known-violations-to-avoid)

---

## 1. Mental Model — Four Layers

Every piece of UI belongs to exactly one layer. The layers nest strictly top-down.

```
App Route        src/app/(default)/{page}/page.jsx
     ↓  dynamic import
View Page        src/views/pages/{page}/index.jsx
     ↓  LazySection
Block            src/blocks/{type}/{BlockN}.jsx
     ↓  direct render
Component        src/components/{name}.jsx
```

| Layer | Responsibility | Has layout/padding? | Translates? | Has state? |
|---|---|---|---|---|
| App Route | Next.js routing, metadata, static params | No | No | No |
| View Page | Composes blocks into a page | No | Minimal* | No** |
| Block | One full-width page section | Yes — owns its own padding | Yes — always | Allowed |
| Component | Reusable UI element | No | Yes | Allowed |

\* View pages only call `t()` when a section requires a pre-translated string before the block exists (e.g. hero slides). Everything else stays as keys.

\*\* View pages have no UI state. Exception: dynamic pages receive a data prop from the app route.

---

## 2. File & Folder Conventions

### Folder structure

```
src/
  app/
    (default)/
      {page}/
        page.jsx          ← App Route (server component unless marked 'use client')
      {dynamic}/
        [slug]/
          page.jsx        ← Dynamic App Route
      layout.jsx
  views/
    pages/
      {page}/
        index.jsx         ← View Page ('use client')
        data.js           ← Page data (pure JS, no React imports)
        sections.js       ← Sections factory for dynamic pages (pure JS, no React imports)
  blocks/
    {type}/
      {TypeN}.jsx         ← Block ('use client')
      index.js            ← Named exports only
  components/
    {name}.jsx            ← Component
    cards/
      {Name}Card.jsx
  data/
    projects.js           ← Source of truth for all project data
    services.js           ← Source of truth for all service data
  hooks/
  i18n/
    translations/
      en.js
      nl.js
    index.js
  utils/
    constant.js           ← SECTION_COMMON_PY, BORDER_RADIUS, etc.
```

### Naming rules

- **Blocks**: PascalCase, numbered if multiple variants exist. `Team1.jsx`, `ContactUs3.jsx`, `Cta1.jsx`
- **Components**: PascalCase, descriptive. `ProjectCard.jsx`, `GraphicsCard.jsx`, `Typeset.jsx`
- **View pages**: `index.jsx` always (imported by app routes via dynamic import)
- **Data files**: `data.js` for static data, `sections.js` for section factories
- **Block index files**: `index.js` with named exports only — no default exports

### Block index file format

```js
// src/blocks/team/index.js
export { default as Team1 } from './Team1';
export { default as Team2 } from './Team2';
```

---

## 3. Layer 1 — App Route

**Location:** `src/app/(default)/{page}/page.jsx`

**Rules:**
- Server component by default (no `'use client'`)
- Dynamically imports the View Page using `next/dynamic`
- Defines `export const metadata` for static pages
- Defines `export async function generateMetadata` and `export async function generateStaticParams` for dynamic routes
- Contains no JSX other than rendering the View Page component
- For dynamic routes: resolves the slug, finds the data object, passes it as a prop, calls `notFound()` if not found

### Static page app route template

```jsx
// src/app/(default)/about/page.jsx
import dynamic from 'next/dynamic';

const AboutPage = dynamic(() => import('@/views/pages/about'));

export const metadata = {
  title: 'About Us'
};

export default function About() {
  return <AboutPage />;
}
```

### Dynamic page app route template

```jsx
// src/app/(default)/projects/[slug]/page.jsx
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';

const ProjectDetailPage = dynamic(() => import('@/views/pages/project-detail'));

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Not Found' };
  return { title: /* derive title from project */ };
}

export default async function ProjectDetailRoute({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return <ProjectDetailPage project={project} />;
}
```

---

## 4. Layer 2 — View Page

**Location:** `src/views/pages/{page}/index.jsx`

**Rules:**
- Always starts with `'use client'`
- Always calls `useDataThemeMode()` as the first line of the component body
- Contains **no JSX block markup** — no `ContainerWrapper`, `Typeset`, `MotionWrapper`, etc.
- Renders exclusively `<LazySection>`, `<Stack>`, or the `HeroSlideshow` block directly (hero is the only block that may be rendered outside LazySection)
- Imports data from `./data` only (never from other pages' data files directly)
- Calls `useTranslation()` only when it must pre-translate strings before blocks exist (hero slides case); for all other sections passes raw keys
- For dynamic pages: receives a single data prop from the app route and calls a sections factory

### Static page view template

```jsx
'use client';

// @project
import LazySection from '@/components/LazySection';
import useDataThemeMode from '@/hooks/useDataThemeMode';

// @data
import { teamData, storyData } from './data';

export default function AboutPage() {
  useDataThemeMode();

  return (
    <LazySection
      sections={[
        { importFunc: () => import('@/blocks/team').then((m) => ({ default: m.Team1 })), props: teamData },
        { importFunc: () => import('@/blocks/timeline').then((m) => ({ default: m.TimeLine1 })), props: storyData }
      ]}
      offset="200px"
    />
  );
}
```

### Page with hero (hero is always outside LazySection)

```jsx
'use client';

// @mui
import Stack from '@mui/material/Stack';

// @project
import { HeroSlideshow } from '@/blocks/hero';
import LazySection from '@/components/LazySection';
import useDataThemeMode from '@/hooks/useDataThemeMode';
import useTranslation from '@/hooks/useTranslation';

// @data
import { heroSlides, servicesData } from './data';

export default function HomePage() {
  useDataThemeMode();
  const { t } = useTranslation();

  // Hero requires pre-translated strings because HeroSlideshow accepts text, not keys
  const slides = heroSlides.map((slide) => ({
    image: slide.image,
    title: t(slide.titleKey),
    description: t(slide.descriptionKey)
  }));

  return (
    <Stack spacing={0}>
      <HeroSlideshow slides={slides} height={{ xs: 400, sm: 500, md: 600 }} showText={true} />
      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/contact-us').then((m) => ({ default: m.ContactUs3 })), props: servicesData }
        ]}
        offset="200px"
      />
    </Stack>
  );
}
```

### Dynamic page view template

```jsx
'use client';
import PropTypes from 'prop-types';

// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import LazySection from '@/components/LazySection';
import ContainerWrapper from '@/components/ContainerWrapper';
import useDataThemeMode from '@/hooks/useDataThemeMode';
import useTranslation from '@/hooks/useTranslation';
import { SECTION_COMMON_PY } from '@/utils/constant';

// @sections
import { createDetailSections } from './sections';

export default function DetailPage({ item }) {
  useDataThemeMode();
  const { t } = useTranslation();

  if (!item) {
    return (
      <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
        <Typography variant="h4">{t('common.notFound')}</Typography>
      </ContainerWrapper>
    );
  }

  const sections = createDetailSections(item);

  return (
    <Stack spacing={0}>
      <LazySection sections={sections} offset="200px" />
    </Stack>
  );
}

DetailPage.propTypes = {
  item: PropTypes.shape({
    // define shape matching the data object
  })
};
```

---

## 5. Layer 3 — Block

**Location:** `src/blocks/{type}/{TypeN}.jsx`

**Rules:**
- Always starts with `'use client'`
- Always wraps its entire output in `<ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>`
- Always calls `const { t } = useTranslation()` — the block is responsible for all translation
- Receives i18n **keys** as props — never pre-translated strings (except `HeroSlideshow` which receives text)
- Handles internal routing itself — imports `NextLink` when needed, never requires callers to pass it
- Wraps animatable content in `<MotionWrapper>` with appropriate variant
- Defines `PropTypes` once and once only at the bottom of the file
- Is exported from the block type's `index.js` as a named export

### Block anatomy

```jsx
'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link'; // only if this block has navigation

// @mui
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import MotionWrapper from '@/components/MotionWrapper';
import Typeset from '@/components/Typeset';
import useTranslation from '@/hooks/useTranslation';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  {TYPE} - {N}  ***************************/

export default function TypeN({ headingKey, captionKey, items }) {
  const { t } = useTranslation();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack spacing={{ xs: 3, sm: 4 }}>
        <MotionWrapper>
          <Typeset
            heading={t(headingKey)}
            caption={t(captionKey)}
            stackProps={{ sx: { textAlign: 'center', alignItems: 'center' } }}
          />
        </MotionWrapper>

        {/* section content */}
      </Stack>
    </ContainerWrapper>
  );
}

TypeN.propTypes = {
  headingKey: PropTypes.string,
  captionKey: PropTypes.string,
  items: PropTypes.array
};
```

### Block prop naming conventions

| Prop name | Meaning |
|---|---|
| `headingKey` | i18n key for the section heading |
| `captionKey` | i18n key for the subtitle/caption |
| `highlightKey` | i18n key for a highlighted/coloured word within a heading (rendered in `primary.main`) |
| `heading` | i18n key for heading (used when template block uses this name — treat identically) |
| `caption` | i18n key for caption (same as above) |
| `primaryBtn` | Object `{ children: 'i18n.key', href: '/path' }` — block adds `component={NextLink}` |
| `reverse` | Boolean to flip a two-column layout |
| `items` / `list` | Array of data objects |
| `featureKeys` | Array of i18n key strings for a bullet list (block calls `t()` on each) |
| `paragraphKeys` | Array of i18n key strings for sequential body paragraphs (block maps `t()` over them) |
| `image` | String path to a static image asset |

**Critical:** Props named `heading`, `caption`, `title`, `content`, `children` on buttons, and any `*Key` props **all receive i18n key strings**. The block calls `t()` on all of them.

---

## 6. Layer 4 — Component

**Location:** `src/components/{name}.jsx` or `src/components/{category}/{Name}.jsx`

**Rules:**
- No `ContainerWrapper`
- No `SECTION_COMMON_PY` (no section-level padding)
- May call `useTranslation()` if it displays text
- May call `useTheme()` for theme values
- May import `NextLink` for navigation
- May maintain its own state
- Exported as a default export; may additionally be re-exported from a group index

### Component anatomy

```jsx
'use client';
import PropTypes from 'prop-types';

// @next
import Image from 'next/image';

// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// @project
import useTranslation from '@/hooks/useTranslation';

/***************************  {NAME}  ***************************/

export default function ExampleCard({ titleKey, image }) {
  const { t } = useTranslation();

  return (
    <Box>
      <Image src={image} alt={t(titleKey)} fill />
      <Typography variant="h4">{t(titleKey)}</Typography>
    </Box>
  );
}

ExampleCard.propTypes = {
  titleKey: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};
```

---

## 7. Block vs Component Decision Rule

Ask these questions in order:

**Q1: Does this UI element represent a full-width page section with its own vertical padding?**
→ Yes → It is a **Block**. Put it in `src/blocks/{type}/`.

**Q2: Is this UI element reused inside multiple different blocks?**
→ Yes → It is a **Component**. Put it in `src/components/`.

**Q3: Does this UI element appear only once, inside a single block?**
→ Yes → It is an internal sub-component. Define it as a private function inside the block file (like `ContactCard` inside `ContactUs3.jsx`), or extract to `src/components/` if it grows large.

### Examples

| Element | Layer | Reason |
|---|---|---|
| Team section with heading, grid of cards | Block (`Team1`) | Full-width section, owns its padding |
| Individual team member card | Component (`ProfileCard1`) | Used inside `Team1`, no section padding |
| Services overview cards | Block (`ContactUs4`) | Full-width section |
| Single info card inside that section | Private sub-component (`ContactCard` in `ContactUs4.jsx`) | Only used in one block, kept in same file |
| Project grid with category filter | Block (`Project2`) | Full-width section |
| Single project card | Component (`ProjectCard`) | Used in `Project1` and `Project2` |
| Specs + description panel | **Block** (`ProjectSpecsDescription`) with `ContainerWrapper` | Used as a standalone page section |

---

## 8. Data Layer

### Source of truth

Shared entities (projects, services) that are referenced from multiple places live in `src/data/`:

```
src/data/
  projects.js    ← export const projects = [...]
  services.js    ← export const services = [...], export const servicesNavigationData = {...}
```

Page-specific `data.js` files import from `src/data/` and add display configuration:

```js
// src/views/pages/home/data.js
import { projects } from '@/data/projects';

export const projectsData = {
  heading: 'home.projects.heading',
  caption: 'home.projects.caption',
  projects: projects.slice(0, 3),
  showViewAll: true,
  viewAllBtnKey: 'home.viewAllProjects'
};
```

### Data file rules

- **No React imports** of any kind (`NextLink`, components, hooks)
- **No `t()` calls** — only store key strings
- No runtime logic that depends on browser/React context
- Factory functions (sections builders) are allowed, provided they contain no React imports and no `t()` calls
- Static data only: arrays, objects, strings, numbers, booleans

### Section factory functions (`sections.js`)

For dynamic pages, the section array is built by a factory function. This file is named `sections.js` to distinguish it from pure data:

```js
// src/views/pages/service-detail/sections.js
import { projects } from '@/data/projects';
import { servicesNavigationData } from '@/data/services';

// NO: import NextLink from 'next/link'   ← forbidden
// NO: const results = features.map(f => t(f))  ← forbidden

export const createServiceDetailSections = (service) => {
  if (!service) return [];

  return [
    {
      importFunc: () => import('@/blocks/hero').then((m) => ({ default: m.HeroSlideshow })),
      props: {
        slides: [{ image: service.heroImage, titleKey: service.titleKey }],
        height: { xs: 300, sm: 400, md: 500 },
        showText: true
      }
    },
    {
      importFunc: () => import('@/blocks/service').then((m) => ({ default: m.ServiceDescription })),
      props: {
        titleKey: service.descriptionTitleKey,
        descriptionKey: service.descriptionKey,
        image: service.descriptionImage
      }
    }
    // ...more sections
  ];
};
```

The view page calls `createServiceDetailSections(service)` and passes the result to `<LazySection>`. It does **not** pass `t` as an argument.

### Data field naming convention

| Field | Type | Meaning |
|---|---|---|
| `titleKey` | `string` | i18n key → block calls `t(titleKey)` |
| `headingKey` | `string` | i18n key → block calls `t(headingKey)` |
| `captionKey` | `string` | i18n key → block calls `t(captionKey)` |
| `descriptionKey` | `string` | i18n key → block calls `t(descriptionKey)` |
| `featureKeys` | `string[]` | Array of i18n keys → block maps `t()` over them |
| `label` | `string` | Plain display string, no translation needed |
| `labelKey` | `string` | i18n key for a label → block calls `t(labelKey)` |
| `value` | `string` | Plain display value, no translation needed |
| `valueKey` | `string` | i18n key for a value → block calls `t(valueKey)` |
| `children` on button | `string` | i18n key → block calls `t(primaryBtn.children)` |
| `href` | `string` | URL path, never translated |
| `slug` | `string` | URL segment, never translated |
| `image` | `string` | Asset path, never translated |
| `icon` | `string` | Icon name (tabler-*), never translated |

**Rule:** If a value will be displayed as text and should change per language, it ends in `Key` and holds an i18n key string. If it is a technical identifier (URL, icon name, image path, numeric value), it does not end in `Key` and holds the value directly.

---

## 9. i18n Rules

### How translation works

Translation uses a custom `useTranslation()` hook:

```js
const { t, language } = useTranslation();
```

`t('path.to.key')` resolves the dot-notation key against the active language's translation object. If the key is not found, `t()` returns the key string itself (safe fallback, never crashes).

### Translation file structure

Located at `src/i18n/translations/en.js` and `nl.js`. Both files export a `translations` object:

```js
export const translations = {
  common: { learnMore: '...', readMore: '...', notFound: '...' },
  nav: { home: '...', about: '...', projects: '...', contact: '...' },
  home: {
    hero: { slide1: { title: '...', description: '...' } },
    services: { heading: '...', caption: '...' },
    projects: { heading: '...', caption: '...' }
  },
  about: { team: { heading: '...', caption: '...' } },
  services: {
    roofing: {
      title: '...',
      description: '...',
      features: { f1: '...', f2: '...' }
    }
  },
  projects: {
    heading: '...', caption: '...',
    items: {
      project1: { title: '...', subtitle: '...', shortDescription: '...', description: '...' }
    }
  }
};
```

### Dutch is the leading language

Dutch (`nl.js`) is the **primary language** for this site. When adding or updating translations:

- Write the Dutch (`nl.js`) text first; it is the authoritative version
- The English (`en.js`) entry must follow the Dutch — if `nl.js` contains a `'...'` placeholder, `en.js` must also have `'...'`
- i18n **keys** are always English identifiers (e.g. `services.roofing.title`, `projects.categories.carpentry`) — only the **values** are language-specific

### i18n rules for keys

1. Every visible string must have an entry in **both** `nl.js` and `en.js`
2. i18n keys use dot notation with lowercase English segments: `'services.roofing.features.f1'`
3. Never store translated strings in data files — only store the key
4. Blocks and components call `t()` at render time — this ensures language switching works without page reload
5. The only exception: hero slides in `home/index.jsx` where `HeroSlideshow` requires pre-translated strings. This is a block-level contract, not a general pattern

### Adding a new translation key

1. Add the key and Dutch value to `src/i18n/translations/nl.js` (Dutch leads)
2. Add the same key and English value to `src/i18n/translations/en.js`
3. Use the key string in the data file
4. The block will call `t()` on it at render time

---

## 10. Lazy Loading

### How LazySection works

`LazySection` uses IntersectionObserver. It renders a placeholder box. When the box scrolls into the viewport (with configurable `offset` for pre-loading), it fires all `importFunc` calls simultaneously, waits for all to resolve, then renders all sections.

```jsx
<LazySection
  sections={[
    {
      importFunc: () => import('@/blocks/team').then((m) => ({ default: m.Team1 })),
      props: teamData
    },
    {
      importFunc: () => import('@/blocks/timeline').then((m) => ({ default: m.TimeLine1 })),
      props: storyData
    }
  ]}
  offset="200px"
/>
```

### LazySection rules

- All blocks below the fold must use `LazySection` — no direct renders
- `offset="200px"` is the standard value (pre-loads 200px before entering viewport)
- A single block can be passed as an object (not array) — `LazySection` handles both
- `LazySection` loads **all sections in the array at once** when the wrapper enters the viewport — they are not individually lazy
- The `HeroSlideshow` is the only block rendered outside `LazySection` (it is above-the-fold critical)

### importFunc syntax

Named exports (most blocks):
```js
importFunc: () => import('@/blocks/team').then((m) => ({ default: m.Team1 }))
```

Default export (when a block file has only one export):
```js
importFunc: () => import('@/views/pages/about')
// (default export of index.jsx is used directly)
```

---

## 11. Design Tokens

**`SECTION_COMMON_PY`** — standard vertical padding for all blocks:
```js
// src/utils/constant.js
export const SECTION_COMMON_PY = { xs: 4, sm: 5, md: 6 };
```
Used as: `<ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>`

**`BORDER_RADIUS`** — responsive border radius scale:
```js
export const BORDER_RADIUS = {
  xs: { xs: 6, sm: 8, md: 10 },   // small cards
  sm: { xs: 8, sm: 12, md: 14 },  // medium components
  md: { xs: 10, sm: 14, md: 16 }, // large sections
  lg: { xs: 12, sm: 16, md: 20 }  // hero sections
};
```
Used as: `<Box sx={{ borderRadius: BORDER_RADIUS.xs }}>`

**Custom breakpoints:**
```
xs: 0     sm: 768     md: 1024     lg: 1266     xl: 1440
```

**Standard responsive image height pattern:**
```js
height: { xs: 300, sm: 350, md: 400 }   // standard block image
height: { xs: 300, sm: 400, md: 500 }   // hero-type images
height: { xs: 350, sm: 450, md: 500 }   // project slideshow
```

**Standard responsive spacing within blocks:**
```js
spacing={{ xs: 3, sm: 4, md: 5 }}   // Grid/Stack spacing
gap: { xs: 3, sm: 4 }               // Stack gap
p: { xs: 2, sm: 3, md: 4 }         // card padding
p: { xs: 3, sm: 4, md: 5 }         // large card padding
```

---

## 12. Shared Design Components Reference

These are the foundational components used inside blocks. All are in `src/components/`.

### `ContainerWrapper`
Responsive max-width container. **Every block's outermost element.**
```jsx
<ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
  {/* block content */}
</ContainerWrapper>
```

### `MotionWrapper`
Framer Motion animation wrapper. Triggers on scroll-into-view (`once: true`).

| Prop | Values | Default | Effect |
|---|---|---|---|
| `variant` | `'fadeIn'` `'slideInFromSide'` `'slideInFromBottom'` `'scaleIn'` | `'fadeIn'` | Animation style |
| `direction` | `'left'` `'right'` | `'left'` | For `slideInFromSide` only |
| `delay` | number (seconds) | `0` | Stagger between elements |
| `duration` | number (seconds) | `0.4` | Animation speed |
| `animate` | boolean | `true` | Pass `false` to disable |

Stagger pattern for lists: `delay={0.2 + index * 0.1}`

```jsx
<MotionWrapper variant="slideInFromSide" direction="left" delay={0.2}>
  <Box>...</Box>
</MotionWrapper>
```

### `Typeset`
Standard section heading + caption pair.
```jsx
<Typeset
  heading={t(headingKey)}          // already-translated string
  caption={t(captionKey)}          // already-translated string
  stackProps={{ sx: { textAlign: 'center', alignItems: 'center' } }}
  headingProps={{ variant: 'h2' }} // default is h2; override for h1 (page title)
  captionProps={{ variant: 'body1' }}
/>
```

### `SvgIcon`
Icon renderer using tabler-icons:
```jsx
<SvgIcon name="tabler-check" size={20} color="primary.main" stroke={2} />
```

### `GraphicsCard`
Styled card with gradient border, used for info cards and CTA backgrounds:
```jsx
<GraphicsCard sx={{ height: 1 }}>
  <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
    {/* card content */}
  </Box>
</GraphicsCard>
```

### `ButtonAnimationWrapper`
Wraps a button to add hover animation:
```jsx
<ButtonAnimationWrapper>
  <Button component={NextLink} href="/contact" variant="contained">
    {t('common.learnMore')}
  </Button>
</ButtonAnimationWrapper>
```

### `GraphicsImage`
Responsive image container with `object-fit: cover`. Used for editorial/hero images inside blocks:
```jsx
<GraphicsImage
  image="/assets/services/roofing/hero.jpeg"
  sx={{ height: { xs: 300, sm: 400, md: 480 }, borderRadius: BORDER_RADIUS.xs, overflow: 'hidden' }}
/>
```
Accepts `image` (string path) and an `sx` prop for sizing and shape. The `overflow: 'hidden'` on the wrapper enforces the border radius.

### `ProjectCard`
Displays a project summary card with image carousel. Used in `Project1` and `Project2`:
```jsx
<ProjectCard project={project} index={index} />
```
Expects `project` shape: `{ slug, titleKey, descriptionKey, category, year, location, thumbnail, images? }`

---

## 13. Dynamic Pages (slug routes)

Dynamic pages follow a strict pattern across three files.

### File responsibilities

| File | Role |
|---|---|
| `src/app/(default)/{entity}/[slug]/page.jsx` | Server component: resolves slug → finds data → passes to view |
| `src/views/pages/{entity}-detail/index.jsx` | Client component: receives data prop, builds sections, renders LazySection |
| `src/views/pages/{entity}-detail/sections.js` | Pure JS: factory function that maps data object → LazySection config array |
| `src/data/{entities}.js` | Source of truth: the full entity array |

### Slug resolution

The app route imports from `src/data/` (not from a view's `data.js`), calls `generateStaticParams()` to pre-generate all slugs, and calls `notFound()` for missing slugs.

### Sections factory contract

```js
// sections.js
export const createEntityDetailSections = (entity) => {
  // entity is the full data object found by slug
  // Returns: Array<{ importFunc: () => Promise, props: Object }>
  // MUST NOT: import React, NextLink, or any UI library
  // MUST NOT: call t() or any translation function
  // MAY: import from src/data/ to access related entities
};
```

---

## 14. How to Create a New Static Page

**Example: a new "Team" page at `/team`**

### Step 1 — Create the view data file

```js
// src/views/pages/team/data.js
export const teamSectionData = {
  headingKey: 'team.heading',
  captionKey: 'team.caption',
  members: [
    { name: 'Roy van Strijdhoven', avatar: '/assets/team/roy.jpg', phone: 'tel:+31...' }
  ]
};
```

### Step 2 — Create the view page

```jsx
// src/views/pages/team/index.jsx
'use client';

import LazySection from '@/components/LazySection';
import useDataThemeMode from '@/hooks/useDataThemeMode';
import { teamSectionData } from './data';

export default function TeamPage() {
  useDataThemeMode();

  return (
    <LazySection
      sections={[
        { importFunc: () => import('@/blocks/team').then((m) => ({ default: m.Team1 })), props: teamSectionData }
      ]}
      offset="200px"
    />
  );
}
```

### Step 3 — Create the app route

```jsx
// src/app/(default)/team/page.jsx
import dynamic from 'next/dynamic';

const TeamPage = dynamic(() => import('@/views/pages/team'));

export const metadata = { title: 'Our Team' };

export default function Team() {
  return <TeamPage />;
}
```

### Step 4 — Add translation keys

Add to `src/i18n/translations/en.js` and `nl.js`:
```js
team: {
  heading: 'Meet Our Team',
  caption: 'The people behind RoThi Bouw'
}
```

### Step 5 — Add to navbar

Add the route to the navbar data configuration.

---

## 15. How to Create a New Block

**Example: a new `ServiceHighlight1` block**

### Step 1 — Create the block file

```jsx
// src/blocks/service/ServiceHighlight1.jsx
'use client';
import PropTypes from 'prop-types';

// @next
import Image from 'next/image';

// @mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import MotionWrapper from '@/components/MotionWrapper';
import Typeset from '@/components/Typeset';
import useTranslation from '@/hooks/useTranslation';
import { SECTION_COMMON_PY, BORDER_RADIUS } from '@/utils/constant';

/***************************  SERVICE - HIGHLIGHT 1  ***************************/

export default function ServiceHighlight1({ headingKey, captionKey, image, featureKeys }) {
  const { t } = useTranslation();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
        <Grid size={{ xs: 12, md: 6 }}>
          <MotionWrapper variant="slideInFromSide" direction="left">
            <Typeset
              heading={t(headingKey)}
              caption={t(captionKey)}
            />
            <Stack component="ul" spacing={1} sx={{ mt: 2, pl: 0, listStyle: 'none' }}>
              {featureKeys.map((key, index) => (
                <Box component="li" key={index}>
                  <Typography variant="body1">{t(key)}</Typography>
                </Box>
              ))}
            </Stack>
          </MotionWrapper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <MotionWrapper variant="slideInFromSide" direction="right" delay={0.2}>
            <Box sx={{ position: 'relative', height: { xs: 300, sm: 350, md: 400 }, borderRadius: BORDER_RADIUS.xs, overflow: 'hidden' }}>
              <Image src={image} alt={t(headingKey)} fill style={{ objectFit: 'cover' }} />
            </Box>
          </MotionWrapper>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

ServiceHighlight1.propTypes = {
  headingKey: PropTypes.string.isRequired,
  captionKey: PropTypes.string,
  image: PropTypes.string.isRequired,
  featureKeys: PropTypes.arrayOf(PropTypes.string).isRequired
};
```

### Step 2 — Export from the block index

```js
// src/blocks/service/index.js
export { default as ServiceDescription } from './ServiceDescription';
export { default as ServiceFeatureList } from './ServiceFeatureList';
export { default as ServiceHighlight1 } from './ServiceHighlight1'; // ← add this
```

### Step 3 — Use in a sections factory or view page

```js
// In sections.js or data.js
{
  importFunc: () => import('@/blocks/service').then((m) => ({ default: m.ServiceHighlight1 })),
  props: {
    headingKey: 'services.highlight.heading',
    captionKey: 'services.highlight.caption',
    image: '/assets/services/highlight.jpg',
    featureKeys: [
      'services.highlight.features.f1',
      'services.highlight.features.f2',
      'services.highlight.features.f3'
    ]
  }
}
```

### Step 4 — Add translation keys

Add all keys to both `en.js` and `nl.js`.

---

## 16. How to Create a New Component

**Example: a `ServiceBadge` component**

Components do not need an app route or data file. They are created directly and imported into blocks.

```jsx
// src/components/ServiceBadge.jsx
'use client';
import PropTypes from 'prop-types';

// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// @project
import SvgIcon from '@/components/SvgIcon';
import useTranslation from '@/hooks/useTranslation';

/***************************  SERVICE BADGE  ***************************/

export default function ServiceBadge({ icon, labelKey }) {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1.5, borderRadius: 2, bgcolor: 'grey.100' }}>
      <SvgIcon name={icon} size={20} color="primary.main" />
      <Typography variant="body2" fontWeight={600}>{t(labelKey)}</Typography>
    </Box>
  );
}

ServiceBadge.propTypes = {
  icon: PropTypes.string.isRequired,
  labelKey: PropTypes.string.isRequired
};
```

Then use it inside a block:
```jsx
// inside a block file
import ServiceBadge from '@/components/ServiceBadge';
// ...
{services.map((s) => <ServiceBadge key={s.slug} icon={s.icon} labelKey={s.titleKey} />)}
```

---

## 17. How to Convert a Template Block

When converting a block from the original purchased template into the project's architecture:

### Step 1 — Identify which layer it belongs to

If it wraps in its own container and represents a full page section → it is a **Block**.
If it is a card, icon element, or sub-element → it is a **Component**.

### Step 2 — Verify or add `ContainerWrapper + SECTION_COMMON_PY`

Every block must have:
```jsx
<ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
```
If the template block uses a different container or hardcodes padding, replace it.

### Step 3 — Replace hardcoded strings with i18n keys

The template often uses hardcoded strings. Convert:
```jsx
// ❌ Template original
<Typography>Our Services</Typography>

// ✅ Converted
const { t } = useTranslation();
<Typography>{t(headingKey)}</Typography>
```

### Step 4 — Remove any data that was hardcoded in the block

Template blocks often contain their own data arrays. Move all data to `data.js` or `src/data/`. The block receives data as props.

### Step 5 — Remove any inline `t()` pre-computation

If the block was called with pre-translated strings (from an old data file that ran `t()`), change it to receive keys and call `t()` internally.

### Step 6 — Replace `component={NextLink}` passed from outside

If the caller was passing `component: NextLink` in props, remove that from the data. Add `NextLink` import and `component={NextLink}` inside the block itself (with a check for `href` existence, same pattern as `ContactCard`).

### Step 7 — Register the export

Add the block to `src/blocks/{type}/index.js`.

---

## 18. Architectural Rules — Complete List

### Page layer rules
- `'use client'` always present
- `useDataThemeMode()` always called first in component body
- No block markup: no `ContainerWrapper`, `MotionWrapper`, `Typeset`, `Grid`, `Stack` for layout
- `LazySection` is the only way to render blocks (except `HeroSlideshow`)
- `useTranslation()` called only for hero slide pre-translation
- No cross-page data imports: page data imports only from `./data` or `@/data/`
- Dynamic pages: receive single data prop, call sections factory, render `LazySection`

### Block layer rules
- `'use client'` always present
- `ContainerWrapper` with `SECTION_COMMON_PY` is always the outermost element
- `useTranslation()` always called — block is always responsible for translation
- All text props are i18n keys — never pre-translated strings
- `NextLink` imported inside the block when navigation is needed — never received as a prop
- `MotionWrapper` used for animations — never import Framer Motion directly
- Single `PropTypes` declaration, at the bottom of the file
- Exported as named export from `index.js` in the block type directory

### Component layer rules
- No `ContainerWrapper`
- No `SECTION_COMMON_PY` or section-level padding
- May call `useTranslation()`, `useTheme()`, maintain state
- Default export

### Data layer rules
- No React imports of any kind
- No `t()` calls — only store key strings
- No cross-page imports (pages import from `@/data/`, not from each other's `data.js`)
- `label` = plain value (no translation); `labelKey` = i18n key (must be in both translation files)
- `value` = plain value; `valueKey` = i18n key
- `children` on button objects = i18n key

### i18n rules
- **Dutch is the leading language** — write `nl.js` first; `en.js` follows the same placeholder state
- Every displayed string has an entry in both `nl.js` and `en.js`
- i18n keys are always English identifiers; only values are language-specific
- Key missing → `t()` returns the key string (safe, but add the key)
- Never call `t()` in data files or sections factories
- `t()` is called at render time in blocks and components

### Lazy loading rules
- All below-the-fold blocks must go through `LazySection`
- Standard offset: `"200px"`
- Hero is the only above-the-fold exception

---

## 19. Known Violations to Avoid

These are mistakes that have appeared in this codebase. Do not repeat them.

### 1. Importing React components in data/sections files

```js
// ❌ Wrong — data file with React import
import NextLink from 'next/link';
export const createSections = (service, t) => {
  return [{ props: { component: NextLink } }];
};

// ✅ Correct — block handles its own routing
// In sections.js: props: { href: '/contact', children: 'services.cta.button' }
// In Cta1.jsx: <Button {...(primaryBtn.href && { component: NextLink })} />
```

### 2. Calling `t()` in a data/sections file

```js
// ❌ Wrong — translation in data
const translatedFeatures = service.features.map((key) => t(key));
// props: { features: translatedFeatures }  // pre-translated strings

// ✅ Correct — pass keys, translate in block
// props: { featureKeys: service.features }  // keys
// In ServiceFeatureList.jsx: {featureKeys.map((key) => <li>{t(key)}</li>)}
```

### 3. Rendering block markup directly in a page view

```jsx
// ❌ Wrong — UI in page view
export default function ProjectDetailPage({ project }) {
  return (
    <Stack>
      <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
        <Typeset heading={t(project.titleKey)} />
      </ContainerWrapper>
      <LazySection sections={sections} />
    </Stack>
  );
}

// ✅ Correct — put the title section in a block, add it as first section
// In sections.js: sections.push({ importFunc: ProjectHeader, props: { titleKey: project.titleKey } })
```

### 4. Block without `ContainerWrapper`

```jsx
// ❌ Wrong — block with bare Grid, no section container
export default function ProjectSpecsDescription({ specifications }) {
  return (
    <Grid container spacing={3}>
      {/* content */}
    </Grid>
  );
}

// ✅ Correct — always wrap
export default function ProjectSpecsDescription({ specifications }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={3}>
        {/* content */}
      </Grid>
    </ContainerWrapper>
  );
}
```

### 5. Rendering a block directly in a page without LazySection

```jsx
// ❌ Wrong — direct render, no lazy loading
export default function ProjectsPage() {
  return <Project2 heading="projects.heading" projects={projects} />;
}

// ✅ Correct — always use LazySection
export default function ProjectsPage() {
  return (
    <LazySection
      sections={{
        importFunc: () => import('@/blocks/projects').then((m) => ({ default: m.Project2 })),
        props: { heading: 'projects.heading', projects, categories: projectCategories }
      }}
      offset="200px"
    />
  );
}
```

### 6. Duplicate PropTypes declarations

```jsx
// ❌ Wrong — declared twice (second silently overrides first)
MyComponent.propTypes = { ... };
MyComponent.propTypes = { ... };

// ✅ Correct — one declaration only
MyComponent.propTypes = { ... };
```

### 7. Using `labelKey` for a plain (untranslated) value

```js
// ❌ Wrong — 'Location' is not an i18n key
{ icon: 'tabler-map-pin', labelKey: 'Location', value: 'Amsterdam' }

// ✅ Correct — use label: for plain values
{ icon: 'tabler-map-pin', label: 'Location', value: 'Amsterdam' }

// ✅ Also correct — if it should be translated
{ icon: 'tabler-map-pin', labelKey: 'projects.info.location', value: 'Amsterdam' }
// and add 'projects.info.location' to both en.js and nl.js
```

### 8. Passing `t` as an argument to a sections factory

```js
// ❌ Wrong — factory should not translate
const sections = createServiceDetailSections(service, t);

// ✅ Correct — factory receives only data, no translation function
const sections = createServiceDetailSections(service);
```

### 9. Cross-page data imports (page importing from another page's data.js)

```js
// ❌ Wrong — home/data.js importing from another page's data file
import { projects } from '../projects/data';

// ✅ Correct — import from the shared source of truth
import { projects } from '@/data/projects';
```
