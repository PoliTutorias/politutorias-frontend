'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

export function PaginationControls({
  currentPage,
  totalPages,
}: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Generar números de página
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Navegar a una página específica
  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  // Navegar a la página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  // Navegar a la página siguiente
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-10 flex items-center justify-center gap-1.5">
      {/* Botón anterior */}
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className="flex h-7 w-7 items-center justify-center rounded border border-gray-300 text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Página anterior"
      >
        <IoChevronBack className="h-4 w-4" />
      </button>

      {/* Números de página */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`flex h-7 w-7 items-center justify-center rounded text-xs font-medium transition-colors ${currentPage === page
              ? 'bg-gray-900 text-white' // Página activa
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300' // Página inactiva
            }`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {/* Botón siguiente */}
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="flex h-7 w-7 items-center justify-center rounded border border-gray-300 text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Página siguiente"
      >
        <IoChevronForward className="h-4 w-4" />
      </button>
    </div>
  );
}
