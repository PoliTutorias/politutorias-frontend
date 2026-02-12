'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createOfertaSchema,
  type CreateOfertaInput,
} from '@/schemas/createOfertaSchema';

interface UseOfertaFormOptions {
  onSubmit?: (data: CreateOfertaInput) => void | Promise<void>;
  defaultValues?: Partial<CreateOfertaInput>;
}

export function useOfertaForm({
  onSubmit,
  defaultValues = {
    title: '',
    price: 5,
    modality: 'Presencial',
    categories: [],
    description: '',
  },
}: UseOfertaFormOptions = {}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting, dirtyFields, isDirty },
    reset,
  } = useForm<CreateOfertaInput>({
    resolver: zodResolver(createOfertaSchema),
    mode: 'onChange',
    defaultValues: defaultValues as CreateOfertaInput,
  });

  const formValues = watch();

  // Detectar si un campo es válido
  const isFieldValid = (fieldName: keyof CreateOfertaInput) => {
    const isTouched = dirtyFields[fieldName];
    const hasNoError = !errors[fieldName];
    const hasValue = formValues[fieldName];

    // Un campo es válido si ha sido tocado, no tiene error y tiene valor
    return isTouched && hasNoError && (hasValue !== '' && hasValue !== undefined && hasValue !== null);
  };

  const handleFormSubmit = handleSubmit(
    async (data) => {
      if (onSubmit) {
        await onSubmit(data);
      }
    },
    (fieldErrors) => {
      console.log('Form validation errors:', fieldErrors);
    }
  );

  return {
    register,
    handleSubmit: handleFormSubmit,
    watch,
    setValue,
    trigger,
    errors,
    isSubmitting,
    reset,
    formValues,
    isFieldValid,
  };
}
