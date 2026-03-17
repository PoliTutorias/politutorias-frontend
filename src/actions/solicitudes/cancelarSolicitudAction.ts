'use server';

import { APIResponse, CancelSolicitudDto } from '@/dtos/solicitudes.dto';

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

  return {
    success: true,
    message: 'Solicitud cancelada exitosamente.',
    data: {
      id: solicitudId,
      status: 'CANCELADA',
    },
  };

  // Estructura esperada del endpoint PATCH /api/solicitudes/:id/cancel
  // Request body: CancelSolicitudDto -> { reason?: string }
  // Respuesta exitosa:
  // {
  //   success: boolean;
  //   message: string;
  //   data?: {
  //     id: string;
  //     status: 'CANCELADA';
  //   }
  // }
  // Errores esperados:
  // - 400: operación no permitida por estado / body inválido
  // - 401: no autorizado
  // - 404: solicitud no encontrada
  // - 500: error interno del servidor

  /* eslint-disable sonarjs/no-commented-code */
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/solicitudes/${solicitudId}/cancel`, {
  //   method: 'PATCH',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //   },
  //   body: JSON.stringify(cancelPayload),
  //   cache: 'no-store',
  // });

  // if (!response.ok) {
  //   let errorMessage = 'No se pudo cancelar la solicitud';

  //   try {
  //     const errorBody = await response.json();
  //     errorMessage = errorBody.message ?? errorMessage;
  //   } catch {
  //     errorMessage = response.statusText || errorMessage;
  //   }

  //   return {
  //     success: false,
  //     message: errorMessage,
  //   };
  // }

  // const data = (await response.json()) as APIResponse<{ id: string; status: 'CANCELADA' }>;
  // return data;
  /* eslint-enable sonarjs/no-commented-code */
}
