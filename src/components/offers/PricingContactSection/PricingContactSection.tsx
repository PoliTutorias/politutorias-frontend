import { Calendar } from 'lucide-react';

interface PricingContactSectionProps {
  pricePerHour: number;
}

export default function PricingContactSection({ pricePerHour }: PricingContactSectionProps) {
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
      <button
        disabled
        className="w-full bg-text-secondary text-white py-2.5 rounded-lg font-medium cursor-not-allowed opacity-75 hover:opacity-75 transition-opacity flex items-center justify-center gap-2 text-sm"
      >
        <Calendar size={18} />
        <span>Solicitar Tutoría</span>
      </button>

      {/* Nota informativa */}
      <p className="text-xs text-text-secondary mt-3 text-center">
        Selecciona al menos un horario en el calendario.
      </p>
    </div>
  );
}
