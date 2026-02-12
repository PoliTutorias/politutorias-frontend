'use client';

import { TextareaHTMLAttributes } from 'react';

interface TextareaDescripcionOfertaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  maxLength?: number;
  currentLength?: number;
  error?: string;
  helperText?: string;
}

export function TextareaDescripcionOferta({
  label = 'Descripción de la Oferta',
  maxLength = 250,
  currentLength = 0,
  error,
  helperText = 'Describe los temas, metodología y lo que incluye tu tutoría',
  ...props
}: TextareaDescripcionOfertaProps) {
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
      <textarea
        maxLength={maxLength}
        rows={4}
        className={`w-full rounded-md border px-3 py-2 text-sm placeholder-gray-400 transition-colors resize-none ${error
            ? 'border-[var(--error)] focus:border-[var(--error)] focus:outline-none focus:ring-2 focus:ring-[var(--error)]/20'
            : 'border-[var(--border)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/10'
          }`}
        placeholder="Describe qué incluye tu tutoría, metodología, temas específicos..."
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
