'use client';

import { CheckCircle2, Clock3, XCircle } from 'lucide-react';
import clsx from 'clsx';
import { TutorialHistoryItemDto } from '@/interfaces/tutorial/tutorial';

interface TutorialCardProps {
  readonly tutorial: TutorialHistoryItemDto;
  readonly onClick: (id: string) => void;
  readonly onReportInasistencia?: (id: string) => void;
}

export function TutorialCard({ tutorial, onClick, onReportInasistencia }: TutorialCardProps) {
  const isInasistencia = tutorial.estado === 'inasistencia';
  const showActionButtons = tutorial.estado === 'sin confirmar';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(tutorial.id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(tutorial.id); }}
      className="group w-full cursor-pointer rounded-xl border border-[#e4e9f0] bg-white px-4 py-3.5 text-left transition-shadow hover:shadow-[0_8px_18px_rgba(31,43,61,0.08)]"
      aria-label={`Ver detalle de la tutoria ${tutorial.offerTitle}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={clsx(
            'w-0.5 self-stretch rounded-full',
            isInasistencia ? 'bg-[#e53935]' : 'bg-[#efb047]'
          )}
        />

        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#152c53] text-[18px] font-semibold leading-none text-white">
          {tutorial.studentInitials}
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-bold leading-tight text-[#1f2b3d]">{tutorial.offerTitle}</p>
          <p className="text-[13px] text-[#6f8199]">{tutorial.studentName}</p>
          <div className="mt-2 rounded-md bg-[#f1f5f9] px-3 py-1.5 text-[12px] text-[#62758f]">
            <span className="inline-flex items-center gap-1">
              <Clock3 size={12} />
              {tutorial.date} a las {tutorial.time}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {showActionButtons && (
            <>
              <span className="inline-flex items-center gap-1 rounded-full border border-[#43a047] px-3 py-1.5 text-[13px] font-medium text-[#43a047]">
                <CheckCircle2 size={14} />
                Completada
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onReportInasistencia?.(tutorial.id);
                }}
                className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-[#e53935] px-3 py-1.5 text-[13px] font-medium text-[#e53935] transition-colors hover:bg-[#fef2f2]"
              >
                <XCircle size={14} />
                Inasistencia
              </button>
            </>
          )}

          {isInasistencia && (
            <span className="inline-flex items-center gap-1 rounded-full border border-[#e53935] px-3 py-1.5 text-[13px] font-medium text-[#e53935]">
              <XCircle size={14} />
              Inasistencia
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
