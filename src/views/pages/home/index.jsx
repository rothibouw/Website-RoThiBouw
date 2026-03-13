'use client';

// @mui
import Stack from '@mui/material/Stack';

// @project
import { HeroSlideshow } from '@/blocks/hero';
import LazySection from '@/components/LazySection';

import useDataThemeMode from '@/hooks/useDataThemeMode';
import useTranslation from '@/hooks/useTranslation';

// @data
import { heroSlides, servicesData, aboutTeaserData, processData, clienteleData, ctaData } from './data';

/***************************  HOME PAGE  ***************************/

export default function HomePage() {
  useDataThemeMode();
  const { t } = useTranslation();

  // Prepare slides with translated text
  const slides = heroSlides.map((slide) => ({
    image: slide.image,
    title: t(slide.titleKey),
    description: t(slide.descriptionKey)
  }));

  // Translate process data for Process4
  const translatedProcessData = {
    heading: t(processData.heading),
    caption: t(processData.caption),
    cards: processData.cards.map((card) => ({
      ...card,
      title: t(card.title),
      description: t(card.description)
    }))
  };

  // Translate clientele title
  const translatedClienteleData = {
    title: t(clienteleData.titleKey),
    clienteleList: clienteleData.clienteleList
  };

  return (
    <Stack spacing={0}>
      <HeroSlideshow slides={slides} height={{ xs: 400, sm: 500, md: 600 }} showText={true} />
      <LazySection
        sections={[
          {
            importFunc: () => import('@/blocks/contact-us').then((module) => ({ default: module.ContactUs3 })),
            props: servicesData
          },
          {
            importFunc: () => import('@/blocks/about').then((module) => ({ default: module.About4 })),
            props: aboutTeaserData
          },
          {
            importFunc: () => import('@/blocks/process').then((module) => ({ default: module.Process4 })),
            props: translatedProcessData
          },
          {
            importFunc: () => import('@/blocks/clientele').then((module) => ({ default: module.Clientele2 })),
            props: translatedClienteleData
          },
          {
            importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta1 })),
            props: ctaData
          }
        ]}
        offset="200px"
      />
    </Stack>
  );
}
