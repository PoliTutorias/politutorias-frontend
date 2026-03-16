'use client';

import clsx from 'clsx';

interface PaginationComponentProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

function getPaginationItems(totalPages: number): number[] {
  const safeTotalPages = Math.max(1, totalPages);
  return Array.from({ length: safeTotalPages }, (_, index) => index + 1);
}

export function PaginationComponent({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  isLoading = false,
}: PaginationComponentProps) {
  const pages = getPaginationItems(totalPages);
  const showNavArrows = pages.length > 1;
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < pages.length;

  const handlePageClick = (page: number) => {
    if (isLoading || page === currentPage) {
      return;
    }

    onPageChange(page);
  };

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      {showNavArrows && (
        <button
          className={clsx(
            'px-2 py-1 transition-colors',
            canGoPrev && !isLoading ? 'text-slate-600 hover:text-primary' : 'cursor-not-allowed text-slate-300'
          )}
          type="button"
          aria-label="Pagina anterior"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={!canGoPrev || isLoading}
        >
          &lt;
        </button>
      )}
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          onClick={() => handlePageClick(pageNumber)}
          disabled={isLoading || pageNumber === currentPage}
          className={clsx(
            'h-8 min-w-8 rounded-md px-3 text-sm font-semibold transition-colors',
            pageNumber === currentPage
              ? 'cursor-default bg-primary text-white'
              : 'text-slate-600 hover:bg-slate-100',
            isLoading && 'cursor-not-allowed opacity-60'
          )}
        >
          {pageNumber}
        </button>
      ))}
      {showNavArrows && (
        <button
          className={clsx(
            'px-2 py-1 transition-colors',
            canGoNext && !isLoading ? 'text-slate-600 hover:text-primary' : 'cursor-not-allowed text-slate-300'
          )}
          type="button"
          aria-label="Pagina siguiente"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={!canGoNext || isLoading}
        >
          &gt;
        </button>
      )}
    </div>
  );
}
