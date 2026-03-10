interface PricingContactSectionProps {
  pricePerHour: number;
}

export default function PricingContactSection({ pricePerHour }: PricingContactSectionProps) {
  return (
    <div className="bg-white rounded-lg p-6 sticky top-8 mt-8 lg:mt-0">
      {/* Precio por hora */}
      <div>
        <p className="text-text-secondary text-sm mb-2">Precio por hora</p>
        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-4xl font-bold text-yellow">${pricePerHour}</span>
        </div>
      </div>

      {/* Botón Solicitar Tutoría (disabled por ahora, según HU32) */}
      <button
        disabled
        className="w-full bg-text-secondary text-white py-3 rounded-lg font-medium cursor-not-allowed opacity-60 hover:opacity-60 transition-opacity"
      >
        Solicitar Tutoría
      </button>

      {/* Nota informativa */}
      <p className="text-xs text-text-muted mt-4 text-center">
        Información de tutores en desarrollo
      </p>
    </div>
  );
}
