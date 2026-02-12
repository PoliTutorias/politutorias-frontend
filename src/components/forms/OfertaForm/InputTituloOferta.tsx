'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputTituloOfertaProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  maxLength?: number;
  currentLength?: number;
  error?: string;
}

export const InputTituloOferta = forwardRef<
  HTMLInputElement,
  InputTituloOfertaProps
>(
  (
    {
      label = 'Título de la Oferta',
      maxLength = 80,
      currentLength = 0,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-foreground">
            {label}
          </label>
          <span
            className={`text-xs ${error
                ? 'text-[var(--error)]'
                : 'text-[var(--text-secondary)]'
              }`}
          >
            {currentLength}/{maxLength}
          </span>
        </div>
        <input
          ref={ref}
          type="text"
          maxLength={maxLength}
          className={`w-full rounded-md border px-3 py-2 text-sm placeholder-gray-400 transition-colors ${error
              ? 'border-[var(--error)] focus:border-[var(--error)] focus:outline-none focus:ring-2 focus:ring-[var(--error)]/20'
              : 'border-[var(--border)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/10'
            }`}
          placeholder="Ej. Cálculo Vectorial, Física I, Programación en Python..."
          {...props}
        />
        {error && (
          <p className="text-sm text-[var(--error)]">{error}</p>
        )}
      </div>
    );
  }
);

InputTituloOferta.displayName = 'InputTituloOferta';
