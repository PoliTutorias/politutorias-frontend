'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaDescripcionOfertaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  maxLength?: number;
  currentLength?: number;
  error?: string;
  helperText?: string;
  isValid?: boolean;
}

export const TextareaDescripcionOferta = forwardRef<
  HTMLTextAreaElement,
  TextareaDescripcionOfertaProps
>((
  {
    label = 'Descripción de la Oferta',
    maxLength = 250,
    currentLength = 0,
    error,
    helperText = 'Describe los temas, metodología y lo que incluye tu tutoría', isValid = false, ...props
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
            : isValid
              ? 'text-[var(--success)]'
              : 'text-[var(--text-secondary)]'
            }`}
        >
          {currentLength}/{maxLength}
        </span>
      </div>
      <textarea
        ref={ref}
        maxLength={maxLength}
        rows={4}
        className={`w-full rounded-md border px-3 py-2 text-sm placeholder-gray-400 transition-colors resize-none ${error
          ? 'border-[var(--error)] focus:border-[var(--error)] focus:outline-none focus:ring-2 focus:ring-[var(--error)]/20'
          : isValid
            ? 'border-[var(--success)] focus:border-[var(--success)] focus:outline-none focus:ring-2 focus:ring-[var(--success)]/20'
            : 'border-[var(--border)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/10'
          }`}
        placeholder="Describe qué incluye tu tutoría, metodología, temas específicos..."
        {...props}
      />
      {error ? (
        <p className="text-sm text-[var(--error)]">{error}</p>
      ) : isValid ? (
        <p className="text-sm text-[var(--success)]">✓ Buena descripción</p>
      ) : helperText ? (
        <p className="text-xs text-[var(--text-helper)]">{helperText}</p>
      ) : null}
    </div>
  );
});

TextareaDescripcionOferta.displayName = 'TextareaDescripcionOferta';;
