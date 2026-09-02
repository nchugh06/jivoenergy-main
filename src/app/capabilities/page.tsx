import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seoMetadata';
import CapabilitiesPageClient from './CapabilitiesPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('capabilities', '/capabilities', {
    title: 'Renewable Energy Project Capabilities | JIVO Energy',
    description:
      "Explore JIVO Energy's capabilities across project origination, development, financing, engineering, procurement, construction and operations.",
  });
}

export default function CapabilitiesPage() {
  return <CapabilitiesPageClient />;
}
