// =============================================================================
// JSON-LD Structured Data — RoThi Bouw
// =============================================================================
// Place this in your root layout.jsx inside <head> or as a <script> tag.
//
// This tells Google explicitly: "This is a local construction/carpentry business
// based in Reusel, serving the Eindhoven/Tilburg region." It helps you appear
// in Google Maps results and the local 3-pack (the map box that shows up when
// someone searches "aanemers- timmerbedrijf bij mij in de buurt").
// =============================================================================

export function LocalBusinessJsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'RoThi Bouw',
    description: 'Timmerbedrijf gespecialiseerd in nieuwbouw, verbouwingen, dakwerk en afbouw in de regio Reusel, Eindhoven en Tilburg.',
    url: 'https://www.rothibouw.nl',
    logo: 'https://www.rothibouw.nl/assets/logo/light.png',

    // -- Location --
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Leendestraat 28',
      addressLocality: 'Hooge Mierde',
      addressRegion: 'Noord-Brabant',
      postalCode: '5095 BE',
      addressCountry: 'NL'
    },

    // -- Contact --
    telephone: '+31681399741',
    email: 'info@rothibouw.nl',

    // -- Coordinates (for Google Maps) --
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.3715,
      longitude: 5.2031
    },

    // -- Service area --
    areaServed: [
      {
        '@type': 'City',
        name: 'Reusel',
        containedInPlace: { '@type': 'AdministrativeArea', name: 'Noord-Brabant' }
      },
      {
        '@type': 'City',
        name: 'Eindhoven',
        containedInPlace: { '@type': 'AdministrativeArea', name: 'Noord-Brabant' }
      },
      {
        '@type': 'City',
        name: 'Tilburg',
        containedInPlace: { '@type': 'AdministrativeArea', name: 'Noord-Brabant' }
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Noord-Brabant'
      }
    ],

    // -- Services offered --
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Diensten',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Nieuwbouw', description: 'Nieuwbouwprojecten voor particulier en zakelijk' }
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Verbouwingen', description: 'Renovatie en verbouwing van woningen en bedrijfspanden' }
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Dakwerk', description: 'Dakreparatie, dakvernieuwing en dakisolatie' }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Afbouw & afwerking',
            description: 'Binnenwanden, plafonds, kozijnen en ander afbouwwerk'
          }
        }
      ]
    },

    // -- Business details --
    foundingDate: '2023',
    priceRange: '$$', // General indicator
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Bankoverschrijving',

    // -- Opening hours --
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '17:00'
      }
    ],

    // -- Social / profiles --
    sameAs: []
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />;
}
