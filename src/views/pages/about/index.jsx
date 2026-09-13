'use client';

// @mui
import Stack from '@mui/material/Stack';

// @project
import { OurStory1 } from '@/blocks/about';
import { HeroSlideshow } from '@/blocks/hero';
import { Team10 } from '@/blocks/team';

import useDataThemeMode from '@/hooks/useDataThemeMode';

// @data
// Note: `timelineData` and the TimeLine1 block ("Onze reis") are written but
// deliberately not rendered yet — same status as serviceProcessSteps.
import { heroData, ourStoryData, teamData } from './data';

/***************************  ABOUT PAGE  ***************************/

export default function AboutPage() {
  useDataThemeMode();

  // Every section is imported statically so the whole page is server-rendered.
  return (
    <Stack spacing={0}>
      <HeroSlideshow {...heroData} headingComponent="h1" />
      <OurStory1 {...ourStoryData} />
      <Team10 {...teamData} />
    </Stack>
  );
}
