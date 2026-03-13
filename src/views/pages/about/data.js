export const heroData = {
  slides: [
    {
      image: '/assets/about/hero.jpeg',
      title: 'about.hero.title',
      titleHighlight: 'about.hero.titleHighlight',
      description: 'about.hero.description',
      objectPosition: 'center 30%' // Position image higher to show faces on larger screens
    }
  ],
  height: { xs: 400, sm: 500, md: 600 },
  showText: true
};

export const ourStoryData = {
  headingKey: 'about.story.heading',
  highlightKey: 'about.story.highlight',
  paragraphKeys: ['about.story.p1', 'about.story.p2', 'about.story.p3']
};

export const timelineData = {
  headingKey: 'about.timeline.heading',
  captionKey: 'about.timeline.caption',
  sections: [
    {
      titleKey: 'about.timeline.founded.title',
      descriptionKey: 'about.timeline.founded.description',
      image: '/assets/temp/placeholder.png'
    },
    {
      titleKey: 'about.timeline.office.title',
      descriptionKey: 'about.timeline.office.description',
      image: '/assets/temp/placeholder.png'
    },
    {
      titleKey: 'about.timeline.projects.title',
      descriptionKey: 'about.timeline.projects.description',
      image: '/assets/temp/placeholder.png'
    },
    {
      titleKey: 'about.timeline.certification.title',
      descriptionKey: 'about.timeline.certification.description',
      image: '/assets/temp/placeholder.png'
    }
  ]
};

export const teamData = {
  headingKey: 'about.founders.heading',
  members: [
    {
      name: 'Roy van Strijdhoven',
      roleKey: 'about.founders.roy.role',
      quoteKey: 'about.founders.roy.quote',
      avatar: '/assets/about/roy.jpeg',
      phone: '+31 (0)6 81 39 97 41',
      email: 'roy@rothibouw.nl'
      // linkedin: 'https://linkedin.com/in/roy-van-strijdhoven'
    },
    {
      name: 'Thijs van Gisbergen',
      roleKey: 'about.founders.thijs.role',
      quoteKey: 'about.founders.thijs.quote',
      avatar: '/assets/about/thijs.jpg',
      phone: '+31 (0)6 57 41 59 09',
      email: 'thijs@rothibouw.nl'
      // linkedin: 'https://linkedin.com/in/thijs-van-gisbergen'
    }
  ]
};
