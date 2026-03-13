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
        'px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2',
        isDayPassed
          ? 'bg-blue-200 text-blue-600 line-through cursor-not-allowed opacity-60'
          : isSelected
            ? 'bg-yellow text-blue-900'
            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
      )}
    >
      <span className="text-sm">
        {horario.time}
      </span>
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
