// @project
import useTranslation from '@/hooks/useTranslation';

import { MegaMenuType } from '@/enum';

/***************************  NAVBAR - DATA  ***************************/

export const useNavbarData = () => {
  const { t } = useTranslation();

  return {
    navItems: [
      {
        id: 'home',
        title: t('nav.home', 'Home'),
        link: '/'
      },
      {
        id: 'services',
        title: t('nav.services', 'Services'),
        megaMenu: {
          type: MegaMenuType.MEGAMENU2,
          toggleBtn: { children: t('nav.services', 'Services'), size: 'small', sx: { color: 'text.primary', py: 1.5 } },
          menuItems: [
            {
              icon: 'tabler-crane',
              title: t('projects.categories.renovaties'),
              link: '/services/renovaties'
            },
            {
              icon: 'tabler-home',
              title: t('projects.categories.dakwerken'),
              link: '/services/dakwerken'
            },
            {
              icon: 'tabler-hammer',
              title: t('projects.categories.timmerwerk'),
              link: '/services/timmerwerk'
            },
            {
              icon: 'tabler-michelin-star-green',
              title: t('projects.categories.verduurzaming'),
              link: '/services/verduurzaming'
            },
            {
              icon: 'tabler-wood',
              title: t('projects.categories.houtConstructies'),
              link: '/services/houtConstructies'
            }
          ]
        }
      },
      {
        id: 'about',
        title: t('nav.about'),
        link: '/about'
      },
      {
        id: 'projects',
        title: t('nav.projects'),
        link: '/projects'
      },
      {
        id: 'contact',
        title: t('nav.contact'),
        link: '/contact'
      }
    ]
  };
};
