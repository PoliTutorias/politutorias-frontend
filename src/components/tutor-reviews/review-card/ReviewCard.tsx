'use client';

import { FaRegStar, FaStar } from 'react-icons/fa';
import type { ReviewDto } from '@/interfaces/reviews/review-dtos';

interface ReviewCardProps {
  review: ReviewDto;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'NA';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function formatReviewDate(isoDate: string): string {
  const date = new Date(isoDate);

  return new Intl.DateTimeFormat('es-EC', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
    .format(date)
    .replace('.', '');
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const showComment = review.comment.trim().length > 0;

  return (
    <article className="rounded-xl border border-[#e7ebf0] bg-[#f7fafd] p-4 md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          {review.studentAvatarUrl ? (
            <img
              src={review.studentAvatarUrl}
              alt={review.studentName}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e1e7ef] text-sm font-semibold text-primary">
              {getInitials(review.studentName)}
            </div>
          )}

          <div className="min-w-0">
            <h4 className="truncate text-sm font-bold text-primary">{review.studentName}</h4>

            <div className="mt-1 flex items-center gap-0.5 text-[12px] text-[#f2a21f]">
              {Array.from({ length: 5 }, (_, index) => {
                const starNumber = index + 1;
                return starNumber <= review.stars ? (
                  <FaStar key={starNumber} size={12} />
                ) : (
                  <FaRegStar key={starNumber} size={12} className="text-[#d6dee8]" />
                );
              })}
            </div>
          </div>
        </div>

        <p className="text-xs font-medium text-[#9aa7ba]">{formatReviewDate(review.date)}</p>
      </div>

      <p className="mt-3 text-xs font-semibold text-[#4b95dd]">Tutoria: {review.tutoringSubject}</p>

      {showComment ? (
        <p className="mt-2 text-sm text-[#506079]">&quot;{review.comment}&quot;</p>
      ) : (
        <p className="mt-2 text-sm italic text-[#7d8ca3]">Sin comentario</p>
      )}
    </article>
  );
}