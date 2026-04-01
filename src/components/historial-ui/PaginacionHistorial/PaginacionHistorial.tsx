'use client';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginacionHistorialProps {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly onPageChange: (page: number) => void;
}

export function PaginacionHistorial({
  currentPage,
  totalPages,
  onPageChange,
}: PaginacionHistorialProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Paginación">
      {/* Botón anterior */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#64748b] transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Página anterior"
      >
        <FiChevronLeft size={18} />
      </button>

      {/* Espacio para números de página */}

      {/* Botón siguiente */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#64748b] transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Página siguiente"
      >
        <FiChevronRight size={18} />
      </button>
    </nav>
  );
}
