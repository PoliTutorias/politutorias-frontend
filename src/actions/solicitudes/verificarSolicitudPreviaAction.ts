'use server';

import {
  VerificarSolicitudPreviaPayload,
  VerificarSolicitudPreviaResponseDto,
} from '@/interfaces/solicitudes/SolicitudDto';

/**
 * Server Action para verificar si existe una solicitud previa
 * En desarrollo, usa seed data; en producción, hace fetch al backend
 */
export async function verificarSolicitudPreviaAction(
  payload: VerificarSolicitudPreviaPayload
): Promise<VerificarSolicitudPreviaResponseDto> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const token = process.env.TEMPORARY_TOKEN;

  if (!backendUrl || !token) {
    const msg = '❌ Backend URL or token not configured';
    console.error(msg);
    // En desarrollo sin backend, simular que NO existe solicitud previa
    return { existe: false };
  }

  try {
    console.log('🔍 Verificando solicitud previa...');

    const response = await fetch(`${backendUrl}/api/solicitudes/verificar-previa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(
        `❌ Error verifying solicitud previa: ${response.status} ${response.statusText}`
      );
      return { existe: false };
    }

    const data: VerificarSolicitudPreviaResponseDto = await response.json();
    if (data.existe) {
      console.warn(`⚠️ Ya existe solicitud previa: ${data.mensaje}`);
    } else {
      console.log('✅ No existe solicitud previa');
    }
    return data;
  } catch (error) {
    console.error('❌ Error in verificarSolicitudPreviaAction:', error);
    return { existe: false };
  }
}
