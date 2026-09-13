'use client';

// @project
import { ContactUs4 } from '@/blocks/contact-us';
import useDataThemeMode from '@/hooks/useDataThemeMode';

// @data
import { contactData } from './data';

/***************************  CONTACT PAGE  ***************************/

export default function ContactPage() {
  useDataThemeMode();

  // Single-section page: imported statically so it is server-rendered.
  return <ContactUs4 {...contactData} />;
}
