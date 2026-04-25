'use client';

// @project
import LazySection from '@/components/LazySection';
import useDataThemeMode from '@/hooks/useDataThemeMode';

// @data
import { vacanciesIntroData, vacanciesListData, vacanciesApplyData } from './data';

/***************************  VACANCIES PAGE  ***************************/

export default function VacanciesPage() {
  useDataThemeMode();

  return (
    <LazySection
      sections={[
        {
          importFunc: () => import('@/blocks/about').then((m) => ({ default: m.About4 })),
          props: vacanciesIntroData
        },
        {
          importFunc: () => import('@/blocks/vacancies').then((m) => ({ default: m.Vacancies1 })),
          props: vacanciesListData
        },
        {
          importFunc: () => import('@/blocks/vacancies').then((m) => ({ default: m.VacancyApply1 })),
          props: vacanciesApplyData
        }
      ]}
      offset="200px"
    />
  );
}
