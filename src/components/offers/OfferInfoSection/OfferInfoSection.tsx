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
 * Calcula la semana activa según el concepto de ventana activa (CAL-02/03, SOL-01):
 *   - Lun 00:00 → Dom 19:59 → semana actual
 *   - Dom 20:00 → Dom 23:59 → semana SIGUIENTE
 */
function getActiveWeekDates() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0=Dom
  const hours = now.getHours();

  // Dom 20:00+ → apuntar al lunes de la semana siguiente
  const isDomPost20 = dayOfWeek === 0 && hours >= 20;

  const mondayDate = new Date(now);
  if (isDomPost20) {
    // Avanzar 1 día (lunes siguiente)
    mondayDate.setDate(now.getDate() + 1);
  } else {
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    mondayDate.setDate(now.getDate() + daysToMonday);
  }
  mondayDate.setHours(0, 0, 0, 0);

  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const monthsAbbr = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];

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

  return { datesMap, dateObjectsMap, isDomPost20 };
}

/**
 * CAL-01 revisada: Un día está completamente pasado si su fecha (a medianoche) es anterior a hoy.
 */
function isDayPassed(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  return checkDate < today;
}

/**
 * SOL-02: Un slot concreto es inválido si faltan menos de 12 horas para su inicio.
 * También cubre el cierre de Dom 20:00 (CAL-02): en esa franja el día ya está en
 * la semana siguiente, por lo que los slots del domingo actual nunca aparecerán.
 */
function isTimeSlotUnavailable(date: Date, time: string): boolean {
  const [h, m] = time.split(':').map(Number);
  const slotDateTime = new Date(date);
  slotDateTime.setHours(h, m, 0, 0);
  const diffMs = slotDateTime.getTime() - Date.now();
  return diffMs < 4 * 60 * 60 * 1000; // SOL-02: menos de 4 horas → bloqueado
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

  // Obtener fechas dinámicas para la ventana activa
  const { datesMap, dateObjectsMap } = getActiveWeekDates();

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

      {/* Disponibilidad Semanal - Tabla */}
      <div>
        <h3 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
          <Clock size={16} className="text-primary" />
          <span>Disponibilidad Semanal (Selecciona los horarios que deseas)</span>
        </h3>
        <div className="border border-border rounded-lg overflow-hidden">
          {/* Header de tabla */}
          <div className="grid grid-cols-4 gap-0 border-b border-border bg-bg-gray">
            <div className="col-span-1 px-3 py-2 font-semibold text-xs text-primary border-r border-border">
              Día
            </div>
            <div className="col-span-3 px-3 py-2 font-semibold text-xs text-primary">
              Horarios disponibles
            </div>
          </div>
          
          {/* Filas de disponibilidad */}
          {availableDays.map((day) => {
            const times = availabilityByDay[day] || [];
            const dayDate = dateObjectsMap[day];
            const isPassed = isDayPassed(dayDate);
            const dateStr = datesMap[day];
            // ¿Todos los slots están vencidos?
            const allUnavailable = times.every(
              (time) => isPassed || isTimeSlotUnavailable(dayDate, time)
            );

            return (
              <div key={day} className="grid grid-cols-4 gap-0 border-b border-border last:border-b-0">
                {/* Columna 1: Día y fecha */}
                <div className={clsx(
                  'col-span-1 px-3 py-3 border-r border-border flex flex-col justify-center',
                  allUnavailable ? 'bg-gray-100' : 'bg-white'
                )}>
                  <p className="font-semibold text-xs text-gray-400">{day}</p>
                  <p className="text-xs text-gray-400">{dateStr}</p>
                </div>

                {/* Columna 2: Horarios */}
                <div className={clsx(
                  'col-span-3 px-3 py-3 flex flex-wrap items-center gap-2',
                  allUnavailable ? 'bg-gray-100' : 'bg-white'
                )}>
                  <div className="flex flex-wrap items-center gap-2">
                    {times.map((time) => {
                      const horario: HorarioDisponibleDto = { day, time };
                      const slotUnavailable = isPassed || isTimeSlotUnavailable(dayDate, time);
                      const isSelected = !slotUnavailable && selectedHorarios.some(
                        (h) => h.day === day && h.time === time
                      );

                      return (
                        <ChipHorario
                          key={`${day}-${time}`}
                          horario={horario}
                          isSelected={isSelected}
                          isDayPassed={slotUnavailable}
                          onSelect={() => handleHorarioClick(day, time)}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
