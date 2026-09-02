import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seoMetadata';
import KenyaGallery from './GalleryPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('gallery-kenya', '/gallery/kenya');
}

export default function KenyaGalleryPage() {
  return <KenyaGallery />;
}
