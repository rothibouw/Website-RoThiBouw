'use client';

// @mui
import Stack from '@mui/material/Stack';

// @project
import { HeroSlideshow } from '@/blocks/hero';
import LazySection from '@/components/LazySection';

import useDataThemeMode from '@/hooks/useDataThemeMode';

// @data
import { heroSlides, servicesData, aboutTeaserData, spotlightData, ctaData } from './data';

/***************************  HOME PAGE  ***************************/

export default function HomePage() {
  useDataThemeMode();

  return (
    <Stack spacing={0}>
      {/* Statically imported so the hero — and the page's h1 — is server-rendered */}
      <HeroSlideshow slides={heroSlides} height={{ xs: 400, sm: 500, md: 600 }} showText headingComponent="h1" />
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
            importFunc: () => import('@/blocks/projects').then((module) => ({ default: module.SpotlightProjects1 })),
            props: spotlightData
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
