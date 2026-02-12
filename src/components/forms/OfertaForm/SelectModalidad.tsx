'use client';

import { SelectHTMLAttributes } from 'react';

interface SelectModalidadProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: { value: string; label: string }[];
}

export function SelectModalidad({
  label = 'Modalidad',
  error,
  options = [
    { value: 'Presencial', label: 'Presencial' },
    { value: 'Virtual', label: 'Virtual' },
  ],
  ...props
}: SelectModalidadProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <select
        className={`w-full rounded-md border px-3 py-2 text-sm transition-colors ${error
            ? 'border-[var(--error)] focus:border-[var(--error)] focus:outline-none focus:ring-2 focus:ring-[var(--error)]/20'
            : 'border-[var(--border)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/10'
          }`}
        {...props}
      >
        <option value="">Selecciona una modalidad</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-[var(--error)]">{error}</p>
      )}
    </div>
  );
}
