'use client';

import { useState } from 'react';
import { getTutorialHistoryAction } from '@/actions/tutorials/getTutorialHistoryAction';
import { getTutorialDetailAction } from '@/actions/tutorials/getTutorialDetailAction';
import { HistoryResponse } from '@/interfaces/tutorial/tutorial';

interface HistorialTutoriasClientProps {
  readonly initialHistory: HistoryResponse;
}

export function HistorialTutoriasClient({ initialHistory }: HistorialTutoriasClientProps) {
  const [currentPage] = useState<number>(1);
  const [isModalOpen] = useState<boolean>(false);
  const [selectedTutorialId] = useState<string | null>(null);
  const [isLoading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  void getTutorialHistoryAction;
  void getTutorialDetailAction;
  void currentPage;
  void isModalOpen;
  void selectedTutorialId;

  if (error) {
    return (
      <section className="rounded-2xl border border-[#f3c8c8] bg-[#fff1f1] px-4 py-3 text-[13px] text-[#a13f3f]">
        {error}
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="h-20 rounded-xl border border-[#e3e8ef] bg-white" />
        <div className="h-20 rounded-xl border border-[#e3e8ef] bg-white" />
        <div className="h-20 rounded-xl border border-[#e3e8ef] bg-white" />
      </div>

      <div className="space-y-3">
        {initialHistory.paginatedData.items.map((item) => (
          <div key={item.id} className="h-20 rounded-xl border border-[#e3e8ef] bg-white" />
        ))}
      </div>

      <div className="h-10" />

      {isLoading && <p className="text-[12px] text-[#6d7f95]">Cargando...</p>}
    </section>
  );
}
