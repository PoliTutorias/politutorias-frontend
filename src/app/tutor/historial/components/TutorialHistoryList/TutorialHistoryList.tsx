'use client';

import { TutorialHistoryItemDto } from '@/interfaces/tutorial/tutorial';
import { TutorialCard } from '@/app/tutor/historial/components/TutorialCard/TutorialCard';

interface TutorialHistoryListProps {
  readonly items: TutorialHistoryItemDto[];
  readonly onCardClick: (id: string) => void;
  readonly onReportInasistencia?: (id: string) => void;
}

export function TutorialHistoryList({ items, onCardClick, onReportInasistencia }: TutorialHistoryListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-[#e4e9f0] bg-white px-4 py-4 text-[13px] text-[#6f8199]">
        No hay tutorias finalizadas para mostrar.
      </div>
    );
  }

  return (
    <section className="space-y-3" aria-label="Listado de tutorias impartidas">
      {items.map((tutorial) => (
        <TutorialCard
          key={tutorial.id}
          tutorial={tutorial}
          onClick={onCardClick}
          onReportInasistencia={onReportInasistencia}
        />
      ))}
    </section>
  );
}
