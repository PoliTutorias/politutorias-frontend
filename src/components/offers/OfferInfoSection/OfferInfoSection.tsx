import { BookOpen, MapPin, Clock } from 'lucide-react';
import { CategoryDto, AvailabilityDto } from '@/interfaces/offers/DetallesOfertaDto';

interface OfferInfoSectionProps {
  title: string;
  modality: string;
  description: string;
  categories: CategoryDto[];
  availability: AvailabilityDto[];
}

export default function OfferInfoSection({
  title,
  modality,
  description,
  categories,
  availability,
}: OfferInfoSectionProps) {
  return (
    <div className="bg-white rounded-lg p-6">
      {/* Título con icono */}
      <div className="flex items-start gap-3 mb-2">
        <BookOpen size={28} className="text-primary flex-shrink-0 mt-1" />
        <div>
          <h1 className="text-3xl font-bold text-primary">{title}</h1>
        </div>
      </div>

      {/* Modalidad */}
      <p className="text-text-secondary mb-6 ml-11 font-medium">{modality}</p>

      {/* Descripción */}
      <div className="mb-8">
        <p className="text-foreground text-lg leading-relaxed">{description}</p>
      </div>

      {/* Categorías */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
          <span>Categorías</span>
        </h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>

      {/* Disponibilidad */}
      <div>
        <h3 className="text-lg font-semibold text-primary mb-6 flex items-center gap-2">
          <Clock size={20} />
          <span>Disponibilidad Semanal</span>
        </h3>
        <div className="space-y-4">
          {availability.map((slot, index) => (
            <div key={index} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
              <p className="font-semibold text-foreground mb-2">{slot.day}</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm font-medium">
                  {slot.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
