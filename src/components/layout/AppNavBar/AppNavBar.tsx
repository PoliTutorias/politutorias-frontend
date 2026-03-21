'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { montserrat, dancingScript } from '@/lib/fonts';
import { useAuthStore } from '@/lib/stores/authStore';
import { logoutAction } from '@/actions/auth/authActions';

// ─── Types ────────────────────────────────────────────────────────────────────

export type NavRole = 'tutor' | 'student';

export interface NavItem {
  key: string;
  label: string;
  href?: string;
}

interface AppNavBarProps {
  /** El rol activo determina qué links mostrar y a dónde apunta el logo */
  role?: NavRole;
  /** El key del item activo (para resaltarlo con underline amarillo) */
  activeItem?: string;
}

// ─── Nav Items por Rol ────────────────────────────────────────────────────────

const TUTOR_NAV_ITEMS: NavItem[] = [
  { key: 'panel', label: 'Panel', href: '/dashboard/tutor' },
  { key: 'bandeja', label: 'Bandeja', href: '/bandeja' },
  { key: 'mi-agenda', label: 'Mi Agenda', href: '/tutor/agenda' },
];

const STUDENT_NAV_ITEMS: NavItem[] = [
  { key: 'explorar', label: 'Explorar', href: '/encuentra-tutoria' },
  { key: 'solicitudes', label: 'Mis Solicitudes', href: '/dashboard/solicitudes' },
];

// ─── Componente ─────────────────────────────────────────────────────────

export function AppNavBar({ role = 'student', activeItem }: AppNavBarProps) {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const displayName = user?.name || (role === 'tutor' ? 'Tutor' : 'Estudiante');
  const userInitial = displayName.trim().charAt(0).toUpperCase() || 'U';

  const navItems = role === 'tutor' ? TUTOR_NAV_ITEMS : STUDENT_NAV_ITEMS;
  const logoHref = role === 'tutor' ? '/dashboard/tutor' : '/encuentra-tutoria';

  const handleLogout = async () => {
    await logoutAction(); // Limpia la cookie del servidor
    logout();             // Limpia el Zustand store
    router.push('/');
  };

  return (
    <header className="bg-primary px-6 py-3 text-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">

        {/* Logo */}
        <Link href={logoHref} className="flex items-center">
          <span className={`${montserrat.className} antialiased text-3xl font-extrabold leading-none text-white`}>
            Poli
          </span>
          <span className={`${dancingScript.className} antialiased text-base text-yellow`}>
            Tutorías
          </span>
        </Link>

        <div className="flex items-center gap-5">
          {/* Nav Links */}
          <nav className="flex items-center gap-4">
            {navItems.map((item) => {
              if (!item.href) {
                return (
                  <span key={item.key} className="text-base font-semibold text-slate-300">
                    {item.label}
                  </span>
                );
              }

              const isActive = activeItem === item.key;

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={clsx(
                    'border-b-2 pb-1 text-base font-semibold transition-colors',
                    isActive
                      ? 'border-yellow text-white'
                      : 'border-transparent text-slate-300 hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Separator */}
          <div className="h-8 border-l border-slate-500" />

          {/* User Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-700/60 px-3 py-1.5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-yellow text-sm font-bold text-primary">
              {userInitial}
            </span>
            <span className="text-sm font-semibold text-white">{displayName}</span>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-slate-300 transition-colors hover:text-white cursor-pointer"
            type="button"
          >
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}
