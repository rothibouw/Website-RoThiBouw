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
              icon: 'tabler-cpu',
              title: t('services.plcSoftware.title'),
              link: '/diensten/plc-software'
            },
            {
              icon: 'tabler-plug',
              title: t('services.schakelkastEngineering.title'),
              link: '/diensten/schakelkast-engineering'
            },
            {
              icon: 'tabler-bolt',
              title: t('services.elektrischeInstallatie.title'),
              link: '/diensten/elektrische-installatie'
            },
            {
              icon: 'tabler-settings',
              title: t('services.aandrijvingConfiguratie.title'),
              link: '/diensten/aandrijving-configuratie'
            },
            {
              icon: 'tabler-refresh',
              title: t('services.machineUpgrades.title'),
              link: '/diensten/machine-upgrades'
            },
            {
              icon: 'tabler-rocket',
              title: t('services.inbedrijfstelling.title'),
              link: '/diensten/inbedrijfstelling'
            }
          ]
        }
      },
      {
        id: 'about',
        title: t('nav.about'),
        link: '/over-ons'
      },
      {
        id: 'projects',
        title: t('nav.projects'),
        link: '/projecten'
      },
      {
        id: 'contact',
        title: t('nav.contact'),
        link: '/contact'
      }
    ]
  };
};
