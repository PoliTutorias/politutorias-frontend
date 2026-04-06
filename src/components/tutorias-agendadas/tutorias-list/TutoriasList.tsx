'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TutoriasAgendadasDTO } from '@/interfaces/tutorias-agendadas/TutoriasAgendadasDTO';
import { TutoriasCard } from '@/components/tutorias-agendadas/tutorias-card/TutoriasCard';
import { DetallesSesionModal } from '@/components/modals/detalles-sesion-modal/DetallesSesionModal';

interface TutoriasListProps {
  readonly tutorias: TutoriasAgendadasDTO[];
  readonly totalProximas: number;
  readonly currentPage: number;
  readonly totalPages: number;
}

function toDateTime(tutoria: TutoriasAgendadasDTO): Date {
  return new Date(`${tutoria.fecha}T${tutoria.hora}:00`);
}

export function TutoriasList({ tutorias, totalProximas, currentPage, totalPages }: TutoriasListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [referenceNow] = useState(() => Date.now());
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
    return tutorias
      .filter((tutoria) => tutoria.estado === 'AGENDADA' && toDateTime(tutoria).getTime() > referenceNow)
      .sort((a, b) => toDateTime(a).getTime() - toDateTime(b).getTime());
  }, [referenceNow, tutorias]);

  const safeCurrentPage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages));
  const canGoPrev = safeCurrentPage > 1;
  const canGoNext = safeCurrentPage < Math.max(1, totalPages);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (nextPage: number) => {
    const safeNextPage = Math.min(Math.max(1, nextPage), Math.max(1, totalPages));
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(safeNextPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="flex flex-1 flex-col">
      {upcomingTutorias.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-600">
          No tienes tutorias proximas agendadas por ahora.
        </div>
      ) : (
        <div className="space-y-3">
          {upcomingTutorias.map((tutoria) => (
            <TutoriasCard
              key={tutoria.id}
              tutoria={tutoria}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      )}

      {/* ── PAGINACION ────────────────────────────────────────────── */}
      {totalProximas > 5 && (
        <div className="mt-auto pt-6 flex items-center justify-center gap-4 text-base">
          <button
            type="button"
            aria-label="Pagina anterior"
            disabled={!canGoPrev}
            onClick={() => canGoPrev && handlePageChange(safeCurrentPage - 1)}
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
              onClick={() => handlePageChange(page)}
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
            onClick={() => canGoNext && handlePageChange(safeCurrentPage + 1)}
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

