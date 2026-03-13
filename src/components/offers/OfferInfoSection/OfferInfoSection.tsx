'use client';

import { BookOpen, MapPin, Clock, Tag } from 'lucide-react';
import { CategoryDto, AvailabilityDto, HorarioDisponibleDto } from '@/interfaces/offers/DetallesOfertaDto';
import ChipHorario from '@/components/offers/ChipHorario/ChipHorario';
import clsx from 'clsx';

interface OfferInfoSectionProps {
  title: string;
  modality: string;
  description: string;
  categories: CategoryDto[];
  availability: AvailabilityDto[];
  selectedHorarios: HorarioDisponibleDto[];
  onHorarioSelect: (horario: HorarioDisponibleDto) => void;
  onHorarioRemove: (horario: HorarioDisponibleDto) => void;
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
  const dateObjectsMap: Record<string, Date> = {};
  daysOfWeek.forEach((day, index) => {
    const date = new Date(mondayDate);
    date.setDate(mondayDate.getDate() + index);
    const dayNum = date.getDate();
    const monthAbbr = monthsAbbr[date.getMonth()];
    datesMap[day] = `${dayNum} ${monthAbbr}`;
    dateObjectsMap[day] = date;
  });

  return { datesMap, dateObjectsMap };
}

/**
 * Verifica si un día ya pasó
 */
function isDayPassed(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  return checkDate < today;
}

export default function OfferInfoSection({
  title,
  modality,
  description,
  categories,
  availability,
  selectedHorarios,
  onHorarioSelect,
  onHorarioRemove,
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
  const { datesMap, dateObjectsMap } = getDynamicWeekDates();

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

  const handleHorarioClick = (day: string, time: string) => {
    const horario: HorarioDisponibleDto = { day, time };
    const isSelected = selectedHorarios.some(
      (h) => h.day === day && h.time === time
    );
    
    if (isSelected) {
      onHorarioRemove(horario);
    } else {
      onHorarioSelect(horario);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4">
      {/* Título con icono */}
      <div className="flex items-start gap-2 mb-1">
        <BookOpen size={30} className="text-yellow-500 bg-amber-100 rounded-md flex-shrink-0 mt-0.5" />
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
      <div className=" mb-8">
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

      {/* Disponibilidad Semanal */}
      <div>
        <h3 className="text-base font-semibold text-primary mb-4 flex items-center gap-2">
          <Clock size={18} className="text-primary" />
          <span>Disponibilidad Semanal</span>
        </h3>
        <div className="space-y-4">
          {availableDays.map((day) => {
            const times = availabilityByDay[day] || [];
            const dayDate = dateObjectsMap[day];
            const isPassed = isDayPassed(dayDate);

            return (
              <div key={day}>
                <h4 className={clsx(
                  'text-sm font-medium mb-2',
                  isPassed ? 'text-gray-500' : 'text-gray-700'
                )}>
                  {day}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {times.map((time) => {
                    const horario: HorarioDisponibleDto = { day, time };
                    const isSelected = selectedHorarios.some(
                      (h) => h.day === day && h.time === time
                    );

                    return (
                      <ChipHorario
                        key={`${day}-${time}`}
                        horario={horario}
                        isSelected={isSelected}
                        isDayPassed={isPassed}
                        onSelect={() => handleHorarioClick(day, time)}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
