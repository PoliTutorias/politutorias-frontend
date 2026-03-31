export type TutoriaEstadoType = 'sin confirmar' | 'pendiente' | 'inasistencia' | 'completada' | 'cancelada';

export interface TutoriaResponseDto {
  id: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  estado: TutoriaEstadoType;
  tutorId: string;
  estudianteId: string;
  materia: string;
  modalidad: string;
  lugar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TutoriaApiResponse {
  success: boolean;
  message: string;
  data?: TutoriaResponseDto;
}
