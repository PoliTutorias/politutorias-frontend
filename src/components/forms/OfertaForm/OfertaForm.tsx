'use client';

import { ReactNode } from 'react';
import { InputTituloOferta } from './InputTituloOferta';
import { InputPrecioHora } from './InputPrecioHora';
import { SelectModalidad } from './SelectModalidad';
import { TextareaDescripcionOferta } from './TextareaDescripcionOferta';
import { CategorySelector } from '../CategorySelector/CategorySelector';
import { useOfertaForm } from '@/hooks/useOfertaForm';
import { getCategoriesSeed } from '@/seed/CategoriesSeedData';
import { CreateOfertaInput } from '@/schemas/createOfertaSchema';

interface OfertaFormProps {
  title?: string;
  onCancel?: () => void;
  onSubmit?: (data: CreateOfertaInput) => void | Promise<void>;
  children?: ReactNode;
}

export function OfertaForm({
  title = 'Nueva Oferta de Tutoría',
  onCancel,
  onSubmit,
  children,
}: OfertaFormProps) {
  const categories = getCategoriesSeed();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    errors,
    isSubmitting,
    formValues,
  } = useOfertaForm({
    onSubmit,
  });

  const handleSelectCategory = (categoryId: string) => {
    const current = formValues.categories || [];
    if (!current.includes(categoryId) && current.length < 5) {
      setValue('categories', [...current, categoryId]);
    }
  };

  const handleRemoveCategory = (categoryId: string) => {
    const current = formValues.categories || [];
    setValue(
      'categories',
      current.filter((id) => id !== categoryId)
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form Title */}
      <h2 className="text-xl font-bold text-foreground">{title}</h2>

      {/* Título de la Oferta */}
      <InputTituloOferta
        {...register('title')}
        error={errors.title?.message}
        currentLength={formValues.title?.length || 0}
        maxLength={80}
      />

      {/* Precio y Modalidad Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputPrecioHora
          {...register('price', { valueAsNumber: true })}
          error={errors.price?.message}
        />
        <SelectModalidad
          {...register('modality')}
          error={errors.modality?.message}
          value={formValues.modality}
        />
      </div>

      {/* Categorías Section */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Categorías
        </label>
        <CategorySelector
          availableCategories={categories}
          selectedCategories={formValues.categories || []}
          onSelectCategory={handleSelectCategory}
          onRemoveCategory={handleRemoveCategory}
          maxCategories={5}
          error={errors.categories?.message}
        />
      </div>

      {/* Descripción de la Oferta */}
      <TextareaDescripcionOferta
        {...register('description')}
        error={errors.description?.message}
        currentLength={formValues.description?.length || 0}
        maxLength={250}
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
          disabled={isSubmitting}
          className="rounded-md bg-[var(--primary)] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Publicando...' : 'Publicar Oferta'}
        </button>
      </div>
    </form>
  );
}
