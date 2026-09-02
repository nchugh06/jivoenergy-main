import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seoMetadata';
import ThemePageClient from './ThemePageClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('theme', '/theme', {
    title: 'JIVO Energy | Renewable Energy Solutions in Africa',
    description:
      'JIVO Energy delivers renewable energy infrastructure across Africa, including Solar PV, BESS, hybrid energy, transmission and sustainable energy solutions.',
  });
}

export default function ThemePage() {
  return <ThemePageClient />;
}
