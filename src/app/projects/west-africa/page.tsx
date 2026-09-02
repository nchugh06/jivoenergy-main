import type { Metadata } from 'next';
import RegionProjectsClient from '@/components/projects/RegionProjectsClient';
import { getPageMetadata } from '@/lib/seoMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('projects-west-africa', '/projects/west-africa', {
    title: 'West Africa Renewable Energy Projects | JIVO Energy',
    description:
      "Explore JIVO Energy's renewable energy projects across West Africa, covering solar power, hybrid energy, battery storage and sustainable infrastructure.",
  });
}

export default function WestAfricaProjectsPage() {
  return <RegionProjectsClient regionId="west-africa" />;
}
