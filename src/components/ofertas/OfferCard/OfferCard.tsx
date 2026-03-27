'use client';

import { OfertaEntity } from '@/interfaces/ofertas/OfertaEntity';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Star, Monitor, Users } from 'lucide-react';

interface OfferCardProps {
  offer: OfertaEntity;
}

/**
 * OfferCard — Horizontal card matching the prototype design.
 *
 * Layout: [Tutor Avatar + Name + Rating] | [Title + Modality + Desc + Tags + Horarios] | [Price]
 */
export function OfferCard({ offer }: OfferCardProps) {
  // Limitar tags a 2
  const tags = offer.tags ?? [];
  const displayTags = tags.slice(0, 2);

  // Horarios a mostrar (máximo 3) con nombre completo del día
  const dayFullName: Record<string, string> = {
    Lun: 'Lunes', Mar: 'Martes', Mié: 'Miércoles', Jue: 'Jueves',
    Vie: 'Viernes', Sáb: 'Sábado', Dom: 'Domingo',
  };
  const horariosRaw = offer.horarios ?? [];
  const slots = horariosRaw.map((h) => `${dayFullName[h.day] ?? h.day} ${h.hour}`);
  const displayHorarios = slots.slice(0, 3);
  const remainingHorarios = slots.length - 3;

  // Modality icon
  const renderModalityIcon = () => {
    if (offer.modalidad === 'Virtual') return <Monitor size={14} className="text-gray-500" />;
    if (offer.modalidad === 'Presencial') return <Users size={14} className="text-gray-500" />;
    return <MapPin size={14} className="text-gray-500" />;
  };

  return (
    <div
      data-testid="offer-card"
      className="flex rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md overflow-hidden"
    >
        {/* Left accent bar */}
        <div className="w-1 shrink-0 bg-[var(--yellow)]" />

        {/* Tutor column */}
        <div className="flex flex-col items-center justify-center px-5 py-5 shrink-0 w-[130px]">
          {/* Avatar */}
          <div className="relative h-16 w-16 rounded-full overflow-hidden bg-[var(--primary)] flex items-center justify-center mb-2">
            {offer.tutor.fotoUrl ? (
              <Image
                src={offer.tutor.fotoUrl}
                alt={offer.tutor.nombre}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-white text-xl font-bold select-none">
                {offer.tutor.nombre.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          {/* Tutor name */}
          <p className="text-sm font-semibold text-[var(--primary)] text-center leading-tight mb-1 font-inter">
            {offer.tutor.nombre}
          </p>

          {/* Rating */}
          {offer.calificacionPromedio !== undefined && (
            <div className="flex items-center gap-1">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              <span className="text-sm font-semibold text-gray-700">{offer.calificacionPromedio}</span>
              {offer.totalReseñas !== undefined && (
                <span className="text-xs text-gray-400">({offer.totalReseñas})</span>
              )}
            </div>
          )}
        </div>

        {/* Center content */}
        <div className="flex-1 py-5 pr-4 min-w-0">
          {/* Title */}
          <h3 className="mb-1 text-lg leading-tight font-inter">
            <Link
              href={`/ofertas/${offer.id}`}
              className="font-bold text-gray-900 transition-colors hover:text-[var(--yellow)] hover:underline cursor-pointer"
            >
              {offer.titulo}
            </Link>
          </h3>

          {/* Modality */}
          <div className="flex items-center gap-1.5 mb-2">
            {renderModalityIcon()}
            <span className="text-sm text-gray-500 font-inter">{offer.modalidad}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3 font-inter">
            {offer.descripcion}
          </p>

          {/* Tags + Horarios */}
          <div className="flex flex-col gap-2">
            {/* Tags */}
            {displayTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {displayTags.map((tag, index) => (
                  <span
                    key={`tag-${index}`}
                    className="inline-block rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-600 font-inter"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Horarios */}
            {displayHorarios.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Clock size={14} className="text-gray-400 shrink-0" />
                {displayHorarios.map((slot, index) => (
                  <span
                    key={`slot-${index}`}
                    className="inline-block rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 font-inter"
                  >
                    {slot}
                  </span>
                ))}
                {remainingHorarios > 0 && (
                  <span className="text-xs text-gray-400 font-inter">
                    +{remainingHorarios} más
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Price column */}
        <div className="flex flex-col items-end justify-center px-5 py-5 shrink-0 border-l border-gray-100">
          <p className="text-xs text-gray-500 font-medium mb-1 font-inter">Precio</p>
          <p className="text-2xl font-bold text-[var(--yellow)] font-inter">
            ${Math.round(offer.precio)}
            <span className="text-sm font-normal text-gray-500">/h</span>
          </p>
        </div>
    </div>
  );
}
