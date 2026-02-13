'use client';

import { OfertaDto } from '@/interfaces/oferta/OfertaDto';
import { OfertaCard } from './OfertaCard';

interface MisOfertasSectionProps {
  offers: OfertaDto[];
  onNewOfertaClick?: () => void;
}

/**
 * Componente que renderiza el listado de ofertas del tutor
 * Muestra las tarjetas en una columna (1 por fila) y botón para crear nueva oferta
 */
export function MisOfertasSection({ offers, onNewOfertaClick }: MisOfertasSectionProps) {
  return (
    <div className="space-y-6">
      {/* Listado de ofertas - 1 por fila */}
      <div className="space-y-6">
        {offers.map((offer) => (
          <OfertaCard key={offer.id} offer={offer} />
        ))}
      </div>

      {/* Botón para nueva oferta - solo si hay ofertas */}
      {offers.length > 0 && (
        <div className="flex justify-center pt-4">
          <button
            onClick={onNewOfertaClick}
            className="px-6 py-2 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition"
          >
            + Nueva Oferta
          </button>
        </div>
      )}
    </div>
  );
}