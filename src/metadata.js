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
      alt: `${branding.brandName} — Timmerbedrijf in Reusel, Noord-Brabant`
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
    'RoThi Bouw is een timmerbedrijf uit Reusel, actief in de regio Eindhoven en Tilburg. Gespecialiseerd in nieuwbouw, verbouwingen, dakwerk en afbouw. Vraag vrijblijvend een offerte aan.',
  applicationName: branding.brandName,
  keywords: [
    'timmerbedrijf',
    'timmerman',
    'aannemer',
    'Reusel',
    'Eindhoven',
    'Tilburg',
    'Noord-Brabant',
    'nieuwbouw',
    'verbouwing',
    'dakwerk',
    'afbouw',
    'renovatie',
    'houtbouw',
    'kozijnen'
  ],
  creator: branding.company?.name || branding.brandName,
  metadataBase: new URL(process.env.NEXT_PUBLIC_METADATA_BASE || 'https://www.rothibouw.nl'),
  alternates: {
    canonical: '/'
  },
  icons: {
    icon: [
      { url: '/assets/logo/light.png', media: '(prefers-color-scheme: light)' },
      { url: '/assets/logo/dark.png', media: '(prefers-color-scheme: dark)' }
    ],
    apple: '/assets/logo/light.png'
  },
  openGraph: {
    title: `${branding.brandName} — Timmerbedrijf Reusel | Nieuwbouw, Verbouwingen & Dakwerk`,
    description: 'Timmerbedrijf uit Reusel, actief in de regio Eindhoven en Tilburg. Nieuwbouw, verbouwingen, dakwerk en afbouw.',
    url: '/',
    ...ogCommon
  }
};

/***************************  PER-PAGE METADATA  ***************************/

// ABOUT
export const aboutMetadata = {
  title: 'Over ons',
  description:
    'Maak kennis met RoThi Bouw: een timmerbedrijf uit Reusel met vakmanschap en persoonlijke aanpak. Lees meer over ons team, onze werkwijze en waar we voor staan.',
  openGraph: {
    title: 'Over ons',
    description: 'Vakmanschap en persoonlijke aanpak. Leer het team achter RoThi Bouw kennen.',
    url: '/over-ons',
    ...ogCommon
  }
};

// SERVICES — ready for when a /services index page is created
export const servicesMetadata = {
  title: 'Diensten',
  description:
    'RoThi Bouw biedt nieuwbouw, verbouwingen, dakwerk en afbouw in de regio Reusel, Eindhoven en Tilburg. Bekijk onze diensten en vraag een vrijblijvende offerte aan.',
  openGraph: {
    title: 'Onze diensten',
    description: 'Nieuwbouw, verbouwingen, dakwerk en afbouw in Noord-Brabant. Bekijk wat wij voor u kunnen betekenen.',
    url: '/diensten',
    ...ogCommon
  }
};

// PROJECTS
export const projectsMetadata = {
  title: 'Projecten',
  description:
    "Bekijk onze afgeronde projecten: nieuwbouw, verbouwingen en renovaties in de regio Reusel, Eindhoven en Tilburg. Foto's en beschrijvingen van ons vakwerk.",
  openGraph: {
    title: 'Projecten',
    description: "Foto's en beschrijvingen van afgeronde bouwprojecten door RoThi Bouw.",
    url: '/projecten',
    ...ogCommon
  }
};

// CONTACT
export const contactMetadata = {
  title: 'Contact',
  description:
    'Neem contact op met RoThi Bouw voor een vrijblijvende offerte of meer informatie. Wij zijn gevestigd in Reusel en actief in de regio Eindhoven en Tilburg.',
  openGraph: {
    title: 'Contact',
    description: 'Neem contact op voor een vrijblijvende offerte. Gevestigd in Reusel, actief in heel Noord-Brabant.',
    url: '/contact',
    ...ogCommon
  }
};

// PRIVACY POLICY
export const privacyPolicyMetadata = {
  title: 'Privacybeleid',
  description: 'Lees het privacybeleid van RoThi Bouw. Hoe wij omgaan met uw persoonsgegevens conform de AVG.',
  robots: {
    index: false,
    follow: true
  },
  openGraph: {
    title: 'Privacybeleid',
    description: 'Privacybeleid van RoThi Bouw Timmerbedrijf.',
    url: '/privacy-policy',
    ...ogCommon
  }
};

// TERMS & CONDITIONS
export const termsConditionsMetadata = {
  title: 'Algemene voorwaarden',
  description: 'Bekijk de algemene voorwaarden van RoThi Bouw Timmerbedrijf.',
  robots: {
    index: false,
    follow: true
  },
  openGraph: {
    title: 'Algemene voorwaarden',
    description: 'Algemene voorwaarden van RoThi Bouw Timmerbedrijf.',
    url: '/terms-conditions',
    ...ogCommon
  }
};
