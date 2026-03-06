'use client';

// @project
import LazySection from '@/components/LazySection';
import useDataThemeMode from '@/hooks/useDataThemeMode';

// @data
import { projects, projectCategories } from './data';

/***************************  PROJECTS OVERVIEW PAGE  ***************************/

export default function ProjectsPage() {
  useDataThemeMode();

  return (
    <LazySection
      sections={{
        importFunc: () => import('@/blocks/projects').then((module) => ({ default: module.Project2 })),
        props: {
          headingKey: 'projects.heading',
          captionKey: 'projects.caption',
          projects,
          categories: projectCategories
        }
      }}
      offset="200px"
    />
  );
}
