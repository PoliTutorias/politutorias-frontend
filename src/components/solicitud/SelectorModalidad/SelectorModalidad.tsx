'use client';

import clsx from 'clsx';

interface SelectorModalidadProps {
  selectedModalidad?: 'virtual' | 'presencial';
  onSelect: (modalidad: 'virtual' | 'presencial') => void;
  error?: string;
  name: string;
}

export default function SelectorModalidad({
  selectedModalidad,
  onSelect,
  error,
  name,
}: SelectorModalidadProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-900">
        Modalidad
        <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onSelect('virtual')}
          className={clsx(
            'py-3 px-4 rounded-lg font-semibold transition-all duration-200 border-2',
            selectedModalidad === 'virtual'
              ? 'bg-blue-900 text-white border-blue-900'
              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
          )}
        >
          Virtual
        </button>
        <button
          type="button"
          onClick={() => onSelect('presencial')}
          className={clsx(
            'py-3 px-4 rounded-lg font-semibold transition-all duration-200 border-2',
            selectedModalidad === 'presencial'
              ? 'bg-blue-900 text-white border-blue-900'
              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
          )}
        >
          Presencial
        </button>
      </div>
      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
    </div>
  );
}
