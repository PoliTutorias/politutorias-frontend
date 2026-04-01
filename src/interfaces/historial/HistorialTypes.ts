export interface TutorInfoShort {
  id: string;
  nombre: string;
  apellido: string;
  fotoUrl: string;
}

export interface TutoriaHistorialListDTO {
  id: string;
  materia: string;
  tutor: TutorInfoShort;
  fecha: string;
  hora: string;
  estado: 'COMPLETADA' | 'INASISTENCIA';
}

export interface TutorInfo {
  id: string;
  nombre: string;
  apellido: string;
  fotoUrl: string;
}

export interface ResenaInfo {
  calificacion: number;
  comentario: string;
  fechaCreacion: string;
}

export interface TutoriaDetalleDTO {
  id: string;
  materia: string;
  tutor: TutorInfo;
  fecha: string;
  hora: string;
  modalidad: string;
  precioPorHora: number;
  enlaceReunion: string | null;
  ubicacion: string | null;
  mensajeEstudiante: string;
  estado: 'COMPLETADA' | 'INASISTENCIA';
  resena?: ResenaInfo;
}

export interface HistorialQueryParams {
  page: number;
  limit: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  status?: ('COMPLETADA' | 'INASISTENCIA')[];
}

export interface HistorialApiResponse<T> {
  success: boolean;
  data: T;
  total: number;
  page: number;
  limit: number;
  message?: string;
}
