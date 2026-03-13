'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import HeaderComponent from '@/components/shared/Header/Header';
import OfferInfoSection from '@/components/offers/OfferInfoSection/OfferInfoSection';
import PricingContactSection from '@/components/offers/PricingContactSection/PricingContactSection';
import TutorSection from '@/components/tutor/TutorSection/TutorSection';
import ExperienceSection from '@/components/tutor/ExperienceSection/ExperienceSection';
import ModalSolicitarTutoria from '@/components/solicitud/ModalSolicitarTutoria/ModalSolicitarTutoria';
import AlertaSolicitudPrevia from '@/components/common/AlertaSolicitudPrevia/AlertaSolicitudPrevia';
import NotificacionExito from '@/components/common/NotificacionExito/NotificacionExito';
import { DetallesOfertaDto, HorarioDisponibleDto } from '@/interfaces/offers/DetallesOfertaDto';
import { OfertaBackendDto } from '@/interfaces/offers/OfertaBackendDto';
import { getOfferDetailsSeed } from '@/lib/seeds/OfferDetailsSeedData';
import { verificarSolicitudPreviaAction } from '@/actions/solicitudes/verificarSolicitudPreviaAction';
import { enviarSolicitudTutoriaAction } from '@/actions/solicitudes/enviarSolicitudTutoriaAction';

interface DetallesOfertaPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Mapea abreviaturas de días del backend a nombres completos en español
 */
function mapDayAbbreviationToFull(dayAbbr: string): string {
  const dayMap: Record<string, string> = {
    'Lun': 'Lunes',
    'Mar': 'Martes',
    'Mié': 'Miércoles',
    'Jue': 'Jueves',
    'Vie': 'Viernes',
    'Sáb': 'Sábado',
    'Dom': 'Domingo',
    // Manejar también nombres completos si vienen así
    'Lunes': 'Lunes',
    'Martes': 'Martes',
    'Miércoles': 'Miércoles',
    'Jueves': 'Jueves',
    'Viernes': 'Viernes',
    'Sábado': 'Sábado',
    'Domingo': 'Domingo',
  };
  return dayMap[dayAbbr] || dayAbbr;
}

/**
 * Mapea la respuesta del backend (OfertaBackendDto) a nuestro DTO interno (DetallesOfertaDto)
 */
function mapBackendOfertaToDetallesOferta(
  backendOferta: OfertaBackendDto
): DetallesOfertaDto {
  return {
    id: backendOferta.id,
    title: backendOferta.title,
    modality: backendOferta.modality,
    description: backendOferta.description,
    categories: backendOferta.categories.map((name) => ({
      name,
    })),
    availability: backendOferta.availability.map((av) => ({
      day: mapDayAbbreviationToFull(av.day),
      time: av.hour,
    })),
    pricePerHour: backendOferta.price,
    tutor: {
      id: backendOferta.tutor.id,
      name: backendOferta.tutor.nombreCompleto,
      profileImageUrl: backendOferta.tutor.fotoPerfil,
      career: backendOferta.tutor.semestreActual,
      semester: backendOferta.tutor.semestreActual,
      rating: backendOferta.tutor.calificacionPromedio,
      reviewsCount: backendOferta.tutor.numResenas,
      description: backendOferta.tutor.biografiaCorta,
      phoneNumber: backendOferta.tutor.numeroWhatsapp,
      masteredSubjects: backendOferta.tutor.materias.map((materia) => ({
        name: materia.nombre,
      })),
      experience: backendOferta.tutor.experiencias.map((exp) => ({
        position: exp.puesto,
        institution: exp.institucion,
        period: `${exp.fechaInicio} — ${exp.fechaFin}`,
      })),
    },
  };
}

async function getOfferDetails(offerId: string): Promise<DetallesOfertaDto | null> {
  // ===== USANDO SEED DATA (para desarrollo antes de que el backend esté disponible) =====
  return getOfferDetailsSeed(offerId);

  // ===== FETCH AL BACKEND (comentado - Descomentar cuando el backend esté levantado) =====
  // Asegurate de que:
  // 1. NEXT_PUBLIC_BACKEND_API_URL esté configurada en .env.local
  // 2. El backend esté levantado y escuchando en el puerto correcto
  // 3. Los CORS estén configurados correctamente en el backend
  /*
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  
  if (!backendUrl) {
    console.error('NEXT_PUBLIC_BACKEND_API_URL is not defined. Using seed data.');
    return getOfferDetailsSeed(offerId);
  }

  try {
    const response = await fetch(`${backendUrl}/api/ofertas/${offerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (response.status === 404 || response.status === 400) {
      console.warn(`Offer not found: ${offerId}, falling back to seed data`);
      return getOfferDetailsSeed(offerId);
    }

    if (!response.ok) {
      console.error(
        `Error fetching offer details: ${response.status} ${response.statusText}`
      );
      return getOfferDetailsSeed(offerId);
    }

    const backendData: OfertaBackendDto = await response.json();
    const mappedOferta = mapBackendOfertaToDetallesOferta(backendData);
    return mappedOferta;
  } catch (error) {
    console.error('Error in getOfferDetails. Backend may not be available. Using seed data.', error);
    return getOfferDetailsSeed(offerId);
  }
  */
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

  useEffect(() => {
    const loadOfferDetails = async () => {
      const p = await resolvedParams;
      const details = await getOfferDetails(p.id);
      setOfferDetails(details);
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

  const handleHorarioSelect = (horario: HorarioDisponibleDto) => {
    const isDuplicate = selectedHorarios.some(
      (h) => h.day === horario.day && h.time === horario.time
    );
    if (!isDuplicate) {
      setSelectedHorarios([...selectedHorarios, horario]);
    }
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

    // Verificar solicitud previa
    const checkResult = await verificarSolicitudPreviaAction({
      estudianteId: 'b1c2d3e4-f5a6-7890-1234-567890fedcba',
      tutorId: offerDetails.tutor.id,
      horarios: selectedHorarios.map((h) => ({
        fecha: '2026-03-13',
        hora: h.time,
      })),
    });

    if (checkResult.existe) {
      setAlertaMessage(checkResult.mensaje || 'Solicitud ya realizada');
      setAlertaVisible(true);
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
        tutorId: offerDetails.tutor.id,
        estudianteId: 'b1c2d3e4-f5a6-7890-1234-567890fedcba',
        horarios: selectedHorarios.map((h) => ({
          fecha: '2026-03-13',
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
        ofertaModalidad={offerDetails.modality as 'virtual' | 'presencial' | 'virtual/presencial'}
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
