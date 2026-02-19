'use client';

import { OfferResponseDto } from '@/interfaces/offers/OfferResponseDto';
import { IoVideocamOutline, IoLocationOutline, IoStar, IoStarHalf } from 'react-icons/io5';
import Image from 'next/image';

interface OfferCardProps {
  offer: OfferResponseDto;
}

export function OfferCard({ offer }: OfferCardProps) {
  // Renderizar icono de modalidad
  const renderModalityIcon = (modality: string) => {
    const iconProps = { className: 'w-4 h-4 text-gray-600' };

    if (modality === 'Virtual') {
      return <IoVideocamOutline {...iconProps} />;
    } else if (modality === 'Presencial') {
      return <IoLocationOutline {...iconProps} />;
    } else {
      return (
        <div className="flex gap-1">
          <IoVideocamOutline {...iconProps} />
          <IoLocationOutline {...iconProps} />
        </div>
      );
    }
  };

  // Renderizar estrellas basadas en el rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Estrellas completas
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <IoStar key={`star-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      );
    }

    // Media estrella
    if (hasHalfStar) {
      stars.push(
        <IoStarHalf key="half-star" className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      );
    }

    return stars;
  };

  return (
    <div className="flex h-full flex-col rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {/* Encabezado: Título y Precio */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
            {offer.title}
          </h3>
        </div>
        <div className="ml-2 whitespace-nowrap">
          <span className="text-lg font-bold text-orange-500">
            ${offer.price}
            <span className="text-sm font-normal text-gray-600">/h</span>
          </span>
        </div>
      </div>

      {/* Modalidad */}
      <div className="mb-4 flex items-center gap-2">
        {renderModalityIcon(offer.modality)}
        <span className="text-sm text-gray-600">{offer.modality}</span>
      </div>

      {/* Descripción */}
      <p className="mb-4 line-clamp-2 text-sm text-gray-600">
        {offer.description}
      </p>

      {/* Tags/Servicios */}
      <div className="mb-4 flex flex-wrap gap-2">
        {offer.tags.map((tag, index) => (
          <span
            key={`tag-${index}`}
            className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Separador visual */}
      <div className="mb-4 border-t border-gray-200"></div>

      {/* Tutor y Calificación */}
      <div className="flex items-center justify-between">
        {/* Info del Tutor */}
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
            <Image
              src={offer.tutor.photo}
              alt={offer.tutor.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{offer.tutor.name}</p>
          </div>
        </div>

        {/* Calificación */}
        <div className="flex items-center gap-1 whitespace-nowrap">
          <div className="flex gap-0.5">
            {renderStars(offer.rating)}
          </div>
          <span className="text-sm font-medium text-gray-700">
            {offer.rating} <span className="text-gray-600">({offer.reviewsCount})</span>
          </span>
        </div>
      </div>
    </div>
  );
}
