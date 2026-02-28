'use server';

import { TutorBasicosInput, tutorBasicosSchema } from '@/lib/validations/tutor-basicos-schema';
import { TUTOR_REGISTRO_RESPONSE_SEED } from '@/lib/seeds/tutor-registro-response';

interface ServerActionResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string>;
}

export async function registrarDatosBasicosAction(
  formData: FormData
): Promise<ServerActionResponse> {
  try {
    // Extraer datos del FormData
    const nombreCompleto = formData.get('nombreCompleto')?.toString().trim() || '';
    const numeroWhatsapp = formData.get('numeroWhatsapp')?.toString().trim() || '';
    const facultad = formData.get('facultad')?.toString().trim() || '';
    const semestreActual = formData.get('semestreActual')?.toString().trim() || '';
    const biografiaCorta = formData.get('biografiaCorta')?.toString().trim() || '';

    // Preparar objeto de datos
    const datosFormulario: TutorBasicosInput = {
      nombreCompleto,
      numeroWhatsapp,
      facultad,
      semestreActual,
      biografiaCorta,
    };

    // Validar datos con Zod
    const validationResult = tutorBasicosSchema.safeParse(datosFormulario);

    if (!validationResult.success) {
      const errors: Record<string, string> = {};
      validationResult.error.issues.forEach((err) => {
        const path = err.path[0];
        if (typeof path === 'string') {
          errors[path] = err.message;
        }
      });

      return {
        success: false,
        message: 'Errores de validación',
        errors,
      };
    }

    // MODO DE DESARROLLO: Retornar seed data simulada
    // En producción, descomentar el bloque fetch abajo y eliminar este segmento

    return {
      success: true,
      message: 'Datos guardados con éxito',
      data: TUTOR_REGISTRO_RESPONSE_SEED,
    };

    /* INTEGRACIÓN CON BACKEND REAL (Comentado para desarrollo)
    
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      const endpoint = `${backendUrl}/api/tutor/datos-basicos`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}` // Descomentar cuando se implemente autenticación
        },
        body: JSON.stringify({
          nombreCompleto: validationResult.data.nombreCompleto,
          numeroWhatsapp: validationResult.data.numeroWhatsapp,
          facultad: validationResult.data.facultad,
          semestreActual: validationResult.data.semestreActual,
          biografiaCorta: validationResult.data.biografiaCorta,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        return {
          success: false,
          message: result.message || 'Error al guardar los datos',
          errors: result.errors || {},
        };
      }

      const result = await response.json();

      // Aquí irá el redirect a la siguiente pantalla del wizard
      // redirect('/tutor/disponibilidad');

      return {
        success: true,
        message: 'Datos guardados con éxito',
        data: result.data,
      };
    } catch (fetchError) {
      return {
        success: false,
        message: 'Error de conexión con el servidor',
        errors: {
          general: 'No se pudo conectar con el servidor',
        },
      };
    }
    
    */
  } catch (error) {
    console.error('Error en registrarDatosBasicosAction:', error);
    return {
      success: false,
      message: 'Error interno del servidor',
      errors: {
        general: 'Ocurrió un error inesperado',
      },
    };
  }
}
