// Service detail page section configuration.
// Pure data — no t() calls. Blocks receive i18n keys and translate internally.
//
// Components are imported statically, not behind a runtime import(), so every
// section ends up in the server-rendered HTML.

// @project
import { ContactUs3 } from '@/blocks/contact-us';
import { Cta1 } from '@/blocks/cta';
import { Project1 } from '@/blocks/projects';
import { ServiceOverview1 } from '@/blocks/service';

import { projects } from '@/data/projects';
import { servicesNavigationData } from '@/data/services';

export const createServiceDetailSections = (service) => {
  if (!service) return [];

  const sections = [];

  // Note: the hero is rendered by the page view itself.

  // Description + feature list combined — images auto-rotate every 4s
  sections.push({
    Component: ServiceOverview1,
    props: {
      titleKey: service.descriptionTitleKey,
      descriptionKey: service.descriptionKey,
      images: [service.descriptionImage, service.featureImage],
      featureKeys: service.features
    }
  });

  // Related projects (only when at least one exists)
  const relatedProjects = projects.filter((project) => project.categories.some((cat) => service.relatedCategories.includes(cat)));
  if (relatedProjects.length > 0) {
    sections.push({
      Component: Project1,
      props: {
        headingKey: 'services.relatedProjects.heading',
        captionKey: 'services.relatedProjects.caption',
        projects: relatedProjects,
        showViewAll: false,
        highlightedOnly: false
      }
    });
  }

  // CTA — keys only, Cta1 translates and adds NextLink internally
  sections.push({
    Component: Cta1,
    props: {
      headingKey: 'services.cta.heading',
      primaryBtn: {
        children: 'services.cta.button',
        href: '/contact'
      }
    }
  });

  // Other services navigation (current service filtered out)
  sections.push({
    Component: ContactUs3,
    props: {
      ...servicesNavigationData,
      list: servicesNavigationData.list.filter((item) => item.titleKey !== service.titleKey)
    }
  });

  return sections;
};
