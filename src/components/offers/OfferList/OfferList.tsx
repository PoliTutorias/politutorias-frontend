'use client';

import { OfferResponseDto } from '@/interfaces/offers/OfferResponseDto';
import { OfferCard } from '../OfferCard/OfferCard';

interface OfferListProps {
  offers: OfferResponseDto[];
}

export function OfferList({ offers }: OfferListProps) {
  if (offers.length === 0) {
    return (
      <div className="rounded-lg bg-white p-12 text-center shadow-sm">
        <p className="text-gray-600">No se encontraron ofertas de tutoría</p>
      </div>
    );
  }

  return (
    <div className="grid auto-rows-max grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}
