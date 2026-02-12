'use client';

import { OfertaEntity } from '@/interfaces/oferta/OfertaEntity';

interface OfertaCardProps {
  oferta: OfertaEntity;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function OfertaCard({
  oferta,
  onEdit,
  onDelete,
}: OfertaCardProps) {
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}/h`;
  };

  const getCategoryColor = (index: number) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-purple-100 text-purple-800',
      'bg-pink-100 text-pink-800',
      'bg-green-100 text-green-800',
      'bg-orange-100 text-orange-800',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="rounded-lg border border-[var(--border)] bg-white p-5 shadow-xs hover:shadow-sm transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between pb-3 border-b border-[var(--border)]">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground">
            {oferta.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-[var(--text-secondary)]">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
            </svg>
            <span>{oferta.modality}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[var(--warning)]">
            {formatPrice(oferta.price)}
          </p>
        </div>
      </div>

      {/* Descripción */}
      <div className="py-3 border-b border-[var(--border)]">
        <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
          {oferta.description}
        </p>
      </div>

      {/* Categories */}
      <div className="py-3 border-b border-[var(--border)]">
        <div className="flex flex-wrap gap-2">
          {oferta.categories.map((category, index) => (
            <span
              key={index}
              className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                index
              )}`}
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      {/* Meta Information */}
      <div className="py-3 mb-3">
        <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
          <span>
            Creada:{' '}
            {new Date(oferta.createdAt).toLocaleDateString('es-ES')}
          </span>
          <span
            className={`px-2 py-1 rounded-full font-medium ${
              oferta.status === 'active'
                ? 'bg-[var(--success)]/10 text-[var(--success)]'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {oferta.status === 'active' ? 'Activa' : 'Inactiva'}
          </span>
        </div>
      </div>

      {/* Actions */}
      {(onEdit || onDelete) && (
        <div className="flex gap-2 pt-2">
          {onEdit && (
            <button
              onClick={() => onEdit(oferta.id)}
              className="flex-1 px-3 py-2 text-sm font-medium text-[var(--primary)] hover:bg-blue-50 rounded-md transition-colors"
            >
              Editar
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(oferta.id)}
              className="flex-1 px-3 py-2 text-sm font-medium text-[var(--error)] hover:bg-red-50 rounded-md transition-colors"
            >
              Eliminar
            </button>
          )}
        </div>
      )}
    </div>
  );
}
