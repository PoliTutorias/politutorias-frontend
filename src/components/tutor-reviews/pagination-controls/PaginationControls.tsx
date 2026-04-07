'use client';

interface PaginationControlsProps {
  currentPage: number;
  limit: number;
  totalReviews: number;
  onLoadMore: () => void;
  isLoading?: boolean;
  showCounter?: boolean;
  showButton?: boolean;
}

export default function PaginationControls({
  currentPage,
  limit,
  totalReviews,
  onLoadMore,
  isLoading = false,
  showCounter = true,
  showButton = true,
}: PaginationControlsProps) {
  const showingCount = Math.min(currentPage * limit, totalReviews);
  const hasMore = showingCount < totalReviews;

  return (
    <div className="mt-5">
      {showCounter && (
        <p className="text-sm text-[#76869d] mb-4">
          Mostrando {showingCount} de {totalReviews} reseñas
        </p>
      )}

      {showButton && hasMore && (
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