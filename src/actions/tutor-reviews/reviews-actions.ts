'use server';

import type { PaginatedReviewsResponse, ReviewDto } from '@/interfaces/reviews/review-dtos';
import type { ReviewQueryParams } from '@/interfaces/reviews/review-query-params';
import { getServerToken } from '@/lib/server-auth';

interface TutorReviewsActionResponse {
  success: boolean;
  data?: PaginatedReviewsResponse;
  error?: string;
}

interface BackendReviewResponse {
  reviews: Array<{
    id: string;
    student: {
      id: string;
      firstName: string;
      lastName: string;
      avatarUrl: string | null;
    };
    date: string;
    stars: number;
    tutoringSubject: string;
    comment: string | null;
  }>;
  summary: {
    avgRating: number;
    totalReviews: number;
    starDistribution: Record<string, number>;
  };
  tutorStats: {
    completedTutorias: number;
    uniqueSubjects: number;
    ratingParticipation: number;
  };
  total: number;
  page: number;
  limit: number;
}

interface BackendErrorResponse {
  statusCode?: number;
  message?: string;
}

function normalizeParams(params: ReviewQueryParams): Required<Pick<ReviewQueryParams, 'page' | 'limit' | 'sortBy' | 'ratingFilter'>> {
  return {
    page: Math.max(1, params.page ?? 1),
    limit: Math.max(1, params.limit ?? 3),
    sortBy: params.sortBy ?? 'createdAt',
    ratingFilter: params.ratingFilter ?? 'all',
  };
}

function mapSortBy(sortBy: ReviewQueryParams['sortBy']): 'createdAt' | 'stars' {
  if (sortBy === 'stars') {
    return 'stars';
  }
  return 'createdAt';
}

export async function fetchTutorReviews(params: ReviewQueryParams): Promise<TutorReviewsActionResponse> {
  const { page, limit, sortBy, ratingFilter } = normalizeParams(params);

  try {
    if (!params.tutorId?.trim()) {
      return {
        success: false,
        error: 'El tutorId es requerido para obtener las reseñas.',
      };
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    if (!backendUrl) {
      return { success: false, error: 'NEXT_PUBLIC_BACKEND_API_URL no esta configurado.' };
    }

    const token = await getServerToken();
    const normalizedBaseUrl = backendUrl.replace(/\/+$/, '');
    const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      sortBy: mapSortBy(sortBy),
      ratingFilter,
    });

    const apiResponse = await fetch(
      `${normalizedBaseUrl}/tutors/${params.tutorId}/reviews?${query.toString()}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: 'no-store',
      }
    );

    if (!apiResponse.ok) {
      const errorPayload = (await apiResponse.json().catch(() => ({}))) as BackendErrorResponse;
      return {
        success: false,
        error: errorPayload.message ?? 'Error al obtener reseñas del tutor.',
      };
    }

    const backendData = (await apiResponse.json()) as BackendReviewResponse;

    const mappedData: PaginatedReviewsResponse = {
      data: backendData.reviews.map((review): ReviewDto => ({
        id: review.id,
        studentName: `${review.student.firstName} ${review.student.lastName}`.trim(),
        studentAvatarUrl: review.student.avatarUrl,
        date: review.date,
        stars: review.stars,
        tutoringSubject: review.tutoringSubject,
        comment: review.comment ?? '',
      })),
      page: backendData.page,
      limit: backendData.limit,
      total: backendData.total,
      summary: {
        avgRating: backendData.summary.avgRating,
        totalReviews: backendData.summary.totalReviews,
        starDistribution: [5, 4, 3, 2, 1].map((stars) => ({
          stars,
          percentage: Number(backendData.summary.starDistribution[String(stars)] ?? 0),
        })),
        metrics: {
          totalAppointments: backendData.tutorStats.completedTutorias,
          completedHours: backendData.tutorStats.uniqueSubjects,
          averageResponseTime: backendData.tutorStats.ratingParticipation,
        },
      },
    };

    return {
      success: true,
      data: mappedData,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error inesperado al obtener reseñas.',
    };
  }
}

export async function LoadReviewsAction(tutorId: string): Promise<TutorReviewsActionResponse> {
  return fetchTutorReviews({
    tutorId,
    page: 1,
    limit: 3,
    sortBy: 'createdAt',
    ratingFilter: 'all',
  });
}

export async function UpdateReviewsAction(params: ReviewQueryParams): Promise<TutorReviewsActionResponse> {
  return fetchTutorReviews(params);
}