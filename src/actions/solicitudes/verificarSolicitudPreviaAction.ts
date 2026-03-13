'use server';

import {
  VerificarSolicitudPreviaPayload,
  VerificarSolicitudPreviaResponseDto,
} from '@/interfaces/solicitudes/SolicitudDto';
import {
  getSolicitudPreviaExisteSeed,
  getSolicitudPreviaNoExisteSeed,
} from '@/lib/seeds/VerificarSolicitudPreviaSeedData';

/**
 * Server Action para verificar si existe una solicitud previa
 * En desarrollo, usa seed data; en producción, hace fetch al backend
 */
export async function verificarSolicitudPreviaAction(
  payload: VerificarSolicitudPreviaPayload
): Promise<VerificarSolicitudPreviaResponseDto> {
  // ===== SEED DATA (para desarrollo) =====
  // Simulamos que si el primer horario es "Miércoles 14:00", retorna "existe: true"
  const firstHorario = payload.horarios[0];
  if (firstHorario?.hora === '14:00') {
    return getSolicitudPreviaExisteSeed('Miércoles 14:00');
  }

  return getSolicitudPreviaNoExisteSeed();

  // ===== FETCH AL BACKEND (comentado para desarrollo) =====
  // Descomentar cuando el backend esté listo
  /*
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    if (!backendUrl) {
      console.error('NEXT_PUBLIC_BACKEND_API_URL is not defined');
      return getSolicitudPreviaNoExisteSeed();
    }

    const response = await fetch(`${backendUrl}solicitudes/verificar-previa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.TEMPORARY_TOKEN}`,
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(
        `Error verifying previous solicitud: ${response.status} ${response.statusText}`
      );
      return getSolicitudPreviaNoExisteSeed();
    }

    const data: VerificarSolicitudPreviaResponseDto = await response.json();
    return data;
  } catch (error) {
    console.error('Error in verificarSolicitudPreviaAction:', error);
    return getSolicitudPreviaNoExisteSeed();
  }
  */
}
