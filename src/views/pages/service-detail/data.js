// Service detail page section configuration for LazySection.
// Pure JS — no React imports, no t() calls.
// Blocks receive i18n keys and translate internally.

import { projects } from '@/data/projects';
import { servicesNavigationData } from '@/data/services';

export const createServiceDetailSections = (service) => {
  if (!service) return [];

  const sections = [];

  // Note: the hero is rendered eagerly by the page view so that it is
  // server-rendered; it is deliberately not part of this list.

  // 2. Description + feature list combined — images auto-rotate every 4s
  sections.push({
    importFunc: () => import('@/blocks/service').then((module) => ({ default: module.ServiceOverview1 })),
    props: {
      titleKey: service.descriptionTitleKey,
      descriptionKey: service.descriptionKey,
      images: [service.descriptionImage, service.featureImage],
      featureKeys: service.features
    }
  });

  // 4. Related projects (only when at least one exists)
  const relatedProjects = projects.filter((project) => project.categories.some((cat) => service.relatedCategories.includes(cat)));
  if (relatedProjects.length > 0) {
    sections.push({
      importFunc: () => import('@/blocks/projects').then((module) => ({ default: module.Project1 })),
      props: {
        headingKey: 'services.relatedProjects.heading',
        captionKey: 'services.relatedProjects.caption',
        projects: relatedProjects,
        showViewAll: false,
        highlightedOnly: false
      }
    });
  }

  // 5. CTA — keys only, Cta1 translates and adds NextLink internally
  sections.push({
    importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta1 })),
    props: {
      headingKey: 'services.cta.heading',
      primaryBtn: {
        children: 'services.cta.button',
        href: '/contact'
      }
    }
  });

  // 6. Other services navigation (current service filtered out)
  sections.push({
    importFunc: () => import('@/blocks/contact-us').then((module) => ({ default: module.ContactUs3 })),
    props: {
      ...servicesNavigationData,
      list: servicesNavigationData.list.filter((item) => item.titleKey !== service.titleKey)
    }
  });

  return sections;
};
