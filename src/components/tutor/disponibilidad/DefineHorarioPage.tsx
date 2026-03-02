'use client';

import { useState } from 'react';
import { HorarioGrid } from '../HorarioGrid/HorarioGrid';
import { useRegistroStore } from '@/lib/stores/registroStore';
import { guardarDisponibilidadAction } from '@/actions/tutor/guardarDisponibilidadAction';
import { toast } from 'sonner';

interface DefineHorarioPageProps {
  onStepComplete?: () => void;
  onPreviousStep?: () => void;
}

export function DefineHorarioPage({
  onStepComplete,
  onPreviousStep,
}: DefineHorarioPageProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { disponibilidad, setDisponibilidad } = useRegistroStore();

  const handleNextStep = async () => {
    if (!disponibilidad || disponibilidad.length === 0) {
      setErrorMessage('Selecciona al menos un horario disponible');
      return;
    }

    // Simular guardado con Server Action
    setIsLoading(true);
    try {
      const result = await guardarDisponibilidadAction({
        tutorId: 'a1b2c3d4e5f6g7h8i9j0', // TODO: Obtener tutorId del contexto de autenticación
        blocks: disponibilidad,
      });

      if ('error' in result) {
        setErrorMessage(result.error);
        toast.error(result.error);
      } else {
        toast.success(result.message);
        onStepComplete?.();
      }
    } catch (error) {
      setErrorMessage('Error al guardar la disponibilidad');
      toast.error('Error al guardar la disponibilidad');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Title and Subtitle */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Define tu Horario
        </h2>
        <p className="text-gray-600 text-base">
          Selecciona los bloques horarios en los que puedes dar clases
        </p>
      </div>

      {/* Selected counter */}
      {disponibilidad && disponibilidad.length > 0 && (
        <div className="text-center mb-6">
          <p className="text-green-600 font-medium text-sm">
            ✓ {disponibilidad.length} horario{disponibilidad.length !== 1 ? 's' : ''} seleccionado{disponibilidad.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Horario Grid */}
      <div className="mb-8">
        <HorarioGrid
          selectedBlocks={disponibilidad || []}
          onBlocksChange={(blocks) => {
            setDisponibilidad(blocks);
            setErrorMessage(null);
          }}
        />
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="text-center mb-8">
          <p className="text-red-500 font-medium">
            {errorMessage}
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-12">
        <button
          onClick={onPreviousStep}
          className="flex items-center gap-2 px-6 py-3 text-gray-700 font-medium hover:text-gray-900 transition-colors"
        >
          <span>←</span>
          <span>Atrás</span>
          <span>Datos Básicos</span>
        </button>

        <button
          onClick={handleNextStep}
          disabled={isLoading}
          className="flex items-center gap-2 px-8 py-3 font-medium text-white rounded-lg transition-colors disabled:opacity-50"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <span>Siguiente</span>
          <span>Perfil Profesional</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
