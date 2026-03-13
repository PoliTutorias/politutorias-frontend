'use client';

import { useState } from 'react';
import { X, Calendar, Send } from 'lucide-react';
import { HorarioDisponibleDto } from '@/interfaces/offers/DetallesOfertaDto';
import { TutorDetailDto } from '@/interfaces/offers/DetallesOfertaDto';
import InputMensaje from '@/components/common/InputMensaje/InputMensaje';
import SelectorModalidad from '@/components/solicitud/SelectorModalidad/SelectorModalidad';
import clsx from 'clsx';

interface ModalSolicitarTutoriaProps {
  isOpen: boolean;
  onClose: () => void;
  tutorInfo: TutorDetailDto;
  selectedHorarios: HorarioDisponibleDto[];
  ofertaModalidad: 'virtual' | 'presencial' | 'virtual/presencial';
  ofertaTitle: string;
  pricePerHour: number;
  onRemoveHorario?: (horario: HorarioDisponibleDto) => void;
  onSubmit: (data: {
    mensaje: string;
    modalidad?: 'virtual' | 'presencial';
  }) => void;
  isLoading?: boolean;
}

export default function ModalSolicitarTutoria({
  isOpen,
  onClose,
  tutorInfo,
  selectedHorarios,
  ofertaModalidad,
  ofertaTitle,
  pricePerHour,
  onRemoveHorario,
  onSubmit,
  isLoading = false,
}: ModalSolicitarTutoriaProps) {
  const [mensaje, setMensaje] = useState('');
  const [modalidad, setModalidad] = useState<'virtual' | 'presencial'>();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const normalizedOfertaModalidad = ofertaModalidad?.toLowerCase();
  const isDualModalidad = normalizedOfertaModalidad === 'virtual/presencial';

  /**
   * Calcula la fecha para un día específico de la semana actual/próxima
   */
  function getDateForDay(day: string): string {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayIndex = daysOfWeek.indexOf(day);
    
    let daysToAdd = dayIndex - dayOfWeek;
    if (daysToAdd < 0) {
      daysToAdd += 7;
    }
    
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + daysToAdd);
    
    const monthNames = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    const dayNum = targetDate.getDate();
    const monthAbbr = monthNames[targetDate.getMonth()];
    
    return `${dayNum} ${monthAbbr}`;
  }

  const handleRemoveHorario = (index: number) => {
    // Esta funcionalidad será manejada por el parent component
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validar mensaje
    if (!mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es obligatorio.';
    }

    // Validar modalidad solo si es dual
    if (isDualModalidad && !modalidad) {
      newErrors.modalidad = 'Selecciona la modalidad';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      mensaje: mensaje.trim(),
      modalidad: isDualModalidad ? modalidad : undefined,
    });
  };

  const handleClose = () => {
    setMensaje('');
    setModalidad(undefined);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto text-sm">
        {/* Header con cerrar */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-base font-bold text-gray-900">Solicitar Tutoría</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Cerrar modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Contenido */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Información del tutor con fondo gris azulado*/}
          <div className="bg-blue-50 px-4 py-3 rounded-lg flex items-center gap-3">
            <img
              src={
                tutorInfo.profileImageUrl ||
                'https://via.placeholder.com/50'
              }
              alt={tutorInfo.name}
              className="w-12 h-12 rounded-full object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-xs">{tutorInfo.name}</h3>
              <p className="text-xs text-gray-600 truncate">{ofertaTitle}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs font-semibold text-gray-700">${pricePerHour}/h</p>
            </div>
          </div>

          {/* Horarios seleccionados */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-gray-900">
                Horarios seleccionados
              </label>
              <span className="text-xs font-semibold text-gray-600">
                {selectedHorarios.length} seleccionados
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedHorarios.map((horario, idx) => {
                const dateStr = getDateForDay(horario.day);
                return (
                  <div
                    key={idx}
                    className="bg-orange-100 px-2 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium border border-orange-200 text-primary"
                  >
                    <Calendar size={12} className="shrink-0" />
                    <span>
                      {horario.day} {dateStr} • {horario.time}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        if (onRemoveHorario) {
                          onRemoveHorario(horario);
                        }
                      }}
                      className="ml-0.5 hover:bg-orange-200 rounded-full p-0.5 transition-colors shrink-0"
                      title="Remover horario"
                    >
                      <X size={10} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selector de modalidad (solo si es dual) */}
          {isDualModalidad && (
            <SelectorModalidad
              selectedModalidad={modalidad}
              onSelect={setModalidad}
              error={errors.modalidad}
              name="modalidad"
            />
          )}

          {/* Input de mensaje */}
          <InputMensaje
            value={mensaje}
            onChange={setMensaje}
            maxLength={500}
            placeholder="Describe tu duda específica para que el tutor pueda prepararse."
            label="Mensaje para el tutor *"
            error={errors.mensaje}
            name="mensaje"
          />

          {/* Botones de acción */}
          <div className="flex gap-2 pt-2 border-t border-gray-200 justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="py-2 px-3 rounded-lg font-medium text-xs text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={clsx(
                'py-2 px-3 rounded-lg font-medium text-xs text-white transition-all duration-200 flex items-center gap-1.5',
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed opacity-60'
                  : 'bg-primary hover:bg-primary-dark active:bg-primary-dark'
              )}
            >
              <Send size={14} />
              {isLoading ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
