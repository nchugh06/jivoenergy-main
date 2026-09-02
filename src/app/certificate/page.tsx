import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seoMetadata';
import CertificatePageClient from './CertificatePageClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('certificate', '/certificate', {
    title: 'JIVO Energy Certifications | ISO & Quality Standards',
    description:
      "View JIVO Energy's certifications covering quality, environmental management, greenhouse gases, information security, sustainable procurement and safety.",
  });
}

export default function CertificatePage() {
  return <CertificatePageClient />;
}
