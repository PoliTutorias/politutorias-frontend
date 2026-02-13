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
  isLoading?: boolean;
  children?: ReactNode;
}

export function OfertaForm({
  title = 'Nueva Oferta de Tutoría',
  onCancel,
  onSubmit,
  isLoading = false,
  children,
}: OfertaFormProps) {
  const categories = getCategoriesSeed();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    errors,
    isSubmitting,
    formValues,
    isFieldValid,
  } = useOfertaForm({
    onSubmit,
  });

  const handleSelectCategory = (categoryId: string) => {
    const current = formValues.categories || [];
    if (!current.includes(categoryId) && current.length < 5) {
      setValue('categories', [...current, categoryId]);
      // Revalidar el campo de categorías después de seleccionar
      trigger('categories');
    }
  };

  const handleRemoveCategory = (categoryId: string) => {
    const current = formValues.categories || [];
    setValue(
      'categories',
      current.filter((id) => id !== categoryId)
    );
    // Revalidar el campo de categorías después de remover
    trigger('categories');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form Title */}
      <h2 className="text-xl font-bold text-foreground">{title}</h2>

      {/* Título de la Oferta */}
      <InputTituloOferta
        {...register('title')}
        error={errors.title?.message}
        isValid={isFieldValid('title')}
        currentLength={formValues.title?.length || 0}
        maxLength={80}
      />

      {/* Precio y Modalidad Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputPrecioHora
          {...register('price', {
            setValueAs: (value) => {
              if (value === '' || value === null || value === undefined) {
                return 0;
              }
              return parseFloat(value) || 0;
            }
          })}
          error={errors.price?.message}
          isValid={isFieldValid('price')}
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
        isValid={isFieldValid('description')}
        currentLength={formValues.description?.length || 0}
        maxLength={250}
      />

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting || isLoading}
          className="rounded-md border border-[var(--border)] bg-white px-6 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[var(--bg-gray)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="rounded-md bg-[var(--primary)] px-6 py-2 text-sm font-medium text-white transition-all hover:bg-[var(--primary-dark)] disabled:bg-[var(--primary)]/70 disabled:hover:bg-[var(--primary)]/70 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
        >
          {(isSubmitting || isLoading) && (
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {isSubmitting || isLoading ? 'Publicando...' : 'Publicar Oferta'}
        </button>
      </div>
    </form>
  );
}
