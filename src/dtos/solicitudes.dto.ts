export enum SolicitudStatus {
  PENDIENTE = 'PENDIENTE',
  ACEPTADA = 'ACEPTADA',
  RECHAZADA = 'RECHAZADA',
  EXPIRADA = 'EXPIRADA',
}

export type SolicitudFilterStatus = SolicitudStatus | 'TODAS';

export interface SolicitudListParams {
  status?: SolicitudFilterStatus;
  page?: number;
  limit?: number;
}

export interface SolicitudListItemDto {
  id: string;
  avatarUrl?: string;
  tutorName: string;
  subject: string;
  dateTime: string;
  modality: 'Virtual' | 'Presencial';
  price: number;
  status: SolicitudStatus;
}

export interface ProposedScheduleDto {
  date: string;
  time: string;
}

export interface SolicitudDetailDto extends SolicitudListItemDto {
  studentId: string;
  tutorId: string;
  studentMessage: string;
  proposedSchedules: ProposedScheduleDto[];
  acceptedMeetingLocation?: string;
  acceptedMeetingLink?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedSolicitudListDto {
  items: SolicitudListItemDto[];
  total: number;
  page: number;
  limit: number;
}

export interface CancelSolicitudDto {
  reason?: string;
}

export interface APIResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}
