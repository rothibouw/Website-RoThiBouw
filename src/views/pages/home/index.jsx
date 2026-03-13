'use client';

// @mui
import Stack from '@mui/material/Stack';

// @project
import { HeroSlideshow } from '@/blocks/hero';
import LazySection from '@/components/LazySection';

import useDataThemeMode from '@/hooks/useDataThemeMode';
import useTranslation from '@/hooks/useTranslation';

// @data
import { heroSlides, servicesData, aboutTeaserData, projectsData, ctaData } from './data';

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
            importFunc: () => import('@/blocks/projects').then((module) => ({ default: module.Project1 })),
            props: projectsData
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
