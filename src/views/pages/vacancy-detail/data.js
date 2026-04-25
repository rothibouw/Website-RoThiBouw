import { vacancies } from '@/data/vacancies';

export const createVacancyDetailSections = (vacancy) => {
  if (!vacancy) return [];

  return [
    {
      importFunc: () => import('@/blocks/vacancies').then((m) => ({ default: m.VacancyHeader1 })),
      props: {
        titleKey: vacancy.titleKey,
        introKey: vacancy.introKey,
        type: vacancy.type,
        location: vacancy.location,
        hoursKey: vacancy.hoursKey,
        contractKey: vacancy.contractKey
      }
    },
    {
      importFunc: () => import('@/blocks/vacancies').then((m) => ({ default: m.VacancyDetail1 })),
      props: {
        tasksKeys: vacancy.tasksKeys,
        requirementsKeys: vacancy.requirementsKeys,
        offerKeys: vacancy.offerKeys
      }
    },
    {
      importFunc: () => import('@/blocks/vacancies').then((m) => ({ default: m.VacancyApply1 })),
      props: {
        headingKey: 'vacancies.applyForm.heading',
        captionKey: 'vacancies.applyForm.caption',
        vacancies,
        defaultPosition: vacancy.slug
      }
    }
  ];
};
