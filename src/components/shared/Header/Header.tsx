'use client';

import { montserrat, dancingScript } from '@/lib/fonts';
import BackButton from '@/components/shared/BackButton/BackButton';

export default function HeaderComponent() {
  return (
    <header className="bg-primary text-white py-4 px-4 md:px-8">
      <div className="container mx-auto flex items-center justify-between">
        {/* Botón Volver */}
        <div className="text-white">
          <BackButton />
        </div>

        {/* Logo PoliTutorias */}
        <div className="text-right flex items-center gap-1">
          <span className={`${montserrat.className} antialiased font-extrabold text-white text-3xl`}>
            Poli
          </span>
          <span className={`${dancingScript.className} antialiased text-lg`} style={{ color: 'var(--yellow)' }}>
            Tutorías
          </span>
        </div>
      </div>
    </header>
  );
}
