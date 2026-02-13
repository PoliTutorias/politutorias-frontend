'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { NuevaOfertaModal } from '@/components/ui/Modal/NuevaOfertaModal';
import { OfertaForm } from '@/components/forms/OfertaForm/OfertaForm';
import { createOfertaAction } from '@/actions/createOferta';
import { CreateOfertaInput } from '@/schemas/createOfertaSchema';
import { getTutorOffersAction } from '@/actions/getTutorOffers';
import { OfertaDto } from '@/interfaces/oferta/OfertaDto';
import { MisOfertasSection } from '@/components/ofertas/MisOfertasSection';

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

        // Cerrar modal después de 1 segundo y mantener deshabilitado ese tiempo
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
      <main className="max-w-7xl mx-auto p-6">
        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Card - Left Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-[var(--border)] p-6">
              {/* Avatar Circle */}
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-3xl font-bold">
                  HC
                </div>
              </div>

              {/* Name */}
              <div className="text-center">
                <h2 className="text-lg font-semibold text-foreground">
                  Henry Carrasco
                </h2>
              </div>
            </div>
          </div>

          {/* Mis Ofertas de Tutorías - Right Side */}
          <div className="lg:col-span-3">
            <div className="flex flex-col h-full">
              {/* Header with Button */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">
                  Mis Ofertas de Tutorías
                </h2>
                <button
                  onClick={handleOpenModal}
                  className="bg-[var(--primary)] text-white px-6 py-2 rounded-md font-semibold hover:bg-[var(--primary-dark)] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span className="text-lg">+</span>
                  Nueva Oferta
                </button>
              </div>

              {/* Content Area */}
              {isLoadingOfertas ? (
                <div className="bg-white rounded-lg border border-[var(--border)] p-12 text-center flex-grow flex flex-col items-center justify-center">
                  <p className="text-[var(--text-secondary)]">Cargando ofertas...</p>
                </div>
              ) : ofertas.length > 0 ? (
                <div className="bg-white rounded-lg border border-[var(--border)] p-6">
                  <MisOfertasSection offers={ofertas} onNewOfertaClick={handleOpenModal} />
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-[var(--border)] p-12 text-center flex-grow flex flex-col items-center justify-center">
                  <svg
                    className="h-12 w-12 text-[var(--text-secondary)] mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C6.5 6.253 2 10.753 2 16.25s4.5 10 10 10 10-4.5 10-10S17.5 6.253 12 6.253z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No tienes ofertas activas
                  </h3>
                  <p className="text-[var(--text-secondary)] mb-6 max-w-md">
                    Publica tu primera oferta de tutoría para que los
                    estudiantes te encuentren
                  </p>
                  <button
                    onClick={handleOpenModal}
                    className="bg-[var(--primary)] text-white px-6 py-2 rounded-md font-semibold hover:bg-[var(--primary-dark)] transition-colors inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span className="text-lg">+</span>
                    Crear mi primera oferta
                  </button>
                </div>
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
