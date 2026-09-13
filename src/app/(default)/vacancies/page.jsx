// @next
import dynamic from 'next/dynamic';

// @project
import { vacanciesMetadata } from '@/metadata';

const VacanciesPage = dynamic(() => import('@/views/pages/vacancies'));

/***************************  METADATA  ***************************/

export const metadata = vacanciesMetadata;

/***************************  PAGE - VACANCIES  ***************************/

export default function Vacancies() {
  return <VacanciesPage />;
}
