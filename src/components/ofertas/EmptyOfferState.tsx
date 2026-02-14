'use client';

interface EmptyOfferStateProps {
  onCreateClick?: () => void;
  showButton?: boolean;
}

/**
 * Estado vacío cuando no hay ofertas de tutoría
 */
export function EmptyOfferState({ onCreateClick, showButton = false }: EmptyOfferStateProps) {
  return (
    <div className="bg-white rounded-lg border border-[var(--border)] p-12 text-center flex-grow flex flex-col items-center justify-center">
      <svg
        className="h-12 w-12 text-[var(--text-secondary)] mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C6.5 6.253 2 10.753 2 16.25s4.5 10 10 10 10-4.5 10-10S17.5 6.253 12 6.253z"
        />
      </svg>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        No tienes ofertas activas
      </h3>
      <p className="text-[var(--text-secondary)] mb-6 max-w-md">
        Publica tu primera oferta para que los estudiantes te encuentren
      </p>
      {showButton && onCreateClick && (
        <button
          onClick={onCreateClick}
          className="bg-[var(--primary)] text-white px-6 py-2 rounded-md font-semibold hover:bg-[var(--primary-dark)] transition-colors inline-flex items-center gap-2 cursor-pointer"
        >
          <span className="text-lg">+</span>
          Crear mi primera oferta
        </button>
      )}
    </div>
  );
}
