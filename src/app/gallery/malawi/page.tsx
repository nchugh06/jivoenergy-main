import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seoMetadata';
import MalawiGallery from './GalleryPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('gallery-malawi', '/gallery/malawi');
}

export default function MalawiGalleryPage() {
  return <MalawiGallery />;
}
