// Service detail page section configuration for LazySection.
// Pure JS — no React imports, no t() calls.
// Blocks receive i18n keys and translate internally.

import { projects } from '@/data/projects';
import { servicesNavigationData } from '@/data/services';

export const createServiceDetailSections = (service) => {
  if (!service) return [];

  const sections = [];

  // 1. Hero
  sections.push({
    importFunc: () => import('@/blocks/hero').then((module) => ({ default: module.HeroSlideshow })),
    props: {
      slides: [{ image: service.heroImage, title: service.titleKey }],
      height: { xs: 300, sm: 400, md: 500 },
      showText: true
    }
  });

  // 2. Service description
  sections.push({
    importFunc: () => import('@/blocks/service').then((module) => ({ default: module.ServiceDescription })),
    props: {
      titleKey: service.descriptionTitleKey,
      descriptionKey: service.descriptionKey,
      image: service.descriptionImage
    }
  });

  // 3. Feature list — keys passed, block translates
  sections.push({
    importFunc: () => import('@/blocks/service').then((module) => ({ default: module.ServiceFeatureList })),
    props: {
      featureKeys: service.features,
      image: service.featureImage,
      reverse: true
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
