'use client';

import clsx from 'clsx';
import { Monitor, User } from 'lucide-react';

interface SelectorModalidadProps {
  selectedModalidad?: 'virtual' | 'presencial';
  onSelect: (modalidad: 'virtual' | 'presencial') => void;
  error?: string;
}

export default function SelectorModalidad({
  selectedModalidad,
  onSelect,
  error,
}: SelectorModalidadProps) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-gray-900">
        Modalidad
        <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onSelect('virtual')}
          className={clsx(
            'py-3 px-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-xs',
            selectedModalidad === 'virtual'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          <Monitor size={16} />
          Virtual
        </button>
        <button
          type="button"
          onClick={() => onSelect('presencial')}
          className={clsx(
            'py-3 px-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-xs',
            selectedModalidad === 'presencial'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          <User size={16} />
          Presencial
        </button>
      </div>
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
}
