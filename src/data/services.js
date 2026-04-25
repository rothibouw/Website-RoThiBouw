export const services = [
  {
    slug: 'renovations',
    titleKey: 'services.renovations.title',
    icon: 'tabler-paint',
    heroImage: '/assets/services/renovations/hero.jpeg',
    descriptionTitleKey: 'services.renovations.descriptionTitle',
    descriptionKey: 'services.renovations.description',
    descriptionImage: '/assets/services/renovations/description.jpeg',
    features: [
      'services.renovations.features.f1',
      'services.renovations.features.f2',
      'services.renovations.features.f3',
      'services.renovations.features.f4',
      'services.renovations.features.f5'
    ],
    featureImage: '/assets/services/renovations/feature.jpeg',
    relatedCategories: ['renovations']
  },
  {
    slug: 'roofing',
    titleKey: 'services.roofing.title',
    icon: 'tabler-home',
    heroImage: '/assets/services/roofing/hero.jpeg',
    descriptionTitleKey: 'services.roofing.descriptionTitle',
    descriptionKey: 'services.roofing.description',
    descriptionImage: '/assets/services/roofing/description.jpeg',
    features: [
      'services.roofing.features.f1',
      'services.roofing.features.f2',
      'services.roofing.features.f3',
      'services.roofing.features.f4',
      'services.roofing.features.f5',
      'services.roofing.features.f6'
    ],
    featureImage: '/assets/services/roofing/feature.jpeg',
    relatedCategories: ['roofing']
  },
  {
    slug: 'carpentry',
    titleKey: 'services.carpentry.title',
    icon: 'tabler-tool',
    heroImage: '/assets/services/carpentry/hero.jpeg',
    descriptionTitleKey: 'services.carpentry.descriptionTitle',
    descriptionKey: 'services.carpentry.description',
    descriptionImage: '/assets/services/carpentry/description.jpeg',
    features: ['services.carpentry.features.f1', 'services.carpentry.features.f2', 'services.carpentry.features.f3'],
    featureImage: '/assets/services/carpentry/feature.jpeg',
    relatedCategories: ['carpentry']
  },
  {
    slug: 'sustainability',
    titleKey: 'services.sustainability.title',
    icon: 'tabler-building',
    heroImage: '/assets/services/sustainability/hero.jpeg',
    descriptionTitleKey: 'services.sustainability.descriptionTitle',
    descriptionKey: 'services.sustainability.description',
    descriptionImage: '/assets/services/sustainability/description.jpeg',
    features: [
      'services.sustainability.features.f1',
      'services.sustainability.features.f2',
      'services.sustainability.features.f3',
      'services.sustainability.features.f4',
      'services.sustainability.features.f5'
    ],
    featureImage: '/assets/services/sustainability/feature.jpeg',
    relatedCategories: ['sustainability']
  },
  {
    slug: 'wood-construction',
    titleKey: 'services.woodConstruction.title',
    icon: 'tabler-wall',
    heroImage: '/assets/services/wood-construction/hero.jpeg',
    descriptionTitleKey: 'services.woodConstruction.descriptionTitle',
    descriptionKey: 'services.woodConstruction.description',
    descriptionImage: '/assets/services/wood-construction/description.jpeg',
    features: [
      'services.woodConstruction.features.f1',
      'services.woodConstruction.features.f2',
      'services.woodConstruction.features.f3',
      'services.woodConstruction.features.f4'
    ],
    featureImage: '/assets/services/wood-construction/feature.jpeg',
    relatedCategories: ['woodConstruction']
  }
];

export const serviceProcessSteps = {
  heading: 'services.process.heading',
  caption: 'services.process.caption',
  cards: [
    {
      number: '01',
      title: 'services.process.step1.title',
      description: 'services.process.step1.description'
    },
    {
      number: '02',
      title: 'services.process.step2.title',
      description: 'services.process.step2.description'
    },
    {
      number: '03',
      title: 'services.process.step3.title',
      description: 'services.process.step3.description'
    }
  ]
};

export const servicesNavigationData = {
  headingKey: 'services.navigation.heading',
  // captionKey: 'services.navigation.caption',
  list: services.map((service) => ({
    icon: service.icon,
    titleKey: service.titleKey,
    descriptionKey: service.descriptionTitleKey,
    link: {
      href: `/services/${service.slug}`,
      children: 'common.learnMore'
    }
  }))
};
