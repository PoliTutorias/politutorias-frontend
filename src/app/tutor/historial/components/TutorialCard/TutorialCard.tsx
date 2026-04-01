'use client';

import { CheckCircle2, Clock3 } from 'lucide-react';
import { TutorialHistoryItemDto } from '@/interfaces/tutorial/tutorial';

interface TutorialCardProps {
  readonly tutorial: TutorialHistoryItemDto;
  readonly onClick: (id: string) => void;
  readonly onComplete: (id: string) => Promise<void>;
}

export function TutorialCard({ tutorial, onClick, onComplete }: TutorialCardProps) {
  const isSinConfirmar = tutorial.estado === 'SIN_CONFIRMAR';
  const isCompletada = tutorial.estado === 'Completada';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(tutorial.id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(tutorial.id); }}
      className="w-full cursor-pointer rounded-xl border border-[#e4e9f0] bg-white px-5 py-4 text-left transition-shadow hover:shadow-[0_8px_18px_rgba(31,43,61,0.08)]"
      aria-label={`Ver detalle de la tutoria ${tutorial.offerTitle}`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-0.5 self-stretch rounded-full ${isCompletada ? 'bg-[#33a05f]' : 'bg-[#efb047]'}`} />

        <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#152c53] text-[16px] font-semibold leading-none text-white">
          {tutorial.studentInitials}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-bold leading-tight text-[#1f2b3d]">{tutorial.offerTitle}</p>
              <p className="mt-0.5 text-[13px] text-[#6f8199]">{tutorial.studentName}</p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {isSinConfirmar && (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    void onComplete(tutorial.id);
                  }}
                  className="inline-flex items-center rounded-[7px] border border-[#4cbf78] px-3 py-1 text-[13px] font-semibold text-[#1d9954] transition-colors hover:bg-[#2fa964] hover:text-white"
                >
                  <span className='flex gap-1 items-center justify-center'>
                  <CheckCircle2 size={14} />
                  Completada
                  </span>
                </button>
              )}

              {isCompletada && (
                <span className="pointer-events-none inline-flex select-none items-center gap-1 rounded-full border border-[#86d9a4] bg-[#e8f8ee] px-2 py-1 text-[13px] font-semibold text-[#2f8f56]">
                  <CheckCircle2 size={14} />
                  Completada
                </span>
              )}
            </div>
          </div>

          <div className="mt-2 rounded-md bg-[#f1f5f9] px-3 py-1.5 text-[12px] text-[#62758f]">
            <span className="inline-flex items-center gap-1">
              <Clock3 size={12} />
              {tutorial.date} a las {tutorial.time}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
