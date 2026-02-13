'use client';

import { useEffect, useState } from 'react';
import { OfertaDto } from '@/interfaces/oferta/OfertaDto';
import { getTutorOffersAction } from '@/actions/getTutorOffers';
import { MisOfertasSection } from '@/components/ofertas/MisOfertasSection';
import { NuevaOfertaModal } from '@/components/ui/Modal/NuevaOfertaModal';
import { OfertaForm } from '@/components/forms/OfertaForm/OfertaForm';

/**
 * Página de Mis Ofertas - Sección dentro del Dashboard del Tutor
 * Client Component que obtiene las ofertas y renderiza condicionalmente
 */
export default function MisOfertasPage() {
  const [ofertas, setOfertas] = useState<OfertaDto[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadOfertas = async () => {
      try {
        const response = await getTutorOffersAction();
        // Asegurarse de que siempre hay un array, aunque sea vacío
        const data = Array.isArray(response.data) ? response.data : [];
        setOfertas(data);
      } catch (error) {
        console.error('Error loading ofertas:', error);
        setOfertas([]);
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

  const handleOfertaSubmit = async () => {
    await handleOfertaCreated();
  };

  return (
    <>
      {/* Header con título y botón */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mis Ofertas de Tutorías</h1>
        <button
          onClick={handleOpenModal}
          className="px-6 py-2 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition"
        >
          + Nueva Oferta
        </button>
      </div>

      {/* Renderizado condicional - Siempre mostrar el grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Cargando ofertas...</p>
        </div>
      ) : (
        <MisOfertasSection offers={ofertas || []} onNewOfertaClick={handleOpenModal} />
      )}

      {/* Modal para crear nueva oferta */}
      <NuevaOfertaModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <OfertaForm onSubmit={handleOfertaSubmit} onCancel={handleCloseModal} />
      </NuevaOfertaModal>
    </>
  );
}
