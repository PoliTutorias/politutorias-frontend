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
  status: 'SIN_CONFIRMAR' | 'COMPLETADA' | 'CANCELADA' | 'INASISTENCIA';
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
  status: 'SIN_CONFIRMAR' | 'COMPLETADA' | 'CANCELADA' | 'INASISTENCIA';
  studentRating: number | null;
  studentComment: string | null;
}
