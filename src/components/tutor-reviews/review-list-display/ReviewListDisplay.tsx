'use client';

import type { ReviewDto } from '@/interfaces/reviews/review-dtos';
import ReviewCard from '@/components/tutor-reviews/review-card/ReviewCard';

interface ReviewListDisplayProps {
  reviews: ReviewDto[];
}

export default function ReviewListDisplay({ reviews }: ReviewListDisplayProps) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}