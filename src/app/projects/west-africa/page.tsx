import RegionProjectsClient from '@/components/projects/RegionProjectsClient';

export const metadata = {
  title: 'West Africa Projects | JIVO Energy',
  description: 'Explore JIVO Energy projects across West Africa.',
};

export default function WestAfricaProjectsPage() {
  return <RegionProjectsClient regionId="west-africa" />;
}
