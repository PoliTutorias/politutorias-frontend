export type TutoriaAgendadaModalidad = 'Virtual' | 'Presencial';

export type TutoriaAgendadaEstado = 'AGENDADA' | 'COMPLETADA' | 'CANCELADA';

export interface TutorAgendadoDTO {
  id: string;
  nombre: string;
  apellido: string;
  fotoUrl: string;
}

export interface TutoriasAgendadasDTO {
  id: string;
  materia: string;
  fecha: string;
  hora: string;
  modalidad: TutoriaAgendadaModalidad;
  tarifa: number;
  tutor: TutorAgendadoDTO;
  estado: TutoriaAgendadaEstado;
  enlaceReunion?: string;
  direccion?: string;
  mensajeEstudiante?: string;
}
