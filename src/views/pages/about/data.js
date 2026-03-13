export const heroData = {
  slides: [
    {
      image: '/assets/about/hero.jpeg',
      title: 'about.hero.title',
      titleHighlight: 'about.hero.titleHighlight',
      description: 'about.hero.description',
      objectPosition: 'center 30%'
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
      titleKey: 'about.timeline.started.title',
      descriptionKey: 'about.timeline.started.description',
      image: '/assets/temp/placeholder.png'
    },
    {
      titleKey: 'about.timeline.experience.title',
      descriptionKey: 'about.timeline.experience.description',
      image: '/assets/temp/placeholder.png'
    },
    {
      titleKey: 'about.timeline.lftworks.title',
      descriptionKey: 'about.timeline.lftworks.description',
      image: '/assets/temp/placeholder.png'
    }
  ]
};

export const teamData = {
  headingKey: 'about.founders.heading',
  members: [
    {
      name: 'LFT-Works',
      roleKey: 'about.founders.engineer.role',
      quoteKey: 'about.founders.engineer.quote',
      avatar: '/assets/temp/placeholder.png',
      phone: '+31 (0)6 00 00 00 00',
      email: 'info@lft-works.nl'
    }
  ]
};
