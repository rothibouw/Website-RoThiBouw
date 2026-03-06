// @next
import dynamic from 'next/dynamic';

// @project
import { termsConditionsMetadata } from '@/metadata';

const TermsConditionsPage = dynamic(() => import('@/views/pages/terms-conditions'));

/***************************  METADATA  ***************************/

export const metadata = termsConditionsMetadata;

/***************************  PAGE - TERMS & CONDITIONS  ***************************/

export default function TermsConditions() {
  return <TermsConditionsPage />;
}
