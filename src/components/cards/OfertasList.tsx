'use client';

import { OfertaEntity } from '@/interfaces/oferta/OfertaEntity';
import { OfertaCard } from './OfertaCard';
import { EmptyOfferState } from '@/components/ofertas/EmptyOfferState';

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
    return <EmptyOfferState showButton={false} />;
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
