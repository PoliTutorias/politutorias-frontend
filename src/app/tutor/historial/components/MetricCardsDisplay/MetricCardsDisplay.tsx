'use client';

import { BookOpen, CircleCheck, Star } from 'lucide-react';
import { TutorialSummaryDto } from '@/interfaces/tutorial/tutorial';

interface MetricCardsDisplayProps {
  readonly summary: TutorialSummaryDto;
}

export function MetricCardsDisplay({ summary }: MetricCardsDisplayProps) {
  return (
    <section className="grid grid-cols-1 gap-3 md:grid-cols-3" aria-label="Metricas del historial">
      <article className="min-h-23 rounded-xl border border-[#e4e9f0] bg-white px-4 py-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#e8f8ee] text-[#33a05f]">
            <CircleCheck size={11} />
          </span>
          <p className="text-[20px] font-bold leading-none text-[#1f2b3d]">{summary.completedTutorials}</p>
        </div>
        <p className="mt-1 text-[12px] text-[#7b8ea7]">Tutorias completadas</p>
      </article>

      <article className="min-h-23 rounded-xl border border-[#e4e9f0] bg-white px-4 py-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded bg-[#eef5ff] text-[#365f99]">
            <BookOpen size={10} />
          </span>
          <p className="text-[20px] font-bold leading-none text-[#1f2b3d]">{summary.subjectsTaught}</p>
        </div>
        <p className="mt-1 text-[12px] text-[#7b8ea7]">Materias impartidas</p>
      </article>

      <article className="min-h-23 rounded-xl border border-[#e4e9f0] bg-white px-4 py-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded bg-[#fff7e4] text-[#ce9a2f]">
            <Star size={10} />
          </span>
          <p className="text-[20px] font-bold leading-none text-[#1f2b3d]">{summary.studentsQualified}</p>
        </div>
        <p className="mt-1 text-[12px] text-[#7b8ea7]">Estudiantes que califican</p>
      </article>
    </section>
  );
}
