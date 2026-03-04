'use client';

import { useState } from 'react';
import { Experiencia } from '@/interfaces/experiencia-tipo/Experiencia';
import { InputExperiencia } from '@/components/registro/input-experiencia/InputExperiencia';
import { InputFechaExperiencia } from '@/components/registro/input-fecha-experiencia/InputFechaExperiencia';
import { clientValidarFecha } from '@/utils/clientDateValidation';

interface ModalNuevaExperienciaProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (experiencia: Experiencia) => void;
}

export function ModalNuevaExperiencia({ isOpen, onClose, onSave }: ModalNuevaExperienciaProps) {
  const [puesto, setPuesto] = useState('');
  const [institucion, setInstitucion] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [errorFechaInicio, setErrorFechaInicio] = useState<string | undefined>();
  const [errorFechaFin, setErrorFechaFin] = useState<string | undefined>();

  const handleFechaInicioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFechaInicio(value);

    if (value.trim()) {
      const validation = clientValidarFecha(value, 'fechaInicio');
      setErrorFechaInicio(validation.message);
    } else {
      setErrorFechaInicio(undefined);
    }
  };

  const handleFechaFinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFechaFin(value);

    if (value.trim()) {
      const validation = clientValidarFecha(value, 'fechaFin');
      setErrorFechaFin(validation.message);
    } else {
      setErrorFechaFin(undefined);
    }
  };

  const handleCancel = () => {
    setPuesto('');
    setInstitucion('');
    setFechaInicio('');
    setFechaFin('');
    setErrorFechaInicio(undefined);
    setErrorFechaFin(undefined);
    onClose();
  };

  const handleSave = () => {
    // CA1: Ignorar guardar experiencia vacía
    if (!puesto.trim() && !institucion.trim() && !fechaInicio.trim() && !fechaFin.trim()) {
      return;
    }

    // Validar que no haya errores de fecha
    if (errorFechaInicio || errorFechaFin) {
      return;
    }

    const nuevaExperiencia: Experiencia = {
      id: Date.now().toString(),
      puesto,
      institucion,
      fechaInicio,
      fechaFin,
    };

    onSave(nuevaExperiencia);
    handleCancel();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold mb-6 text-gray-800">Nueva Experiencia</h3>

        <div className="space-y-4">
          <InputExperiencia
            label="Puesto"
            placeholder="Ej: Profesor de Cálculo"
            value={puesto}
            onChange={(e) => setPuesto(e.target.value)}
          />

          <InputExperiencia
            label="Institución / Lugar"
            placeholder="Ej: Universidad Nacional"
            value={institucion}
            onChange={(e) => setInstitucion(e.target.value)}
          />

          <InputFechaExperiencia
            label="Fecha Inicio"
            placeholder="MM/AAAA"
            value={fechaInicio}
            onChange={handleFechaInicioChange}
            fieldName="fechaInicio"
            errorMessage={errorFechaInicio}
          />

          <InputFechaExperiencia
            label="Fecha Fin"
            placeholder="MM/AAAA o Presente"
            value={fechaFin}
            onChange={handleFechaFinChange}
            fieldName="fechaFin"
            errorMessage={errorFechaFin}
          />
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 text-white font-semibold rounded-lg transition-colors"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
