'use client';

import { Experiencia } from '@/interfaces/experiencia-tipo/Experiencia';

interface TarjetaExperienciaProps {
  experiencia: Experiencia;
  onDelete: () => void;
}

export function TarjetaExperiencia({ experiencia, onDelete }: TarjetaExperienciaProps) {
  return (
    <div className="flex justify-between items-start p-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors">
      <div className="flex-1 grid grid-cols-3 gap-8">
        {/* Columna Puesto */}
        <div>
          <p className="text-xs text-gray-500 mb-1">Puesto</p>
          <p className="text-sm font-semibold text-gray-900">{experiencia.puesto}</p>
        </div>
        
        {/* Columna Lugar */}
        <div>
          <p className="text-xs text-gray-500 mb-1">Lugar</p>
          <p className="text-sm font-semibold text-gray-900">{experiencia.institucion}</p>
        </div>
        
        {/* Columna Periodo */}
        <div>
          <p className="text-xs text-gray-500 mb-1">Periodo</p>
          <p className="text-sm text-gray-500">
            {experiencia.fechaInicio} — {experiencia.fechaFin}
          </p>
        </div>
      </div>
      
      <button
        onClick={onDelete}
        className="ml-4 text-red-500 hover:text-red-700 transition-colors font-bold text-xl flex-shrink-0"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 8px', lineHeight: 1 }}
        aria-label="Eliminar experiencia"
      >
        ×
      </button>
    </div>
  );
}
