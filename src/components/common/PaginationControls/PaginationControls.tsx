'use client';

import clsx from 'clsx';

interface PaginationControlsProps {
  readonly totalItems: number;
  readonly itemsPerPage: number;
  readonly currentPage: number;
  readonly onPageChange: (page: number) => void;
  readonly isLoading?: boolean;
}

export function PaginationControls({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  isLoading = false,
}: PaginationControlsProps) {
  const safeItemsPerPage = Math.max(1, itemsPerPage);
  const totalPages = Math.max(1, Math.ceil(totalItems / safeItemsPerPage));

  if (totalItems <= safeItemsPerPage) {
    return null;
  }

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (targetPage: number) => {
    if (isLoading || targetPage === currentPage || targetPage < 1 || targetPage > totalPages) {
      return;
    }

    onPageChange(targetPage);
  };

  return (
    <div className="mt-4 flex items-center justify-center gap-2" aria-label="Controles de paginacion">
      <button
        type="button"
        aria-label="Pagina anterior"
        disabled={!canGoPrev || isLoading}
        onClick={() => handlePageChange(currentPage - 1)}
        className={clsx(
          'rounded px-2 py-1 text-[18px] leading-none transition-colors',
          canGoPrev && !isLoading ? 'text-[#71839c] hover:text-[#1f2b3d]' : 'cursor-not-allowed text-[#cad3df]'
        )}
      >
        {'<'}
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => handlePageChange(page)}
          disabled={isLoading || page === currentPage}
          className={clsx(
            'h-8 min-w-8 rounded-md px-2 text-[13px] font-semibold transition-colors',
            page === currentPage ? 'bg-[#0f2245] text-white' : 'text-[#5c6f88] hover:bg-[#e8edf4]',
            isLoading && 'cursor-not-allowed opacity-70'
          )}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        aria-label="Pagina siguiente"
        disabled={!canGoNext || isLoading}
        onClick={() => handlePageChange(currentPage + 1)}
        className={clsx(
          'rounded px-2 py-1 text-[18px] leading-none transition-colors',
          canGoNext && !isLoading ? 'text-[#71839c] hover:text-[#1f2b3d]' : 'cursor-not-allowed text-[#cad3df]'
        )}
      >
        {'>'}
      </button>
    </div>
  );
}
