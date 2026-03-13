import { projects } from '@/data/projects';

export const heroSlides = [
  {
    image: '/assets/home/hero_1.jpg',
    titleKey: 'home.hero.slide1.title',
    descriptionKey: 'home.hero.slide1.description'
  }
  // {
  //   image: '/assets/home/image_2.jpg',
  //   titleKey: 'home.hero.slide2.title',
  //   descriptionKey: 'home.hero.slide2.description'
  // },
  // {
  //   image: '/assets/home/image_3.jpg',
  //   titleKey: 'home.hero.slide3.title',
  //   descriptionKey: 'home.hero.slide3.description'
  // }
];

export const servicesData = {
  headingKey: 'home.services.heading',
  headerAlign: 'center',
  list: [
    {
      icon: 'tabler-crane',
      titleKey: 'home.services.renovations.title',
      descriptionKey: 'home.services.renovations.description',
      link: {
        href: '/diensten/ver-en-aanbouwen',
        children: 'common.learnMore'
      }
    },
    {
      icon: 'tabler-home',
      titleKey: 'home.services.roofing.title',
      descriptionKey: 'home.services.roofing.description',
      link: {
        href: '/diensten/dakwerken',
        children: 'common.learnMore'
      }
    },
    {
      icon: 'tabler-hammer',
      titleKey: 'home.services.carpentry.title',
      descriptionKey: 'home.services.carpentry.description',
      link: {
        href: '/diensten/timmerwerk',
        children: 'common.learnMore'
      }
    },
    {
      icon: 'tabler-michelin-star-green',
      titleKey: 'home.services.sustainability.title',
      descriptionKey: 'home.services.sustainability.description',
      link: {
        href: '/diensten/verduurzaming',
        children: 'common.learnMore'
      }
    },
    {
      icon: 'tabler-wood',
      titleKey: 'home.services.woodConstructions.title',
      descriptionKey: 'home.services.woodConstructions.description',
      link: {
        href: '/diensten/hout-constructies',
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

export const projectsData = {
  headingKey: 'home.projects.heading',
  captionKey: 'home.projects.caption',
  projects: projects,
  showViewAll: true,
  viewAllBtnKey: 'home.viewAllProjects'
};

export const ctaData = {
  headingKey: 'home.cta.heading',
  primaryBtn: {
    children: 'home.cta.button',
    href: '/contact'
  }
};
