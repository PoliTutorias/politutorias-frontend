'use client';

interface BotonFinalizarRegistroProps {
  onClick: () => void;
  isLoading?: boolean;
}

export function BotonFinalizarRegistro({ onClick, isLoading = false }: BotonFinalizarRegistroProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="w-full px-6 py-3 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      style={{ backgroundColor: 'var(--primary)' }}
    >
      {isLoading ? 'Finalizando...' : 'Finalizar Registro'}
    </button>
  );
}
