/**
 * Seed Data para una solicitud de tutoría creada exitosamente
 */

import { SolicitudEntity } from '@/interfaces/solicitudes/SolicitudDto';

export function getSolicitudCreadaSeed(): SolicitudEntity {
  return {
    id: 'a1b2c3d4-e5f6-47g8-h9i0-j1k2l3m4n5o6',
    ofertaId: 'e6a0a8e0-2d8e-4a7b-8c7c-0a2a4b8c7c7c',
    estudianteId: 'b1c2d3e4-f5a6-7890-1234-567890fedcba',
    tutorId: '7f11a5be-2ee6-468f-a834-cefe8bb27e69',
    horarios: [
      { fecha: '2026-03-13', hora: '14:00' },
    ],
    mensaje: 'Requiero ayuda urgente con este tema para mi examen.',
    modalidad: 'virtual',
    estado: 'pendiente',
    createdAt: new Date().toISOString(),
  };
}
