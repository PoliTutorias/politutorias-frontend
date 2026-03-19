'use server';

import { SolicitudPayload, SolicitudEntity } from '@/interfaces/solicitudes/SolicitudDto';
import { getRequestConfig } from '@/lib/server-auth';

/**
 * Server Action para enviar una solicitud de tutoría
 */
export async function enviarSolicitudTutoriaAction(
  payload: SolicitudPayload
): Promise<{ success: boolean; message?: string; data?: SolicitudEntity }> {
  if (!payload.mensaje || payload.mensaje.trim().length === 0) {
    return {
      success: false,
      message: 'El mensaje es obligatorio.',
    };
  }

  try {
    const { baseUrl, token } = await getRequestConfig();
    const payloadToSend: {
      ofertaId: string;
      mensaje: string;
      horarios: Array<{ fecha: string; hora: string }>;
      modalidad?: 'Virtual' | 'Presencial';
    } = {
      ofertaId: payload.ofertaId,
      mensaje: payload.mensaje.trim(),
      horarios: payload.horarios,
    };

    if (payload.modalidad) {
      payloadToSend.modalidad =
        payload.modalidad === 'virtual' ? 'Virtual' : 'Presencial';
    }

    const response = await fetch(`${baseUrl}/solicitudes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payloadToSend),
      cache: 'no-store',
    });

    if (!response.ok) {
      let errorMessage = 'Error al enviar la solicitud.';

      try {
        const errorData = await response.json();
        if (typeof errorData?.message === 'string' && errorData.message.trim().length > 0) {
          errorMessage = errorData.message;
        }
      } catch {
        // Si no se puede parsear JSON, se conserva el mensaje por defecto.
      }

      if (response.status === 401) {
        errorMessage = 'Unauthorized';
      }

      console.error(`Error sending solicitud: ${response.status} ${response.statusText}`);
      return {
        success: false,
        message: errorMessage,
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
}
