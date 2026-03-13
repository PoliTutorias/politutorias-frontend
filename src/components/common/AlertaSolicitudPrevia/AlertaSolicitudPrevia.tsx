'use client';

import { useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';

interface AlertaSolicitudPreviaProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function AlertaSolicitudPrevia({
  message,
  isVisible,
  onClose,
}: AlertaSolicitudPreviaProps) {
  useEffect(() => {
    if (isVisible) {
      // Auto-cerrar después de 5 segundos
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 max-w-md mx-auto">
      <div className="bg-red-100 border-l-4 border-red-500 rounded-lg p-4 shadow-lg flex items-start gap-3">
        <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
        <div className="flex-1">
          <p className="text-red-800 font-medium text-sm">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-red-600 hover:text-red-700 flex-shrink-0"
          aria-label="Cerrar alerta"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
