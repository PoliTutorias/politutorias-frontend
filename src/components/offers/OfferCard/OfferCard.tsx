'use client';

import { OfferResponseDto } from '@/interfaces/offers/OfferResponseDto';
import { IoLocationOutline } from 'react-icons/io5';
import { MdComputer, MdPerson } from 'react-icons/md';
import { FiStar, FiClock } from 'react-icons/fi';
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

  // Horarios de disponibilidad: mapear abreviatura → nombre completo
  const dayFullName: Record<string, string> = {
    Lun: 'Lunes', Mar: 'Martes', Mié: 'Miércoles', Jue: 'Jueves',
    Vie: 'Viernes', Sáb: 'Sábado', Dom: 'Domingo',
  };
  const slots = (offer.availability ?? []).map(
    (a) => `${dayFullName[a.day] ?? a.day} ${a.hour}`
  );
  const displaySlots = slots.slice(0, 2);
  const remainingSlots = slots.length - 2;

  return (
    <div
      data-testid="offer-card"
      className="flex h-full flex-col rounded-lg bg-white p-5 shadow-md transition-all cursor-pointer hover:shadow-lg hover:-translate-y-1 border-t-[3px] border-t-[var(--yellow)]"
    >
      {/* Encabezado: Título y Precio */}
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-[17px] font-semibold text-gray-900 line-clamp-2 leading-tight font-inter">
            {offer.title}
          </h3>
        </div>
        <div className="shrink-0 whitespace-nowrap">
          <span className="text-lg font-bold text-[var(--yellow)]">
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
        <p className="line-clamp-2 text-[13px] text-gray-600 leading-relaxed font-inter">
          {offer.description}
        </p>
      </div>

      {/* Tags/Servicios */}
      {displayTags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {displayTags.map((tag, index) => (
            <span
              key={`tag-${index}`}
              className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700 font-inter"
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
      )}

      {/* Horarios de Disponibilidad */}
      {displaySlots.length > 0 && (
        <div className="mb-3 flex items-center gap-2 flex-wrap">
          <FiClock className="w-4 h-4 text-gray-400 shrink-0" />
          {displaySlots.map((slot, index) => (
            <span
              key={`slot-${index}`}
              className="inline-block rounded-md bg-gray-100 px-2.5 py-1 text-[12px] text-gray-700 font-medium font-inter"
            >
              {slot}
            </span>
          ))}
          {remainingSlots > 0 && (
            <p className="text-[12px] text-gray-400 font-inter">
              +{remainingSlots} más
            </p>
          )}
        </div>
      )}

      {/* Separador */}
      <div className="mt-auto mb-3 border-t border-gray-200" />

      {/* Tutor + Rating */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[var(--primary)] flex items-center justify-center">
            {offer.tutor?.photo ? (
              <Image
                src={offer.tutor.photo}
                alt={offer.tutor.name}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-white text-sm font-bold select-none">
                {offer.tutor?.name?.charAt(0).toUpperCase() ?? '?'}
              </span>
            )}
          </div>
          <p className="truncate text-[13px] font-bold text-[var(--primary)] font-inter">
            {offer.tutor?.name ?? 'Tutor'}
          </p>
        </div>

        {/* Calificación */}
        {offer.rating !== undefined && offer.rating > 0 && (
          <div className="flex items-center gap-1 shrink-0">
            <FiStar className="w-4 h-4 text-[var(--yellow)] fill-[var(--yellow)]" />
            <span className="text-sm font-semibold text-gray-700">{offer.rating}</span>
            {offer.reviewsCount !== undefined && offer.reviewsCount > 0 && (
              <span className="text-xs text-gray-400">({offer.reviewsCount})</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
