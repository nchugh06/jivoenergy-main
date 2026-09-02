import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seoMetadata';
import CareersPageClient from './CareersPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('careers', '/careers', {
    title: 'Careers at JIVO Energy | Renewable Energy Jobs Africa',
    description:
      'Explore career opportunities at JIVO Energy and join a growing renewable energy company delivering solar, BESS, hybrid and sustainable infrastructure projects.',
  });
}

export default function CareersPage() {
  return <CareersPageClient />;
}
