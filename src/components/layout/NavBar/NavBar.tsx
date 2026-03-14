import Link from 'next/link';
import clsx from 'clsx';
import { dancingScript, montserrat } from '@/lib/fonts';

type TutorNavItem = {
  key: 'panel' | 'bandeja' | 'agenda';
  label: string;
  href?: string;
};

interface TutorNavBarProps {
  activeItem: TutorNavItem['key'];
  userName?: string;
}

const NAV_ITEMS: TutorNavItem[] = [
  { key: 'panel', label: 'Panel', href: '/dashboard/tutor' },
  { key: 'bandeja', label: 'Bandeja', href: '/bandeja' },
];

export function NavBar({ activeItem, userName = 'Jose' }: TutorNavBarProps) {
  const userInitial = userName.trim().charAt(0).toUpperCase() || 'T';

  return (
    <header className="bg-primary px-6 py-3 text-white">
      <div className="mx-auto flex w-full max-w-310 items-center justify-between gap-4">
        <Link href="/dashboard/tutor" className="flex items-center">
          <span className={`${montserrat.className} antialiased text-3xl font-extrabold leading-none text-white`}>
            Poli
          </span>
          <span className={`${dancingScript.className} antialiased text-base text-yellow`}>
            Tutorias
          </span>
        </Link>

        <div className="flex items-center gap-5">
          <nav className="flex items-center gap-4">
            {NAV_ITEMS.map((item) => {
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

          <div className="flex items-center gap-4 border-l border-slate-500 pl-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-700/60 px-3 py-1.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-yellow text-sm font-bold text-primary">
                {userInitial}
              </span>
              <span className="text-sm font-semibold text-white">{userName}</span>
            </div>
            <button className="text-sm font-medium text-slate-300 transition-colors hover:text-white" type="button">
              Salir
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
