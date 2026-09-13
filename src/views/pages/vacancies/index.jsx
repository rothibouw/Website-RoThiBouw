'use client';

// @mui
import Stack from '@mui/material/Stack';

// @project
import { VacancyIntro1, VacancyList1 } from '@/blocks/vacancies';
import LazySection from '@/components/LazySection';
import useDataThemeMode from '@/hooks/useDataThemeMode';

// @data
import { activeVacancies, vacancyTypes } from '@/data/vacancies';

/***************************  VACANCIES OVERVIEW PAGE  ***************************/

export default function VacanciesPage() {
  useDataThemeMode();

  return (
    <Stack spacing={0}>
      {/* Intro carries the page h1 — both rendered eagerly so they are server-rendered */}
      <VacancyIntro1 />
      <VacancyList1 headingKey="vacancies.heading" captionKey="vacancies.caption" vacancies={activeVacancies} types={vacancyTypes} />
      <LazySection
        sections={{
          importFunc: () => import('@/blocks/vacancies').then((module) => ({ default: module.ApplySection1 })),
          props: { vacancies: activeVacancies }
        }}
        offset="200px"
      />
    </Stack>
  );
}
