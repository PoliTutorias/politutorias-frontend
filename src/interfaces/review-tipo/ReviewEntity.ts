export interface ReviewEntity {
  id: string;
  rating: number;
  comment?: string | null;
  tutoriaId: string;
  studentId: string;
  tutorId: string;
  createdAt: string;
  updatedAt: string;
}
