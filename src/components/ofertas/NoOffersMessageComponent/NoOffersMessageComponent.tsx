'use client';

import { FiSearch } from 'react-icons/fi';

interface NoOffersMessageComponentProps {
  onClearFilters?: () => void;
}

/**
 * NoOffersMessageComponent - Client Component (HU27)
 * 
 * Muestra un mensaje cuando la lista de ofertas está vacía
 * después de aplicar un filtro de precio.
 * Incluye icono, mensaje principal, subtexto y botón de "Limpiar filtros".
 * Diseño basado en el prototipo "E. Inicio Estudiante 1" (estado sin coincidencias).
 */
export function NoOffersMessageComponent({ onClearFilters }: NoOffersMessageComponentProps) {
  return (
    <div data-testid="no-offers-message" className="flex flex-col items-center justify-center rounded-lg bg-white p-12 shadow-sm">
      {/* Icono de lupa en círculo */}
      <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-[var(--bg-gray)]">
        <FiSearch size={40} className="text-[var(--text-secondary)]" />
      </div>

      {/* Mensaje principal */}
      <h2 data-testid="no-offers-title" className="mb-3 text-xl font-bold text-[var(--foreground)] font-inter">
        No se encontraron ofertas
      </h2>

      {/* Subtexto explicativo */}
      <p data-testid="no-offers-subtitle" className="mb-6 text-base text-[var(--text-muted)] font-inter text-center">
        Intenta ajustar tus filtros de búsqueda
      </p>

      {/* Botón Limpiar filtros */}
      {onClearFilters && (
        <button
          data-testid="no-offers-clear-filters"
          onClick={onClearFilters}
          className="text-base font-semibold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors cursor-pointer font-inter underline-offset-2 hover:underline"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
