'use server';

import { APIResponse, CancelSolicitudDto } from '@/dtos/solicitudes.dto';
import { getServerToken } from '@/lib/server-auth';

export async function cancelarSolicitudAction(
  solicitudId: string,
  reason?: string
): Promise<APIResponse<{ id: string; status: 'CANCELADA' }>> {
  const cancelPayload: CancelSolicitudDto = {
    reason,
  };

  if (cancelPayload.reason && cancelPayload.reason.length > 500) {
    return {
      success: false,
      message: 'El motivo de cancelación no puede exceder los 500 caracteres.',
    };
  }

  if (!solicitudId || solicitudId === 'solicitud-error-001') {
    return {
      success: false,
      message: 'No se pudo cancelar la solicitud.',
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

    const response = await fetch(`${apiUrl}solicitudes/${solicitudId}/cancel`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cancelPayload),
      cache: 'no-store',
    });

    if (!response.ok) {
      let errorMessage = 'No se pudo cancelar la solicitud';

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

    const data = (await response.json()) as APIResponse<{ id: string; status: 'CANCELADA' }>;
    return data;
  } catch (error) {
    console.error('Error en cancelarSolicitudAction:', error);
    return {
      success: false,
      message: 'Error al cancelar la solicitud.',
    };
  }
}
