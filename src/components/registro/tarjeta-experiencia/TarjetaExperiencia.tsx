'use client';

import { Experiencia } from '@/interfaces/experiencia-tipo/Experiencia';

interface TarjetaExperienciaProps {
  experiencia: Experiencia;
  onDelete: () => void;
}

export function TarjetaExperiencia({ experiencia, onDelete }: TarjetaExperienciaProps) {
  return (
    <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{experiencia.puesto}</h3>
        <p className="text-sm text-gray-600">{experiencia.institucion}</p>
        <p className="text-xs text-gray-500">
          {experiencia.fechaInicio} — {experiencia.fechaFin}
        </p>
      </div>
      <button
        onClick={onDelete}
        className="ml-4 text-red-500 hover:text-red-700 transition-colors font-bold text-lg flex-shrink-0"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 8px' }}
        aria-label="Eliminar experiencia"
      >
        ×
      </button>
    </div>
  );
}
