/**
 * DTOs para las respuestas del backend
 * Corresponden exactamente con la estructura del servidor
 */

export interface OfertaBackendDto {
  id: string;
  title: string;
  modality: string;
  description: string;
  categories: string[];
  price: number;
  rating: number;
  reviewsCount: number;
  availability: AvailabilityBackendDto[];
  tutor: TutorBackendDto;
}

export interface AvailabilityBackendDto {
  day: string;
  hour: string;
}

export interface TutorBackendDto {
  id: string;
  nombreCompleto: string;
  fotoPerfil: string | null;
  semestreActual: string;
  calificacionPromedio: number;
  numResenas: number;
  biografiaCorta: string;
  numeroWhatsapp: string;
  experiencias: ExperienciaBackendDto[];
  materias: MateriaBackendDto[];
}

export interface ExperienciaBackendDto {
  id: string;
  puesto: string;
  institucion: string;
  fechaInicio: string;
  fechaFin: string;
}

export interface MateriaBackendDto {
  id: string;
  nombre: string;
}

export interface ErrorBackendDto {
  statusCode: number;
  message: string;
  error: string;
}
