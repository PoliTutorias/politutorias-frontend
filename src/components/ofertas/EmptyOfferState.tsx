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
    <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center flex-grow flex flex-col items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#A0AEC0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mb-4"
      >
        <path d="M12 7v14" />
        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
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
