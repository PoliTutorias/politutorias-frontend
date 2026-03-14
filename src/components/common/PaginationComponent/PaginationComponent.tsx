'use client';

import clsx from 'clsx';

interface PaginationComponentProps {
  currentPage?: number;
  totalPages?: number;
}

function getPaginationItems(totalPages: number): number[] {
  const safeTotalPages = Math.max(1, totalPages);
  return Array.from({ length: safeTotalPages }, (_, index) => index + 1);
}

export function PaginationComponent({
  currentPage = 1,
  totalPages = 1,
}: PaginationComponentProps) {
  const pages = getPaginationItems(totalPages);
  const showNavArrows = pages.length > 1;

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      {showNavArrows && (
        <button className="px-2 py-1 text-slate-400" type="button" aria-label="Pagina anterior">
          &lt;
        </button>
      )}
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          className={clsx(
            'h-8 min-w-8 rounded-md px-3 text-sm font-semibold',
            pageNumber === currentPage
              ? 'bg-primary text-white'
              : 'text-slate-600 hover:bg-slate-100'
          )}
        >
          {pageNumber}
        </button>
      ))}
      {showNavArrows && (
        <button className="px-2 py-1 text-slate-400" type="button" aria-label="Pagina siguiente">
          &gt;
        </button>
      )}
    </div>
  );
}
