export type TutoriaEstado = 'pendiente' | 'aceptada' | 'rechazada';
export type TutoriaModalidad = 'Virtual' | 'Presencial';

export interface TutoriaEntity {
  id: string;
  estado: TutoriaEstado;
  modalidad: TutoriaModalidad;
  materia: string;
  estudiante: string;
  tutor: string;
  fecha: string;
  duracionMinutos: number;
  precioHora: number;
  mensajeEstudiante: string;
  enlaceReunion?: string;
  lugarEncuentro?: string;
  createdAt: string;
  updatedAt: string;
}
