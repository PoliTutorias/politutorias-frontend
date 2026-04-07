'use client';

interface PaginationControlsProps {
  currentPage: number;
  limit: number;
  totalReviews: number;
  onLoadMore: () => void;
  isLoading?: boolean;
}

export default function PaginationControls({
  currentPage,
  limit,
  totalReviews,
  onLoadMore,
  isLoading = false,
}: PaginationControlsProps) {
  const showingCount = Math.min(currentPage * limit, totalReviews);
  const hasMore = showingCount < totalReviews;

  return (
    <div className="mt-5">
      <p className="text-sm text-[#76869d]">
        Mostrando {showingCount} de {totalReviews} reseñas
      </p>

      {hasMore && (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={onLoadMore}
            disabled={isLoading}
            className="inline-flex min-w-40 items-center justify-center rounded-lg border border-[#cfd8e5] bg-white px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-[#f5f8fc] focus:outline-none focus:ring-2 focus:ring-[#9db4d4] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Cargando...' : 'Ver más reseñas'}
          </button>
        </div>
      )}
    </div>
  );
}