'use client';

import { OfferResponseDto } from '@/interfaces/offers/OfferResponseDto';
import { IoLocationOutline } from 'react-icons/io5';
import { MdComputer, MdPerson } from 'react-icons/md';
import Image from 'next/image';

interface OfferCardProps {
  offer: OfferResponseDto;
}

export function OfferCard({ offer }: OfferCardProps) {
  // Renderizar icono de modalidad
  const renderModalityIcon = (modality: string) => {
    const iconProps = { className: 'w-4 h-4' };

    if (modality === 'Virtual') {
      return <MdComputer {...iconProps} />;
    } else if (modality === 'Presencial') {
      return <MdPerson {...iconProps} />;
    } else {
      return <IoLocationOutline {...iconProps} />;
    }
  };

  // Limitar tags a 2 y mostrar +N si hay más
  const displayTags = offer.tags.slice(0, 2);
  const remainingTags = offer.tags.length - 2;

  return (
    <div className="flex h-full flex-col rounded-lg bg-white border-t-4 border-t-[#F6B750] p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Encabezado: Título y Precio */}
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-tight">
            {offer.title}
          </h3>
        </div>
        <div className="shrink-0 whitespace-nowrap">
          <span className="text-base font-bold text-[#F6B750]">
            ${offer.price}
            <span className="text-xs font-normal text-gray-600">/h</span>
          </span>
        </div>
      </div>

      {/* Modalidad */}
      <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-600">
        {renderModalityIcon(offer.modality)}
        <span className="text-xs">{offer.modality}</span>
      </div>

      {/* Descripción */}
      <p className="mb-3 line-clamp-2 text-xs text-gray-600 leading-relaxed">
        {offer.description}
      </p>

      {/* Tags/Servicios */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {displayTags.map((tag, index) => (
          <span
            key={`tag-${index}`}
            className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700"
          >
            {tag}
          </span>
        ))}
        {remainingTags > 0 && (
          <span className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700">
            +{remainingTags}
          </span>
        )}
      </div>

      {/* Separador visual */}
      <div className="mb-3 border-t border-gray-200"></div>

      {/* Tutor */}
      <div className="flex items-center gap-2 min-w-0">
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
          <Image
            src={offer.tutor.photo}
            alt={offer.tutor.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-gray-800">{offer.tutor.name}</p>
        </div>
      </div>
    </div>
  );
}
