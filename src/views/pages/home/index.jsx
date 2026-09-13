'use client';

// @mui
import Stack from '@mui/material/Stack';

// @project
import { About4 } from '@/blocks/about';
import { ContactUs3 } from '@/blocks/contact-us';
import { Cta1 } from '@/blocks/cta';
import { HeroSlideshow } from '@/blocks/hero';
import { SpotlightProjects1 } from '@/blocks/projects';

import useDataThemeMode from '@/hooks/useDataThemeMode';

// @data
import { heroSlides, servicesData, aboutTeaserData, spotlightData, ctaData } from './data';

/***************************  HOME PAGE  ***************************/

export default function HomePage() {
  useDataThemeMode();

  // Every section is imported statically so the whole page is server-rendered.
  return (
    <Stack spacing={0}>
      <HeroSlideshow slides={heroSlides} height={{ xs: 400, sm: 500, md: 600 }} showText headingComponent="h1" />
      <ContactUs3 {...servicesData} />
      <About4 {...aboutTeaserData} />
      <SpotlightProjects1 {...spotlightData} />
      <Cta1 {...ctaData} />
    </Stack>
  );
}
