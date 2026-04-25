export const vacancies = [
  {
    id: 'vacancy-1',
    slug: 'timmerman',
    type: 'executive',
    titleKey: 'vacancies.items.vacancy1.title',
    descriptionKey: 'vacancies.items.vacancy1.description',
    introKey: 'vacancies.items.vacancy1.intro',
    location: 'Hooge Mierde',
    hoursKey: 'vacancies.items.vacancy1.hours',
    contractKey: 'vacancies.items.vacancy1.contract',
    isActive: true,
    tasksKeys: [
      'vacancies.items.vacancy1.tasks.task1',
      'vacancies.items.vacancy1.tasks.task2',
      'vacancies.items.vacancy1.tasks.task3',
      'vacancies.items.vacancy1.tasks.task4',
      'vacancies.items.vacancy1.tasks.task5',
      'vacancies.items.vacancy1.tasks.task6'
    ],
    requirementsKeys: [
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

export const vacancyTypes = [
  { id: 'all', labelKey: 'vacancies.types.all' },
  { id: 'executive', labelKey: 'vacancies.types.executive' },
  { id: 'office', labelKey: 'vacancies.types.office' }
];
