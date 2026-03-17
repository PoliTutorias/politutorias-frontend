'use server';

import { SolicitudDetailDto } from '@/dtos/solicitudes.dto';
import { getSolicitudDetailSeedById } from '@/lib/seeds/solicitudes-detail';

export async function getSolicitudDetailAction(solicitudId: string): Promise<SolicitudDetailDto | null> {
  if (!solicitudId) {
    return null;
  }

  return getSolicitudDetailSeedById(solicitudId);

  // Estructura esperada del endpoint GET /api/solicitudes/:id
  // 200 OK: SolicitudDetailDto
  // 404: solicitud no encontrada o no pertenece al estudiante
  // 401: no autorizado
  // 500: error interno del servidor

  /* eslint-disable sonarjs/no-commented-code */
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/solicitudes/${solicitudId}`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //   },
  //   cache: 'no-store',
  // });

  // if (response.status === 404) {
  //   return null;
  // }

  // if (!response.ok) {
  //   let errorMessage = 'No se pudo obtener el detalle de la solicitud';

  //   try {
  //     const errorBody = await response.json();
  //     errorMessage = errorBody.message ?? errorMessage;
  //   } catch {
  //     errorMessage = response.statusText || errorMessage;
  //   }

  //   throw new Error(errorMessage);
  // }

  // const data = (await response.json()) as SolicitudDetailDto;
  // return data;
  /* eslint-enable sonarjs/no-commented-code */
}
