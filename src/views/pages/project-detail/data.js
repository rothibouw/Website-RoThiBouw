export const createProjectDetailSections = (project) => {
  if (!project) return [];

  const sections = [];

  // Header Section with Project Title, Subtitle
  sections.push({
    importFunc: () => import('@/blocks/project').then((module) => ({ default: module.ProjectHeader })),
    props: {
      titleKey: project.titleKey,
      subtitleKey: project.subtitleKey
    }
  });

  // Project Image Gallery1 with all project images (if available)
  if (project.images && project.images.length > 0) {
    sections.push({
      importFunc: () => import('@/blocks/gallery/Gallery1').then((module) => ({ default: module.default })),
      props: {
        images: project.images
      }
    });
  }

  // Project Detail Description (long-form)
  if (project.detailDescriptionKey) {
    sections.push({
      importFunc: () => import('@/blocks/about').then((m) => ({ default: m.OurStory1 })),
      props: {
        headingKey: 'projects.whatWeDidForThisProject',
        highlightKey: '',
        paragraphKeys: [project.detailDescriptionKey]
      }
    });
  }

  // // Materials/Features List
  // if (project.primaryInfo && project.primaryInfo.length > 0) {
  //   sections.push({
  //     importFunc: () => import('@/blocks/project/FeaturesList').then((module) => ({ default: module.default })),
  //     props: {
  //       items: project.primaryInfo
  //     }
  //   });
  // }

  // 2. Primary Section - Primary Info + Short Description (Idea 3 icons + Idea 1 description)
  if (project.primaryInfo && project.primaryInfo.length > 0) {
    sections.push({
      importFunc: () => import('@/blocks/project').then((module) => ({ default: module.ProjectSpecsDescription })),
      props: {
        specifications: project.primaryInfo,
        descriptionKey: project.projectInformationDescriptionKey
        // specsTitleKey: 'projects.information'
      }
    });
  }

  // // 3. Secondary Section - Full Description + Secondary Info as highlight cards
  // if (project.secondaryInfo && project.secondaryInfo.length > 0 && project.descriptionKey) {
  //   sections.push({
  //     importFunc: () => import('@/blocks/project').then((module) => ({ default: module.ProjectSpecsDescription })),
  //     props: {
  //       specifications: project.secondaryInfo,
  //       descriptionKey: project.descriptionKey,
  //       reverse: true,
  //       specsAsCards: true
  //     }
  //   });
  // }

  // 4. Testimonial / Review
  if (project.testimonial && (project.testimonial.review || project.testimonial.reviewKey)) {
    sections.push({
      importFunc: () => import('@/blocks/project').then((module) => ({ default: module.SimpleTestimonial })),
      props: {
        name: project.testimonial.name,
        review: project.testimonial.review,
        reviewKey: project.testimonial.reviewKey,
        rating: project.testimonial.rating
      }
    });
  }

  return sections;
};
