'use client';

import { registrarDatosBasicosAction } from '@/actions/tutor/registrarDatosBasicosAction';
import { Dropdown } from '@/components/shared/dropdown/Dropdown';
import { InputField } from '@/components/shared/input-field/InputField';
import { Textarea } from '@/components/shared/textarea/Textarea';
import { FACULTADES_SEED } from '@/lib/seeds/facultades';
import { SEMESTRES_SEED } from '@/lib/seeds/semestres';
import { useRegistroStore } from '@/lib/stores/registroStore';
import { TutorBasicosInput, tutorBasicosSchema } from '@/lib/validations/tutor-basicos-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

interface FormularioDatosBasicosProps {
  onStepComplete?: () => void;
  savedData?: Record<string, unknown>;
  onSaveData?: (data: TutorBasicosInput) => void;
}

export function FormularioDatosBasicos({
  onStepComplete,
  onSaveData,
}: FormularioDatosBasicosProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { setDatosBasicos } = useRegistroStore();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    setError,
    control,
    reset,
  } = useForm<TutorBasicosInput>({
    resolver: zodResolver(tutorBasicosSchema),
    mode: 'onChange',
    defaultValues: {
      nombreCompleto: '',
      numeroWhatsapp: '',
      facultad: '',
      semestreActual: '',
      biografiaCorta: '',
    },
  });

  // Cargar datos del store SOLO al montar el componente (una vez)
  // Usar getState() para leer sin suscribirse reactivamente al store
  useEffect(() => {
    const storedData = useRegistroStore.getState().datosBasicos;
    if (storedData.nombreCompleto || storedData.numeroWhatsapp) {
      reset({
        nombreCompleto: storedData.nombreCompleto,
        numeroWhatsapp: storedData.numeroWhatsapp,
        facultad: storedData.facultad,
        semestreActual: storedData.semestreActual,
        biografiaCorta: storedData.biografiaCorta,
      });
    }
  }, [reset]);

  const formValues = useWatch({ control });

  // Función para obtener el estado de validación de un campo
  const getFieldValidationState = (fieldName: string): boolean => {
    const hasError = !!(errors[fieldName as keyof TutorBasicosInput]);
    const isDirty = !!dirtyFields[fieldName as keyof TutorBasicosInput];
    const hasValue = !!(formValues[fieldName as keyof TutorBasicosInput]);
    return isDirty && hasValue && !hasError;
  };

  const onSubmit = async (data: TutorBasicosInput) => {
    setIsLoading(true);

    try {
      // Guardar datos en el store
      setDatosBasicos(data);

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
        // Si hay errores de validación del servidor, mostrarlos
        if (result.errors) {
          let firstErrorKey: string | null = null;
          Object.entries(result.errors).forEach(([fieldName, message]) => {
            if (fieldName !== 'general') {
              setError(fieldName as keyof TutorBasicosInput, {
                type: 'server',
                message: message as string,
              });
              if (!firstErrorKey) firstErrorKey = fieldName;
            }
          });

          toast.error(result.message || 'Revisa los campos', {
            position: 'bottom-center',
            duration: 4000,
            unstyled: true,
            style: {
              backgroundColor: '#e53935',
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: 'bold',
              padding: '16px 32px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap',
            },
          });
        } else {
          toast.error(result.message || 'Revisa los campos', {
            position: 'bottom-center',
            duration: 4000,
            unstyled: true,
            style: {
              backgroundColor: '#e53935',
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: 'bold',
              padding: '16px 32px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap',
            },
          });
        }
        setIsLoading(false);
        return;
      }

      // Guardar datos y continuar al siguiente paso
      if (onSaveData) onSaveData(data);
      if (onStepComplete) {
        onStepComplete();
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      toast.error('Error al enviar el formulario. Intenta nuevamente.', {
        position: 'bottom-center',
        duration: 4000,
        unstyled: true,
        style: {
          backgroundColor: '#e53935',
          color: '#ffffff',
          fontSize: '18px',
          fontWeight: 'bold',
          padding: '16px 32px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          whiteSpace: 'nowrap',
        },
      });
      setIsLoading(false);
    }
  };

  const handleInvalidSubmit = () => {
    if (Object.keys(errors).length > 0) {
      toast.error('Revisa los campos', {
        position: 'bottom-center',
        duration: 4000,
        unstyled: true,
        style: {
          backgroundColor: '#e53935',
          color: '#ffffff',
          fontSize: '18px',
          fontWeight: 'bold',
          padding: '16px 32px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          whiteSpace: 'nowrap',
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, handleInvalidSubmit)}
      className="space-y-6"
    >
      {/* Nombre Completo */}
      <div>
        <InputField
          id="nombreCompleto"
          label="Nombre Completo"
          placeholder="Ej. Daniela Castro"
          maxLength={60}
          showCharCount
          error={errors.nombreCompleto?.message}
          success={getFieldValidationState('nombreCompleto')}
          successMessage={getFieldValidationState('nombreCompleto') ? 'Nombre válido' : undefined}
          helperText={
            getFieldValidationState('nombreCompleto') || errors.nombreCompleto
              ? undefined
              : 'Solo letras y espacios'
          }
          {...register('nombreCompleto')}
          value={formValues.nombreCompleto}
          pattern="letters-only"
        />
      </div>

      {/* Número de WhatsApp */}
      <div>
        <InputField
          id="numeroWhatsapp"
          label="Número de WhatsApp"
          placeholder="Ej. 593991234567"
          error={errors.numeroWhatsapp?.message}
          success={getFieldValidationState('numeroWhatsapp')}
          successMessage={getFieldValidationState('numeroWhatsapp') ? 'Número válido' : undefined}
          helperText={
            getFieldValidationState('numeroWhatsapp') || errors.numeroWhatsapp
              ? undefined
              : 'Incluye el código del país (593 para Ecuador)'
          }
          {...register('numeroWhatsapp')}
          pattern="numbers-only"
        />
      </div>

      {/* Row: Facultad y Semestre */}
      <div className="grid grid-cols-2 gap-6">
        <Dropdown
          id="facultad"
          label="Facultad"
          options={Array.from(FACULTADES_SEED)}
          defaultText="Selecciona tu facultad"
          error={errors.facultad?.message}
          {...register('facultad')}
        />

        <Dropdown
          id="semestreActual"
          label="Semestre Actual"
          options={Array.from(SEMESTRES_SEED)}
          defaultText="Selecciona"
          error={errors.semestreActual?.message}
          {...register('semestreActual')}
        />
      </div>

      {/* Biografía Corta */}
      <div>
        <Textarea
          id="biografiaCorta"
          label="Biografía Corta"
          placeholder="Cuéntales a los estudiantes sobre tu experiencia y método de enseñanza..."
          maxLength={300}
          showCharCount
          error={errors.biografiaCorta?.message}
          success={getFieldValidationState('biografiaCorta')}
          successMessage={getFieldValidationState('biografiaCorta') ? 'Biografía válida' : undefined}
          helperText={
            getFieldValidationState('biografiaCorta') || errors.biografiaCorta
              ? undefined
              : 'Describe tu experiencia, materias fuertes y estilo de enseñanza'
          }
          {...register('biografiaCorta')}
          value={formValues.biografiaCorta}
          rows={4}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="w-1/2 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-end py-3 px-2.5"
          style={{
            backgroundColor: 'var(--primary)',
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
          onMouseEnter={(e) => {
            if (!isLoading) e.currentTarget.style.backgroundColor = 'var(--primary-dark)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--primary)';
          }}
        >
          {/* Div con dos columnas alineadas a derecha */}
          <div className="flex flex-col items-end pr-2">
            <div className="font-bold">{isLoading ? 'Procesando...' : 'Siguiente'}</div>
            <div className="text-sm font-normal">Disponibilidad</div>
          </div>

          {/* Div con flecha */}
          <div>→</div>
        </button>
      </div>
    </form>
  );
}
