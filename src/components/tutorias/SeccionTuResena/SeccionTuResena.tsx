'use client';

import { StarRatingInput } from '@/components/ui/StarRatingInput/StarRatingInput';

interface SeccionTuResenaProps {
  readonly rating: number;
  readonly comment?: string | null;
}

export function SeccionTuResena({ rating, comment }: SeccionTuResenaProps) {
  return (
    <section>
      <h3 className="mb-3 text-[14px] font-bold leading-none text-primary">Tu Reseña</h3>

      <div className="rounded-lg border border-[#f3c88f] border-l-[3px] border-l-[#f0aa31] bg-[#fffdf9] p-4">
        <div className="flex items-center gap-3">
          <StarRatingInput
            rating={rating}
            onRatingChange={() => {}}
            readOnly
            starSize={14}
          />
          <span className="text-[14px] font-semibold text-primary">{rating}/5</span>
        </div>

        {comment && (
          <p className="mt-3 text-sm italic text-[#334155]">&ldquo;{comment}&rdquo;</p>
        )}
      </div>
    </section>
  );
}
