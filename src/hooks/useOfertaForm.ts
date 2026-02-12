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
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateOfertaInput>({
    resolver: zodResolver(createOfertaSchema),
    mode: 'onBlur',
    defaultValues: defaultValues as CreateOfertaInput,
  });

  const formValues = watch();

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
    errors,
    isSubmitting,
    reset,
    formValues,
  };
}
