import RegionProjectsClient from '@/components/projects/RegionProjectsClient';

export const metadata = {
  title: 'Southern Africa Projects | JIVO Energy',
  description: 'Explore JIVO Energy projects across Southern Africa.',
};

export default function SouthernAfricaProjectsPage() {
  return <RegionProjectsClient regionId="southern-africa" />;
}
