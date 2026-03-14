'use client';

import React from 'react';
import clsx from 'clsx';

type TabStatus = 'PENDIENTE' | 'EXPIRADA';

interface TabsComponentProps {
  initialPendingCount: number;
  initialExpiredCount: number;
  onTabChange: (status: TabStatus) => void;
}

const TAB_META: Array<{ status: TabStatus; label: string }> = [
  { status: 'PENDIENTE', label: 'Pendientes' },
  { status: 'EXPIRADA', label: 'Expiradas' },
];

export function TabsComponent({
  initialPendingCount,
  initialExpiredCount,
  onTabChange,
}: TabsComponentProps) {
  const [activeTab, setActiveTab] = React.useState<TabStatus>('PENDIENTE');

  const countMap: Record<TabStatus, number> = {
    PENDIENTE: initialPendingCount,
    EXPIRADA: initialExpiredCount,
  };

  const handleTabClick = (status: TabStatus) => {
    setActiveTab(status);
    onTabChange(status);
  };

  return (
    <div className="mb-6 flex items-center gap-3">
      {TAB_META.map((tab) => {
        const isActive = tab.status === activeTab;

        return (
          <button
            key={tab.status}
            type="button"
            onClick={() => handleTabClick(tab.status)}
            className={clsx(
              'rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors',
              isActive
                ? 'border-primary bg-primary text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            )}
          >
            {tab.label}
            <span className={clsx('ml-1 text-xs', isActive ? 'text-slate-200' : 'text-slate-400')}>
              ({countMap[tab.status]})
            </span>
          </button>
        );
      })}
    </div>
  );
}
