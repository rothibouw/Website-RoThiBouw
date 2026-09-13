'use client';

// @mui
import Stack from '@mui/material/Stack';

// @project
import { ApplySection1, VacancyIntro1, VacancyList1 } from '@/blocks/vacancies';
import useDataThemeMode from '@/hooks/useDataThemeMode';

// @data
import { activeVacancies, vacancyTypes } from '@/data/vacancies';

/***************************  VACANCIES OVERVIEW PAGE  ***************************/

export default function VacanciesPage() {
  useDataThemeMode();

  return (
    <Stack spacing={0}>
      <VacancyIntro1 />
      <VacancyList1 headingKey="vacancies.heading" captionKey="vacancies.caption" vacancies={activeVacancies} types={vacancyTypes} />
      <ApplySection1 vacancies={activeVacancies} />
    </Stack>
  );
}
