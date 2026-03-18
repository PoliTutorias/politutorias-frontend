'use client';

import { HorarioDisponibleDto } from '@/interfaces/offers/DetallesOfertaDto';
import clsx from 'clsx';
import { X, Check } from 'lucide-react';

interface ChipHorarioProps {
  horario: HorarioDisponibleDto;
  isSelected: boolean;
  isDayPassed: boolean;
  isBlocked?: boolean;
  onSelect: (horario: HorarioDisponibleDto) => void;
  removable?: boolean;
  onRemove?: () => void;
}

export default function ChipHorario({
  horario,
  isSelected,
  isDayPassed,
  isBlocked = false,
  onSelect,
  removable = false,
  onRemove,
}: ChipHorarioProps) {
  const isDisabled = isDayPassed || isBlocked;

  const handleClick = () => {
    if (!isDisabled) {
      onSelect(horario);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      title={isBlocked ? 'Ya tienes una solicitud activa para este horario' : undefined}
      className={clsx(
        'px-2.5 py-1.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-1.5',
        isDayPassed
          ? 'bg-gray-300 text-gray-600 line-through cursor-not-allowed opacity-70'
          : isBlocked
            ? 'bg-amber-100 text-amber-700 border border-amber-300 cursor-not-allowed'
            : isSelected
              ? 'bg-yellow text-blue-900'
              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
      )}
    >
      {isBlocked && <Check size={12} className="text-amber-600" />}
      <span className="text-xs">
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

