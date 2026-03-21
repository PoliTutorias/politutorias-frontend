export interface CalendarSessionLabel {
  time: string;
  subject: string;
}

export interface CalendarDayData {
  date: string; // YYYY-MM-DD
  sessionCount: number;
  sessionLabels?: CalendarSessionLabel[];
}

export type SessionStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';

export interface SessionSummary {
  id: string;
  time: string; // HH:MM
  courseName: string;
  studentName: string;
  date: string; // YYYY-MM-DD
  status: SessionStatus;
}

export interface MonthlySessionSummary {
  totalConfirmed: number;
  sessions: SessionSummary[];
}

export interface InitialAgendaData {
  currentMonthName: string;
  currentYear: number;
  calendarDays: CalendarDayData[];
  monthlySummary: MonthlySessionSummary;
}

export interface SelectedDayInfo {
  date: string;
  totalSessions: number;
  sessions: SessionSummary[];
}
