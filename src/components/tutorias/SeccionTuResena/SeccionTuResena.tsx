'use client';

import { StarRatingInput } from '@/components/ui/StarRatingInput/StarRatingInput';

interface SeccionTuResenaProps {
  readonly rating: number;
  readonly comment?: string | null;
}

export function SeccionTuResena({ rating, comment }: SeccionTuResenaProps) {
  return (
    <section className="rounded-xl border border-[#f0aa31] bg-[#fffbf0] p-4">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#f0aa31]">
        Tu Reseña
      </h3>
      <div className="flex items-start gap-3">
        <StarRatingInput rating={rating} onRatingChange={() => {}} readOnly className="flex-1" />
        <span className="text-sm font-semibold text-primary">{rating}/5</span>
      </div>
      {comment && (
        <p className="mt-3 text-sm text-[#64748b]">
          &ldquo;{comment}&rdquo;
        </p>
      )}
    </section>
  );
}
