'use server';

import { OfertaEntity } from '@/interfaces/ofertas/OfertaEntity';
import { OfertasResult } from '@/interfaces/ofertas/OfertasResult';
import { ofertasSeedData } from '@/seed/OfertasSeedData';

/**
 * Server Action para filtrar ofertas por rango de precio (HU27)
 * 
 * Acepta un rango de precios (minPrice, maxPrice) y retorna las ofertas
 * que se encuentran dentro de ese rango. Actualmente usa seed data.
 * El bloque de integración con el backend real está comentado y preparado
 * para activarse cuando el backend esté listo (Tarea 7).
 * 
 * @param minPrice - Precio mínimo del rango
 * @param maxPrice - Precio máximo del rango
 * @returns OfertasResult con ofertas filtradas o un objeto de error
 */
export async function filtrarOfertasAction(
  minPrice: number,
  maxPrice: number
): Promise<OfertasResult | { error: string }> {
  // === Validaciones ===
  if (isNaN(minPrice) || isNaN(maxPrice)) {
    return { error: 'Los precios deben ser números válidos.' };
  }

  if (minPrice < 0 || maxPrice < 0) {
    return { error: 'Los precios no pueden ser negativos.' };
  }

  if (minPrice > maxPrice) {
    return { error: 'El precio mínimo no puede ser mayor que el precio máximo.' };
  }

  // === Lógica de filtrado con Seed Data (Activa) ===
  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 500));

  const ofertasFiltradas: OfertaEntity[] = ofertasSeedData.ofertas.filter(
    (oferta) => oferta.precio >= minPrice && oferta.precio <= maxPrice
  );

  return {
    ofertas: ofertasFiltradas,
    total: ofertasFiltradas.length,
  };

  // === Bloque de integración con Backend Real (COMENTADO - Tarea 7) ===
  // try {
  //   const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  //   if (!apiBaseUrl) {
  //     return { error: 'NEXT_PUBLIC_BACKEND_API_URL no está configurada.' };
  //   }
  //
  //   // Construir query parameters
  //   const queryParams = new URLSearchParams();
  //   queryParams.append('minPrice', minPrice.toString());
  //   queryParams.append('maxPrice', maxPrice.toString());
  //
  //   // Realizar petición al backend
  //   const response = await fetch(
  //     `${apiBaseUrl}/api/ofertas?${queryParams.toString()}`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //       },
  //       cache: 'no-store',
  //     }
  //   );
  //
  //   // Manejar respuesta no exitosa
  //   if (!response.ok) {
  //     const errorData = await response.json().catch(() => ({}));
  //     return {
  //       error: errorData.message || `Error del servidor: ${response.status} ${response.statusText}`,
  //     };
  //   }
  //
  //   // Parsear respuesta exitosa
  //   const data: OfertasResult = await response.json();
  //   return data;
  // } catch (error) {
  //   console.error('Error en filtrarOfertasAction:', error);
  //   return { error: 'Fallo en la comunicación con el servidor.' };
  // }
}
