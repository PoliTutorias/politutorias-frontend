'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface PrecioFilterComponentProps {
  initialMinPrice?: number;
  initialMaxPrice?: number;
  absoluteMin?: number;
  absoluteMax?: number;
  onPriceRangeChange: (min: number, max: number) => void;
}

/**
 * PrecioFilterComponent - Client Component (HU27)
 *
 * Slider de rango dual para filtrar ofertas por precio.
 * Muestra valores formateados como moneda ($X.XX).
 *
 * Los inputs de rango tienen `pointer-events: auto` en el thumb
 * para permitir interacción con Playwright y usuarios.
 */
export function PrecioFilterComponent({
  initialMinPrice = 5,
  initialMaxPrice = 20,
  absoluteMin = 5,
  absoluteMax = 20,
  onPriceRangeChange,
}: PrecioFilterComponentProps) {
  const [minPrice, setMinPrice] = useState<number>(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState<number>(initialMaxPrice);
  const rangeRef = useRef<HTMLDivElement>(null);

  // Formatear precio como moneda
  const formatPrice = (value: number): string => {
    return `$${value.toFixed(2)}`;
  };

  // Calcular porcentaje para la posición del thumb
  const getPercent = useCallback(
    (value: number) => {
      return ((value - absoluteMin) / (absoluteMax - absoluteMin)) * 100;
    },
    [absoluteMin, absoluteMax]
  );

  // Actualizar la barra visual del rango
  useEffect(() => {
    if (rangeRef.current) {
      const minPercent = getPercent(minPrice);
      const maxPercent = getPercent(maxPrice);
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minPrice, maxPrice, getPercent]);

  // Handler para el slider mínimo
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinPrice(value);
    onPriceRangeChange(value, maxPrice);
  };

  // Handler para el slider máximo
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    setMaxPrice(value);
    onPriceRangeChange(minPrice, value);
  };

  return (
    <div className="w-full">
      {/* Título de sección */}
      <h3 className="text-base font-semibold text-[var(--foreground)] font-inter mb-3">
        Precio
      </h3>

      {/* Valores de precio */}
      <div className="flex items-center justify-between mb-3">
        <span id="precio-min-label" data-testid="precio-min-label" className="text-sm font-medium text-[var(--foreground)] font-inter">
          {formatPrice(minPrice)}
        </span>
        <span id="precio-max-label" data-testid="precio-max-label" className="text-sm font-medium text-[var(--foreground)] font-inter">
          {formatPrice(maxPrice)}
        </span>
      </div>

      {/* Contenedor del slider dual */}
      <div className="relative h-8 w-full" id="precio-slider-container">
        {/* Track base (gris) */}
        <div className="absolute top-1/2 -translate-y-1/2 h-[3px] w-full rounded-full bg-gray-200" />

        {/* Track activo (azul) */}
        <div
          ref={rangeRef}
          className="absolute top-1/2 -translate-y-1/2 h-[3px] rounded-full"
          style={{ backgroundColor: '#17253d' }}
        />

        {/* Input range mínimo */}
        <input
          id="precio-slider-min"
          data-testid="precio-slider-min"
          type="range"
          min={absoluteMin}
          max={absoluteMax}
          value={minPrice}
          onChange={handleMinChange}
          aria-label="Precio mínimo"
          className="precio-slider absolute top-1/2 -translate-y-1/2 left-0 h-0 w-full appearance-none bg-transparent outline-none"
          style={{ zIndex: minPrice > absoluteMax - 10 ? 5 : 3, pointerEvents: 'auto' }}
        />

        {/* Input range máximo */}
        <input
          id="precio-slider-max"
          data-testid="precio-slider-max"
          type="range"
          min={absoluteMin}
          max={absoluteMax}
          value={maxPrice}
          onChange={handleMaxChange}
          aria-label="Precio máximo"
          className="precio-slider absolute top-1/2 -translate-y-1/2 left-0 h-0 w-full appearance-none bg-transparent outline-none"
          style={{ zIndex: 4, pointerEvents: 'auto' }}
        />
      </div>

      <style>{`
        .precio-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #17253d;
          cursor: pointer;
          pointer-events: all;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
          margin-top: -10px;
        }
        .precio-slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #17253d;
          cursor: pointer;
          pointer-events: all;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
        }
        .precio-slider::-webkit-slider-runnable-track {
          height: 0;
        }
        .precio-slider::-moz-range-track {
          height: 0;
        }
      `}</style>
    </div>
  );
}
