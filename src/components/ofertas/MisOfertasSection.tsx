'use client';

import { OfertaDto } from '@/interfaces/oferta/OfertaDto';
import { OfertaCard } from './OfertaCard';

interface MisOfertasSectionProps {
  offers: OfertaDto[];
  onNewOfertaClick?: () => void;
}

/**
 * Componente que renderiza el listado de ofertas del tutor
 * Incluye un grid de tarjetas de ofertas y botón para crear nueva oferta
 */
export function MisOfertasSection({ offers, onNewOfertaClick }: MisOfertasSectionProps) {
  return (
    <div className="space-y-6">
      {/* Grid de ofertas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <OfertaCard key={offer.id} offer={offer} />
        ))}
      </div>

      {/* Botón para nueva oferta */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onNewOfertaClick}
          className="px-6 py-2 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition"
