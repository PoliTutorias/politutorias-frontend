'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
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
  onSubmit,
  isLoading = false,
}: ModalSolicitarTutoriaProps) {
  const [mensaje, setMensaje] = useState('');
  const [modalidad, setModalidad] = useState<'virtual' | 'presencial'>();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isDualModalidad = ofertaModalidad === 'virtual/presencial';

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

    // Validar modalidad si es dual
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header con cerrar */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Solicitar Tutoría</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Cerrar modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Contenido */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información del tutor */}
          <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
            <img
              src={
                tutorInfo.profileImageUrl ||
                'https://via.placeholder.com/50'
              }
              alt={tutorInfo.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{tutorInfo.name}</h3>
              <p className="text-sm text-gray-600">{tutorInfo.career}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-yellow-500 font-semibold">
                  ⭐ {tutorInfo.rating}
                </span>
                <span className="text-sm text-gray-600">
                  ({tutorInfo.reviewsCount} reseñas)
                </span>
              </div>
            </div>
          </div>

          {/* Horarios seleccionados */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">
              Horarios seleccionados
            </label>
            <div className="flex flex-wrap gap-2">
              {selectedHorarios.map((horario, idx) => (
                <div
                  key={idx}
                  className="bg-yellow-100 text-blue-900 px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium"
                >
                  <span>
                    {horario.day} • {horario.time}
                  </span>
                </div>
              ))}
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
            label="Mensaje para el tutor"
            error={errors.mensaje}
            name="mensaje"
          />

          {/* Botones de acción */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 px-4 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={clsx(
                'flex-1 py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200',
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed opacity-60'
                  : 'bg-blue-900 hover:bg-blue-800 active:bg-blue-950'
              )}
            >
              {isLoading ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
