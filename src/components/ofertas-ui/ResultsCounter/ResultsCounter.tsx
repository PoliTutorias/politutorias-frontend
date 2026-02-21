'use client';

/**
 * Componente ResultsCounter para mostrar el número de resultados de búsqueda
 *
 * Muestra el total de ofertas encontradas en el formato "X resultados".
 * Se posiciona en la parte superior derecha de la interfaz de búsqueda.
 */

interface ResultsCounterProps {
  totalResults: number;
}

export function ResultsCounter({ totalResults }: ResultsCounterProps) {
  return (
    <div className="text-right mb-6">
      <p className="font-inter text-sm text-[var(--text-muted)]">
        {totalResults} {totalResults === 1 ? 'resultado' : 'resultados'}
      </p>
    </div>
  );
}
