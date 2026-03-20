export type SolicitudRechazoStatus = 'RECHAZADA';

export interface SolicitudRechazoResponse {
  id: string;
  studentId: string;
  tutorId: string;
  course: string;
  status: SolicitudRechazoStatus;
  rejectionReason: string;
  rejectionComment: string | null;
  createdAt: string;
  respondedAt: string;
}

export const RECHAZO_SOLICITUD_SEED_RESPONSE: SolicitudRechazoResponse = {
  id: '60d0fe4f-a9b0-4b2e-8d2a-9e1f5b0c7a8d',
  studentId: 'student-001',
  tutorId: '550e8400-e29b-41d4-a716-446655440000',
  course: 'Matemáticas I',
  status: 'RECHAZADA',
  rejectionReason: 'Conflicto de horarios con otra tutoría',
  rejectionComment: null,
  createdAt: '2023-10-26T10:00:00.000Z',
  respondedAt: '2023-10-26T10:30:00.000Z',
};
