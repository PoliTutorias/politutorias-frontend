'use client';

import { useEffect, useState } from 'react';
import { LoadReviewsAction, UpdateReviewsAction } from '@/actions/tutor-reviews/reviews-actions';
import RatingSummaryDisplay from '@/components/tutor-reviews/rating-summary-display/RatingSummaryDisplay';
import ReviewListDisplay from '@/components/tutor-reviews/review-list-display/ReviewListDisplay';
import PaginationControls from '@/components/tutor-reviews/pagination-controls/PaginationControls';
import type { ReviewDto, ReviewSummaryDto } from '@/interfaces/reviews/review-dtos';

interface ReviewSectionProps {
  tutorId: string;
}

export default function ReviewSection({ tutorId }: ReviewSectionProps) {
  const limit = 3;
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [reviewSummary, setReviewSummary] = useState<ReviewSummaryDto | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadInitialReviews = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await LoadReviewsAction(tutorId);

        if (!isMounted) {
          return;
        }

        if (!result.success || !result.data) {
          setError(result.error ?? 'No se pudieron cargar las reseñas.');
          setReviews([]);
          setReviewSummary(null);
          setTotalReviews(0);
          setCurrentPage(1);
          return;
        }

        setReviews(result.data.data);
        setReviewSummary(result.data.summary);
        setTotalReviews(result.data.total);
        setCurrentPage(result.data.page);
      } catch {
        if (isMounted) {
          setError('Ocurrió un error inesperado al cargar las reseñas.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadInitialReviews();

    return () => {
      isMounted = false;
    };
  }, [tutorId]);

  const handleLoadMore = async () => {
    if (isLoadingMore || reviews.length >= totalReviews) {
      return;
    }

    const nextPage = currentPage + 1;
    setIsLoadingMore(true);
    setError(null);

    try {
      const result = await UpdateReviewsAction({
        tutorId,
        page: nextPage,
        limit,
        sortBy: 'date',
        ratingFilter: 'all',
      });

      if (!result.success || !result.data) {
        setError(result.error ?? 'No se pudieron cargar más reseñas.');
        return;
      }

      const pageData = result.data;

      setReviews((previous) => {
        const existingIds = new Set(previous.map((review) => review.id));
        const newItems = pageData.data.filter((review) => !existingIds.has(review.id));
        return [...previous, ...newItems];
      });
      setCurrentPage(pageData.page);
      setTotalReviews(pageData.total);
      setReviewSummary(pageData.summary);
    } catch {
      setError('Ocurrió un error inesperado al cargar más reseñas.');
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <section className="rounded-lg bg-white p-4 md:p-6" data-tutor-id={tutorId}>
      <h2 className="text-base font-bold text-primary">Reseñas de Estudiantes</h2>

      {isLoading && (
        <div className="mt-6 rounded-lg border border-[#e7ebf0] bg-[#f8fbff] p-4 text-sm text-[#687a94]">
          Cargando reseñas...
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-lg border border-[#ffd8d8] bg-[#fff5f5] p-4 text-sm text-[#b04242]">
          {error}
        </div>
      )}

      {!isLoading && !error && reviewSummary && (
        <>
          <div className="mt-6">
            <RatingSummaryDisplay summary={reviewSummary} />
          </div>

          <hr className="my-6 border-[#e7ebf0]" />

          <PaginationControls
            currentPage={currentPage}
            limit={limit}
            totalReviews={totalReviews}
            onLoadMore={handleLoadMore}
            isLoading={isLoadingMore}
            showButton={false}
          />

          <ReviewListDisplay reviews={reviews} />

          <PaginationControls
            currentPage={currentPage}
            limit={limit}
            totalReviews={totalReviews}
            onLoadMore={handleLoadMore}
            isLoading={isLoadingMore}
            showCounter={false}
          />
        </>
      )}

      {!isLoading && !error && !reviewSummary && (
        <p className="mt-6 text-sm text-[#74849a]">No hay reseñas disponibles por el momento.</p>
      )}
    </section>
  );
}