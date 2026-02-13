'use client';

import { OfertaDto } from '@/interfaces/oferta/OfertaDto';
import { MdPerson2, MdMonitor } from 'react-icons/md';

interface OfertaCardProps {
  offer: OfertaDto;
}

/**
 * Componente que renderiza una tarjeta de oferta de tutoría
 */
export function OfertaCard({ offer }: OfertaCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
      {/* Header: Título y Precio */}
      <div className="flex justify-between items-start gap-4 mb-2">
        <h2 className="text-[17px] font-bold text-gray-900 flex-1">
          {offer.title}
        </h2>
        <span className="text-[17.4px] font-bold text-yellow-500 whitespace-nowrap">
          ${offer.pricePerHour}/h
        </span>
      </div>

      {/* Modalidad (Presencial/Virtual) - Icono con texto */}
      <div className="flex items-center gap-2 mb-2 text-gray-600">
        {offer.isPresencial ? (
          <>
            <MdPerson2 className="w-5 h-5" />
            <span className="text-[12.7px]">Presencial</span>
          </>
        ) : (
          <>
            <MdMonitor className="w-5 h-5" />
            <span className="text-[12.7px]">Virtual</span>
          </>
        )}
      </div>

      {/* Descripción */}
      <p className="text-[13.1px] text-gray-600 mb-4">
        {offer.description}
      </p>

      {/* Tags/Categorías */}
      <div className="flex flex-wrap gap-2">
        {offer.tags.map((tag) => (
          <span
            key={tag}
            className="inline-block px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-[11.4px] font-medium border border-gray-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
