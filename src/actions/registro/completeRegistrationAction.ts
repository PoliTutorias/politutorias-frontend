'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
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

    const cookieStore = await cookies();

    // Obtener el token de las cookies de HU34, o del auth cookie
    let authToken = cookieStore.get('tutor-auth-token')?.value;
    
    if (!authToken) {
      authToken = await getServerToken() ?? undefined;
    }

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

    console.log('HU42 Response:', resultPerfil);
    console.log('Status:', responsePerfil.status);

    if (!responsePerfil.ok) {
      return {
        success: false,
        message: resultPerfil.message || 'Error al finalizar el registro',
      };
    }

    console.log('=== REGISTRO COMPLETADO EXITOSAMENTE ===');
    redirect('/dashboard/tutor');
  } catch (error) {
    console.error('Error en completeRegistrationAction:', error);
    throw error;
  }
}

