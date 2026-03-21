import type { SessionStatus } from '@/interfaces/agenda/AgendaInterfaces';

export type SessionModality = 'VIRTUAL' | 'PRESENCIAL';

export interface SessionStudentInfo {
  id: string;
  name: string;
  initials: string;
}

export interface SessionDetailDTO {
  id: string;
  tutorId: string;
  courseName: string;
  student: SessionStudentInfo;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  modality: SessionModality;
  pricePerHour: number;
  studentMessage: string;
  link?: string;
  location?: string;
  status: SessionStatus;
}
