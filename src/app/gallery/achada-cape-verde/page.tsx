import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seoMetadata';
import AchadaCapeVerdeGallery from './GalleryPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('gallery-achada-cape-verde', '/gallery/achada-cape-verde');
}

export default function AchadaCapeVerdeGalleryPage() {
  return <AchadaCapeVerdeGallery />;
}
