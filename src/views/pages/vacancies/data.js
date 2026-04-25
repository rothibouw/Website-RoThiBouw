import { vacancies, vacancyTypes } from '@/data/vacancies';

export const vacanciesIntroData = {
  headingKey: 'vacancies.intro.heading',
  highlightKey: 'vacancies.intro.highlight',
  captionKey: 'vacancies.intro.caption',
  image: '/assets/about/hero.jpeg',
  primaryBtn: {
    href: '#apply',
    children: 'vacancies.intro.button'
  }
};

export const vacanciesListData = {
  headingKey: 'vacancies.heading',
  captionKey: 'vacancies.caption',
  vacancies,
  types: vacancyTypes
};

export const vacanciesApplyData = {
  headingKey: 'vacancies.applyForm.heading',
  captionKey: 'vacancies.applyForm.caption',
  vacancies
};
