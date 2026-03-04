'use client';

import { useState, useTransition } from 'react';
import { OfertaEntity } from '@/interfaces/ofertas/OfertaEntity';
import { PrecioFilterComponent } from '@/components/ofertas/PrecioFilterComponent/PrecioFilterComponent';

interface ClientOffersWrapperProps {
  initialOffers: OfertaEntity[];
  children: React.ReactNode;
}

/**
 * ClientOffersWrapper - Client Component (HU27)
 * 
 * Gestiona el estado interactivo de las ofertas filtradas y
 * proporciona el layout de dos columnas (filtros + contenido).
 * Separa la lógica de estado del cliente de la renderización del servidor.
 */
export function ClientOffersWrapper({ initialOffers, children }: ClientOffersWrapperProps) {
  const [offers, setOffers] = useState<OfertaEntity[]>(initialOffers);
  const [isPending, startTransition] = useTransition();

  // Handler temporal para el price range change (se completará en T05)
  const handlePriceRangeChange = (min: number, max: number) => {
    // Se implementará la conexión con filtrarOfertasAction en Tarea 5
    console.log(`Filtro de precio: $${min} - $${max}`);
  };

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
              initialMinPrice={5}
              initialMaxPrice={20}
              absoluteMin={0}
              absoluteMax={50}
              onPriceRangeChange={handlePriceRangeChange}
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
          {isPending && (
            <div className="mb-4 text-sm text-[var(--text-secondary)] font-inter animate-pulse">
              Buscando ofertas...
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
