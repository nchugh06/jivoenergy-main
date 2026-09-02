export const SEO_OG_TYPES = ['website', 'article'] as const;
export type SeoOgType = (typeof SEO_OG_TYPES)[number];

export const SEO_TWITTER_CARDS = ['summary_large_image', 'summary'] as const;
export type SeoTwitterCard = (typeof SEO_TWITTER_CARDS)[number];

export interface SeoPage {
  id: string;
  name: string;
  slug: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: SeoOgType;
  twitterCard: SeoTwitterCard;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  published: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export type SeoWritePayload = Omit<SeoPage, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
