// Source of truth for all service data.
// Import from here in any file that needs service data.

export const services = [
  {
    slug: 'ver-en-aanbouwen',
    titleKey: 'services.renovaties.title',
    icon: 'tabler-paint',
    heroImage: '/assets/services/ver-en-aanbouw/hero.jpeg',
    descriptionTitleKey: 'services.renovaties.descriptionTitle',
    descriptionKey: 'services.renovaties.description',
    descriptionImage: '/assets/temp/placeholder.png',
    features: [
      'services.renovaties.features.f1',
      'services.renovaties.features.f2',
      'services.renovaties.features.f3',
      'services.renovaties.features.f4',
      'services.renovaties.features.f5'
    ],
    featureImage: '/assets/temp/placeholder.png',
    relatedCategories: ['renovaties']
  },
  {
    slug: 'dakwerken',
    titleKey: 'services.dakwerken.title',
    icon: 'tabler-home',
    heroImage: '/assets/services/dakwerken/hero.jpeg',
    descriptionTitleKey: 'services.dakwerken.descriptionTitle',
    descriptionKey: 'services.dakwerken.description',
    descriptionImage: '/assets/services/dakwerken/description.jpeg',
    features: [
      'services.dakwerken.features.f1',
      'services.dakwerken.features.f2',
      'services.dakwerken.features.f3',
      'services.dakwerken.features.f4',
      'services.dakwerken.features.f5',
      'services.dakwerken.features.f6'
    ],
    featureImage: '/assets/services/dakwerken/feature.jpeg',
    relatedCategories: ['dakwerken']
  },
  {
    slug: 'timmerwerk',
    titleKey: 'services.timmerwerk.title',
    icon: 'tabler-tool',
    heroImage: '/assets/services/timmerwerk/hero.jpeg',
    descriptionTitleKey: 'services.timmerwerk.descriptionTitle',
    descriptionKey: 'services.timmerwerk.description',
    descriptionImage: '/assets/services/timmerwerk/description.jpeg',
    features: ['services.timmerwerk.features.f1', 'services.timmerwerk.features.f2', 'services.timmerwerk.features.f3'],
    featureImage: '/assets/services/timmerwerk/feature.jpeg',
    relatedCategories: ['timmerwerk']
  },
  {
    slug: 'verduurzaming',
    titleKey: 'services.verduurzaming.title',
    icon: 'tabler-building',
    heroImage: '/assets/services/verduurzaming/hero.jpeg',
    descriptionTitleKey: 'services.verduurzaming.descriptionTitle',
    descriptionKey: 'services.verduurzaming.description',
    descriptionImage: '/assets/services/verduurzaming/description.jpeg',
    features: [
      'services.verduurzaming.features.f1',
      'services.verduurzaming.features.f2',
      'services.verduurzaming.features.f3',
      'services.verduurzaming.features.f4',
      'services.verduurzaming.features.f5'
    ],
    featureImage: '/assets/services/verduurzaming/feature.jpeg',
    relatedCategories: ['verduurzaming']
  },
  {
    slug: 'hout-constructies',
    titleKey: 'services.houtConstructies.title',
    icon: 'tabler-wall',
    heroImage: '/assets/services/hout-constructies/hero.jpeg',
    descriptionTitleKey: 'services.houtConstructies.descriptionTitle',
    descriptionKey: 'services.houtConstructies.description',
    descriptionImage: '/assets/services/hout-constructies/description.jpeg',
    features: [
      'services.houtConstructies.features.f1',
      'services.houtConstructies.features.f2',
      'services.houtConstructies.features.f3',
      'services.houtConstructies.features.f4'
    ],
    featureImage: '/assets/services/hout-constructies/feature.jpeg',
    relatedCategories: ['houtConstructies']
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
      href: `/diensten/${service.slug}`,
      children: 'common.learnMore'
    }
  }))
};
