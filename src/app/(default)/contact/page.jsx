// @next
import dynamic from 'next/dynamic';

// @project
import { contactMetadata } from '@/metadata';

const ContactPage = dynamic(() => import('@/views/pages/contact'));

/***************************  METADATA  ***************************/

export const metadata = contactMetadata;

/***************************  PAGE - CONTACT  ***************************/

export default function Contact() {
  return <ContactPage />;
}
