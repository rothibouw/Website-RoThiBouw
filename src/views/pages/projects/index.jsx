'use client';

// @project
import { Project2 } from '@/blocks/projects';
import useDataThemeMode from '@/hooks/useDataThemeMode';

// @data
import { projects, projectCategories } from './data';

/***************************  PROJECTS OVERVIEW PAGE  ***************************/

export default function ProjectsPage() {
  useDataThemeMode();

  // The grid is this page's only content, so it is imported statically and
  // server-rendered rather than lazy-loaded behind an IntersectionObserver.
  return <Project2 headingKey="projects.heading" captionKey="projects.caption" projects={projects} categories={projectCategories} />;
}
