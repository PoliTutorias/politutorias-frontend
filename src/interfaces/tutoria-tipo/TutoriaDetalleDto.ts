export type EstadoTutoria = 'SIN_CONFIRMAR' | 'COMPLETADA' | 'CANCELADA' | 'INASISTENCIA';

export interface TutoriaDetalleDto {
  id: string;
  estudiante: {
    id: string;
    nombre: string;
  };
  materia: string;
  fecha: string;
  hora: string;
  tipo: 'Presencial' | 'Virtual';
  precioPorHora: number;
  lugar: string | null;
  mensajeEstudiante: string | null;
  estado: EstadoTutoria;
  calificacionEstudiante: number | null;
  comentarioEstudiante: string | null;
}
