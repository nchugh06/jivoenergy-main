import type { Metadata } from 'next';
import RegionProjectsClient from '@/components/projects/RegionProjectsClient';
import { getPageMetadata } from '@/lib/seoMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('projects-east-africa', '/projects/east-africa', {
    title: 'East Africa Renewable Energy Projects | JIVO Energy',
    description:
      "Explore JIVO Energy's renewable energy projects across East Africa, including solar PV, hybrid systems, battery storage and sustainable power infrastructure.",
  });
}

export default function EastAfricaProjectsPage() {
  return <RegionProjectsClient regionId="east-africa" />;
}
