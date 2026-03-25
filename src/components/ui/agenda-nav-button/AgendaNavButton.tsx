'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export function AgendaNavButton() {
  const pathname = usePathname();
  const isActive = pathname === '/agenda';

  return (
    <Link
      href="/agenda"
      aria-label="Ir a la agenda"
      className={clsx(
        'inline-flex items-center border-b-2 pb-1 text-base font-semibold transition-colors',
        isActive
          ? 'border-yellow text-white'
          : 'border-transparent text-slate-300 hover:text-white'
      )}
    >
      Agenda
    </Link>
  );
}
