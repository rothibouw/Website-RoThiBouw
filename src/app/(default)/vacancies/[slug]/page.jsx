// @next
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

// @project
const VacancyDetailPage = dynamic(() => import('@/views/pages/vacancy-detail'));

import { vacancies } from '@/data/vacancies';
import { nlTranslations } from '@/i18n';

/***************************  HELPERS  ***************************/

function t(key) {
  return key.split('.').reduce((obj, k) => obj?.[k], nlTranslations) ?? key;
}

/***************************  GENERATE STATIC PARAMS  ***************************/

export async function generateStaticParams() {
  return vacancies.map((vacancy) => ({ slug: vacancy.slug }));
}

/***************************  GENERATE METADATA  ***************************/

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const vacancy = vacancies.find((v) => v.slug === slug);

  if (!vacancy) {
    return { title: t('vacancies.vacancyNotFound') };
  }

  const title = `${t(vacancy.titleKey)} — RoThi Bouw`;
  const description = t(vacancy.introKey)?.slice(0, 160);

  return {
    title,
    description,
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
  const vacancy = vacancies.find((v) => v.slug === slug);

  if (!vacancy) {
    notFound();
  }

  return <VacancyDetailPage vacancy={vacancy} />;
}
