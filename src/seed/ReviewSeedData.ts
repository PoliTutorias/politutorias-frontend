import type { ReviewEntity } from '@/interfaces/review-tipo/ReviewEntity';

export const ReviewSeedData: ReviewEntity = {
  id: 'review-uuid-001',
  rating: 5,
  comment: 'Excelente tutor. Los ejemplos prácticos en Java fueron muy claros.',
  tutoriaId: 'tutoria-id-001',
  studentId: 'student-uuid-007',
  tutorId: 'tutor-uuid-002',
  createdAt: '2026-03-05T14:30:00.000Z',
  updatedAt: '2026-03-05T14:30:00.000Z',
};
