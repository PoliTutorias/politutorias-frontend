export type TutorialEstado = 'SIN_CONFIRMAR' | 'Completada' | 'Inasistencia' | 'Pendiente' | 'Cancelada';

export interface TutorialSummaryDto {
  completedTutorials: number;
  subjectsTaught: number;
  studentsQualified: number;
}

export interface TutorialHistoryItemDto {
  id: string;
  studentInitials: string;
  studentName: string;
  offerTitle: string;
  date: string;
  time: string;
  estado: TutorialEstado;
}

export interface PaginatedTutorialHistoryDto {
  items: TutorialHistoryItemDto[];
  total: number;
  page: number;
  limit: number;
}

export interface HistoryResponse {
  summary: TutorialSummaryDto;
  paginatedData: PaginatedTutorialHistoryDto;
}

export interface TutorialDetailDto {
  id: string;
  studentName: string;
  studentInitials: string;
  offerTitle: string;
  subject: string;
  date: string;
  time: string;
  modality: 'Presencial' | 'Virtual';
  price: number;
  currency: string;
  locationOrLink: string;
  message: string;
  estado: TutorialEstado;
  studentRating?: number | null;
  studentComment?: string | null;
}
