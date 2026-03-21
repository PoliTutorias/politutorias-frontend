'use client';

import { useEffect, useState, useTransition } from 'react';
import { fetchDaySessions, fetchSessionDetails } from '@/actions/agenda/agendaActions';
import { RightPanel } from '@/components/agenda/RightPanel/RightPanel';
import { CalendarComponent } from '@/components/calendar/CalendarComponent/CalendarComponent';
import { SessionDetailModal } from '@/components/session/SessionDetailModal/SessionDetailModal';
import type { InitialAgendaData, SelectedDayInfo } from '@/interfaces/agenda/AgendaInterfaces';
import type { SessionDetailDTO } from '@/interfaces/session/SessionInterfaces';

interface MiAgendaClientProps {
  initialData: InitialAgendaData;
}

export function MiAgendaClient({ initialData }: MiAgendaClientProps) {
  const [selectedDate, setSelectedDate] = useState('2026-03-20');
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

  const handleSessionClick = (sessionId: string) => {
    startTransition(async () => {
      const response = await fetchSessionDetails(sessionId);

      if (response.success && response.data) {
        setSessionDetail(response.data);
        setShowModal(true);
      }
    });
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setSessionDetail(null);
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

      <SessionDetailModal isOpen={showModal} sessionDetails={sessionDetail} onClose={closeModalHandler} />
    </section>
  );
}
