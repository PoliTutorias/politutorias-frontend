import type {
  CalendarDayData,
  InitialAgendaData,
  SelectedDayInfo,
  SessionSummary,
} from '@/interfaces/agenda/AgendaInterfaces';
import type { SessionDetailDTO } from '@/interfaces/session/SessionInterfaces';

const TUTOR_ID = '550e8400-e29b-41d4-a716-446655440000';

const monthlySessionsSeed: SessionSummary[] = [
  { id: 'sess-0306-0900-cv-diego', time: '09:00', courseName: 'Calculo Vectorial', studentName: 'Diego Castillo', date: '2026-03-06', status: 'COMPLETED' },
  { id: 'sess-0306-0900-fi-valeria', time: '09:00', courseName: 'Fisica I', studentName: 'Valeria Sanchez', date: '2026-03-06', status: 'COMPLETED' },
  { id: 'sess-0306-1100-est-diego', time: '11:00', courseName: 'Estatica', studentName: 'Diego Castillo', date: '2026-03-06', status: 'COMPLETED' },
  { id: 'sess-0306-1600-al-sofia', time: '16:00', courseName: 'Algebra Lineal', studentName: 'Sofia Mendoza', date: '2026-03-06', status: 'COMPLETED' },
  { id: 'sess-0308-0900-cv-sebastian', time: '09:00', courseName: 'Calculo Vectorial', studentName: 'Sebastian Rios', date: '2026-03-08', status: 'COMPLETED' },
  { id: 'sess-0315-1000-cv-andres', time: '10:00', courseName: 'Calculo Vectorial', studentName: 'Andres Morales', date: '2026-03-15', status: 'COMPLETED' },
  { id: 'sess-0320-1000-al-lucas', time: '10:00', courseName: 'Algebra Lineal', studentName: 'Lucas Herrera', date: '2026-03-20', status: 'PENDING' },
  { id: 'sess-0321-1500-cv-maria', time: '15:00', courseName: 'Calculo Vectorial', studentName: 'Maria Perez', date: '2026-03-21', status: 'PENDING' },
  { id: 'sess-0325-1600-est-camila', time: '16:00', courseName: 'Estatica', studentName: 'Camila Flores', date: '2026-03-25', status: 'PENDING' },
  { id: 'sess-0327-1100-al-andres', time: '11:00', courseName: 'Algebra Lineal', studentName: 'Andres Morales', date: '2026-03-27', status: 'PENDING' },
  { id: 'sess-0328-0800-ci-laura', time: '08:00', courseName: 'Calculo Integral', studentName: 'Laura Medina', date: '2026-03-28', status: 'PENDING' },
  { id: 'sess-0331-1800-pr-juan', time: '18:00', courseName: 'Programacion', studentName: 'Juan Torres', date: '2026-03-31', status: 'PENDING' },
];

function buildCalendarDaysSeed(): CalendarDayData[] {
  const byDate = new Map<string, SessionSummary[]>();

  monthlySessionsSeed.forEach((session) => {
    const existing = byDate.get(session.date) ?? [];
    existing.push(session);
    byDate.set(session.date, existing);
  });

  return Array.from({ length: 31 }, (_, index) => {
    const day = String(index + 1).padStart(2, '0');
    const date = `2026-03-${day}`;
    const sessions = byDate.get(date) ?? [];

    return {
      date,
      sessionCount: sessions.length,
      sessionLabels: sessions.slice(0, 2).map((session) => ({
        time: session.time,
        subject: session.courseName,
      })),
    };
  });
}

export const initialAgendaDataSeed: InitialAgendaData = {
  currentMonthName: 'Marzo',
  currentYear: 2026,
  calendarDays: buildCalendarDaysSeed(),
  monthlySummary: {
    totalConfirmed: monthlySessionsSeed.length,
    sessions: monthlySessionsSeed,
  },
};

export const selectedDayInfoSeed: SelectedDayInfo = {
  date: '2026-03-06',
  totalSessions: 4,
  sessions: monthlySessionsSeed.filter((session) => session.date === '2026-03-06'),
};

export const sessionDetailDTOSeeds: SessionDetailDTO[] = [
  {
    id: 'sess-0327-1100-al-andres',
    tutorId: TUTOR_ID,
    courseName: 'Algebra Lineal',
    student: { id: 'stu-andres', name: 'Andres Morales', initials: 'AN' },
    date: '2026-03-27',
    time: '11:00',
    modality: 'VIRTUAL',
    pricePerHour: 10,
    studentMessage: 'Repaso de valores y vectores propios.',
    link: 'https://zoom.us/j/444555666',
    status: 'PENDING',
  },
  {
    id: 'sess-0321-1500-cv-maria',
    tutorId: TUTOR_ID,
    courseName: 'Calculo Vectorial',
    student: { id: 'stu-maria', name: 'Maria Perez', initials: 'MP' },
    date: '2026-03-21',
    time: '15:00',
    modality: 'PRESENCIAL',
    pricePerHour: 12,
    studentMessage: 'Me cuesta el tema de gradiente y divergencia.',
    location: 'Biblioteca central, salon 2B',
    status: 'PENDING',
  },
  {
    id: 'sess-0308-0900-cv-sebastian',
    tutorId: TUTOR_ID,
    courseName: 'Calculo Vectorial',
    student: { id: 'stu-sebastian', name: 'Sebastian Rios', initials: 'SE' },
    date: '2026-03-08',
    time: '09:00',
    modality: 'VIRTUAL',
    pricePerHour: 10,
    studentMessage: 'Repaso general de integrales para el examen.',
    link: 'https://zoom.us/j/888777666',
    status: 'COMPLETED',
  },
  {
    id: 'sess-0306-1600-al-sofia',
    tutorId: TUTOR_ID,
    courseName: 'Algebra Lineal',
    student: { id: 'stu-sofia', name: 'Sofia Mendoza', initials: 'SM' },
    date: '2026-03-06',
    time: '16:00',
    modality: 'PRESENCIAL',
    pricePerHour: 10,
    studentMessage: 'Necesito apoyo para diagonalizacion.',
    location: 'Bloque K, aula 301',
    status: 'COMPLETED',
  },
];
