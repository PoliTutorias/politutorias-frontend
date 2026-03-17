'use server';

import {
  PaginatedSolicitudListDto,
  SolicitudListParams,
  SolicitudStatus,
} from '@/dtos/solicitudes.dto';
import { getSolicitudesListSeed } from '@/lib/seeds/solicitudes-list';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 5;

export async function getSolicitudesAction(
  params: SolicitudListParams = {}
): Promise<PaginatedSolicitudListDto> {
  const status = params.status ?? 'TODAS';
  const page = Math.max(DEFAULT_PAGE, params.page ?? DEFAULT_PAGE);
  const limit = Math.max(1, params.limit ?? DEFAULT_LIMIT);

  const allSolicitudes = getSolicitudesListSeed();

  const statusForList =
    status === 'TODAS' || status === SolicitudStatus.ACEPTADA || status === SolicitudStatus.RECHAZADA
      ? ['PENDIENTE', 'EXPIRADA']
      : [status];

  const filteredItems = allSolicitudes.filter((item) =>
    statusForList.includes(item.status)
  );

  const startIndex = (page - 1) * limit;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + limit);

  return {
    items: paginatedItems,
    total: filteredItems.length,
    page,
    limit,
  };

  // Estructura esperada del endpoint GET /api/solicitudes?status=&page=&limit=
  // 200 OK
  // {
  //   items: SolicitudListItemDto[];
  //   total: number;
  //   page: number;
  //   limit: number;
  // }
  // Errores esperados:
  // - 400: parámetros inválidos
  // - 401: no autorizado
  // - 500: error interno del servidor

  /* eslint-disable sonarjs/no-commented-code */
  // const queryParams = new URLSearchParams({
  //   status,
  //   page: String(page),
  //   limit: String(limit),
  // });

  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/solicitudes?${queryParams}`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //   },
  //   cache: 'no-store',
  // });

  // if (!response.ok) {
  //   let errorMessage = 'No se pudieron obtener las solicitudes';

  //   try {
  //     const errorBody = await response.json();
  //     errorMessage = errorBody.message ?? errorMessage;
  //   } catch {
  //     errorMessage = response.statusText || errorMessage;
  //   }

  //   throw new Error(errorMessage);
  // }

  // const data = (await response.json()) as PaginatedSolicitudListDto;
  // return data;
  /* eslint-enable sonarjs/no-commented-code */
}
