import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seoMetadata';
import SaoTomePrincipeGallery from './GalleryPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('gallery-sao-tome-principe', '/gallery/sao-tome-principe');
}

export default function SaoTomePrincipeGalleryPage() {
  return <SaoTomePrincipeGallery />;
}
