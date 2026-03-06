'use client';

import { OfferResponseDto } from '@/interfaces/offers/OfferResponseDto';
import { IoLocationOutline } from 'react-icons/io5';
import { MdComputer, MdPerson } from 'react-icons/md';
import Image from 'next/image';

interface OfferCardProps {
  offer: OfferResponseDto;
}

export function OfferCard({ offer }: OfferCardProps) {
  // Mapear modalidad del backend al display
  const getModalityDisplay = (modality: string): string => {
    switch (modality) {
      case 'AMBOS':
        return 'Virtual/Presencial';
      case 'PRESENCIAL':
        return 'Presencial';
      case 'VIRTUAL':
        return 'Virtual';
      default:
        return modality;
    }
  };

  // Renderizar icono de modalidad
  const renderModalityIcon = (modality: string) => {
    const iconProps = { className: 'w-4 h-4' };

    if (modality === 'VIRTUAL' || modality === 'Virtual') {
      return <MdComputer {...iconProps} />;
    } else if (modality === 'PRESENCIAL' || modality === 'Presencial') {
      return <MdPerson {...iconProps} />;
    } else if (modality === 'AMBOS') {
      return <MdComputer {...iconProps} />;
    } else {
      return <IoLocationOutline {...iconProps} />;
    }
  };

  // Limitar tags a 2 y mostrar +N si hay más
  const displayTags = offer.tags.slice(0, 2);
  const remainingTags = offer.tags.length - 2;

  return (
    <div className="flex h-full flex-col rounded-lg bg-white p-5 shadow-md transition-all cursor-pointer hover:shadow-lg hover:-translate-y-1">
      {/* Encabezado: Título y Precio */}
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-[17.3px] font-semibold text-gray-900 line-clamp-2 leading-tight">
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
      <div className="mb-3 flex items-center gap-1.5 text-[11px] text-gray-600">
        {renderModalityIcon(offer.modality)}
        <span className="text-[11px]">{getModalityDisplay(offer.modality)}</span>
      </div>

      {/* Descripción */}
      <div className="mb-3 flex items-center min-h-[2.5rem]">
        <p className="line-clamp-2 text-[13px] text-gray-600 leading-relaxed">
          {offer.description}
        </p>
      </div>

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
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#17253d] flex items-center justify-center">
          {offer.tutor.photo ? (
            <Image
              src={offer.tutor.photo}
              alt={offer.tutor.name}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-white text-sm font-bold select-none">
              {offer.tutor.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-[13.2px] font-bold text-[#17253d]">{offer.tutor.name}</p>
        </div>
      </div>
    </div>
  );
}
