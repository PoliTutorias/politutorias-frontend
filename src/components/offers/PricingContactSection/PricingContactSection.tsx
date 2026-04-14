'use client';

import BotonSolicitarTutoria from '@/components/offers/BotonSolicitarTutoria/BotonSolicitarTutoria';

interface PricingContactSectionProps {
  pricePerHour: number;
  cantidadHorariosSeleccionados: number;
  onSolicitarClick: () => void;
}

export default function PricingContactSection({ 
  pricePerHour,
  cantidadHorariosSeleccionados,
  onSolicitarClick
}: PricingContactSectionProps) {
  return (
    <div className="bg-bg-gray border border-border rounded-lg p-5 sticky top-8 mt-6 lg:mt-0">
      {/* Precio por hora */}
      <div>
        <p className="text-text-secondary text-xs mb-2">Precio por hora</p>
        <div className="flex items-baseline gap-1 mb-5">
          <span className="text-4xl font-bold text-(--yellow)">${pricePerHour}</span>
        </div>
      </div>

      {/* Botón Solicitar Tutoría */}
      <BotonSolicitarTutoria
        isDisabled={cantidadHorariosSeleccionados === 0}
        onClick={onSolicitarClick}
      />

      {/* Nota informativa */}
      <p className="text-xs text-text-secondary mt-3 text-center">
        Selecciona al menos un horario en el calendario.
      </p>
    </div>
  );
}
