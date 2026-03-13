export const contactData = {
  headingKey: 'contact.heading',
  captionKey: 'contact.caption',
  list: [
    {
      icon: 'tabler-mail',
      titleKey: 'contact.emailCard.title',
      descriptionKey: 'contact.emailCard.content',
      link: {
        href: 'mailto:info@lft-works.nl',
        children: 'contact.emailCard.buttonText'
      }
    },
    {
      icon: 'tabler-phone',
      titleKey: 'contact.phoneCard.title',
      descriptionKey: 'contact.phoneCard.content',
      link: {
        href: 'tel:+31600000000',
        children: 'contact.phoneCard.buttonText'
      }
    },
    {
      icon: 'tabler-brand-whatsapp',
      titleKey: 'contact.whatsappCard.title',
      descriptionKey: 'contact.whatsappCard.content',
      link: {
        href: 'https://wa.me/31600000000',
        children: 'contact.whatsappCard.buttonText'
      }
    }
  ]
};
