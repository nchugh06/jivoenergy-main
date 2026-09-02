import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seoMetadata';
import MaioCapeVerdeGallery from './GalleryPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('gallery-maio-cape-verde', '/gallery/maio-cape-verde');
}

export default function MaioCapeVerdeGalleryPage() {
  return <MaioCapeVerdeGallery />;
}
