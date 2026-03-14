'use client';

import clsx from 'clsx';

interface PaginationComponentProps {
  currentPage?: number;
  totalPages?: number;
}

export function PaginationComponent({
  currentPage = 1,
  totalPages = 2,
}: PaginationComponentProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <button className="px-2 py-1 text-slate-400" type="button" aria-label="Pagina anterior">
        &lt;
      </button>
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          className={clsx(
            'h-8 min-w-8 rounded-md px-3 text-sm font-semibold',
            pageNumber === currentPage
              ? 'bg-[var(--primary)] text-white'
              : 'text-slate-600 hover:bg-slate-100'
          )}
        >
          {pageNumber}
        </button>
      ))}
      <button className="px-2 py-1 text-slate-400" type="button" aria-label="Pagina siguiente">
        &gt;
      </button>
    </div>
  );
}
