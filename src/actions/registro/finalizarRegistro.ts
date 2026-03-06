'use server';

import { cookies } from 'next/headers';
import { PerfilProfesional } from '@/interfaces/perfil-profesional-tipo/PerfilProfesional';

interface FinalizarRegistroResponse {
  success: boolean;
  message: string;
  data?: unknown;
  error?: string;
}

export async function actionFinalizarRegistro(
  perfilData: PerfilProfesional
): Promise<FinalizarRegistroResponse> {
  try {
    // Obtener el token: primero de cookies (guardado en HU34), sino usar TEMPORARY_TOKEN
    const cookieStore = await cookies();
    let token = cookieStore.get('tutor-auth-token')?.value;
    
    if (!token) {
      console.log('Token no encontrado en cookies, usando TEMPORARY_TOKEN del .env');
      token = process.env.TEMPORARY_TOKEN;
    }

    if (!token) {
      console.error('No se encontró ningún token para finalizar registro');
      return {
        success: false,
        message: 'Token de autenticación no configurado. Completa primero el paso 1.',
        error: 'No token',
      };
    }

    console.log('Token obtenido para finalizar registro (cookies o .env)');
    console.log('Endpoint esperado: /api/perfil/finalizar');
    console.log('Authorization header:', `Bearer [token]`);

    // Hacer petición real al backend
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3000/api/';
    const endpoint = `${backendUrl}perfil/finalizar`;

    console.log('Enviando petición a:', endpoint);
    console.log('Datos:', JSON.stringify(perfilData, null, 2));

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(perfilData),
    });

    // Parsear respuesta del backend
    const result = await response.json();

    console.log('Respuesta del servidor:', result);
    console.log('Status:', response.status);

    if (!response.ok) {
      return {
        success: false,
        message: result.message || 'Error al finalizar el registro',
        error: result.error,
      };
    }

    return {
      success: true,
      message: 'Registro completado exitosamente',
      data: result,
    };
  } catch (error) {
    console.error('Error finalizando registro:', error);
    throw error;
  }
}
