import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seoMetadata';
import PrivacyPolicyPageClient from './PrivacyPolicyPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('privacy-policy', '/privacy-policy', {
    title: 'Privacy Policy | JIVO Energy',
    description:
      'Read JIVO Energy\'s privacy policy to understand how personal information is collected, used, protected and processed through our website and services.',
  });
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyPageClient />;
}
