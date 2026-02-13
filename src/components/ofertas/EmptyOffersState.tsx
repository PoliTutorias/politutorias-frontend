'use client';

interface EmptyOffersStateProps {
  onCreateOfertaClick?: () => void;
}

/**
 * Componente que renderiza el estado vacío cuando el tutor no tiene ofertas
 */
export function EmptyOffersState({ onCreateOfertaClick }: EmptyOffersStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          No tienes ofertas activas
        </h2>
        <p className="text-gray-600 text-base mb-8">
          Publica tu primera oferta para que los estudiantes te encuentren
        </p>
        <button
          onClick={onCreateOfertaClick}
          className="px-6 py-2 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition"
        </button>
    </div>
    </div >
  );
}
