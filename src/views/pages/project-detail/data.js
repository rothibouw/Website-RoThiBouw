// Project detail page section configuration.
// Pure data — no t() calls. Blocks receive i18n keys and translate internally.
//
// Components are imported statically, not behind a runtime import(), so every
// section ends up in the server-rendered HTML.

// @project
import { OurStory1 } from '@/blocks/about';
import { Cta1 } from '@/blocks/cta';
import { Gallery1 } from '@/blocks/gallery';
import { ProjectSpecsDescription, ProjectStory1, SimpleTestimonial, TransformationComparison } from '@/blocks/project';

import { PAGE_PATH } from '@/path';

export const createProjectDetailSections = (project) => {
  if (!project) return [];

  const sections = [];

  // Note: the header (title + subtitle) is rendered by the page view itself.

  // Project Image Gallery1 with all project images (if available)
  if (project.images && project.images.length > 0) {
    sections.push({
      Component: Gallery1,
      props: { images: project.images }
    });
  }

  // Project Detail Description (long-form)
  if (project.storyItems && project.storyItems.length > 0) {
    sections.push({
      Component: ProjectStory1,
      props: { items: project.storyItems }
    });
  } else if (project.detailDescriptionKey) {
    sections.push({
      Component: OurStory1,
      props: {
        headingKey: 'projects.aboutThisProject',
        highlightKey: '',
        paragraphKeys: [project.detailDescriptionKey]
      }
    });
  }

  // Transformation Comparison (Before/After) - optional
  if (project.transformationImages) {
    sections.push({
      Component: TransformationComparison,
      props: {
        headingKey: 'projects.transformation.heading',
        captionKey: 'projects.transformation.caption',
        beforeImage: project.transformationImages.before,
        afterImage: project.transformationImages.after,
        descriptionKey: project.transformationDescriptionKey
      }
    });
  }

  // Primary info (icons) + short description
  if (project.primaryInfo && project.primaryInfo.length > 0) {
    sections.push({
      Component: ProjectSpecsDescription,
      props: {
        specifications: project.primaryInfo,
        descriptionKey: project.projectInformationDescriptionKey
      }
    });
  }

  // Testimonial / Review
  if (project.testimonial && (project.testimonial.review || project.testimonial.reviewKey)) {
    sections.push({
      Component: SimpleTestimonial,
      props: {
        name: project.testimonial.name,
        review: project.testimonial.review,
        reviewKey: project.testimonial.reviewKey,
        rating: project.testimonial.rating
      }
    });
  }

  // CTA - See Our Other Projects
  sections.push({
    Component: Cta1,
    props: {
      headingKey: 'projects.seeOurOtherProjects',
      primaryBtn: {
        href: PAGE_PATH.projectsPage,
        children: 'projects.viewAllProjects'
      }
    }
  });

  return sections;
};
