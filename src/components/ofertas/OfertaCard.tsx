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
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
      {/* Header: Título y Precio */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-[17px] font-semibold text-gray-900 flex-1 pr-4">
          {offer.title}
        </h3>
        <span className="text-[17.4px] font-bold text-yellow-500 whitespace-nowrap">
          ${offer.pricePerHour}/h
        </span>
      </div>

      {/* Modalidad (Presencial/Virtual) */}
      <div className="flex items-center gap-2 mb-3">
        {offer.isPresencial ? (
          <>
            <MdPerson2 className="w-5 h-5 text-gray-600" />
            <span className="text-[12.7px] text-gray-600">Presencial</span>
          </>
        ) : (
          <>
            <MdMonitor className="w-5 h-5 text-gray-600" />
            <span className="text-[12.7px] text-gray-600">Virtual</span>
          </>
        )}
      </div>

      {/* Descripción */}
      <p className="text-[13.1px] text-gray-700 mb-4">
        {offer.description}
      </p>

      {/* Tags/Categorías */}
      <div className="flex flex-wrap gap-2">
        {offer.tags.map((tag) => (
          <span
            key={tag}
            className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-[11.4px] font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
