export const heroSlides = [
  {
    image: '/assets/home/hero_1.jpg',
    titleKey: 'home.hero.slide1.title',
    descriptionKey: 'home.hero.slide1.description'
  }
];

export const servicesData = {
  headingKey: 'home.services.heading',
  headerAlign: 'center',
  list: [
    {
      icon: 'tabler-cpu',
      titleKey: 'home.services.plcSoftware.title',
      descriptionKey: 'home.services.plcSoftware.description',
      link: {
        href: '/diensten/plc-software',
        children: 'common.learnMore'
      }
    },
    {
      icon: 'tabler-plug',
      titleKey: 'home.services.schakelkastEngineering.title',
      descriptionKey: 'home.services.schakelkastEngineering.description',
      link: {
        href: '/diensten/schakelkast-engineering',
        children: 'common.learnMore'
      }
    },
    {
      icon: 'tabler-bolt',
      titleKey: 'home.services.elektrischeInstallatie.title',
      descriptionKey: 'home.services.elektrischeInstallatie.description',
      link: {
        href: '/diensten/elektrische-installatie',
        children: 'common.learnMore'
      }
    },
    {
      icon: 'tabler-settings',
      titleKey: 'home.services.aandrijvingConfiguratie.title',
      descriptionKey: 'home.services.aandrijvingConfiguratie.description',
      link: {
        href: '/diensten/aandrijving-configuratie',
        children: 'common.learnMore'
      }
    },
    {
      icon: 'tabler-refresh',
      titleKey: 'home.services.machineUpgrades.title',
      descriptionKey: 'home.services.machineUpgrades.description',
      link: {
        href: '/diensten/machine-upgrades',
        children: 'common.learnMore'
      }
    },
    {
      icon: 'tabler-rocket',
      titleKey: 'home.services.inbedrijfstelling.title',
      descriptionKey: 'home.services.inbedrijfstelling.description',
      link: {
        href: '/diensten/inbedrijfstelling',
        children: 'common.learnMore'
      }
    }
  ]
};

export const aboutTeaserData = {
  headingKey: 'home.aboutTeaser.heading',
  highlightKey: 'home.aboutTeaser.highlight',
  captionKey: 'home.aboutTeaser.caption',
  image: '/assets/home/about.jpeg',
  primaryBtn: {
    href: '/over-ons',
    children: 'home.aboutTeaser.button'
  }
};

export const processData = {
  heading: 'home.process.heading',
  caption: 'home.process.caption',
  cards: [
    {
      title: 'home.process.step1.title',
      description: 'home.process.step1.description',
      icon: 'tabler-search',
      image: '/assets/temp/placeholder.png'
    },
    {
      title: 'home.process.step2.title',
      description: 'home.process.step2.description',
      icon: 'tabler-pencil',
      image: '/assets/temp/placeholder.png'
    },
    {
      title: 'home.process.step3.title',
      description: 'home.process.step3.description',
      icon: 'tabler-code',
      image: '/assets/temp/placeholder.png'
    },
    {
      title: 'home.process.step4.title',
      description: 'home.process.step4.description',
      icon: 'tabler-rocket',
      image: '/assets/temp/placeholder.png'
    }
  ]
};

export const clienteleData = {
  titleKey: 'home.clientele.title',
  clienteleList: [
    { image: '/assets/temp/placeholder.png', sx: { height: 40 } },
    { image: '/assets/temp/placeholder.png', sx: { height: 40 } },
    { image: '/assets/temp/placeholder.png', sx: { height: 40 } },
    { image: '/assets/temp/placeholder.png', sx: { height: 40 } },
    { image: '/assets/temp/placeholder.png', sx: { height: 40 } }
  ]
};

export const ctaData = {
  headingKey: 'home.cta.heading',
  primaryBtn: {
    children: 'home.cta.button',
    href: '/contact'
  }
};
