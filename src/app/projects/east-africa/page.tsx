import RegionProjectsClient from '@/components/projects/RegionProjectsClient';

export const metadata = {
  title: 'East Africa Projects | JIVO Energy',
  description: 'Explore JIVO Energy projects across East Africa.',
};

export default function EastAfricaProjectsPage() {
  return <RegionProjectsClient regionId="east-africa" />;
}
