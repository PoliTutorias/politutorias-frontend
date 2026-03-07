'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import { NuevaOfertaModal } from '@/components/ui/Modal/NuevaOfertaModal';
import { OfertaForm } from '@/components/forms/OfertaForm/OfertaForm';
import { createOfertaAction } from '@/actions/createOferta';
import { CreateOfertaInput } from '@/schemas/createOfertaSchema';
import { getTutorOffersAction } from '@/actions/getTutorOffers';
import { OfertaDto } from '@/interfaces/oferta/OfertaDto';
import { MisOfertasSection } from '@/components/ofertas/MisOfertasSection';
import { EmptyOfferState } from '@/components/ofertas/EmptyOfferState';
import { FiClock } from 'react-icons/fi';

export function TutorDashboardContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ofertas, setOfertas] = useState<OfertaDto[]>([]);
  const [isLoadingOfertas, setIsLoadingOfertas] = useState(true);


  // Cargar ofertas al montar el componente
  useEffect(() => {
    const loadOfertas = async () => {
      try {
        const response = await getTutorOffersAction();
        const data = Array.isArray(response.data) ? response.data : [];
        setOfertas(data);
      } catch (error) {
        console.error('Error loading ofertas:', error);
        setOfertas([]);
      } finally {
        setIsLoadingOfertas(false);
      }
    };

    loadOfertas();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitOferta = async (data: CreateOfertaInput) => {
    setIsLoading(true);
    try {
      const result = await createOfertaAction(data);

      if (result.success) {
        toast.success('Oferta creada exitosamente', {
          duration: 3000,
        });

        // Recargar ofertas después de crear una nueva
        const response = await getTutorOffersAction();
        const updatedData = Array.isArray(response.data) ? response.data : [];
        setOfertas(updatedData);

        setTimeout(() => {
          handleCloseModal();
          setIsLoading(false);
        }, 1000);
      } else {
        setIsLoading(false);
        if (result.errors && result.errors.length > 0) {
          result.errors.forEach((error) => {
            toast.error(error);
          });
        } else {
          toast.error(
            result.message || 'Ocurrió un error al crear la oferta'
          );
        }
      }
    } catch (error) {
      setIsLoading(false);
      toast.error('Error inesperado al crear la oferta');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Main 2-column layout */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ========== LEFT SIDEBAR - Profile ========== */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              {/* Avatar */}
              <div className="flex justify-center mb-5">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  DA
                </div>
              </div>

              {/* Name & Email */}
              <div className="text-center">
                <p className="text-base font-bold text-gray-900">Daniel Valdiviezo</p>
                <p className="text-sm text-gray-500 mt-0.5">daniel.v@epn.edu.ec</p>
              </div>
            </div>
          </div>

          {/* ========== RIGHT CONTENT ========== */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm p-6">

              {/* Gestión Rápida Title */}
              <p className="text-lg font-bold text-gray-800 mb-4">Gestión Rápida</p>

              {/* Gestión Rápida Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {/* Disponibilidad */}
                <Link
                  href="/dashboard/tutor/disponibilidad"
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm transition-all group"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#fefcbf' }}
                  >
                    <FiClock size={20} style={{ color: '#F9A825' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-[#d69e2e] transition-colors">
                      Disponibilidad
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Gestionar horarios
                    </p>
                  </div>
                </Link>
              </div>

              {/* Divider + Mis Ofertas Header */}
              <div className="flex items-center justify-between mb-5 pt-2 border-t border-gray-100">
                <p className="text-lg font-bold text-gray-800 pt-4">
                  Mis Ofertas de Tutorías
                </p>
                <button
                  onClick={handleOpenModal}
                  className="mt-4 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  <span className="text-base leading-none">+</span>
                  Nueva Oferta
                </button>
              </div>

              {/* Offers Content */}
              {isLoadingOfertas ? (
                <div className="py-16 text-center">
                  <p className="text-gray-400 text-sm">Cargando ofertas...</p>
                </div>
              ) : ofertas.length > 0 ? (
                <MisOfertasSection offers={ofertas} />
              ) : (
                <EmptyOfferState onCreateClick={handleOpenModal} showButton={true} />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      <NuevaOfertaModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <OfertaForm
          onCancel={handleCloseModal}
          onSubmit={handleSubmitOferta}
          isLoading={isLoading}
        />
      </NuevaOfertaModal>
    </>
  );
}
