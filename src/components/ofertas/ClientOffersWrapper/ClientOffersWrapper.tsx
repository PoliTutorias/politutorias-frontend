'use client';

import type { FiltrarOfertasParams } from '@/actions/ofertas/filtrarOfertasAction';
import { filtrarOfertasAction } from '@/actions/ofertas/filtrarOfertasAction';
import { NoOffersMessageComponent } from '@/components/ofertas/NoOffersMessageComponent/NoOffersMessageComponent';
import { OfertasListComponent } from '@/components/ofertas/OfertasListComponent/OfertasListComponent';
import { PrecioFilterComponent } from '@/components/ofertas/PrecioFilterComponent/PrecioFilterComponent';
import { OfertaEntity } from '@/interfaces/ofertas/OfertaEntity';
import { OfertasResult } from '@/interfaces/ofertas/OfertasResult';
import { debounce } from '@/utils/debounce';
import { useCallback, useMemo, useState, useTransition } from 'react';

interface ClientOffersWrapperProps {
  initialOffers: OfertaEntity[];
  header: React.ReactNode;
  children: React.ReactNode;
  /** Initial search term from the URL (if any) */
  initialSearchTerm?: string;
}

// Constantes del rango de precio
const ABSOLUTE_MIN = 5;
const ABSOLUTE_MAX = 20;
const DEFAULT_MIN = 5;
const DEFAULT_MAX = 20;

// Tipos de modalidad para el filtro HU26
type ModalidadFilter = 'Todas' | 'Presencial' | 'Virtual' | 'Ambos';

// Mapeo modalidad frontend → backend query parameter
const MODALIDAD_TO_BACKEND: Record<ModalidadFilter, string | undefined> = {
  Todas: undefined,
  Presencial: 'PRESENCIAL,AMBOS',
  Virtual: 'VIRTUAL,AMBOS',
  Ambos: 'AMBOS',
};

// Días de la semana para HU16
const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] as const;
type DayLabel = (typeof DAYS)[number];

// Mapeo día frontend → backend query parameter (abreviado, como lo almacena la BD)
const DAY_TO_BACKEND: Record<DayLabel, string> = {
  Lun: 'Lun',
  Mar: 'Mar',
  Mié: 'Mié',
  Jue: 'Jue',
  Vie: 'Vie',
  Sáb: 'Sáb',
  Dom: 'Dom',
};

// Mapeo día → ID seguro (sin tildes) para selectores CSS en tests E2E
const DAY_TO_SAFE_ID: Record<DayLabel, string> = {
  Lun: 'lun',
  Mar: 'mar',
  Mié: 'mie',
  Jue: 'jue',
  Vie: 'vie',
  Sáb: 'sab',
  Dom: 'dom',
};

/**
 * ClientOffersWrapper - Client Component (HU26 + HU27 + HU16)
 *
 * Gestiona el estado interactivo de los filtros de ofertas:
 * - Modalidad (Todas/Presencial/Virtual/Ambos) — HU26
 * - Precio (slider de rango dual) — HU27
 * - Disponibilidad (días de la semana) — HU16
 *
 * Cada cambio de filtro re-dispara la consulta al backend enviando
 * todos los criterios activos combinados.
 */
export function ClientOffersWrapper({ initialOffers, header, children, initialSearchTerm }: ClientOffersWrapperProps) {
  const [offers, setOffers] = useState<OfertaEntity[]>(initialOffers);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Estado de filtro de precio (HU27)
  const [activeMinPrice, setActiveMinPrice] = useState<number | null>(null);
  const [activeMaxPrice, setActiveMaxPrice] = useState<number | null>(null);

  // Estado de filtro de modalidad (HU26)
  const [activeModalidad, setActiveModalidad] = useState<ModalidadFilter>('Todas');

  // Estado de filtro de disponibilidad (HU16)
  const [activeDay, setActiveDay] = useState<DayLabel | null>(null);

  // Estado de búsqueda (HU17)
  const [activeSearchTerm, setActiveSearchTerm] = useState<string>(initialSearchTerm ?? '');

  // Determinar si hay algún filtro activo
  const isPriceFilterActive = activeMinPrice !== null && activeMaxPrice !== null;
  const isModalidadFilterActive = activeModalidad !== 'Todas';
  const isDayFilterActive = activeDay !== null;
  const isSearchActive = activeSearchTerm.trim().length > 0;
  const isAnyFilterActive = isPriceFilterActive || isModalidadFilterActive || isDayFilterActive || isSearchActive;
  const hasNonSearchFilterActive = isPriceFilterActive || isModalidadFilterActive || isDayFilterActive;

  /**
   * Construye los parámetros de filtro actuales y dispara la consulta al backend
   */
  const executeFilter = useCallback(
    (overrides: {
      modalidad?: ModalidadFilter;
      minPrice?: number | null;
      maxPrice?: number | null;
      day?: DayLabel | null;
      searchTerm?: string;
    } = {}) => {
      const currentModalidad = overrides.modalidad ?? activeModalidad;
      const currentMinPrice = overrides.minPrice !== undefined ? overrides.minPrice : activeMinPrice;
      const currentMaxPrice = overrides.maxPrice !== undefined ? overrides.maxPrice : activeMaxPrice;
      const currentDay = overrides.day !== undefined ? overrides.day : activeDay;
      const currentSearch = overrides.searchTerm !== undefined ? overrides.searchTerm : activeSearchTerm;

      // Si no hay ningún filtro activo, volver a los datos iniciales
      const hasPrice = currentMinPrice !== null && currentMaxPrice !== null;
      const hasModalidad = currentModalidad !== 'Todas';
      const hasDay = currentDay !== null;
      const hasSearch = currentSearch.trim().length > 0;

      if (!hasPrice && !hasModalidad && !hasDay && !hasSearch) {
        setOffers(initialOffers);
        setError(null);
        return;
      }

      // Construir parámetros
      const params: FiltrarOfertasParams = {};

      if (hasPrice) {
        params.minPrice = currentMinPrice!;
        params.maxPrice = currentMaxPrice!;
      }

      if (hasModalidad) {
        params.modalidad = MODALIDAD_TO_BACKEND[currentModalidad];
      }

      if (hasDay) {
        params.disponibilidad = DAY_TO_BACKEND[currentDay!];
      }

      if (hasSearch) {
        params.searchTerm = currentSearch.trim();
      }

      startTransition(async () => {
        const result = await filtrarOfertasAction(params);

        if ('error' in result) {
          setError(result.error);
          setOffers([]);
        } else {
          setError(null);
          setOffers((result as OfertasResult).ofertas);
        }
      });
    },
    [activeModalidad, activeMinPrice, activeMaxPrice, activeDay, activeSearchTerm, initialOffers, startTransition]
  );

  /**
   * Handler de cambio de precio (HU27)
   */
  const handlePriceRangeChange = useCallback(
    (min: number, max: number) => {
      // Si el rango es el absoluto, desactivar filtro de precio
      if (min === ABSOLUTE_MIN && max === ABSOLUTE_MAX) {
        setActiveMinPrice(null);
        setActiveMaxPrice(null);
        executeFilter({ minPrice: null, maxPrice: null });
        return;
      }

      setActiveMinPrice(min);
      setActiveMaxPrice(max);
      executeFilter({ minPrice: min, maxPrice: max });
    },
    [executeFilter]
  );

  /**
   * Handler con debounce para el slider de precio
   */
  const debouncedHandlePriceRangeChange = useMemo(
    () => debounce(handlePriceRangeChange, 500),
    [handlePriceRangeChange]
  );

  /**
   * Handler de cambio de modalidad (HU26)
   */
  const handleModalidadChange = useCallback(
    (modalidad: ModalidadFilter) => {
      setActiveModalidad(modalidad);
      executeFilter({ modalidad });
    },
    [executeFilter]
  );

  /**
   * Handler de cambio de disponibilidad (HU16)
   */
  const handleDayChange = useCallback(
    (day: DayLabel) => {
      const newDay = activeDay === day ? null : day;
      setActiveDay(newDay);
      executeFilter({ day: newDay });
    },
    [activeDay, executeFilter]
  );

  /**
   * Limpiar filtro individual de precio
   */
  const handleClearPriceFilter = useCallback(() => {
    setActiveMinPrice(null);
    setActiveMaxPrice(null);
    executeFilter({ minPrice: null, maxPrice: null });
  }, [executeFilter]);

  /**
   * Limpiar filtro individual de modalidad
   */
  const handleClearModalidadFilter = useCallback(() => {
    setActiveModalidad('Todas');
    executeFilter({ modalidad: 'Todas' });
  }, [executeFilter]);

  /**
   * Limpiar filtro individual de disponibilidad
   */
  const handleClearDayFilter = useCallback(() => {
    setActiveDay(null);
    executeFilter({ day: null });
  }, [executeFilter]);

  /**
   * Handler de búsqueda (HU17)
   */
  const handleSearchChange = useCallback(
    (term: string) => {
      setActiveSearchTerm(term);
      executeFilter({ searchTerm: term });
    },
    [executeFilter]
  );

  /**
   * Handler con debounce para la búsqueda
   */
  const debouncedHandleSearchChange = useMemo(
    () => debounce(handleSearchChange, 300),
    [handleSearchChange]
  );

  /**
   * Limpiar filtro de búsqueda
   */
  const handleClearSearchFilter = useCallback(() => {
    setActiveSearchTerm('');
    executeFilter({ searchTerm: '' });
  }, [executeFilter]);

  /**
   * Limpiar todos los filtros
   */
  const handleClearAllFilters = useCallback(() => {
    setActiveMinPrice(null);
    setActiveMaxPrice(null);
    setActiveModalidad('Todas');
    setActiveDay(null);
    setActiveSearchTerm('');
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
              {isAnyFilterActive && (
                <button
                  id="clear-all-filters-sidebar"
                  onClick={handleClearAllFilters}
                  className="text-sm font-medium text-[var(--error)] hover:text-[var(--error-light)] transition-colors cursor-pointer font-inter"
                >
                  Limpiar todo
                </button>
              )}
            </div>

            {/* Sección: Modalidad (HU26 - funcional) */}
            <div className="mb-6">
              <h3 className="text-base font-semibold text-[var(--foreground)] font-inter mb-3">
                Modalidad
              </h3>
              <div className="flex flex-wrap gap-2" id="modalidad-filter-group">
                {(['Todas', 'Presencial', 'Virtual', 'Ambos'] as ModalidadFilter[]).map((mod) => (
                  <button
                    key={mod}
                    id={`filter-modalidad-${mod.toLowerCase()}`}
                    data-testid={`filter-modalidad-${mod.toLowerCase()}`}
                    onClick={() => handleModalidadChange(mod)}
                    className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${activeModalidad === mod
                      ? 'bg-[var(--primary)] text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    {mod}
                  </button>
                ))}
              </div>
            </div>

            {/* Sección: Disponibilidad (HU16 - funcional) */}
            <div className="mb-6">
              <h3 className="text-base font-semibold text-[var(--foreground)] font-inter mb-1">
                Disponibilidad
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mb-3">Día de la semana</p>
              <div className="flex flex-wrap gap-2" id="disponibilidad-filter-group">
                {DAYS.map((day) => (
                  <button
                    key={day}
                    id={`filter-day-${DAY_TO_SAFE_ID[day]}`}
                    data-testid={`filter-day-${DAY_TO_SAFE_ID[day]}`}
                    onClick={() => handleDayChange(day)}
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeDay === day
                      ? 'bg-[var(--primary)] text-white border border-[var(--primary)]'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Separador */}
            <div className="border-t border-gray-200 mb-6" />

            {/* Sección: Filtro de Precio (HU27 - funcional) */}
            <PrecioFilterComponent
              key={`${activeMinPrice ?? DEFAULT_MIN}-${activeMaxPrice ?? DEFAULT_MAX}`}
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
          {/* Barra de búsqueda integrada + contador */}
          <div className="flex items-start justify-between mb-6">
            <SearchBarIntegrated
              value={activeSearchTerm}
              onSearchChange={debouncedHandleSearchChange}
            />
            <div className="text-right shrink-0 ml-4 pt-3">
              <p className="font-inter text-sm text-[var(--text-muted)]">
                {offers.length} {offers.length === 1 ? 'resultado' : 'resultados'}
              </p>
            </div>
          </div>

          {/* Etiquetas de filtros activos (solo filtros, no búsqueda) */}
          {hasNonSearchFilterActive && (
            <div className="flex items-center gap-3 mb-4 flex-wrap" id="active-filters-tags" data-testid="active-filters-tags">
              {/* Tag de modalidad (morado) — HU26 */}
              {isModalidadFilterActive && (
                <span
                  data-testid="tag-modalidad"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium text-purple-700 bg-purple-50 border border-purple-200"
                >
                  {activeModalidad}
                  <button
                    id="clear-modalidad-tag"
                    data-testid="clear-modalidad-tag"
                    onClick={handleClearModalidadFilter}
                    className="ml-0.5 hover:text-purple-900 transition-colors cursor-pointer"
                    aria-label="Remover filtro de modalidad"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}

              {/* Tag de precio (verde) — HU27 */}
              {isPriceFilterActive && (
                <span
                  data-testid="tag-precio"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium text-[var(--success)] bg-green-50 border border-green-200"
                >
                  ${activeMinPrice} - ${activeMaxPrice}
                  <button
                    id="clear-price-tag"
                    data-testid="clear-price-tag"
                    onClick={handleClearPriceFilter}
                    className="ml-0.5 hover:text-green-800 transition-colors cursor-pointer"
                    aria-label="Remover filtro de precio"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}

              {/* Tag de disponibilidad (naranja) — HU16 */}
              {isDayFilterActive && (
                <span
                  data-testid="tag-disponibilidad"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium text-orange-700 bg-orange-50 border border-orange-200"
                >
                  {activeDay}
                  <button
                    id="clear-day-tag"
                    data-testid="clear-day-tag"
                    onClick={handleClearDayFilter}
                    className="ml-0.5 hover:text-orange-900 transition-colors cursor-pointer"
                    aria-label="Remover filtro de disponibilidad"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}

              {/* Botón Limpiar todos */}
              <button
                id="clear-all-filters-tags"
                data-testid="clear-all-filters"
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

          {/* Renderizado condicional */}
          {isAnyFilterActive ? (
            <>
              {!isPending && offers.length > 0 && (
                <OfertasListComponent offers={offers} />
              )}
              {!isPending && offers.length === 0 && (
                <NoOffersMessageComponent onClearFilters={handleClearAllFilters} />
              )}
            </>
          ) : (
            /* Sin filtros activos: mostrar contenido original (children) */
            children
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * SearchBarIntegrated — Input de búsqueda integrado al sistema de filtros
 * No navega por URL, sino que comunica directamente con el ClientOffersWrapper.
 */
function SearchBarIntegrated({
  value,
  onSearchChange,
}: {
  value: string;
  onSearchChange: (term: string) => void;
}) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (newValue: string) => {
    setInputValue(newValue);
    onSearchChange(newValue);
  };

  return (
    <div className="relative w-1/2">
      <svg
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder="Buscar por materia, tutor..."
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border border-[var(--input-border)] rounded-lg focus:outline-none focus:border-[var(--input-border-focus)] focus:ring-1 focus:ring-[var(--input-border-focus)] font-inter text-base text-[var(--foreground)]"
      />
    </div>
  );
}
