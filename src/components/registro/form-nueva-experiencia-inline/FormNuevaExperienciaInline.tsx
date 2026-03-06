'use client';

import { useState } from 'react';
import { Experiencia } from '@/interfaces/experiencia-tipo/Experiencia';
import { InputExperiencia } from '@/components/registro/input-experiencia/InputExperiencia';
import { InputFechaExperiencia } from '@/components/registro/input-fecha-experiencia/InputFechaExperiencia';
import { clientValidarFecha } from '@/utils/clientDateValidation';
import { validarCamposVaciosExperiencia } from '@/utils/formValidation';

interface FormNuevaExperienciaInlineProps {
  onSave: (experiencia: Experiencia) => void;
  onCancel: () => void;
}

export function FormNuevaExperienciaInline({ onSave, onCancel }: FormNuevaExperienciaInlineProps) {
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
    onCancel();
  };

  const handleSave = () => {
    // Ignorar guardar experiencia vacía
    if (validarCamposVaciosExperiencia({ puesto, institucion, fechaInicio, fechaFin })) {
      return;
    }

    // Validar que no haya errores de fecha
    if (errorFechaInicio || errorFechaFin) {
      return;
    }

    const nuevaExperiencia: Experiencia = {
      id: Date.now().toString(), // Generar ID temporal
      puesto,
      institucion,
      fechaInicio,
      fechaFin,
    };

    onSave(nuevaExperiencia);
    handleCancel();
  };

  return (
    <div className="bg-blue-50 rounded-lg p-6 mb-6 border-2 border-blue-200">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Nueva Experiencia</h3>

      <div className="space-y-4">
        <InputExperiencia
          label="Puesto / Rol"
          placeholder="Ej. Ayudante de Cátedra"
          value={puesto}
          onChange={(e) => setPuesto(e.target.value)}
        />

        <InputExperiencia
          label="Lugar"
          placeholder="Ej. EPN, Facultad de Ciencias"
          value={institucion}
          onChange={(e) => setInstitucion(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <InputFechaExperiencia
            label="Fecha Inicio"
            placeholder="Ej. 03/2024"
            value={fechaInicio}
            onChange={handleFechaInicioChange}
            fieldName="fechaInicio"
            errorMessage={errorFechaInicio}
          />

          <InputFechaExperiencia
            label="Fecha Fin"
            placeholder="Ej. 12/2025 o Presente"
            value={fechaFin}
            onChange={handleFechaFinChange}
            fieldName="fechaFin"
            errorMessage={errorFechaFin}
          />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={handleCancel}
          className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 text-white font-semibold rounded-lg transition-colors"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
