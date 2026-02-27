'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField } from '@/components/shared/input-field/InputField';
import { Textarea } from '@/components/shared/textarea/Textarea';
import { Dropdown } from '@/components/shared/dropdown/Dropdown';
import { FACULTADES_SEED } from '@/lib/seeds/facultades';
import { SEMESTRES_SEED } from '@/lib/seeds/semestres';
import { tutorBasicosSchema, TutorBasicosInput } from '@/lib/validations/tutor-basicos-schema';

export function FormularioDatosBasicos() {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
    console.log('Form submitted with valid data:', data);
    // Aquí se conectará con la Server Action en la Tarea 7
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto space-y-6"
    >
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
        className="w-full bg-[var(--primary)] text-white font-semibold py-3 rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
      >
        Siguiente Disponibilidad →
      </button>
    </form>
  );
}
