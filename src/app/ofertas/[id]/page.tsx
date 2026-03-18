'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { toast } from 'sonner';
import HeaderComponent from '@/components/shared/Header/Header';
import OfferInfoSection from '@/components/offers/OfferInfoSection/OfferInfoSection';
import PricingContactSection from '@/components/offers/PricingContactSection/PricingContactSection';
import TutorSection from '@/components/tutor/TutorSection/TutorSection';
import ExperienceSection from '@/components/tutor/ExperienceSection/ExperienceSection';
import ModalSolicitarTutoria from '@/components/solicitud/ModalSolicitarTutoria/ModalSolicitarTutoria';
import AlertaSolicitudPrevia from '@/components/common/AlertaSolicitudPrevia/AlertaSolicitudPrevia';
import NotificacionExito from '@/components/common/NotificacionExito/NotificacionExito';
import { DetallesOfertaDto, HorarioDisponibleDto } from '@/interfaces/offers/DetallesOfertaDto';
import { getOfferDetailsAction } from '@/actions/ofertas/getOfferDetailsAction';
import { verificarSolicitudPreviaAction } from '@/actions/solicitudes/verificarSolicitudPreviaAction';
import { enviarSolicitudTutoriaAction } from '@/actions/solicitudes/enviarSolicitudTutoriaAction';

interface DetallesOfertaPageProps {
  params: Promise<{
    id: string;
  }>;
}


export default function DetallesOfertaPage({
  params,
}: DetallesOfertaPageProps) {
  const resolvedParams = params instanceof Promise ? params : Promise.resolve(params);
  const [offerDetails, setOfferDetails] = useState<DetallesOfertaDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedHorarios, setSelectedHorarios] = useState<HorarioDisponibleDto[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [alertaVisible, setAlertaVisible] = useState(false);
  const [alertaMessage, setAlertaMessage] = useState('');
  const [notificacionVisible, setNotificacionVisible] = useState(false);
  const [notificacionMessage, setNotificacionMessage] = useState('');
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const getDateForDay = (day: string): string => {
    const daysOfWeek = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];

    const dayIndex = daysOfWeek.indexOf(day);
    const today = new Date();
    const currentDayIndex = today.getDay();

    if (dayIndex < 0) {
      return today.toISOString().slice(0, 10);
    }

    let daysToAdd = dayIndex - currentDayIndex;
    if (daysToAdd < 0) {
      daysToAdd += 7;
    }

    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + daysToAdd);
    return targetDate.toISOString().slice(0, 10);
  };

  useEffect(() => {
    const loadOfferDetails = async () => {
      const p = await resolvedParams;
      const result = await getOfferDetailsAction(p.id);
      
      if (result.success && result.data) {
        setOfferDetails(result.data);
      } else {
        console.error('Failed to load offer:', result.error);
        setOfferDetails(null);
      }
      
      setLoading(false);
    };

    loadOfferDetails();
  }, [resolvedParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <HeaderComponent />
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-600">Cargando oferta...</p>
        </div>
      </div>
    );
  }

  if (!offerDetails) {
    notFound();
  }

  const handleHorarioSelect = async (horario: HorarioDisponibleDto) => {
    if (!offerDetails) {
      return;
    }

    // Si ya está seleccionado, deseleccionarlo (toggle)
    const isAlreadySelected = selectedHorarios.some(
      (h) => h.day === horario.day && h.time === horario.time
    );
    if (isAlreadySelected) {
      setSelectedHorarios([]);
      return;
    }

    // SOL-05: verificar si ya hay solicitud previa para este horario
    const checkResult = await verificarSolicitudPreviaAction({
      ofertaId: offerDetails.id,
      horarios: [
        {
          fecha: getDateForDay(horario.day),
          hora: horario.time,
        },
      ],
    });

    const hasSolicitudPrevia =
      checkResult.existe || Boolean(checkResult.mensaje && checkResult.mensaje.trim().length > 0);

    if (hasSolicitudPrevia) {
      toast('Horario ya solicitado', {
        description: `Ya tienes una solicitud activa para ${horario.day} ${horario.time}`,
        position: 'bottom-center',
        duration: 3500,
        unstyled: true,
        style: {
          backgroundColor: '#c65a22',
          color: '#ffffff',
          borderRadius: '10px',
          padding: '14px 18px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
          border: '1px solid rgba(255,255,255,0.25)',
        },
      });
      return;
    }

    // SOL-04: Solo un horario por solicitud — reemplazar en vez de agregar
    setSelectedHorarios([horario]);
  };

  const handleHorarioRemove = (horario: HorarioDisponibleDto) => {
    setSelectedHorarios(
      selectedHorarios.filter((h) => !(h.day === horario.day && h.time === horario.time))
    );
  };

  const handleOpenModal = async () => {
    if (selectedHorarios.length === 0) {
      return;
    }

    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSubmitSolicitud = async (data: {
    mensaje: string;
    modalidad?: 'virtual' | 'presencial';
  }) => {
    setIsLoadingSubmit(true);
    
    try {
      const result = await enviarSolicitudTutoriaAction({
        ofertaId: offerDetails.id,
        horarios: selectedHorarios.map((h) => ({
          fecha: getDateForDay(h.day),
          hora: h.time,
        })),
        mensaje: data.mensaje,
        modalidad: data.modalidad,
      });

      if (result.success) {
        setNotificacionMessage(
          result.message || '¡Solicitud enviada! 1 horario propuesto. El tutor revisará tu solicitud pronto.'
        );
        setNotificacionVisible(true);
        setShowModal(false);
        setSelectedHorarios([]);
      } else {
        setAlertaMessage(result.message || 'Error al enviar la solicitud');
        setAlertaVisible(true);
      }
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <HeaderComponent />
      <main className="container mx-auto px-12 lg:px-32 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:max-w-4xl lg:mx-auto">
          {/* Sección principal de información de la oferta */}
          <div className="lg:col-span-2">
            <OfferInfoSection
              title={offerDetails.title}
              modality={offerDetails.modality}
              description={offerDetails.description}
              categories={offerDetails.categories}
              availability={offerDetails.availability}
              selectedHorarios={selectedHorarios}
              onHorarioSelect={handleHorarioSelect}
              onHorarioRemove={handleHorarioRemove}
            />
          </div>

          {/* Panel lateral con precio */}
          <div className="lg:col-span-1">
            <PricingContactSection
              pricePerHour={offerDetails.pricePerHour}
              cantidadHorariosSeleccionados={selectedHorarios.length}
              onSolicitarClick={handleOpenModal}
            />
          </div>
        </div>
      </main>

      {/* Sección Sobre el Tutor con fondo gris azulado - ancho completo */}
      <section className="w-full bg-gray-100 py-8">
        <div className="container mx-auto px-12 lg:px-32">
          <div className="lg:max-w-4xl lg:mx-auto">
            <h2 className="text-2xl font-extrabold text-primary mb-6">Sobre el Tutor</h2>
            <div className="grid grid-cols-1 gap-6">
              <TutorSection tutor={offerDetails.tutor} />
              <ExperienceSection experiences={offerDetails.tutor.experience} />
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Solicitar Tutoría */}
      <ModalSolicitarTutoria
        isOpen={showModal}
        onClose={handleModalClose}
        tutorInfo={offerDetails.tutor}
        selectedHorarios={selectedHorarios}
        ofertaModalidad={
          (offerDetails.modality || '').toLowerCase() as
            | 'virtual'
            | 'presencial'
            | 'virtual/presencial'
        }
        ofertaTitle={offerDetails.title}
        pricePerHour={offerDetails.pricePerHour}
        onRemoveHorario={handleHorarioRemove}
        onSubmit={handleSubmitSolicitud}
        isLoading={isLoadingSubmit}
      />

      {/* Alerta de Solicitud Previa */}
      <AlertaSolicitudPrevia
        message={alertaMessage}
        isVisible={alertaVisible}
        onClose={() => setAlertaVisible(false)}
      />

      {/* Notificación de Éxito */}
      <NotificacionExito
        message={notificacionMessage}
        isVisible={notificacionVisible}
        onClose={() => setNotificacionVisible(false)}
      />
    </div>
  );
}
