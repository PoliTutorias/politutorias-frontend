'use client';

import clsx from 'clsx';

interface PaginationComponentProps {
  readonly totalItems: number;
  readonly itemsPerPage: number;
  readonly currentPage: number;
  readonly onPageChange: (page: number) => void;
}

export function PaginationComponent({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationComponentProps) {
  const safeItemsPerPage = Math.max(1, itemsPerPage);
  const totalPages = Math.max(1, Math.ceil(totalItems / safeItemsPerPage));

  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="mt-4 flex items-center justify-center gap-3">
      <button
        type="button"
        aria-label="Página anterior"
        onClick={() => canGoPrev && onPageChange(currentPage - 1)}
        disabled={!canGoPrev}
        className={clsx(
          'px-2 py-1 text-xl transition-colors',
          canGoPrev ? 'text-slate-500 hover:text-primary' : 'cursor-not-allowed text-slate-300'
        )}
      >
        {'<'}
      </button>

      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          onClick={() => onPageChange(pageNumber)}
          disabled={pageNumber === currentPage}
          className={clsx(
            'h-10 min-w-10 rounded-lg px-3 text-xl font-semibold transition-colors',
            pageNumber === currentPage
              ? 'cursor-default bg-primary text-white'
              : 'text-slate-600 hover:bg-slate-100',
          )}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        aria-label="Página siguiente"
        onClick={() => canGoNext && onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className={clsx(
          'px-2 py-1 text-xl transition-colors',
          canGoNext ? 'text-slate-500 hover:text-primary' : 'cursor-not-allowed text-slate-300'
        )}
      >
        {'>'}
      </button>
    </div>
  );
}
