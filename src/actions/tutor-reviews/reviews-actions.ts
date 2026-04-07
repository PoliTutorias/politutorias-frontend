'use server';

import type { PaginatedReviewsResponse, ReviewDto } from '@/interfaces/reviews/review-dtos';
import type { ReviewQueryParams } from '@/interfaces/reviews/review-query-params';
import { allTutorReviewsSeed, tutorReviewsSummarySeed } from '@/seed/TutorReviewsSeedData';

interface TutorReviewsActionResponse {
  success: boolean;
  data?: PaginatedReviewsResponse;
  error?: string;
}

function normalizeParams(params: ReviewQueryParams): Required<Pick<ReviewQueryParams, 'page' | 'limit' | 'sortBy' | 'ratingFilter'>> {
  return {
    page: Math.max(1, params.page ?? 1),
    limit: Math.max(1, params.limit ?? 3),
    sortBy: params.sortBy ?? 'date',
    ratingFilter: params.ratingFilter ?? 'all',
  };
}

function sortReviews(reviews: ReviewDto[], sortBy: 'date' | 'stars'): ReviewDto[] {
  const cloned = [...reviews];

  if (sortBy === 'stars') {
    return cloned.sort((a, b) => {
      if (b.stars !== a.stars) return b.stars - a.stars;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  return cloned.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function filterByRating(reviews: ReviewDto[], ratingFilter: 'all' | '1' | '2' | '3' | '4' | '5'): ReviewDto[] {
  if (ratingFilter === 'all') {
    return reviews;
  }

  return reviews.filter((review) => review.stars === Number(ratingFilter));
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

    const filteredReviews = filterByRating(allTutorReviewsSeed, ratingFilter);
    const sortedReviews = sortReviews(filteredReviews, sortBy);

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = sortedReviews.slice(start, end);

    const response: PaginatedReviewsResponse = {
      data: paginatedData,
      page,
      limit,
      total: sortedReviews.length,
      summary: {
        ...tutorReviewsSummarySeed,
        totalReviews: allTutorReviewsSeed.length,
      },
    };

    return {
      success: true,
      data: response,
    };

    // Backend integration (to be enabled when API is ready)
    // const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    // const token = await getServerToken();
    //
    // if (!backendUrl) {
    //   return { success: false, error: 'NEXT_PUBLIC_BACKEND_API_URL no esta configurado.' };
    // }
    //
    // const normalizedBaseUrl = backendUrl.replace(/\/+$/, '');
    // const query = new URLSearchParams({
    //   page: String(page),
    //   limit: String(limit),
    //   sortBy,
    //   ratingFilter,
    // });
    //
    // const apiResponse = await fetch(
    //   `${normalizedBaseUrl}/tutors/${params.tutorId}/reviews?${query.toString()}`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       Accept: 'application/json',
    //       ...(token ? { Authorization: `Bearer ${token}` } : {}),
    //     },
    //     cache: 'no-store',
    //   }
    // );
    //
    // if (!apiResponse.ok) {
    //   const errorPayload = await apiResponse.json().catch(() => ({}));
    //   return {
    //     success: false,
    //     error: (errorPayload as { message?: string }).message ?? 'Error al obtener reseñas del tutor.',
    //   };
    // }
    //
    // const data = (await apiResponse.json()) as PaginatedReviewsResponse;
    // return { success: true, data };
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
    sortBy: 'date',
    ratingFilter: 'all',
  });
}

export async function UpdateReviewsAction(params: ReviewQueryParams): Promise<TutorReviewsActionResponse> {
  return fetchTutorReviews(params);
}