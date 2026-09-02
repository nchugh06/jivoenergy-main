export interface JobOpening {
  id: string;
  title: string;
  experience: string;
  location: string;
  pdfUrl: string;
  order: number;
  published: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export type JobWritePayload = Omit<JobOpening, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
