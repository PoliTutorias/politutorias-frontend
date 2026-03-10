import { BookOpen, MapPin, Clock, Tag } from 'lucide-react';
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
  // Agrupar disponibilidad por día
  const availabilityByDay: Record<string, string[]> = {};
  availability.forEach((slot) => {
    if (!availabilityByDay[slot.day]) {
      availabilityByDay[slot.day] = [];
    }
    availabilityByDay[slot.day].push(slot.time);
  });
  const days = Object.keys(availabilityByDay);
  return (
    <div className="bg-white rounded-lg p-6">
      {/* Título con icono */}
      <div className="flex items-start gap-3 mb-2">
        <BookOpen size={28} className="text-primary flex-shrink-0 mt-1" />
        <div>
          <h1 className="text-3xl font-bold text-primary">{title}</h1>
        </div>
      </div>

      {/* Modalidad con icono */}
      <p className="text-text-secondary mb-6 ml-11 font-medium flex items-center gap-2">
        <MapPin size={18} className="text-primary flex-shrink-0" />
        {modality}
      </p>

      {/* Descripción */}
      <div className="mb-8">
        <p className="text-foreground text-lg leading-relaxed">{description}</p>
      </div>

      {/* Categorías */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
          <Tag size={20} className="text-primary" />
          <span>Categorías</span>
        </h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-bg-gray text-primary rounded-full text-sm font-medium border border-border"
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>

      {/* Disponibilidad Semanal - Formato Tabla */}
      <div>
        <h3 className="text-lg font-semibold text-primary mb-6 flex items-center gap-2">
          <Clock size={20} className="text-primary" />
          <span>Disponibilidad Semanal</span>
        </h3>
        <div className="border border-border rounded-lg overflow-hidden">
          {days.map((day, dayIndex) => (
            <div key={dayIndex} className={`border-b border-border last:border-b-0`}>
              <div className="bg-bg-gray p-4 min-h-[60px] flex flex-col justify-center">
                <p className="font-semibold text-foreground text-base">{day}</p>
              </div>
              <div className="bg-white p-4 flex flex-wrap gap-2">
                {availabilityByDay[day].map((time, timeIndex) => (
                  <span
                    key={timeIndex}
                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm font-medium"
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
