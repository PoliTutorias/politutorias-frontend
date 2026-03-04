'use client';

import { useState, useTransition, useMemo, useCallback } from 'react';
import { OfertaEntity } from '@/interfaces/ofertas/OfertaEntity';
import { OfertasResult } from '@/interfaces/ofertas/OfertasResult';
import { PrecioFilterComponent } from '@/components/ofertas/PrecioFilterComponent/PrecioFilterComponent';
import { OfertasListComponent } from '@/components/ofertas/OfertasListComponent/OfertasListComponent';
import { NoOffersMessageComponent } from '@/components/ofertas/NoOffersMessageComponent/NoOffersMessageComponent';
import { filtrarOfertasAction } from '@/actions/ofertas/filtrarOfertasAction';
import { debounce } from '@/utils/debounce';

interface ClientOffersWrapperProps {
  initialOffers: OfertaEntity[];
  children: React.ReactNode;
}

// Constantes del rango de precio
const ABSOLUTE_MIN = 5;
const ABSOLUTE_MAX = 20;
const DEFAULT_MIN = 5;
const DEFAULT_MAX = 20;

/**
 * ClientOffersWrapper - Client Component (HU27)
 * 
 * Gestiona el estado interactivo de las ofertas filtradas y
 * proporciona el layout de dos columnas (filtros + contenido).
 * Conecta el PrecioFilterComponent con filtrarOfertasAction.
 */
export function ClientOffersWrapper({ initialOffers, children }: ClientOffersWrapperProps) {
  const [offers, setOffers] = useState<OfertaEntity[]>(initialOffers);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [activeMinPrice, setActiveMinPrice] = useState<number | null>(null);
  const [activeMaxPrice, setActiveMaxPrice] = useState<number | null>(null);

  // Determinar si hay un filtro de precio activo
  const isPriceFilterActive = activeMinPrice !== null && activeMaxPrice !== null;

  /**
   * Handler que invoca filtrarOfertasAction con el rango de precio
   */
  const handlePriceRangeChange = useCallback(
    (min: number, max: number) => {
      // Si el rango es el total (absoluto), desactivar filtro
      if (min === ABSOLUTE_MIN && max === ABSOLUTE_MAX) {
        setActiveMinPrice(null);
        setActiveMaxPrice(null);
        setOffers(initialOffers);
        setError(null);
        return;
      }

      setActiveMinPrice(min);
      setActiveMaxPrice(max);

      startTransition(async () => {
        const result = await filtrarOfertasAction(min, max);

        if ('error' in result) {
          setError(result.error);
          setOffers([]);
        } else {
          setError(null);
          setOffers((result as OfertasResult).ofertas);
        }
      });
    },
    [initialOffers, startTransition]
  );

  /**
   * Handler con debounce para optimizar llamadas al mover el slider
   */
  const debouncedHandlePriceRangeChange = useMemo(
    () => debounce(handlePriceRangeChange, 500),
    [handlePriceRangeChange]
  );

  /**
   * Limpiar filtro de precio individual (tag X)
   */
  const handleClearPriceFilter = useCallback(() => {
    setActiveMinPrice(null);
    setActiveMaxPrice(null);
    setOffers(initialOffers);
    setError(null);
  }, [initialOffers]);

  /**
   * Limpiar todos los filtros
   */
  const handleClearAllFilters = useCallback(() => {
    setActiveMinPrice(null);
    setActiveMaxPrice(null);
    setOffers(initialOffers);
    setError(null);
  }, [initialOffers]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex gap-8">
        {/* Sidebar de Filtros - Columna izquierda */}
        <aside className="w-[280px] shrink-0">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[var(--foreground)] font-inter">
                Filtros
              </h2>
              {isPriceFilterActive && (
                <button
                  onClick={handleClearAllFilters}
                  className="text-sm font-medium text-[var(--error)] hover:text-[var(--error-light)] transition-colors cursor-pointer font-inter"
                >
                  Limpiar todo
                </button>
              )}
            </div>

            {/* Sección: Modalidad (placeholder visual) */}
            <div className="mb-6">
              <h3 className="text-base font-semibold text-[var(--foreground)] font-inter mb-3">
                Modalidad
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--primary)] text-white cursor-pointer">
                  Todas
                </span>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium border border-gray-300 text-gray-700 cursor-pointer hover:bg-gray-50">
                  Presencial
                </span>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium border border-gray-300 text-gray-700 cursor-pointer hover:bg-gray-50">
                  Virtual
                </span>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium border border-gray-300 text-gray-700 cursor-pointer hover:bg-gray-50">
                  Ambos
                </span>
              </div>
            </div>

            {/* Sección: Disponibilidad (placeholder visual) */}
            <div className="mb-6">
              <h3 className="text-base font-semibold text-[var(--foreground)] font-inter mb-1">
                Disponibilidad
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mb-3">Día de la semana</p>
              <div className="flex flex-wrap gap-2">
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day) => (
                  <span
                    key={day}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 cursor-pointer hover:bg-gray-50"
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>

            {/* Separador */}
            <div className="border-t border-gray-200 mb-6" />

            {/* Sección: Filtro de Precio (HU27 - funcional) */}
            <PrecioFilterComponent
              initialMinPrice={activeMinPrice ?? DEFAULT_MIN}
              initialMaxPrice={activeMaxPrice ?? DEFAULT_MAX}
              absoluteMin={ABSOLUTE_MIN}
              absoluteMax={ABSOLUTE_MAX}
              onPriceRangeChange={debouncedHandlePriceRangeChange}
            />

            {/* Separador */}
            <div className="border-t border-gray-200 my-6" />

            {/* Sección: Área de Conocimiento (placeholder visual) */}
            <div>
              <div className="flex items-center justify-between cursor-pointer">
                <h3 className="text-base font-semibold text-[var(--foreground)] font-inter">
                  Área de Conocimiento
                </h3>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </div>
              <div className="mt-3 space-y-2">
                {['Matemática', 'Física', 'Química'].map((area) => (
                  <label key={area} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]" />
                    <span className="text-sm text-gray-700 font-inter">{area}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Contenido principal - Columna derecha */}
        <div className="flex-1 min-w-0">
          {/* Etiquetas de filtros activos */}
          {isPriceFilterActive && (
            <div className="flex items-center gap-3 mb-4">
              {/* Tag de precio activo (verde) */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium text-[var(--success)] bg-green-50 border border-green-200">
                ${activeMinPrice} - ${activeMaxPrice}
                <button
                  onClick={handleClearPriceFilter}
                  className="ml-0.5 hover:text-green-800 transition-colors cursor-pointer"
                  aria-label="Remover filtro de precio"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>

              {/* Botón Limpiar todos (gris) */}
              <button
                onClick={handleClearAllFilters}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-gray-600 bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Limpiar todos
              </button>
            </div>
          )}

          {/* Estado de carga */}
          {isPending && (
            <div className="mb-4 text-sm text-[var(--text-secondary)] font-inter animate-pulse">
              Buscando ofertas...
            </div>
          )}

          {/* Error del servidor */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-[var(--error)] font-inter">
              {error}
            </div>
          )}

          {/* Renderizado condicional: si hay filtro de precio activo, mostrar resultados filtrados */}
          {isPriceFilterActive ? (
            <>
              {/* Contador de resultados filtrados */}
              <div className="text-right mb-6">
                <p className="font-inter text-sm text-[var(--text-muted)]">
                  {offers.length} {offers.length === 1 ? 'resultado' : 'resultados'}
                </p>
              </div>

              {!isPending && offers.length > 0 && (
                <OfertasListComponent offers={offers} />
              )}
              {!isPending && offers.length === 0 && (
                <NoOffersMessageComponent onClearFilters={handleClearAllFilters} />
              )}
            </>
          ) : (
            /* Sin filtro de precio: mostrar contenido original (children) */
            children
          )}
        </div>
      </div>
    </div>
  );
}
