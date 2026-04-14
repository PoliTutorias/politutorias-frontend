'use client';

import {
    createOfertaSchema,
    type CreateOfertaFormValues,
    type CreateOfertaInput,
} from '@/schemas/createOfertaSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';

interface UseOfertaFormOptions {
  onSubmit?: (data: CreateOfertaInput) => void | Promise<void>;
  defaultValues?: Partial<CreateOfertaFormValues>;
}

export function useOfertaForm({
  onSubmit,
  defaultValues = {
    title: '',
    price: undefined,
    modality: 'Presencial',
    categories: [],
    description: '',
  },
}: UseOfertaFormOptions = {}) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    trigger,
    formState: { errors, isSubmitting, dirtyFields },
    reset,
  } = useForm<CreateOfertaFormValues, unknown, CreateOfertaInput>({
    resolver: zodResolver(createOfertaSchema),
    mode: 'onChange',
    defaultValues: defaultValues as CreateOfertaFormValues,
  });

  const formValues = useWatch({ control });

  // Detectar si un campo es válido
  const isFieldValid = (fieldName: keyof CreateOfertaFormValues) => {
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
    () => {}
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
