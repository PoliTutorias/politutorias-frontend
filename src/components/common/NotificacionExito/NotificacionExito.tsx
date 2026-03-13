'use client';

import { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface NotificacionExitoProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function NotificacionExito({
  message,
  isVisible,
  onClose,
}: NotificacionExitoProps) {
  useEffect(() => {
    if (isVisible) {
      // Auto-cerrar después de 4 segundos
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <div className="bg-green-100 border-l-4 border-green-500 rounded-lg p-4 shadow-lg flex items-start gap-3 animate-slide-up">
        <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
        <div className="flex-1">
          <p className="text-green-800 font-medium text-sm">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-green-600 hover:text-green-700 flex-shrink-0"
          aria-label="Cerrar notificación"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
