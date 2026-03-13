/**
 * Seed Data para verificación de solicitudes previas
 */

import { VerificarSolicitudPreviaResponseDto } from '@/interfaces/solicitudes/SolicitudDto';

/**
 * Simula una respuesta donde NO existe solicitud previa
 */
export function getSolicitudPreviaNoExisteSeed(): VerificarSolicitudPreviaResponseDto {
  return {
    existe: false,
  };
}

/**
 * Simula una respuesta donde SÍ existe solicitud previa
 */
export function getSolicitudPreviaExisteSeed(
  horario?: string
): VerificarSolicitudPreviaResponseDto {
  return {
    existe: true,
    mensaje: `Horario ya solicitado. Ya tienes una solicitud activa para ${horario || 'Miércoles 14:00'}.`,
  };
}
