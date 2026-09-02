import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seoMetadata';
import GalleryPageClient from './GalleryPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('gallery', '/gallery');
}

export default function GalleryPage() {
  return <GalleryPageClient />;
}
