'use client';

import { OfertaEntity } from '@/interfaces/oferta/OfertaEntity';
import { OfertaCard } from './OfertaCard';

interface OfertasListProps {
  ofertas: OfertaEntity[];
  isLoading?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRetry?: () => void;
}

export function OfertasList({
  ofertas,
  isLoading = false,
  onEdit,
  onDelete,
  onRetry,
}: OfertasListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-lg bg-white border border-[var(--border)] p-5 animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-3" />
            <div className="h-20 bg-gray-200 rounded mb-3" />
            <div className="flex gap-2">
              <div className="h-2 bg-gray-200 rounded flex-1" />
              <div className="h-2 bg-gray-200 rounded flex-1" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (ofertas.length === 0) {
    return (
      <div className="rounded-lg bg-white border border-[var(--border)] p-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-[var(--text-secondary)] mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6.253v13m0-13C6.5 6.253 2 10.753 2 16.25s4.5 10 10 10 10-4.5 10-10S17.5 6.253 12 6.253z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No tienes ofertas activas
        </h3>
        <p className="text-[var(--text-secondary)] text-sm mb-6 max-w-md mx-auto">
          Publica tu primera oferta de tutoría para que los estudiantes
          te encuentren
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--text-secondary)]">
          Total de ofertas: <span className="font-semibold">{ofertas.length}</span>
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ofertas.map((oferta) => (
          <OfertaCard
            key={oferta.id}
            oferta={oferta}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
