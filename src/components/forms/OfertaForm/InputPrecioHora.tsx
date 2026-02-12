'use client';

import { InputHTMLAttributes } from 'react';

interface InputPrecioHoraProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function InputPrecioHora({
  label = 'Precio por Hora ($)',
  error,
  helperText = 'Entre $5 y $20',
  ...props
}: InputPrecioHoraProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        type="number"
        min="5"
        step="0.50"
        className={`w-full rounded-md border px-3 py-2 text-sm placeholder-gray-400 transition-colors ${error
            ? 'border-[var(--error)] focus:border-[var(--error)] focus:outline-none focus:ring-2 focus:ring-[var(--error)]/20'
            : 'border-[var(--border)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/10'
          }`}
        placeholder="10"
        {...props}
      />
      {error ? (
        <p className="text-sm text-[var(--error)]">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[var(--text-secondary)]">{helperText}</p>
      ) : null}
    </div>
  );
}
