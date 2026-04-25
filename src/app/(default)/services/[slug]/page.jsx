// @next
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

// @project
const ServiceDetailPage = dynamic(() => import('@/views/pages/service-detail'));

import { services } from '@/data/services';

import { nlTranslations } from '@/i18n';

/***************************  HELPERS  ***************************/

// Server-side metadata uses Dutch (nl) intentionally: search engines and social
// cards receive one language per page, and Dutch is the primary audience.
function t(key) {
  return key.split('.').reduce((obj, k) => obj?.[k], nlTranslations) ?? key;
}

/***************************  GENERATE STATIC PARAMS  ***************************/

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug
  }));
}

/***************************  GENERATE METADATA  ***************************/

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return { title: t('services.serviceNotFound') };
  }

  const title = t(service.titleKey);
  const description = t(service.descriptionKey)?.slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/services/${service.slug}`
    }
  };
}

/***************************  PAGE - SERVICE DETAIL  ***************************/

export default async function ServiceDetail({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailPage service={service} />;
}
