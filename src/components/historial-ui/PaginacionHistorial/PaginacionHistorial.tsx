'use client';

import clsx from 'clsx';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginacionHistorialProps {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly onPageChange: (page: number) => void;
}

function getPageNumbers(currentPage: number, totalPages: number): number[] {
  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return pages;
}

export function PaginacionHistorial({
  currentPage,
  totalPages,
  onPageChange,
}: PaginacionHistorialProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Paginación">
      {/* Botón anterior */}
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#64748b] transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Página anterior"
      >
        <FiChevronLeft size={18} />
      </button>

      {/* Números de página */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={clsx(
            'flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition-colors',
            page === currentPage
              ? 'bg-primary text-white'
              : 'text-[#64748b] hover:bg-slate-100',
          )}
          aria-current={page === currentPage ? 'page' : undefined}
          aria-label={`Página ${page}`}
        >
          {page}
        </button>
      ))}

      {/* Botón siguiente */}
      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#64748b] transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Página siguiente"
      >
        <FiChevronRight size={18} />
      </button>
    </nav>
  );
}
