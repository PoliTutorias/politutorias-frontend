'use server';

import { cookies } from 'next/headers';
import { TutorBasicosInput, tutorBasicosSchema } from '@/lib/validations/tutor-basicos-schema';
import { getServerToken } from '@/lib/server-auth';

interface ServerActionResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string>;
  token?: string;
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

    // Log de los datos extraídos (para debugging)
    console.log('Datos extraídos del form:', {
      nombreCompleto,
      numeroWhatsapp,
      facultad,
      semestreActual,
      biografiaCorta,
    });

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

    // Hacer petición real al backend
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3000/api/';
      const token = await getServerToken();
      const endpoint = `${backendUrl}tutor/datos-basicos`;

      console.log('Enviando datos a:', endpoint);

      // Enviar datos como JSON (FormData multipart corrompe caracteres especiales como °)
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombreCompleto: validationResult.data.nombreCompleto,
          numeroWhatsapp: validationResult.data.numeroWhatsapp,
          facultad: validationResult.data.facultad,
          semestreActual: validationResult.data.semestreActual,
          biografiaCorta: validationResult.data.biografiaCorta,
        }),
      });

      // Parsear respuesta del backend
      const result = await response.json();

      console.log('Respuesta del servidor:', result, 'Status:', response.status);

      if (!response.ok) {
        // Manejar errores del backend
        if (result.message) {
          // Si es un array, tomar el primer mensaje
          const errorMessage = Array.isArray(result.message) 
            ? result.message[0] 
            : result.message;
          
          return {
            success: false,
            message: errorMessage,
            errors: {
              general: errorMessage,
            },
          };
        }

        return {
          success: false,
          message: result.error || 'Error al guardar los datos',
          errors: result.errors || {},
        };
      }

      // Extraer el token y tutorId de la respuesta y guardarlos en cookies
      if (result.token || result.data?.id) {
        const cookieStore = await cookies();
        
        if (result.token) {
          cookieStore.set('tutor-auth-token', result.token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60, // 24 horas
          });
          console.log('Token guardado en cookies');
        }
        
        if (result.data?.id) {
          cookieStore.set('tutor-id', result.data.id, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60, // 24 horas
          });
          console.log('TutorId guardado en cookies:', result.data.id);
        }
      }

      return {
        success: true,
        message: 'Datos guardados con éxito',
        data: result,
        token: result.token,
      };
    } catch (fetchError) {
      console.error('Error de conexión:', fetchError);
      throw fetchError;
    }
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
