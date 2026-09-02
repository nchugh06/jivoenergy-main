export type MediaOpenMode = 'iframe' | 'tab';

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  image: string;
  country: string;
  slug: string;
  link: string;
  open: MediaOpenMode;
  featured: boolean;
  category: string;
  order: number;
  published: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export type MediaWritePayload = Omit<MediaItem, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
