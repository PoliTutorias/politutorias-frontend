export type SolicitudStatus = 'PENDIENTE' | 'EXPIRADA' | 'RESPONDIDA';

export interface GlobalCountsDto {
  pending: number;
  expired: number;
  responded: number;
}

export interface SolicitudDetailsDto {
  id: string;
  estudiante: string;
  materia: string;
  fechaHora: string;
  mensajeResumen: string;
  estado: SolicitudStatus;
  modalidad: 'Virtual' | 'Presencial';
  precioHora: number;
  mensajeCompleto: string;
}

export interface PaginatedSolicitudesDto {
  data: SolicitudDetailsDto[];
  total: number;
  page: number;
  limit: number;
}

export interface InitialFetchResponse {
  solicitudes: PaginatedSolicitudesDto;
  counts: GlobalCountsDto;
}

interface ApiSolicitudItem {
  id: string;
  nombreEstudiante?: string;
  estudiante?: string;
  materia: string;
  fechaHora: string;
  mensajeResumen: string;
  estado: string;
  modalidad?: 'Virtual' | 'Presencial';
  precioHora?: number;
  mensajeCompleto?: string;
}

export interface ApiSolicitudesResponse {
  data: ApiSolicitudItem[];
  total: number;
  page?: number;
  limit?: number;
  currentPage?: number;
  itemsPerPage?: number;
}