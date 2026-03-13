'use client';

import { HorarioDisponibleDto } from '@/interfaces/offers/DetallesOfertaDto';
import clsx from 'clsx';
import { X } from 'lucide-react';

interface ChipHorarioProps {
  horario: HorarioDisponibleDto;
  isSelected: boolean;
  isDayPassed: boolean;
  onSelect: (horario: HorarioDisponibleDto) => void;
  removable?: boolean;
  onRemove?: () => void;
}

export default function ChipHorario({
  horario,
  isSelected,
  isDayPassed,
  onSelect,
  removable = false,
  onRemove,
}: ChipHorarioProps) {
  const handleClick = () => {
    if (!isDayPassed) {
      onSelect(horario);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isDayPassed}
      className={clsx(
        'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2',
        isDayPassed
          ? 'bg-gray-200 text-gray-500 line-through cursor-not-allowed opacity-60'
          : isSelected
            ? 'bg-yellow-400 text-blue-900 shadow-md border-2 border-yellow-500'
            : 'bg-white text-blue-900 border-2 border-gray-300 hover:border-yellow-400 hover:bg-yellow-50'
      )}
    >
      <span className="text-sm">
        {horario.day} • {horario.time}
      </span>
      {isDayPassed && <span className="text-xs ml-1">Día pasado</span>}
      {removable && isSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="ml-2 hover:bg-yellow-500 rounded p-0.5 transition-colors"
          title="Remover horario"
        >
          <X size={16} />
        </button>
      )}
    </button>
  );
}
