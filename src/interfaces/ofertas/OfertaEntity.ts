/**
 * Interfaz para el tutor de una oferta
 */
export interface TutorInfo {
  id: string;
  nombre: string;
  fotoUrl: string;
  contacto: string;
}

/**
 * Entidad de oferta de tutoría para filtrado por precio (HU27)
 * Estructura basada en el contrato del endpoint GET /api/ofertas
 */
export interface OfertaEntity {
  id: string;
  titulo: string;
  carrera: string;
  modalidad: 'Presencial' | 'Virtual' | 'Virtual/Presencial';
  descripcion: string;
  lugarReunion: string;
  precio: number;
  tutor: TutorInfo;
  imagenRepresentativaUrl: string;
  // Campos adicionales para mostrar en las tarjetas
  tags?: string[];
  calificacionPromedio?: number;
  totalReseñas?: number;
  horarios?: string[];
}
