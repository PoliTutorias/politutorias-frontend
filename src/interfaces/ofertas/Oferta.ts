/**
 * Tipos e interfaces para ofertas de tutoría
 *
 * Definiciones TypeScript para las entidades de ofertas, tutores y respuestas paginadas.
 * Basado en el contrato del endpoint GET /api/ofertas.
 */

/**
 * Entidad de tutor
 * Información del tutor que oferta la tutoría
 */
export interface TutorEntity {
  id: string;
  nombre: string;
  fotoUrl?: string;
}

/**
 * Entidad de oferta de tutoría
 * Estructura completa de una oferta de tutoría
 */
export interface OfertaEntity {
  id: string;
  titulo: string;
  descripcion: string;
  precioHora: number;
  modalidad: 'Presencial' | 'Virtual' | 'Virtual/Presencial';
  lugarReunion?: string;
  carrera: string;
  imagenRepresentativaUrl?: string;
  createdAt: string;
  tutor: TutorEntity;
}

/**
 * Respuesta paginada de ofertas
 * Estructura de la respuesta del endpoint GET /api/ofertas
 */
export interface PaginatedOffersResponse {
  items: OfertaEntity[];
  totalResults: number;
  page: number;
  limit: number;
}
