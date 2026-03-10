'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  return (
    <Link
      href="/encuentra-tutoria"
      className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
      aria-label="Volver a la búsqueda de tutorías"
    >
      <ArrowLeft size={20} />
      <span className="font-medium">Volver</span>
    </Link>
  );
}
