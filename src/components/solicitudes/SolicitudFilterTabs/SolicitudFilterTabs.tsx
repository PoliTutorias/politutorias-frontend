'use client';

import clsx from 'clsx';
import { SolicitudStatus } from '@/dtos/solicitudes.dto';

type Hu33FilterStatus = 'TODAS' | SolicitudStatus.PENDIENTE | SolicitudStatus.EXPIRADA;

interface SolicitudFilterTabsProps {
  readonly currentStatusFilter: Hu33FilterStatus;
  readonly onFilterChange: (status: Hu33FilterStatus) => void;
  readonly counts: { [key in Hu33FilterStatus]: number };
}

type FilterTab = {
  key: Hu33FilterStatus;
  label: string;
};

const FILTER_TABS: FilterTab[] = [
  { key: 'TODAS', label: 'Todas' },
  { key: SolicitudStatus.PENDIENTE, label: 'Pendientes' },
  { key: SolicitudStatus.EXPIRADA, label: 'Expiradas' },
];

export function SolicitudFilterTabs({
  currentStatusFilter,
  onFilterChange,
  counts,
}: SolicitudFilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_TABS.map((tab) => {
        const isActive = currentStatusFilter === tab.key;

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onFilterChange(tab.key)}
            className={clsx(
              'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
              isActive
                ? 'border-primary bg-primary text-white'
                : 'border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            <span>{tab.label}</span>
            <span className={clsx('text-xs font-semibold', isActive ? 'text-slate-200' : 'text-slate-400')}>
              ({counts[tab.key]})
            </span>
          </button>
        );
      })}
    </div>
  );
}