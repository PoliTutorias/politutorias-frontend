'use client';

import { useState } from 'react';
import { NuevaOfertaModal } from '@/components/ui/Modal/NuevaOfertaModal';
import { OfertaForm } from '@/components/forms/OfertaForm/OfertaForm';
import { createOfertaAction } from '@/actions/createOferta';
import { CreateOfertaInput } from '@/schemas/createOfertaSchema';

/**
 * Componente principal del Dashboard del tutor.
 * Maneja la creación de nuevas ofertas de tutoría.
 */
export default function TutorDashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMessage, setShowMessage] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowMessage(null);
  };

  const handleSubmitOferta = async (data: CreateOfertaInput) => {
    setIsLoading(true);
    try {
      const result = await createOfertaAction(data);

      if (result.success) {
        setShowMessage({
          type: 'success',
          message: result.message || 'Oferta creada exitosamente',
        });

        // Cerrar modal después de 2 segundos
        setTimeout(() => {
          handleCloseModal();
        }, 2000);
      } else {
        setShowMessage({
          type: 'error',
          message:
            result.message || 'Ocurrió un error al crear la oferta',
        });
      }
    } catch (error) {
      setShowMessage({
        type: 'error',
        message: 'Error inesperado al crear la oferta',
      });
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--primary)] text-white p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Mi Dashboard</h1>
            <p className="text-sm mt-1 text-white/80">
              Gestiona tus ofertas de tutoría
            </p>
          </div>
          <button
            onClick={handleOpenModal}
            className="bg-white text-[var(--primary)] px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <span className="text-lg">+</span>
            Nueva Oferta
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Alert Message */}
        {showMessage && (
          <div
            className={`mb-6 p-4 rounded-md flex items-center gap-3 ${
              showMessage.type === 'success'
                ? 'bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20'
                : 'bg-[var(--error)]/10 text-[var(--error)] border border-[var(--error)]/20'
            }`}
          >
            <svg
              className="h-5 w-5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              {showMessage.type === 'success' ? (
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              )}
            </svg>
            <p className="text-sm font-medium">{showMessage.message}</p>
          </div>
        )}

        {/* Content Placeholder */}
        <div className="bg-white rounded-lg border border-[var(--border)] p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-[var(--text-secondary)] mb-4"
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
          <h2 className="text-lg font-semibold text-foreground mb-2">
            No tienes ofertas activas
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
            Publica tu primera oferta de tutoría para que los
            estudiantes te encuentren
          </p>
          <button
            onClick={handleOpenModal}
            className="bg-[var(--primary)] text-white px-6 py-2 rounded-md font-semibold hover:bg-[var(--primary-dark)] transition-colors inline-flex items-center gap-2"
          >
            <span className="text-lg">+</span>
            Crear mi primera oferta
          </button>
        </div>
      </main>

      {/* Modal */}
      <NuevaOfertaModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <OfertaForm
          onCancel={handleCloseModal}
          onSubmit={handleSubmitOferta}
        />
      </NuevaOfertaModal>
    </div>
  );
}
