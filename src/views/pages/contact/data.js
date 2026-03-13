export const contactData = {
  headingKey: 'contact.heading',
  captionKey: 'contact.caption',
  list: [
    {
      icon: 'tabler-mail',
      titleKey: 'contact.emailCard.title',
      descriptionKey: 'contact.emailCard.content',
      link: {
        href: 'mailto:info@rothibouw.nl',
        children: 'contact.emailCard.buttonText'
      }
    },
    {
      icon: 'tabler-phone',
      titleKey: 'contact.phoneCard.title',
      descriptionKey: 'contact.phoneCard.content',
      link: [
        {
          href: 'tel:+31 (0)6 81 39 97 41',
          children: 'contact.phoneCard.roy'
        },
        {
          href: 'tel:+31 (0)6 57 41 5909',
          children: 'contact.phoneCard.thijs'
        }
      ]
    },
    {
      icon: 'tabler-brand-whatsapp',
      titleKey: 'contact.whatsappCard.title',
      descriptionKey: 'contact.whatsappCard.content',
      link: [
        {
          href: 'https://wa.me/31681399741',
          children: 'contact.whatsappCard.roy'
        },
        {
          href: 'https://wa.me/31657415909',
          children: 'contact.whatsappCard.thijs'
        }
      ]
    }
  ]
};
