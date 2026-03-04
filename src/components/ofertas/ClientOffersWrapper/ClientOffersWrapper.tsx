'use client';

import { useState, useTransition } from 'react';
import { OfertaEntity } from '@/interfaces/ofertas/OfertaEntity';

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

            {/* Placeholder: Aquí irán los filtros (Modalidad, Disponibilidad, Precio, etc.) */}
            <div className="text-sm text-[var(--text-secondary)]">
              Aquí irán los filtros y el slider de precio
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
