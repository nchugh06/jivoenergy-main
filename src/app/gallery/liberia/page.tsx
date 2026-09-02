import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seoMetadata';
import LiberiaGallery from './GalleryPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('gallery-liberia', '/gallery/liberia');
}

export default function LiberiaGalleryPage() {
  return <LiberiaGallery />;
}
