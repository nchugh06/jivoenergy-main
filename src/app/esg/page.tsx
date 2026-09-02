import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seoMetadata';
import EsgPageClient from './EsgPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('esg', '/esg', {
    title: 'ESG & Sustainability | JIVO Energy Africa',
    description:
      "Learn about JIVO Energy's ESG approach covering quality, health and safety, environmental responsibility, resource efficiency, emissions reduction and communities.",
  });
}

export default function EsgPage() {
  return <EsgPageClient />;
}
