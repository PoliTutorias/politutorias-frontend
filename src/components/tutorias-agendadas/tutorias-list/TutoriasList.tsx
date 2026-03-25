'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { TutoriasAgendadasDTO } from '@/interfaces/tutorias-agendadas/TutoriasAgendadasDTO';
import { TutoriasCard } from '@/components/tutorias-agendadas/tutorias-card/TutoriasCard';
import { DetallesSesionModal } from '@/components/modals/detalles-sesion-modal/DetallesSesionModal';

interface TutoriasListProps {
  readonly tutorias: TutoriasAgendadasDTO[];
}

const ITEMS_PER_PAGE = 5;

function toDateTime(tutoria: TutoriasAgendadasDTO): Date {
  return new Date(`${tutoria.fecha}T${tutoria.hora}:00`);
}

export function TutoriasList({ tutorias }: TutoriasListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTutoria, setSelectedTutoria] = useState<TutoriasAgendadasDTO | null>(null);

  const handleCardClick = (tutoria: TutoriasAgendadasDTO) => {
    setSelectedTutoria(tutoria);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTutoria(null);
  };

  const upcomingTutorias = useMemo(() => {
    const now = Date.now();

    return tutorias
      .filter((tutoria) => tutoria.estado === 'AGENDADA' && toDateTime(tutoria).getTime() > now)
      .sort((a, b) => toDateTime(a).getTime() - toDateTime(b).getTime());
  }, [tutorias]);

  const totalPages = Math.max(1, Math.ceil(upcomingTutorias.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageItems = useMemo(() => {
    const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return upcomingTutorias.slice(start, start + ITEMS_PER_PAGE);
  }, [safeCurrentPage, upcomingTutorias]);

  const canGoPrev = safeCurrentPage > 1;
  const canGoNext = safeCurrentPage < totalPages;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d7f95]">
          PROXIMAS ({upcomingTutorias.length})
        </h2>
      </div>

      {pageItems.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-600">
          No tienes tutorias proximas agendadas por ahora.
        </div>
      ) : (
        <div className="space-y-3">
          {pageItems.map((tutoria) => (
            <TutoriasCard
              key={tutoria.id}
              tutoria={tutoria}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4 text-base">
          <button
            type="button"
            aria-label="Pagina anterior"
            disabled={!canGoPrev}
            onClick={() => canGoPrev && setCurrentPage((prev) => prev - 1)}
            className={clsx(
              'rounded px-2 py-1 transition-colors',
              canGoPrev ? 'text-[#6d7f95] hover:text-primary' : 'cursor-not-allowed text-[#c5cfdb]'
            )}
          >
            <FiChevronLeft size={18} />
          </button>

          {pages.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={clsx(
                'h-8 min-w-8 rounded-md px-2 text-base font-semibold transition-colors',
                page === safeCurrentPage
                  ? 'bg-primary text-white'
                  : 'text-[#4b5f7a] hover:bg-[#e8edf3]'
              )}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            aria-label="Pagina siguiente"
            disabled={!canGoNext}
            onClick={() => canGoNext && setCurrentPage((prev) => prev + 1)}
            className={clsx(
              'rounded px-2 py-1 transition-colors',
              canGoNext ? 'text-[#6d7f95] hover:text-primary' : 'cursor-not-allowed text-[#c5cfdb]'
            )}
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      )}

      <DetallesSesionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        tutoria={selectedTutoria}
      />
    </section>
  );
}
