'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { fetchDaySessions, fetchSessionDetails } from '@/actions/agenda/agendaActions';
import { RightPanel } from '@/components/agenda/RightPanel/RightPanel';
import { CalendarComponent } from '@/components/calendar/CalendarComponent/CalendarComponent';
import { SessionDetailModal } from '@/components/session/SessionDetailModal/SessionDetailModal';
import type { InitialAgendaData, SelectedDayInfo, SessionSummary } from '@/interfaces/agenda/AgendaInterfaces';
import type { SessionDetailDTO } from '@/interfaces/session/SessionInterfaces';

interface MiAgendaClientProps {
  initialData: InitialAgendaData;
}

function toIsoDateString(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function MiAgendaClient({ initialData }: MiAgendaClientProps) {
  const router = useRouter();
  const todayIso = toIsoDateString(new Date());
  const fallbackDate = initialData.calendarDays[0]?.date ?? todayIso;
  const defaultSelectedDate = initialData.calendarDays.some((day) => day.date === todayIso)
    ? todayIso
    : fallbackDate;

  const [selectedDate, setSelectedDate] = useState(defaultSelectedDate);
  const [selectedDayInfo, setSelectedDayInfo] = useState<SelectedDayInfo | null>(null);
  const [sessionDetail, setSessionDetail] = useState<SessionDetailDTO | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const response = await fetchDaySessions(selectedDate);
      if (response.success && response.data) {
        setSelectedDayInfo(response.data);
      }
    });
  }, [selectedDate]);

  const handleDaySelect = (date: string) => {
    setSelectedDate(date);
  };

  const buildFallbackSessionDetail = (sessionId: string): SessionDetailDTO | null => {
    const sessionsPool: SessionSummary[] = [
      ...(selectedDayInfo?.sessions ?? []),
      ...initialData.monthlySummary.sessions,
    ];

    const summary = sessionsPool.find((session) => session.id === sessionId);
    if (!summary) {
      return null;
    }

    const initials = summary.studentName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('');

    const isPast = summary.status === 'COMPLETED';

    return {
      id: summary.id,
      tutorId: process.env.NEXT_PUBLIC_TUTOR_ID ?? 'unknown-tutor',
      courseName: summary.courseName,
      student: {
        id: `fallback-${summary.id}`,
        name: summary.studentName,
        initials: initials || 'NA',
      },
      date: summary.date,
      time: summary.time,
      modality: 'VIRTUAL',
      pricePerHour: 10,
      studentMessage: 'Detalle temporal cargado desde resumen de agenda.',
      link: 'https://zoom.us/j/000000000',
      status: isPast ? 'COMPLETED' : 'PENDING',
    };
  };

  const handleSessionClick = (sessionId: string) => {
    startTransition(async () => {
      const response = await fetchSessionDetails(sessionId);

      if (response.success && response.data) {
        setSessionDetail(response.data);
        setShowModal(true);
        return;
      }

      const fallbackDetail = buildFallbackSessionDetail(sessionId);
      if (fallbackDetail) {
        setSessionDetail(fallbackDetail);
        setShowModal(true);
      }
    });
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setSessionDetail(null);
  };

  const cancelTutoriaHandler = (sessionId: string) => {
    closeModalHandler();
    router.push(`/tutor/cancelar-tutoria?sessionId=${sessionId}`);
  };

  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-[2.3fr_1fr]">
      <CalendarComponent
        currentMonthName={initialData.currentMonthName}
        currentYear={initialData.currentYear}
        calendarDays={initialData.calendarDays}
        selectedDate={selectedDate}
        onDaySelect={handleDaySelect}
      />

      <RightPanel
        monthlySummary={initialData.monthlySummary}
        selectedDayInfo={selectedDayInfo}
        selectedDate={selectedDate}
        isLoadingDayInfo={isPending}
        onSessionClick={handleSessionClick}
      />

      <SessionDetailModal
        isOpen={showModal}
        sessionDetails={sessionDetail}
        onClose={closeModalHandler}
        onCancelTutoria={cancelTutoriaHandler}
      />
    </section>
  );
}
