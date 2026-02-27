'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { InputField } from '@/components/shared/input-field/InputField';
import { Textarea } from '@/components/shared/textarea/Textarea';
import { Dropdown } from '@/components/shared/dropdown/Dropdown';
import { FACULTADES_SEED } from '@/lib/seeds/facultades';
import { SEMESTRES_SEED } from '@/lib/seeds/semestres';
import { tutorBasicosSchema, TutorBasicosInput } from '@/lib/validations/tutor-basicos-schema';
import { registrarDatosBasicosAction } from '@/actions/tutor/registrarDatosBasicosAction';

export function FormularioDatosBasicos() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<TutorBasicosInput>({
    resolver: zodResolver(tutorBasicosSchema),
    mode: 'onBlur',
    defaultValues: {
      nombreCompleto: '',
      numeroWhatsapp: '',
      facultad: '',
      semestreActual: '',
      biografiaCorta: '',
    },
  });

  const formValues = watch();

  const onSubmit = async (data: TutorBasicosInput) => {
    setIsLoading(true);
    setGeneralError(null);

    try {
      // Crear FormData para enviar a la Server Action
      const formData = new FormData();
      formData.append('nombreCompleto', data.nombreCompleto);
      formData.append('numeroWhatsapp', data.numeroWhatsapp);
      formData.append('facultad', data.facultad);
      formData.append('semestreActual', data.semestreActual);
      formData.append('biografiaCorta', data.biografiaCorta);

      // Llamar a la Server Action
      const result = await registrarDatosBasicosAction(formData);

      if (!result.success) {
        // Si hay errores de validación del servidor, mostrarlos en los campos
        if (result.errors) {
          Object.entries(result.errors).forEach(([fieldName, message]) => {
            if (fieldName === 'general') {
              setGeneralError(message);
            } else {
              setError(fieldName as keyof TutorBasicosInput, {
                type: 'server',
                message,
              });
            }
          });
        } else {
          setGeneralError(result.message || 'Error al procesar el formulario');
        }
        return;
      }

      // Éxito: redirigir a la siguiente página del wizard
      router.push('/tutor/disponibilidad');
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setGeneralError('Ocurrió un error inesperado. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto space-y-6"
    >
      {/* Error General */}
      {generalError && (
        <div className="bg-red-50 border border-[var(--error)] text-[var(--error)] px-4 py-3 rounded-lg">
          {generalError}
        </div>
      )}

      {/* Nombre Completo */}
      <InputField
        id="nombreCompleto"
        label="Nombre Completo"
        placeholder="Ej. Daniela Castro"
        pattern="letters-only"
        maxLength={60}
        showCharCount
        error={errors.nombreCompleto?.message}
        helperText={errors.nombreCompleto ? undefined : 'Solo letras y espacios'}
        {...register('nombreCompleto')}
      />

      {/* Número de WhatsApp */}
      <InputField
        id="numeroWhatsapp"
        label="Número de WhatsApp"
        placeholder="Ej. 593991234567"
        pattern="numbers-only"
        error={errors.numeroWhatsapp?.message}
        helperText={
          errors.numeroWhatsapp
            ? undefined
            : 'Incluye el código del país (593 para Ecuador)'
        }
        {...register('numeroWhatsapp')}
      />

      {/* Facultad */}
      <Dropdown
        id="facultad"
        label="Facultad"
        options={Array.from(FACULTADES_SEED)}
        defaultText="Selecciona tu facultad"
        error={errors.facultad?.message}
        {...register('facultad')}
      />

      {/* Semestre Actual */}
      <Dropdown
        id="semestreActual"
        label="Semestre Actual"
        options={Array.from(SEMESTRES_SEED)}
        defaultText="Selecciona"
        error={errors.semestreActual?.message}
        {...register('semestreActual')}
      />

      {/* Biografía Corta */}
      <Textarea
        id="biografiaCorta"
        label="Biografía Corta"
        placeholder="Cuéntales a los estudiantes sobre tu experiencia y método de enseñanza..."
        maxLength={300}
        showCharCount
        error={errors.biografiaCorta?.message}
        helperText={
          errors.biografiaCorta
            ? undefined
            : 'Describe tu experiencia, materias fuertes y estilo de enseñanza'
        }
        {...register('biografiaCorta')}
        rows={4}
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[var(--primary)] text-white font-semibold py-3 rounded-lg hover:bg-[var(--primary-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Procesando...' : 'Siguiente Disponibilidad →'}
      </button>
    </form>
  );
}
