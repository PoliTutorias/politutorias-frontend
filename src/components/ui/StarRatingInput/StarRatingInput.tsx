'use client';

import { FaStar } from 'react-icons/fa';
import clsx from 'clsx';

interface StarRatingInputProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  readOnly?: boolean;
  className?: string;
  starSize?: number;
}

export function StarRatingInput({
  rating,
  onRatingChange,
  readOnly = false,
  className,
  starSize = 32,
}: StarRatingInputProps) {
  return (
    <div className={clsx('flex gap-2', className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readOnly && onRatingChange(star)}
          disabled={readOnly}
          className={clsx(
            'transition-all duration-200',
            readOnly && 'cursor-default',
            !readOnly && 'cursor-pointer hover:scale-110',
          )}
          aria-label={`Calificación${star === 1 ? '' : ' ' + star}`}
        >
          <FaStar
            size={starSize}
            className={clsx(
              'transition-colors duration-200',
              star <= rating ? 'text-amber-400' : 'text-gray-300',
            )}
          />
        </button>
      ))}
    </div>
  );
}
