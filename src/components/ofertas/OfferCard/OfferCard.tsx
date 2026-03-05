'use client';

import { OfertaEntity } from '@/interfaces/ofertas/OfertaEntity';
import Image from 'next/image';
import { IoLocationOutline } from 'react-icons/io5';
import { MdComputer, MdPerson } from 'react-icons/md';
import { FiStar, FiClock } from 'react-icons/fi';

interface OfferCardProps {
  offer: OfertaEntity;
}

/**
 * OfferCard para ofertas filtradas (HU27)
 * 
 * Tarjeta individual que muestra la información de una oferta
 * usando la interfaz OfertaEntity del seed data.
 */
export function OfferCard({ offer }: OfferCardProps) {
  // Renderizar icono de modalidad
  const renderModalityIcon = (modality: string) => {
    const iconProps = { className: 'w-4 h-4' };
    if (modality === 'Virtual') return <MdComputer {...iconProps} />;
    if (modality === 'Presencial') return <MdPerson {...iconProps} />;
    return <IoLocationOutline {...iconProps} />;
  };

  // Limitar tags a 2 y mostrar +N si hay más
  const tags = offer.tags ?? [];
  const displayTags = tags.slice(0, 2);
  const remainingTags = tags.length - 2;

  // Horarios a mostrar (máximo 2)
  const horarios = offer.horarios ?? [];
  const displayHorarios = horarios.slice(0, 2);
  const remainingHorarios = horarios.length - 2;

  return (
    <div data-testid="offer-card" className="flex h-full flex-col rounded-lg bg-white p-5 shadow-md transition-all cursor-pointer hover:shadow-lg hover:-translate-y-1 border-t-[3px] border-t-[var(--yellow)]">
      {/* Encabezado: Título y Precio */}
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-[17px] font-semibold text-gray-900 line-clamp-2 leading-tight font-inter">
            {offer.titulo}
          </h3>
        </div>
        <div className="shrink-0 whitespace-nowrap">
          <span className="text-lg font-bold text-[var(--yellow)]">
            ${offer.precio}
            <span className="text-xs font-normal text-gray-600">/h</span>
          </span>
        </div>
      </div>

      {/* Modalidad */}
      <div className="mb-3 flex items-center gap-1.5 text-[11px] text-gray-600">
        {renderModalityIcon(offer.modalidad)}
        <span className="text-[11px]">{offer.modalidad}</span>
      </div>

      {/* Descripción */}
      <div className="mb-3 flex items-center min-h-[2.5rem]">
        <p className="line-clamp-2 text-[13px] text-gray-600 leading-relaxed font-inter">
          {offer.descripcion}
        </p>
      </div>

      {/* Tags */}
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

      {/* Horarios */}
      {displayHorarios.length > 0 && (
        <div className="mb-3 flex items-center gap-2 text-[11px] text-gray-500">
          <FiClock className="w-3.5 h-3.5" />
          {displayHorarios.map((horario, index) => (
            <span key={`horario-${index}`} className="font-inter">{horario}</span>
          ))}
          {remainingHorarios > 0 && (
            <span className="text-gray-400">+{remainingHorarios} más</span>
          )}
        </div>
      )}

      {/* Separador */}
      <div className="mt-auto mb-3 border-t border-gray-200" />

      {/* Tutor + Rating */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[var(--primary)] flex items-center justify-center">
            {offer.tutor.fotoUrl ? (
              <Image
                src={offer.tutor.fotoUrl}
                alt={offer.tutor.nombre}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-white text-sm font-bold select-none">
                {offer.tutor.nombre.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <p className="truncate text-[13px] font-bold text-[var(--primary)] font-inter">
            {offer.tutor.nombre}
          </p>
        </div>

        {/* Calificación */}
        {offer.calificacionPromedio !== undefined && (
          <div className="flex items-center gap-1 shrink-0">
            <FiStar className="w-4 h-4 text-[var(--yellow)] fill-[var(--yellow)]" />
            <span className="text-sm font-semibold text-gray-700">{offer.calificacionPromedio}</span>
            {offer.totalReseñas !== undefined && (
              <span className="text-xs text-gray-400">({offer.totalReseñas})</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
