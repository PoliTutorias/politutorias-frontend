'use client';

import { useState } from 'react';
import { HorarioGrid } from '../HorarioGrid/HorarioGrid';
import { useRegistroStore } from '@/lib/stores/registroStore';

interface DefineHorarioPageProps {
  onStepComplete?: () => void;
  onPreviousStep?: () => void;
}

export function DefineHorarioPage({
  onStepComplete,
  onPreviousStep,
}: DefineHorarioPageProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { disponibilidad, setDisponibilidad } = useRegistroStore();

  const handleNextStep = () => {
    if (!disponibilidad || disponibilidad.length === 0) {
      setErrorMessage('Selecciona al menos un horario disponible');
      return;
    }
    onStepComplete?.();
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
          className="flex items-center gap-2 px-8 py-3 font-medium text-white rounded-lg transition-colors"
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
