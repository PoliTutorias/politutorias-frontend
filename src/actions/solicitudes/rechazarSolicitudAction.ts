'use server';

import { revalidatePath } from 'next/cache';
import { getRequestConfig } from '@/lib/server-auth';
import { RECHAZO_SOLICITUD_SEED_RESPONSE } from '@/seed/RechazoSolicitudResponseSeed';

const validReasons = [
  'Imprevisto personal',
  'Conflicto de horarios con otra tutoría',
  'Enfermedad',
  'Otro',
] as const;

type RejectionReason = (typeof validReasons)[number];

export interface RechazarSolicitudPayload {
  solicitudId: string;
  reason: RejectionReason;
  comment?: string;
}

export interface RechazarSolicitudActionResponse {
  success: boolean;
  message: string;
  solicitud?: typeof RECHAZO_SOLICITUD_SEED_RESPONSE;
}

export async function rechazarSolicitudAction(
  payload: RechazarSolicitudPayload
): Promise<RechazarSolicitudActionResponse> {
  const { solicitudId, reason, comment } = payload;

  if (!solicitudId?.trim()) {
    return {
      success: false,
      message: 'El id de la solicitud es obligatorio.',
    };
  }

  if (!reason || !validReasons.includes(reason)) {
    return {
      success: false,
      message: 'Debes seleccionar un motivo de rechazo válido.',
    };
  }

  if (comment && comment.length > 300) {
    return {
      success: false,
      message: 'El comentario no puede exceder los 300 caracteres.',
    };
  }

  if (reason !== 'Otro' && comment?.trim()) {
    return {
      success: false,
      message: 'El comentario solo se permite cuando el motivo es "Otro".',
    };
  }

  const normalizedComment = reason === 'Otro' ? (comment?.trim() || null) : null;

  // Simulación temporal usando seed, mientras se habilita la integración real.
  const simulatedSolicitud = {
    ...RECHAZO_SOLICITUD_SEED_RESPONSE,
    id: solicitudId,
    rejectionReason: reason,
    rejectionComment: normalizedComment,
    respondedAt: new Date().toISOString(),
  };

  /*
  try {
    const { baseUrl, token } = await getRequestConfig();

    const response = await fetch(`${baseUrl}/solicitudes/${solicitudId}/rechazar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        reason,
        comment: normalizedComment,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      let errorMessage = 'No se pudo rechazar la solicitud.';

      try {
        const errorBody = await response.json();
        errorMessage = errorBody.message ?? errorMessage;
      } catch {
        errorMessage = response.statusText || errorMessage;
      }

      return {
        success: false,
        message: errorMessage,
      };
    }

    const result = await response.json();

    revalidatePath('/tutor/inbox');
    revalidatePath('/bandeja');

    return {
      success: true,
      message: result.message ?? 'Solicitud rechazada exitosamente.',
      solicitud: result.solicitud,
    };
  } catch (error) {
    console.error('Error en rechazarSolicitudAction:', error);

    return {
      success: false,
      message: 'Error al rechazar la solicitud.',
    };
  }
  */

  await getRequestConfig();
  revalidatePath('/tutor/inbox');
  revalidatePath('/bandeja');

  return {
    success: true,
    message: 'Solicitud rechazada exitosamente.',
    solicitud: simulatedSolicitud,
  };
}
