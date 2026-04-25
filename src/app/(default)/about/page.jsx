// @next
import dynamic from 'next/dynamic';

// @project
import { aboutMetadata } from '@/metadata';

const AboutPage = dynamic(() => import('@/views/pages/about'));

/***************************  METADATA - ABOUT  ***************************/

export const metadata = aboutMetadata;

/***************************  PAGE - ABOUT  ***************************/

export default function About() {
  return <AboutPage />;
}
