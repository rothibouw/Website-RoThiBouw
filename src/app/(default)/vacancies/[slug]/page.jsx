// @next
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

// @project
const VacancyDetailPage = dynamic(() => import('@/views/pages/vacancy-detail'));

import { activeVacancies, VACANCIES_PUBLISHED } from '@/data/vacancies';
import { nlTranslations } from '@/i18n';

/***************************  HELPERS  ***************************/

// Server-side metadata uses Dutch (nl) intentionally: search engines and social
// cards receive one language per page, and Dutch is the primary audience.
function t(key) {
  return key.split('.').reduce((obj, k) => obj?.[k], nlTranslations) ?? key;
}

/***************************  GENERATE STATIC PARAMS  ***************************/

export async function generateStaticParams() {
  return activeVacancies.map((vacancy) => ({ slug: vacancy.slug }));
}

/***************************  GENERATE METADATA  ***************************/

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const vacancy = activeVacancies.find((v) => v.slug === slug);

  if (!vacancy) {
    return { title: t('vacancies.vacancyNotFound') };
  }

  const title = t(vacancy.titleKey);
  const description = t(vacancy.descriptionKey)?.slice(0, 160);

  return {
    title,
    description,
    // Kept out of the index until the careers section is published
    ...(VACANCIES_PUBLISHED ? {} : { robots: { index: false, follow: false } }),
    openGraph: {
      title,
      description,
      url: `/vacancies/${vacancy.slug}`
    }
  };
}

/***************************  PAGE - VACANCY DETAIL  ***************************/

export default async function VacancyDetail({ params }) {
  const { slug } = await params;
  const vacancy = activeVacancies.find((v) => v.slug === slug);

  if (!vacancy) {
    notFound();
  }

  return <VacancyDetailPage vacancy={vacancy} />;
}
