'use server';

import { SolicitudPayload, SolicitudEntity } from '@/interfaces/solicitudes/SolicitudDto';
import { getSolicitudCreadaSeed } from '@/lib/seeds/SolicitudCreadaSeedData';

/**
 * Server Action para enviar una solicitud de tutoría
 * En desarrollo, usa seed data; en producción, hace fetch al backend
 */
export async function enviarSolicitudTutoriaAction(
  payload: SolicitudPayload
): Promise<{ success: boolean; message?: string; data?: SolicitudEntity }> {
  // ===== SEED DATA (para desarrollo) =====
  // Simulamos las validaciones del servidor
  if (!payload.mensaje || payload.mensaje.trim().length === 0) {
    return {
      success: false,
      message: 'El mensaje es obligatorio.',
    };
  }

  if (payload.modalidad === undefined && payload.modalidad === null) {
    return {
      success: false,
      message: 'La modalidad es obligatoria.',
    };
  }

  // Si todo está bien, retornar seed data de éxito
  const solicitudCreada = getSolicitudCreadaSeed();
  return {
    success: true,
    message: '¡Solicitud enviada! 1 horario propuesto. El tutor revisará tu solicitud pronto.',
    data: solicitudCreada,
  };

  // ===== FETCH AL BACKEND (comentado para desarrollo) =====
  // Descomentar cuando el backend esté listo
  /*
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    if (!backendUrl) {
      console.error('NEXT_PUBLIC_BACKEND_API_URL is not defined');
      return {
        success: false,
        message: 'Error al conectar con el servidor.',
      };
    }

    const response = await fetch(`${backendUrl}solicitudes`, {
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
        `Error sending solicitud: ${response.status} ${response.statusText}`
      );
      return {
        success: false,
        message: 'Error al enviar la solicitud.',
      };
    }

    const data: SolicitudEntity = await response.json();
    return {
      success: true,
      message: '¡Solicitud enviada! 1 horario propuesto. El tutor revisará tu solicitud pronto.',
      data,
    };
  } catch (error) {
    console.error('Error in enviarSolicitudTutoriaAction:', error);
    return {
      success: false,
      message: 'Error al enviar la solicitud.',
    };
  }
  */
}
