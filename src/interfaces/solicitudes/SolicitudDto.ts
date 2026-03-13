/**
 * DTO para verificar si existe una solicitud previa
 */

export interface VerificarSolicitudPreviaPayload {
  estudianteId: string;
  tutorId: string;
  horarios: Array<{ fecha: string; hora: string }>;
}

export interface VerificarSolicitudPreviaResponseDto {
  existe: boolean;
  mensaje?: string;
}

export interface SolicitudPayload {
  ofertaId: string;
  tutorId: string;
  estudianteId: string;
  horarios: Array<{ fecha: string; hora: string }>;
  mensaje: string;
  modalidad?: 'virtual' | 'presencial';
}

export interface SolicitudEntity {
  id: string;
  ofertaId: string;
  estudianteId: string;
  tutorId: string;
  horarios: Array<{ fecha: string; hora: string }>;
  mensaje: string;
  modalidad?: string;
  estado: 'pendiente' | 'aceptada' | 'rechazada';
  createdAt: string;
}
