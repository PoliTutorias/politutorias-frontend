'use server';

import { cookies } from 'next/headers';
import { PerfilProfesional } from '@/interfaces/perfil-profesional-tipo/PerfilProfesional';
import { getServerToken } from '@/lib/server-auth';

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
    // Obtener el token: primero de cookies (HU34), luego de auth cookie, luego fallback
    const cookieStore = await cookies();
    let token = cookieStore.get('tutor-auth-token')?.value;
    
    if (!token) {
      token = await getServerToken() ?? undefined;
    }

    if (!token) {
      console.error('No se encontró ningún token para finalizar registro');
      return {
        success: false,
        message: 'Token de autenticación no configurado. Completa primero el paso 1.',
        error: 'No token',
      };
    }

    // Hacer petición real al backend
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3000/api/';
    const endpoint = `${backendUrl}perfil/finalizar`;

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
