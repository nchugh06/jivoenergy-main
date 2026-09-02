import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seoMetadata';
import BusinessAreasPageClient from './BusinessAreasPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('business-areas', '/business-areas', {
    title: 'Renewable Energy Solutions & Services | JIVO Energy',
    description:
      "Explore JIVO Energy's renewable energy solutions, including Solar PV, BESS, hybrid energy, transmission, biogas, biomethane and waste-to-energy.",
  });
}

export default function BusinessAreasPage() {
  return <BusinessAreasPageClient />;
}
