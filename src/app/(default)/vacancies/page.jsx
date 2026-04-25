import dynamic from 'next/dynamic';

const VacanciesPage = dynamic(() => import('@/views/pages/vacancies'));

export const metadata = {
  title: 'Vacatures | RoThi Bouw',
  description: 'Kom werken bij RoThi Bouw. Bekijk onze openstaande vacatures en solliciteer direct.'
};

export default function Vacancies() {
  return <VacanciesPage />;
}
