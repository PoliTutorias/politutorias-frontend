'use client';

import clsx from 'clsx';

interface BotonSolicitarTutoriaProps {
  isDisabled: boolean;
  onClick: () => void;
  cantidadHorarios: number;
}

export default function BotonSolicitarTutoria({
  isDisabled,
  onClick,
  cantidadHorarios,
}: BotonSolicitarTutoriaProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={clsx(
        'w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200',
        isDisabled
          ? 'bg-gray-400 cursor-not-allowed opacity-60'
          : 'bg-blue-900 hover:bg-blue-800 active:bg-blue-950 shadow-md'
      )}
    >
      Solicitar Tutoría
    </button>
  );
}
