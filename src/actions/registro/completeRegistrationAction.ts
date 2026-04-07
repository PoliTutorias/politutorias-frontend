'use server';

import { redirect } from 'next/navigation';
import { Experiencia } from '@/interfaces/experiencia-tipo/Experiencia';
import { getServerToken } from '@/lib/server-auth';

interface PerfilProfesionalPayload {
  experiencias: Experiencia[];
  materias: string[];
}

interface CompleteRegistrationResponse {
  success: boolean;
  message: string;
}

/**
 * Acción que SOLO llama a /perfil/finalizar (HU42)
 * Los endpoints HU34 y HU41 ya fueron llamados en sus respectivos Steps
 * Esta acción solo finaliza el flujo con el endpoint de perfil profesional
 */
export async function completeRegistrationAction(
  perfilProfesional: PerfilProfesionalPayload
): Promise<CompleteRegistrationResponse> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3000/api/';

    // Usar siempre el token real del usuario (auth_token cookie)
    const authToken = await getServerToken();

    if (!authToken) {
      return {
        success: false,
        message: 'Token de autenticación no encontrado. Inicia sesión.',
      };
    }

    // Limpiar experiencias: excluir el campo 'id' si existe
    // El backend solo espera: puesto, institucion, fechaInicio, fechaFin
    const experienciasLimpias = perfilProfesional.experiencias.map(exp => ({
      puesto: exp.puesto,
      institucion: exp.institucion,
      fechaInicio: exp.fechaInicio,
      fechaFin: exp.fechaFin,
    }));

    const payloadLimpio = {
      experiencias: experienciasLimpias,
      materias: perfilProfesional.materias,
    };

    // ==== LLAMAR SOLO A HU42: /perfil/finalizar ====
    const responsePerfil = await fetch(`${backendUrl}perfil/finalizar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(payloadLimpio),
    });

    const resultPerfil = await responsePerfil.json();


    if (!responsePerfil.ok) {
      return {
        success: false,
        message: resultPerfil.message || 'Error al finalizar el registro',
      };
    }

    // Refrescar el JWT para obtener role: 'tutor' (antes era 'student')
    try {
      const refreshResponse = await fetch(`${backendUrl}auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        if (refreshData.token) {
          // Actualizar la cookie con el nuevo JWT que tiene role: 'tutor'
          const { setServerToken } = await import('@/lib/server-auth');
          await setServerToken(refreshData.token);
        }
      }
    } catch (refreshError) {
      console.warn('No se pudo refrescar el JWT:', refreshError);
    }

    redirect('/dashboard/tutor');
  } catch (error) {
    console.error('Error en completeRegistrationAction:', error);
    throw error;
  }
}

