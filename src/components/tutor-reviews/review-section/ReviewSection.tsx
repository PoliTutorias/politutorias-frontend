'use client';

import RatingSummaryDisplay from '@/components/tutor-reviews/rating-summary-display/RatingSummaryDisplay';
import ReviewListDisplay from '@/components/tutor-reviews/review-list-display/ReviewListDisplay';
import { tutorReviewsSeed } from '@/seed/TutorReviewsSeedData';

interface ReviewSectionProps {
  tutorId: string;
}

export default function ReviewSection({ tutorId }: ReviewSectionProps) {
  return (
    <section className="rounded-lg bg-white p-6" data-tutor-id={tutorId}>
      <h2 className="text-2xl font-extrabold text-primary">Reseñas de Estudiantes</h2>

      <div className="mt-6">
        <RatingSummaryDisplay summary={tutorReviewsSeed.summary} />
      </div>

      <hr className="my-6 border-[#e7ebf0]" />

      <p className="mb-4 text-sm text-[#74849a]">
        Mostrando {tutorReviewsSeed.data.length} de {tutorReviewsSeed.total} reseñas
      </p>

      <ReviewListDisplay reviews={tutorReviewsSeed.data} />
    </section>
  );
}