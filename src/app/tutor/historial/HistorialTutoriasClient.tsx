'use client';

import { useState } from 'react';
import { getTutorialHistoryAction } from '@/actions/tutorials/getTutorialHistoryAction';
import { HistoryResponse } from '@/interfaces/tutorial/tutorial';
import { MetricCardsDisplay } from '@/app/tutor/historial/components/MetricCardsDisplay/MetricCardsDisplay';
import { TutorialHistoryList } from '@/app/tutor/historial/components/TutorialHistoryList/TutorialHistoryList';
import { PaginationControls } from '@/components/common/PaginationControls/PaginationControls';
import { TutorialDetailModal } from '@/app/tutor/historial/components/TutorialDetailModal/TutorialDetailModal';

const ITEMS_PER_PAGE = 5;

interface HistorialTutoriasClientProps {
  readonly initialHistory: HistoryResponse;
}

export function HistorialTutoriasClient({ initialHistory }: HistorialTutoriasClientProps) {
  const [historyData, setHistoryData] = useState<HistoryResponse>(initialHistory);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTutorialId, setSelectedTutorialId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCardClick = (id: string): void => {
    setSelectedTutorialId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedTutorialId(null);
  };

  const handlePageChange = async (page: number): Promise<void> => {
    if (isLoading || page === currentPage) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const nextHistory = await getTutorialHistoryAction(page, ITEMS_PER_PAGE);
      setHistoryData(nextHistory);
      setCurrentPage(nextHistory.paginatedData.page);
    } catch {
      setError('No se pudo actualizar el historial. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <section className="rounded-xl border border-[#f3c8c8] bg-[#fff1f1] px-4 py-3 text-[13px] text-[#a13f3f]">
        {error}
      </section>
    );
  }

  return (
    <section className="flex min-h-[calc(100vh-250px)] flex-col gap-4">
      <MetricCardsDisplay summary={historyData.summary} />

      <TutorialHistoryList items={historyData.paginatedData.items} onCardClick={handleCardClick} />

      <PaginationControls
        totalItems={historyData.paginatedData.total}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />

      {isLoading && <p className="text-[12px] text-[#6d7f95]">Cargando...</p>}

      <TutorialDetailModal tutorialId={selectedTutorialId} isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
}
