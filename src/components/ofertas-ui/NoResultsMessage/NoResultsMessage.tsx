'use client';

import { FiSearch } from 'react-icons/fi';

/**
 * Componente NoResultsMessage para mostrar cuando no hay resultados de búsqueda
 *
 * Se muestra cuando una búsqueda no produce resultados.
 * Incluye un icono de lupa, mensaje principal y subtexto sugeridor.
 */
export function NoResultsMessage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      {/* Icono de lupa en círculo */}
      <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-[var(--bg-gray)]">
        <FiSearch size={40} className="text-[var(--text-secondary)]" />
      </div>

      {/* Mensaje principal en negrita */}
      <h2 className="mb-3 text-xl font-bold text-[var(--foreground)] font-inter">
        No se encontraron ofertas
      </h2>

      {/* Subtexto explicativo */}
      <p className="text-base text-[var(--text-muted)] font-inter text-center">
        Intenta ajustar tus filtros de búsqueda
      </p>
    </div>
  );
}
