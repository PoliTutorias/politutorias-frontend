'use client';

import { ReactNode } from 'react';
import { InputTituloOferta } from './InputTituloOferta';
import { InputPrecioHora } from './InputPrecioHora';
import { SelectModalidad } from './SelectModalidad';
import { TextareaDescripcionOferta } from './TextareaDescripcionOferta';

interface OfertaFormProps {
  title?: string;
  onCancel?: () => void;
  children?: ReactNode;
}

export function OfertaForm({
  title = 'Nueva Oferta de Tutoría',
  onCancel,
  children,
}: OfertaFormProps) {
  return (
    <form className="space-y-6">
      {/* Form Title */}
      <h2 className="text-xl font-bold text-foreground">{title}</h2>

      {/* Título de la Oferta */}
      <InputTituloOferta
        name="title"
        onChange={() => { }}
        currentLength={0}
      />

      {/* Precio y Modalidad Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputPrecioHora name="price" onChange={() => { }} />
        <SelectModalidad name="modality" onChange={() => { }} />
      </div>

      {/* Categorías Section - placeholder for CategorySelector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-foreground">
            Categorías
          </label>
          <span className="text-xs text-[var(--text-secondary)]">
            0/5
          </span>
        </div>
        {children}
      </div>

      {/* Descripción de la Oferta */}
      <TextareaDescripcionOferta
        name="description"
        onChange={() => { }}
        currentLength={0}
      />

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-[var(--border)] bg-white px-6 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[var(--bg-gray)]"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-md bg-[var(--primary)] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--primary-dark)]"
        >
          Publicar Oferta
        </button>
      </div>
    </form>
  );
}
