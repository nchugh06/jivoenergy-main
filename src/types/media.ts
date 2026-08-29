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
  createdAt?: string;
  updatedAt?: string;
}

export type MediaWritePayload = Omit<MediaItem, 'id' | 'createdAt' | 'updatedAt'>;

export type NewsJsonItem = {
  id?: number;
  title: string;
  description: string;
  image: string;
  category?: string;
  country?: string;
  slug?: string;
  link?: string;
  open?: 'tab' | 'iframe';
};
