/**
 * Interfaz para la respuesta exitosa del registro de disponibilidad
 */
export interface AvailabilitySuccessResponse {
  message: string;
  tutorId: string;
}

/**
 * Seed con ejemplo de respuesta exitosa para el registro de disponibilidad
 */
export const availabilitySuccessSeed: AvailabilitySuccessResponse = {
  message: 'Disponibilidad registrada exitosamente para el tutor.',
  tutorId: 'a1b2c3d4e5f6g7h8i9j0',
};
