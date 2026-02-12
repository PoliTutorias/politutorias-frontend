'use client';

import { ReactNode } from 'react';

interface NuevaOfertaModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export function NuevaOfertaModal({
  isOpen,
  onClose,
  children,
}: NuevaOfertaModalProps) {
  if (!isOpen) return null;

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    // Solo cerrar si se hace clic en el overlay, no en el modal
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div className="relative w-full max-w-2xl rounded-lg bg-[var(--modal-bg)] p-8 shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Cerrar modal"
          type="button"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
}
