import type { PaginatedReviewsResponse, ReviewDto, ReviewSummaryDto } from '@/interfaces/reviews/review-dtos';

export const allTutorReviewsSeed: ReviewDto[] = [
  {
    id: 'review-001',
    studentName: 'Sofia Mendoza',
    studentAvatarUrl: null,
    date: '2026-03-08T10:15:00.000Z',
    stars: 3,
    tutoringSubject: 'Estatica',
    comment: '',
  },
  {
    id: 'review-002',
    studentName: 'Sofia Mendoza',
    studentAvatarUrl: null,
    date: '2026-02-28T14:45:00.000Z',
    stars: 5,
    tutoringSubject: 'Algebra Lineal',
    comment: 'Juan es el mejor tutor que he tenido. Explica de forma muy clara y directa.',
  },
  {
    id: 'review-003',
    studentName: 'Andres Morales',
    studentAvatarUrl: null,
    date: '2026-02-25T16:00:00.000Z',
    stars: 4,
    tutoringSubject: 'Estatica',
    comment: 'Juan explica los problemas paso a paso. Muy recomendado para Estatica.',
  },
  {
    id: 'review-004',
    studentName: 'Valeria Sanchez',
    studentAvatarUrl: null,
    date: '2026-02-18T11:30:00.000Z',
    stars: 4,
    tutoringSubject: 'Fisica I',
    comment: 'Muy buena clase, aunque empezamos un poco tarde. Los ejercicios fueron muy utiles.',
  },
  {
    id: 'review-005',
    studentName: 'Gabriel Espinoza',
    studentAvatarUrl: null,
    date: '2026-02-11T09:20:00.000Z',
    stars: 5,
    tutoringSubject: 'Calculo Vectorial',
    comment: 'Excelente sesion. Entendi derivadas parciales en una sola clase.',
  },
  {
    id: 'review-006',
    studentName: 'Nicole Paredes',
    studentAvatarUrl: null,
    date: '2026-02-05T19:10:00.000Z',
    stars: 5,
    tutoringSubject: 'Termodinamica',
    comment: 'El material que compartio fue preciso y muy facil de seguir.',
  },
  {
    id: 'review-007',
    studentName: 'Pedro Iza',
    studentAvatarUrl: null,
    date: '2026-01-29T08:50:00.000Z',
    stars: 4,
    tutoringSubject: 'Mecanica',
    comment: 'Buen dominio del tema y excelente paciencia para resolver dudas.',
  },
  {
    id: 'review-008',
    studentName: 'Daniela Acosta',
    studentAvatarUrl: null,
    date: '2026-01-21T13:40:00.000Z',
    stars: 1,
    tutoringSubject: 'Fisica I',
    comment: 'No fue una buena experiencia para mi necesidad puntual.',
  },
];

export const tutorReviewsSummarySeed: ReviewSummaryDto = {
  avgRating: 4.1,
  totalReviews: 8,
  starDistribution: [
    { stars: 5, percentage: 38 },
    { stars: 4, percentage: 38 },
    { stars: 3, percentage: 12 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 12 },
  ],
  metrics: {
    totalAppointments: 12,
    completedHours: 48,
    averageResponseTime: 92,
  },
};

export const tutorReviewsSeed: PaginatedReviewsResponse = {
  data: allTutorReviewsSeed.slice(0, 3),
  page: 1,
  limit: 3,
  total: allTutorReviewsSeed.length,
  summary: tutorReviewsSummarySeed,
};