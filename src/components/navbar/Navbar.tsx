'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { montserrat, dancingScript } from '@/lib/fonts';

interface NavbarProps {
  userName?: string;
  activeItem?: 'explorar' | 'solicitudes' | 'agenda';
}

export function Navbar({ userName = 'Estudiante', activeItem = 'explorar' }: NavbarProps) {
  const userInitial = userName.trim().charAt(0).toUpperCase() || 'E';

  return (
    <header className="bg-primary px-6 py-4 text-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
        <Link href="/encuentra-tutoria" className="flex items-center">
          <span className={`${montserrat.className} antialiased text-3xl font-extrabold leading-none text-white`}>
            Poli
          </span>
          <span className={`${dancingScript.className} antialiased text-base text-yellow`}>
            Tutorías
          </span>
        </Link>

        <div className="flex items-center gap-5">
          <nav className="flex items-center gap-6 text-sm font-semibold">
            <Link
              href="/encuentra-tutoria"
              className={clsx(
                'border-b-2 pb-1 transition-colors hover:text-white',
                activeItem === 'explorar' ? 'border-yellow text-white' : 'border-transparent text-slate-300'
              )}
            >
              Explorar
            </Link>

            <Link
              href="/dashboard/solicitudes"
              className={clsx(
                'border-b-2 pb-1 transition-colors hover:text-white',
                activeItem === 'solicitudes' ? 'border-yellow text-white' : 'border-transparent text-slate-300'
              )}
            >
              Mis Solicitudes
            </Link>

            <span
              className={clsx(
                'border-b-2 pb-1 transition-colors hover:text-white',
                activeItem === 'agenda' ? 'border-yellow text-white' : 'border-transparent text-slate-300'
              )}
            >
              Agenda
            </span>
          </nav>

          <div className="h-8 border-l border-slate-500" />

          <div className="inline-flex items-center gap-2 rounded-full border border-slate-500 bg-slate-700/30 px-3 py-1.5">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-yellow text-xs font-bold text-primary">
              {userInitial}
            </span>
            <span className="text-sm font-semibold text-white">{userName}</span>
          </div>

          <button type="button" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}
