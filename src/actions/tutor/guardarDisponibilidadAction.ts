'use server';

import { AvailabilityBlock } from '@/interfaces/tutor/AvailabilityBlock';
import { availabilitySuccessSeed } from '@/seed/AvailabilitySuccessResponseSeed';

interface CreateAvailabilityDto {
  tutorId: string;
  blocks: AvailabilityBlock[];
}

interface AvailabilityResponse {
  message: string;
  tutorId: string;
}

/**
 * Server Action para guardar la disponibilidad de un tutor
 * @param dto Objeto con tutorId y bloques de disponibilidad
 * @returns Respuesta exitosa o error
 */
export async function guardarDisponibilidadAction(
  dto: CreateAvailabilityDto
): Promise<AvailabilityResponse | { error: string }> {
  try {
    // Validación: Al menos un bloque debe estar seleccionado
    if (!dto.blocks || dto.blocks.length === 0) {
      return {
        error: 'Se debe seleccionar al menos un horario disponible.',
      };
    }

    // Validación: tutorId debe estar presente
    if (!dto.tutorId) {
      return {
        error: 'El ID del tutor es requerido.',
      };
    }

    // TODO: Reemplazar con llamada real al endpoint
    // const response = await fetch('/api/disponibilidad', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(dto),
    // });

    // Por ahora, retornamos el seed de respuesta exitosa
    return availabilitySuccessSeed;
  } catch (error) {
    return {
      error: 'Error al guardar la disponibilidad. Intenta nuevamente.',
    };
  }
}
