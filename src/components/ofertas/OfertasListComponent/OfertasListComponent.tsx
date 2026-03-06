'use client';

import { OfertaEntity } from '@/interfaces/ofertas/OfertaEntity';
import { OfferCard } from '@/components/ofertas/OfferCard/OfferCard';

interface OfertasListComponentProps {
  offers: OfertaEntity[];
}

/**
 * OfertasListComponent - Client Component (HU27)
 * 
 * Renderiza las ofertas filtradas en un grid de tarjetas.
 * Cada oferta se muestra usando el componente OfferCard.
 */
export function OfertasListComponent({ offers }: OfertasListComponentProps) {
  if (offers.length === 0) {
    return null;
  }

  return (
    <div data-testid="offers-filtered-list" className="grid auto-rows-max grid-cols-1 gap-6 md:grid-cols-2">
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}
