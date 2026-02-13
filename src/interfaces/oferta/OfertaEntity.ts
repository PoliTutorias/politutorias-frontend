export interface OfertaEntity {
  id: string;
  title: string;
  price: number;
  modality: 'Presencial' | 'Virtual';
  categories: string[];
  description: string;
  tutorId?: string;
  createdAt: Date;
  updatedAt: Date;
  status?: 'active' | 'inactive';
}
