'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
      aria-label="Volver a la página anterior"
    >
      <ArrowLeft size={20} />
      <span className="font-medium">Volver</span>
    </button>
  );
}
