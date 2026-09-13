'use client';

// @mui
import Stack from '@mui/material/Stack';

// @project
import { VacancyList1 } from '@/blocks/vacancies';
import LazySection from '@/components/LazySection';
import useDataThemeMode from '@/hooks/useDataThemeMode';

// @data
import { activeVacancies, vacancyTypes } from '@/data/vacancies';

/***************************  VACANCIES OVERVIEW PAGE  ***************************/

export default function VacanciesPage() {
  useDataThemeMode();

  return (
    <Stack spacing={0}>
      {/* Carries the page h1 — rendered eagerly so it is server-rendered */}
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
