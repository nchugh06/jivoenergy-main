import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seoMetadata';
import PartnersPageClient from './PartnersPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('partners', '/partners', {
    title: 'JIVO Energy Partners | Renewable Energy Partnerships',
    description:
      "Discover JIVO Energy's network of clients, financing partners and technology providers supporting renewable energy projects across Africa and emerging markets.",
  });
}

export default function PartnersPage() {
  return <PartnersPageClient />;
}
