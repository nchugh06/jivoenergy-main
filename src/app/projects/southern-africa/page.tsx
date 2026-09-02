import type { Metadata } from 'next';
import RegionProjectsClient from '@/components/projects/RegionProjectsClient';
import { getPageMetadata } from '@/lib/seoMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('projects-southern-africa', '/projects/southern-africa', {
    title: 'Southern Africa Renewable Energy Projects | JIVO Energy',
    description:
      "Explore JIVO Energy's renewable energy projects across Southern Africa, including solar PV, BESS, hybrid energy and reliable power infrastructure.",
  });
}

export default function SouthernAfricaProjectsPage() {
  return <RegionProjectsClient regionId="southern-africa" />;
}
