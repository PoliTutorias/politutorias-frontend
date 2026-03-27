'use server';

import { HistoryResponse } from '@/interfaces/tutorial/tutorial';
import { historySeedData } from '@/seed/tutorialsSeedData';
import { getServerToken } from '@/lib/server-auth';

export async function getTutorialHistoryAction(page: number = 1, limit: number = 5): Promise<HistoryResponse> {
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(20, Math.max(1, limit));

  const start = (safePage - 1) * safeLimit;
  const end = start + safeLimit;

  const items = historySeedData.paginatedData.items.slice(start, end);

  const paginatedResult: HistoryResponse = {
    summary: historySeedData.summary,
    paginatedData: {
      items,
      total: historySeedData.paginatedData.total,
      page: safePage,
      limit: safeLimit,
    },
  };

  // const token = await getServerToken();
  // const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  //
  // if (!backendBaseUrl || !token) {
  //   return paginatedResult;
  // }
  //
  // try {
  //   const url = new URL('/tutorias/historial', backendBaseUrl);
  //   url.searchParams.set('page', String(safePage));
  //   url.searchParams.set('limit', String(safeLimit));
  //
  //   const response = await fetch(url.toString(), {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //     cache: 'no-store',
  //   });
  //
  //   if (!response.ok) {
  //     throw new Error('No se pudo obtener el historial de tutorias.');
  //   }
  //
  //   return (await response.json()) as HistoryResponse;
  // } catch {
  //   return paginatedResult;
  // }

  await getServerToken();
  return paginatedResult;
}
