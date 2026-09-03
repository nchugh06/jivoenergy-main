import type { Metadata } from 'next';
import { SeoPage } from '@/types/seo';
import { getPublishedSeoBySlug } from '@/lib/getSeoBySlug';
import { SITE_URL, isProduction } from '@/lib/site';

export const SITE_DEFAULT_SEO = {
  path: '/',
  metaTitle: 'JIVO Energy | Renewable Energy Solutions in Africa',
  metaDescription:
    'JIVO Energy delivers renewable energy infrastructure across Africa, including Solar PV, BESS, hybrid energy, transmission and sustainable energy solutions.',
};

export type PageSeoDefaults = {
  title: string;
  description: string;
};

function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized === '/' ? '/' : normalized}`;
}

export async function fetchSeoBySlug(slug: string): Promise<SeoPage | null> {
  try {
    return await getPublishedSeoBySlug(slug);
  } catch (error) {
    console.error(`Failed to load CMS SEO for slug "${slug}":`, error);
    return null;
  }
}

export async function getPageMetadata(
  slug: string,
  path?: string,
  defaults?: PageSeoDefaults
): Promise<Metadata> {
  const cms = await fetchSeoBySlug(slug);

  const title = cms?.metaTitle || defaults?.title || SITE_DEFAULT_SEO.metaTitle;
  const description = cms?.metaDescription || defaults?.description || SITE_DEFAULT_SEO.metaDescription;
  const pagePath = cms?.path || path || SITE_DEFAULT_SEO.path;
  const canonical = cms?.canonicalUrl || absoluteUrl(pagePath);
  const ogTitle = cms?.ogTitle || title;
  const ogDescription = cms?.ogDescription || description;
  const ogImage = cms?.ogImage || cms?.twitterImage || undefined;
  const twitterTitle = cms?.twitterTitle || ogTitle;
  const twitterDescription = cms?.twitterDescription || ogDescription;
  const twitterImage = cms?.twitterImage || ogImage;
  const index = isProduction && (cms ? cms.robotsIndex : true);
  const follow = isProduction && (cms ? cms.robotsFollow : true);

  return {
    title,
    description,
    authors: [{ name: 'JIVO Energy', url: SITE_URL }],
    creator: 'JIVO Energy',
    publisher: 'JIVO Energy',
    keywords: cms?.keywords || undefined,
    alternates: {
      canonical,
    },
    robots: {
      index,
      follow,
    },
    openGraph: {
      type: cms?.ogType || 'website',
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: 'JIVO Energy',
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: cms?.twitterCard || 'summary_large_image',
      title: twitterTitle,
      description: twitterDescription,
      ...(twitterImage ? { images: [twitterImage] } : {}),
    },
  };
}
