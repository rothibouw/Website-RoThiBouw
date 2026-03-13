// @project
import branding from '@/branding.json';

/***************************  SEO METADATA  ***************************/

// Shared OG defaults (used by all pages)
const ogCommon = {
  locale: 'nl_NL',
  type: 'website',
  siteName: branding.brandName,
  images: [
    {
      url: '/assets/og-image.jpg', // TODO: Create 1200x630 image with logo + project photo
      width: 1200,
      height: 630,
      alt: `${branding.brandName} — Industriele Automatisering & PLC Programmering`
    }
  ]
};

/***************************  MAIN LAYOUT  ***************************/

export const mainMetadata = {
  title: {
    template: `%s | ${branding.brandName}`,
    default: branding.brandName
  },
  description:
    'LFT-Works is gespecialiseerd in industriele automatisering, PLC programmering, schakelkast engineering en inbedrijfstelling. Uw partner voor betrouwbare automatiseringsoplossingen.',
  applicationName: branding.brandName,
  keywords: [
    'industriele automatisering',
    'PLC programmering',
    'schakelkast engineering',
    'inbedrijfstelling',
    'aandrijftechniek',
    'machine upgrades',
    'Siemens',
    'besturingstechniek',
    'elektrische installatie',
    'LFT-Works'
  ],
  creator: branding.company?.name || branding.brandName,
  metadataBase: new URL(process.env.NEXT_PUBLIC_METADATA_BASE || 'https://www.lft-works.nl'),
  alternates: {
    canonical: '/'
  },
  icons: {
    icon: [
      { url: '/assets/logo/light-lft.png', media: '(prefers-color-scheme: light)' },
      { url: '/assets/logo/light-lft.png', media: '(prefers-color-scheme: dark)' }
    ],
    apple: '/assets/logo/light-lft.png'
  },
  openGraph: {
    title: `${branding.brandName} — Industriele Automatisering & PLC Programmering`,
    description: 'Specialist in industriele automatisering, PLC software, schakelkast engineering en inbedrijfstelling.',
    url: '/',
    ...ogCommon
  }
};

/***************************  PER-PAGE METADATA  ***************************/

// ABOUT
export const aboutMetadata = {
  title: 'Over ons',
  description:
    'Maak kennis met LFT-Works: specialist in industriele automatisering met jarenlange ervaring in PLC programmering, besturingstechniek en inbedrijfstelling.',
  openGraph: {
    title: 'Over ons',
    description: 'Ervaren automatiseringsspecialist. Leer de engineer achter LFT-Works kennen.',
    url: '/over-ons',
    ...ogCommon
  }
};

// SERVICES — ready for when a /services index page is created
export const servicesMetadata = {
  title: 'Diensten',
  description:
    'LFT-Works biedt PLC programmering, schakelkast engineering, elektrische installatie, aandrijving configuratie, machine upgrades en inbedrijfstelling. Vraag vrijblijvend een offerte aan.',
  openGraph: {
    title: 'Onze diensten',
    description: 'PLC software, schakelkast engineering, inbedrijfstelling en meer. Bekijk wat LFT-Works voor u kan betekenen.',
    url: '/diensten',
    ...ogCommon
  }
};

// PROJECTS
export const projectsMetadata = {
  title: 'Projecten',
  description:
    "Bekijk onze afgeronde automatiseringsprojecten: PLC programma's, schakelkasten en machine upgrades voor diverse industrieen.",
  openGraph: {
    title: 'Projecten',
    description: 'Overzicht van afgeronde automatiseringsprojecten door LFT-Works.',
    url: '/projecten',
    ...ogCommon
  }
};

// CONTACT
export const contactMetadata = {
  title: 'Contact',
  description:
    'Neem contact op met LFT-Works voor een vrijblijvende offerte of meer informatie over industriele automatisering en PLC programmering.',
  openGraph: {
    title: 'Contact',
    description: 'Neem contact op voor een vrijblijvende offerte. Uw partner in industriele automatisering.',
    url: '/contact',
    ...ogCommon
  }
};

// PRIVACY POLICY
export const privacyPolicyMetadata = {
  title: 'Privacybeleid',
  description: 'Lees het privacybeleid van LFT-Works. Hoe wij omgaan met uw persoonsgegevens conform de AVG.',
  robots: {
    index: false,
    follow: true
  },
  openGraph: {
    title: 'Privacybeleid',
    description: 'Privacybeleid van LFT-Works.',
    url: '/privacy-policy',
    ...ogCommon
  }
};

// TERMS & CONDITIONS
export const termsConditionsMetadata = {
  title: 'Algemene voorwaarden',
  description: 'Bekijk de algemene voorwaarden van LFT-Works.',
  robots: {
    index: false,
    follow: true
  },
  openGraph: {
    title: 'Algemene voorwaarden',
    description: 'Algemene voorwaarden van LFT-Works.',
    url: '/terms-conditions',
    ...ogCommon
  }
};
