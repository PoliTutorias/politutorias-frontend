'use client';

import { useEffect, useState } from 'react';
import { OfertaDto } from '@/interfaces/oferta/OfertaDto';
import { getTutorOffersAction } from '@/app/actions/ofertas';
import { MisOfertasSection } from '@/components/ofertas/MisOfertasSection';
import { EmptyOffersState } from '@/components/ofertas/EmptyOffersState';
import { NuevaOfertaModal } from '@/components/ui/Modal/NuevaOfertaModal';
import { OfertaForm } from '@/components/forms/OfertaForm/OfertaForm';

/**
 * Página de Dashboard del Tutor - Mis Ofertas de Tutorías
 * Client Component que obtiene las ofertas y renderiza condicionalmente
 */
export default function DashboardPage() {
  const [ofertas, setOfertas] = useState<OfertaDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadOfertas = async () => {
      try {
        const response = await getTutorOffersAction();
        setOfertas(response.data || []);
      } catch (error) {
        console.error('Error loading ofertas:', error);
      } finally {
        setIsLoading(false);
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

  const handleOfertaCreated = async () => {
    // Recargar ofertas cuando se crea una nueva
    const response = await getTutorOffersAction();
    setOfertas(response.data || []);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con título y botón */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mis Ofertas de Tutorías</h1>
          <button
            onClick={handleOpenModal}
            className="px-6 py-2 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition"
          >
            + Nueva Oferta
          </button>
        </div>

        {/* Renderizado condicional */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Cargando ofertas...</p>
          </div>
        ) : ofertas && ofertas.length > 0 ? (
          <MisOfertasSection offers={ofertas} onNewOfertaClick={handleOpenModal} />
        ) : (
          <EmptyOffersState onCreateOfertaClick={handleOpenModal} />
        )}
      </div>

      {/* Modal para crear nueva oferta */}
      <NuevaOfertaModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <OfertaForm onSuccess={handleOfertaCreated} />
      </NuevaOfertaModal>
    </div>
  );
}
