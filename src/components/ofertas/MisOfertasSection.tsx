'use client';

import { OfertaDto } from '@/interfaces/oferta/OfertaDto';
import { OfertaCard } from './OfertaCard';

interface MisOfertasSectionProps {
  offers: OfertaDto[];
}

/**
 * Componente que renderiza el listado de ofertas del tutor
 * Muestra las tarjetas en una columna (1 por fila)
 */
export function MisOfertasSection({ offers }: MisOfertasSectionProps) {
  return (
    <div className="space-y-6">
      {offers.map((offer) => (
        <OfertaCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}