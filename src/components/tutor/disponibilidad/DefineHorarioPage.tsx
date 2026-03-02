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
      toast.error('Selecciona tu disponibilidad', {
        position: 'bottom-center',
        duration: 4000,
        unstyled: true,
        style: {
          backgroundColor: '#ef4444',
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: 'bold',
          padding: '12px 20px',
          borderRadius: '6px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        },
      });
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
      <div className="text-center mb-2">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Define tu Horario
        </h2>
        <p className="text-gray-600 text-base">
          Selecciona los bloques horarios en los que puedes dar clases
        </p>
      </div>

      {/* Error Message - Right after subtitle */}
      {errorMessage && (
        <div className="text-center mb-6">
          <p className="text-red-500 font-medium text-base">
            {errorMessage}
          </p>
        </div>
      )}

      {/* Selected counter */}
      {disponibilidad && disponibilidad.length > 0 && (
        <div className="text-center mb-6">
          <p className="text-green-600 font-medium text-sm">
            ✓ {disponibilidad.length} horario{disponibilidad.length !== 1 ? 's' : ''} seleccionado{disponibilidad.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Horario Grid */}
      <div className="mb-12">
        <HorarioGrid
          selectedBlocks={disponibilidad || []}
          onBlocksChange={(blocks) => {
            setDisponibilidad(blocks);
            setErrorMessage(null);
          }}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-12 gap-6">
        {/* Back Button */}
        <button
          onClick={onPreviousStep}
          className="flex items-center gap-3 px-6 py-3 font-semibold transition-colors rounded-lg"
          style={{
            backgroundColor: 'transparent',
            color: '#6b7280',
            cursor: 'pointer',
          }}
        >
          <span>←</span>
          <div className="flex flex-col items-start">
            <div className="font-bold">Atrás</div>
            <div className="text-sm font-normal">Datos Básicos</div>
          </div>
        </button>

        {/* Next Button */}
        <button
          onClick={handleNextStep}
          disabled={isLoading}
          className="w-1/2 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-end py-3 px-2.5"
          style={{
            backgroundColor: 'var(--primary)',
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
          onMouseEnter={(e) => {
            if (!isLoading) e.currentTarget.style.backgroundColor = 'var(--primary-dark)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--primary)';
          }}
        >
          {/* Div con dos columnas alineadas a derecha */}
          <div className="flex flex-col items-end pr-2">
            <div className="font-bold">{isLoading ? 'Procesando...' : 'Siguiente'}</div>
            <div className="text-sm font-normal">Perfil Profesional</div>
          </div>

          {/* Div con flecha */}
          <div>→</div>
        </button>
      </div>
    </div>
  );
}
