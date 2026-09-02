import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seoMetadata';
import TermsOfServicePageClient from './TermsOfServicePageClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('terms-of-service', '/terms-of-service', {
    title: 'Terms of Service | JIVO Energy',
    description:
      'Review JIVO Energy\'s terms of service covering website access, content, enquiries, services and your responsibilities when using the JIVO Energy website.',
  });
}

export default function TermsOfServicePage() {
  return <TermsOfServicePageClient />;
}
