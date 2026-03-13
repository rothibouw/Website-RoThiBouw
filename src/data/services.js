// Source of truth for all service data.
// Import from here in any file that needs service data.

export const services = [
  {
    slug: 'plc-software',
    titleKey: 'services.plcSoftware.title',
    icon: 'tabler-cpu',
    heroImage: '/assets/temp/placeholder.png',
    descriptionTitleKey: 'services.plcSoftware.descriptionTitle',
    descriptionKey: 'services.plcSoftware.description',
    descriptionImage: '/assets/temp/placeholder.png',
    features: [
      'services.plcSoftware.features.f1',
      'services.plcSoftware.features.f2',
      'services.plcSoftware.features.f3',
      'services.plcSoftware.features.f4',
      'services.plcSoftware.features.f5'
    ],
    featureImage: '/assets/temp/placeholder.png',
    relatedCategories: ['plc-software']
  },
  {
    slug: 'schakelkast-engineering',
    titleKey: 'services.schakelkastEngineering.title',
    icon: 'tabler-plug',
    heroImage: '/assets/temp/placeholder.png',
    descriptionTitleKey: 'services.schakelkastEngineering.descriptionTitle',
    descriptionKey: 'services.schakelkastEngineering.description',
    descriptionImage: '/assets/temp/placeholder.png',
    features: [
      'services.schakelkastEngineering.features.f1',
      'services.schakelkastEngineering.features.f2',
      'services.schakelkastEngineering.features.f3',
      'services.schakelkastEngineering.features.f4',
      'services.schakelkastEngineering.features.f5'
    ],
    featureImage: '/assets/temp/placeholder.png',
    relatedCategories: ['schakelkast-engineering']
  },
  {
    slug: 'elektrische-installatie',
    titleKey: 'services.elektrischeInstallatie.title',
    icon: 'tabler-bolt',
    heroImage: '/assets/temp/placeholder.png',
    descriptionTitleKey: 'services.elektrischeInstallatie.descriptionTitle',
    descriptionKey: 'services.elektrischeInstallatie.description',
    descriptionImage: '/assets/temp/placeholder.png',
    features: [
      'services.elektrischeInstallatie.features.f1',
      'services.elektrischeInstallatie.features.f2',
      'services.elektrischeInstallatie.features.f3',
      'services.elektrischeInstallatie.features.f4'
    ],
    featureImage: '/assets/temp/placeholder.png',
    relatedCategories: ['elektrische-installatie']
  },
  {
    slug: 'aandrijving-configuratie',
    titleKey: 'services.aandrijvingConfiguratie.title',
    icon: 'tabler-settings',
    heroImage: '/assets/temp/placeholder.png',
    descriptionTitleKey: 'services.aandrijvingConfiguratie.descriptionTitle',
    descriptionKey: 'services.aandrijvingConfiguratie.description',
    descriptionImage: '/assets/temp/placeholder.png',
    features: [
      'services.aandrijvingConfiguratie.features.f1',
      'services.aandrijvingConfiguratie.features.f2',
      'services.aandrijvingConfiguratie.features.f3',
      'services.aandrijvingConfiguratie.features.f4'
    ],
    featureImage: '/assets/temp/placeholder.png',
    relatedCategories: ['aandrijving-configuratie']
  },
  {
    slug: 'machine-upgrades',
    titleKey: 'services.machineUpgrades.title',
    icon: 'tabler-refresh',
    heroImage: '/assets/temp/placeholder.png',
    descriptionTitleKey: 'services.machineUpgrades.descriptionTitle',
    descriptionKey: 'services.machineUpgrades.description',
    descriptionImage: '/assets/temp/placeholder.png',
    features: [
      'services.machineUpgrades.features.f1',
      'services.machineUpgrades.features.f2',
      'services.machineUpgrades.features.f3',
      'services.machineUpgrades.features.f4'
    ],
    featureImage: '/assets/temp/placeholder.png',
    relatedCategories: ['machine-upgrades']
  },
  {
    slug: 'inbedrijfstelling',
    titleKey: 'services.inbedrijfstelling.title',
    icon: 'tabler-rocket',
    heroImage: '/assets/temp/placeholder.png',
    descriptionTitleKey: 'services.inbedrijfstelling.descriptionTitle',
    descriptionKey: 'services.inbedrijfstelling.description',
    descriptionImage: '/assets/temp/placeholder.png',
    features: [
      'services.inbedrijfstelling.features.f1',
      'services.inbedrijfstelling.features.f2',
      'services.inbedrijfstelling.features.f3',
      'services.inbedrijfstelling.features.f4'
    ],
    featureImage: '/assets/temp/placeholder.png',
    relatedCategories: ['inbedrijfstelling']
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
