import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seoMetadata';
import MediaPageClient from './MediaPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('media', '/media', {
    title: 'JIVO Energy Newsroom | Renewable Energy News Africa',
    description:
      'Read the latest JIVO Energy news, project updates and media coverage across solar power, battery storage and renewable energy in Africa.',
  });
}

export default function MediaPage() {
  return <MediaPageClient />;
}
