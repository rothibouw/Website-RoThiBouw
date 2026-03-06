// @next
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

// @project
const ProjectDetailPage = dynamic(() => import('@/views/pages/project-detail'));

import { projects } from '@/data/projects';
import { nlTranslations } from '@/i18n';

/***************************  HELPERS  ***************************/

function t(key) {
  return key.split('.').reduce((obj, k) => obj?.[k], nlTranslations) ?? key;
}

/***************************  GENERATE STATIC PARAMS  ***************************/

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug
  }));
}

/***************************  GENERATE METADATA  ***************************/

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: 'Project niet gevonden' };
  }

  const title = t(project.titleKey);
  const description = t(project.detailDescriptionKey)?.slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/projects/${project.slug}`
    }
  };
}

/***************************  PAGE - PROJECT DETAIL  ***************************/

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage project={project} />;
}
