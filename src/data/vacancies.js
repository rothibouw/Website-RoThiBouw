/***************************  DATA - VACANCIES  ***************************/

// Slugs and identifiers are English; all display text lives in the translation
// files under `vacancies.items.*`. Set `isActive: false` to take a vacancy
// offline without deleting it — inactive entries drop out of the overview, the
// apply form's position list and the sitemap, and their detail page 404s.

// Set to true to publish the careers section: it then enters the sitemap, drops
// the noindex tag and the navbar link appears. Until RoThi confirms they want it
// public the pages stay reachable by direct URL only.
export const VACANCIES_PUBLISHED = false;

export const vacancies = [
  {
    id: 'vacancy-1',
    slug: 'timmerman',
    type: 'executive',
    isActive: true,
    location: 'Hooge Mierde',
    titleKey: 'vacancies.items.vacancy1.title',
    descriptionKey: 'vacancies.items.vacancy1.description',
    introKey: 'vacancies.items.vacancy1.intro',
    hoursKey: 'vacancies.items.vacancy1.hours',
    contractKey: 'vacancies.items.vacancy1.contract',
    taskKeys: [
      'vacancies.items.vacancy1.tasks.task1',
      'vacancies.items.vacancy1.tasks.task2',
      'vacancies.items.vacancy1.tasks.task3',
      'vacancies.items.vacancy1.tasks.task4',
      'vacancies.items.vacancy1.tasks.task5',
      'vacancies.items.vacancy1.tasks.task6'
    ],
    requirementKeys: [
      'vacancies.items.vacancy1.requirements.req1',
      'vacancies.items.vacancy1.requirements.req2',
      'vacancies.items.vacancy1.requirements.req3',
      'vacancies.items.vacancy1.requirements.req4',
      'vacancies.items.vacancy1.requirements.req5'
    ],
    offerKeys: [
      'vacancies.items.vacancy1.offer.item1',
      'vacancies.items.vacancy1.offer.item2',
      'vacancies.items.vacancy1.offer.item3',
      'vacancies.items.vacancy1.offer.item4',
      'vacancies.items.vacancy1.offer.item5'
    ]
  }
];

// Filter chips on the overview page
export const vacancyTypes = [
  { value: 'all', labelKey: 'vacancies.types.all' },
  { value: 'executive', labelKey: 'vacancies.types.executive' },
  { value: 'office', labelKey: 'vacancies.types.office' }
];

export const activeVacancies = vacancies.filter((vacancy) => vacancy.isActive);
