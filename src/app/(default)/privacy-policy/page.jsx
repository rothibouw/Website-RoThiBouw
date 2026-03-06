// @next
import dynamic from 'next/dynamic';

// @project
import { privacyPolicyMetadata } from '@/metadata';

const PrivacyPolicyPage = dynamic(() => import('@/views/pages/privacy-policy'));

/***************************  METADATA  ***************************/

export const metadata = privacyPolicyMetadata;

/***************************  PAGE - PRIVACY POLICY  ***************************/

export default function PrivacyPolicy() {
  return <PrivacyPolicyPage />;
}
