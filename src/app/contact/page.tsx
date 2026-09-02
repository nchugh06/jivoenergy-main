import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seoMetadata';
import ContactPageClient from './ContactPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('contact', '/contact', {
    title: 'Contact JIVO Energy | Renewable Energy Projects Africa',
    description:
      'Contact JIVO Energy to discuss renewable energy projects, Solar PV, battery storage, hybrid systems, transmission and sustainable energy infrastructure.',
  });
}

export default function ContactPage() {
  return <ContactPageClient />;
}
