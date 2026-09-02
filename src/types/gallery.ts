export interface GalleryVideo {
  id: string;
  youtubeId: string;
  title: string;
  country: string;
  thumbnail: string;
  duration: string;
  order: number;
  published: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export type GalleryWritePayload = Omit<GalleryVideo, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
