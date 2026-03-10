import { BookOpen, MapPin, Clock, Tag } from 'lucide-react';
import { CategoryDto, AvailabilityDto } from '@/interfaces/offers/DetallesOfertaDto';

interface OfferInfoSectionProps {
  title: string;
  modality: string;
  description: string;
  categories: CategoryDto[];
  availability: AvailabilityDto[];
}

/**
 * Obtiene el mapa de fechas dinámicas para la semana actual
 * Comienza desde el lunes de la semana actual
 */
function getDynamicWeekDates() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = domingo, 1 = lunes, etc.

  // Calcular el lunes de esta semana
  const mondayDate = new Date(today);
  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // domingo = -6, lunes = 0, etc.
  mondayDate.setDate(today.getDate() + daysToMonday);

  // Traducción de días
  const daysOfWeek = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  // Traducción de meses abreviados
  const monthsAbbr = [
    'ene',
    'feb',
    'mar',
    'abr',
    'may',
    'jun',
    'jul',
    'ago',
    'sep',
    'oct',
    'nov',
    'dic',
  ];

  // Crear mapa de día → fecha formateada (ej: "8 mar")
  const datesMap: Record<string, string> = {};
  daysOfWeek.forEach((day, index) => {
    const date = new Date(mondayDate);
    date.setDate(mondayDate.getDate() + index);
    const dayNum = date.getDate();
    const monthAbbr = monthsAbbr[date.getMonth()];
    datesMap[day] = `${dayNum} ${monthAbbr}`;
  });

  return datesMap;
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

  // Obtener fechas dinámicas para esta semana
  const datesMap = getDynamicWeekDates();

  // Orden de días de la semana
  const daysOrder = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  // Obtener los días que tienen disponibilidad en orden
  const availableDays = daysOrder.filter((day) =>
    availabilityByDay.hasOwnProperty(day)
  );
  return (
    <div className="bg-white rounded-lg p-4">
      {/* Título con icono */}
      <div className="flex items-start gap-2 mb-1">
        <BookOpen size={30} className="text-(--yellow) bg-amber-100 rounded-md flex-shrink-0 mt-0.5" />
        <div>
          <h1 className="text-2xl font-extrabold text-primary">{title}</h1>
        </div>
      </div>

      {/* Modalidad con icono */}
      <p className="text-text-secondary mb-5 ml-8 text-sm font-medium flex items-center gap-2">
        <MapPin size={16} className="text-primary flex-shrink-0" />
        {modality}
      </p>

      {/* Descripción */}
      <div className="mb-6">
        <p className="text-foreground text-base leading-relaxed">{description}</p>
      </div>

      {/* Categorías */}
      <div className="mb-8">
        <h3 className="text-base font-semibold text-primary mb-3 flex items-center gap-2">
          <Tag size={18} className="text-primary" />
          <span>Categorías</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-bg-gray text-primary rounded-full text-xs font-medium border border-border"
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>

      {/* Disponibilidad Semanal - Formato Tabla con columnas ajustadas */}
      <div>
        <h3 className="text-base font-semibold text-primary mb-4 flex items-center gap-2">
          <Clock size={18} className="text-primary" />
          <span>Disponibilidad Semanal</span>
        </h3>
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="grid gap-0" style={{ gridTemplateColumns: '1fr 2fr' }}>
            {/* Iterar solo sobre los días que tienen disponibilidad, en orden */}
            {availableDays.map((day, dayIndex) => {
              const times = availabilityByDay[day] || [];

              return (
                <div key={dayIndex} className="contents">
                  {/* Columna 1: Día y Fecha (más pequeña) */}
                  <div
                    className={`border-b border-r border-border p-3 bg-bg-gray ${
                      dayIndex === availableDays.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <p className="font-semibold text-foreground text-sm">{day}</p>
                    <p className="text-xs text-text-secondary">{datesMap[day]}</p>
                  </div>

                  {/* Columna 2: Horarios (más grande) */}
                  <div
                    className={`border-b border-border p-3 flex flex-wrap gap-1.5 items-start ${
                      dayIndex === availableDays.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    {times.map((time, timeIndex) => (
                      <span
                        key={timeIndex}
                        className="px-2.5 py-1 bg-blue-100 text-blue-600 rounded text-xs font-medium"
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
