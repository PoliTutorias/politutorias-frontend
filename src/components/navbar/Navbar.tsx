'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { montserrat, dancingScript } from '@/lib/fonts';

interface NavbarProps {
  userName?: string;
}

export function Navbar({ userName = 'Estudiante' }: NavbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <nav className="bg-[var(--primary)] text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className={`${montserrat.className} antialiased font-extrabold text-white text-3xl`}>
            Poli
          </span>
          <span className={`${dancingScript.className} antialiased text-[var(--yellow)] text-lg`}>
            tutorías
          </span>
        </Link>

        {/* User Info and Logout */}
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium">
            Hola, {userName}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer"
          >
            Salir
          </button>
        </div>
      </div>
    </nav>
  );
}
