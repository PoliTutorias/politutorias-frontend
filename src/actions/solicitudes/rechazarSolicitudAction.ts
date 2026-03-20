'use server';

import { revalidatePath } from 'next/cache';
import { getServerToken } from '@/lib/server-auth';

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
  solicitud?: unknown;
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

  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const token = await getServerToken();

    if (!apiUrl || !token) {
      return {
        success: false,
        message: 'Error de configuración: no se puede conectar al backend.',
      };
    }

    const normalizedComment = reason === 'Otro' ? (comment?.trim() || null) : null;
    const bodyPayload = reason === 'Otro'
      ? { reason, comment: normalizedComment }
      : { reason };

    const response = await fetch(`${apiUrl}solicitudes/${solicitudId}/reject`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyPayload),
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
}
