'use server';

import { TutorialDetailDto } from '@/interfaces/tutorial/tutorial';
import { tutorialDetailSeedData } from '@/seed/tutorialsSeedData';
import { getServerToken } from '@/lib/server-auth';

export async function getTutorialDetailAction(id: string): Promise<TutorialDetailDto | null> {
  if (!id.trim()) {
    return null;
  }

  const seedResult = id === tutorialDetailSeedData.id
    ? tutorialDetailSeedData
    : { ...tutorialDetailSeedData, id };

  // const token = await getServerToken();
  // const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  //
  // if (!backendBaseUrl || !token) {
  //   return seedResult;
  // }
  //
  // try {
  //   const endpoint = `${backendBaseUrl.replace(/\/+$/, '')}/tutorias/${id}`;
  //   const response = await fetch(endpoint, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //     cache: 'no-store',
  //   });
  //
  //   if (!response.ok) {
  //     throw new Error('No se pudo obtener el detalle de la tutoria.');
  //   }
  //
  //   return (await response.json()) as TutorialDetailDto;
  // } catch {
  //   return seedResult;
  // }

  await getServerToken();
  return seedResult;
}
