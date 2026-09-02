import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seoMetadata';
import AboutPageClient from './AboutPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('about', '/about', {
    title: 'About JIVO Energy | Renewable Energy Company Africa',
    description:
      'Learn about JIVO Energy, a renewable energy and infrastructure company delivering solar, BESS, hybrid power and sustainable energy solutions across Africa.',
  });
}

export default function AboutPage() {
  return <AboutPageClient />;
}
