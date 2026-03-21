'use client';

import clsx from 'clsx';

interface SessionCardProps {
  id: string;
  time: string;
  courseName: string;
  studentName: string;
  isPast?: boolean;
  isHighlighted?: boolean;
  onSessionClick?: (sessionId: string) => void;
}

export function SessionCard({
  id,
  time,
  courseName,
  studentName,
  isPast = false,
  isHighlighted = false,
  onSessionClick,
}: SessionCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSessionClick?.(id)}
      className={clsx(
        'w-full rounded-2xl border px-4 py-3 text-left transition-colors',
        isHighlighted
          ? 'border-[#f5b43f] bg-[#fff8ec]'
          : isPast
            ? 'border-[#e4e8ef] bg-[#f5f7fb]'
            : 'border-[#e6ebf2] bg-white hover:bg-[#f8fbff]'
      )}
    >
      <p className={clsx('text-[18px] font-bold', isPast ? 'text-[#8798b2]' : 'text-[#12223f]')}>
        {time} - {courseName}
      </p>
      <p className={clsx('mt-1 text-[18px]', isPast ? 'text-[#a2b0c3]' : 'text-[#3b4e6b]')}>{studentName}</p>
      <p className="mt-2 text-base text-[#9aa8bd]">Toca para ver detalles -&gt;</p>
    </button>
  );
}
