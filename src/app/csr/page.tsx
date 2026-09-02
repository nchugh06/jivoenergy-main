import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seoMetadata';
import CsrPageClient from './CsrPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('csr', '/csr', {
    title: 'JIVO Energy | Renewable Energy Solutions in Africa',
    description:
      'JIVO Energy delivers renewable energy infrastructure across Africa, including Solar PV, BESS, hybrid energy, transmission and sustainable energy solutions.',
  });
}

export default function CsrPage() {
  return <CsrPageClient />;
}
