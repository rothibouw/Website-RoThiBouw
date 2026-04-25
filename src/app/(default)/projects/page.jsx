// @next
import dynamic from 'next/dynamic';

// @project
import { projectsMetadata } from '@/metadata';

const ProjectsPage = dynamic(() => import('@/views/pages/projects'));

/***************************  METADATA  ***************************/

export const metadata = projectsMetadata;

/***************************  PAGE - PROJECTS  ***************************/

export default function Projects() {
  return <ProjectsPage />;
}
