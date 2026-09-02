import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seoMetadata';
import TeamPageClient from './TeamPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('team', '/team', {
    title: 'JIVO Energy Team | Renewable Energy Experts',
    description:
      'Meet the JIVO Energy team driving renewable energy development, engineering, project execution and sustainable infrastructure across Africa.',
  });
}

export default function TeamPage() {
  return <TeamPageClient />;
}
