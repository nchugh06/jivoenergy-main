import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seoMetadata';
import HomePageClient from './HomePageClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('home', '/', {
    title: 'JIVO Energy | Renewable Energy Solutions in Africa',
    description:
      'JIVO Energy delivers renewable energy infrastructure across Africa, including Solar PV, BESS, hybrid energy, transmission and sustainable energy solutions.',
  });
}

export default function HomeAliasPage() {
  return <HomePageClient />;
}
