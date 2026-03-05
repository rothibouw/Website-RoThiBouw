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
  heading: 'home.services.heading',
  headerAlign: 'center',
  list: [
    {
      icon: 'tabler-crane',
      title: 'home.services.renovations.title',
      content: 'home.services.renovations.description',
      link: {
        href: '/services/renovaties',
        children: 'common.learnMore'
      }
    },
    {
      icon: 'tabler-home',
      title: 'home.services.roofing.title',
      content: 'home.services.roofing.description',
      link: {
        href: '/services/dakwerken',
        children: 'common.learnMore'
      }
    },
    {
      icon: 'tabler-hammer',
      title: 'home.services.carpentry.title',
      content: 'home.services.carpentry.description',
      link: {
        href: '/services/timmerwerk',
        children: 'common.learnMore'
      }
    },
    {
      icon: 'tabler-michelin-star-green',
      title: 'home.services.sustainability.title',
      content: 'home.services.sustainability.description',
      link: {
        href: '/services/verduurzaming',
        children: 'common.learnMore'
      }
    },
    {
      icon: 'tabler-wood',
      title: 'home.services.woodConstructions.title',
      content: 'home.services.woodConstructions.description',
      link: {
        href: '/services/houtConstructies',
        children: 'common.learnMore'
      }
    }
  ]
};

export const aboutTeaserData = {
  headingKey: 'home.aboutTeaser.heading',
  highlightKey: 'home.aboutTeaser.highlight',
  captionKey: 'home.aboutTeaser.caption',
  image: '/assets/temp/placeholder.png',
  primaryBtn: {
    href: '/about',
    children: 'home.aboutTeaser.button'
  }
};

export const projectsData = {
  heading: 'home.projects.heading',
  caption: 'home.projects.caption',
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
