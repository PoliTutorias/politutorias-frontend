'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getTutorialHistoryAction } from '@/actions/tutorials/getTutorialHistoryAction';
import { marcarTutoriaCompletadaAction } from '@/actions/tutorials/marcarTutoriaCompletadaAction';
import { reportarInasistenciaAction } from '@/actions/tutoria/reportarInasistenciaAction';
import { HistoryResponse } from '@/interfaces/tutorial/tutorial';
import { MetricCardsDisplay } from '@/app/tutor/historial/components/MetricCardsDisplay/MetricCardsDisplay';
import { TutorialHistoryList } from '@/app/tutor/historial/components/TutorialHistoryList/TutorialHistoryList';
import { PaginationControls } from '@/components/common/PaginationControls/PaginationControls';
import { TutorialDetailModal } from '@/app/tutor/historial/components/TutorialDetailModal/TutorialDetailModal';
import { ConfirmModal } from '@/components/ui/confirm-modal/ConfirmModal';

const ITEMS_PER_PAGE = 5;

interface HistorialTutoriasClientProps {
  readonly initialHistory: HistoryResponse;
}

export function HistorialTutoriasClient({ initialHistory }: HistorialTutoriasClientProps) {
  const router = useRouter();
  const [historyData, setHistoryData] = useState<HistoryResponse>(initialHistory);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTutorialId, setSelectedTutorialId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [tutoriaIdToReport, setTutoriaIdToReport] = useState<string | null>(null);
  const [isReporting, setIsReporting] = useState<boolean>(false);

  const handleCardClick = (id: string): void => {
    setSelectedTutorialId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedTutorialId(null);
  };

  const handleRequestInasistencia = (id: string): void => {
    setTutoriaIdToReport(id);
    setIsConfirmModalOpen(true);
  };

  const handleCancelConfirm = (): void => {
    setIsConfirmModalOpen(false);
    setTutoriaIdToReport(null);
  };

  const handleConfirmInasistencia = async (): Promise<void> => {
    if (!tutoriaIdToReport || isReporting) {
      return;
    }

    setIsReporting(true);

    try {
      const result = await reportarInasistenciaAction(tutoriaIdToReport);

      if (!result.success) {
        toast.error(result.message || 'No se pudo reportar la inasistencia.');
        return;
      }

      setHistoryData((prev) => ({
        ...prev,
        paginatedData: {
          ...prev.paginatedData,
          items: prev.paginatedData.items.map((item) =>
            item.id === tutoriaIdToReport ? { ...item, estado: 'Inasistencia' as const } : item,
          ),
        },
      }));

      setIsConfirmModalOpen(false);
      setIsModalOpen(false);
      setSelectedTutorialId(null);
      setTutoriaIdToReport(null);
      toast.success('Inasistencia reportada con éxito.');
      router.refresh();
    } catch {
      toast.error('Error inesperado. Intenta nuevamente.');
    } finally {
      setIsReporting(false);
    }
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

  const handleCompletarTutoria = async (id: string): Promise<void> => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await marcarTutoriaCompletadaAction(id);

      if (!response.success) {
        setError(response.error || 'No se pudo marcar la tutoria como completada.');
        return;
      }

      setHistoryData((previous) => {
        const alreadyCompleted = previous.paginatedData.items.some((item) => item.id === id && item.estado === 'Completada');

        const updatedItems = previous.paginatedData.items.map((item) =>
          item.id === id
            ? {
                ...item,
                estado: 'Completada' as const,
              }
            : item,
        );

        return {
          ...previous,
          summary: {
            ...previous.summary,
            completedTutorials: alreadyCompleted ? previous.summary.completedTutorials : previous.summary.completedTutorials + 1,
          },
          paginatedData: {
            ...previous.paginatedData,
            items: updatedItems,
          },
        };
      });

      router.refresh();
    } catch {
      setError('No se pudo marcar la tutoria como completada.');
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

      <TutorialHistoryList
        items={historyData.paginatedData.items}
        onCardClick={handleCardClick}
        onComplete={handleCompletarTutoria}
        onReportInasistencia={handleRequestInasistencia}
      />

      <PaginationControls
        totalItems={historyData.paginatedData.total}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />

      {isLoading && <p className="text-[12px] text-[#6d7f95]">Cargando...</p>}

      <TutorialDetailModal
        tutorialId={selectedTutorialId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onComplete={handleCompletarTutoria}
        onReportInasistencia={handleRequestInasistencia}
        overrideEstado={historyData.paginatedData.items.find((item) => item.id === selectedTutorialId)?.estado}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title="Confirmar Inasistencia"
        message="Esta acción marcará la tutoría como inasistencia del estudiante. Esta acción no se puede deshacer."
        confirmLabel="Sí, reportar inasistencia"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmInasistencia}
        onCancel={handleCancelConfirm}
        isLoading={isReporting}
      />
    </section>
  );
}
