'use client';

import clsx from 'clsx';

interface SessionCardProps {
  id: string;
  time: string;
  courseName: string;
  studentName: string;
  isPast?: boolean;
  isHighlighted?: boolean;
  compact?: boolean;
  onSessionClick?: (sessionId: string) => void;
}

export function SessionCard({
  id,
  time,
  courseName,
  studentName,
  isPast = false,
  isHighlighted = false,
  compact = false,
  onSessionClick,
}: SessionCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSessionClick?.(id)}
      className={clsx(
        'w-full rounded-2xl border px-4 py-3 text-left transition-colors',
        isPast
          ? 'border-[#e4e8ef] bg-[#f5f7fb]'
          : isHighlighted
            ? 'border-[#f2d7a6] border-l-3 border-l-[#f4ad2f] bg-[#fff8ec]'
            : 'border-[#f2d7a6] border-l-3 border-l-[#f4ad2f] bg-[#fff8ec]'
      )}
    >
      <p className={clsx(compact ? 'text-[11px]' : 'text-[13px]', 'font-bold', isPast ? 'text-[#8798b2]' : 'text-[#12223f]')}>
        {time} - {courseName}
      </p>
      <p className={clsx('mt-1', compact ? 'text-[10px]' : 'text-[11px]', isPast ? 'text-[#a2b0c3]' : 'text-[#3b4e6b]')}>
        {studentName}
      </p>
      <p className={clsx('mt-2 text-[#9aa8bd]', compact ? 'text-[9px]' : 'text-[10px]')}>Toca para ver detalles -&gt;</p>
    </button>
  );
}
