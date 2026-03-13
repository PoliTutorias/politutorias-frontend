/**
 * DTO para los detalles completos de una oferta de tutoría
 * Contiene toda la información necesaria para mostrar la página de detalle de oferta (HU32)
 */

export interface CategoryDto {
  name: string;
}

export interface AvailabilityDto {
  day: string;
  time: string;
}

// Alias para mantener consistency con nombres más descriptivos
export type HorarioDisponibleDto = AvailabilityDto;

export interface TutorDetailDto {
  id: string;
  name: string;
  career: string;
  semester: string;
  rating: number;
  reviewsCount: number;
  description: string;
  masteredSubjects: CategoryDto[];
  experience: ExperienceDto[];
  phoneNumber: string;
  profileImageUrl?: string | null;
}

export interface ExperienceDto {
  position: string;
  institution: string;
  period: string;
}

export interface DetallesOfertaDto {
  id: string;
  title: string;
  modality: string;
  description: string;
  categories: CategoryDto[];
  availability: AvailabilityDto[];
  pricePerHour: number;
  tutor: TutorDetailDto;
}
